import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Navigate BetterMaddela's public civic-information and project pages.",
};

const sections = [
  { title: "Main Navigation", icon: "bi bi-house-door", links: [["Home", "/"], ["Services", "/services"], ["Government", "/government"], ["Statistics", "/statistics"], ["Legislative", "/legislative"], ["Transparency", "/budget"], ["Contact", "/contact"]] },
  { title: "Civic Information", icon: "bi bi-database", links: [["Barangays", "/government#barangays"], ["Officials", "/government/officials"], ["Legal History", "/legal-history"], ["Ordinances", "/legislative/ordinance-framework"], ["Resolutions", "/legislative/resolution-framework"], ["Sources", "/sources"]] },
  { title: "Project", icon: "bi bi-info-circle", links: [["News", "/news"], ["FAQ", "/faq"], ["Accessibility", "/accessibility"], ["Privacy", "/privacy"], ["Terms of Use", "/terms"]] },
] as const;

export default function SitemapPage() {
  return (
    <>
      <PageHeader
        title="Sitemap"
        description="Navigate the pages and information areas of BetterMaddela."
        badge={{ icon: "bi bi-diagram-3-fill", label: "Navigation" }}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sitemap" }]}
      />
      <section className="section">
        <div className="container">
          {sections.map((section) => (
            <div className="sitemap-section-new" key={section.title}>
              <div className="sitemap-section-header"><span className="sitemap-section-icon"><i className={section.icon} /></span><h2>{section.title}</h2></div>
              <div className="sitemap-links-grid">{section.links.map(([label, href]) => <Link href={href} className="sitemap-link-item" key={href}><i className="bi bi-arrow-right" /><span>{label}</span></Link>)}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
