"use client";

import Link from "next/link";
import { LiveWeather, type WeatherConfigData } from "@/components/LiveWeather";
import { VerifiedSearch } from "@/components/VerifiedSearch";
import { useLanguage } from "@/contexts/LanguageContext";
import { getRecord } from "@/data/civic";

interface IdentityData {
  incomeClass: string;
}

interface PopulationData {
  population: number;
}

interface BarangayData {
  barangayCount: number;
}

interface HouseholdData {
  numberOfHouseholds: number;
}

interface HistoryProfileData {
  overview: string;
  sections: Array<{
    period: string;
    title: string;
    kind: string;
    text: string;
  }>;
  publicationNote: string;
}

interface CommunityProfileData {
  summary: string;
  themes: Array<{
    label: string;
    description: string;
  }>;
}

interface LeadershipData {
  leaders: Array<{
    name: string;
    title: string;
    scope: string;
    asOf: string;
    evidenceContext: string;
  }>;
  limitations: string;
}

interface NewsData {
  items: Array<{
    id: string;
    headline: string;
    summary: string;
    publisher: string;
    publishedAt: string;
    eventDate?: string;
    category: string;
    status: string;
    canonicalUrl: string;
  }>;
  limitations: string;
}

const serviceCategories = [
  {
    href: "/services/certificates",
    icon: "bi-file-earmark-text-fill",
    title: { en: "Certificates", fil: "Mga Sertipiko" },
    description: { en: "Civil registry and certificate information", fil: "Impormasyon sa civil registry at mga sertipiko" },
  },
  {
    href: "/services/business",
    icon: "bi-shop",
    title: { en: "Business Permits", fil: "Mga Permit sa Negosyo" },
    description: { en: "Business-related service information", fil: "Impormasyon sa mga serbisyong pangnegosyo" },
  },
  {
    href: "/services/tax-payments",
    icon: "bi-cash-coin",
    title: { en: "Tax Payments", fil: "Pagbabayad ng Buwis" },
    description: { en: "Local tax and payment information", fil: "Impormasyon sa lokal na buwis at pagbabayad" },
  },
  {
    href: "/services/social-services",
    icon: "bi-people-fill",
    title: { en: "Social Services", fil: "Serbisyong Panlipunan" },
    description: { en: "Social assistance program information", fil: "Impormasyon sa mga programang panlipunang tulong" },
  },
  {
    href: "/services/health",
    icon: "bi-heart-pulse-fill",
    title: { en: "Health Services", fil: "Serbisyong Pangkalusugan" },
    description: { en: "Municipal health service information", fil: "Impormasyon sa serbisyong pangkalusugan ng munisipalidad" },
  },
  {
    href: "/services/agriculture",
    icon: "bi-tree-fill",
    title: { en: "Agriculture", fil: "Agrikultura" },
    description: { en: "Agriculture and livelihood information", fil: "Impormasyon sa agrikultura at kabuhayan" },
  },
  {
    href: "/services/infrastructure",
    icon: "bi-building-fill-gear",
    title: { en: "Infrastructure", fil: "Imprastraktura" },
    description: { en: "Public-works and infrastructure information", fil: "Impormasyon sa imprastruktura at mga proyektong pampubliko" },
  },
  {
    href: "/services/education",
    icon: "bi-mortarboard-fill",
    title: { en: "Education", fil: "Edukasyon" },
    description: { en: "Education and scholarship information", fil: "Impormasyon sa edukasyon at mga iskolarship" },
  },
  {
    href: "/services/public-safety",
    icon: "bi-shield-fill-check",
    title: { en: "Public Safety", fil: "Kaligtasang Pampubliko" },
    description: { en: "Safety and preparedness information", fil: "Impormasyon sa kaligtasan at paghahanda" },
  },
  {
    href: "/services/environment",
    icon: "bi-globe-americas",
    title: { en: "Environment", fil: "Kapaligiran" },
    description: { en: "Environment and natural-resources information", fil: "Impormasyon sa kapaligiran at likas na yaman" },
  },
];

