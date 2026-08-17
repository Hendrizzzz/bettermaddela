import Link from "next/link";
import type { CivicRecord } from "@/data/civic";

interface RecordLink {
  label: string;
  record: CivicRecord;
}

export function RecordMeta({ record }: { record: CivicRecord }) {
  return (
    <p className="record-meta">
      Verified <time dateTime={record.lastVerified}>{record.lastVerified}</time>
      {" · "}
      Review by <time dateTime={record.nextReviewOn}>{record.nextReviewOn}</time>
      {" · "}
      <Link href={`/sources#record-${record.id}`}>View sources</Link>
    </p>
  );
}

export function RecordMetaGroup({ records }: { records: RecordLink[] }) {
  return (
    <p className="record-meta">
      Sources and review details:{" "}
      {records.map(({ label, record }, index) => (
        <span key={record.id}>
          {index > 0 && ", "}
          <Link href={`/sources#record-${record.id}`}>{label}</Link>
        </span>
      ))}
    </p>
  );
}
