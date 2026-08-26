import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { RecordMeta } from "@/components/RecordMeta";
import { getRecord } from "@/data/civic";
import { slugify } from "@/lib/slugify";

interface Barangay {
  name: string;
  psgcCode: string;
  correspondenceCode: string;
  classification: "Urban" | "Rural";
  population: number;
}

interface BarangayData {
  barangayCount: number;
  psgcPublicationDate: string;
  psgcWebpageCountAsOf: string;
  populationReferenceDate: string;
  urbanRuralBasis: string;
  barangays: Barangay[];
}

const barangayRecord = getRecord<BarangayData>("barangay-dataset-2026q2");
const barangays = barangayRecord.data.barangays;

function formatLongDate(value: string) {
  return new Intl.DateTimeFormat("en-PH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Manila",
  }).format(new Date(`${value}T00:00:00+08:00`));
}

// All derived figures are computed from the reviewed record at render; nothing hardcoded.
const totalPopulation = barangays.reduce((sum, entry) => sum + entry.population, 0);
const ruralCount = barangays.filter((entry) => entry.classification === "Rural").length;
const urbanCount = barangays.filter((entry) => entry.classification === "Urban").length;
const urbanPopulation = barangays
  .filter((entry) => entry.classification === "Urban")
  .reduce((sum, entry) => sum + entry.population, 0);
const urbanSharePercent = totalPopulation > 0 ? (urbanPopulation / totalPopulation) * 100 : 0;
const ruralSharePercent = 100 - urbanSharePercent;

const rankedBarangays = [...barangays]
  .sort((a, b) => b.population - a.population || a.name.localeCompare(b.name))
  .map((entry, index) => ({
    ...entry,
    rank: index + 1,
    sharePercent: totalPopulation > 0 ? (entry.population / totalPopulation) * 100 : 0,
  }));

// Rank #1 holds the largest share; every micro-bar scales against it.
const maxSharePercent = rankedBarangays.length > 0 ? rankedBarangays[0].sharePercent : 0;

const shareFormat = new Intl.NumberFormat("en-PH", { maximumFractionDigits: 1 });

export const metadata: Metadata = {
  title: "Barangays",
  description: `Directory of Maddela's ${barangayRecord.data.barangayCount} barangays with computed municipal totals, PSA-based population rankings, and links to each barangay profile.`,
};

export default function BarangaysPage() {
  const data = barangayRecord.data;

  return (
    <>
      <PageHeader
        title="Barangays of Maddela"
        description={`${data.barangayCount} barangays serving the municipality`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Government", href: "/government" }, { label: "Barangays" }]}
      />

      <section className="section" style={{ background: "var(--color-bg-alt)" }}>
        <div className="container">
          <h2 className="brgy-section-heading">Municipal summary</h2>
          <dl className="brgy-summary">
            <div className="brgy-summary-item">
              <dt className="brgy-summary-label">Total population</dt>
              <dd className="brgy-summary-value">{totalPopulation.toLocaleString("en-PH")}</dd>
              <dd className="brgy-summary-note">
                PSA dataset ·{" "}
                <time dateTime={data.populationReferenceDate}>{formatLongDate(data.populationReferenceDate)}</time>
              </dd>
            </div>
            <div className="brgy-summary-item">
              <dt className="brgy-summary-label">Rural barangays</dt>
              <dd className="brgy-summary-value">{ruralCount.toLocaleString("en-PH")}</dd>
              <dd className="brgy-summary-note">PSA dataset</dd>
            </div>
            <div className="brgy-summary-item">
              <dt className="brgy-summary-label">Urban barangays</dt>
              <dd className="brgy-summary-value">{urbanCount.toLocaleString("en-PH")}</dd>
              <dd className="brgy-summary-note">PSA dataset</dd>
            </div>
            <div className="brgy-summary-item">
              <dt className="brgy-summary-label">Urban share of population</dt>
              <dd className="brgy-summary-value">{shareFormat.format(urbanSharePercent)}%</dd>
              <dd className="brgy-summary-note">Computed · PSA dataset</dd>
            </div>
          </dl>

          <figure className="brgy-split-card">
            <div
              className="brgy-split-bar"
              role="img"
              aria-label={`Municipal population split, computed from the reviewed PSA dataset: Urban ${shareFormat.format(urbanSharePercent)} percent (${urbanCount.toLocaleString("en-PH")} of ${data.barangayCount.toLocaleString("en-PH")} barangays), Rural ${shareFormat.format(ruralSharePercent)} percent.`}
            >
              <div className="brgy-split-seg brgy-split-seg--urban" style={{ width: `${urbanSharePercent}%` }} />
              <div className="brgy-split-seg brgy-split-seg--rural" style={{ width: `${ruralSharePercent}%` }}>
                {ruralSharePercent >= 25 && (
                  <span className="brgy-split-seg-label">Rural {shareFormat.format(ruralSharePercent)}%</span>
                )}
              </div>
            </div>
            <figcaption className="brgy-split-key">
              <span className="brgy-split-swatch brgy-split-swatch--urban" aria-hidden="true" />
              Urban {shareFormat.format(urbanSharePercent)}%
              <span className="brgy-split-dot" aria-hidden="true">
                ·
              </span>
              {urbanCount.toLocaleString("en-PH")} of {data.barangayCount.toLocaleString("en-PH")} barangays
            </figcaption>
          </figure>

          <h2 className="brgy-section-heading">All {data.barangayCount} barangays by population</h2>
          <p className="brgy-method-note">Ranked by PSA census count · ties alphabetical</p>
          <ol className="brgy-grid">
            {rankedBarangays.map((entry) => (
              <li key={entry.psgcCode}>
                <Link href={`/government/barangays/${slugify(entry.name)}`} className="brgy-card">
                  <div className="brgy-card-top">
                    <span className="brgy-rank">
                      <span className="sr-only">Rank </span>#{entry.rank}
                    </span>
                    <span
                      className={`brgy-chip ${
                        entry.classification === "Urban" ? "brgy-chip--urban" : "brgy-chip--rural"
                      }`}
                    >
                      {entry.classification === "Urban" ? (
                        <i className="bi bi-buildings-fill" aria-hidden="true" />
                      ) : (
                        <i className="bi bi-tree-fill" aria-hidden="true" />
                      )}
                      {entry.classification}
                    </span>
                  </div>
                  <h3 className="brgy-name">{entry.name}</h3>
                  <dl className="brgy-card-stats">
                    <div className="brgy-stat">
                      <dt>Population</dt>
                      <dd>{entry.population.toLocaleString("en-PH")}</dd>
                    </div>
                    <div className="brgy-stat">
                      <dt>Share of municipal population</dt>
                      <dd>{shareFormat.format(entry.sharePercent)}%</dd>
                    </div>
                  </dl>
                  <div className="brgy-microbar" aria-hidden="true">
                    <div
                      className="brgy-microbar-fill"
                      style={{ width: `${maxSharePercent > 0 ? (entry.sharePercent / maxSharePercent) * 100 : 0}%` }}
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ol>

          <p className="brgy-unpublished-note">
            Each profile opens with verified population data — officials, projects, and contacts appear
            there as each passes verification.
          </p>

          <RecordMeta record={barangayRecord} />
        </div>
      </section>
    </>
  );
}
