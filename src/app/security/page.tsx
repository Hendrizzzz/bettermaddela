import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How to privately report a security vulnerability in BetterMaddela and what the project's security boundaries are.",
};

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        title="Security Policy"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Security" }]}
      />

      <section className="legal-content">
        <div className="container">
          <div className="legal-wrapper">
            <aside className="legal-toc">
              <h2><i className="bi bi-list-ul" aria-hidden="true" /> <span>Contents</span></h2>
              <nav aria-label="Security sections">
                <a href="#reporting">Report a Vulnerability</a>
                <a href="#what-to-include">What to Include</a>
                <a href="#response">Response Expectations</a>
                <a href="#boundaries">Security Boundaries</a>
                <a href="#not-a-channel">Not a Transaction Channel</a>
              </nav>
            </aside>

            <article className="legal-article">
              <section id="reporting" className="legal-section">
                <h2>Report a Vulnerability</h2>
                <div className="legal-highlight"><i className="bi bi-shield-lock" aria-hidden="true" /><p>BetterMaddela is an independent, open-source civic-information project. Please disclose suspected vulnerabilities privately — not in a public issue, discussion, pull request, or chat.</p></div>
                <p>
                  Use <a href="https://github.com/Hendrizzzz/bettermaddela/security/advisories/new" target="_blank" rel="noopener noreferrer">GitHub private vulnerability reporting <i className="bi bi-box-arrow-up-right" aria-hidden="true" /></a>. If that form is unavailable, open a public issue asking the maintainer to enable a private reporting channel, and include no vulnerability details in that issue.
                </p>
              </section>

              <section id="what-to-include" className="legal-section">
                <h2>What to Include</h2>
                <ul>
                  <li>The affected page, file, dependency, or deployment;</li>
                  <li>Reproducible steps or a minimal proof of concept;</li>
                  <li>The likely impact and conditions required to exploit it; and</li>
                  <li>Suggested mitigations, without real secrets or personal data.</li>
                </ul>
              </section>

              <section id="response" className="legal-section">
                <h2>Response Expectations</h2>
                <p>No response or remediation deadline is promised. Reports are assessed by impact, reproducibility, and maintainer availability. Coordinated disclosure is agreed with the maintainer before publication.</p>
              </section>

              <section id="boundaries" className="legal-section">
                <h2>Security Boundaries</h2>
                <p>BetterMaddela is a statically deployed public-information site. It intentionally provides no authentication, payments, form submissions, stored records, or client-side administration surface. A future change introducing a server, database, privileged operation, or personal-data collection requires a separate threat review before release.</p>
                <p>Security-relevant areas include the repository&apos;s source and build configuration, accidental exposure of credentials or private contact details, unsafe rendering or links, third-party integrations, and content that could cause material harm — such as tampered emergency information.</p>
                <p>External services, upstream projects, browsers, and hosting providers follow their own security processes; reports affecting this project are still welcome so maintainers can coordinate or mitigate.</p>
              </section>

              <section id="not-a-channel" className="legal-section">
                <h2>Not a Transaction Channel</h2>
                <p>BetterMaddela must never be used to submit government transactions, credentials, payments, or sensitive personal information. Public factual corrections that do not expose a vulnerability belong in the normal <Link href="/contact">issue tracker route</Link>.</p>
              </section>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
