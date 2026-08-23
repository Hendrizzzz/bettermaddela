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
  return (
    <>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
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
      </div>

      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <h1>{title}</h1>
            {description && <p className="page-header-desc">{description}</p>}
          </div>
        </div>
      </section>
    </>
  );
}
