import type { Metadata } from "next";
import { RecordMeta } from "@/components/RecordMeta";
import { getRecord } from "@/data/civic";

export const metadata: Metadata = { title: "Population" };

interface CurrentData {
  population: number;
  census: string;
  referenceDate: string;
}

export default function PopulationPage() {
  const current = getRecord<CurrentData>("population-2024-popcen");

  return (
    <div className="shell page-shell">
      <header className="page-heading">
        <p className="eyebrow">Verified statistics</p>
        <h1>Population</h1>
        <p>
          Maddela recorded {current.data.population.toLocaleString("en-PH")} people in
          the {current.data.census}, with a reference date of {current.data.referenceDate}.
        </p>
        <RecordMeta record={current} />
      </header>

      <section className="unavailable-panel" aria-labelledby="population-gaps-heading">
        <div>
          <p className="eyebrow">Evidence boundary</p>
          <h2 id="population-gaps-heading">Historical series withheld</h2>
        </div>
        <p>
          Earlier census counts and growth rates remain unpublished until their
          source file can be independently recovered and integrity-checked.
        </p>
      </section>
    </div>
  );
}
