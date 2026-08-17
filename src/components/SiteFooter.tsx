import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="footer-title">BetterMaddela</p>
          <p className="footer-copy">
            Independent, volunteer-maintained civic information for Maddela,
            Quirino. This is not an official government website.
          </p>
        </div>
        <nav aria-label="Project information">
          <ul className="footer-links">
            <li><Link href="/sources">Sources and verification</Link></li>
            <li><Link href="/accessibility">Accessibility</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li>
              <a href="https://github.com/Hendrizzzz/bettermaddela">Project repository</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
