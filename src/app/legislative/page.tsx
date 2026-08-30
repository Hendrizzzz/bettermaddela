import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Legislative",
  description: "Source-reviewed national legal history that shaped Maddela, and the honest status of the local ordinance and resolution archive.",
};

export default function LegislativePage() {
  return (
    <>
      <PageHeader
        title="Legislative"
        description="National legal instruments documented in Maddela's history, and the status of Maddela's local legislative archive."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Legislative" }]}
      />

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
                <h3>Historical and legal timeline</h3>
                <p>Executive orders and national laws are presented with their dates, exact scope, and source links.</p>
              </Link>
              <div className="leg-info-card">
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
