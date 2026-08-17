import type { Metadata } from "next";
import Link from "next/link";
import { RecordMetaGroup } from "@/components/RecordMeta";
import { getRecord, records } from "@/data/civic";

export const metadata: Metadata = {
  description:
    "Reviewed population, barangay, identity, postal, and legal-source information about Maddela, Quirino.",
};

interface IdentityData {
  officialName: string;
  province: string;
  region: string;
  psgcCode: string;
  incomeClass: string;
}

interface PostalData { zipCode: string }
interface PopulationData { population: number; referenceDate: string }
interface BarangayData { barangayCount: number }

export default function HomePage() {
  const identity = getRecord<IdentityData>("municipality-identity");
  const postal = getRecord<PostalData>("maddela-postal-code-current");
  const population = getRecord<PopulationData>("population-2024-popcen");
  const barangays = getRecord<BarangayData>("barangay-dataset-2026q2");
  const legalRecordCount = records.filter((record) => record.type === "legal-instrument").length;

  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div>
            <p className="eyebrow">Independent civic information</p>
            <h1>Clear, sourced facts about Maddela.</h1>
            <p className="hero-copy">
              BetterMaddela makes a small set of reviewed public information easier
              to find. Every published fact links back to its evidence.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/barangays">Explore barangays</Link>
              <Link className="button button-secondary" href="/sources">Check the sources</Link>
            </div>
          </div>
          <aside className="notice" aria-labelledby="independence-heading">
            <p className="status-label">Important</p>
            <h2 id="independence-heading">Not an official government website</h2>
            <p>
              BetterMaddela is not owned, operated, endorsed, or approved by the
              Municipal Government of Maddela. Confirm time-sensitive information
              with the responsible government office.
            </p>
          </aside>
        </div>
      </section>

      <section className="section shell" aria-labelledby="snapshot-heading">
        <div className="section-heading">
          <p className="eyebrow">Verified snapshot</p>
          <h2 id="snapshot-heading">Maddela at a glance</h2>
          <p>Counts are dated reference values, not live estimates.</p>
        </div>
        <dl className="stat-grid">
          <div className="stat-card">
            <dt>2024 POPCEN population</dt>
            <dd>
              <span className="stat-value">{population.data.population.toLocaleString("en-PH")}</span>
              <span className="stat-detail">Reference date: {population.data.referenceDate}</span>
            </dd>
          </div>
          <div className="stat-card">
            <dt>Barangays</dt>
            <dd>
              <span className="stat-value">{barangays.data.barangayCount}</span>
              <span className="stat-detail">Complete PSA PSGC list</span>
            </dd>
          </div>
          <div className="stat-card">
            <dt>Income class</dt>
            <dd>
              <span className="stat-value">{identity.data.incomeClass}</span>
              <span className="stat-detail">PSGC publication classification</span>
            </dd>
          </div>
          <div className="stat-card">
            <dt>ZIP code</dt>
            <dd>
              <span className="stat-value">{postal.data.zipCode}</span>
              <span className="stat-detail">PHLPost locator result</span>
            </dd>
          </div>
        </dl>
        <RecordMetaGroup
          records={[
            { label: "population", record: population },
            { label: "barangays", record: barangays },
            { label: "income class", record: identity },
            { label: "ZIP code", record: postal },
          ]}
        />
      </section>

      <section className="section section-tint">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Available now</p>
            <h2>Only reviewed information is shown</h2>
          </div>
          <div className="card-grid">
            <article className="content-card">
              <p className="card-kicker">Statistics</p>
              <h3><Link href="/population">Population and growth</Link></h3>
              <p>Published census counts since 2000 and PSA annual growth rates.</p>
            </article>
            <article className="content-card">
              <p className="card-kicker">Geography</p>
              <h3><Link href="/barangays">All {barangays.data.barangayCount} barangays</Link></h3>
              <p>Names, PSGC identifiers, classifications, and 2024 populations.</p>
            </article>
            <article className="content-card">
              <p className="card-kicker">History</p>
              <h3><Link href="/legal-history">Legal source timeline</Link></h3>
              <p>{legalRecordCount} full-text national legal instruments, presented with limits.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section shell" aria-labelledby="unavailable-heading">
        <div className="unavailable-panel">
          <div>
            <p className="eyebrow">Unavailable by design</p>
            <h2 id="unavailable-heading">Some useful information is still being verified</h2>
          </div>
          <p>
            Current officials and office rosters, emergency contacts, detailed
            services, municipal legislation, budgets, audit documents, projects, and
            reusable media are not published yet. Missing or conflicting evidence is
            never replaced with a guess.
          </p>
        </div>
      </section>
    </>
  );
}
