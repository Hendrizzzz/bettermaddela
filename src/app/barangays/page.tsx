import type { Metadata } from "next";
import { RecordMeta } from "@/components/RecordMeta";
import { getRecord } from "@/data/civic";

export const metadata: Metadata = {
  title: "Barangays",
  description:
    "The reviewed PSA list of Maddela's 32 barangays, with PSGC codes, classifications, and 2024 population counts.",
};

interface Barangay {
  name: string;
  psgcCode: string;
  correspondenceCode: string;
  classification: "Urban" | "Rural";
  population: number;
}
interface BarangayData {
  barangayCount: number;
  psgcPublicationDate: string;
  populationReferenceDate: string;
  urbanRuralBasis: string;
  barangays: Barangay[];
}

export default function BarangaysPage() {
  const record = getRecord<BarangayData>("barangay-dataset-2026q2");

  return (
    <div className="shell page-shell">
      <header className="page-heading">
        <p className="eyebrow">PSA geographic data</p>
        <h1>Maddela’s {record.data.barangayCount} barangays</h1>
        <p>
          The list preserves the PSA names, codes, classification, and 2024 POPCEN
          population values exactly. Population reference date: {record.data.populationReferenceDate}.
        </p>
        <RecordMeta record={record} />
      </header>

      <div
        aria-label="Complete Maddela barangay list"
        className="table-wrap wide-table"
        role="region"
        tabIndex={0}
      >
        <table>
          <caption>Complete Maddela barangay list from the second-quarter 2026 PSGC publication</caption>
          <thead>
            <tr>
              <th scope="col">Barangay</th>
              <th scope="col">PSGC code</th>
              <th scope="col">Correspondence code</th>
              <th scope="col">Class</th>
              <th scope="col" className="numeric">2024 population</th>
            </tr>
          </thead>
          <tbody>
            {record.data.barangays.map((barangay) => (
              <tr key={barangay.psgcCode}>
                <th scope="row">{barangay.name}</th>
                <td><code>{barangay.psgcCode}</code></td>
                <td><code>{barangay.correspondenceCode}</code></td>
                <td><span className={`classification classification-${barangay.classification.toLowerCase()}`}>{barangay.classification}</span></td>
                <td className="numeric">{barangay.population.toLocaleString("en-PH")}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr><th scope="row" colSpan={4}>Total</th><td className="numeric">41,867</td></tr>
          </tfoot>
        </table>
      </div>
      <p className="table-note">
        Urban/rural basis: {record.data.urbanRuralBasis}. The total is recomputed by the data validator.
      </p>
    </div>
  );
}
