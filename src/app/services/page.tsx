import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Services",
  description: "Browse BetterMaddela's municipal service-information categories.",
};

const categories = [
  { slug: "agriculture", icon: "bi bi-tree-fill", title: "Agriculture & Economic Development", description: "Agriculture and local economic-development information." },
  { slug: "business", icon: "bi bi-shop", title: "Business, Trade & Investment", description: "Business, trade, permit, and licensing information." },
  { slug: "certificates", icon: "bi bi-file-earmark-text-fill", title: "Certificates & Vital Records", description: "Civil-registry and certificate information." },
  { slug: "education", icon: "bi bi-mortarboard-fill", title: "Education & Scholarship", description: "Education and scholarship information." },
  { slug: "environment", icon: "bi bi-globe-americas", title: "Environment & Natural Resources", description: "Environment and natural-resources information." },
  { slug: "health", icon: "bi bi-heart-pulse-fill", title: "Health Services", description: "Local health-service information." },
  { slug: "infrastructure", icon: "bi bi-building-fill-gear", title: "Infrastructure & Public Works", description: "Infrastructure and public-works information." },
  { slug: "public-safety", icon: "bi bi-shield-fill-check", title: "Public Safety & Security", description: "Public-safety and preparedness information." },
  { slug: "social-services", icon: "bi bi-people-fill", title: "Social Services & Assistance", description: "Social-welfare and assistance information." },
  { slug: "tax-payments", icon: "bi bi-cash-coin", title: "Taxation & Payments", description: "Taxation and payment information." },
] as const;

export default function ServicesDirectoryPage() {
  return (
    <>
      <PageHeader
        title="Services Directory"
        description="Browse general municipal service-information categories."
        badge={{ icon: "bi bi-grid-fill", label: "Services" }}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="section">
        <div className="container">
          <div className="service-status-note">
            <p><strong>Before you visit:</strong> Detailed requirements, fees, and processing time are not yet verified. Please confirm directly with the responsible office.</p>
          </div>

          <h2 className="sr-only">Service categories</h2>
          <div className="grid grid-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/services/${category.slug}`}
                className="service-item-card service-item-link"
              >
                <h3 className="service-item-title">
                  <i className={category.icon} aria-hidden="true" />
                  <span>{category.title}</span>
                </h3>
                <p className="service-item-desc">{category.description}</p>
                <div className="service-item-meta">
                  <span><i className="bi bi-arrow-right" aria-hidden="true" /> View category</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
