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
          </div>
          <p className="table-note">Urban/rural basis: {barangayRecord.data.urbanRuralBasis}.</p>
          <RecordMeta record={barangayRecord} />
        </div>
      </section>
    </>
  );
}
