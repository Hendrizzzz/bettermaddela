import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "BetterMaddela's accessibility commitment, current verification approach, and issue-reporting path.",
};

export default function AccessibilityPage() {
  return (
    <div className="shell prose-page">
      <p className="eyebrow">Project commitment</p>
      <h1>Accessibility</h1>
      <p>
        BetterMaddela targets WCAG 2.2 Level AA. The interface uses semantic headings,
        labelled navigation, visible keyboard focus, a skip link, responsive tables,
        and reduced-motion preferences.
      </p>
      <h2>Current verification</h2>
      <p>
        Automated checks are part of the release gate, but automation cannot prove
        complete accessibility. Representative pages must also receive keyboard,
        zoom, reflow, screen-reader-oriented structure, contrast, and reduced-motion
        review before release.
      </p>
      <h2>Report a problem</h2>
      <p>
        Please use the project repository’s issue tracker for public accessibility
        problems. Do not include private personal information in a report.
      </p>
      <p><a href="https://github.com/Hendrizzzz/bettermaddela/issues">Open the issue tracker</a></p>
    </div>
  );
}
