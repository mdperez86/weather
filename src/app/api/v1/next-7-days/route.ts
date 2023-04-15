import { ApiV1Next7DaysGetResponse, WeatherApiResponse } from "@this/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    if (!process.env.WEATHER_API_KEY) {
      return NextResponse.json({ message: "Invalid API key" }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");
    const from = searchParams.get("from");

    const url = new URL("/v1/forecast.json", process.env.WEATHER_API_HOST);
    url.searchParams.set("key", process.env.WEATHER_API_KEY);
    url.searchParams.set("q", `${latitude},${longitude}`);
    url.searchParams.set("days", "8");

    const response = await fetch(url);
    const data: WeatherApiResponse = await response.json();

    const filteredForecast = from
      ? data.forecast.forecastday.filter(({ date_epoch }) => {
          const fromDate = new Date(from);
          const toDate = new Date(fromDate);
          toDate.setDate(fromDate.getDate() + 7);

          const currentDay = date_epoch * 1000;
          if (
            fromDate.getTime() <= currentDay &&
            currentDay < toDate.getTime()
          ) {
            return true;
          }
          return false;
        })
      : data.forecast.forecastday;

    const appResponse: ApiV1Next7DaysGetResponse = {
      location: data.location.name,
      localTime: new Date(data.location.localtime_epoch * 1000).toISOString(),
      daily: filteredForecast.map(({ day, date_epoch }) => ({
        localTime: new Date(date_epoch * 1000).toISOString(),
        condition: day.condition.text,
        icon: day.condition.icon.replace("64x64", "128x128"),
        minTemperature: day.mintemp_c,
        maxTemperature: day.maxtemp_c,
        minWindSpeed: day.maxwind_kph,
        maxWindSpeed: day.maxwind_kph,
        avgHumidity: day.avghumidity,
      })),
    };

    return NextResponse.json(appResponse);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
