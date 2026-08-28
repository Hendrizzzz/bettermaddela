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
  barangays: { name: string; population: number; classification: string }[];
}

const population = getRecord<PopulationData>("population-2024-popcen");
const identity = getRecord<IdentityData>("municipality-identity");
const postal = getRecord<PostalData>("maddela-postal-code-current");
const history = getRecord<HistoryData>("population-history-2000-2024");
const growth = getRecord<GrowthData>("population-growth-rates");
const barangays = getRecord<BarangayData>("barangay-dataset-2026q2");
const households = getRecord<HouseholdsData>("maddela-households-2024");
const poverty = getRecord<PovertyData>("maddela-poverty-estimates");

export const metadata: Metadata = {
  title: "Statistics",
  description:
    "Reviewed population, household, barangay-level, and poverty-estimate statistics for Maddela, Quirino, with sources and review dates.",
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

function monthYear(value: string) {
  return new Intl.DateTimeFormat("en-PH", { month: "short", year: "numeric", timeZone: "Asia/Manila" })
    .format(new Date(`${value}T00:00:00+08:00`));
}

const fmt = (value: number) => value.toLocaleString("en-PH");

const historySeries = history.data.series;
const firstCensus = historySeries[0];
const lastCensus = historySeries[historySeries.length - 1];
const censusGains = historySeries.slice(1).map((point, index) => ({
  referenceDate: point.referenceDate,
  gain: point.population - historySeries[index].population,
}));
const latestGain = censusGains[censusGains.length - 1].gain;
const smallestGain = Math.min(...censusGains.map((item) => item.gain));
const totalGain = lastCensus.population - firstCensus.population;
const totalGrowthPercent = ((totalGain / firstCensus.population) * 100).toFixed(1);

const growthSeries = growth.data.series;
const earliestRate = growthSeries[0].percent;
const latestRate = growthSeries[growthSeries.length - 1].percent;
const latestRateShare = Math.round((latestRate / earliestRate) * 100);

const personsPerHousehold = (households.data.householdPopulation / households.data.numberOfHouseholds).toFixed(1);

const povertyLatest = poverty.data.latest;
const povertyFirst = poverty.data.series[0];
const povertyCiWidth = (povertyLatest.upperBoundPercent - povertyLatest.lowerBoundPercent).toFixed(2);

const rankedBarangays = [...barangays.data.barangays].sort((a, b) => b.population - a.population);
const barangayPopulations = rankedBarangays.map((item) => item.population).sort((a, b) => a - b);
const medianPopulation = Math.round(
  (barangayPopulations[barangayPopulations.length / 2 - 1] + barangayPopulations[barangayPopulations.length / 2]) / 2,
);
const largestBarangay = rankedBarangays[0];
const smallestBarangay = rankedBarangays[rankedBarangays.length - 1];
const barangaySpread = (largestBarangay.population / smallestBarangay.population).toFixed(1);
const urbanBarangays = rankedBarangays.filter((item) => item.classification === "Urban");
const urbanShare = (
  (urbanBarangays.reduce((sum, item) => sum + item.population, 0) / population.data.population) * 100
).toFixed(1);

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
            <div className="metric-card"><div className="metric-value">{fmt(population.data.population)}</div><div className="metric-label">Population</div></div>
            <div className="metric-card"><div className="metric-value">{barangays.data.barangayCount}</div><div className="metric-label">Barangays</div></div>
            <div className="metric-card"><div className="metric-value">{identity.data.incomeClass}</div><div className="metric-label">Income class</div></div>
            <div className="metric-card"><div className="metric-value">{postal.data.zipCode}</div><div className="metric-label">ZIP code</div></div>
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
            <div className="metric-card"><div className="metric-value">{fmt(households.data.householdPopulation)}</div><div className="metric-label">Household residents</div></div>
            <div className="metric-card"><div className="metric-value">{fmt(households.data.numberOfHouseholds)}</div><div className="metric-label">Households</div></div>
            <div className="metric-card"><div className="metric-value">{fmt(households.data.institutionalPopulation)}</div><div className="metric-label">Institutional residents</div></div>
            <div className="metric-card"><div className="metric-value metric-value--computed">{personsPerHousehold}</div><div className="metric-label">Persons per household</div></div>
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
          <figure className="stats-figure">
            <div className="chart-scroll" role="region" aria-label="Census population history chart" tabIndex={0}>
              <CensusChart />
            </div>
            <figcaption className="stats-figure-caption">
              <strong>Maddela grew by {fmt(totalGain)} residents over 24 years, and the pace is visibly easing.</strong>
            </figcaption>
          </figure>
          <details className="stats-more">
            <summary>About this data</summary>
            <p className="table-note">
              The census count rose from {fmt(firstCensus.population)} ({monthYear(firstCensus.referenceDate)}) to {fmt(lastCensus.population)} ({monthYear(lastCensus.referenceDate)}), a {totalGrowthPercent}% increase (computed). The latest interval added {fmt(latestGain)} people{smallestGain === latestGain ? ", smaller than any previous census interval" : ""} (computed).
            </p>
            <div className="table-wrap">
              <table>
                <caption>Dated census counts for Maddela</caption>
                <thead><tr><th scope="col">Census reference date</th><th scope="col" className="numeric">Population</th></tr></thead>
                <tbody>{historySeries.map((item) => <tr key={item.referenceDate}><th scope="row"><time dateTime={item.referenceDate}>{item.referenceDate}</time></th><td className="numeric">{fmt(item.population)}</td></tr>)}</tbody>
              </table>
            </div>
            <RecordMeta record={history} />
          </details>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="section-header-minimal">
            <h2>Annual population growth rate</h2>
            <p>As published by the Philippine Statistics Authority; periods are kept exactly as released</p>
          </div>
          <figure className="stats-figure">
            <div className="chart-scroll" role="region" aria-label="Population growth rate chart" tabIndex={0}>
              <GrowthChart />
            </div>
            <figcaption className="stats-figure-caption">
              <strong>Growth peaked at {growthSeries[1].percent}% in {growthSeries[1].period} and has fallen in every published period since.</strong>
            </figcaption>
          </figure>
          <details className="stats-more">
            <summary>About this data</summary>
            <p className="table-note">
              The latest rate, {latestRate}% for {growthSeries[growthSeries.length - 1].period}, is about {latestRateShare}% of the {earliestRate}% pace of {growthSeries[0].period} (computed). Some periods overlap (they share a start year), so read them as separate published averages, not consecutive steps.
            </p>
            <div className="table-wrap">
              <table>
                <caption>PSA annual population growth rates</caption>
                <thead><tr><th scope="col">Period</th><th scope="col" className="numeric">Rate</th></tr></thead>
                <tbody>{growthSeries.map((item) => <tr key={item.period}><th scope="row">{item.period}</th><td className="numeric">{item.percent.toFixed(2)}%</td></tr>)}</tbody>
              </table>
            </div>
            <RecordMeta record={growth} />
          </details>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="section-header-minimal">
            <h2>Estimated poverty incidence</h2>
            <p>A model-based municipal estimate, not an exact headcount</p>
          </div>
          <figure className="stats-figure">
            <div className="chart-scroll" role="region" aria-label="Poverty estimate chart" tabIndex={0}>
              <PovertyChart />
            </div>
            <figcaption className="stats-figure-caption">
              <strong>Estimated poverty incidence declined from {povertyFirst.estimatePercent.toFixed(2)}% in {povertyFirst.year} to {povertyLatest.estimatePercent.toFixed(2)}% in {povertyLatest.year}.</strong>
            </figcaption>
          </figure>
          <details className="stats-more">
            <summary>About this data</summary>
            <p className="table-note">
              These are PSA small-area model estimates, not headcounts. Only the {povertyLatest.year} reading publishes uncertainty: a {povertyLatest.confidenceLevelPercent}% confidence interval spanning {povertyLatest.lowerBoundPercent.toFixed(2)}%–{povertyLatest.upperBoundPercent.toFixed(2)}%, nearly {Math.round(Number(povertyCiWidth))} points wide (computed). Earlier years carry no published interval, so this record does not support calling the decline statistically significant; read it as direction, not proof.
            </p>
            <div className="table-wrap">
              <table>
                <caption>Model-based poverty incidence estimates</caption>
                <thead><tr><th scope="col">Estimate year</th><th scope="col" className="numeric">Estimated incidence</th></tr></thead>
                <tbody>{poverty.data.series.map((item) => <tr key={item.year}><th scope="row">{item.year}</th><td className="numeric">{item.estimatePercent.toFixed(2)}%</td></tr>)}</tbody>
              </table>
            </div>
            <RecordMeta record={poverty} />
          </details>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="section-header-minimal">
            <h2>Population by barangay</h2>
            <p>All {barangays.data.barangayCount} barangays, ranked by the dated census count</p>
          </div>
          <figure className="stats-figure">
            <div className="chart-scroll" role="region" aria-label="Barangay population chart" tabIndex={0}>
              <BarangayChart />
            </div>
            <figcaption className="stats-figure-caption">
              <strong>Half of Maddela&apos;s barangays have {fmt(medianPopulation)} residents or fewer.</strong>
            </figcaption>
          </figure>
          <details className="stats-more">
            <summary>About this data</summary>
            <p className="table-note">
              They range from {smallestBarangay.name}&apos;s {fmt(smallestBarangay.population)} to {largestBarangay.name}&apos;s {fmt(largestBarangay.population)}, a {barangaySpread}× spread (computed). Only the {urbanBarangays.length === 2 ? "two urban-classified barangays, both Poblaciones" : `${urbanBarangays.length} urban-classified barangays`}, hold about {urbanShare}% of the municipal population (computed).
            </p>
            <div className="table-wrap">
              <table>
                <caption>Population by barangay, <time dateTime={barangays.data.populationReferenceDate}>{formatLongDate(barangays.data.populationReferenceDate)}</time></caption>
                <thead><tr><th scope="col">Barangay</th><th scope="col">Classification</th><th scope="col" className="numeric">Population</th></tr></thead>
                <tbody>{rankedBarangays.map((item) => <tr key={item.name}><th scope="row">{item.name}</th><td>{item.classification}</td><td className="numeric">{fmt(item.population)}</td></tr>)}</tbody>
              </table>
            </div>
            <RecordMeta record={barangays} />
          </details>
        </div>
      </section>
    </>
  );

  function CensusChart() {
    const width = 1120;
    const height = 420;
    const left = 72;
    const right = 1096;
    const top = 24;
    const bottom = 376;
    const start = Date.parse(`${firstCensus.referenceDate}T00:00:00+08:00`);
    const end = Date.parse(`${lastCensus.referenceDate}T00:00:00+08:00`);
    const x = (date: string) => left + ((Date.parse(`${date}T00:00:00+08:00`) - start) / (end - start)) * (right - left);
    const yDomain: [number, number] = [30000, 42500];
    const y = (value: number) => bottom - ((value - yDomain[0]) / (yDomain[1] - yDomain[0])) * (bottom - top);
    const points = historySeries.map((item) => ({ ...item, cx: x(item.referenceDate), cy: y(item.population) }));
    const gridTicks = [30000, 35000, 40000];
    const lastPoint = points[points.length - 1];
    const prevPoint = points[points.length - 2];
    const midX = (prevPoint.cx + lastPoint.cx) / 2;
    const midY = (prevPoint.cy + lastPoint.cy) / 2;
    return (
      <svg
        role="img"
        aria-label={`Line chart of census population: ${fmt(firstCensus.population)} in ${monthYear(firstCensus.referenceDate)} rising to ${fmt(lastCensus.population)} in ${monthYear(lastCensus.referenceDate)}, with the latest gain of ${fmt(latestGain)}${smallestGain === latestGain ? " the smallest of any census interval" : ""}. Full data in the table below.`}
        className="chart-svg chart-population"
        viewBox={`0 0 ${width} ${height}`}
      >
        {gridTicks.map((tick) => (
          <g key={tick} aria-hidden="true">
            <line className="chart-gridline" x1={left} x2={right} y1={y(tick)} y2={y(tick)} />
            <text className="chart-tick-label" x={left - 10} y={y(tick) + 4} textAnchor="end">{fmt(tick / 1000)}k</text>
          </g>
        ))}
        <polyline
          className="chart-line chart-line--muted"
          aria-hidden="true"
          points={points.slice(0, -1).map((point) => `${point.cx},${point.cy}`).join(" ")}
        />
        <line
          className="chart-line chart-line--lead"
          aria-hidden="true"
          x1={prevPoint.cx} y1={prevPoint.cy} x2={lastPoint.cx} y2={lastPoint.cy}
        />
        {points.map((point) => {
          // The series ascends left-to-right, so the clear zone around every dot
          // is upper-left: the incoming segment approaches from lower-left and
          // the outgoing segment leaves to upper-right. Labels sit there.
          return (
            <g key={point.referenceDate}>
              <circle className="chart-dot" cx={point.cx} cy={point.cy} r={4} />
              <text
                className="chart-label-date"
                x={point.cx - 10}
                y={point.cy - 22}
                textAnchor="end"
              >
                {monthYear(point.referenceDate)}
              </text>
              <text
                className="chart-label-value"
                x={point.cx - 10}
                y={point.cy - 8}
                textAnchor="end"
              >
                {fmt(point.population)}
              </text>
            </g>
          );
        })}
        <line className="chart-refline" aria-hidden="true" x1={midX} y1={midY + 8} x2={midX} y2={midY + 44} />
        <text className="chart-annotation" x={right} y={midY + 62} textAnchor="end">
          +{fmt(latestGain)} since {year(prevPoint.referenceDate)}
        </text>
      </svg>
    );
  }

  function GrowthChart() {
    const width = 1120;
    const left = 64;
    const right = 1096;
    const baseline = 304;
    const chartHeight = 272;
    const domainMax = 1.6;
    const slot = (right - left) / growthSeries.length;
    const barWidth = 120;
    const y = (value: number) => baseline - (value / domainMax) * chartHeight;
    const ticks = [0, 0.5, 1.0, 1.5];
    const last = growthSeries[growthSeries.length - 1];
    const refY = y(earliestRate);
    return (
      <svg
        role="img"
        aria-label={`Bar chart of annual population growth rates as published by PSA: ${growthSeries.map((item) => `${item.percent} percent for ${item.period}`).join(", ")}. Full data in the table below.`}
        className="chart-svg chart-growth"
        viewBox={`0 0 ${width} 360`}
      >
        {ticks.map((tick) => (
          <g key={tick} aria-hidden="true">
            <line className={tick === 0 ? "chart-axis" : "chart-gridline"} x1={left} x2={right} y1={y(tick)} y2={y(tick)} />
            <text className="chart-tick-label" x={left - 10} y={y(tick) + 4} textAnchor="end">{tick.toFixed(1)}%</text>
          </g>
        ))}
        <line className="chart-refline" aria-hidden="true" x1={left} y1={refY} x2={right} y2={refY} />
        <text className="chart-refline-label" x={right} y={refY - 8} textAnchor="end">{growthSeries[0].period} pace: {earliestRate}%</text>
        {growthSeries.map((item, index) => {
          const centerX = left + slot * index + slot / 2;
          const isLatest = index === growthSeries.length - 1;
          const top = y(item.percent);
          return (
            <g key={item.period}>
              <rect
                className={isLatest ? "chart-bar chart-bar--lead" : "chart-bar"}
                x={centerX - barWidth / 2}
                y={top}
                width={barWidth}
                height={baseline - top}
              />
              <text className="chart-label-value" x={centerX} y={top - 10} textAnchor="middle">{item.percent.toFixed(2)}%</text>
              <text className="chart-label-date" x={centerX} y={baseline + 22} textAnchor="middle">{item.period}</text>
              {isLatest && (
                <text className="chart-annotation" x={centerX} y={baseline + 44} textAnchor="middle">
                  {latestRateShare}% of the {growthSeries[0].period} pace
                </text>
              )}
            </g>
          );
        })}
      </svg>
    );
  }

  function PovertyChart() {
    const width = 1120;
    const left = 64;
    const right = 1096;
    const top = 24;
    const bottom = 272;
    const yearStart = 2017;
    const yearEnd = 2024;
    const x = (value: number) => left + ((value - yearStart) / (yearEnd - yearStart)) * (right - left);
    const y = (value: number) => bottom - (value / 10) * (bottom - top);
    const ticks = [0, 2, 4, 6, 8, 10];
    const ciTop = y(povertyLatest.upperBoundPercent);
    const ciBottom = y(povertyLatest.lowerBoundPercent);
    return (
      <svg
        role="img"
        aria-label={`Dot chart of model-based poverty incidence estimates: ${poverty.data.series.map((item) => `${item.estimatePercent.toFixed(2)} percent in ${item.year}`).join(", ")}, where only the ${povertyLatest.year} estimate includes a ${povertyLatest.confidenceLevelPercent} percent confidence interval from ${povertyLatest.lowerBoundPercent.toFixed(2)} to ${povertyLatest.upperBoundPercent.toFixed(2)} percent. Full data in the table below.`}
        className="chart-svg chart-poverty"
        viewBox={`0 0 ${width} 320`}
      >
        {ticks.map((tick) => (
          <g key={tick} aria-hidden="true">
            <line className={tick === 0 ? "chart-axis" : "chart-gridline"} x1={left} x2={right} y1={y(tick)} y2={y(tick)} />
            <text className="chart-tick-label" x={left - 10} y={y(tick) + 4} textAnchor="end">{tick}%</text>
          </g>
        ))}
        {poverty.data.series.map((item) => {
          const isLatest = item.year === povertyLatest.year;
          return (
            <g key={item.year}>
              {isLatest && (
                <g aria-hidden="true">
                  <line className="chart-whisker" x1={x(item.year)} x2={x(item.year)} y1={ciTop} y2={ciBottom} />
                  <line className="chart-whisker" x1={x(item.year) - 6} x2={x(item.year) + 6} y1={ciTop} y2={ciTop} />
                  <line className="chart-whisker" x1={x(item.year) - 6} x2={x(item.year) + 6} y1={ciBottom} y2={ciBottom} />
                </g>
              )}
              <circle className={isLatest ? "chart-dot chart-dot--lead" : "chart-dot"} cx={x(item.year)} cy={y(item.estimatePercent)} r={5} />
              <text
                className="chart-label-value"
                x={isLatest ? x(item.year) - 12 : x(item.year)}
                y={y(item.estimatePercent) - 14}
                textAnchor={isLatest ? "end" : "middle"}
              >
                {item.estimatePercent.toFixed(2)}%
              </text>
              <text className="chart-label-date" x={x(item.year)} y={bottom + 24} textAnchor="middle">{item.year}</text>
            </g>
          );
        })}
        <text className="chart-refline-label" x={x(povertyLatest.year) + 10} y={ciTop - 8}>
          {povertyLatest.confidenceLevelPercent}% CI: {povertyLatest.lowerBoundPercent.toFixed(2)}%–{povertyLatest.upperBoundPercent.toFixed(2)}%
        </text>
      </svg>
    );
  }

  function BarangayChart() {
    const width = 1120;
    const rowHeight = 26;
    const firstRow = 66;
    const barX = 160;
    const barMax = 900;
    const domainMax = 3200;
    const height = firstRow + (rankedBarangays.length - 1) * rowHeight + 28;
    const rowY = (index: number) => firstRow + index * rowHeight;
    const barWidth = (value: number) => (value / domainMax) * barMax;
    const medianX = barX + (medianPopulation / domainMax) * barMax;
    return (
      <svg
        role="img"
        aria-label={`Bar chart ranking all ${rankedBarangays.length} barangays by ${year(barangays.data.populationReferenceDate)} census population, from ${largestBarangay.name} at ${fmt(largestBarangay.population)} to ${smallestBarangay.name} at ${fmt(smallestBarangay.population)}, with the computed median of ${fmt(medianPopulation)} marked. Urban barangays are shaded solid. Full data in the table below.`}
        className="chart-svg chart-barangays"
        viewBox={`0 0 ${width} ${height}`}
      >
        <g aria-hidden="true">
          <rect className="chart-swatch chart-swatch--lead" x={16} y={10} width={12} height={12} rx={2} />
          <text className="chart-tick-label" x={34} y={20}>Urban ({urbanBarangays.length})</text>
          <rect className="chart-swatch" x={130} y={10} width={12} height={12} rx={2} />
          <text className="chart-tick-label" x={148} y={20}>Rural ({rankedBarangays.length - urbanBarangays.length})</text>
        </g>
        <line className="chart-refline" aria-hidden="true" x1={medianX} x2={medianX} y1={40} y2={height - 8} />
        <text className="chart-refline-label" x={medianX + 8} y={50}>median {fmt(medianPopulation)} (computed)</text>
        {rankedBarangays.map((item, index) => {
          const width2 = barWidth(item.population);
          const isUrban = item.classification === "Urban";
          return (
            <g key={item.name}>
              <text className="chart-label-date" x={16} y={rowY(index) + 4}>{item.name}</text>
              <rect
                className={isUrban ? "chart-bar chart-bar--lead" : "chart-bar"}
                x={barX}
                y={rowY(index) - 8}
                width={width2}
                height={16}
                rx={2}
              />
              <text className="chart-tick-label chart-label-num" x={barX + width2 + 6} y={rowY(index) + 4}>{fmt(item.population)}</text>
            </g>
          );
        })}
      </svg>
    );
  }
}
