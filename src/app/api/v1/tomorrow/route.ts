import { ApiV1TomorrowGetResponse, WeatherApiResponse } from "@this/types";
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
    url.searchParams.set("days", "1");
    if (from) url.searchParams.set("dt", from.split("T")[0]);

    const response = await fetch(url);
    const data: WeatherApiResponse = await response.json();

    const filteredForecast = data.forecast.forecastday;

    const appResponse: ApiV1TomorrowGetResponse = {
      location: data.location.name,
      localTime: new Date(
        filteredForecast[0].hour[0].time_epoch * 1000
      ).toISOString(),
      hourly: filteredForecast[0].hour.map((hour) => ({
        localTime: new Date(hour.time_epoch * 1000).toISOString(),
        condition: hour.condition.text,
        icon: hour.condition.icon.replace("64x64", "128x128"),
        temperature: hour.temp_c,
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
