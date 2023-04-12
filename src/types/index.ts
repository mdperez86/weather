export interface LocationInfo {
  place_id: number;
  licence: string;
  powered_by: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    house_number: string;
    road: string;
    city: string;
    county: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: [string, string, string, string];
}

export interface OpenMeteoApiRequest {
  /** Geographical WGS84 coordinate of the location */
  readonly latitude: number;
  /** Geographical WGS84 coordinate of the location */
  readonly longitude: number;
  /**
   * The elevation used for statistical downscaling. Per default,
   * a 90 meter digital elevation model is used. You can manually
   * set the elevation to correctly match mountain peaks. If
   * `&elevation=nan` is specified, downscaling will be disabled
   * and the API uses the average grid-cell height.
   *
   * @see https://openmeteo.substack.com/p/improving-weather-forecasts-with
   */
  readonly elevation?: number;
  /**
   * A list of weather variables which should be returned. Values
   * can be comma separated, or multiple `&hourly=` parameter in
   * the URL can be used.
   */
  readonly hourly?: string[];
  /**
   * A list of daily weather variable aggregations which should be
   * returned. Values can be comma separated, or multiple `&daily=`
   * parameter in the URL can be used. If daily weather variables
   * are specified, parameter `timezone` is required.
   */
  readonly daily?: string[];
  /**
   * Include current weather conditions in the JSON output.
   *
   * @default false
   */
  readonly current_weather?: boolean;
  /**
   * If fahrenheit is set, all temperature values are converted
   * to Fahrenheit.
   *
   * @default "celsius"
   */
  readonly temperature_unit?: "celsius" | "fahrenheit";
  /**
   * The wind speed speed unit.
   *
   * @default "kmh"
   */
  readonly windspeed_unit?: "ms" | "mph" | "kn";
  /**
   * The precipitation amount unit.
   *
   * @default "mm"
   */
  readonly precipitation_unit?: "mm" | "inch";
  /**
   * If format `unixtime` is selected, all time values are returned
   * in UNIX epoch time in seconds. Please note that all timestamp
   * are in GMT+0! For daily values with unix timestamps, please
   * apply `utc_offset_seconds` again to get the correct date.
   *
   * @default iso8601
   */
  readonly timeformat?: string;
  /**
   * If `timezone` is set, all timestamps are returned as local-time
   * and data is returned starting at 00:00 local-time. Any time
   * zone name from the time zone database is supported. If `auto`
   * is set as a time zone, the coordinates will be automatically
   * resolved to the local time zone.
   *
   * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
   * @default GMT
   */
  readonly timezone?: string;
  /**
   * If `past_days` is set, yesterday or the day before yesterday
   * data are also returned. Valid values 0..2.
   *
   * @default 0
   */
  readonly past_days?: number;
  /**
   * Per default, only 7 days are returned. Up to 16 days of
   * forecast are possible.
   *
   * @default 7
   */
  readonly forecast_days?: number;
  /**
   * The time interval to get weather data. A day must be
   * specified as an ISO8601 date (e.g. `2022-06-30`).
   */
  readonly start_date?: string;
  /**
   * The time interval to get weather data. A day must be
   * specified as an ISO8601 date (e.g. `2022-06-30`).
   */
  readonly end_date?: string;
  /**
   * Manually select one or more weather models. Per default,
   * the best suitable weather models will be combined.
   *
   * @default ["auto"]
   */
  readonly models?: string[];
  /**
   * Set a preference how grid-cells are selected. The default
   * `land` finds a suitable grid-cell on land with similar
   * elevation to the requested coordinates using a 90-meter
   * digital elevation model. `sea` prefers grid-cells on sea.
   * `nearest` selects the nearest possible grid-cell.
   *
   * @see https://openmeteo.substack.com/p/improving-weather-forecasts-with
   * @default "land"
   */
  readonly cell_selection?: string;
}

export interface OpenMeteoApiResponse {
  /**
   * WGS84 of the center of the weather grid-cell which was
   * used to generate this forecast. This coordinate might
   * be a few kilometers away from the requested coordinate.
   */
  readonly latitude: number;
  /**
   * WGS84 of the center of the weather grid-cell which was
   * used to generate this forecast. This coordinate might
   * be a few kilometers away from the requested coordinate.
   */
  readonly longitude: number;
  /**
   * The elevation from a 90 meter digital elevation model.
   * This effects which grid-cell is selected (see parameter
   * `cell_selection`). Statistical downscaling is used to
   * adapt weather conditions for this elevation. This
   * elevation can also be controlled with the query
   * parameter `elevation`. If `&elevation=nan` is specified,
   * all downscaling is disabled and the averge grid-cell
   * elevation is used.
   */
  readonly elevation: number;
  /**
   * Generation time of the weather forecast in milliseconds.
   * This is mainly used for performance monitoring and
   * improvements.
   */
  readonly generationtime_ms: number;
  /**
   * Applied timezone offset from the `&timezone=` parameter.
   */
  readonly utc_offset_seconds: number;
  /**
   * Timezone identifier (e.g. `Europe/Berlin`)
   */
  readonly timezone: string;
  /**
   * Timezone abbreviation (e.g. `CEST`)
   */
  readonly timezone_abbreviation: string;
  /**
   * For each selected weather variable, data will be returned
   * as a floating point array. Additionally a `time` array will
   * be returned with ISO8601 timestamps.
   */
  readonly hourly?: {
    time: string[];
    temperature_2m: number[];
  };
  /**
   * For each selected weather variable, the unit will be listed
   * here.
   */
  readonly hourly_units?: {
    time: string;
    temperature_2m: string;
  };
  /**
   * For each selected daily weather variable, data will be
   * returned as a floating point array. Additionally a `time`
   * array will be returned with ISO8601 timestamps.
   */
  readonly daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  /**
   * For each selected daily weather variable, the unit will
   * be listed here.
   */
  readonly daily_units?: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
  /**
   * Current weather conditions.
   */
  readonly current_weather?: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
    time: string;
  };
}

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
  windSpeed: number;
  humidity: number;
  pressure: number;
  isDay: boolean;
}

export interface ApiV1CurrentGetResponseDaily {
  localTime: string;
  condition: string;
  icon: string;
  minTemperature: number;
  maxTemperature: number;
  minWindSpeed: number;
  maxWindSpeed: number;
  avgHumidity: number;
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
  hourly?: Omit<ApiV1CurrentGetResponse, "location" | "hourly" | "isDay">[];
  daily?: ApiV1CurrentGetResponseDaily[];
}
