import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { RecordMeta, RecordMetaGroup } from "@/components/RecordMeta";
import { getRecord } from "@/data/civic";

interface PopulationData { population: number }
interface IdentityData { incomeClass: string }
interface PostalData { zipCode: string }
interface HistoryData { series: { referenceDate: string; population: number }[] }
interface GrowthData { measure: string; series: { period: string; percent: number }[] }
interface HouseholdsData {
  totalPopulation: number;
  householdPopulation: number;
  numberOfHouseholds: number;
  institutionalPopulation: number;
  referenceDate: string;
  census: string;
}
interface PovertyData {
  measure: string;
  method: string;
  series: { year: number; estimatePercent: number }[];
  latest: {
    year: number;
    estimatePercent: number;
    coefficientOfVariationPercent: number;
    standardErrorPercentagePoints: number;
    confidenceLevelPercent: number;
    lowerBoundPercent: number;
    upperBoundPercent: number;
  };
}
interface BarangayData {
  barangayCount: number;
  populationReferenceDate: string;
  barangays: { name: string; population: number }[];
}

const population = getRecord<PopulationData>("population-2024-popcen");
const identity = getRecord<IdentityData>("municipality-identity");
const postal = getRecord<PostalData>("maddela-postal-code-current");
const history = getRecord<HistoryData>("population-history-2000-2024");
const growth = getRecord<GrowthData>("population-growth-rates");
const barangays = getRecord<BarangayData>("barangay-dataset-2026q2");
const households = getRecord<HouseholdsData>("maddela-households-2024");
const poverty = getRecord<PovertyData>("maddela-poverty-estimates");
const rankedBarangays = [...barangays.data.barangays].sort((a, b) => b.population - a.population);
const maxPopulation = rankedBarangays[0]?.population ?? 1;
const topBarangays = rankedBarangays.slice(0, 10);
const remainingBarangays = rankedBarangays.slice(10);

export const metadata: Metadata = {
  title: "Statistics",
  description: "Reviewed population and administrative statistics for Maddela, Quirino.",
};

function year(value: string) { return value.slice(0, 4); }

function formatLongDate(value: string) {
  return new Intl.DateTimeFormat("en-PH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Manila",
  }).format(new Date(`${value}T00:00:00+08:00`));
}

