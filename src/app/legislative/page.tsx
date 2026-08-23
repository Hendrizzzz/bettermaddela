import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Legislative",
  description: "Maddela's local legislative archive status and source-reviewed national legal history.",
};

export default function LegislativePage() {
  return (
    <>
      <PageHeader
        title="Legislative"
        description="Local archive publication areas and the national legal instruments documented in Maddela's history."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Legislative" }]}
      />

      <section className="leg-categories">
        <div className="container">
          <div className="leg-categories-grid">
            <Link href="/legislative/ordinance-framework" className="leg-category-card">
              <div className="leg-category-icon"><i className="bi bi-journal-bookmark-fill" aria-hidden="true" /></div>
              <div className="leg-category-content"><h2>Ordinances</h2><p>Check the publication status of Maddela&apos;s municipal-ordinance archive.</p><span className="leg-category-link"><i className="bi bi-arrow-right" aria-hidden="true" /> View ordinance archive</span></div>
            </Link>
            <Link href="/legislative/resolution-framework" className="leg-category-card">
              <div className="leg-category-icon"><i className="bi bi-file-earmark-ruled-fill" aria-hidden="true" /></div>
              <div className="leg-category-content"><h2>Resolutions</h2><p>Check the publication status of Maddela&apos;s municipal-resolution archive.</p><span className="leg-category-link">View resolution archive <i className="bi bi-arrow-right" aria-hidden="true" /></span></div>
            </Link>
          </div>
        </div>
      </section>

      <section className="leg-info">
        <div className="container">
          <div className="leg-info-content">
            <div className="leg-info-header">
              <span className="leg-info-tag"><i className="bi bi-book-fill" aria-hidden="true" /> Legal history</span>
              <h2>National laws that shaped Maddela</h2>
              <p>Read the source-reviewed national legal instruments separately from unavailable local ordinances and resolutions.</p>
            </div>
            <div className="leg-info-cards">
              <Link href="/legal-history" className="leg-info-card">
                <div className="leg-info-card-icon"><i className="bi bi-clock-history" aria-hidden="true" /></div>
                <h3>Historical and legal timeline</h3>
                <p>Executive orders and national laws are presented with their dates, exact scope, and source links.</p>
              </Link>
              <div className="leg-info-card">
                <div className="leg-info-card-icon"><i className="bi bi-inbox" aria-hidden="true" /></div>
                <h3>Local archive unavailable</h3>
                <p>Complete official Maddela ordinance and resolution documents have not passed publication review. No number, title, summary, or legal status is inferred.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
