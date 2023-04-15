import {
  ApiV1CurrentGetRequestSearchParams,
  ApiV1TomorrowGetResponse,
} from "@this/types";

export async function getTomorrowWeather(
  params: ApiV1CurrentGetRequestSearchParams,
  signal?: AbortSignal
): Promise<ApiV1TomorrowGetResponse | undefined> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([param, value]) => {
    searchParams.set(param, value);
  });

  return fetch(`/api/v1/tomorrow?${searchParams}`, { signal })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch(() => {});
}
