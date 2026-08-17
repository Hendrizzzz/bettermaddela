import recordsDocument from "./records.json";
import sourcesDocument from "./sources.json";

export type SourceType = "webpage" | "pdf" | "law" | "dataset";

export interface CivicSource {
  id: string;
  title: string;
  publisher: string;
  url: string;
  documentType: SourceType;
  publishedAt?: string;
  effectivePeriod?: string;
  retrievedAt: string;
  verifiedAt: string;
  verifier: string;
  sourceState: "active" | "superseded";
  sha256?: string;
  notes?: string;
}

export interface CivicRecord<TData = unknown> {
  id: string;
  type: string;
  label: string;
  data: TData;
  sourceIds: string[];
  claimSources: Record<string, string[]>;
  status: "verified";
  lastVerified: string;
  acceptedBy: string;
  acceptedAt: string;
  nextReviewOn: string;
  updateCadence: "annually" | "manual";
  owner: string;
  effectiveFrom?: string;
  effectiveTo?: string;
  notes?: string;
}

export const sources = sourcesDocument.sources as CivicSource[];
export const records = recordsDocument.records as unknown as CivicRecord[];

export function getRecord<TData>(id: string): CivicRecord<TData> {
  const record = records.find((item) => item.id === id);

  if (!record) {
    throw new Error(`Missing reviewed civic record: ${id}`);
  }

  return record as CivicRecord<TData>;
}

export function getSource(id: string): CivicSource {
  const source = sources.find((item) => item.id === id);

  if (!source) {
    throw new Error(`Missing civic source: ${id}`);
  }

  return source;
}

export function sourcesFor(record: CivicRecord): CivicSource[] {
  return record.sourceIds.map(getSource);
}
