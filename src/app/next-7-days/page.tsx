"use client";

import { useEffect, useState } from "react";
import { formatDateTime, formatNumber } from "@this/utils/formats";
import { ApiV1CurrentGetResponse } from "@this/types";
import Header from "@this/components/Header";
import LoadingPage from "./loading";
import { getCurrentWeather } from "@this/data/getCurrentWeather";
import { notFound } from "next/navigation";

export default function Home() {
  const [currentWeather, setCurrentWeather] =
    useState<ApiV1CurrentGetResponse>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const currentWeatherAbortController = new AbortController();

      setIsLoading(true);

      navigator.geolocation.getCurrentPosition(
        async function success(position) {
          const currentWeather = await getCurrentWeather(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              days: 7,
              from: new Date().toISOString(),
            },
            currentWeatherAbortController.signal
          ).catch(() => undefined);

          setCurrentWeather(currentWeather);
          setIsLoading(false);
        },
        function error(error) {
          setIsLoading(false);
        }
      );

      return () => {
        currentWeatherAbortController.abort();
      };
    }
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!currentWeather) notFound();

  return (
    <div className="flex flex-col gap-8 h-full">
      <Header
        title="Next 7 days"
        description={`Weather in ${currentWeather.location} for the next 7 days.`}
        backHref="/"
      />

      <div className="overflow-y-auto">
        <ol className="flex flex-col gap-4">
          {currentWeather.daily?.map((day) => (
            <li
              key={day.localTime}
              className="bg-white/30 rounded-md py-4 px-6 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-8">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-rose-300 blur-xl"></div>
                  <figure
                    className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${day.icon})`,
                      backgroundSize: "120%",
                    }}
                    aria-label={day.condition}
                  />
                </div>

                <time
                  dateTime={day.localTime}
                  className="text-xs text-stone-800/60 flex flex-col gap-1"
                >
                  <span className="font-medium text-stone-800/80">
                    {formatDateTime(day.localTime, {
                      weekday: "long",
                    })}
                  </span>
                  <span>
                    {formatDateTime(day.localTime, {
                      day: "numeric",
                      month: "long",
                    })}
                  </span>
                </time>
              </div>

              <div className="text-stone-800/60 font-medium text-sm flex flex-col items-end">
                <span>
                  {formatNumber(day.maxTemperature, {
                    style: "unit",
                    unit: "celsius",
                    maximumFractionDigits: 0,
                  })}
                </span>

                <span>
                  {formatNumber(day.minTemperature, {
                    style: "unit",
                    unit: "celsius",
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
