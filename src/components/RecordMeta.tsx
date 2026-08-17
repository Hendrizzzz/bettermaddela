import Link from "next/link";
import type { CivicRecord } from "@/data/civic";

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
