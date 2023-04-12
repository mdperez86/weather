"use client";

import { useEffect, useState } from "react";
import { formatDateTime, formatNumber, formatTime } from "@this/utils/formats";
import { ApiV1CurrentGetResponse } from "@this/types";
import Header from "@this/components/Header";
import LoadingPage from "./loading";
import { getCurrentWeather } from "@this/data/getCurrentWeather";
import { notFound } from "next/navigation";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0);
tomorrow.setMinutes(0);
tomorrow.setSeconds(0);
tomorrow.setMilliseconds(0);

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
              from: tomorrow.toISOString(),
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
        title={formatDateTime(tomorrow, {
          weekday: "long",
        })}
        description={`Weather in ${currentWeather.location} for tomorrow.`}
        backHref="/"
      />

      <div className="overflow-y-scroll">
        <ol className="flex flex-col gap-4">
          {currentWeather.hourly?.map((hour) => (
            <li
              key={hour.localTime}
              className="bg-white/30 rounded-md py-4 px-6 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-8">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-rose-300 blur-xl" />
                  <figure
                    className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${hour.icon})`,
                      backgroundSize: "120%",
                    }}
                    aria-label={hour.condition}
                  />
                </div>

                <time
                  dateTime={hour.localTime}
                  className="text-xs text-stone-800/60 flex flex-col gap-1"
                >
                  <span className="font-medium text-stone-800/80">
                    {formatTime(hour.localTime)}
                  </span>
                </time>
              </div>

              <span className="text-stone-800/60 font-medium text-2xl">
                {formatNumber(hour.temperature, {
                  style: "unit",
                  unit: "celsius",
                  maximumFractionDigits: 0,
                })}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
