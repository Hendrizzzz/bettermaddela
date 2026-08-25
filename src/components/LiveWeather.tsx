"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const CACHE_TTL = 30 * 60 * 1000;
const DEGRADED_CACHE_TTL = 6 * 60 * 60 * 1000;

export interface WeatherConfigData {
  pagasaStation: {
    siteId: string;
    name: string;
    verifiedOn: string;
  };
  forecastProvider: {
    name: string;
    endpoint: string;
    documentationUrl: string;
    termsUrl: string;
    attribution: string;
    timezone: string;
  };
  forecastPoint: {
    latitude: number;
    longitude: number;
    providerResultLabel: string;
    providerAdministrativeLevel: string;
    verifiedOn: string;
    classification: string;
    disclaimer: string;
  };
  map: {
    searchUrl: string;
    attribution: string;
  };
}

interface ForecastSlot {
  time: string;
  temperature: number;
  weatherCode: number;
}

interface DayForecast {
  date: string;
  maximum: number;
  minimum: number;
  precipitationProbability: number;
  weatherCode: number;
}

interface WeatherData {
  time: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  hourly: ForecastSlot[];
  daily: DayForecast[];
  fetchedAt: number;
}

interface OpenMeteoResponse {
  current?: {
    time?: string;
    temperature_2m?: number;
    apparent_temperature?: number;
    relative_humidity_2m?: number;
    weather_code?: number;
    wind_speed_10m?: number;
  };
  hourly?: {
    time?: string[];
    temperature_2m?: number[];
    weather_code?: number[];
  };
  daily?: {
    time?: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: number[];
    weather_code?: number[];
  };
}

const weatherLabels: Record<number, { en: string; fil: string; icon: string }> = {
  0: { en: "Clear sky", fil: "Maaliwalas", icon: "bi-sun-fill" },
  1: { en: "Mainly clear", fil: "Kadalasang maaliwalas", icon: "bi-cloud-sun-fill" },
  2: { en: "Partly cloudy", fil: "Bahagyang maulap", icon: "bi-cloud-sun-fill" },
  3: { en: "Overcast", fil: "Maulap", icon: "bi-clouds-fill" },
  45: { en: "Fog", fil: "Maulap na may hamog", icon: "bi-cloud-fog-fill" },
  48: { en: "Rime fog", fil: "Makapal na hamog", icon: "bi-cloud-fog-fill" },
  51: { en: "Light drizzle", fil: "Mahinang ambon", icon: "bi-cloud-drizzle-fill" },
  53: { en: "Drizzle", fil: "Ambon", icon: "bi-cloud-drizzle-fill" },
  55: { en: "Dense drizzle", fil: "Malakas na ambon", icon: "bi-cloud-drizzle-fill" },
  61: { en: "Slight rain", fil: "Mahinang ulan", icon: "bi-cloud-rain-fill" },
  63: { en: "Moderate rain", fil: "Katamtamang ulan", icon: "bi-cloud-rain-fill" },
  65: { en: "Heavy rain", fil: "Malakas na ulan", icon: "bi-cloud-rain-heavy-fill" },
  71: { en: "Slight snow", fil: "Mahinang niyebe", icon: "bi-cloud-snow-fill" },
  73: { en: "Snow", fil: "Niyebe", icon: "bi-cloud-snow-fill" },
  75: { en: "Heavy snow", fil: "Malakas na niyebe", icon: "bi-cloud-snow-fill" },
  77: { en: "Snow grains", fil: "Butil ng niyebe", icon: "bi-cloud-snow-fill" },
  80: { en: "Rain showers", fil: "Pabugsong ulan", icon: "bi-cloud-rain-fill" },
  81: { en: "Rain showers", fil: "Pabugsong ulan", icon: "bi-cloud-rain-fill" },
  82: { en: "Heavy showers", fil: "Malakas na buhos ng ulan", icon: "bi-cloud-rain-heavy-fill" },
  85: { en: "Snow showers", fil: "Pabugsong niyebe", icon: "bi-cloud-snow-fill" },
  86: { en: "Heavy snow showers", fil: "Malakas na pabugsong niyebe", icon: "bi-cloud-snow-fill" },
  95: { en: "Thunderstorm", fil: "Pagkulog at pagkidlat", icon: "bi-cloud-lightning-rain-fill" },
  96: { en: "Thunderstorm with hail", fil: "Pagkulog na may yelo", icon: "bi-cloud-lightning-rain-fill" },
  99: { en: "Severe thunderstorm", fil: "Malakas na pagkulog", icon: "bi-cloud-lightning-rain-fill" },
};

