"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function SkipLink() {
  const { t } = useLanguage();
  return (
    <a className="skip-link" href="#main-content">{t("skip-link")}</a>
  );
}
