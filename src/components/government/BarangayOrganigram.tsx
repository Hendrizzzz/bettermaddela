"use client";

/**
 * Barangay organigram — /government/barangays/[slug].
 *
 * Top-down chart: the punong barangay card forks into three branch cards
 * (Sangguniang Barangay, Sangguniang Kabataan, appointed officers). Names
 * render verbatim as listed in the reviewed DILG record — no casing
 * transforms, and seats absent from the source are omitted entirely.
 *
 * Motion: one GSAP timeline cascades root → connectors → branches → rows,
 * once; skipped entirely under prefers-reduced-motion; content is never
 * hidden by CSS before the animation runs.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TermPips } from "@/components/government/TermPips";
import { monogramInitials } from "@/lib/monogram";

export interface OrganigramEntry {
  position: string;
  termOrdinal: string | null;
  name: string;
  email: string | null;
  telephone: string | null;
}

interface OrganigramOfficials {
  punongBarangay?: OrganigramEntry;
  members: OrganigramEntry[];
  skChairperson?: OrganigramEntry;
  skMembers: OrganigramEntry[];
  treasurer?: OrganigramEntry;
  secretary?: OrganigramEntry;
  skSecretary?: OrganigramEntry;
  skTreasurer?: OrganigramEntry;
}

const OFFICER_ROLES = [
  ["Barangay Secretary", "secretary"],
  ["Barangay Treasurer", "treasurer"],
  ["SK Secretary", "skSecretary"],
  ["SK Treasurer", "skTreasurer"],
] as const;

function officerEntries(group: OrganigramOfficials) {
  return OFFICER_ROLES.flatMap((pair) => {
    const entry = group[pair[1]];
    return entry ? ([[pair[0], entry]] as const) : [];
  });
}

// The source attaches the same barangay office line to most officials of a
// barangay; render it once per branch instead of repeating it per person.
function sharedTelephone(entries: OrganigramEntry[]) {
  const phones = entries
    .map((entry) => entry.telephone)
    .filter((value): value is string => Boolean(value));
  return new Set(phones).size === 1 && phones.length > 1 ? phones[0] : null;
}

function OfficialContact({
  email,
  telephone,
}: {
  email: string | null | undefined;
  telephone: string | null | undefined;
}) {
  if (!email && !telephone) return null;
  return (
    <p className="brgy-prof-contact-line">
      {email && <a href={`mailto:${email}`}>{email}</a>}
      {email && telephone && <span aria-hidden="true"> · </span>}
      {telephone && <a href={`tel:${telephone}`}>{telephone}</a>}
    </p>
  );
}

export default function BarangayOrganigram({
  officials,
}: {
  officials: OrganigramOfficials;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const officers = officerEntries(officials);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.5, ease: "power3.out" },
        scrollTrigger: { trigger: root, start: "top 82%", once: true },
      });

      tl.fromTo("[data-borg-root]", { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0 })
        .fromTo(
          "[data-borg-stem]",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.3, ease: "power1.inOut" },
          "-=0.15",
        )
        .fromTo(
          "[data-borg-bar]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.3, ease: "power1.inOut" },
          "-=0.1",
        )
        .fromTo(
          "[data-borg-drop]",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.25, stagger: 0.06 },
          "-=0.05",
        )
        .fromTo(
          "[data-borg-branch]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, stagger: 0.1 },
          "-=0.1",
        )
        .fromTo(
          "[data-borg-row]",
          { autoAlpha: 0, x: -10 },
          { autoAlpha: 1, x: 0, duration: 0.35, stagger: 0.025 },
          "<0.08",
        )
        .fromTo(
          "[data-borg-foot]",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.3 },
          "<0.1",
        );
    }, root);

    return () => ctx.revert();
  }, []);

  const pb = officials.punongBarangay;
  const sbShared = sharedTelephone(officials.members);
  const skRoster = [
    ...(officials.skChairperson ? [officials.skChairperson] : []),
    ...officials.skMembers,
  ];
  const skShared = sharedTelephone(skRoster);
  const officerShared = sharedTelephone(officers.map(([, entry]) => entry));

  return (
    <div className="brgy-org" ref={rootRef}>
      {pb && (
        <>
          <article className="brgy-prof-lead brgy-org-root" data-borg-root>
            <span className="brgy-prof-mono brgy-prof-mono--lg brgy-prof-mono--featured" aria-hidden="true">
              {monogramInitials(pb.name)}
            </span>
            <div className="brgy-prof-lead-body">
              <p className="brgy-prof-lead-role">Punong Barangay</p>
              <p className="brgy-prof-lead-name">{pb.name}</p>
              {pb.termOrdinal && (
                <p className="brgy-prof-lead-term">
                  <TermPips ordinal={pb.termOrdinal} />
                  <span>{pb.termOrdinal} term</span>
                </p>
              )}
              <OfficialContact email={pb.email} telephone={pb.telephone} />
            </div>
          </article>
          {officials.members.length > 0 && (
            <div className="brgy-org-fork" aria-hidden="true">
              <span className="brgy-org-stem" data-borg-stem />
              <div className="brgy-org-rail">
                <span className="brgy-org-rail-bar" data-borg-bar />
                <span className="brgy-org-drop brgy-org-drop--1" data-borg-drop />
                <span className="brgy-org-drop brgy-org-drop--2" data-borg-drop />
                <span className="brgy-org-drop brgy-org-drop--3" data-borg-drop />
              </div>
            </div>
          )}
        </>
      )}
      <div className="brgy-org-branches">
        {officials.members.length > 0 && (
          <section
            className="brgy-org-branch"
            aria-label={`${officials.members.length} Sangguniang Barangay members as listed`}
            data-borg-branch
          >
            <header className="brgy-prof-roster-head">
              <h3 className="brgy-prof-group-label">
                <i className="bi bi-people-fill" aria-hidden="true" />
                Sangguniang Barangay
              </h3>
              <span className="brgy-prof-roster-count">{officials.members.length} listed</span>
            </header>
            <ul className="brgy-org-rows">
              {officials.members.map((member, index) => (
                <li key={member.name} className="brgy-org-row" data-borg-row>
                  <span className="brgy-org-avatar brgy-org-avatar--num" aria-hidden="true">
                    {`0${index + 1}`}
                  </span>
                  <span className="brgy-org-name">{member.name}</span>
                  {member.termOrdinal && <TermPips ordinal={member.termOrdinal} />}
                </li>
              ))}
            </ul>
            {sbShared && (
              <p className="brgy-prof-office-line" data-borg-foot>
                Office line <a href={`tel:${sbShared}`}>{sbShared}</a>
              </p>
            )}
          </section>
        )}
        {skRoster.length > 0 && (
          <section
            className="brgy-org-branch"
            aria-label="Sangguniang Kabataan council as listed"
            data-borg-branch
          >
            <header className="brgy-prof-roster-head">
              <h3 className="brgy-prof-group-label">
                <img
                  src="/assets/images/logo/sangguniang-kabataan-logo.svg"
                  alt=""
                  className="brgy-prof-org-mark"
                />
                Sangguniang Kabataan
              </h3>
              <span className="brgy-prof-roster-count">{skRoster.length} listed</span>
            </header>
            <ul className="brgy-org-rows">
              {officials.skChairperson && (
                <li key="sk-chairperson" className="brgy-org-row" data-borg-row>
                  <span className="brgy-org-avatar brgy-org-avatar--chair" aria-hidden="true">
                    {monogramInitials(officials.skChairperson.name)}
                  </span>
                  <span className="brgy-org-person">
                    <span className="brgy-org-name">{officials.skChairperson.name}</span>
                    <span className="brgy-org-meta">Chairperson</span>
                  </span>
                  {officials.skChairperson.termOrdinal && (
                    <TermPips ordinal={officials.skChairperson.termOrdinal} />
                  )}
                </li>
              )}
              {officials.skMembers.map((member) => (
                <li key={member.name} className="brgy-org-row" data-borg-row>
                  <span className="brgy-org-avatar" aria-hidden="true">
                    {monogramInitials(member.name)}
                  </span>
                  <span className="brgy-org-name">{member.name}</span>
                  {member.termOrdinal && <TermPips ordinal={member.termOrdinal} />}
                </li>
              ))}
            </ul>
            {skShared && (
              <p className="brgy-prof-office-line" data-borg-foot>
                Office line <a href={`tel:${skShared}`}>{skShared}</a>
              </p>
            )}
          </section>
        )}
        {officers.length > 0 && (
          <section
            className="brgy-org-branch"
            aria-label="Appointed barangay officers as listed"
            data-borg-branch
          >
            <header className="brgy-prof-roster-head">
              <h3 className="brgy-prof-group-label">
                <i className="bi bi-person-badge-fill" aria-hidden="true" />
                Appointed officers
              </h3>
              <span className="brgy-prof-roster-count">{officers.length} listed</span>
            </header>
            <ul className="brgy-org-rows">
              {officers.map(([role, entry]) => (
                <li key={role} className="brgy-org-row" data-borg-row>
                  <span className="brgy-org-avatar" aria-hidden="true">
                    {monogramInitials(entry.name)}
                  </span>
                  <span className="brgy-org-person">
                    <span className="brgy-org-name">{entry.name}</span>
                    <span className="brgy-org-meta">{role}</span>
                  </span>
                  {entry.termOrdinal && <TermPips ordinal={entry.termOrdinal} />}
                </li>
              ))}
            </ul>
            {officerShared && (
              <p className="brgy-prof-office-line" data-borg-foot>
                Office line <a href={`tel:${officerShared}`}>{officerShared}</a>
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
