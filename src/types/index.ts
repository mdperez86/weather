/**
 * @see https://www.weatherapi.com/docs/#intro-location
 */
export interface WeatherApiLocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface WeatherApiCondition {
  text: string;
  icon: string;
  code: number;
}

/**
 * https://www.weatherapi.com/docs/#apis-realtime
 */
export interface WeatherApiCurrent {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: WeatherApiCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: "SSE";
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export interface WeatherApiForecastDay {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: WeatherApiCondition;
  uv: number;
}

export interface WeatherApiForecastHour {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: WeatherApiCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: number;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
}

export interface WeatherApiForecast {
  date: string;
  date_epoch: number;
  day: WeatherApiForecastDay;
  hour: WeatherApiForecastHour[];
}

export interface WeatherApiResponse {
  readonly location: WeatherApiLocation;
  readonly current: WeatherApiCurrent;
  readonly forecast: {
    forecastday: WeatherApiForecast[];
  };
}

/**
 * https://www.weatherapi.com/docs/#intro-request
 */
export interface WeatherApiRequest {
  key: string;
  q: string;
  days?: number;
  dt?: string;
  unixdt?: number;
  end_dt?: string;
  unixend_dt?: number;
  hour?: number;
  alerts?: "yes" | "no";
  aqi?: "yes" | "no";
  tides?: "yes" | "no";
  tp?: number;
  lang?: string;
}

export interface ApiV1CurrentGetRequestSearchParams {
  latitude: number;
  longitude: number;
  days?: number;
  from?: string;
  to?: string;
}

export interface ApiV1CurrentGetResponseHourly {
  localTime: string;
  condition: string;
  icon: string;
  temperature: number;
}

export interface ApiV1CurrentGetResponse {
  location: string;
  localTime: string;
  condition: string;
  icon: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
  pressure: number;
  isDay: boolean;
  hourly: ApiV1CurrentGetResponseHourly[];
}

export interface ApiV1TomorrowGetResponseHourly {
  localTime: string;
  condition: string;
  icon: string;
  temperature: number;
}

export interface ApiV1TomorrowGetResponse {
  location: string;
  localTime: string;
  hourly: ApiV1TomorrowGetResponseHourly[];
}

export interface ApiV1Next7DaysGetResponseDaily {
  localTime: string;
  condition: string;
  icon: string;
  minTemperature: number;
  maxTemperature: number;
  minWindSpeed: number;
  maxWindSpeed: number;
  avgHumidity: number;
}

export interface ApiV1Next7DaysGetResponse {
  location: string;
  localTime: string;
  daily: ApiV1Next7DaysGetResponseDaily[];
}
