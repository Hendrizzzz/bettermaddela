import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { RecordMeta } from "@/components/RecordMeta";
import { BoardMotion } from "@/components/projects/BoardMotion";
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
 * Spine tone — honest color coding, carried by the stage-track text as well
 * (color never carries meaning alone):
 *   green = the record's own stage states a source-stated turnover;
 *   gold  = an active procurement/award step with no stated uncertainty;
 *   muted = outcome explicitly unverified/unavailable, or stage unmappable.
 */
type Tone = "gold" | "green" | "muted";

function cardTone(data: ProjectData | NoticesData): Tone {
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

function StageTrack({ stage }: { stage: string }) {
  const current = trackStep(stage);
  if (current === null) {
    return <p className="proj-track-unmapped">Recorded stage: {stage}</p>;
  }
  const final = current === TRACK_STEPS.length - 1;
  return (
    <ol
      className={`proj-track${final ? " proj-track--final" : ""}`}
      aria-label="Project stage track"
    >
      {TRACK_STEPS.map((label, index) => {
        const done = index <= current;
        const isCurrent = index === current;
        return (
          <li
            key={label}
            className={`proj-track-step${done ? " done" : ""}${isCurrent ? " current" : ""}`}
            aria-current={isCurrent ? "step" : undefined}
          >
            {index > 0 && (
              <span className="proj-track-line" aria-hidden="true">
                {done && <span className="proj-track-line-fill" />}
              </span>
            )}
            <span className="proj-track-dot" aria-hidden="true" />
            <span className="proj-track-label">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

function AmountBlock({ data }: { data: ProjectData }) {
  if (typeof data.amount !== "number") {
    return (
      <div className="proj-amount">
        <span className="proj-amount-label">Amount</span>
        <span className="proj-amount-none">Amount not published</span>
      </div>
    );
  }
  return (
    <div className="proj-amount">
      <span className="proj-amount-label">{data.amountLabel ?? "Amount"}</span>
      <strong
        className="proj-amount-value"
        data-count={String(data.amount)}
        data-count-format="peso"
      >
        {formatMoney(data.amount)}
      </strong>
    </div>
  );
}

function DetailBody({ data }: { data: ProjectData }) {
  return (
    <div className="proj-detail-body">
      <p>
        <strong>Recorded stage:</strong> {data.stage} (as of {data.stageAsOf})
      </p>
      {(data.referenceCodes || data.referenceCode) && (
        <p>
          <strong>Reference:</strong> {data.referenceCodes ?? data.referenceCode}
        </p>
      )}
      {data.location && (
        <p>
          <strong>Location as stated:</strong> {data.location}
        </p>
      )}
      {data.fundSource && (
        <p>
          <strong>Fund source:</strong> {data.fundSource}
        </p>
      )}
      {data.contractor && (
        <p>
          <strong>Contractor:</strong> {data.contractor}
        </p>
      )}
      {data.schedule && (
        <p>
          <strong>Schedule as stated:</strong> {data.schedule}
        </p>
      )}
      {data.turnoverTo && (
        <p>
          <strong>Turned over to:</strong> {data.turnoverTo}
        </p>
      )}
      {data.componentPackage && (
        <p>
          <strong>Package:</strong> {data.componentPackage}
        </p>
      )}
      {data.serviceArea && (
        <p>
          <strong>Service area as stated:</strong> {data.serviceArea}
        </p>
      )}
      {data.amountNote && (
        <p>
          <strong>About the amount:</strong> {data.amountNote}
        </p>
      )}
      {data.contextNotes && (
        <p>
          <strong>Context:</strong> {data.contextNotes}
        </p>
      )}
      {data.outcomeCheck && (
        <p>
          <strong>Outcome check:</strong> {data.outcomeCheck}
        </p>
      )}
      <p>
        <strong>Limitations:</strong> {data.limitations}
      </p>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Projects & Infrastructure",
  description:
        "A glanceable board of reviewed, source-linked Maddela infrastructure project records, staged exactly as official sources state them.",
};

export default function ProjectsPage() {
  const lusod = getRecord<ProjectData>("nia-lusod-inip-close-conduit");
  const solarPumps = getRecord<ProjectData>("nia-solar-pump-14-unit-multi-site");
  const balligui = getRecord<ProjectData>("nia-balligui-spip");
  const carpic = getRecord<ProjectData>("dar-nia-carpic-cabaruan-cis");
  const provincialNotices = getRecord<NoticesData>("quirino-bac-maddela-notices-2025");

  const projectCards: { record: CivicRecord<ProjectData> }[] = [
    { record: lusod },
    { record: solarPumps },
    { record: balligui },
    { record: carpic },
  ];

  /* Header counts — COUNTS ONLY. Unlike amounts are never summed. */
  const allData: (ProjectData | NoticesData)[] = [
    ...projectCards.map(({ record }) => record.data),
    provincialNotices.data,
  ];
  const trackedCount = allData.length;
  const amountsCount = allData.filter(
    (d) => "amount" in d && typeof d.amount === "number",
  ).length;
  const turnoverCount = allData.filter((d) =>
    /turn(ed)?\s*over|handed over/i.test(d.stage),
  ).length;

  return (
    <>
      {/* Wired here (not in src/app/layout.tsx) because layout.tsx is outside
          this task's owned-file set; same public/assets/css pattern as the rest
          of the site's stylesheets. */}
      <link rel="stylesheet" href="/assets/css/projects.css" />

      <PageHeader
        title="Projects"
        description="Reviewed civic records: the public works actually on file for Maddela."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects & infrastructure" },
        ]}
      />

      <section className="proj-section">
        <div className="container">
          <BoardMotion>
            <div className="proj-stats" data-reveal>
              <div className="proj-stat">
                <span className="proj-stat-num" data-count={String(trackedCount)}>
                  {trackedCount}
                </span>
                <span className="proj-stat-label">records tracked</span>
              </div>
              <div className="proj-stat">
                <span className="proj-stat-num" data-count={String(amountsCount)}>
                  {amountsCount}
                </span>
                <span className="proj-stat-label">with published amounts</span>
              </div>
              <div className="proj-stat">
                <span className="proj-stat-num" data-count={String(turnoverCount)}>
                  {turnoverCount}
                </span>
                <span className="proj-stat-label">turned over, per source</span>
              </div>
            </div>

            <p className="proj-honesty" data-reveal>
              A published award or contract is not evidence of delivery or completion.
            </p>

            {projectCards.map(({ record }) => {
              const data = record.data;
              const tone = cardTone(data);
              const locationLine = data.locationConflict
                ? "Municipality conflicted across sources; see record detail"
                : data.location;
              const metaLine = [data.category, locationLine, data.implementingAgency]
                .filter(Boolean)
                .join(", ");
              return (
                <article
                  key={record.id}
                  className={`proj-card proj-card--${tone}`}
                  data-reveal
                >
                  <div className="proj-card-top">
                    <div className="proj-card-id">
                      <h2 className="proj-name">{data.projectName}</h2>
                      {metaLine && <p className="proj-metaline">{metaLine}</p>}
                    </div>
                    <AmountBlock data={data} />
                  </div>

                  <div className="proj-track-wrap">
                    <StageTrack stage={data.stage} />
                  </div>

                  <details className="proj-details">
                    <summary>Record detail &amp; limitations</summary>
                    <DetailBody data={data} />
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
              );
            })}

            <article className="proj-card proj-card--muted" data-reveal>
              <div className="proj-card-top">
                <div className="proj-card-id">
                  <h2 className="proj-name">
                    Six provincially advertised bid notices naming Maddela barangays
                  </h2>
                  <p className="proj-metaline">
                    Provincial bids board, roads, water, buildings,{" "}
                    {provincialNotices.data.items.length} bid notices posted 2025
                  </p>
                </div>
                <div className="proj-amount">
                  <span className="proj-amount-label">Amount</span>
                  <span className="proj-amount-none">Amount not published</span>
                </div>
              </div>

              <div className="proj-track-wrap">
                <StageTrack stage={provincialNotices.data.stage} />
              </div>

              <details className="proj-details">
                <summary>Record detail &amp; limitations</summary>
                <div className="proj-detail-body">
                  <p>{provincialNotices.data.summary}</p>
                  <ul className="proj-item-list">
                    {provincialNotices.data.items.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}</strong>, posted {item.postedAt}
                      </li>
                    ))}
                  </ul>
                  <p>
                    <strong>Limitations:</strong> {provincialNotices.data.limitations}
                  </p>
                </div>
              </details>

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

            <p className="proj-unpublished" data-reveal>
              Not yet tracked here: DPWH, SubayBAYAN and municipal works listings,
              unpublished at their sources.
            </p>
          </BoardMotion>
        </div>
      </section>
    </>
  );
}
