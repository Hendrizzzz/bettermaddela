import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Ordinance Archive",
  description: "Publication status for Maddela's municipal ordinance archive.",
};

export default function OrdinanceFrameworkPage() {
  return (
    <>
      <PageHeader
        title="Ordinance Archive"
        description="Complete official documents are required before a municipal ordinance can appear here."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Legislative", href: "/legislative" }, { label: "Ordinances" }]}
      />
      <section className="section">
        <div className="container">
          <div className="leg-table-card">
            <div className="leg-table-header"><div className="leg-table-title"><i className="bi bi-journal-bookmark-fill" aria-hidden="true" /><h2>Municipal ordinances</h2></div></div>
            <div className="leg-empty"><i className="bi bi-inbox" aria-hidden="true" /><h3>Local archive unavailable</h3><p>Signed or complete official Maddela ordinance documents have not yet passed review.</p></div>
          </div>
          <div className="leg-info-card leg-info-card-wide">
            <div className="leg-info-card-icon"><i className="bi bi-info-circle-fill" aria-hidden="true" /></div>
            <div className="leg-info-card-content"><h3>Publication standard</h3><p>An entry requires the complete official document, exact number and title, approval date, source link, and review of its status. A title or announcement alone is not enough.</p><div className="leg-info-actions"><Link href="/legislative" className="btn btn-secondary"><i className="bi bi-arrow-left" aria-hidden="true" /> Back to Legislative</Link></div></div>
          </div>
        </div>
      </section>
    </>
  );
}
