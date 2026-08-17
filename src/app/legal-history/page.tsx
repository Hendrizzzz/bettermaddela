import type { Metadata } from "next";
import { RecordMeta } from "@/components/RecordMeta";
import { getRecord, getSource, records } from "@/data/civic";

export const metadata: Metadata = {
  title: "Legal history",
  description:
    "A source-linked timeline of national legal instruments relevant to Maddela's administrative and institutional history.",
};

interface LegalData {
  instrument: string;
  exactTitle: string;
  date?: string;
  approved?: string;
  relevantProvision?: string;
  statedAction?: string;
  conditionalProvision?: string;
  effectivity: string;
}

export default function LegalHistoryPage() {
  const legalRecords = records
    .filter((record) => record.type === "legal-instrument")
    .map((record) => getRecord<LegalData>(record.id));

  return (
    <>
      <section className="legal-hero">
        <div className="container legal-hero-content">
          <div className="legal-hero-badge"><i className="bi bi-journal-text" aria-hidden="true" /> Primary legal sources</div>
          <h1>National legal history</h1>
          <p>Documents that help trace Maddela’s administrative and institutional history</p>
        </div>
      </section>

      <section className="legal-content">
        <div className="container">
          <div className="legal-wrapper">
            <aside className="legal-toc" aria-label="Legal history contents">
              <h2><i className="bi bi-list-ul" aria-hidden="true" /> On this page</h2>
              <nav>
                {legalRecords.map((record) => (
                  <a href={`#${record.id}`} key={record.id}>{record.data.instrument}</a>
                ))}
              </nav>
            </aside>

            <div className="legal-article">
              <div className="legal-note legal-history-intro">
                <i className="bi bi-info-circle" aria-hidden="true" />
                <p>
                  These are national instruments, not Maddela ordinances. The notes summarize only the cited provisions,
                  do not establish an exact founding or renaming date, and are not legal advice.
                </p>
              </div>

              {legalRecords.map((record) => {
                const source = getSource(record.sourceIds[0]);
                const date = record.data.date ?? record.data.approved ?? record.effectiveFrom ?? record.lastVerified;
                const provision = record.data.relevantProvision ?? record.data.statedAction;
                return (
                  <article className="legal-section legal-history-entry" id={record.id} key={record.id}>
                    <p className="legal-history-date"><time dateTime={date}>{date}</time></p>
                    <h2>{record.data.instrument}</h2>
                    <p className="legal-title">{record.data.exactTitle}</p>
                    {provision && <p>{provision}</p>}
                    {record.data.conditionalProvision && (
                      <div className="legal-note">
                        <i className="bi bi-exclamation-circle" aria-hidden="true" />
                        <p><strong>Condition in the text:</strong> {record.data.conditionalProvision}</p>
                      </div>
                    )}
                    <p><strong>Effectivity stated in the text:</strong> {record.data.effectivity}</p>
                    {record.notes && (
                      <div className="legal-note">
                        <i className="bi bi-shield-exclamation" aria-hidden="true" />
                        <p><strong>Interpretive limit:</strong> {record.notes}</p>
                      </div>
                    )}
                    <p className="legal-history-source">
                      <a href={source.url} target="_blank" rel="noreferrer">
                        Read the complete text <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
                      </a>
                    </p>
                    <RecordMeta record={record} />
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
