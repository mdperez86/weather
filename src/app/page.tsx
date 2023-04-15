"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound, usePathname } from "next/navigation";
import { formatNumber, formatTime } from "@this/utils/formats";
import { ApiV1CurrentGetResponse } from "@this/types";
import Header from "@this/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faWind } from "@fortawesome/free-solid-svg-icons";
import LoadingPage from "./loading";
import { getCurrentWeather } from "@this/data/getCurrentWeather";

export default function HomePage() {
  const [currentWeather, setCurrentWeather] =
    useState<ApiV1CurrentGetResponse>();
  const [isLoading, setIsLoading] = useState(true);

  const currentPathname = usePathname();

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
    <div className="flex flex-col justify-between h-full">
      <Header
        title={`Weather in ${currentWeather.location ?? ""}`}
        description={
          <>
            Now{" "}
            <time dateTime={currentWeather.localTime}>
              {formatTime(currentWeather.localTime)}
            </time>
            .
          </>
        }
      />

      <div className="flex justify-center relative">
        <div className="w-36 h-36 rounded-full bg-rose-300 blur-3xl" />
        <figure
          className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: `url(${currentWeather.icon})` }}
          aria-label={currentWeather.condition}
        />
      </div>

      <div className="flex items-center justify-center">
        <span className="text-9xl font-semibold text-white/80">
          {formatNumber(currentWeather.temperature, {
            style: "unit",
            unit: "celsius",
            maximumFractionDigits: 0,
          })}
        </span>
      </div>

      <div className="flex justify-around text-xs text-stone-800/60">
        <span className="flex gap-1 items-center">
          <FontAwesomeIcon icon={faWind} className="h-3" />{" "}
          {formatNumber(currentWeather.windSpeed, {
            style: "unit",
            unit: "kilometer-per-hour",
          })}
        </span>
        <span className="flex gap-1 items-center">
          <FontAwesomeIcon icon={faDroplet} className="h-3" />{" "}
          {formatNumber(currentWeather.humidity, {
            style: "percent",
          })}
        </span>
        <span className="flex gap-1 items-center">
          {formatNumber(currentWeather.pressure)} inHg
        </span>
      </div>

      <div className="shrink-0 -mx-6 sm:mx-0 h-36 overflow-hidden">
        <div className="overflow-x-auto overflow-y-hidden pb-4">
          <ol className="inline-flex gap-4 mx-6 sm:mx-0">
            {currentWeather.hourly?.map((hour) => (
              <li
                key={hour.localTime}
                className="bg-white/30 rounded-md py-4 px-6 flex flex-col items-center shrink-0 gap-4"
              >
                <time
                  dateTime={hour.localTime}
                  className="text-xs text-stone-800/60 block min-w-max"
                >
                  {formatTime(hour.localTime)}
                </time>

                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-rose-300 blur-xl" />
                  <figure
                    className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${hour.icon})`,
                      backgroundSize: `120%`,
                    }}
                    aria-label={hour.condition}
                  />
                </div>

                <span className="text-stone-800/60 font-bold">
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

      <nav className="flex justify-between gap-4 text-sm text-stone-800/60">
        <Link
          href="/"
          className={
            currentPathname == "/" ? "text-stone-800 font-medium" : undefined
          }
        >
          Today
        </Link>
        <Link
          href="/tomorrow"
          className={
            currentPathname == "/tomorrow"
              ? "text-stone-800 font-medium"
              : undefined
          }
        >
          Tomorrow
        </Link>
        <Link
          href="/next-7-days"
          className={
            currentPathname == "/next-7-days"
              ? "text-stone-800 font-medium"
              : undefined
          }
        >
          Next 7 days
        </Link>
      </nav>
    </div>
  );
}
