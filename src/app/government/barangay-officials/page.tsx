import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { RecordMeta } from "@/components/RecordMeta";
import {
  OfficialsDirectory,
  type DirectoryEntry,
  type DirectoryGroup,
} from "@/components/government/OfficialsDirectory";
import { getRecord } from "@/data/civic";
import { slugify } from "@/lib/slugify";

interface BarangayEntry {
  name: string;
  psgcCode: string;
  correspondenceCode: string;
  classification: "Urban" | "Rural";
  population: number;
}

interface BarangayDataset {
  barangayCount: number;
  barangays: BarangayEntry[];
}

interface OfficialEntry {
  barangay: string;
  position: string;
  termOrdinal: string | null;
  name: string;
  email: string | null;
  telephone: string | null;
}

interface OfficialsDataset {
  listingBasis: string;
  termBasis: string;
  officials: OfficialEntry[];
  limitations: string;
}

const barangayRecord = getRecord<BarangayDataset>("barangay-dataset-2026q2");
const officialsRecord = getRecord<OfficialsDataset>("maddela-barangay-officials-2026-dilg-bops");

const POSITION_META: Record<string, { bucket: DirectoryEntry["bucket"]; order: number }> = {
  "Punong Barangay": { bucket: "pb", order: 0 },
  "Sangguniang Barangay Member": { bucket: "sb", order: 1 },
  "SK Chairperson": { bucket: "sk", order: 2 },
  "SK Member": { bucket: "sk", order: 3 },
  "Barangay Secretary": { bucket: "officer", order: 4 },
  "Barangay Treasurer": { bucket: "officer", order: 5 },
  "SK Secretary": { bucket: "officer", order: 6 },
  "SK Treasurer": { bucket: "officer", order: 7 },
};

// Groups follow the canonical reviewed barangay order; any position outside
// the known map still renders (bucketed as an appointed officer) so the
// directory can never silently drop a listed person.
const directoryGroups: DirectoryGroup[] = barangayRecord.data.barangays.flatMap((barangay) => {
  const entries = officialsRecord.data.officials.filter(
    (official) => official.barangay === barangay.name,
  );
  if (entries.length === 0) return [];
  const phones = entries
    .map((entry) => entry.telephone)
    .filter((value): value is string => Boolean(value));
  const officeLine =
    new Set(phones).size === 1 && phones.length > 1 ? phones[0] : null;
  const directoryEntries: DirectoryEntry[] = entries
    .map((entry) => ({
      ...entry,
      ...(POSITION_META[entry.position] ?? { bucket: "officer" as const, order: 8 }),
    }))
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
    .map(({ name, position, bucket, termOrdinal, email, telephone }) => ({
      name,
      position,
      bucket,
      termOrdinal,
      email,
      telephone,
    }));
  return [
    {
      barangay: barangay.name,
      slug: slugify(barangay.name),
      entries: directoryEntries,
      officeLine,
    },
  ];
});

const officialCount = officialsRecord.data.officials.length;
const emailCount = officialsRecord.data.officials.filter(
  (official) => official.email,
).length;

export const metadata: Metadata = {
  title: "Barangay officials directory",
  description:
    "Search every Maddela barangay official listed in the reviewed DILG Barangay Officials Profiling System record, with filters by barangay, position, and published contact.",
};

export default function BarangayOfficialsPage() {
  return (
    <>
      <PageHeader
        title="Barangay officials directory"
        description="Every listed official across the barangays of Maddela — search by name, or filter by barangay, position, and published contact."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Government", href: "/government" },
          { label: "Barangay officials" },
        ]}
      />
      <section className="section brgy-prof">
        <div className="container">
          <ul className="brgy-dir-stats">
            <li>
              <strong>{officialCount.toLocaleString("en-PH")}</strong> listed officials
            </li>
            <li>
              <strong>{directoryGroups.length}</strong> barangays
            </li>
            <li>
              <strong>{emailCount}</strong> published emails
            </li>
          </ul>
          <OfficialsDirectory
            groups={directoryGroups}
            totalCount={officialCount}
            barangayCount={directoryGroups.length}
          />
          <p className="brgy-prof-awaiting">
            Names are reproduced verbatim from the DILG Barangay Officials Profiling System
            (Region 2 masterlist export, August 2026). Term ordinals appear where the source
            states them; telephone numbers are shared barangay office lines, so a number
            identifies the barangay office rather than an individual official; emails are shown
            only where published. Seats not listed at source are omitted rather than shown as
            vacant, and the listing is re-checked monthly.
          </p>
          <RecordMeta record={officialsRecord} />
        </div>
      </section>
    </>
  );
}
