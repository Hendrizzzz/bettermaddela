import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Service-information categories for Maddela with the topics each covers; requirements, fees, and processing times stay unpublished until verified.",
};

const categories = [
  { slug: "agriculture", title: "Agriculture & Economic Development", description: "Agriculture and local economic-development information." },
  { slug: "business", title: "Business, Trade & Investment", description: "Business, trade, permit, and licensing information." },
  { slug: "certificates", title: "Certificates & Vital Records", description: "Civil-registry and certificate information." },
  { slug: "education", title: "Education & Scholarship", description: "Education and scholarship information." },
  { slug: "environment", title: "Environment & Natural Resources", description: "Environment and natural-resources information." },
  { slug: "health", title: "Health Services", description: "Local health-service information." },
  { slug: "infrastructure", title: "Infrastructure & Public Works", description: "Infrastructure and public-works information." },
  { slug: "public-safety", title: "Public Safety & Security", description: "Public-safety and preparedness information." },
  { slug: "social-services", title: "Social Services & Assistance", description: "Social-welfare and assistance information." },
  { slug: "tax-payments", title: "Taxation & Payments", description: "Taxation and payment information." },
] as const;

export default function ServicesDirectoryPage() {
  return (
    <>
      <PageHeader
        title="Services Directory"
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
                <h3 className="service-item-title">{category.title}</h3>
                <p className="service-item-desc">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
