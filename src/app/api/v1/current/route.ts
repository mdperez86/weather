import { ApiV1CurrentGetResponse, WeatherApiResponse } from "@this/types";
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

    if (!from) {
      return NextResponse.json(
        { message: "Invalid from value" },
        { status: 400 }
      );
    }

    const url = new URL("/v1/forecast.json", process.env.WEATHER_API_HOST);
    url.searchParams.set("key", process.env.WEATHER_API_KEY);
    url.searchParams.set("q", `${latitude},${longitude}`);
    url.searchParams.set("days", "2");

    const response = await fetch(url);
    const data: WeatherApiResponse = await response.json();

    const hourly = data.forecast.forecastday
      .flatMap(({ hour }) => hour)
      .filter((hour) => {
        const now = new Date(from).getTime();
        const nextTime = hour.time_epoch * 1000;
        return now < nextTime;
      })
      .map((hour) => ({
        localTime: new Date(hour.time_epoch * 1000).toISOString(),
        condition: hour.condition.text,
        icon: hour.condition.icon.replace("64x64", "128x128"),
        temperature: hour.temp_c,
      }));

    const appResponse: ApiV1CurrentGetResponse = {
      location: data.location.name,
      localTime: new Date(data.location.localtime_epoch * 1000).toISOString(),
      condition: data.current.condition.text,
      icon: data.current.condition.icon.replace("64x64", "128x128"),
      temperature: data.current.temp_c,
      windSpeed: data.current.wind_kph,
      humidity: data.current.humidity / 100,
      pressure: data.current.pressure_in,
      isDay: Boolean(data.current.is_day),
      hourly: hourly.slice(0, 24),
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
