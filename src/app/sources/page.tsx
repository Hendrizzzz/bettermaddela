import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { records, sources, sourcesFor } from "@/data/civic";

export const metadata: Metadata = {
  title: "Sources and Verification",
  description: "Evidence, review dates, limitations, and publication boundaries for BetterMaddela's civic records.",
};

export default function SourcesPage() {
  const reportedCount = records.filter((record) => record.status === "reported").length;
  return (
    <>
      <PageHeader
        title="Sources & Verification"
        description="Every published civic record keeps its evidence, review date, and limitations."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sources" }]}
      />

      <section className="section">
        <div className="container">
          <div className="method-grid" role="group" aria-label="Publication totals">
            <div><p className="metric">{records.length}</p><p>accepted records</p></div>
            <div><p className="metric">{sources.length}</p><p>reviewed source entries</p></div>
            <div><p className="metric">{reportedCount}</p><p>community-reported, awaiting official confirmation</p></div>
          </div>

          <div className="section-header-minimal">
            <h2>Published records</h2>
            <p>A verification date records the review; it is not a promise that changing information can never change.</p>
          </div>

          <div className="source-list">
            {records.map((record) => (
              <article className="source-card" id={`record-${record.id}`} key={record.id}>
                <div className="source-card-heading">
                  <h3>{record.label}</h3>
                  <p className="source-dates">Checked <time dateTime={record.lastVerified}>{record.lastVerified}</time><br />Review by <time dateTime={record.nextReviewOn}>{record.nextReviewOn}</time></p>
                </div>
                {record.status === "reported" && (
                  <p className="reported-flag">Community-reported — awaiting official confirmation</p>
                )}
                {record.notes && <p>{record.notes}</p>}
                <ul className="source-links">
                  {sourcesFor(record).map((source) => (
                    <li key={source.id}>
                      {source.url ? (
                        <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} <i className="bi bi-box-arrow-up-right" aria-hidden="true" /></a>
                      ) : (
                        <span>{source.title}</span>
                      )}
                      <span>{source.publisher}, inspected <time dateTime={source.verifiedAt}>{source.verifiedAt}</time></span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="unpublished-note">
            Still unpublished pending their evidence gates: complete elected and barangay rosters, a municipal contact
            directory, emergency contacts, detailed service procedures, local-legislation archives, the enacted
            municipal budget, procurement history, and uncleared media.
          </p>
        </div>
      </section>
    </>
  );
}
