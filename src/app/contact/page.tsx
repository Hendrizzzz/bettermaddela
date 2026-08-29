import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { RecordMeta } from "@/components/RecordMeta";
import { getRecord, getSource } from "@/data/civic";

const psaSource = getSource("psa-psgc-maddela");
const postalSource = getSource("phlpost-zip-code-locator");

interface OfficeContactsData {
  scope: string;
  publishedBy: string;
  archivedOn: string;
  offices: { office: string; details: string }[];
  limitations: string;
}

interface EmergencyHotlinesData {
  scope: string;
  retrievedOn: string;
  entries: { service: string; details: string; basis: string }[];
  limitations: string;
}

interface ProvincialContactsData {
  scope: string;
  retrievedOn: string;
  entries: { office: string; details: string }[];
  limitations: string;
}

interface NationalContactsData {
  scope: string;
  retrievedOn: string;
  entries: { office: string; details: string; address?: string }[];
  limitations: string;
}

export const metadata: Metadata = {
  title: "Contact and Corrections",
  description:
    "Published contact directory for Maddela offices, emergency and safety lines, provincial and national agencies - with source vintages and one clear disclaimer.",
};

function DirectoryCard({
  heading,
  value,
  note,
}: {
  heading: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="contact-card">
      <div className="contact-card-content">
        <h3>{heading}</h3>
        <span className="contact-card-value">{value}</span>
        {note && <span className="contact-card-note">{note}</span>}
      </div>
    </div>
  );
}

export default function ContactPage() {
  const municipal = getRecord<OfficeContactsData>("maddela-lgu-office-contacts-2023");
  const hotlines = getRecord<EmergencyHotlinesData>("national-emergency-hotlines-2026");
  const provincial = getRecord<ProvincialContactsData>("quirino-provincial-contacts-2026");
  const national = getRecord<NationalContactsData>("national-agency-contacts-2026");

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
              <h2>Contact directory</h2>
            </div>
            <p>
              One disclaimer covers everything on this page: municipal directory lines are
              reproduced from an April 2023 archive capture of the municipal government&apos;s own
              website, which is currently unreachable; provincial and national agency entries come
              from live official pages retrieved August 28, 2026. Only the national 911 and 143
              hotlines are listed as emergency numbers — Maddela-specific emergency lines are
              pending direct confirmation and are published nowhere on this site. BetterMaddela is
              an independent information project, not an emergency or transaction channel — in an
              emergency, call 911.
            </p>
          </div>

          <div className="hotlines-header">
            <div className="hotlines-title">
              <h2>Municipal offices</h2>
            </div>
            <p>
              As published on the LGU website contact page, archived April 2023 (Wayback Machine).
            </p>
          </div>
          <div className="grid grid-2" style={{ gap: "var(--spacing-md)" }}>
            {municipal.data.offices.map((office) => (
              <DirectoryCard
                key={office.office}
                heading={office.office}
                value={office.details}
              />
            ))}
          </div>
          <RecordMeta record={municipal} />

          <div className="hotlines-header" style={{ marginTop: "var(--spacing-lg)" }}>
            <div className="hotlines-title">
              <h2>Emergency hotlines</h2>
            </div>
            <p>
              National hotlines that serve every municipality in the Philippines, including
              Maddela.
            </p>
          </div>
          <div className="grid grid-2" style={{ gap: "var(--spacing-md)" }}>
            {hotlines.data.entries.map((entry) => (
              <DirectoryCard
                key={entry.service}
                heading={entry.service}
                value={entry.details}
                note={entry.basis}
              />
            ))}
          </div>
          <div className="contact-pending">
            <h3>Maddela emergency lines are pending confirmation</h3>
            <p>
              Local emergency services — PNP Maddela, the Maddela Fire Station, the Municipal
              DRRRMO, and the provincial Rescue 910 team — are listed here by name only. Their
              numbers are not published on this site because they have not been confirmed directly
              by the project. Do not rely on archived numbers from other websites. In an
              emergency, call 911.
            </p>
          </div>
          <RecordMeta record={hotlines} />

          <div className="hotlines-header" style={{ marginTop: "var(--spacing-lg)" }}>
            <div className="hotlines-title">
              <h2>Provincial Government of Quirino</h2>
            </div>
            <p>Live provincial pages, retrieved August 28, 2026.</p>
          </div>
          <div className="grid grid-2" style={{ gap: "var(--spacing-md)" }}>
            {provincial.data.entries.map((entry) => (
              <DirectoryCard
                key={entry.office}
                heading={entry.office}
                value={entry.details}
              />
            ))}
          </div>
          <RecordMeta record={provincial} />

          <div className="hotlines-header" style={{ marginTop: "var(--spacing-lg)" }}>
            <div className="hotlines-title">
              <h2>National agencies</h2>
            </div>
            <p>Live agency pages, retrieved August 28, 2026.</p>
          </div>
          <div className="grid grid-2" style={{ gap: "var(--spacing-md)" }}>
            {national.data.entries.map((entry) => (
              <DirectoryCard
                key={entry.office}
                heading={entry.office}
                value={entry.details}
                note={entry.address}
              />
            ))}
          </div>
          <RecordMeta record={national} />

          <div className="hotlines-header" style={{ marginTop: "var(--spacing-lg)" }}>
            <div className="hotlines-title">
              <h2>Official data and project channels</h2>
            </div>
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
    </>
  );
}
