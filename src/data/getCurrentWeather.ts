import {
  ApiV1CurrentGetRequestSearchParams,
  ApiV1CurrentGetResponse,
} from "@this/types";

export async function getCurrentWeather(
  params: ApiV1CurrentGetRequestSearchParams,
  signal?: AbortSignal
): Promise<ApiV1CurrentGetResponse | undefined> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([param, value]) => {
    searchParams.set(param, value);
  });

  return fetch(`/api/v1/current?${searchParams}`, { signal })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch(() => {});
}
