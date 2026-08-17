import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/population", label: "Population" },
  { href: "/barangays", label: "Barangays" },
  { href: "/legal-history", label: "Legal history" },
  { href: "/sources", label: "Sources" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/">
          <span aria-hidden="true" className="wordmark-mark">BM</span>
          <span>BetterMaddela</span>
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="shell project-notice">
        Independent community project — not an official government website.
      </p>
    </header>
  );
}
