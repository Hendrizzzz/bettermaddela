import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { RecordMeta } from "@/components/RecordMeta";
import { getRecord, records, type CivicRecord } from "@/data/civic";

interface ProcurementData {
  items: {
    id: string;
    title: string;
    procuringEntity: string;
    referenceNumber: string;
    amountLabel: string;
    amount: number;
    currency: string;
    quantity?: string;
    publishedAt: string;
    closingDate?: string;
    stage: string;
    stageAsOf: string;
    canonicalUrl: string;
    limitations: string;
  }[];
  limitations: string;
}

const procurementRecord = getRecord<ProcurementData>("maddela-procurement-register");

export const metadata: Metadata = {
  title: "Budget and Financial Transparency",
  description: "Source-linked Maddela financial-disclosure documents and a non-exhaustive reviewed procurement register.",
};

const disclosureRecords = records
  .filter((record): record is CivicRecord<Record<string, unknown>> => record.type === "transparency-document")
  .sort((a, b) => a.label.localeCompare(b.label));

const MONEY_KEY =
  /(amount|cost|balance|receipt|expenditure|income|allotment|appropriation|resources|assets|amortization|paid|released|undrawn|arrears|interest|principal|outlay|fund)/i;
const SKIP_KEYS = new Set(["limitations", "currencyUnit"]);

function humanizeKey(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\bLgu\b/, "LGU")
    .replace(/\bNdsc Bc\b/, "NDSC/BC")
    .replace(/\bLdrrmf\b/, "LDRRMF")
    .replace(/\bFdpp\b/g, "FDPP")
    .replace(/\bBlgf\b/, "BLGF")
    .replace(/\bMctc\b/, "MCTC")
    .replace(/\bSre\b/, "SRE")
    .trim();
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
  }).format(value);
}

function DataValue({ value }: { value: unknown }) {
  if (typeof value === "string") return <>{value}</>;
  if (typeof value === "number") return <>{formatMoney(value)}</>;
  if (Array.isArray(value)) {
    if (value.every((item) => typeof item === "object" && item !== null && "name" in item && "role" in item)) {
      return <>{value.map((item) => `${item.name} (${item.role})`).join("; ")}</>;
    }
    return (
      <ul className="disclosure-list">
        {value.map((item, index) => (
          <li key={index}>
            {"office" in item && "headOfOffice" in item && "amount" in item
              ? <>{item.office} — {item.headOfOffice}: <strong>{formatMoney(item.amount)}</strong></>
              : null}
            {"project" in item && "estimatedCost" in item
              ? <>{item.project}: <strong>{formatMoney(item.estimatedCost)}</strong></>
              : null}
          </li>
        ))}
      </ul>
    );
  }
  return <>{String(value)}</>;
}

