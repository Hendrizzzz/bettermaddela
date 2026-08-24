import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Guidelines for using the independent BetterMaddela civic-information site.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms of Use"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]}
      />
      <section className="legal-content">
        <div className="container">
          <div className="legal-wrapper">
            <aside className="legal-toc">
              <h2><span>Contents</span></h2>
              <nav aria-label="Terms sections"><a href="#introduction">Introduction</a><a href="#information">Civic information</a><a href="#no-transactions">No transactions</a><a href="#external-links">External links</a><a href="#availability">Availability</a></nav>
            </aside>
            <article className="legal-article">
              <section id="introduction" className="legal-section"><h2>Introduction</h2><div className="legal-highlight"><i className="bi bi-heart-fill" aria-hidden="true" /><p>BetterMaddela is an independent, volunteer-maintained civic-information project. It is not an official government website and does not imply government endorsement.</p></div></section>
              <section id="information" className="legal-section"><h2>Civic Information</h2><p>Published information is provided for general public reference. Sources and review dates are supplied where applicable, but time-sensitive details should still be confirmed with the responsible government office.</p></section>
              <section id="no-transactions" className="legal-section"><h2>No Government Transactions</h2><p>The site does not accept payments, applications, appointments, complaints, or sensitive resident information.</p><div className="legal-note"><i className="bi bi-info-circle" aria-hidden="true" /><p>BetterMaddela is an information layer, not a government transaction channel.</p></div></section>
              <section id="external-links" className="legal-section"><h2>External References</h2><p>Links to third-party and government sources are provided for evidence and convenience. Their availability, content, and privacy practices are controlled by their respective publishers.</p></section>
              <section id="availability" className="legal-section"><h2>Website Availability</h2><p>The project may correct, remove, or withhold records when evidence changes, a review date passes, or a source becomes unavailable.</p></section>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