const copy = {
  en: {
    loading: "Loading live weather forecast",
    unavailable: "Live weather is temporarily unavailable.",
    retry: "Try again",
    location: "Forecast point near Maddela",
    feelsLike: "Feels like",
    humidity: "Humidity",
    wind: "Wind",
    nextHours: "Next hours",
    nextDays: "Next days",
    rain: "rain",
    updated: "Updated",
    cached: "Temporarily showing a recent cached forecast.",
    modelForecast: "model forecast",
    temperatureCelsius: "degrees Celsius",
    details: "Weather details",
  },
  fil: {
    loading: "Kinukuha ang live na taya ng panahon",
    unavailable: "Pansamantalang hindi available ang live na taya ng panahon.",
    retry: "Subukan muli",
    location: "Punto ng forecast malapit sa Maddela",
    feelsLike: "Pakiramdam",
    humidity: "Halumigmig",
    wind: "Hangin",
    nextHours: "Mga susunod na oras",
    nextDays: "Mga susunod na araw",
    rain: "ulan",
    updated: "Na-update",
    cached: "Pansamantalang ipinapakita ang kamakailang naka-cache na forecast.",
    modelForecast: "model forecast",
    temperatureCelsius: "digri Celsius",
    details: "Mga detalye ng panahon",
  },
} as const;

function weatherLabel(code: number) {
  return weatherLabels[code] ?? {
    en: "Weather conditions",
    fil: "Kalagayan ng panahon",
    icon: "bi-cloud-fill",
  };
}

function round(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? Math.round(value) : 0;
}

function parseResponse(response: OpenMeteoResponse): WeatherData {
  const current = response.current;
  if (
    !current?.time ||
    typeof current.temperature_2m !== "number" ||
    typeof current.apparent_temperature !== "number" ||
    typeof current.relative_humidity_2m !== "number" ||
    typeof current.weather_code !== "number" ||
    typeof current.wind_speed_10m !== "number"
  ) {
    throw new Error("Open-Meteo did not return the required current-weather fields.");
  }

  const hourlyTimes = response.hourly?.time ?? [];
  const hourlyTemperatures = response.hourly?.temperature_2m ?? [];
  const hourlyCodes = response.hourly?.weather_code ?? [];
  const firstFutureHour = hourlyTimes.findIndex((time) => time > current.time!);
  const hourlyStart = firstFutureHour >= 0 ? firstFutureHour : 0;
  const hourly: ForecastSlot[] = [];

  for (let index = hourlyStart; index < Math.min(hourlyStart + 4, hourlyTimes.length); index += 1) {
    if (typeof hourlyTemperatures[index] !== "number" || typeof hourlyCodes[index] !== "number") continue;
    hourly.push({
      time: hourlyTimes[index],
      temperature: round(hourlyTemperatures[index]),
      weatherCode: hourlyCodes[index],
    });
  }

  const dailyTimes = response.daily?.time ?? [];
  const dailyMaximums = response.daily?.temperature_2m_max ?? [];
  const dailyMinimums = response.daily?.temperature_2m_min ?? [];
  const dailyPrecipitation = response.daily?.precipitation_probability_max ?? [];
  const dailyCodes = response.daily?.weather_code ?? [];
  const daily: DayForecast[] = [];

  for (let index = 0; index < Math.min(3, dailyTimes.length); index += 1) {
    if (
      typeof dailyMaximums[index] !== "number" ||
      typeof dailyMinimums[index] !== "number" ||
      typeof dailyPrecipitation[index] !== "number" ||
      typeof dailyCodes[index] !== "number"
    ) continue;
    daily.push({
      date: dailyTimes[index],
      maximum: round(dailyMaximums[index]),
      minimum: round(dailyMinimums[index]),
      precipitationProbability: round(dailyPrecipitation[index]),
      weatherCode: dailyCodes[index],
    });
  }

  return {
    time: current.time,
    temperature: round(current.temperature_2m),
    feelsLike: round(current.apparent_temperature),
    humidity: round(current.relative_humidity_2m),
    windSpeed: round(current.wind_speed_10m),
    weatherCode: current.weather_code,
    hourly,
    daily,
    fetchedAt: Date.now(),
  };
}

