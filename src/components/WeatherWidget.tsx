'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// Aurora, Zamboanga del Sur (same coordinates used by the info bar)
const LAT = 7.95;
const LON = 123.58;
const API_URL =
    `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
    '&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m' +
    '&timezone=Asia%2FManila';

interface WeatherData {
    temp: number;
    feelsLike: number;
    humidity: number;
    wind: number;
    precip: number;
    code: number;
    time: string;
}

/** Map a WMO weather code to a label and a Bootstrap icon. */
function describeWeather(code: number): { label: string; icon: string } {
    if (code === 0) return { label: 'Clear sky', icon: 'bi-sun-fill' };
    if (code === 1) return { label: 'Mainly clear', icon: 'bi-cloud-sun-fill' };
    if (code === 2) return { label: 'Partly cloudy', icon: 'bi-cloud-sun-fill' };
    if (code === 3) return { label: 'Overcast', icon: 'bi-clouds-fill' };
    if (code === 45 || code === 48) return { label: 'Fog', icon: 'bi-cloud-fog2-fill' };
    if (code >= 51 && code <= 55) return { label: 'Drizzle', icon: 'bi-cloud-drizzle-fill' };
    if (code === 56 || code === 57) return { label: 'Freezing drizzle', icon: 'bi-cloud-sleet-fill' };
    if (code >= 61 && code <= 65) return { label: 'Rain', icon: 'bi-cloud-rain-fill' };
    if (code === 66 || code === 67) return { label: 'Freezing rain', icon: 'bi-cloud-sleet-fill' };
    if (code >= 71 && code <= 77) return { label: 'Snow', icon: 'bi-cloud-snow-fill' };
    if (code >= 80 && code <= 82) return { label: 'Rain showers', icon: 'bi-cloud-rain-heavy-fill' };
    if (code === 85 || code === 86) return { label: 'Snow showers', icon: 'bi-cloud-snow-fill' };
    if (code >= 95) return { label: 'Thunderstorm', icon: 'bi-cloud-lightning-rain-fill' };
    return { label: 'Unknown', icon: 'bi-cloud-fill' };
}

function formatUpdated(iso: string): string {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    let h = d.getHours();
    const m = d.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m < 10 ? '0' + m : m} ${ampm}`;
}

export default function WeatherWidget() {
    const { t } = useLanguage();
    const [data, setData] = useState<WeatherData | null>(null);
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

    useEffect(() => {
        let cancelled = false;
        fetch(API_URL)
            .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Weather request failed'))))
            .then((json) => {
                if (cancelled) return;
                const c = json?.current;
                if (!c || c.temperature_2m == null) throw new Error('No current weather');
                setData({
                    temp: Math.round(c.temperature_2m),
                    feelsLike: Math.round(c.apparent_temperature),
                    humidity: Math.round(c.relative_humidity_2m),
                    wind: Math.round(c.wind_speed_10m),
                    precip: Math.round((c.precipitation ?? 0) * 10) / 10,
                    code: c.weather_code ?? 0,
                    time: c.time ?? '',
                });
                setStatus('ready');
            })
            .catch(() => {
                if (!cancelled) setStatus('error');
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const weather = data ? describeWeather(data.code) : null;

    return (
        <div className="weather-widget" role="region" aria-label="Current weather in Aurora">
            {status === 'loading' && (
                <div className="weather-loading" aria-hidden="true">
                    <div className="weather-skeleton weather-skeleton-lg" />
                    <div className="weather-skeleton weather-skeleton-grid" />
                </div>
            )}

            {status === 'error' && (
                <div className="weather-error">
                    <i className="bi bi-cloud-slash"></i>
                    <span>Weather data unavailable right now.</span>
                </div>
            )}

            {status === 'ready' && data && weather && (
                <>
                    <div className="weather-current">
                        <div className="weather-current-icon">
                            <i className={`bi ${weather.icon}`}></i>
                        </div>
                        <div className="weather-current-info">
                            <div className="weather-current-temp">{data.temp}°C</div>
                            <div className="weather-current-condition">{weather.label}</div>
                            <div className="weather-current-location">
                                <i className="bi bi-geo-alt"></i> {t('weather-location')}
                            </div>
                        </div>
                    </div>

                    <div className="weather-stats">
                        <div className="weather-stat">
                            <i className="bi bi-thermometer-half"></i>
                            <div className="weather-stat-text">
                                <span className="weather-stat-value">{data.feelsLike}°C</span>
                                <span className="weather-stat-label">Feels like</span>
                            </div>
                        </div>
                        <div className="weather-stat">
                            <i className="bi bi-droplet-fill"></i>
                            <div className="weather-stat-text">
                                <span className="weather-stat-value">{data.humidity}%</span>
                                <span className="weather-stat-label">Humidity</span>
                            </div>
                        </div>
                        <div className="weather-stat">
                            <i className="bi bi-wind"></i>
                            <div className="weather-stat-text">
                                <span className="weather-stat-value">{data.wind} km/h</span>
                                <span className="weather-stat-label">Wind</span>
                            </div>
                        </div>
                        <div className="weather-stat">
                            <i className="bi bi-cloud-rain"></i>
                            <div className="weather-stat-text">
                                <span className="weather-stat-value">{data.precip} mm</span>
                                <span className="weather-stat-label">Precipitation</span>
                            </div>
                        </div>
                    </div>

                    <div className="weather-updated">
                        <i className="bi bi-arrow-clockwise"></i>
                        <span>Updated {formatUpdated(data.time)} • Open-Meteo</span>
                    </div>
                </>
            )}
        </div>
    );
}
