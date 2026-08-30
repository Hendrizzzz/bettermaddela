import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { RecordMeta, RecordMetaGroup } from "@/components/RecordMeta";
import { getRecord } from "@/data/civic";

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

const leadershipRecord = getRecord<LeadershipData>("maddela-leadership-snapshot");
const officeHeadsRecord = getRecord<OfficeHeadsData>("maddela-office-head-observations");
const reportedExOfficioRecord = getRecord<LeadershipData>(
  "maddela-officials-exofficio-succession-2026-report",
);

export const metadata: Metadata = {
  title: "Municipal Officials",
  description: "Dated, source-reviewed leadership observations for Maddela.",
};

export default function OfficialsPage() {
  return (
    <>
      <PageHeader
        title="Municipal Officials"
        description="Leadership entries are shown only for the exact role, scope, and date supported by public evidence."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Government", href: "/government" }, { label: "Officials" }]}
      />

      <section className="section">
        <div className="container">
          <h2 className="text-center">Leadership</h2>
          <div className="grid grid-2">
            {leadershipRecord.data.leaders.map((leader) => (
              <article className="official-card card" key={`${leader.title}-${leader.name}`}>
                <div className="official-info">
                  <h3>{leader.name}</h3>
                  <p className="official-title">{leader.title}</p>
                  <p>{leader.scope}</p>
                </div>
              </article>
            ))}
          </div>
          <RecordMeta record={leadershipRecord} />
        </div>
      </section>

      <section className="section bg-alt">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2>Community-reported ex-officio seats</h2>
            <p>Published under a documented owner override; awaiting official confirmation.</p>
          </div>
          <div className="grid grid-2">
            {reportedExOfficioRecord.data.leaders.map((leader) => (
              <article className="official-card card hairline-top" key={`${leader.title}-${leader.name}`}>
                <div className="official-info">
                  <p className="reported-flag">Community-reported — awaiting official confirmation</p>
                  <h3>{leader.name}</h3>
                  <p className="official-title">{leader.title}</p>
                  <p>{leader.evidenceContext}</p>
                </div>
              </article>
            ))}
          </div>
          <RecordMeta record={reportedExOfficioRecord} />
          <p className="unpublished-note">
            These entries rest on a community report the project owner attests to, not on an official
            instrument. Names are shown as reported, with spelling variants left unresolved; any entry
            may be corrected or withdrawn when official confirmation arrives.{" "}
            <Link href="/sources#record-maddela-officials-exofficio-succession-2026-report">
              See the record&apos;s sources
            </Link>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-center">Dated office-head observations</h2>
          <p className="text-center">Individual source observations; not a complete municipal directory.</p>
          <div className="grid grid-3">
            {officeHeadsRecord.data.observations.map((observation) => (
              <article className="councilor-card card text-center" key={`${observation.office}-${observation.person}`}>
                <h3>{observation.person}</h3>
                <span className="office-role-label">{observation.displayedTitle}</span>
              </article>
            ))}
          </div>
          <RecordMeta record={officeHeadsRecord} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="unpublished-note">
            No verified list of the current Sangguniang Bayan, including its ex-officio seats, has been
            established from official instruments. The three ex-officio seats and one reported succession
            above are community-reported entries pending confirmation, not a verified council roster.
          </p>
          <RecordMetaGroup records={[
            { label: "leadership observations", record: leadershipRecord },
            { label: "community-reported ex-officio seats", record: reportedExOfficioRecord },
            { label: "office-head observations", record: officeHeadsRecord },
          ]} />
        </div>
      </section>
    </>
  );
}
