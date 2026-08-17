import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { getSource } from "@/data/civic";

const psaSource = getSource("psa-psgc-maddela");
const postalSource = getSource("phlpost-zip-code-locator");

export const metadata: Metadata = {
  title: "Contact and Corrections",
  description: "Official source links and the BetterMaddela public correction route.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact & Corrections"
        description="BetterMaddela is an independent information project. Use official agency pages for government information and the project repository for corrections."
        badge={{ icon: "bi bi-envelope-fill", label: "Contact" }}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="section">
        <div className="container">
          <div className="hotlines-header">
            <div className="hotlines-title">
              <span className="hotlines-badge hotlines-badge--social"><i className="bi bi-link-45deg" aria-hidden="true" /><span>Public links</span></span>
              <h2>Official data and project channels</h2>
            </div>
            <p>No municipal, emergency, health, utility, office, or personal phone number is published here.</p>
          </div>
          <div className="grid grid-2" style={{ gap: "var(--spacing-md)" }}>
            <a href={psaSource.url} target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-card-icon"><i className="bi bi-bar-chart-fill" aria-hidden="true" /></div>
              <div className="contact-card-content">
                <h3>National statistics record</h3>
                <p className="contact-card-value">Maddela statistics and administrative profile</p>
                <span className="contact-card-note">{psaSource.publisher} <i className="bi bi-box-arrow-up-right" aria-hidden="true" /></span>
              </div>
            </a>
            <a href={postalSource.url} target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-card-icon"><i className="bi bi-mailbox" aria-hidden="true" /></div>
              <div className="contact-card-content">
                <h3>PHLPost ZIP Code Locator</h3>
                <p className="contact-card-value">Official postal lookup</p>
                <span className="contact-card-note">{postalSource.publisher} <i className="bi bi-box-arrow-up-right" aria-hidden="true" /></span>
              </div>
            </a>
            <Link href="/sources" className="contact-card">
              <div className="contact-card-icon"><i className="bi bi-journal-check" aria-hidden="true" /></div>
              <div className="contact-card-content">
                <h3>Sources and verification</h3>
                <p className="contact-card-value">Review every published record</p>
                <span className="contact-card-note">Evidence, dates, and limitations</span>
              </div>
            </Link>
            <a href="https://github.com/Hendrizzzz/bettermaddela/issues" target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-card-icon"><i className="bi bi-github" aria-hidden="true" /></div>
              <div className="contact-card-content">
                <h3>Report a correction</h3>
                <p className="contact-card-value">Open a public GitHub issue</p>
                <span className="contact-card-note">Do not submit private records or emergency requests <i className="bi bi-box-arrow-up-right" aria-hidden="true" /></span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-alt">
        <div className="container">
          <div className="coverage-panel">
            <div><p className="section-kicker">Directory status</p><h2>Municipal contact directory not published</h2></div>
            <p>A current official municipal office directory and public office schedule could not be independently verified. BetterMaddela is not a transaction, complaint, appointment, or emergency channel.</p>
          </div>
        </div>
      </section>
    </>
  );
}
