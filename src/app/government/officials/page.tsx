import type { Metadata } from "next";
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
                  <p>{leader.evidenceContext}</p>
                  <p className="record-meta">Observed as of <time dateTime={leader.asOf}>{leader.asOf}</time></p>
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
              <h2>Dated office-head observations</h2>
            <p>Individual source observations; not a complete municipal directory.</p>
          </div>
          <div className="grid grid-3">
            {officeHeadsRecord.data.observations.map((observation) => (
              <article className="councilor-card card text-center" key={`${observation.office}-${observation.person}`}>
                <h3>{observation.person}</h3>
                <p className="badge badge-info">{observation.displayedTitle}</p>
                <p>{observation.office}</p>
                <p>{observation.evidenceContext}</p>
                <p className="record-meta">Observed <time dateTime={observation.asOf}>{observation.asOf}</time></p>
              </article>
            ))}
          </div>
          <RecordMeta record={officeHeadsRecord} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="coverage-panel government-officials-notice">
            <h2>Vice mayor and council roster not published</h2>
            <p>A complete current Sangguniang Bayan record—including applicable ex-officio seats, vacancies, succession, and appointment instruments—was not established. BetterMaddela therefore does not present a partial list as the current council.</p>
          </div>
          <RecordMetaGroup records={[
            { label: "leadership observations", record: leadershipRecord },
            { label: "office-head observations", record: officeHeadsRecord },
          ]} />
        </div>
      </section>
    </>
  );
}
