import { LocationInfo } from "@this/types";

export async function getLocationName(
  coords: GeolocationCoordinates,
  signal?: AbortSignal
): Promise<LocationInfo | undefined> {
  const url = new URL("/reverse", "https://geocode.maps.co");
  url.searchParams.append("lat", `${coords.latitude}`);
  url.searchParams.append("lon", `${coords.longitude}`);

  return fetch(url, { signal })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch(() => {});
}
