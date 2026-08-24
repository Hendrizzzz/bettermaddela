import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { RecordMeta } from "@/components/RecordMeta";
import { getRecord } from "@/data/civic";
import { slugify } from "@/lib/slugify";

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

const barangayRecord = getRecord<BarangayDataset>("barangay-dataset-2026q2");

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
const shareFormat = new Intl.NumberFormat("en-PH", { maximumFractionDigits: 1 });

function formatPopulation(value: number) {
  return value.toLocaleString("en-PH");
}

function buildComparison(name: string, rank: number, population: number) {
  const count = rankedBarangays.length;
  if (largestBarangay.psgcCode === undefined || smallestBarangay.psgcCode === undefined) {
    return "";
  }
  if (largestBarangay.name === name) {
    return `Computed from the same dataset: ${name} is the most populous of the ${count} barangays — about ${shareFormat.format(
      population / smallestBarangay.population,
    )}× the population of the smallest, Barangay ${smallestBarangay.name}.`;
  }
  if (smallestBarangay.name === name) {
    return `Computed from the same dataset: ${name} is the least populous of the ${count} barangays — about ${shareFormat.format(
      (population / largestBarangay.population) * 100,
    )}% of the population of the largest, Barangay ${largestBarangay.name}.`;
  }
  return `Computed from the same dataset: ${name} ranks #${rank} of ${count} by population — below Barangay ${largestBarangay.name} (${formatPopulation(
    largestBarangay.population,
  )}) and above Barangay ${smallestBarangay.name} (${formatPopulation(smallestBarangay.population)}).`;
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
    description: `Dated population and classification data for Barangay ${barangay.name}, Maddela.`,
  };
}

export default async function BarangayDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const barangay = barangayRecord.data.barangays.find((item) => slugify(item.name) === slug);
  if (!barangay) notFound();

  const rankedEntry = rankedBarangays.find((entry) => entry.psgcCode === barangay.psgcCode);
  if (!rankedEntry) notFound();
  const shareOfMunicipal =
    municipalTotalPopulation > 0 ? (barangay.population / municipalTotalPopulation) * 100 : 0;
  const comparison = buildComparison(barangay.name, rankedEntry.rank, barangay.population);

  return (
    <>
      <PageHeader
        title={`Barangay ${barangay.name}`}
        description={`Dated statistical profile for Barangay ${barangay.name}, Maddela.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Government", href: "/government" }, { label: "Barangays", href: "/barangays" }, { label: barangay.name }]}
      />
      <section className="section" style={{ background: "var(--color-bg-alt)" }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "var(--spacing-xs)" }}>Barangay profile</h2>
            <p style={{ color: "var(--color-text-light)" }}>Population and classification from the reviewed PSA dataset</p>
          </div>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon"><i className="bi bi-people-fill" aria-hidden="true" /></div>
              <div className="metric-value">{barangay.population.toLocaleString("en-PH")}</div>
              <div className="metric-label">Population</div>
              <div className="metric-source">As of <time dateTime={barangayRecord.data.populationReferenceDate}>{formatLongDate(barangayRecord.data.populationReferenceDate)}</time></div>
            </div>
            <div className="metric-card">
              <div className="metric-icon"><i className="bi bi-geo-alt-fill" aria-hidden="true" /></div>
              <div className="metric-value">{barangay.classification}</div>
              <div className="metric-label">Urban/rural classification</div>
              <div className="metric-source">Classification basis in the reviewed census publication</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon"><i className="bi bi-bar-chart-fill" aria-hidden="true" /></div>
              <div className="metric-value">
                #{rankedEntry.rank}
                <span className="brgy-rank-of"> of {rankedBarangays.length.toLocaleString("en-PH")}</span>
              </div>
              <div className="metric-label">Rank by population</div>
              <div className="metric-source">Computed from the reviewed PSA barangay dataset</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon"><i className="bi bi-pie-chart-fill" aria-hidden="true" /></div>
              <div className="metric-value">{shareFormat.format(shareOfMunicipal)}%</div>
              <div className="metric-label">Share of municipal population</div>
              <div className="metric-source">Computed: {barangay.population.toLocaleString("en-PH")} ÷ {municipalTotalPopulation.toLocaleString("en-PH")} municipal total</div>
            </div>
          </div>
          {comparison && <p className="brgy-context">{comparison}</p>}
          <p className="table-note">Urban/rural basis: {barangayRecord.data.urbanRuralBasis}.</p>
          <RecordMeta record={barangayRecord} />
        </div>
      </section>
    </>
  );
}
