import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers about BetterMaddela, its independent status, and its civic-information coverage.",
};

export default function FAQPage() {
  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />
      <section className="section">
        <div className="container">
          <div className="faq-container">
            <div className="faq-category">
              <div className="faq-category-header"><h2>About BetterMaddela</h2></div>
              <div className="faq-list">
                <details className="faq-accordion"><summary>Is BetterMaddela an official government website?</summary><div className="faq-answer"><p>No. It is an independent, volunteer-maintained civic-information project and is not owned, operated, endorsed, or approved by the Municipal Government of Maddela.</p></div></details>
                <details className="faq-accordion"><summary>Why are some sections unavailable?</summary><div className="faq-answer"><p>Changing civic facts are published only after their evidence passes the project&apos;s source, verification, freshness, and risk checks. Missing or conflicting information stays unavailable.</p></div></details>
                <details className="faq-accordion"><summary>Where can I check the evidence?</summary><div className="faq-answer"><p>Published records link to their evidence and review details on the <Link href="/sources">Sources page</Link>.</p></div></details>
                <details className="faq-accordion"><summary>Why are there no official portraits?</summary><div className="faq-answer"><p>Public visibility does not establish permission to reuse a photograph. BetterMaddela uses text and neutral icons until an image has a documented reuse basis.</p></div></details>
              </div>
            </div>
            <div className="faq-category">
              <div className="faq-category-header"><h2>Using the site</h2></div>
              <div className="faq-list">
                <details className="faq-accordion"><summary>Can I apply for a permit or make a payment here?</summary><div className="faq-answer"><p>No. BetterMaddela is an information layer and does not process government transactions, payments, appointments, or complaints.</p></div></details>
                <details className="faq-accordion"><summary>What should I do with time-sensitive information?</summary><div className="faq-answer"><p>Check the record&apos;s verification date and confirm time-sensitive information with the responsible government office before relying on it.</p></div></details>
                <details className="faq-accordion"><summary>Why are emergency numbers not listed?</summary><div className="faq-answer"><p>Emergency and health contacts require direct, recent confirmation and an authorized low-impact test before publication. No number is shown until that safety gate passes. In an emergency, use an established emergency channel available to you.</p></div></details>
                <details className="faq-accordion"><summary>How do I report an error?</summary><div className="faq-answer"><p>Open a public issue through the <Link href="/contact">Contact &amp; Corrections page</Link>. Do not include private records, credentials, health information, or emergency requests.</p></div></details>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
