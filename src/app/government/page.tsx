import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import StructureChart from "@/components/government/StructureChart";
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
const officialsTermRecord = getRecord<LeadershipData>("maddela-officials-2025-term");

export const metadata: Metadata = {
  title: "Government",
  description: "Reviewed leadership, office, and barangay information for Maddela, Quirino.",
};

export default function GovernmentPage() {
  // The structure chart shows a name ONLY for roles present in the reviewed
  // records; every other seat renders a withheld state.
  const mayor = officialsTermRecord.data.leaders.find(
    (leader) => leader.title === "Municipal Mayor",
  );
  const viceMayor = officialsTermRecord.data.leaders.find(
    (leader) => leader.title === "Municipal Vice Mayor",
  );
  const councilors = officialsTermRecord.data.leaders.filter(
    (leader) => leader.title === "Sangguniang Bayan Member",
  );

  return (
    <>
      <PageHeader
        title="Government Structure & Officials"
        description="Names shown where the record exists, each on a hairline card; withheld elsewhere."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Government" }]}
      />

      <section className="section govt-structure-section section--allen">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2>Maddela LGU government structure</h2>
            <div className="section-header-rule" style={{ maxWidth: 320, margin: "12px auto 0" }} aria-hidden="true" />
          </div>
          <StructureChart
            mayor={mayor ? { name: mayor.name, asOf: mayor.asOf } : null}
            viceMayor={viceMayor ? { name: viceMayor.name, asOf: viceMayor.asOf } : null}
            councilors={councilors.map((member) => ({ name: member.name }))}
          />
          <p className="govt-legend-items">
            <span>Mayor</span>
            <span>Vice Mayor</span>
            <span>Sangguniang Bayan, 8 seats</span>
          </p>
        </div>
      </section>

      <section className="section section--allen" style={{ background: "var(--color-bg-alt)" }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2>Current public observations</h2>
            <p style={{ color: "var(--color-text-light)" }}>Each role keeps the scope and date stated by its evidence, repeated here and in the chart for glance recognition.</p>
          </div>
          <div className="section-header-rule" aria-hidden="true" />
          <div className="grid grid-2">
            {leadershipRecord.data.leaders.map((leader) => (
              <article className="official-card card hairline-top" key={`${leader.title}-${leader.name}`}>
                <div className="official-info">
                  <h3>{leader.name}</h3>
                  <p className="official-title">{leader.title}</p>
                  <p className="official-scope">{leader.scope}</p>
                  <p className="record-meta">Observed as of <time dateTime={leader.asOf}>{leader.asOf}</time>, {leader.evidenceContext}</p>
                  <span className="meta-checked">Checked {leader.asOf}</span>
                </div>
              </article>
            ))}
          </div>
          <RecordMeta record={leadershipRecord} />
          <p className="unpublished-note">
            The 2025-elected vice mayor and councilors appear above and in the structure chart as
            listed on Comelec server tallies; full legal names and the new ex-officio seats await
            official proclamations. <Link href="/government/officials">See the officials record</Link>.
          </p>
        </div>
      </section>

      <section className="section section--allen">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2>Dated office-head observations</h2>
            <p style={{ color: "var(--color-text-light)" }}>These are source-dated observations, not a complete office directory.</p>
          </div>
          <div className="section-header-rule" aria-hidden="true" />
          <div className="grid grid-3">
            {officeHeadsRecord.data.observations.map((observation) => (
              <article className="councilor-card card text-center hairline-top" key={`${observation.office}-${observation.person}`}>
                <h3>{observation.person}</h3>
                <span className="office-role-label">{observation.displayedTitle}</span>
                <p className="record-meta">Observed <time dateTime={observation.asOf}>{observation.asOf}</time>, {observation.evidenceContext}</p>
                <span className="meta-checked">Checked {observation.asOf}</span>
              </article>
            ))}
          </div>
          <RecordMeta record={officeHeadsRecord} />
        </div>
      </section>

      <section id="barangays" className="section section--allen" style={{ background: "var(--color-bg-alt)" }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2>The {barangayRecord.data.barangayCount} barangays of Maddela</h2>
            <p style={{ color: "var(--color-text-light)" }}>{barangayRecord.data.barangayCount} barangays, rural and urban, each a hairline card</p>
            <div className="section-header-rule" style={{ maxWidth: 360, margin: "12px auto 0" }} aria-hidden="true" />
          </div>
          <div className="grid grid-4">
            {barangayRecord.data.barangays.map((barangay) => (
              <Link key={barangay.psgcCode} href={`/government/barangays/${slugify(barangay.name)}`} className="barangay-card hairline-top">
                <div className="barangay-card-header">
                  <span className="barangay-name">{barangay.name}</span>
                </div>
                <span className="barangay-class">{barangay.classification}</span>
              </Link>
            ))}
          </div>
          <RecordMetaGroup records={[
            { label: "barangay list and population", record: barangayRecord },
            { label: "leadership", record: leadershipRecord },
            { label: "office heads", record: officeHeadsRecord },
            { label: "2025-elected officials", record: officialsTermRecord },
          ]} />
        </div>
      </section>
    </>
  );
}
