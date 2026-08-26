import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How BetterMaddela's static information site handles privacy, external links, and sensitive information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <section className="legal-content">
        <div className="container">
          <div className="legal-wrapper">
            <aside className="legal-toc">
              <h2><span>Contents</span></h2>
              <nav aria-label="Privacy sections">
                <a href="#introduction">Introduction</a>
                <a href="#hosting">Hosting</a>
                <a href="#preferences">Interface Preferences</a>
                <a href="#third-parties">Third-Party Resources</a>
                <a href="#sensitive-information">Sensitive Information</a>
              </nav>
            </aside>

            <article className="legal-article">
              <section id="introduction" className="legal-section">
                <h2>Introduction</h2>
                <div className="legal-highlight"><i className="bi bi-shield-check" aria-hidden="true" /><p>BetterMaddela is a static civic-information site. It has no account, form submission, payment, booking, resident-record, or analytics feature in this repository.</p></div>
              </section>

              <section id="hosting" className="legal-section">
                <h2>Hosting</h2>
                <p>Vercel hosts the public static site and may process ordinary request, security, and network information under its own <a href="https://vercel.com/legal/privacy-policy">privacy policy <i className="bi bi-box-arrow-up-right" aria-hidden="true" /></a>. BetterMaddela does not add analytics or advertising scripts.</p>
              </section>

              <section id="preferences" className="legal-section">
                <h2>Interface Preferences</h2>
                <p>The EN/FIL control stores the selected interface language in the browser under <code>bettermaddela_language</code>. BetterMaddela does not receive that preference.</p>
                <p>The homepage also caches a recent Open-Meteo forecast in browser local storage for up to 30 minutes, with a fallback copy retained for up to six hours when the provider is temporarily unavailable. The cache contains forecast values, the model forecast point, and the fetch time; it contains no name, account, or submitted information.</p>
              </section>

              <section id="third-parties" className="legal-section">
                <h2>Third-Party Resources</h2>
                <p>The interface requests the Inter font stylesheet from Google Fonts and Bootstrap Icons from jsDelivr. Those providers may receive ordinary network information under their own privacy policies.</p>
                <p>The homepage requests model-forecast data directly from Open-Meteo and loads an embedded Google Maps view showing Maddela's general location within Quirino and the Philippines. When the embedded map loads, Google may receive ordinary request information such as your IP address and browser details, and handles it under its own <a href="https://policies.google.com/">privacy policy and terms <i className="bi bi-box-arrow-up-right" aria-hidden="true" /></a>. BetterMaddela does not send a user-entered location to either service.</p>
                <p>Links to PSA, PHLPost, LawPhil, GitHub, and other sources leave BetterMaddela and are governed by those services.</p>
                <div className="legal-note"><i className="bi bi-info-circle" aria-hidden="true" /><p>External references are provided for evidence and convenience; BetterMaddela does not control their content or privacy practices.</p></div>
              </section>

              <section id="sensitive-information" className="legal-section">
                <h2>Do Not Send Sensitive Information</h2>
                <p>BetterMaddela is not a government transaction channel. Do not submit personal records, credentials, payments, applications, complaints, or emergency requests through the project repository.</p>
              </section>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
