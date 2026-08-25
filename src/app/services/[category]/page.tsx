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
            <h2>What this category covers</h2>
            <ul className="service-topic-list">
              {entry.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
            <aside className="unpublished-note">
              Requirements, fees, and processing time are not yet verified — confirm directly with the responsible
              office. <Link href="/services">Back to all services</Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