function DisclosureEntry({ record }: { record: CivicRecord<Record<string, unknown>> }) {
  const periodLine = [
    record.data.postingPeriod,
    record.data.reportingPeriod,
    record.data.asOfDatePrinted,
  ].filter((value): value is string => typeof value === "string");

  return (
    <article className="infra-project-v5" id={`disclosure-${record.id}`}>
      <div className="infra-project-main">
        <div className="infra-project-tags">
          {periodLine.map((period) => (
            <span className="infra-tag-category" key={period}><i className="bi bi-calendar3" aria-hidden="true" /><span>{period}</span></span>
          ))}
        </div>
        <h3>{record.label}</h3>
      </div>
      <div className="infra-project-details">
        <dl className="disclosure-details">
          {Object.entries(record.data)
            .filter(([key]) => !SKIP_KEYS.has(key))
            .map(([key, value]) => (
              <div className="infra-detail-row" key={key}>
                <dt className="infra-detail-label">{humanizeKey(key)}</dt>
                <dd className="infra-detail-value"><DataValue value={value} /></dd>
              </div>
            ))}
        </dl>
        {"limitations" in record.data && typeof record.data.limitations === "string" && (
          <p className="table-note">{record.data.limitations}</p>
        )}
      </div>
      <RecordMeta record={record} />
    </article>
  );
}

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function BudgetPage() {
  return (
    <>
      <PageHeader
        title="Budget & Financial Transparency"
        description="Source-linked procurement records are shown by document and stage; unlike amounts are never combined."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Budget & Transparency" }]}
      />

      <section className="sre-section-v2">
        <div className="container">
          <div className="sre-header-v2">
            <div className="sre-title-group">
              <h2>Municipal budget documents</h2>
              <p>LGU-prepared financial disclosures from the DILG Full Disclosure Policy Portal are published record by record.</p>
            </div>
          </div>
          <div className="coverage-panel">
            <div><h2>What is still not shown</h2></div>
            <p>The signed appropriations ordinance and its enactment details remain unavailable, so no figure on this page is presented as the enacted annual budget. The FY 2025 and FY 2026 Annual Budget Report files are broken at the source portal (server error) and stay unpublished. Proposed-budget-year columns and plan-stage estimates are labeled as such; unlike documents (appropriations, actuals, procurement plans, loan balances) are never combined into a single total. All figures are unaudited, LGU-prepared disclosures.</p>
          </div>
        </div>
      </section>

      {disclosureRecords.length > 0 && (
        <section className="infra-section-v5" aria-labelledby="disclosure-heading">
          <div className="container">
            <div className="infra-header-v5">
              <h2 id="disclosure-heading">Reviewed FDPP disclosures</h2>
              <p>Record-level entries from the DILG Full Disclosure Policy Portal. Amounts keep full printed precision; every entry links to its evidence on the sources page.</p>
            </div>

            {disclosureRecords.map((record) => (
              <DisclosureEntry key={record.id} record={record} />
            ))}
          </div>
        </section>
      )}

      <section className="infra-section-v5">
        <div className="container">
          <div className="infra-header-v5">
            <h2>Reviewed procurement register</h2>
            <p>Non-exhaustive, record-level entries. A published award or contract does not establish delivery or project completion.</p>
          </div>

          {procurementRecord.data.items.map((item) => (
            <article className="infra-project-v5" key={item.id}>
              <div className="infra-project-main">
                <div className="infra-project-tags">
                  <span className="infra-tag-year">{item.publishedAt.slice(0, 4)}</span>
                  <span className="infra-tag-category"><i className="bi bi-file-earmark-check" aria-hidden="true" /><span>{item.stage}</span></span>
                </div>
                <h3>{item.title}</h3>
                <p className="infra-location"><i className="bi bi-building" aria-hidden="true" /><span>{item.procuringEntity}</span></p>
              </div>
              <div className="infra-project-details">
                <div className="infra-detail-row">
                  <div className="infra-detail-col"><span className="infra-detail-label">Reference</span><span className="infra-detail-value">{item.referenceNumber}</span></div>
                  <div className="infra-detail-col"><span className="infra-detail-label">Published</span><span className="infra-detail-value"><time dateTime={item.publishedAt}>{item.publishedAt}</time></span></div>
                  <div className="infra-detail-col infra-detail-cost"><span className="infra-detail-label">{item.amountLabel}</span><span className="infra-detail-value">{formatAmount(item.amount, item.currency)}</span></div>
                </div>
                {(item.quantity || item.closingDate) && (
                  <div className="infra-detail-row">
                    {item.quantity && <div className="infra-detail-col"><span className="infra-detail-label">Quantity</span><span className="infra-detail-value">{item.quantity}</span></div>}
                    {item.closingDate && <div className="infra-detail-col"><span className="infra-detail-label">Closing date</span><span className="infra-detail-value"><time dateTime={item.closingDate}>{item.closingDate}</time></span></div>}
                    <div className="infra-detail-col"><span className="infra-detail-label">Stage as of</span><span className="infra-detail-value"><time dateTime={item.stageAsOf}>{item.stageAsOf}</time></span></div>
                  </div>
                )}
                <p className="table-note">{item.limitations}</p>
              </div>
              <div className="infra-project-footer">
                <span className="infra-source"><i className="bi bi-info-circle" aria-hidden="true" /><span>Record-level source</span></span>
                <a className="infra-link" href={item.canonicalUrl} target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-arrow-up-right" aria-hidden="true" /><span>View source</span>
                </a>
              </div>
            </article>
          ))}
          <RecordMeta record={procurementRecord} />
          <p className="table-note">{procurementRecord.data.limitations}</p>
        </div>
      </section>
    </>
  );
}
