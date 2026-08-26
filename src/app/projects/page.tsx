import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { RecordMeta } from "@/components/RecordMeta";
import { Reveal } from "@/components/motion/Reveal";
import { getRecord, type CivicRecord } from "@/data/civic";

interface ProjectData {
  projectName: string;
  category: string;
  location?: string;
  locationConflict?: string;
  implementingAgency: string;
  amountLabel?: string;
  amount?: number;
  amountNote?: string;
  fundSource?: string;
  contractor?: string;
  referenceCode?: string;
  referenceCodes?: string;
  schedule?: string;
  serviceArea?: string;
  turnoverTo?: string;
  componentPackage?: string;
  stage: string;
  stageAsOf: string;
  contextNotes?: string;
  outcomeCheck?: string;
  canonicalUrl: string;
  limitations: string;
}

interface NoticesData {
  summary: string;
  items: { title: string; location: string; postedAt: string }[];
  stage: string;
  stageAsOf: string;
  canonicalUrl: string;
  limitations: string;
}

/*
 * STAGE-TRACK MAPPING — conservative by design.
 *
 * The four-step track (procurement → award → implementation → turnover) is
 * derived ONLY from each record's `stage` field, never from dates, amounts or
 * narrative context:
 *   procurement    ← invitation-to-bid / bid-notice / bid-deadline language
 *   award          ← "Notice of Award" / awarded language
 *   implementation ← NO RULE MAPS HERE TODAY. NIA's "may proceed with
 *                    mobilization" language does not establish that
 *                    construction started, so nothing may claim this step.
 *   turnover       ← an explicit turned-over / handed-over statement
 * A stage that matches none of these renders as
 * "Recorded stage: <as printed>" instead of being forced onto the track.
 */
const TRACK_STEPS = ["Procurement", "Award", "Implementation", "Turnover"] as const;

function trackStep(stage: string): number | null {
  if (/turn(ed)?\s*over|handed over|handing over/i.test(stage)) return 3;
  if (/notice of award|awarded/i.test(stage)) return 1;
  if (/invitation to bid|bid notice|bids due|bid bulletin|itb\b/i.test(stage)) return 0;
  return null;
}

/*
 * Badge tone — honest color coding:
 *   green = the record's own stage states a source-stated turnover;
 *   gold  = an active procurement step (open bid, posted award) with no
 *           stated uncertainty attached;
 *   muted = outcome explicitly unverified/unavailable, or stage unmappable.
 */
type Tone = "gold" | "green" | "muted";

function badgeTone(data: ProjectData | NoticesData): Tone {
  const haystack = `${data.stage} ${("outcomeCheck" in data && data.outcomeCheck) || ""}`;
  if (/turn(ed)?\s*over|handed over|handing over/i.test(data.stage)) return "green";
  if (/unverified|unavailable|nothing later is evidenced/i.test(haystack)) return "muted";
  if (trackStep(data.stage) !== null) return "gold";
  return "muted";
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
  }).format(value);
}

function StageBadge({ stage, tone }: { stage: string; tone: Tone }) {
  return (
    <p className={`proj-badge proj-badge--${tone}`}>
      <i className="bi bi-flag" aria-hidden="true" />
      <span>{stage}</span>
    </p>
  );
}

function StageTrack({ stage }: { stage: string }) {
  const current = trackStep(stage);
  if (current === null) {
    return <p className="proj-track-unmapped">Recorded stage: {stage}</p>;
  }
  return (
    <ol className="proj-track" aria-label="Project stage track">
      {TRACK_STEPS.map((label, index) => (
        <li
          key={label}
          className={`proj-track-step${index <= current ? " done" : ""}${index === current ? " current" : ""}`}
        >
          <span className="proj-track-dot" aria-hidden="true" />
          <span className="proj-track-label">
            {label}
            {index === current ? " — recorded stage" : ""}
          </span>
        </li>
      ))}
    </ol>
  );
}

function AmountBlock({ data }: { data: ProjectData }) {
  if (typeof data.amount !== "number") {
    return (
      <div className="proj-amount">
        <span className="proj-amount-label">Amount</span>
        <span className="proj-amount-none">No amount stated in source</span>
      </div>
    );
  }
  return (
    <div className="proj-amount">
      <span className="proj-amount-label">{data.amountLabel ?? "Amount"}</span>
      <strong className="proj-amount-value">{formatMoney(data.amount)}</strong>
      {data.amountNote && <span className="proj-amount-note">{data.amountNote}</span>}
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="proj-chips">
      {items.map((chip) => (
        <li key={chip} className="proj-chip">{chip}</li>
      ))}
    </ul>
  );
}

export const metadata: Metadata = {
  title: "Projects & Infrastructure",
  description:
    "A glanceable board of reviewed, source-linked Maddela infrastructure project records — stages exactly as official sources state them.",
};

