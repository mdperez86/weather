import {
  ApiV1CurrentGetRequestSearchParams,
  ApiV1Next7DaysGetResponse,
} from "@this/types";

export async function getNext7DaysWeather(
  params: ApiV1CurrentGetRequestSearchParams,
  signal?: AbortSignal
): Promise<ApiV1Next7DaysGetResponse | undefined> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([param, value]) => {
    searchParams.set(param, value);
  });

  return fetch(`/api/v1/next-7-days?${searchParams}`, { signal })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch(() => {});
}
