import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Resolution Archive",
  description:
    "Why Maddela's municipal resolution archive stays unpublished until complete official documents pass review.",
};

export default function ResolutionFrameworkPage() {
  return (
    <>
      <PageHeader
        title="Resolution Archive"
        description="Complete official documents are required before a municipal resolution can appear here."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Legislative", href: "/legislative" }, { label: "Resolutions" }]}
      />
      <section className="section">
        <div className="container">
          <div className="leg-table-card">
            <div className="leg-table-header"><div className="leg-table-title"><i className="bi bi-file-earmark-ruled-fill" aria-hidden="true" /><h2>Municipal resolutions</h2></div></div>
            <div className="leg-empty"><i className="bi bi-inbox" aria-hidden="true" /><h3>Local archive unavailable</h3><p>Signed or complete official Maddela resolution documents have not yet passed review.</p></div>
          </div>
          <div className="leg-info-card leg-info-card-wide">
            <div className="leg-info-card-content"><h3>Publication standard</h3><p>An entry requires the complete official document, exact number and title, adoption date, source link, and review of its status. A title or announcement alone is not enough.</p><div className="leg-info-actions"><Link href="/legislative" className="btn btn-secondary"><i className="bi bi-arrow-left" aria-hidden="true" /> Back to Legislative</Link></div></div>
          </div>
        </div>
      </section>
    </>
  );
}