const homeCopy = {
  en: {
    welcome: "Welcome to BetterMaddela",
    introduction: "Access civic information and public-source records for the people of Maddela, Quirino.",
    browseServices: "Browse Services",
    contactInformation: "Contact Information",
    serviceCategories: "Service Categories",
    serviceNotice: "Browse service categories. Detailed requirements, fees, and processing times are not yet verified. Please confirm directly with the responsible office.",
    viewAllServices: "View All Services",
    browseDirectory: "Browse the service directory",
    atAGlance: "Maddela at a Glance",
    viewStatistics: "View Statistics",
    population: "Population",
    barangays: "Barangays",
    municipality: "Municipality",
    households: "Households",
    weatherLocation: "Weather & Location",
    history: "Brief History of Maddela",
    viewHistory: "View national legal history",
    sources: "Sources",
    historySourceNote: "Local tradition and documented legal milestones are identified separately.",
    updates: "Latest Updates",
    viewUpdates: "View All",
    leadership: "Municipal Leadership",
    viewGovernment: "View Government",
    asOf: "As of",
    contact: "Contact Information",
    viewAll: "View All",
    sourceDirectory: "Source Directory",
    sourceDirectoryNote: "Read the evidence and review dates behind published information.",
    corrections: "Contact & Corrections",
    correctionsNote: "Report an error or learn how this independent project handles corrections.",
    serviceInformation: "Service Information",
    serviceInformationNote: "Browse available categories and the limits of currently verified details.",
    localWeatherContext: "Local station context",
    separateForecast: "Forecast values are provided separately by Open-Meteo.",
    mapTitle: "General map view around Maddela, Quirino",
    mapNote: "General location view only; no municipal-hall pin or cadastral boundary is claimed.",
    exploreMap: "Explore Maddela on OpenStreetMap",
    incomeClassSuffix: "Class",
    maddelaToday: "Maddela today",
  },
  fil: {
    welcome: "Maligayang pagdating sa BetterMaddela",
    introduction: "Mag-access ng impormasyong sibiko at mga rekord mula sa pampublikong sanggunian para sa mga mamamayan ng Maddela, Quirino.",
    browseServices: "Tingnan ang mga Serbisyo",
    contactInformation: "Impormasyon sa Pakikipag-ugnayan",
    serviceCategories: "Mga Kategorya ng Serbisyo",
    serviceNotice: "Tingnan ang mga kategorya ng serbisyo. Hindi pa beripikado ang detalyadong requirements, bayarin, at oras ng pagproseso. Direktang kumpirmahin ang mga ito sa kinauukulang tanggapan.",
    viewAllServices: "Tingnan ang Lahat ng Serbisyo",
    browseDirectory: "Tingnan ang direktoryo ng serbisyo",
    atAGlance: "Maddela sa Isang Tingin",
    viewStatistics: "Tingnan ang Estadistika",
    population: "Populasyon",
    barangays: "Mga Barangay",
    municipality: "Munisipalidad",
    households: "Mga Sambahayan",
    weatherLocation: "Panahon at Lokasyon",
    history: "Maikling Kasaysayan ng Maddela",
    viewHistory: "Tingnan ang pambansang legal na kasaysayan",
    sources: "Mga Sanggunian",
    historySourceNote: "Magkahiwalay na tinutukoy ang lokal na salaysay at dokumentadong legal na pangyayari.",
    updates: "Pinakabagong Update",
    viewUpdates: "Tingnan Lahat",
    leadership: "Pamunuan ng Munisipalidad",
    viewGovernment: "Tingnan ang Pamahalaan",
    asOf: "Mula noong",
    contact: "Impormasyon sa Pakikipag-ugnayan",
    viewAll: "Tingnan Lahat",
    sourceDirectory: "Direktoryo ng mga Sanggunian",
    sourceDirectoryNote: "Basahin ang ebidensya at mga petsa ng pagsusuri sa likod ng impormasyong inilathala.",
    corrections: "Ugnayan at Pagwawasto",
    correctionsNote: "Mag-ulat ng mali o alamin kung paano pinangangasiwaan ng malayang proyektong ito ang pagwawasto.",
    serviceInformation: "Impormasyon sa Serbisyo",
    serviceInformationNote: "Tingnan ang mga kategorya at hangganan ng kasalukuyang beripikadong detalye.",
    localWeatherContext: "Lokal na konteksto ng istasyon",
    separateForecast: "Hiwalay na ibinibigay ng Open-Meteo ang mga forecast value.",
    mapTitle: "Pangkalahatang mapa sa paligid ng Maddela, Quirino",
    mapNote: "Pangkalahatang lokasyon lamang; walang inaangking pin ng munisipyo o hangganang kadastral.",
    exploreMap: "Tingnan ang Maddela sa OpenStreetMap",
    incomeClassSuffix: "Klase",
    maddelaToday: "Ang Maddela ngayon",
  },
} as const;

function formatDate(value: string, language: "en" | "fil") {
  return new Intl.DateTimeFormat(language === "fil" ? "fil-PH" : "en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Manila",
  }).format(new Date(`${value}T00:00:00+08:00`));
}

function updateBadgeClass(category: string) {
  const normalized = category.toLowerCase();
  if (normalized.includes("project") || normalized.includes("program")) return "home-news-badge--success";
  if (normalized.includes("advisory") || normalized.includes("procurement")) return "home-news-badge--warning";
  return "home-news-badge--info";
}

