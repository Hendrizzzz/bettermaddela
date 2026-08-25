"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const destinations = [
  { href: "/services/certificates", label: { en: "Birth Certificate", fil: "Sertipiko ng Kapanganakan" }, keywords: "birth marriage death certificate civil registry kapanganakan kasal kamatayan" },
  { href: "/services/business", label: { en: "Business Permit", fil: "Permit sa Negosyo" }, keywords: "business permit licensing renewal negosyo lisensya" },
  { href: "/services/tax-payments", label: { en: "Real Property Tax", fil: "Buwis sa Ari-arian" }, keywords: "property tax payment treasury buwis ari-arian bayad" },
  { href: "/government", label: { en: "Barangays", fil: "Mga Barangay" }, keywords: "barangays government geography pamahalaan" },
  { href: "/statistics", label: { en: "Population", fil: "Populasyon" }, keywords: "population census statistics growth populasyon estadistika" },
  { href: "/legal-history", label: { en: "Legal history", fil: "Legal na kasaysayan" }, keywords: "law laws legal history acts executive order batas kasaysayan" },
];

const searchCopy = {
  en: { title: "Find a Service", label: "Search services", placeholder: "e.g., birth certificate, business permit", action: "Search", browse: "Browse:", destinations: "Browse destinations" },
  fil: { title: "Maghanap ng Serbisyo", label: "Maghanap ng serbisyo", placeholder: "hal., birth certificate, permit sa negosyo", action: "Maghanap", browse: "Tingnan:", destinations: "Tingnan ang mga destinasyon" },
} as const;

export function VerifiedSearch() {
  const { language } = useLanguage();
  const copy = searchCopy[language];
  const router = useRouter();
  const [query, setQuery] = useState("");

  function navigateToQuery() {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return;

    const match = destinations.find((item) =>
      `${item.label.en} ${item.label.fil} ${item.keywords}`.toLowerCase().includes(normalized),
    );
    router.push(match?.href ?? "/services");
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigateToQuery();
  }

  function submitFromInput(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    navigateToQuery();
  }

  return (
    <div className="home-search-box">
      <h2><i className="bi bi-search" aria-hidden="true"></i> {copy.title}</h2>
      <form role="search" onSubmit={submit}>
        <label className="sr-only" htmlFor="verified-search">{copy.label}</label>
        <div className="search-input-wrapper">
          <input
            id="verified-search"
            className="service-search-input"
            type="search"
            list="verified-destinations"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={submitFromInput}
            placeholder={copy.placeholder}
          />
          <datalist id="verified-destinations">
            {destinations.map((item) => <option key={item.href} value={item.label[language]} />)}
          </datalist>
          <button type="submit" className="search-submit-btn" aria-label={copy.action}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
      <div className="home-search-tags" aria-label={copy.destinations}>
        <span>{copy.browse}</span>
        {destinations.slice(0, 3).map((item) => (
          <Link key={item.href} href={item.href}>{item.label[language]}</Link>
        ))}
      </div>
    </div>
  );
}
