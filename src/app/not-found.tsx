import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="shell prose-page">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The requested page is not part of the verified BetterMaddela information set.</p>
      <p><Link className="button button-primary" href="/">Return home</Link></p>
    </div>
  );
}
