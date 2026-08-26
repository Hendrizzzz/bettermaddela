"use client";

import Link from "next/link";
import { LiveWeather, type WeatherConfigData } from "@/components/LiveWeather";
import { Reveal } from "@/components/motion/Reveal";
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
  },
  {
    href: "/services/business",
    icon: "bi-shop",
    title: { en: "Business Permits", fil: "Mga Permit sa Negosyo" },
  },
  {
    href: "/services/tax-payments",
    icon: "bi-cash-coin",
    title: { en: "Tax Payments", fil: "Pagbabayad ng Buwis" },
  },
  {
    href: "/services/social-services",
    icon: "bi-people-fill",
    title: { en: "Social Services", fil: "Serbisyong Panlipunan" },
  },
  {
    href: "/services/health",
    icon: "bi-heart-pulse-fill",
    title: { en: "Health Services", fil: "Serbisyong Pangkalusugan" },
  },
  {
    href: "/services/agriculture",
    icon: "bi-tree-fill",
    title: { en: "Agriculture", fil: "Agrikultura" },
  },
  {
    href: "/services/infrastructure",
    icon: "bi-building-fill-gear",
    title: { en: "Infrastructure", fil: "Imprastraktura" },
  },
  {
    href: "/services/education",
    icon: "bi-mortarboard-fill",
    title: { en: "Education", fil: "Edukasyon" },
  },
  {
    href: "/services/public-safety",
    icon: "bi-shield-fill-check",
    title: { en: "Public Safety", fil: "Kaligtasang Pampubliko" },
  },
  {
    href: "/services/environment",
    icon: "bi-globe-americas",
    title: { en: "Environment", fil: "Kapaligiran" },
  },
];

