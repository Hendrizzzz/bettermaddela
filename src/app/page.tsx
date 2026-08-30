"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { LiveWeather, type WeatherConfigData } from "@/components/LiveWeather";
import { Reveal } from "@/components/motion/Reveal";
import { VerifiedSearch } from "@/components/VerifiedSearch";
import LuzonMap from "@/components/LuzonMap";
import { LuzonLocatorStatic } from "@/components/LuzonLocator";
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
  barangays: Array<{
    name: string;
    population: number;
  }>;
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
    heroIntroEm: "Civic information from public-source records for Maddela, Quirino.",
    welcome: "Welcome to BetterMaddela",
    introduction: "Civic information from public-source records for Maddela, Quirino.",
    browseServices: "Browse Services",
    contactInformation: "Contact Information",
    serviceCategories: "Service Categories",
    serviceNotice: "Requirements and fees are not yet verified here; confirm with the office.",
    viewAllServices: "View All Services",
    browseDirectory: "Browse the service directory",
    atAGlance: "Maddela at a Glance",
    viewStatistics: "View Statistics",
    population: "Population",
    barangays: "Barangays",
    municipality: "Municipality",
    households: "Households",
    whereTitle: "Where is Maddela?",
    whereIntro: "Three quick steps, from country to town.",
    history: "Brief History of Maddela",
    viewHistory: "View national legal history",
    sources: "Sources",
    historySourceNote: "Local tradition and documented legal milestones, identified separately.",
    readMore: "Read more",
    updates: "Latest Updates",
    viewUpdates: "View All",
    leadership: "Municipal Leadership",
    viewGovernment: "View Government",
    contact: "Contact Information",
    viewAll: "View All",
    sourceDirectory: "Source Directory",
    sourceDirectoryNote: "Evidence and review dates behind every figure.",
    corrections: "Contact & Corrections",
    correctionsNote: "Report an error, or suggest a correction.",
    serviceInformation: "Service Information",
    serviceInformationNote: "Browse categories; verified details remain limited.",
    stepPhilippines: "Philippines",
    stepPhilippinesNote: "Luzon island, Cagayan Valley region (Region II)",
    stepQuirino: "Quirino",
    stepQuirinoNote: "Maddela is a municipality of Quirino province.",
    stepMaddela: "Maddela",
    barangayLabel: "barangays",
    residentsLabel: "residents",
    censusLabel: "2024 census",
    mapCaption: "General location view only, not an official boundary.",
    atlasLink: "Open the barangay atlas",
    exploreMap: "Explore on Google Maps",
    photoAlt: "Aerial view of Maddela, Quirino, Philippines, taken in April 2012",
    photoCredit: "Photograph by P199 (April 2012), CC BY-SA 3.0, via Wikimedia Commons",
    photoNote: "A 2012 aerial view — not a current condition.",
    heroLandmarkTitle: "Maddela from the air",
    weatherSideLabel: "Weather right now",
    localWeatherContext: "Local station context",
    separateForecast: "Forecast values are provided separately by Open-Meteo.",
    incomeClassSuffix: "Class",
    maddelaToday: "Maddela today",
  },
  fil: {
    heroIntroEm: "Impormasyong sibiko mula sa pampublikong sanggunian para sa Maddela, Quirino.",
    welcome: "Maligayang pagdating sa BetterMaddela",
    introduction: "Impormasyong sibiko mula sa pampublikong sanggunian para sa Maddela, Quirino.",
    browseServices: "Tingnan ang mga Serbisyo",
    contactInformation: "Impormasyon sa Pakikipag-ugnayan",
    serviceCategories: "Mga Kategorya ng Serbisyo",
    serviceNotice: "Hindi pa beripikado ang mga requirements at bayarin; kumpirmahin sa tanggapan.",
    viewAllServices: "Tingnan ang Lahat ng Serbisyo",
    browseDirectory: "Tingnan ang direktoryo ng serbisyo",
    atAGlance: "Maddela sa Isang Tingin",
    viewStatistics: "Tingnan ang Estadistika",
    population: "Populasyon",
    barangays: "Mga Barangay",
    municipality: "Munisipalidad",
    households: "Mga Sambahayan",
    whereTitle: "Nasaan ang Maddela?",
    whereIntro: "Tatlong mabilis na hakbang, mula bansa hanggang bayan.",
    history: "Maikling Kasaysayan ng Maddela",
    viewHistory: "Tingnan ang pambansang legal na kasaysayan",
    sources: "Mga Sanggunian",
    historySourceNote: "Magkahiwalay na tinutukoy: ang lokal na salaysay at dokumentadong legal na pangyayari.",
    readMore: "Basahin pa",
    updates: "Pinakabagong Update",
    viewUpdates: "Tingnan Lahat",
    leadership: "Pamunuan ng Munisipalidad",
    viewGovernment: "Tingnan ang Pamahalaan",
    contact: "Impormasyon sa Pakikipag-ugnayan",
    viewAll: "Tingnan Lahat",
    sourceDirectory: "Direktoryo ng mga Sanggunian",
    sourceDirectoryNote: "Ebidensya at petsa ng pagsusuri sa likod ng bawat bilang.",
    corrections: "Ugnayan at Pagwawasto",
    correctionsNote: "Mag-ulat ng mali, o imungkahi ang pagwawasto.",
    serviceInformation: "Impormasyon sa Serbisyo",
    serviceInformationNote: "Tingnan ang mga kategorya; limitado pa ang beripikadong detalye.",
    stepPhilippines: "Pilipinas",
    stepPhilippinesNote: "Isla ng Luzon, rehiyon ng Lambak Cagayan (Rehiyon II)",
    stepQuirino: "Quirino",
    stepQuirinoNote: "Ang Maddela ay isang munisipalidad ng lalawigan ng Quirino.",
    stepMaddela: "Maddela",
    barangayLabel: "mga barangay",
    residentsLabel: "na residente",
    censusLabel: "senso ng 2024",
    mapCaption: "Pangkalahatang lokasyon lamang, hindi opisyal na hangganan.",
    atlasLink: "Buksan ang atlas ng mga barangay",
    exploreMap: "Tingnan ang Maddela sa Google Maps",
    photoAlt: "Tanawin ng Maddela, Quirino mula sa himpapawid, kuha noong Abril 2012",
    photoCredit: "Larawan ni P199 (Abril 2012), CC BY-SA 3.0, mula sa Wikimedia Commons",
    photoNote: "Tanawin mula sa 2012 — hindi ang kasalukuyang kalagayan.",
    heroLandmarkTitle: "Ang Maddela mula sa himpapawid",
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

export default function HomePage() {
  const { language } = useLanguage();
  const copy = homeCopy[language];
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".home-hero-v2-text h1",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6 },
        )
        .fromTo(
          ".home-hero-v2-text p",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.35",
        )
        .fromTo(
          ".home-hero-v2-actions",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3",
        )
        .fromTo(
          ".home-hero-v2-search",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55 },
          "-=0.35",
        )
        .fromTo(
          ".home-hero-v2-atlas",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        );
    }, el);

    return () => ctx.revert();
  }, []);

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
      detail: `${barangays.data.barangayCount} ${copy.barangayLabel}, ${population.data.population.toLocaleString(
        language === "fil" ? "fil-PH" : "en-PH",
      )} ${copy.residentsLabel} (${copy.censusLabel})`,
    },
  ];

  return (
    <>
      {/* Hero Section — Allen hero translation: H1 + intro, search + popular */}
      <section ref={heroRef} className="home-hero-v2">
        <div className="container">
          <div className="home-hero-v2-inner">
            <div className="home-hero-v2-text">
              <h1>{copy.welcome}</h1>
              <p>{copy.heroIntroEm}</p>
              <div className="home-hero-v2-actions">
                <Link href="/services" className="btn btn-primary">
                  {copy.browseServices} <i className="bi bi-arrow-right" aria-hidden="true"></i>
                </Link>
                <Link href="/contact" className="btn btn-outline">
                  {copy.contactInformation}
                </Link>
              </div>
              <div className="home-hero-v2-search">
                <VerifiedSearch />
              </div>
            </div>
            <div className="home-hero-v2-atlas">
              <figure className="home-hero-landmark">
                <img
                  src="/assets/images/maddela-quirino-aerial-2012.jpg"
                  alt={copy.photoAlt}
                  width={1500}
                  height={1000}
                  loading="eager"
                />
                <figcaption>
                  <strong>{copy.heroLandmarkTitle}</strong>
                  <span>{copy.photoCredit}</span>
                  <span>{copy.photoNote}</span>
                </figcaption>
              </figure>
              <Link href="/barangays" className="home-hero-v2-atlas-link">
                {copy.atlasLink} <i className="bi bi-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories — hairline cards, single label, em dash copy */}
      <section className="section section--allen">
        <div className="container">
          <div className="home-section-header">
            <div>
              <h2>{copy.serviceCategories}</h2>
              <p>{copy.serviceNotice}</p>
            </div>
          </div>
          <div className="section-header-rule" aria-hidden="true" />
          <div className="home-services-grid">
            {serviceCategories.map((service) => (
              <Link key={service.href} href={service.href} className="home-service-card hairline-top">
                <div className="home-service-content">
                  <i className={`bi ${service.icon} home-service-icon`} aria-hidden="true"></i>
                  <h3>{service.title[language]}</h3>
                </div>
                <i className="bi bi-arrow-right home-service-arrow" aria-hidden="true"></i>
              </Link>
            ))}
            <Link href="/services" className="home-service-card home-service-card--all hairline-top">
              <div className="home-service-content">
                <h3>{copy.viewAllServices}</h3>
              </div>
              <i className="bi bi-arrow-right home-service-arrow" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats — hairline + data reputation pills + em dashes */}
      <section className="home-stats-v2 section--allen">
        <div className="container">
          <div className="home-stats-v2-header">
            <div>
              <h2>{copy.atAGlance}</h2>
            </div>
            <Link href="/statistics" className="home-section-link">
              {copy.viewStatistics} <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
          <div className="section-header-rule" aria-hidden="true" />
          <div className="home-stats-v2-grid">
            <Reveal delay={0}>
              <Link href="/statistics" className="home-stat-card hairline-top">
                <div className="home-stat-card-content">
                  <span className="home-stat-card-value">
                    {population.data.population.toLocaleString("en-PH")}
                  </span>
                  <span className="home-stat-card-label">{copy.population}</span>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={0.08}>
              <Link href="/statistics" className="home-stat-card hairline-top">
                <div className="home-stat-card-content">
                  <span className="home-stat-card-value">{barangays.data.barangayCount}</span>
                  <span className="home-stat-card-label">{copy.barangays}</span>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={0.16}>
              <Link href="/statistics" className="home-stat-card hairline-top">
                <div className="home-stat-card-content">
                  <span className="home-stat-card-value">{identity.data.incomeClass} {copy.incomeClassSuffix}</span>
                  <span className="home-stat-card-label">{copy.municipality}</span>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={0.24}>
              <Link href="/statistics" className="home-stat-card hairline-top">
                <div className="home-stat-card-content">
                  <span className="home-stat-card-value">{households.data.numberOfHouseholds.toLocaleString("en-PH")}</span>
                  <span className="home-stat-card-label">{copy.households}</span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Where is Maddela? — hairline + location story, no numbering */}
      <section className="section weather-map-section section--allen">
        <div className="container">
          <div className="home-stats-v2-header">
            <div>
              <h2>{copy.whereTitle}</h2>
            </div>
          </div>
          <p className="location-intro">{copy.whereIntro}</p>
          <div className="section-header-rule" aria-hidden="true" />
          <ol className="location-story">
            {locationSteps.map((step, index) => (
              <li key={step.name}>
                <Reveal delay={index * 0.12}>
                  <article className={`location-step hairline-top${index < locationSteps.length - 1 ? " location-step--linked" : ""}`}>
                    <h3>{step.name}</h3>
                    <p>{step.detail}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
          <div className="location-detail-grid">
            <div className="map-column">
              <LuzonMap
                attribution={
                  getRecord<{ attribution: string }>(
                    "luzon-mainland-province-boundaries-codab-2026-08",
                  ).data.attribution
                }
              >
                <LuzonLocatorStatic />
              </LuzonMap>
              <figure className="map-card map-explore-card">
                <div className="map-attribution">
                  <i className="bi bi-geo-alt" aria-hidden="true" />
                  <span>
                    <a href="https://www.google.com/maps/search/?api=1&query=Maddela%2C+Quirino%2C+Philippines" target="_blank" rel="noreferrer">{copy.exploreMap}</a>
                    <span className="map-attribution-separator" aria-hidden="true">, </span>
                    {copy.mapCaption}
                  </span>
                </div>
              </figure>
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

      {/* Brief History of Maddela — hairline + timeline, period stated once */}
      <section className="section history-section section--allen">
        <div className="container">
          <div className="home-stats-v2-header">
            <div>
              <h2>
                {copy.history}
              </h2>
            </div>
            <Link href="/legal-history" className="home-section-link">
              {copy.viewHistory} <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
          <div className="section-header-rule" aria-hidden="true" />
          <div className="history-content">
            <div className="history-timeline">
              {history.data.sections.map((section) => (
                <div className={`timeline-item timeline-item--${section.kind}`} data-year={section.period} key={`${section.period}-${section.title}`}>
                  <div className="timeline-marker" />
                  <div className="timeline-content hairline-top" lang="en">
                    <span className="timeline-year">{section.period}</span>
                    <p><strong>{section.title}</strong>, {section.kind}</p>
                    <details className="timeline-more">
                      <summary>{copy.readMore}<span className="sr-only">: {section.title}</span></summary>
                      <p>{section.text}</p>
                    </details>
                  </div>
                </div>
              ))}
              <p className="history-publication-note">{copy.historySourceNote} <Link href="/sources">{copy.sources}</Link></p>
            </div>
            <div className="history-summary">
              {community.data.themes.slice(0, 2).map((theme) => (
                <div className="history-card hairline-top" key={theme.label} lang="en">
                  <div className="history-card-content">
                    <h3>{theme.label}</h3>
                    <details className="history-card-more">
                      <summary>{copy.readMore}<span className="sr-only">: {theme.label}</span></summary>
                      <p>{theme.description}</p>
                    </details>
                  </div>
                </div>
              ))}
              <div className="history-card history-card--overview hairline-top" lang="en">
                <div className="history-card-content">
                  <h3>{copy.maddelaToday}</h3>
                  <details className="history-card-more">
                    <summary>{copy.readMore}<span className="sr-only">: {copy.maddelaToday}</span></summary>
                    <p>{community.data.summary}</p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates — hairline cards, date-first meta */}
      <section className="section section--allen section--tint">
        <div className="container">
          <div className="home-section-header">
            <div>
              <h2>{copy.updates}</h2>
            </div>
            <Link href="/news" className="home-section-link">
              {copy.viewUpdates} <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
          <div className="section-header-rule" aria-hidden="true" />
          {updates.length > 0 && (
            <div className={`home-news-grid home-news-grid--${updates.length}`}>
              {updates.map((item) => (
                <article className="home-news-card hairline-top" key={item.id} lang="en">
                  <div className="home-news-meta">
                    <time className="home-news-date" dateTime={item.publishedAt}>{formatDate(item.publishedAt, language)}</time>
                  </div>
                  <h3><a href={item.canonicalUrl} target="_blank" rel="noreferrer">{item.headline}</a></h3>
                  <p className="home-news-summary">{item.summary}</p>
                  <p className="home-news-publisher">{item.publisher}, {formatDate(item.publishedAt, language)}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Municipal Leadership — hairline + verified provenance */}
      <section className="section home-leadership-section section--allen">
        <div className="container">
          <div className="home-section-header">
            <div>
              <h2>{copy.leadership}</h2>
              <p style={{ color: "var(--color-text-light)", margin: 0 }}>Elected leadership with verified scope and dates; provenance one click away.</p>
            </div>
            <Link href="/government" className="home-section-link">
              {copy.viewGovernment} <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
          <div className="section-header-rule" aria-hidden="true" />
          {municipalLeaders.length > 0 && (
            <div className={`home-leadership-grid home-leadership-grid--${municipalLeaders.length}`}>
              {municipalLeaders.map((leader) => (
                <article className="home-leader-card hairline-top" key={`${leader.title}-${leader.name}`}>
                  <p className="office-role-label">{leader.title}</p>
                  <h3>{leader.name}</h3>
                  <p className="home-leader-scope">{leader.scope}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Information — hairline cards, single label */}
      <section className="section section--allen section--tint">
        <div className="container">
          <div className="home-section-header">
            <div>
              <h2>{copy.contact}</h2>
            </div>
            <Link href="/contact" className="home-section-link">
              {copy.viewAll} <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
          <div className="section-header-rule" aria-hidden="true" />
          <div className="home-contact-v2-grid">
            <Link href="/sources" className="home-contact-v2-card hairline-top">
              <div className="home-contact-v2-content">
                <h3>{copy.sourceDirectory}</h3>
                <p className="home-contact-v2-value">{copy.sourceDirectoryNote}</p>
              </div>
            </Link>
            <Link href="/contact" className="home-contact-v2-card hairline-top">
              <div className="home-contact-v2-content">
                <h3>{copy.corrections}</h3>
                <p className="home-contact-v2-value">{copy.correctionsNote}</p>
              </div>
            </Link>
            <Link href="/services" className="home-contact-v2-card hairline-top">
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
