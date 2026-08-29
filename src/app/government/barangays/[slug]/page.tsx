import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { RecordMeta } from "@/components/RecordMeta";
import { Reveal } from "@/components/motion/Reveal";
import BarangayOrganigram from "@/components/government/BarangayOrganigram";
import { getRecord } from "@/data/civic";
import { MaddelaAtlas, maddelaBoundariesRecord } from "@/components/MaddelaAtlas";
import { LuzonLocatorStatic } from "@/components/LuzonLocator";
import LuzonMap from "@/components/LuzonMap";
import { slugify } from "@/lib/slugify";
import atlasGeometry from "@/data/atlas/geometry.json";

interface BoundaryGeometryEntry {
  psgc: string;
  name: string;
  d: string;
  center: [number, number];
  geoCenter: [number, number];
  label: boolean;
  areaSqkm: number;
}

const polygonByPsgc = new Map(
  (atlasGeometry as unknown as { barangays: BoundaryGeometryEntry[] }).barangays.map((entry) => [
    entry.psgc,
    entry,
  ]),
);

interface BarangayEntry {
  name: string;
  psgcCode: string;
  correspondenceCode: string;
  classification: "Urban" | "Rural";
  population: number;
}

interface BarangayDataset {
  populationReferenceDate: string;
  urbanRuralBasis: string;
  barangays: BarangayEntry[];
}

interface OfficialEntry {
  barangay: string;
  position: string;
  termOrdinal: string | null;
  name: string;
  email: string | null;
  telephone: string | null;
}

interface OfficialsDataset {
  listingBasis: string;
  termBasis: string;
  officials: OfficialEntry[];
  limitations: string;
}

const barangayRecord = getRecord<BarangayDataset>("barangay-dataset-2026q2");
const officialsRecord = getRecord<OfficialsDataset>("maddela-barangay-officials-2026-dilg-bops");
const osmLocationRecord = getRecord<{
  unmapped: { barangay: string; psgcCode: string; note: string }[];
}>("maddela-barangay-locations-osm-2026-08");

interface BarangayOfficials {
  punongBarangay?: OfficialEntry;
  members: OfficialEntry[];
  skChairperson?: OfficialEntry;
  skMembers: OfficialEntry[];
  treasurer?: OfficialEntry;
  secretary?: OfficialEntry;
  skSecretary?: OfficialEntry;
  skTreasurer?: OfficialEntry;
}

const officialsBySlug = new Map<string, BarangayOfficials>();
for (const entry of officialsRecord.data.officials) {
  const slug = slugify(entry.barangay);
  const group = officialsBySlug.get(slug) ?? { members: [], skMembers: [] };
  if (entry.position === "Punong Barangay") group.punongBarangay = entry;
  else if (entry.position === "Sangguniang Barangay Member") group.members.push(entry);
  else if (entry.position === "SK Chairperson") group.skChairperson = entry;
  else if (entry.position === "SK Member") group.skMembers.push(entry);
  else if (entry.position === "Barangay Treasurer") group.treasurer = entry;
  else if (entry.position === "Barangay Secretary") group.secretary = entry;
  else if (entry.position === "SK Secretary") group.skSecretary = entry;
  else if (entry.position === "SK Treasurer") group.skTreasurer = entry;
  officialsBySlug.set(slug, group);
}

// Derived context is recomputed from the same reviewed record; nothing hardcoded.
const rankedBarangays = [...barangayRecord.data.barangays]
  .sort((a, b) => b.population - a.population || a.name.localeCompare(b.name))
  .map((entry, index) => ({ ...entry, rank: index + 1 }));
const largestBarangay = rankedBarangays[0];
const smallestBarangay = rankedBarangays[rankedBarangays.length - 1];
const municipalTotalPopulation = barangayRecord.data.barangays.reduce(
  (sum, entry) => sum + entry.population,
  0,
);
// Municipal median population, computed from the reviewed record at render.
const sortedPopulations = barangayRecord.data.barangays
  .map((entry) => entry.population)
  .sort((a, b) => a - b);
const middle = Math.floor(sortedPopulations.length / 2);
const medianPopulation =
  sortedPopulations.length % 2 === 0
    ? (sortedPopulations[middle - 1] + sortedPopulations[middle]) / 2
    : sortedPopulations[middle];

const shareFormat = new Intl.NumberFormat("en-PH", { maximumFractionDigits: 1 });

function formatPopulation(value: number) {
  return value.toLocaleString("en-PH");
}

function positionBetween(value: number, low: number, high: number) {
  if (high <= low) return 50;
  return Math.min(100, Math.max(0, ((value - low) / (high - low)) * 100));
}

// Compact computed facts for the hero quiet line — same reviewed record, restyled.
function buildFacts(name: string, rank: number, population: number) {
  const count = rankedBarangays.length;
  const share =
    municipalTotalPopulation > 0 ? (population / municipalTotalPopulation) * 100 : 0;
  let standing: string;
  if (largestBarangay.psgcCode === undefined || smallestBarangay.psgcCode === undefined) {
    return "";
  }
  if (largestBarangay.name === name) {
    standing = `the most populous of the ${count} barangays`;
  } else if (smallestBarangay.name === name) {
    standing = `the least populous of the ${count} barangays`;
  } else {
    standing = `#${rank} of ${count} by population`;
  }
  return `${standing.charAt(0).toUpperCase()}${standing.slice(1)}, ${shareFormat.format(
    share,
  )}% of the municipal population, computed from the same reviewed PSA dataset.`;
}