export default function ProjectsPage() {
  const lusod = getRecord<ProjectData>("nia-lusod-inip-close-conduit");
  const solarPumps = getRecord<ProjectData>("nia-solar-pump-14-unit-multi-site");
  const balligui = getRecord<ProjectData>("nia-balligui-spip");
  const carpic = getRecord<ProjectData>("dar-nia-carpic-cabaruan-cis");
  const provincialNotices = getRecord<NoticesData>("quirino-bac-maddela-notices-2025");

  const projectCards: { record: CivicRecord<ProjectData>; icon: string; blurb: string }[] = [
    {
      record: lusod,
      icon: "bi-droplet",
      blurb: `National irrigation project; the reviewed package is ${(lusod.data.componentPackage ?? "").toLowerCase()}.`,
    },
    {
      record: solarPumps,
      icon: "bi-sun",
      blurb: "Fourteen 15HP solar-powered pump systems with satellite-assisted monitoring across five municipalities; the per-unit Maddela sites are not stated.",
    },
    {
      record: balligui,
      icon: "bi-sun",
      blurb: "Solar pump system with pump sump and water tanks; stated potential service area 6 hectares for 9 farmer-beneficiaries.",
    },
    {
      record: carpic,
      icon: "bi-droplet",
      blurb: `Communal irrigation system turned over to the ${carpic.data.turnoverTo}.`,
    },
  ];

  return (
    <>
      {/* Wired here (not in src/app/layout.tsx) because layout.tsx is outside
          this task's owned-file set; same public/assets/css pattern as the rest
          of the site's stylesheets. */}
      <link rel="stylesheet" href="/assets/css/projects.css" />

      <PageHeader
        title="Projects & infrastructure"
        description="What is actually on record about public works in Maddela."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects & infrastructure" },
        ]}
      />

      <section className="proj-section">
        <div className="container">
          <p className="proj-intro">
            Every card is a reviewed civic record linked to its official source. A published
            award or contract is not evidence of delivery or completion. Not on this board yet:
            a comprehensive project archive — DPWH, SubayBAYAN and municipal works listings
            remain unpublished at their sources.
          </p>

          {projectCards.map(({ record, icon, blurb }, index) => {
            const data = record.data;
            const tone = badgeTone(data);
            const locations = data.locationConflict
              ? ["Balligui — municipality conflicted in sources (see limitations)"]
              : data.location
                ? data.location.split(";").map((part) => part.trim())
                : [];
            return (
              <Reveal key={record.id} delay={index * 0.08}>
                <article className="proj-card">
                  <div className="proj-card-head">
                    <span className="proj-category">
                      <i className={`bi ${icon}`} aria-hidden="true" />
                      <span>{data.category}</span>
                    </span>
                    <StageBadge stage={data.stage} tone={tone} />
                  </div>

                  <h2 className="proj-name">{data.projectName}</h2>
                  <p className="proj-blurb">{blurb}</p>

                  <div className="proj-card-body">
                    <AmountBlock data={data} />
                    <div className="proj-facts">
                      {locations.length > 0 && <Chips items={locations} />}
                      <p className="proj-agency">
                        <i className="bi bi-building" aria-hidden="true" />
                        <span>{data.implementingAgency}</span>
                      </p>
                      {(data.referenceCodes || data.referenceCode) && (
                        <p className="proj-meta-line">
                          Reference: {data.referenceCodes ?? data.referenceCode}
                        </p>
                      )}
                      {data.fundSource && (
                        <p className="proj-meta-line">Fund source: {data.fundSource}</p>
                      )}
                      {data.contractor && (
                        <p className="proj-meta-line">Contractor: {data.contractor}</p>
                      )}
                      {data.schedule && (
                        <p className="proj-meta-line">Schedule as stated: {data.schedule}</p>
                      )}
                    </div>
                  </div>

                  <div className="proj-track-wrap">
                    <StageTrack stage={data.stage} />
                    {data.contextNotes && <p className="proj-context">{data.contextNotes}</p>}
                    {data.outcomeCheck && (
                      <p className="proj-context proj-context--muted">{data.outcomeCheck}</p>
                    )}
                  </div>

                  <details className="proj-details">
                    <summary>Limitations and record detail</summary>
                    <p>{data.limitations}</p>
                    {data.serviceArea && <p>Service area as stated: {data.serviceArea}</p>}
                  </details>

                  <div className="proj-footer">
                    <RecordMeta record={record} />
                    <a
                      className="infra-link"
                      href={data.canonicalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-arrow-up-right" aria-hidden="true" />
                      <span>View source</span>
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}

          <Reveal delay={projectCards.length * 0.08}>
            <article className="proj-card">
              <div className="proj-card-head">
                <span className="proj-category">
                  <i className="bi bi-cone-striped" aria-hidden="true" />
                  <span>Provincial roads, water and building works</span>
                </span>
                <StageBadge
                  stage={provincialNotices.data.stage}
                  tone={badgeTone(provincialNotices.data)}
                />
              </div>

              <h2 className="proj-name">
                Six provincially advertised bid notices naming Maddela barangays
              </h2>
              <p className="proj-blurb">{provincialNotices.data.summary}</p>

              <Chips
                items={provincialNotices.data.items.map(
                  (item) => `${item.location.replace(", Maddela", "")} · posted ${item.postedAt}`,
                )}
              />

              <div className="proj-track-wrap">
                <StageTrack stage={provincialNotices.data.stage} />
                <p className="proj-context proj-context--muted">
                  {provincialNotices.data.limitations}
                </p>
              </div>

              <div className="proj-footer">
                <RecordMeta record={provincialNotices} />
                <a
                  className="infra-link"
                  href={provincialNotices.data.canonicalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-arrow-up-right" aria-hidden="true" />
                  <span>View source listing</span>
                </a>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
