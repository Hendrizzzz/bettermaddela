import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
}

export default function PageHeader({
  title,
  description,
  breadcrumbs,
}: PageHeaderProps) {
  const isGovernment = title.toLowerCase().includes("government");
  const isBarangay = title.toLowerCase().includes("barangay");
  const kicker = isGovernment ? "Government · Structure & officials" : isBarangay ? "Government · Barangays" : "Section · Overview";
  return (
    <section className="page-header">
      <div className="container">
        <nav className="breadcrumbs breadcrumbs--inverse" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <span key={`${crumb.label}-${index}`}>
                {crumb.href && !isLast ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined}>{crumb.label}</span>
                )}
                {!isLast && <span aria-hidden="true">/</span>}
              </span>
            );
          })}
        </nav>
        <div className="page-header-content">
          <p className="section-kicker" style={{ color: "#f5b301", marginBottom: 8 }}>{kicker}</p>
          <h1>{title}</h1>
          {description && <p className="page-header-desc">{description}</p>}
        </div>
      </div>
    </section>
  );
}
