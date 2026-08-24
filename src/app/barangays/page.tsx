import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { RecordMeta } from "@/components/RecordMeta";
import { getRecord } from "@/data/civic";
import { slugify } from "@/lib/slugify";

export const metadata: Metadata = {
  title: "Barangays",
  description: `The ${getRecord<BarangayData>("barangay-dataset-2026q2").data.barangayCount} barangays of Maddela, Quirino.`,
};

interface Barangay {
  name: string;
  psgcCode: string;
}

interface BarangayData {
  barangayCount: number;
  barangays: Barangay[];
}

export default function BarangaysPage() {
  const record = getRecord<BarangayData>("barangay-dataset-2026q2");

  return (
    <>
      <PageHeader
        title="Barangays of Maddela"
        description={`${record.data.barangayCount} barangays serving the municipality`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Government", href: "/government" }, { label: "Barangays" }]}
      />

      <section className="section" style={{ background: "var(--color-bg-alt)" }}>
        <div className="container">
          <div className="grid grid-4">
            {record.data.barangays.map((barangay) => (
              <Link
                key={barangay.psgcCode}
                href={`/government/barangays/${slugify(barangay.name)}`}
                className="barangay-card"
              >
                <div className="barangay-card-header">
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