const homeCopy = {
  en: {
    heroKicker: "Maddela, Quirino",
    welcome: "Welcome to BetterMaddela",
    introduction: "Civic information and public-source records for Maddela, Quirino.",
    browseServices: "Browse Services",
    contactInformation: "Contact Information",
    serviceCategories: "Service Categories",
    serviceNotice: "Requirements and fees not yet verified — confirm with the office.",
    viewAllServices: "View All Services",
    browseDirectory: "Browse the service directory",
    atAGlance: "Maddela at a Glance",
    viewStatistics: "View Statistics",
    population: "Population",
    barangays: "Barangays",
    municipality: "Municipality",
    households: "Households",
    whereTitle: "Where is Maddela?",
    whereIntro: "Three quick steps from country to town.",
    history: "Brief History of Maddela",
    viewHistory: "View national legal history",
    sources: "Sources",
    historySourceNote: "Local tradition and documented legal milestones are identified separately.",
    readMore: "Read more",
    updates: "Latest Updates",
    viewUpdates: "View All",
    leadership: "Municipal Leadership",
    viewGovernment: "View Government",
    asOf: "As of",
    contact: "Contact Information",
    viewAll: "View All",
    sourceDirectory: "Source Directory",
    sourceDirectoryNote: "Evidence and review dates behind every figure.",
    corrections: "Contact & Corrections",
    correctionsNote: "Report an error or suggest a correction.",
    serviceInformation: "Service Information",
    serviceInformationNote: "Browse categories — verified details remain limited.",
    stepPhilippines: "Philippines",
    stepPhilippinesNote: "Luzon island, Cagayan Valley region (Region II)",
    stepQuirino: "Quirino",
    stepQuirinoNote: "Maddela is a municipality of Quirino province.",
    stepMaddela: "Maddela",
    barangayLabel: "barangays",
    residentsLabel: "residents",
    censusLabel: "2024 census",
    mapTitle: "Embedded Google Maps general view of Maddela, Quirino",
    mapCaption: "General location view only — not an official boundary.",
    exploreMap: "Explore on Google Maps",
    weatherSideLabel: "Weather right now",
    localWeatherContext: "Local station context",
    separateForecast: "Forecast values are provided separately by Open-Meteo.",
    incomeClassSuffix: "Class",
    maddelaToday: "Maddela today",
  },
  fil: {
    heroKicker: "Maddela, Quirino",
    welcome: "Maligayang pagdating sa BetterMaddela",
    introduction: "Impormasyong sibiko at mga rekord mula sa pampublikong sanggunian para sa Maddela, Quirino.",
    browseServices: "Tingnan ang mga Serbisyo",
    contactInformation: "Impormasyon sa Pakikipag-ugnayan",
    serviceCategories: "Mga Kategorya ng Serbisyo",
    serviceNotice: "Hindi pa beripikado ang mga requirements at bayarin — kumpirmahin sa tanggapan.",
    viewAllServices: "Tingnan ang Lahat ng Serbisyo",
    browseDirectory: "Tingnan ang direktoryo ng serbisyo",
    atAGlance: "Maddela sa Isang Tingin",
    viewStatistics: "Tingnan ang Estadistika",
    population: "Populasyon",
    barangays: "Mga Barangay",
    municipality: "Munisipalidad",
    households: "Mga Sambahayan",
    whereTitle: "Nasaan ang Maddela?",
    whereIntro: "Tatlong mabilis na hakbang mula bansa hanggang bayan.",
    history: "Maikling Kasaysayan ng Maddela",
    viewHistory: "Tingnan ang pambansang legal na kasaysayan",
    sources: "Mga Sanggunian",
    historySourceNote: "Magkahiwalay na tinutukoy ang lokal na salaysay at dokumentadong legal na pangyayari.",
    readMore: "Basahin pa",
    updates: "Pinakabagong Update",
    viewUpdates: "Tingnan Lahat",
    leadership: "Pamunuan ng Munisipalidad",
    viewGovernment: "Tingnan ang Pamahalaan",
    asOf: "Mula noong",
    contact: "Impormasyon sa Pakikipag-ugnayan",
    viewAll: "Tingnan Lahat",
    sourceDirectory: "Direktoryo ng mga Sanggunian",
    sourceDirectoryNote: "Ebidensya at petsa ng pagsusuri sa likod ng bawat bilang.",
    corrections: "Ugnayan at Pagwawasto",
    correctionsNote: "Mag-ulat ng mali o imungkahi ang pagwawasto.",
    serviceInformation: "Impormasyon sa Serbisyo",
    serviceInformationNote: "Tingnan ang mga kategorya — limitado pa ang beripikadong detalye.",
    stepPhilippines: "Pilipinas",
    stepPhilippinesNote: "Isla ng Luzon, rehiyon ng Lambak Cagayan (Rehiyon II)",
    stepQuirino: "Quirino",
    stepQuirinoNote: "Ang Maddela ay isang munisipalidad ng lalawigan ng Quirino.",
    stepMaddela: "Maddela",
    barangayLabel: "mga barangay",
    residentsLabel: "na residente",
    censusLabel: "senso ng 2024",
    mapTitle: "Pangkalahatang tanaw ng naka-embed na Google Maps sa Maddela, Quirino",
    mapCaption: "Pangkalahatang lokasyon lamang — hindi opisyal na hangganan.",
    exploreMap: "Tingnan ang Maddela sa Google Maps",
    weatherSideLabel: "Panahon ngayon",
    localWeatherContext: "Lokal na konteksto ng istasyon",
    separateForecast: "Hiwalay na ibinibigay ng Open-Meteo ang mga forecast value.",
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
  const locationSteps = [
    { name: copy.stepPhilippines, detail: copy.stepPhilippinesNote },
    { name: copy.stepQuirino, detail: copy.stepQuirinoNote },
    {
      name: copy.stepMaddela,
      detail: `${barangays.data.barangayCount} ${copy.barangayLabel} · ${population.data.population.toLocaleString(
        language === "fil" ? "fil-PH" : "en-PH",
      )} ${copy.residentsLabel} (${copy.censusLabel})`,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="home-hero-v2">
        <div className="container">
          <div className="home-hero-v2-inner">
            <div className="home-hero-v2-text">
              <p className="home-hero-kicker">{copy.heroKicker}</p>
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
                  <i className={`bi ${service.icon} home-service-icon`} aria-hidden="true"></i>
                  <h3>{service.title[language]}</h3>
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
            <Reveal delay={0}>
              <Link href="/statistics" className="home-stat-card">
                <div className="home-stat-card-content">
                  <span className="home-stat-card-value">
                    {population.data.population.toLocaleString("en-PH")}
                  </span>
                  <span className="home-stat-card-label">{copy.population}</span>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={0.08}>
              <Link href="/statistics" className="home-stat-card">
                <div className="home-stat-card-content">
                  <span className="home-stat-card-value">{barangays.data.barangayCount}</span>
                  <span className="home-stat-card-label">{copy.barangays}</span>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={0.16}>
              <Link href="/statistics" className="home-stat-card">
                <div className="home-stat-card-content">
                  <span className="home-stat-card-value">{identity.data.incomeClass} {copy.incomeClassSuffix}</span>
                  <span className="home-stat-card-label">{copy.municipality}</span>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={0.24}>
              <Link href="/statistics" className="home-stat-card">
                <div className="home-stat-card-content">
                  <span className="home-stat-card-value">{households.data.numberOfHouseholds.toLocaleString("en-PH")}</span>
                  <span className="home-stat-card-label">{copy.households}</span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Where is Maddela? */}
      <section className="section weather-map-section">
        <div className="container">
          <div className="home-stats-v2-header">
            <h2>{copy.whereTitle}</h2>
          </div>
          <p className="location-intro">{copy.whereIntro}</p>
          <ol className="location-story">
            {locationSteps.map((step, index) => (
              <li key={step.name}>
                <Reveal delay={index * 0.12}>
                  <article className={`location-step${index < locationSteps.length - 1 ? " location-step--linked" : ""}`}>
                    <span className="location-step-number" aria-hidden="true">{index + 1}</span>
                    <h3>{step.name}</h3>
                    <p>{step.detail}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
          <div className="location-detail-grid">
            <div className="map-column">
              <div className="map-card">
                <div id="map-container" role="region" aria-label={copy.mapTitle} data-map-loaded="iframe">
                  <iframe
                    src="https://www.google.com/maps?q=Maddela%2C+Quirino%2C+Philippines&output=embed"
                    className="map-iframe"
                    title={copy.mapTitle}
                    loading="lazy"
                  />
                </div>
                <div className="map-attribution">
                  <i className="bi bi-geo-alt" aria-hidden="true" />
                  <span>
                    <a href="https://www.google.com/maps/search/?api=1&query=Maddela%2C+Quirino%2C+Philippines" target="_blank" rel="noreferrer">{copy.exploreMap}</a>
                    <span className="map-attribution-separator" aria-hidden="true"> · </span>
                    {copy.mapCaption}
                  </span>
                </div>
              </div>
            </div>
            <aside className="location-weather-column">
              <p className="location-weather-label">
                <i className="bi bi-cloud-sun" aria-hidden="true" /> {copy.weatherSideLabel}
              </p>
              <div id="weather-container" className="location-weather-card" aria-live="polite">
                <LiveWeather config={weather.data} />
              </div>
            </aside>
          </div>
          <div className="weather-map-notes">
            <p>
              <i className="bi bi-broadcast" aria-hidden="true" />
              <strong>{copy.localWeatherContext}:</strong>{" "}
              <a href="https://bagong.pagasa.dost.gov.ph/automated-weather-station/" target="_blank" rel="noreferrer">
                PAGASA {weather.data.pagasaStation.name} (site {weather.data.pagasaStation.siteId})
              </a>. {copy.separateForecast}
            </p>
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
                    <p><strong>{section.title}</strong></p>
                    <details className="timeline-more">
                      <summary>{copy.readMore}<span className="sr-only"> — {section.title}</span></summary>
                      <p>{section.text}</p>
                    </details>
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
                    <details className="history-card-more">
                      <summary>{copy.readMore}<span className="sr-only"> — {theme.label}</span></summary>
                      <p>{theme.description}</p>
                    </details>
                  </div>
                </div>
              ))}
              <div className="history-card history-card--overview" lang="en">
                <div className="history-card-content">
                  <h3>{copy.maddelaToday}</h3>
                  <details className="history-card-more">
                    <summary>{copy.readMore}<span className="sr-only"> — {copy.maddelaToday}</span></summary>
                    <p>{community.data.summary}</p>
                  </details>
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
                  <p className="home-news-summary">{item.summary}</p>
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
