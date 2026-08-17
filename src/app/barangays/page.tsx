import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { RecordMeta } from "@/components/RecordMeta";
import { getRecord } from "@/data/civic";

export const metadata: Metadata = {
  title: "Barangays",
  description: "The 32 barangays of Maddela, Quirino.",
};

interface Barangay {
  name: string;
  psgcCode: string;
}

interface BarangayData {
  barangayCount: number;
  barangays: Barangay[];
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function BarangaysPage() {
  const record = getRecord<BarangayData>("barangay-dataset-2026q2");

  return (
    <>
      <PageHeader
        title="Barangays of Maddela"
        description={`${record.data.barangayCount} barangays serving the municipality`}
        badge={{ icon: "bi bi-geo-alt-fill", label: "Barangay Units" }}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Government", href: "/government" }, { label: "Barangays" }]}
      />

      <section className="section" style={{ background: "var(--color-bg-alt)" }}>
        <div className="container">
          <div className="grid grid-4" style={{ gap: "var(--spacing-sm)" }}>
            {record.data.barangays.map((barangay) => (
              <Link
                key={barangay.psgcCode}
                href={`/government/barangays/${slugify(barangay.name)}`}
                className="barangay-card"
              >
                <div className="barangay-card-header">
                  <i className="bi bi-geo-alt-fill" aria-hidden="true" />
                  <span className="barangay-name">{barangay.name}</span>
                </div>
              </Link>
            ))}
          </div>
          <RecordMeta record={record} />
        </div>
      </section>
    </>
  );
}
