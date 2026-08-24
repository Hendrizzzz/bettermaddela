import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "BetterMaddela's accessibility commitment, current verification approach, and issue-reporting path.",
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        title="Accessibility Statement"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Accessibility" }]}
      />

      <section className="section">
        <div className="container">
          <div className="a11y-container">
            <div className="a11y-badge-section">
              <div className="a11y-conformance-badge">
                <i className="bi bi-bullseye" aria-hidden="true" />
                <div>
                  <span className="a11y-badge-label">WCAG 2.2 Level AA</span>
                  <span className="a11y-badge-text">Project target</span>
                </div>
              </div>
            </div>

            <div className="a11y-section">
              <h2>Our Commitment</h2>
              <p>BetterMaddela aims to make reviewed civic information usable by people with diverse access needs. Accessibility is part of the release gate, not an optional enhancement.</p>
            </div>

            <div className="a11y-section">
              <h2>Interface Features</h2>
              <div className="a11y-features-grid">
                <div className="a11y-feature"><i className="bi bi-keyboard" aria-hidden="true" /><h3>Keyboard Navigation</h3><p>A skip link, labelled navigation, and visible keyboard focus support keyboard use.</p></div>
                <div className="a11y-feature"><i className="bi bi-diagram-3" aria-hidden="true" /><h3>Semantic Structure</h3><p>Headings, landmarks, lists, links, and tables communicate page structure.</p></div>
                <div className="a11y-feature"><i className="bi bi-type" aria-hidden="true" /><h3>Readable Content</h3><p>Plain language and responsive typography support reading and zoom.</p></div>
                <div className="a11y-feature"><i className="bi bi-palette" aria-hidden="true" /><h3>Visible Focus</h3><p>Interactive controls retain a visible focus indicator.</p></div>
                <div className="a11y-feature"><i className="bi bi-phone" aria-hidden="true" /><h3>Responsive Layout</h3><p>Shared layouts and data tables adapt for smaller screens.</p></div>
                <div className="a11y-feature"><i className="bi bi-hourglass-split" aria-hidden="true" /><h3>Reduced Motion</h3><p>Motion preferences are respected where animation is present.</p></div>
              </div>
            </div>

            <div className="a11y-section">
              <h2>Current Verification</h2>
              <p>Automated checks are part of the release gate, but automation cannot prove complete accessibility. Representative pages also require keyboard, zoom, reflow, screen-reader-oriented structure, contrast, and reduced-motion review before release.</p>
            </div>

            <div className="a11y-section">
              <h2>Report a Problem</h2>
              <p>Use the public issue tracker for accessibility problems. Do not include private personal information.</p>
              <div className="a11y-contact-grid">
                <a href="https://github.com/Hendrizzzz/bettermaddela/issues" className="a11y-contact-item" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-github" aria-hidden="true" />
                  <span>Open the issue tracker <i className="bi bi-box-arrow-up-right" aria-hidden="true" /></span>
                </a>
              </div>
            </div>

            <div className="a11y-section">
              <h2>Technology</h2>
              <div className="a11y-tech-tags" role="group" aria-label="Interface technologies">
                <span className="a11y-tag">HTML5</span><span className="a11y-tag">CSS3</span><span className="a11y-tag">React</span><span className="a11y-tag">TypeScript</span><span className="a11y-tag">ARIA</span>
              </div>
            </div>

            <div className="a11y-promise">
              <i className="bi bi-heart-fill" aria-hidden="true" />
              <p>BetterMaddela will continue improving accessibility as the site and its verified information grow.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
