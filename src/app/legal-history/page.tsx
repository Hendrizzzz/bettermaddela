import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RecordMeta } from "@/components/RecordMeta";
import {
  HistoryTimeline,
  type HistoryChipVariant,
  type HistoryTimelineItem,
} from "@/components/history/HistoryTimeline";
import { getRecord, getSource, records, type CivicRecord } from "@/data/civic";

export const metadata: Metadata = {
  title: "The story of Maddela: history & legal timeline",
  description:
    "A glanceable, source-linked story of Maddela: its reviewed local history, the national laws that shaped the municipality, and the eras still being researched.",
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

interface HistorySection {
  period: string;
  title: string;
  kind: string;
  text: string;
}

interface HistoryProfileData {
  overview: string;
  sections: HistorySection[];
  publicationNote: string;
}

interface CommunityProfileData {
  summary: string;
  themes: { label: string; description: string }[];
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

/** Evidence chips come only from the reviewed record's own kind field. */
function evidenceChip(
  kind: string,
): { label: string; variant: HistoryChipVariant; kindClass: HistoryTimelineItem["kindClass"] } {
  switch (kind) {
    case "documented-legal-milestone":
      return { label: "Documented law", variant: "gold", kindClass: "law" };
    case "local-tradition":
      return { label: "Local tradition", variant: "outline", kindClass: "tradition" };
    case "institutional-context":
      return { label: "Institutional context", variant: "straw", kindClass: "context" };
    default:
      throw new Error(`Unmapped history section kind: ${kind}`);
  }
}

function recordDate(record: CivicRecord<LegalData>) {
  return record.data.date ?? record.data.approved ?? record.effectiveFrom ?? record.lastVerified;
}

const MONTHS_EN_PH = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];


export default function LegalHistoryPage() {
  const historyProfile = getRecord<HistoryProfileData>("maddela-history-profile");
  const communityProfile = getRecord<CommunityProfileData>("maddela-community-profile");

  const legalRecords = records
    .filter((record) => record.type === "legal-instrument")
    .map((record) => getRecord<LegalData>(record.id));

  const years = legalRecords.map((record) => recordDate(record).slice(0, 4)).sort();
  const spanStart = years[0];
  const spanEnd = years[years.length - 1];

  interface InstrumentView {
    id: string;
    data: LegalData;
    date: string;
    typeLabel: string;
    sourceUrl: string;
    record: CivicRecord<LegalData>;
  }

  const instruments = new Map<string, InstrumentView>(
    legalRecords.map((record) => [
      record.id,
      {
        id: record.id,
        data: record.data,
        date: recordDate(record),
        typeLabel:
          record.type.charAt(0).toUpperCase() + record.type.slice(1).replace(/-/g, " "),
        sourceUrl: getSource(record.sourceIds[0]).url,
        record: record as CivicRecord<LegalData>,
      },
    ]),
  );

  function InstrumentBlock({ view }: { view: InstrumentView }) {
    const provision = view.data.relevantProvision ?? view.data.statedAction;
    return (
      <div className="hst-instrument">
        <div className="hst-instrument-head">
          <h3 className="hst-instrument-name">{view.data.instrument}</h3>
          <p className="hst-instrument-date">
            <time dateTime={view.date}>{formatEnPh(view.date)}</time>
          </p>
        </div>
        <ul className="hst-chips">
          <li className="hst-chip hst-chip--straw">{view.typeLabel}</li>
        </ul>
        <p className="hst-exact-title">{view.data.exactTitle}</p>
        {provision && <p>{provision}</p>}
        {view.data.conditionalProvision && (
          <p>
            <strong>Condition in the text:</strong> {view.data.conditionalProvision}
          </p>
        )}
        <p>
          <strong>Effectivity stated in the text:</strong> {view.data.effectivity}
        </p>
        {view.record.notes && (
          <p>
            <strong>Interpretive limit:</strong> {view.record.notes}
          </p>
        )}
        <p className="hst-source-link">
          <a href={view.sourceUrl} target="_blank" rel="noreferrer">
            Read the complete text <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
          </a>
        </p>
        <RecordMeta record={view.record} />
      </div>
    );
  }

  function chapterChildren(section: HistorySection, instrumentIds: string[]): ReactNode {
    if (instrumentIds.length === 0) {
      return <p className="hst-body">{section.text}</p>;
    }
    return (
      <>
        <p className="hst-body">{section.text}</p>
        <details className="hst-details">
          <summary className="hst-details-summary">
            <span>The laws behind this chapter</span>
            <i className="bi bi-chevron-down hst-chevron" aria-hidden="true" />
          </summary>
          <div className="hst-details-body">
            {instrumentIds.map((id) => {
              const view = instruments.get(id);
              if (!view) {
                throw new Error(`Missing legal record for story chapter: ${id}`);
              }
              return <InstrumentBlock key={view.id} view={view} />;
            })}
          </div>
        </details>
      </>
    );
  }

/** Format an ISO YYYY-MM-DD date using Philippine English conventions. */
function formatEnPh(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day || month > 12) return iso;
  return `${MONTHS_EN_PH[month - 1]} ${day}, ${year}`;
}


  const sections = historyProfile.data.sections;

  function lawStandalone(id: string): HistoryTimelineItem {
    const view = instruments.get(id);
    const copy = TIMELINE_COPY[id];
    if (!view || !copy) {
      throw new Error(`Missing reviewed data for standalone legal node: ${id}`);
    }
    return {
      key: `standalone-${id}`,
      kindClass: "law",
      period: view.date.slice(0, 4),
      chipLabel: "Documented law",
      chipVariant: "gold",
      heading: copy.label,
      children: (
        <>
          <p className="hst-body">{copy.sentence}</p>
          <details className="hst-details">
            <summary className="hst-details-summary">
              <span>Instrument details</span>
              <i className="bi bi-chevron-down hst-chevron" aria-hidden="true" />
            </summary>
            <div className="hst-details-body">
              <InstrumentBlock view={view} />
            </div>
          </details>
        </>
      ),
    };
  }

  function chapter(index: number, instrumentIds: string[]): HistoryTimelineItem {
    const section = sections[index];
    const chip = evidenceChip(section.kind);
    return {
      key: section.title,
      kindClass: chip.kindClass,
      chipLabel: chip.label,
      chipVariant: chip.variant,
      period: section.period,
      heading: section.title,
      children: chapterChildren(section, instrumentIds),
    };
  }


  const timelineItems: HistoryTimelineItem[] = [
    // Honest gap state: the reviewed records do not document the pre-1900s.
    {
      key: "gap-earlier-centuries",
      kindClass: "gap",
      period: "Earlier centuries",
      chipLabel: "Not yet documented",
      chipVariant: "quiet",
      heading: "The earlier centuries",
      children: (
        <p className="hst-body hst-gap-text">
          The earlier centuries are not yet documented here; evidence collection
          is in progress.
        </p>
      ),
    },
    chapter(0, []),
    { ...chapter(1, ["legal-eo-368-1950"]), periodDateTime: "1950-11-11" },
    chapter(2, ["legal-ra-4734-1966", "legal-ra-5554-1969", "legal-ra-6394-1971"]),
    { ...chapter(3, ["legal-bp-345-1983"]), periodDateTime: "1983-02-25" },
    lawStandalone("legal-bp-533-1983"),
    lawStandalone("legal-ra-7239-1992"),
    { ...chapter(4, []), periodDateTime: "2004-02-09" },
    chapter(5, []),
  ];

  const arcSentence = `From river valleys and early settlements to a municipality in Quirino: a story traced through ${legalRecords.length} national laws and ${sections.length} chapters of reviewed local history.`;



  return (
    <>
      <section className="hst-hero">
        <div className="container">
          <p className="hst-kicker">
            <i className="bi bi-signpost-split-fill" aria-hidden="true" /> An
            independent volunteer project, not a government site
          </p>
          <h1>The story of Maddela</h1>
          <p className="hst-arc">{arcSentence}</p>
          <ul className="hst-facts">
            <li className="hst-fact">{legalRecords.length} national laws</li>
            <li className="hst-fact">{sections.length} story chapters</li>
            <li className="hst-fact">
              {spanStart} → {spanEnd} in national law
            </li>
          </ul>
        </div>
      </section>

      <section className="hst-section">
        <div className="container">
          <div className="hst-panel">
            <h2 className="hst-panel-title">How to read this story</h2>
            <p className="hst-body">{historyProfile.data.overview}</p>
            <ul className="hst-legend">
              <li className="hst-legend-item">
                <span className="hst-chip hst-chip--gold">Documented law</span>{" "}
                Anchored in inspected national legal texts.
              </li>
              <li className="hst-legend-item">
                <span className="hst-chip hst-chip--straw">Institutional context</span>{" "}
                Described by public institutional sources today.
              </li>
              <li className="hst-legend-item">
                <span className="hst-chip hst-chip--outline">Local tradition</span>{" "}
                A local historical account, attributed but not treated as controlling
                legal history.
              </li>
            </ul>
            <p className="hst-note">{historyProfile.data.publicationNote}</p>
            <RecordMeta record={historyProfile} />
          </div>

          <HistoryTimeline items={timelineItems} />

          <div className="hst-panel hst-panel--epilogue">
            <h2 className="hst-panel-title">The community today</h2>
            <p className="hst-body">{communityProfile.data.summary}</p>
            <div className="hst-themes">
              {communityProfile.data.themes.map((theme) => (
                <div className="hst-theme" key={theme.label}>
                  <h3 className="hst-theme-label">{theme.label}</h3>
                  <p>{theme.description}</p>
                </div>
              ))}
            </div>
            <RecordMeta record={communityProfile} />
          </div>
        </div>
      </section>
    </>
  );
}
