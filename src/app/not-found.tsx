import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested page is not available in BetterMaddela.",
};

export default function NotFound() {
  return (
    <div className="shell prose-page">
      <h1>Page not found</h1>
      <p>The requested page is not part of the verified BetterMaddela information set.</p>
      <p><Link className="btn btn-primary" href="/">Return home</Link></p>
    </div>
  );
}
