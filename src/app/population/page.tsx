import type { Metadata } from "next";
import { RecordMeta } from "@/components/RecordMeta";
import { getRecord } from "@/data/civic";

export const metadata: Metadata = {
  title: "Population",
  description:
    "Maddela's reviewed census population history and PSA annual population growth rates.",
};

interface CurrentData {
  population: number;
  census: string;
  referenceDate: string;
}

interface PopulationHistoryData {
  series: Array<{
    referenceDate: string;
    population: number;
  }>;
}

interface PopulationGrowthData {
  measure: string;
  series: Array<{
    period: string;
    percent: number;
  }>;
}

export default function PopulationPage() {
  const current = getRecord<CurrentData>("population-2024-popcen");
  const history = getRecord<PopulationHistoryData>("population-history-2000-2024");
  const growth = getRecord<PopulationGrowthData>("population-growth-rates");

  return (
    <div className="shell page-shell">
      <header className="page-heading">
        <h1>Population</h1>
        <p>
          Maddela recorded {current.data.population.toLocaleString("en-PH")} people in
          the {current.data.census}, with a reference date of {current.data.referenceDate}.
        </p>
        <RecordMeta record={current} />
      </header>

      <section className="data-section" aria-labelledby="population-history-heading">
        <h2 id="population-history-heading">Census population history</h2>
        <div className="table-wrap compact-table">
          <table>
            <caption>Published census counts for Maddela</caption>
            <thead>
              <tr>
                <th scope="col">Reference date</th>
                <th scope="col" className="numeric">Population</th>
              </tr>
            </thead>
            <tbody>
              {history.data.series.map((entry) => (
                <tr key={entry.referenceDate}>
                  <th scope="row"><time dateTime={entry.referenceDate}>{entry.referenceDate}</time></th>
                  <td className="numeric">{entry.population.toLocaleString("en-PH")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="table-note">These are dated census counts, not live population estimates.</p>
        <RecordMeta record={history} />
      </section>

      <section className="data-section" aria-labelledby="population-growth-heading">
        <h2 id="population-growth-heading">Annual population growth rates</h2>
        <div className="table-wrap compact-table">
          <table>
            <caption>{growth.data.measure}</caption>
            <thead>
              <tr>
                <th scope="col">Period</th>
                <th scope="col" className="numeric">Rate</th>
              </tr>
            </thead>
            <tbody>
              {growth.data.series.map((entry) => (
                <tr key={entry.period}>
                  <th scope="row">{entry.period}</th>
                  <td className="numeric">{entry.percent.toFixed(2)}&#37;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="table-note">
          Period labels and rates are reproduced from the PSA table; the values are not recomputed.
        </p>
        <RecordMeta record={growth} />
      </section>
    </div>
  );
}