export default function HomePage() {
  const { language } = useLanguage();
  const copy = homeCopy[language];
  const identity = getRecord<IdentityData>("municipality-identity");
  const population = getRecord<PopulationData>("population-2024-popcen");
  const households = getRecord<HouseholdData>("maddela-households-2024");
  const barangays = getRecord<BarangayData>("barangay-dataset-2026q2");
  const history = getRecord<HistoryProfileData>("maddela-history-profile");
  const community = getRecord<CommunityProfileData>("maddela-community-profile");
  const weather = getRecord<WeatherConfigData>("maddela-weather-config");
  const news = getRecord<NewsData>("maddela-news-feed");
  const leadership = getRecord<LeadershipData>("maddela-leadership-snapshot");
  const updates = [...news.data.items]
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))
    .slice(0, 3);
  const municipalLeaders = leadership.data.leaders.filter(
    (leader) => leader.scope === "Municipality of Maddela",
  );
  const mapBbox = [
    weather.data.forecastPoint.longitude - 0.035,
    weather.data.forecastPoint.latitude - 0.03,
    weather.data.forecastPoint.longitude + 0.035,
    weather.data.forecastPoint.latitude + 0.03,
  ]
    .map((value) => value.toFixed(4))
    .join(",");

  return (
    <>
      {/* Hero Section */}
      <section className="home-hero-v2">
        <div className="container">
          <div className="home-hero-v2-inner">
            <div className="home-hero-v2-text">
              <h1>{copy.welcome}</h1>
              <p>{copy.introduction}</p>
              <div className="home-hero-v2-actions">
                <Link href="/services" className="btn btn-primary">
                  {copy.browseServices} <i className="bi bi-arrow-right" aria-hidden="true"></i>
                </Link>
                <Link href="/contact" className="btn btn-outline">
                  {copy.contactInformation}
                </Link>
              </div>
            </div>
            <div className="home-hero-v2-search">
              <VerifiedSearch />
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="section">
        <div className="container">
          <div className="home-section-header">
            <div>
              <h2>{copy.serviceCategories}</h2>
              <p>{copy.serviceNotice}</p>
            </div>
          </div>
          <div className="home-services-grid">
            {serviceCategories.map((service) => (
              <Link key={service.href} href={service.href} className="home-service-card">
                <div className="home-service-content">
                  <h3>{service.title[language]}</h3>
                  <p>{service.description[language]}</p>
                </div>
                <i className="bi bi-arrow-right home-service-arrow" aria-hidden="true"></i>
              </Link>
            ))}
            <Link href="/services" className="home-service-card home-service-card--all">
              <div className="home-service-content">
                <h3>{copy.viewAllServices}</h3>
              </div>
              <i className="bi bi-arrow-right home-service-arrow" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="home-stats-v2">
        <div className="container">
          <div className="home-stats-v2-header">
            <h2>{copy.atAGlance}</h2>
            <Link href="/statistics" className="home-section-link">
              {copy.viewStatistics} <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
          <div className="home-stats-v2-grid">
            <Link href="/statistics" className="home-stat-card">
              <div className="home-stat-card-content">
                <span className="home-stat-card-value">
                  {population.data.population.toLocaleString("en-PH")}
                </span>
                <span className="home-stat-card-label">{copy.population}</span>
              </div>
            </Link>
            <Link href="/statistics" className="home-stat-card">
              <div className="home-stat-card-content">
                <span className="home-stat-card-value">{barangays.data.barangayCount}</span>
                <span className="home-stat-card-label">{copy.barangays}</span>
              </div>
            </Link>
            <Link href="/statistics" className="home-stat-card">
              <div className="home-stat-card-content">
                <span className="home-stat-card-value">{identity.data.incomeClass} {copy.incomeClassSuffix}</span>
                <span className="home-stat-card-label">{copy.municipality}</span>
              </div>
            </Link>
            <Link href="/statistics" className="home-stat-card">
              <div className="home-stat-card-content">
                <span className="home-stat-card-value">{households.data.numberOfHouseholds.toLocaleString("en-PH")}</span>
                <span className="home-stat-card-label">{copy.households}</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Weather & Map */}
      <section className="section weather-map-section">
        <div className="container">
          <div className="home-stats-v2-header">
            <h2>{copy.weatherLocation}</h2>
          </div>
          <div className="weather-map-grid">
            <div className="weather-column">
              <div id="weather-container" aria-live="polite">
                <LiveWeather config={weather.data} />
              </div>
            </div>
            <div className="map-column">
              <div className="map-card">
                <div id="map-container" role="region" aria-label={copy.mapTitle} data-map-loaded="iframe">
                  <iframe
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(mapBbox)}&layer=mapnik`}
                    className="map-iframe"
                    title={copy.mapTitle}
                    loading="lazy"
                  />
                </div>
                <div className="map-attribution">
                  <i className="bi bi-geo-alt" aria-hidden="true" />
                  <span>
                    <a href={weather.data.map.searchUrl} target="_blank" rel="noreferrer">{copy.exploreMap}</a>
                    <span className="map-attribution-separator" aria-hidden="true"> · </span>
                    <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">{weather.data.map.attribution}</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="weather-map-notes">
            <p>
              <i className="bi bi-broadcast" aria-hidden="true" />
              <strong>{copy.localWeatherContext}:</strong>{" "}
              <a href="https://bagong.pagasa.dost.gov.ph/automated-weather-station/" target="_blank" rel="noreferrer">
                PAGASA {weather.data.pagasaStation.name} (site {weather.data.pagasaStation.siteId})
              </a>. {copy.separateForecast}
            </p>
            <p><i className="bi bi-map" aria-hidden="true" /> {copy.mapNote}</p>
          </div>
        </div>
      </section>

      {/* Brief History of Maddela */}
      <section className="section history-section">
        <div className="container">
          <div className="home-stats-v2-header">
            <h2>
              {copy.history}
            </h2>
            <Link href="/legal-history" className="home-section-link">
              {copy.viewHistory} <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
          <div className="history-content">
            <div className="history-timeline">
              {history.data.sections.map((section) => (
                <div className={`timeline-item timeline-item--${section.kind}`} data-year={section.period} key={`${section.period}-${section.title}`}>
                  <div className="timeline-marker" />
                  <div className="timeline-content" lang="en">
                    <span className="timeline-year">{section.period}</span>
                    <p><strong>{section.title}.</strong> {section.text}</p>
                  </div>
                </div>
              ))}
              <p className="history-publication-note">{copy.historySourceNote} <Link href="/sources">{copy.sources}</Link></p>
            </div>
            <div className="history-summary">
              {community.data.themes.slice(0, 2).map((theme) => (
                <div className="history-card" key={theme.label} lang="en">
                  <div className="history-card-content">
                    <h3>{theme.label}</h3>
                    <p>{theme.description}</p>
                  </div>
                </div>
              ))}
              <div className="history-card history-card--overview" lang="en">
                <div className="history-card-content">
                  <h3>{copy.maddelaToday}</h3>
                  <p>{community.data.summary}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="section">
        <div className="container">
          <div className="home-section-header">
            <h2>{copy.updates}</h2>
            <Link href="/news" className="home-section-link">
              {copy.viewUpdates} <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
          {updates.length > 0 && (
            <div className={`home-news-grid home-news-grid--${updates.length}`}>
              {updates.map((item) => (
                <article className="home-news-card" key={item.id} lang="en">
                  <div className="home-news-meta">
                    <span className={`home-news-badge ${updateBadgeClass(item.category)}`}>{item.category}</span>
                    <time className="home-news-date" dateTime={item.publishedAt}>{formatDate(item.publishedAt, language)}</time>
                  </div>
                  <h3><a href={item.canonicalUrl} target="_blank" rel="noreferrer">{item.headline}</a></h3>
                  <p>{item.summary}</p>
                  <p className="home-news-publisher">{item.publisher}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Municipal Leadership */}
      <section className="section home-leadership-section">
        <div className="container">
          <div className="home-section-header">
            <h2>{copy.leadership}</h2>
            <Link href="/government" className="home-section-link">
              {copy.viewGovernment} <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
          {municipalLeaders.length > 0 && (
            <div className={`home-leadership-grid home-leadership-grid--${municipalLeaders.length}`}>
              {municipalLeaders.map((leader) => (
                <article className="home-leader-card" key={`${leader.title}-${leader.name}`}>
                  <div className="home-leader-badge">{leader.title}</div>
                  <h3>{leader.name}</h3>
                  <p className="home-leader-scope">{leader.scope}</p>
                  <p className="home-leader-as-of">{copy.asOf} <time dateTime={leader.asOf}>{formatDate(leader.asOf, language)}</time></p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Information */}
      <section className="section">
        <div className="container">
          <div className="home-section-header">
            <h2>{copy.contact}</h2>
            <Link href="/contact" className="home-section-link">
              {copy.viewAll} <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
          <div className="home-contact-v2-grid">
            <Link href="/sources" className="home-contact-v2-card">
              <div className="home-contact-v2-content">
                <h3>{copy.sourceDirectory}</h3>
                <p className="home-contact-v2-value">{copy.sourceDirectoryNote}</p>
              </div>
            </Link>
            <Link href="/contact" className="home-contact-v2-card">
              <div className="home-contact-v2-content">
                <h3>{copy.corrections}</h3>
                <p className="home-contact-v2-value">{copy.correctionsNote}</p>
              </div>
            </Link>
            <Link href="/services" className="home-contact-v2-card">
              <div className="home-contact-v2-content">
                <h3>{copy.serviceInformation}</h3>
                <p className="home-contact-v2-value">{copy.serviceInformationNote}</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
