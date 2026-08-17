import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { records, sources, sourcesFor } from "@/data/civic";

export const metadata: Metadata = {
  title: "Sources and Verification",
  description: "Evidence, review dates, limitations, and publication boundaries for BetterMaddela's civic records.",
};

export default function SourcesPage() {
  return (
    <>
      <PageHeader
        title="Sources & Verification"
        description="Every published civic record keeps its evidence, review date, and limitations."
        badge={{ icon: "bi bi-journal-check", label: "Evidence" }}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sources" }]}
      />

      <section className="section">
        <div className="container">
          <div className="method-grid" aria-label="Publication totals">
            <div><p className="metric">{records.length}</p><p>accepted records</p></div>
            <div><p className="metric">{sources.length}</p><p>reviewed source entries</p></div>
            <div><p className="metric">0</p><p>published provisional records</p></div>
          </div>

          <div className="section-header-minimal">
            <span className="section-tag"><i className="bi bi-database-check" aria-hidden="true" /> <span>Registry</span></span>
            <h2>Published records</h2>
            <p>A verification date records the review; it is not a promise that changing information can never change.</p>
          </div>

          <div className="source-list">
            {records.map((record) => (
              <article className="source-card" id={`record-${record.id}`} key={record.id}>
                <div className="source-card-heading">
                  <div><p className="status-chip">Verified</p><h3>{record.label}</h3></div>
                  <p className="source-dates">Checked <time dateTime={record.lastVerified}>{record.lastVerified}</time><br />Review by <time dateTime={record.nextReviewOn}>{record.nextReviewOn}</time></p>
                </div>
                {record.notes && <p>{record.notes}</p>}
                <ul className="source-links">
                  {sourcesFor(record).map((source) => (
                    <li key={source.id}>
                      <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} <i className="bi bi-box-arrow-up-right" aria-hidden="true" /></a>
                      <span>{source.publisher} · inspected <time dateTime={source.verifiedAt}>{source.verifiedAt}</time></span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-alt">
        <div className="container">
          <div className="coverage-panel">
            <div><p className="section-kicker">Publication boundary</p><h2>What remains unavailable</h2></div>
            <p>Complete elected and barangay rosters, a general municipal contact directory, emergency contacts, detailed service procedures, complete local-legislation archives, the enacted municipal budget, a complete procurement history, and uncleared media remain unpublished until their specific evidence gates pass.</p>
          </div>
        </div>
      </section>
    </>
  );
}
