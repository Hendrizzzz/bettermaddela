"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { monogramInitials } from "@/lib/monogram";
import { TermPips } from "@/components/government/TermPips";

export interface DirectoryEntry {
  name: string;
  position: string;
  bucket: "pb" | "sb" | "sk" | "officer";
  termOrdinal: string | null;
  email: string | null;
  telephone: string | null;
}

export interface DirectoryGroup {
  barangay: string;
  slug: string;
  entries: DirectoryEntry[];
  officeLine: string | null;
}

type RoleFilter = "all" | "pb" | "sb" | "sk" | "officer";

const ROLE_FILTERS: { value: RoleFilter; label: string }[] = [
  { value: "all", label: "All positions" },
  { value: "pb", label: "Punong Barangay" },
  { value: "sb", label: "Sangguniang Barangay" },
  { value: "sk", label: "Sangguniang Kabataan" },
  { value: "officer", label: "Appointed officers" },
];

function entryRoleLabel(entry: DirectoryEntry) {
  if (entry.position === "Sangguniang Barangay Member") return null;
  return entry.position;
}

function DirectoryTile({ entry, telephone }: { entry: DirectoryEntry; telephone: string | null }) {
  const role = entryRoleLabel(entry);
  const isLead = entry.bucket === "pb";
  return (
    <li className={`brgy-prof-tile${isLead ? " brgy-prof-tile--featured" : ""}`}>
      <span className={`brgy-prof-mono${isLead ? " brgy-prof-mono--featured" : ""}`} aria-hidden="true">
        {monogramInitials(entry.name)}
      </span>
      <span className="brgy-prof-tile-body">
        {role && (
          <span className="brgy-prof-tile-role">
            {entry.bucket === "sk" ? (
              <img
                src="/assets/images/logo/sangguniang-kabataan-logo.svg"
                alt=""
                className="brgy-prof-org-mark brgy-prof-org-mark--sm"
              />
            ) : (
              <i
                className={`bi ${isLead ? "bi-star-fill" : entry.bucket === "officer" ? "bi-clipboard2-check" : "bi-person-badge"}`}
                aria-hidden="true"
              />
            )}
            {role}
          </span>
        )}
        <span className="brgy-prof-tile-name">{entry.name}</span>
        <TermPips ordinal={entry.termOrdinal} />
        {(entry.email || telephone) && (
          <span className="brgy-prof-contact-line">
            {entry.email && (
              <a href={`mailto:${entry.email}`}>
                <i className="bi bi-envelope" aria-hidden="true" /> Email
              </a>
            )}
            {entry.email && telephone && <span aria-hidden="true"> · </span>}
            {telephone && (
              <a href={`tel:${telephone}`}>
                <i className="bi bi-telephone" aria-hidden="true" /> {telephone}
              </a>
            )}
          </span>
        )}
      </span>
    </li>
  );
}

export function OfficialsDirectory({
  groups,
  totalCount,
  barangayCount,
  maps,
}: {
  groups: DirectoryGroup[];
  totalCount: number;
  barangayCount: number;
  maps?: Record<string, ReactNode>;
}) {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<RoleFilter>("all");
  const [barangay, setBarangay] = useState("all");
  const [contactOnly, setContactOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return groups
      .filter((group) => barangay === "all" || group.barangay === barangay)
      .map((group) => ({
        ...group,
        entries: group.entries.filter(
          (entry) =>
            (role === "all" || entry.bucket === role) &&
            (!contactOnly || Boolean(entry.email || entry.telephone)) &&
            (!q ||
              entry.name.toLowerCase().includes(q) ||
              group.barangay.toLowerCase().includes(q) ||
              entry.position.toLowerCase().includes(q)),
        ),
      }))
      .filter((group) => group.entries.length > 0);
  }, [groups, query, role, barangay, contactOnly]);

  const shownCount = filtered.reduce((sum, group) => sum + group.entries.length, 0);
  const hasFilters = query.trim() !== "" || role !== "all" || barangay !== "all" || contactOnly;

  function clearFilters() {
    setQuery("");
    setRole("all");
    setBarangay("all");
    setContactOnly(false);
  }

  return (
    <div className="brgy-dir">
      <div className="brgy-dir-toolbar" role="group" aria-label="Directory filters">
        <div className="brgy-dir-field brgy-dir-field--search">
          <i className="bi bi-search" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a name, barangay, or position"
            aria-label="Search officials by name, barangay, or position"
          />
        </div>
        <div className="brgy-dir-field">
          <select
            value={barangay}
            onChange={(event) => setBarangay(event.target.value)}
            aria-label="Filter by barangay"
          >
            <option value="all">All {barangayCount} barangays</option>
            {groups.map((group) => (
              <option key={group.slug} value={group.barangay}>
                {group.barangay}
              </option>
            ))}
          </select>
        </div>
        <label className="brgy-dir-check">
          <input
            type="checkbox"
            checked={contactOnly}
            onChange={(event) => setContactOnly(event.target.checked)}
          />
          Has published contact
        </label>
      </div>

      <div className="brgy-dir-toolbar brgy-dir-toolbar--chips" role="group" aria-label="Filter by position">
        {ROLE_FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className="brgy-dir-chip"
            aria-pressed={role === filter.value}
            onClick={() => setRole(filter.value)}
          >
            {filter.label}
          </button>
        ))}
        {hasFilters && (
          <button type="button" className="brgy-dir-clear" onClick={clearFilters}>
            <i className="bi bi-x-circle" aria-hidden="true" /> Clear filters
          </button>
        )}
      </div>

      <p className="brgy-dir-count" aria-live="polite">
        Showing {shownCount.toLocaleString("en-PH")} of {totalCount.toLocaleString("en-PH")} listed
        officials across {filtered.length} {filtered.length === 1 ? "barangay" : "barangays"}.
      </p>

      {filtered.length === 0 ? (
        <div className="brgy-dir-empty">
          <i className="bi bi-person-x" aria-hidden="true" />
          <p>No listed official matches these filters.</p>
          <button type="button" className="btn btn-secondary" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="brgy-dir-groups">
          {filtered.map((group) => (
            <section key={group.slug} className="brgy-dir-group" aria-labelledby={`brgy-dir-${group.slug}`}>
              <header className="brgy-dir-group-head">
                {maps?.[group.slug] && (
                  <div className="brgy-dir-group-map" aria-hidden="true">
                    {maps[group.slug]}
                  </div>
                )}
                <h2 id={`brgy-dir-${group.slug}`}>{group.barangay}</h2>
                <span className="brgy-dir-group-count">
                  {group.entries.length} listed
                </span>
                <Link className="brgy-dir-group-link" href={`/government/barangays/${group.slug}`}>
                  Barangay profile <i className="bi bi-arrow-right" aria-hidden="true" />
                </Link>
              </header>
              {group.officeLine && (
                <p className="brgy-prof-office-line">
                  Office line{" "}
                  <a href={`tel:${group.officeLine}`}>{group.officeLine}</a>{" "}
                  — shared by listed officials of this barangay
                </p>
              )}
              <ul className="brgy-prof-tile-grid brgy-dir-grid">
                {group.entries.map((entry) => (
                  <DirectoryTile
                    key={`${entry.position}-${entry.name}`}
                    entry={entry}
                    telephone={group.officeLine ? null : entry.telephone}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
