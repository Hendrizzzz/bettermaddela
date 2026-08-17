import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: { icon: string; label: string };
  breadcrumbs: Array<{ label: string; href?: string }>;
}

export default function PageHeader({
  title,
  description,
  badge,
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
            {badge && (
              <span className="page-header-badge">
                <i className={badge.icon} aria-hidden="true" />
                <span>{badge.label}</span>
              </span>
            )}
            <h1>{title}</h1>
            {description && <p className="page-header-desc">{description}</p>}
          </div>
        </div>
      </section>
    </>
  );
}
