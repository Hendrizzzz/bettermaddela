"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const translations = {
  en: {
    "nav-home": "Home", "nav-services": "Services", "nav-government": "Government",
    "nav-statistics": "Statistics", "nav-legislative": "Legislative",
    "nav-transparency": "Transparency", "nav-contact": "Contact",
    "dropdown-certificates": "Certificates", "dropdown-business": "Business",
    "dropdown-tax-payments": "Tax Payments", "dropdown-social-services": "Social Services",
    "dropdown-health": "Health", "dropdown-agriculture": "Agriculture",
    "dropdown-infrastructure": "Infrastructure", "dropdown-education": "Education",
    "dropdown-public-safety": "Public Safety", "dropdown-environment": "Environment",
    "dropdown-ordinance-framework": "Ordinance Framework",
    "dropdown-resolution-framework": "Resolution Framework",
    "info-bar-label": "Project and Philippine time information",
    "info-independent": "Independent project — not official",
    "footer-tagline": "Independent, volunteer-maintained civic information for Maddela, Quirino.",
    "footer-quick-links": "Quick Links", "footer-resources": "Resources",
    "footer-sources": "Sources and verification", "footer-privacy": "Privacy Policy",
    "footer-accessibility": "Accessibility", "footer-sitemap": "Sitemap",
    "footer-terms": "Terms of Use", "footer-faq": "Frequently Asked Questions",
    "footer-open-data": "Open Data Philippines",
    "footer-foi": "Freedom of Information", "footer-cost": "Cost to the people of Maddela =",
    "footer-contribute": "Contribute on GitHub", "footer-foundation": "BetterAurora foundation",
    "footer-attribution-note": "Adapted from BetterAurora. Attribution does not imply endorsement.",
    "footer-disclaimer": "Independent community project — not an official government website.",
  },
  fil: {
    "nav-home": "Home", "nav-services": "Mga Serbisyo", "nav-government": "Pamahalaan",
    "nav-statistics": "Estadistika", "nav-legislative": "Lehislatura",
    "nav-transparency": "Transparency", "nav-contact": "Makipag-ugnayan",
    "dropdown-certificates": "Mga Sertipiko", "dropdown-business": "Negosyo",
    "dropdown-tax-payments": "Pagbabayad ng Buwis", "dropdown-social-services": "Serbisyong Panlipunan",
    "dropdown-health": "Kalusugan", "dropdown-agriculture": "Agrikultura",
    "dropdown-infrastructure": "Imprastraktura", "dropdown-education": "Edukasyon",
    "dropdown-public-safety": "Kaligtasang Pampubliko", "dropdown-environment": "Kapaligiran",
    "dropdown-ordinance-framework": "Balangkas ng Ordinansa",
    "dropdown-resolution-framework": "Balangkas ng Resolusyon",
    "info-bar-label": "Impormasyon tungkol sa proyekto at oras sa Pilipinas",
    "info-independent": "Malayang proyekto — hindi opisyal",
    "footer-tagline": "Malaya at boluntaryong pinananatiling impormasyong sibiko para sa Maddela, Quirino.",
    "footer-quick-links": "Mga Mabilisang Link", "footer-resources": "Mga Mapagkukunan",
    "footer-sources": "Mga sanggunian at beripikasyon", "footer-privacy": "Patakaran sa Privacy",
    "footer-accessibility": "Aksesibilidad", "footer-sitemap": "Mapa ng Site",
    "footer-terms": "Mga Tuntunin ng Paggamit", "footer-faq": "Mga Madalas Itanong",
    "footer-open-data": "Open Data Philippines",
    "footer-foi": "Kalayaan sa Impormasyon", "footer-cost": "Gastos sa mga tao ng Maddela =",
    "footer-contribute": "Mag-ambag sa GitHub", "footer-foundation": "Pundasyong BetterAurora",
    "footer-attribution-note": "Hinango mula sa BetterAurora. Ang attribution ay hindi nangangahulugang pag-endorso.",
    "footer-disclaimer": "Malayang proyektong pangkomunidad — hindi opisyal na website ng pamahalaan.",
  },
} as const;

type Language = keyof typeof translations;
type TranslationKey = keyof typeof translations.en;

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("bettermaddela_language");
    if (savedLanguage === "en" || savedLanguage === "fil") {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("bettermaddela_language", nextLanguage);
  };

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    t: (key) => translations[language][key] ?? translations.en[key],
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
