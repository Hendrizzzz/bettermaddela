import type { Metadata } from "next";
import { records, sources, sourcesFor } from "@/data/civic";

export const metadata: Metadata = {
  title: "Sources and verification",
  description:
    "The evidence, review dates, limitations, and publication boundaries for BetterMaddela's civic records.",
};

export default function SourcesPage() {
  return (
    <div className="shell page-shell">
      <header className="page-heading">
        <p className="eyebrow">Evidence before publication</p>
        <h1>Sources and verification</h1>
        <p>
          BetterMaddela publishes a record only after an independent review confirms
          its source, scope, date, and limitations. A verification date is not a claim
          that changing information can never change.
        </p>
      </header>

      <section className="method-grid" aria-label="Publication totals">
        <div><p className="metric">{records.length}</p><p>accepted records</p></div>
        <div><p className="metric">{sources.length}</p><p>reviewed source entries</p></div>
        <div><p className="metric">0</p><p>published provisional records</p></div>
      </section>

      <section className="data-section" aria-labelledby="records-heading">
        <h2 id="records-heading">Published record registry</h2>
        <div className="source-list">
          {records.map((record) => (
            <article className="source-card" id={`record-${record.id}`} key={record.id}>
              <div className="source-card-heading">
                <div><p className="status-chip">Verified</p><h3>{record.label}</h3></div>
                <p className="source-dates">Checked {record.lastVerified}<br />Review by {record.nextReviewOn}</p>
              </div>
              {record.notes && <p>{record.notes}</p>}
              <ul className="source-links">
                {sourcesFor(record).map((source) => (
                  <li key={source.id}>
                    <a href={source.url}>{source.title}</a>
                    <span>{source.publisher} · inspected {source.verifiedAt}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="unavailable-panel" aria-labelledby="gaps-heading">
        <div><p className="eyebrow">Publication boundary</p><h2 id="gaps-heading">What remains unavailable</h2></div>
        <p>
          Officials and rosters, public contacts, emergency information, detailed
          services, local legislation, transparency records, project status, and media
          remain out of production until their specific evidence gates pass.
        </p>
      </section>
    </div>
  );
}
