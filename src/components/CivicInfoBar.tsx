"use client";

import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function CivicInfoBar() {
  const { language, t } = useLanguage();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const updateClock = useCallback(() => {
    const now = new Date();
    const locale = language === "fil" ? "fil-PH" : "en-PH";
    setDate(new Intl.DateTimeFormat(locale, { timeZone: "Asia/Manila", month: "short", day: "numeric", year: "numeric" }).format(now));
    setTime(new Intl.DateTimeFormat(locale, { timeZone: "Asia/Manila", hour: "numeric", minute: "2-digit", hour12: true }).format(now));
  }, [language]);

  useEffect(() => {
    updateClock();
    const interval = window.setInterval(updateClock, 30_000);
    return () => window.clearInterval(interval);
  }, [updateClock]);

  return (
    <div className="info-bar" lang={language === "fil" ? "fil" : "en"} role="complementary" aria-label={t("info-bar-label")}>
      <div className="container">
        <div className="info-bar-inner">
          <div className="info-bar-item info-bar-rates">
            <i className="bi bi-info-circle" aria-hidden="true" />
            <span className="rate-display">{t("info-independent")}</span>
          </div>
          <div className="info-bar-item info-bar-weather">
            <i className="bi bi-geo-alt" aria-hidden="true" />
            <span className="weather-location">Maddela, Quirino</span>
          </div>
          <div className="info-bar-item info-bar-datetime">
            <i className="bi bi-calendar3" aria-hidden="true" />
            <span className="date-value">{date}</span>
            <span className="datetime-separator" aria-hidden="true">•</span>
            <i className="bi bi-clock" aria-hidden="true" />
            <span className="time-value">{time}</span>
            <span className="time-label">PHT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
