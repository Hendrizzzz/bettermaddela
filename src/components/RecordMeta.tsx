"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import type { CivicRecord } from "@/data/civic";

interface RecordLink {
  label: string;
  record: CivicRecord;
}

export function RecordMeta({ record }: { record: CivicRecord }) {
  const { t } = useLanguage();
  return (
    <p className="record-meta">
      <Link href={`/sources#record-${record.id}`}>{t("record-view-sources")}</Link>
    </p>
  );
}

export function RecordMetaGroup({ records }: { records: RecordLink[] }) {
  const { t } = useLanguage();
  return (
    <p className="record-meta">
      {t("record-group-label")}{" "}
      {records.map(({ label, record }, index) => (
        <span key={record.id}>
          {index > 0 && ", "}
          <Link href={`/sources#record-${record.id}`}>{label}</Link>
        </span>
      ))}
    </p>
  );
}