export default function StatisticsPage() {
  return (
    <>
      <PageHeader
        title="Maddela Statistics"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Statistics" }]}
      />

      <section className="stats-metrics">
        <div className="container">
          <div className="metrics-grid">
            <div className="metric-card"><div className="metric-icon"><i className="bi bi-people-fill" aria-hidden="true" /></div><div className="metric-value">{population.data.population.toLocaleString("en-PH")}</div><div className="metric-label">Population</div><div className="metric-source">2024 census count</div></div>
            <div className="metric-card"><div className="metric-icon"><i className="bi bi-geo-alt-fill" aria-hidden="true" /></div><div className="metric-value">{barangays.data.barangayCount}</div><div className="metric-label">Barangays</div><div className="metric-source">Official administrative units</div></div>
            <div className="metric-card"><div className="metric-icon"><i className="bi bi-award-fill" aria-hidden="true" /></div><div className="metric-value">{identity.data.incomeClass}</div><div className="metric-label">Income class</div><div className="metric-source">Official municipal classification</div></div>
            <div className="metric-card"><div className="metric-icon"><i className="bi bi-mailbox" aria-hidden="true" /></div><div className="metric-value">{postal.data.zipCode}</div><div className="metric-label">ZIP code</div><div className="metric-source">PHLPost locator</div></div>
          </div>
          <RecordMetaGroup records={[{ label: "population", record: population }, { label: "barangays", record: barangays }, { label: "classification", record: identity }, { label: "ZIP code", record: postal }]} />
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="section-header-minimal">
            <h2>Household profile</h2>
            <p>Dated census counts as of <time dateTime={households.data.referenceDate}>{formatLongDate(households.data.referenceDate)}</time></p>
          </div>
          <div className="metrics-grid">
            <div className="metric-card"><div className="metric-icon"><i className="bi bi-people" aria-hidden="true" /></div><div className="metric-value">{households.data.householdPopulation.toLocaleString("en-PH")}</div><div className="metric-label">Household residents</div><div className="metric-source">People living in households</div></div>
            <div className="metric-card"><div className="metric-icon"><i className="bi bi-house-door-fill" aria-hidden="true" /></div><div className="metric-value">{households.data.numberOfHouseholds.toLocaleString("en-PH")}</div><div className="metric-label">Households</div><div className="metric-source">Dated census count</div></div>
            <div className="metric-card"><div className="metric-icon"><i className="bi bi-building" aria-hidden="true" /></div><div className="metric-value">{households.data.institutionalPopulation.toLocaleString("en-PH")}</div><div className="metric-label">Institutional residents</div><div className="metric-source">Derived difference from the census totals</div></div>
          </div>
          <RecordMeta record={households} />
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="section-header-minimal">
            <h2>Census population history</h2>
            <p>Dated census counts, not live estimates</p>
          </div>
          <div className="trends-summary">
            <div className="trend-stat"><span className="trend-stat-label">{year(history.data.series[0].referenceDate)}</span><span className="trend-stat-value">{history.data.series[0].population.toLocaleString("en-PH")}</span></div>
            <div className="trend-arrow"><i className="bi bi-arrow-right" aria-hidden="true" /></div>
            <div className="trend-stat trend-stat-current"><span className="trend-stat-label">{year(history.data.series.at(-1)!.referenceDate)}</span><span className="trend-stat-value">{history.data.series.at(-1)!.population.toLocaleString("en-PH")}</span></div>
          </div>
          <div className="table-wrap">
            <table>
              <caption>Dated census counts for Maddela</caption>
              <thead><tr><th scope="col">Census reference date</th><th scope="col" className="numeric">Population</th></tr></thead>
              <tbody>{history.data.series.map((item) => <tr key={item.referenceDate}><th scope="row"><time dateTime={item.referenceDate}>{item.referenceDate}</time></th><td className="numeric">{item.population.toLocaleString("en-PH")}</td></tr>)}</tbody>
            </table>
          </div>
          <RecordMeta record={history} />
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="section-header-minimal">
            <h2>Estimated poverty incidence</h2>
            <p>A model-based municipal estimate, not an exact headcount</p>
          </div>
          <div className="poverty-comparison">
            <article className="metric-card">
              <div className="metric-icon"><i className="bi bi-percent" aria-hidden="true" /></div>
              <div className="metric-value">{poverty.data.latest.estimatePercent.toFixed(2)}%</div>
              <div className="metric-label">Estimated incidence in {poverty.data.latest.year}</div>
              <div className="metric-source">{poverty.data.latest.confidenceLevelPercent}% confidence interval: {poverty.data.latest.lowerBoundPercent.toFixed(2)}%–{poverty.data.latest.upperBoundPercent.toFixed(2)}%</div>
            </article>
          </div>
          <div className="table-wrap">
            <table>
              <caption>Model-based poverty incidence estimates</caption>
              <thead><tr><th scope="col">Estimate year</th><th scope="col" className="numeric">Estimated incidence</th></tr></thead>
              <tbody>{poverty.data.series.map((item) => <tr key={item.year}><th scope="row">{item.year}</th><td className="numeric">{item.estimatePercent.toFixed(2)}%</td></tr>)}</tbody>
            </table>
          </div>
          <RecordMeta record={poverty} />
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="section-header-minimal">
            <h2>Population by barangay</h2>
            <p>All {barangays.data.barangayCount} barangays, ranked by the dated census count</p>
          </div>
          <div className="distribution-list">
            {topBarangays.map((barangay, index) => (
              <div className="barangay-row" key={barangay.name}>
                <span className="rank">#{index + 1}</span>
                <span className="name">{barangay.name}</span>
                <div className="bar-wrap" aria-hidden="true"><div className="bar" style={{ width: `${(barangay.population / maxPopulation) * 100}%` }} /></div>
                <span className="pop">{barangay.population.toLocaleString("en-PH")}</span>
              </div>
            ))}
          </div>
          {remainingBarangays.length > 0 && (
            <details className="more-barangays">
              <summary>View all {rankedBarangays.length} barangays</summary>
              <div className="distribution-list distribution-list-full">
                {remainingBarangays.map((barangay, index) => (
                  <div className="barangay-row" key={barangay.name}>
                    <span className="rank">#{index + topBarangays.length + 1}</span>
                    <span className="name">{barangay.name}</span>
                    <div className="bar-wrap" aria-hidden="true"><div className="bar" style={{ width: `${(barangay.population / maxPopulation) * 100}%` }} /></div>
                    <span className="pop">{barangay.population.toLocaleString("en-PH")}</span>
                  </div>
                ))}
              </div>
            </details>
          )}
          <RecordMeta record={barangays} />
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="section-header-minimal">
            <h2>{growth.data.measure}</h2>
          </div>
          <div className="table-wrap">
            <table>
              <caption>PSA annual population growth rates</caption>
              <thead><tr><th scope="col">Period</th><th scope="col" className="numeric">Rate</th></tr></thead>
              <tbody>{growth.data.series.map((item) => <tr key={item.period}><th scope="row">{item.period}</th><td className="numeric">{item.percent.toFixed(2)}%</td></tr>)}</tbody>
            </table>
          </div>
          <RecordMeta record={growth} />
        </div>
      </section>

    </>
  );
}