function formatLongDate(value: string) {
  return new Intl.DateTimeFormat("en-PH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Manila",
  }).format(new Date(`${value}T00:00:00+08:00`));
}

export function generateStaticParams() {
  return barangayRecord.data.barangays.map((barangay) => ({ slug: slugify(barangay.name) }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const barangay = barangayRecord.data.barangays.find(
    (item) => slugify(item.name) === slug,
  );

  if (!barangay) return { title: "Barangay not found" };

  return {
    title: `Barangay ${barangay.name}`,
      description: `Structured profile for Barangay ${barangay.name}, Maddela, with reviewed population figures and barangay officials as listed by the DILG Barangay Officials Profiling System; projects and contacts follow verification.`,
  };
}

const KAGAWAD_SEATS = 7;

export default async function BarangayDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const barangay = barangayRecord.data.barangays.find((item) => slugify(item.name) === slug);
  if (!barangay) notFound();

  const rankedEntry = rankedBarangays.find((entry) => entry.psgcCode === barangay.psgcCode);
  if (!rankedEntry) notFound();
  const facts = buildFacts(barangay.name, rankedEntry.rank, barangay.population);

  const rangeLow = smallestBarangay.population;
  const rangeHigh = largestBarangay.population;
  const barangayPosition = positionBetween(barangay.population, rangeLow, rangeHigh);
  const medianPosition = positionBetween(medianPopulation, rangeLow, rangeHigh);
  const rangeSummary = `${barangay.name} sits at ${Math.round(
    barangayPosition,
  )}% of the span between the smallest barangay, ${smallestBarangay.name} (${formatPopulation(
    rangeLow,
  )}), and the largest, ${largestBarangay.name} (${formatPopulation(
    rangeHigh,
  )}). The municipal median is ${formatPopulation(medianPopulation)}.`;

  const officials = officialsBySlug.get(slug);
  const hasOfficialRoster = Boolean(officials?.punongBarangay || officials?.members.length);

  const boundary = polygonByPsgc.get(barangay.psgcCode);
  const unmappedEntry = osmLocationRecord.data.unmapped.find(
    (entry) => entry.barangay === barangay.name,
  );
  const mapsPointUrl = boundary
    ? `https://www.google.com/maps/search/?api=1&query=${boundary.geoCenter[1]},${boundary.geoCenter[0]}`
    : null;
  const mapsNameUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Barangay ${barangay.name}, Maddela, Quirino, Philippines`,
  )}`;

  return (
    <>
      <PageHeader
        title={`Barangay ${barangay.name}`}
        description={`Statistical profile for Barangay ${barangay.name}, Municipality of Maddela.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Government", href: "/government" }, { label: "Barangays", href: "/barangays" }, { label: barangay.name }]}
      />
      <section className="section brgy-prof">
        <div className="container">
          <Reveal>
            <div className="brgy-prof-hero">
              <p className="brgy-prof-kicker">
                <span className={`brgy-prof-class brgy-prof-class--${barangay.classification.toLowerCase()}`}>
                  {barangay.classification}
                </span>
                <span className="brgy-prof-kicker-sep" aria-hidden="true">, </span>
                Municipality of Maddela
              </p>
              <p className="brgy-prof-population">
                {barangay.population.toLocaleString("en-PH")}
                <span className="brgy-prof-population-unit"> residents</span>
              </p>
              <p className="brgy-prof-pop-note">
                As of{" "}
                <time dateTime={barangayRecord.data.populationReferenceDate}>
                  {formatLongDate(barangayRecord.data.populationReferenceDate)}
                </time>
                , reviewed PSA census count
              </p>
              {facts && <p className="brgy-prof-facts">{facts}</p>}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <figure className="brgy-prof-range">
              <div className="brgy-prof-range-track" role="img" aria-label={rangeSummary}>
                <span
                  className="brgy-prof-range-fill"
                  style={{ width: `${barangayPosition}%` }}
                  aria-hidden="true"
                />
                <span
                  className="brgy-prof-range-median"
                  style={{ left: `${medianPosition}%` }}
                  aria-hidden="true"
                />
                <span
                  className="brgy-prof-range-dot"
                  style={{ left: `${barangayPosition}%` }}
                  aria-hidden="true"
                />
              </div>
              <figcaption className="brgy-prof-range-key">
                <span>
                  Smallest, {smallestBarangay.name} {formatPopulation(rangeLow)}
                </span>
                <span className="brgy-prof-range-key-median">
                  Municipal median {formatPopulation(medianPopulation)}
                </span>
                <span>
                  Largest, {largestBarangay.name} {formatPopulation(rangeHigh)}
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.08}>
            <section className="brgy-prof-section" aria-labelledby="brgy-prof-location">
              <h2 className="brgy-section-heading" id="brgy-prof-location">
                Location
              </h2>
              {boundary ? (
                <div className="brgy-prof-location-card">
                  <MaddelaAtlas variant="mini" highlight={barangay.name} />
                  <div className="brgy-prof-location-actions">
                    <p className="brgy-prof-location-note" lang="en">
                      Position within Maddela from OCHA COD-AB administrative
                      boundaries; the stylized map is not an official survey boundary.
                    </p>
                    <a className="btn btn-primary" href={mapsPointUrl ?? "#"} target="_blank" rel="noreferrer">
                      Open in Google Maps <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                    </a>
                    <p className="brgy-prof-location-note" lang="en">
                      {maddelaBoundariesRecord.data.attribution}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="brgy-prof-location-card brgy-prof-location-card--pending">
                  <div className="brgy-prof-location-actions">
                    <p className="brgy-prof-location-note" lang="en">
                      No verified location for this barangay yet
                      {unmappedEntry ? ` — ${unmappedEntry.note.toLowerCase()}` : ""}. Rather than guess a
                      coordinate, it stays unmapped until a source passes verification.
                    </p>
                    <a className="btn btn-secondary" href={mapsNameUrl} target="_blank" rel="noreferrer">
                      Search the name on Google Maps <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              )}
              {boundary && (
                <LuzonMap
                  attribution={
                    getRecord<{ attribution: string }>(
                      "luzon-mainland-province-boundaries-codab-2026-08",
                    ).data.attribution
                  }
                >
                  <LuzonLocatorStatic />
                </LuzonMap>
              )}
            </section>
          </Reveal>

          <section className="brgy-prof-section" aria-labelledby="brgy-prof-officials">
            <h2 className="brgy-section-heading" id="brgy-prof-officials">
              Barangay officials
            </h2>
            <p className="brgy-prof-section-link">
              <Link href="/government/barangay-officials">
                Browse the municipal officials directory <i className="bi bi-arrow-right" aria-hidden="true" />
              </Link>
            </p>
            {officials && hasOfficialRoster ? (
              <BarangayOrganigram officials={officials} />
            ) : (
              <Reveal>
              <div className="brgy-prof-org">
                <article className="brgy-prof-seat-card brgy-prof-seat-card--pb">
                  <span className="brgy-prof-seat-box brgy-prof-seat-box--lg" aria-hidden="true" />
                  <h3 className="brgy-prof-seat-role">Punong Barangay</h3>
                </article>
                <div className="brgy-prof-council">
                  <h3 className="brgy-prof-group-label">Sangguniang Barangay members</h3>
                  <ul className="brgy-prof-seat-grid" aria-label={`${KAGAWAD_SEATS} Sangguniang Barangay member seats`}>
                    {Array.from({ length: KAGAWAD_SEATS }, (_, index) => (
                      <li key={`seat-${index + 1}`} className="brgy-prof-seat-cell">
                        <span className="brgy-prof-seat-box" aria-hidden="true" />
                        <span className="brgy-prof-seat-num">{`0${index + 1}`}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              </Reveal>
            )}
            {officials && hasOfficialRoster ? (
              <>
                <p className="brgy-prof-awaiting">
                  Listing reproduced from the DILG Barangay Officials Profiling System (Region 2 masterlist export,
                  August 2026), reviewed <time dateTime={officialsRecord.lastVerified}>{formatLongDate(officialsRecord.lastVerified)}</time>.
                  Names are as listed at source and term ordinals appear where the source states them; seats not
                  listed at source are omitted rather than shown as vacant. The system does not date its entries;
                  this listing is re-checked monthly.
                </p>
                <RecordMeta record={officialsRecord} />
              </>
            ) : (
              <p className="brgy-prof-awaiting">
                Officials are published once the list passes verification, expected from the DILG municipal office.
              </p>
            )}
          </section>

          <div className="brgy-prof-duo">
            <section className="brgy-prof-section brgy-prof-section--tight" aria-labelledby="brgy-prof-projects">
              <h2 className="brgy-section-heading" id="brgy-prof-projects">
                Projects &amp; notices
              </h2>
              {/* Project records will be mapped here by barangay once verified. */}
              <div className="brgy-prof-empty">
                <i className="bi bi-kanban" aria-hidden="true" />
                <p>No verified projects recorded for this barangay yet.</p>
              </div>
            </section>

            <section className="brgy-prof-section brgy-prof-section--tight" aria-labelledby="brgy-prof-contact">
              <h2 className="brgy-section-heading" id="brgy-prof-contact">
                Contact
              </h2>
              {/* Verified contact details will be mapped here by barangay once confirmed. */}
              <div className="brgy-prof-empty">
                <i className="bi bi-envelope" aria-hidden="true" />
                <p>No verified contact details published for this barangay yet.</p>
              </div>
            </section>
          </div>

          <p className="table-note">Urban/rural basis: {barangayRecord.data.urbanRuralBasis}.</p>
          <RecordMeta record={barangayRecord} />
        </div>
      </section>
    </>
  );
}
