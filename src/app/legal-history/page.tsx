import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { RecordMeta } from "@/components/RecordMeta";
import { getRecord, getSource, records } from "@/data/civic";

export const metadata: Metadata = {
  title: "Legal history",
  description:
    "A source-linked timeline of national laws relevant to Maddela’s administrative and institutional history.",
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

interface TimelineCopy {
  label: string;
  sentence: string;
}

const TIMELINE_COPY: Record<string, TimelineCopy> = {
  "legal-eo-368-1950": {
    label: "Nueva Vizcaya municipalities reorganized",
    sentence:
      "Names Maddela among ten reorganized municipalities and defines its historical boundary.",
  },
  "legal-ra-4734-1966": {
    label: "Subprovince of Quirino created",
    sentence:
      "Includes Maddela in the newly created Subprovince of Quirino within Nueva Vizcaya.",
  },
  "legal-ra-5554-1969": {
    label: "Subprovince municipality list amended",
    sentence:
      "Amends the subprovince law; Maddela stays listed alongside Diffun, Saguday, Aglipay, and Cabarroguis.",
  },
  "legal-ra-6394-1971": {
    label: "Quirino becomes a regular province",
    sentence:
      "Separates Quirino from Nueva Vizcaya as a regular province, subject to a favorable plebiscite.",
  },
  "legal-bp-345-1983": {
    label: "Nagtipunan separated from Maddela",
    sentence:
      "Barangays then within Maddela are separated and constituted into the Municipality of Nagtipunan.",
  },
  "legal-bp-533-1983": {
    label: "Maddela Municipal Hospital established",
    sentence: "Provides for a ten-bed hospital known as the Maddela Municipal Hospital.",
  },
  "legal-ra-7239-1992": {
    label: "Hospital bed capacity raised to 25",
    sentence:
      "Increases the stated bed capacity of Maddela Medicare Community Hospital from 10 to 25 beds.",
  },
};

function recordDate(record: { data: LegalData; effectiveFrom?: string; lastVerified: string }) {
  return record.data.date ?? record.data.approved ?? record.effectiveFrom ?? record.lastVerified;
}

export default function LegalHistoryPage() {
  const legalRecords = records
    .filter((record) => record.type === "legal-instrument")
    .map((record) => getRecord<LegalData>(record.id));

  const years = legalRecords
    .map((record) => recordDate(record).slice(0, 4))
    .sort();
  const spanStart = years[0];
  const spanEnd = years[years.length - 1];
  const introSentence = `${legalRecords.length} national laws trace changes touching Maddela’s boundaries, province, and hospital between ${spanStart} and ${spanEnd}.`;

  return (
    <>
      <section className="lh-hero">
        <div className="container">
          <p className="lh-hero-badge">
            <i className="bi bi-journal-text" aria-hidden="true" /> Primary legal sources
          </p>
          <h1>National legal history</h1>
          <p className="lh-hero-subtitle">
            Source-linked national documents tracing Maddela’s administrative and institutional
            history.
          </p>
        </div>
      </section>

      <section className="lh-section">
        <div className="container">
          <div className="lh-intro">
            <p className="lh-intro-sentence">{introSentence}</p>
            <ul className="lh-chips" aria-label="Timeline span">
              <li className="lh-chip">
                {spanStart} → {spanEnd}
              </li>
              <li className="lh-chip">{legalRecords.length} national instruments</li>
            </ul>
          </div>

          <ol className="lh-timeline">
            {legalRecords.map((record, index) => {
              const source = getSource(record.sourceIds[0]);
              const date = recordDate(record);
              const year = date.slice(0, 4);
              const copy = TIMELINE_COPY[record.id];
              const provision = record.data.relevantProvision ?? record.data.statedAction;
              const typeLabel =
                record.type.charAt(0).toUpperCase() + record.type.slice(1).replace(/-/g, " ");
              return (
                <li className="lh-item" key={record.id}>
                  <Reveal key={record.id} delay={index * 0.06}>
                    <article className="lh-card" id={record.id}>
                      <p className="lh-year">
                        <time dateTime={date}>{year}</time>
                      </p>
                      <h2 className="lh-label">{copy.label}</h2>
                      <p className="lh-sentence">{copy.sentence}</p>
                      <details className="lh-details">
                        <summary className="lh-details-summary">
                          <span>Details</span>
                          <i className="bi bi-chevron-down lh-chevron" aria-hidden="true" />
                        </summary>
                        <div className="lh-details-body">
                          <ul className="lh-chips" aria-label="Instrument identification">
                            <li className="lh-chip">{record.data.instrument}</li>
                            <li className="lh-chip">{typeLabel}</li>
                          </ul>
                          <h3 className="lh-exact-title">{record.data.exactTitle}</h3>
                          {provision && <p>{provision}</p>}
                          {record.data.conditionalProvision && (
                            <p>
                              <strong>Condition in the text:</strong>{" "}
                              {record.data.conditionalProvision}
                            </p>
                          )}
                          <p>
                            <strong>Effectivity stated in the text:</strong>{" "}
                            {record.data.effectivity}
                          </p>
                          {record.notes && (
                            <p>
                              <strong>Interpretive limit:</strong> {record.notes}
                            </p>
                          )}
                          <p className="lh-source-link">
                            <a href={source.url} target="_blank" rel="noreferrer">
                              Read the complete text{" "}
                              <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
                            </a>
                          </p>
                          <RecordMeta record={record} />
                        </div>
                      </details>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
