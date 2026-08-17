import type { Metadata } from "next";
import { RecordMeta } from "@/components/RecordMeta";
import { getRecord, getSource, records } from "@/data/civic";

export const metadata: Metadata = { title: "Legal history" };

interface LegalData {
  instrument: string;
  exactTitle: string;
  date?: string;
  approved?: string;
  relevantProvision: string;
  conditionalProvision?: string;
  effectivity: string;
}

export default function LegalHistoryPage() {
  const legalRecords = records
    .filter((record) => record.type === "legal-instrument")
    .map((record) => getRecord<LegalData>(record.id));

  return (
    <div className="shell page-shell">
      <header className="page-heading">
        <p className="eyebrow">Primary legal sources</p>
        <h1>Legal history</h1>
        <p>
          Seven national instruments help document Maddela’s administrative and
          institutional history. These notes summarize only the cited provisions and
          are not legal advice.
        </p>
      </header>

      <ol className="timeline">
        {legalRecords.map((record) => {
          const source = getSource(record.sourceIds[0]);
          const date = record.data.date ?? record.data.approved ?? record.effectiveFrom;
          return (
            <li key={record.id} className="timeline-item">
              <article>
                <p className="timeline-date"><time dateTime={date}>{date}</time></p>
                <h2>{record.data.instrument}</h2>
                <p className="legal-title">{record.data.exactTitle}</p>
                <p>{record.data.relevantProvision}</p>
                {record.data.conditionalProvision && <p><strong>Condition:</strong> {record.data.conditionalProvision}</p>}
                <p><strong>Effectivity stated in the text:</strong> {record.data.effectivity}</p>
                {record.notes && <p className="caution"><strong>Limit:</strong> {record.notes}</p>}
                <p><a href={source.url}>Read the full text on LawPhil</a></p>
                <RecordMeta record={record} />
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
