import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { RecordMeta, RecordMetaGroup } from "@/components/RecordMeta";
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
  barangayCount: number;
  barangays: BarangayEntry[];
}

interface LeadershipData {
  leaders: {
    name: string;
    title: string;
    scope: string;
    asOf: string;
    evidenceContext: string;
  }[];
  limitations: string;
}

interface OfficeHeadsData {
  observations: {
    office: string;
    person: string;
    displayedTitle: string;
    asOf: string;
    evidenceContext: string;
  }[];
  limitations: string;
}

const barangayRecord = getRecord<BarangayDataset>("barangay-dataset-2026q2");
const leadershipRecord = getRecord<LeadershipData>("maddela-leadership-snapshot");
const officeHeadsRecord = getRecord<OfficeHeadsData>("maddela-office-head-observations");

export const metadata: Metadata = {
  title: "Government",
  description: "Reviewed leadership, office, and barangay information for Maddela, Quirino.",
};

export default function GovernmentPage() {
  return (
    <>
      <PageHeader
        title="Government Structure & Officials"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Government" }]}
      />

      <section className="section" style={{ background: "var(--color-bg-alt)" }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2>Current public observations</h2>
            <p style={{ color: "var(--color-text-light)" }}>Each role keeps the scope and date stated by its evidence.</p>
          </div>
          <div className="grid grid-2">
            {leadershipRecord.data.leaders.map((leader) => (
              <article className="official-card card" key={`${leader.title}-${leader.name}`}>
                <div className="official-photo" aria-hidden="true">
                  <i className="bi bi-person-circle" style={{ fontSize: "5rem", color: "var(--color-primary)" }} />
                </div>
                <div className="official-info">
                  <h3>{leader.name}</h3>
                  <p className="official-title">{leader.title}</p>
                  <p>{leader.scope}</p>
                  <p className="record-meta">Observed as of <time dateTime={leader.asOf}>{leader.asOf}</time></p>
                </div>
              </article>
            ))}
          </div>
          <RecordMeta record={leadershipRecord} />
          <div className="coverage-panel government-officials-notice" style={{ marginTop: "var(--spacing-lg)" }}>
            <div><p className="section-kicker">Roster boundary</p><h2>Municipal council list withheld</h2></div>
            <p>A complete current vice-mayor and Sangguniang Bayan roster has not passed the project&apos;s publication gate. <Link href="/government/officials">See the officials record</Link>.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2>Dated office-head observations</h2>
            <p style={{ color: "var(--color-text-light)" }}>These are source-dated observations, not a complete office directory.</p>
          </div>
          <div className="grid grid-3">
            {officeHeadsRecord.data.observations.map((observation) => (
              <article className="councilor-card card text-center" key={`${observation.office}-${observation.person}`}>
                <i className="bi bi-person-badge" style={{ fontSize: "3rem", color: "var(--color-primary)" }} aria-hidden="true" />
                <h3>{observation.person}</h3>
                <p className="badge badge-info">{observation.displayedTitle}</p>
                <p>{observation.office}</p>
                <p className="record-meta">Observed <time dateTime={observation.asOf}>{observation.asOf}</time></p>
              </article>
            ))}
          </div>
          <RecordMeta record={officeHeadsRecord} />
        </div>
      </section>

      <section id="barangays" className="section" style={{ background: "var(--color-bg-alt)" }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2>Barangays of Maddela</h2>
            <p style={{ color: "var(--color-text-light)" }}>{barangayRecord.data.barangayCount} barangays</p>
          </div>
          <div className="grid grid-4">
            {barangayRecord.data.barangays.map((barangay) => (
              <Link key={barangay.psgcCode} href={`/government/barangays/${slugify(barangay.name)}`} className="barangay-card">
                <div className="barangay-card-header">
                  <i className="bi bi-geo-alt-fill" aria-hidden="true" />
                  <span className="barangay-name">{barangay.name}</span>
                </div>
              </Link>
            ))}
          </div>
          <RecordMetaGroup records={[
            { label: "barangay list and population", record: barangayRecord },
            { label: "leadership", record: leadershipRecord },
            { label: "office heads", record: officeHeadsRecord },
          ]} />
        </div>
      </section>
    </>
  );
}