function readCache(key: string, maximumAge: number): WeatherData | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const data = JSON.parse(raw) as WeatherData;
    if (!data.fetchedAt || Date.now() - data.fetchedAt > maximumAge) {
      window.localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function writeCache(key: string, data: WeatherData) {
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Weather remains usable when storage is unavailable or full.
  }
}

export function LiveWeather({ config }: { config: WeatherConfigData }) {
  const { language } = useLanguage();
  const text = copy[language];
  const [data, setData] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [cached, setCached] = useState(false);
  const cacheKey = useMemo(
    () => `bettermaddela-weather-v1:${config.forecastPoint.latitude}:${config.forecastPoint.longitude}`,
    [config.forecastPoint.latitude, config.forecastPoint.longitude],
  );

  const load = useCallback(async (force = false) => {
    setStatus("loading");
    setCached(false);

    if (!force) {
      const fresh = readCache(cacheKey, CACHE_TTL);
      if (fresh) {
        setData(fresh);
        setStatus("ready");
        return;
      }
    }

    const params = new URLSearchParams({
      latitude: String(config.forecastPoint.latitude),
      longitude: String(config.forecastPoint.longitude),
      current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
      hourly: "temperature_2m,weather_code",
      daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
      timezone: config.forecastProvider.timezone,
      forecast_days: "4",
    });
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 10_000);

    try {
      const response = await fetch(`${config.forecastProvider.endpoint}?${params.toString()}`, {
        cache: "no-store",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Open-Meteo request failed with ${response.status}.`);
      const result = parseResponse(await response.json() as OpenMeteoResponse);
      writeCache(cacheKey, result);
      setData(result);
      setStatus("ready");
    } catch {
      const recent = readCache(cacheKey, DEGRADED_CACHE_TTL);
      if (recent) {
        setData(recent);
        setCached(true);
        setStatus("ready");
      } else {
        setData(null);
        setStatus("error");
      }
    } finally {
      window.clearTimeout(timer);
    }
  }, [cacheKey, config]);

  useEffect(() => {
    void load();
  }, [load]);

  const locale = language === "fil" ? "fil-PH" : "en-PH";

  if (status === "loading") {
    return (
      <div className="weather-loading" role="status" aria-label={text.loading} aria-busy="true">
        <div className="weather-current">
          <div className="skeleton-circle" aria-hidden="true" />
          <div className="weather-current-info" aria-hidden="true">
            <div className="skeleton-text skeleton-lg" />
            <div className="skeleton-text skeleton-md weather-skeleton-gap" />
            <div className="skeleton-text skeleton-sm weather-skeleton-gap" />
          </div>
        </div>
        <div className="weather-stats" aria-hidden="true">
          <div className="skeleton-text skeleton-stat" />
          <div className="skeleton-text skeleton-stat" />
          <div className="skeleton-text skeleton-stat" />
        </div>
        <div className="weather-hourly" aria-hidden="true">
          {[0, 1, 2, 3].map((item) => <div className="skeleton-hour" key={item} />)}
        </div>
      </div>
    );
  }

  if (status === "error" || !data) {
    return (
      <div className="weather-error" role="status">
        <div className="weather-error-content">
          <i className="bi bi-cloud-slash" aria-hidden="true" />
          <p>{text.unavailable}</p>
          <button type="button" className="btn btn-sm btn-primary weather-retry-btn" onClick={() => void load(true)}>
            <i className="bi bi-arrow-clockwise" aria-hidden="true" /> {text.retry}
          </button>
        </div>
      </div>
    );
  }

  const current = weatherLabel(data.weatherCode);
  const updated = new Intl.DateTimeFormat(locale, {
    timeZone: config.forecastProvider.timezone,
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(data.fetchedAt);

  return (
    <div className="weather-widget" role="region" aria-label={`${text.location}: ${current[language]}`}>
      <div className="weather-current">
        <div className="weather-current-icon" aria-hidden="true">
          <i className={`bi ${current.icon}`} />
        </div>
        <div className="weather-current-info">
          <div className="weather-current-temp" aria-label={`${data.temperature} ${text.temperatureCelsius}`}>{data.temperature}°C</div>
          <div className="weather-current-condition">{current[language]}</div>
          <div className="weather-current-location">
            <i className="bi bi-geo-alt" aria-hidden="true" /> {text.location}
          </div>
        </div>
      </div>

      <div className="weather-stats" role="list" aria-label={text.details}>
        <div className="weather-stat" role="listitem" title={text.feelsLike}>
          <i className="bi bi-thermometer-half" aria-hidden="true" />
          <span>{data.feelsLike}°C</span>
        </div>
        <div className="weather-stat" role="listitem" title={text.humidity}>
          <i className="bi bi-droplet" aria-hidden="true" />
          <span>{data.humidity}%</span>
        </div>
        <div className="weather-stat" role="listitem" title={text.wind}>
          <i className="bi bi-wind" aria-hidden="true" />
          <span>{data.windSpeed} km/h</span>
        </div>
      </div>

      {data.hourly.length > 0 && (
        <div className="weather-forecast-block">
          <p className="weather-forecast-label">{text.nextHours}</p>
          <div className="weather-hourly" role="list" aria-label={text.nextHours}>
            {data.hourly.map((hour) => {
              const hourWeather = weatherLabel(hour.weatherCode);
              const time = new Intl.DateTimeFormat(locale, {
                hour: "numeric",
                hour12: true,
                timeZone: config.forecastProvider.timezone,
              }).format(new Date(`${hour.time}:00+08:00`));
              return (
                <div className="weather-hour" role="listitem" key={hour.time} title={hourWeather[language]}>
                  <span className="weather-hour-time">{time}</span>
                  <i className={`bi ${hourWeather.icon}`} aria-hidden="true" />
                  <span className="weather-hour-temp">{hour.temperature}°</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {data.daily.length > 0 && (
        <div className="weather-daily" role="list" aria-label={text.nextDays}>
          {data.daily.map((day, index) => {
            const dayWeather = weatherLabel(day.weatherCode);
            const dayLabel = index === 0
              ? (language === "fil" ? "Ngayon" : "Today")
              : new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: config.forecastProvider.timezone })
                .format(new Date(`${day.date}T00:00:00+08:00`));
            return (
              <div className="weather-day" role="listitem" key={day.date} title={dayWeather[language]}>
                <span className="weather-day-name">{dayLabel}</span>
                <i className={`bi ${dayWeather.icon}`} aria-hidden="true" />
                <span className="weather-day-rain"><i className="bi bi-droplet" aria-hidden="true" /> {day.precipitationProbability}%</span>
                <span className="weather-day-temp"><strong>{day.maximum}°</strong> {day.minimum}°</span>
              </div>
            );
          })}
        </div>
      )}

      <p className="weather-source-note">
        {cached && <span>{text.cached} </span>}
        <a href={config.forecastProvider.documentationUrl} target="_blank" rel="noreferrer">
          {config.forecastProvider.attribution} · {text.modelForecast}
        </a>
        <span> · {text.updated} {updated}</span>
      </p>
    </div>
  );
}
