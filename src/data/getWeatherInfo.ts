import { OpenMeteoApiRequest, OpenMeteoApiResponse } from "@this/types";

export async function getWeatherInfo(
  params: OpenMeteoApiRequest,
  signal?: AbortSignal
): Promise<OpenMeteoApiResponse | undefined> {
  const url = new URL("/v1/forecast", "https://api.open-meteo.com");
  Object.entries(params).forEach(([param, value]) => {
    url.searchParams.set(param, value);
  });

  return fetch(url, { signal })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch(() => {});
}
