import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import { serviceCategories } from "@/lib/service-categories";


export function generateStaticParams() {
  return Object.keys(serviceCategories).map((category) => ({ category }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const entry = serviceCategories[category as keyof typeof serviceCategories];
  return entry
    ? { title: entry.title, description: entry.description }
    : { title: "Services" };
}

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const entry = serviceCategories[category as keyof typeof serviceCategories];

  if (!entry) notFound();

  return (
    <>
      <PageHeader
        title={entry.title}
        description={entry.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: entry.title },
        ]}
      />

      <section className="section">
        <div className="container">
          <div className="service-detail-content">
            <div>
              <h2>What this category covers</h2>
              <p>{entry.description}</p>
              <ul className="service-topic-list">
                {entry.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
            <aside className="coverage-panel" aria-labelledby="service-status-heading">
              <div><p className="section-kicker">Publication status</p><h2 id="service-status-heading">Procedure details pending</h2></div>
              <div>
                <p>Detailed requirements, fees, and processing time are not yet verified. Please confirm directly with the responsible office.</p>
                <Link href="/services" className="btn btn-secondary">
                  <i className="bi bi-arrow-left" aria-hidden="true" /> Back to all services
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
