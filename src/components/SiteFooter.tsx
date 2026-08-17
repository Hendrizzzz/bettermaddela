"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export function SiteFooter() {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" lang={language === "fil" ? "fil" : "en"}>
      <div className="container">
        <div className="footer-main-new">
          <div className="footer-brand">
            <Link href="/" aria-label="BetterMaddela home">
              <img
                src="/assets/images/logo/better-maddela-logo-white.svg"
                alt="BetterMaddela logo"
                className="footer-logo"
              />
            </Link>
            <p className="footer-tagline">{t("footer-tagline")}</p>
          </div>

          <nav className="footer-column" aria-label={t("footer-quick-links")}>
            <h2 className="footer-heading">{t("footer-quick-links")}</h2>
            <ul className="footer-links-new">
              <li><Link href="/sitemap">{t("footer-sitemap")}</Link></li>
              <li><Link href="/terms">{t("footer-terms")}</Link></li>
              <li><Link href="/privacy">{t("footer-privacy")}</Link></li>
              <li><Link href="/accessibility">{t("footer-accessibility")}</Link></li>
              <li><Link href="/faq">{t("footer-faq")}</Link></li>
            </ul>
          </nav>

          <nav className="footer-column" aria-label={t("footer-resources")}>
            <h2 className="footer-heading">{t("footer-resources")}</h2>
            <ul className="footer-links-new">
              <li><Link href="/sources">{t("footer-sources")}</Link></li>
              <li><a href="https://data.gov.ph" target="_blank" rel="noopener noreferrer">{t("footer-open-data")}</a></li>
              <li><a href="https://www.foi.gov.ph/" target="_blank" rel="noopener noreferrer">{t("footer-foi")}</a></li>
            </ul>
          </nav>

          <div className="footer-column">
            <div className="footer-cost" role="status">{t("footer-cost")} <span className="footer-cost-value">₱0</span></div>
            <a href="https://github.com/Hendrizzzz/bettermaddela" className="footer-contribute" target="_blank" rel="noopener noreferrer"><i className="bi bi-github" aria-hidden="true" /> {t("footer-contribute")}</a>
            <a href="https://github.com/Jayke770/betteraurora" className="footer-contribute" target="_blank" rel="noopener noreferrer"><i className="bi bi-code-slash" aria-hidden="true" /> {t("footer-foundation")}</a>
            <p className="footer-foundation-note">{t("footer-attribution-note")}</p>
          </div>
        </div>

        <div className="footer-bottom-new">
          <div className="footer-copyright">
            <span className="footer-copyright-text">© {currentYear} BetterMaddela</span>
            <span className="footer-copyright-license">MIT | CC BY 4.0</span>
            <span className="footer-copyright-disclaimer">{t("footer-disclaimer")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
