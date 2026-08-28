import Link from "next/link";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  decor?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  breadcrumbs,
  decor,
}: PageHeaderProps) {
  return (
    <section className="page-header">
      {decor && (
        <div className="page-header-decor" aria-hidden="true">
          {decor}
        </div>
      )}
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
          <h1>{title}</h1>
          {description && <p className="page-header-desc">{description}</p>}
        </div>
      </div>
    </section>
  );
}
