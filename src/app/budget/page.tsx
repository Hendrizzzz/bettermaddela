import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { RecordMeta } from "@/components/RecordMeta";
import { getRecord } from "@/data/civic";

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
  description: "A non-exhaustive register of reviewed Maddela procurement records and the municipal-budget publication boundary.",
};

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
        badge={{ icon: "bi bi-shield-check", label: "Financial Transparency" }}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Budget & Transparency" }]}
      />

      <section className="sre-section-v2">
        <div className="container">
          <div className="sre-header-v2">
            <div className="sre-title-group">
              <span className="sre-label"><i className="bi bi-graph-up-arrow" aria-hidden="true" /> Municipal finance</span>
              <h2>Municipal budget documents</h2>
              <p>A current, inspectable annual budget and complete financial-disclosure set were not recovered.</p>
            </div>
          </div>
          <div className="coverage-panel">
            <div><p className="section-kicker">Publication boundary</p><h2>No municipal budget total is shown</h2></div>
            <p>BetterMaddela does not substitute a national allotment, procurement ceiling, contract value, or province-administered project amount for Maddela&apos;s enacted annual budget.</p>
          </div>
        </div>
      </section>

      <section className="infra-section-v5">
        <div className="container">
          <div className="infra-header-v5">
            <span className="infra-label-v5"><i className="bi bi-file-earmark-check-fill" aria-hidden="true" /> Procurement</span>
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
