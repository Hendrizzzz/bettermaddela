import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { getSource } from "@/data/civic";

const psaSource = getSource("psa-psgc-maddela");
const postalSource = getSource("phlpost-zip-code-locator");

export const metadata: Metadata = {
  title: "Contact and Corrections",
  description:
    "Official source links, project channels, and the public correction route - no municipal or emergency phone numbers are published here.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact & Corrections"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="section">
        <div className="container">
          <div className="hotlines-header">
            <div className="hotlines-title">
              <h2>Official data and project channels</h2>
            </div>
            <p>No municipal, emergency, health, utility, office, or personal phone number is published here.</p>
          </div>
          <div className="grid grid-2" style={{ gap: "var(--spacing-md)" }}>
            <a href={psaSource.url} target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-card-content">
                <h3>National statistics record</h3>
                <span className="contact-card-note">{psaSource.publisher} <i className="bi bi-box-arrow-up-right" aria-hidden="true" /></span>
              </div>
            </a>
            <a href={postalSource.url} target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-card-content">
                <h3>PHLPost ZIP Code Locator</h3>
                <span className="contact-card-note">{postalSource.publisher} <i className="bi bi-box-arrow-up-right" aria-hidden="true" /></span>
              </div>
            </a>
            <Link href="/sources" className="contact-card">
              <div className="contact-card-content">
                <h3>Sources and verification</h3>
                <span className="contact-card-note">Evidence, dates, and limitations</span>
              </div>
            </Link>
            <a href="https://github.com/Hendrizzzz/bettermaddela/issues" target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-card-content">
                <h3>Report a correction</h3>
                <span className="contact-card-note">Do not submit private records or emergency requests <i className="bi bi-box-arrow-up-right" aria-hidden="true" /></span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-alt">
        <div className="container">
          <div className="coverage-panel">
            <h2>Municipal contact directory not published</h2>
            <p>A current official municipal office directory and public office schedule could not be independently verified. BetterMaddela is not a transaction, complaint, appointment, or emergency channel.</p>
          </div>
        </div>
      </section>
    </>
  );
}
