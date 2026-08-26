"use client";

/**
 * Government structure explainer — visual org chart of Philippine municipal
 * government as it applies to Maddela.
 *
 * Data discipline:
 * - General civic-law structure comes from the Local Government Code (RA 7160)
 *   and is cited in the chart footnote.
 * - Incumbent names come ONLY from the reviewed `maddela-leadership-snapshot`
 *   record, passed in as props by the server page. Every seat without a
 *   reviewed incumbent renders an identical "Not yet verified" withheld state.
 *
 * Motion: GSAP ScrollTrigger, staggered cascade top-down, once, under ~1.2s,
 * skipped entirely under prefers-reduced-motion.
 */

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface VerifiedIncumbent {
  name: string;
  asOf: string;
}

interface StructureChartProps {
  mayor?: VerifiedIncumbent | null;
}

const LINE_OFFICES = [
  "Planning & Development",
  "Engineering",
  "Health",
  "Social Welfare",
  "Agriculture",
  "Treasurer",
  "Accountant",
  "Civil Registrar",
  "Human Resources",
] as const;

const EX_OFFICIO_SEATS = [
  {
    title: "ABC President",
    detail: "Liga ng mga Barangay — represents all barangay captains",
  },
  {
    title: "SK Federation President",
    detail: "Sangguniang Kabataan federation",
  },
  {
    title: "IPMR",
    detail: "Indigenous Peoples Mandatory Representative, where applicable",
  },
] as const;

function NotYetVerified({ context }: { context: string }) {
  return <span className="govt-unverified">Not yet verified — {context}</span>;
}

export default function StructureChart({ mayor }: StructureChartProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray<HTMLElement>("[data-gsx-node]", root);
      const lines = gsap.utils.toArray<HTMLElement>("[data-gsx-line]", root);
      gsap.fromTo(
        nodes,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.04,
          scrollTrigger: { trigger: root, start: "top 82%", once: true },
        },
      );
      gsap.fromTo(
        lines,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.35,
          ease: "power1.out",
          scrollTrigger: { trigger: root, start: "top 82%", once: true },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="govt-chart" ref={rootRef}>
      {/* Tier 1 — "You are here" context */}
      <nav className="govt-context" data-gsx-node aria-label="Where Maddela sits in the government hierarchy">
        <span className="govt-context-item">Republic of the Philippines</span>
        <span className="govt-context-sep" aria-hidden="true">&rarr;</span>
        <span className="govt-context-item">Province of Quirino</span>
        <span className="govt-context-sep" aria-hidden="true">&rarr;</span>
        <strong className="govt-context-item govt-context-item--here">Municipality of Maddela</strong>
      </nav>

      <div aria-hidden="true" data-gsx-line className="govt-link-line" />

      {/* Tier 2 — Executive */}
      <section className="govt-tier" aria-labelledby="govt-tier-executive-h">
        <h3 id="govt-tier-executive-h" className="govt-tier-heading">Executive</h3>
        <article className="govt-card govt-card--mayor" data-gsx-node>
          <h4 className="govt-card-title">Municipal Mayor</h4>
          <p className="govt-card-role">
            Chief executive — executes laws and runs the municipal government.
          </p>
          <p className="govt-card-term">Three-year term · maximum of three consecutive terms.</p>
          {mayor ? (
            <p className="govt-incumbent">
              <span className="govt-incumbent-name">{mayor.name}</span>
              <span className="govt-incumbent-asof">
                Verified as of{" "}
                <time dateTime={mayor.asOf}>{mayor.asOf}</time>
              </span>
            </p>
          ) : (
            <NotYetVerified context="no reviewed incumbent on record" />
          )}
        </article>
      </section>

      <div aria-hidden="true" data-gsx-line className="govt-link-line" />

      {/* Tier 3 — Legislature */}
      <section className="govt-tier" aria-labelledby="govt-tier-legislature-h">
        <h3 id="govt-tier-legislature-h" className="govt-tier-heading">Legislature</h3>
        <div className="govt-tier-split-grid">
          <article className="govt-card" data-gsx-node>
            <h4 className="govt-card-title">Municipal Vice Mayor</h4>
            <p className="govt-card-role">
              Presides over the Sangguniang Bayan; first in line of succession to the mayor.
            </p>
            <NotYetVerified context="no reviewed incumbent on record" />
          </article>

          <article className="govt-card govt-card--sb" data-gsx-node>
            <h4 className="govt-card-title">Sangguniang Bayan</h4>
            <p className="govt-card-role">
              The municipal legislative council — passes local ordinances and resolutions.
            </p>
            <div className="govt-seats">
              <ul className="govt-seat-row">
                {Array.from({ length: 8 }, (_, index) => (
                  <li key={`regular-seat-${index + 1}`} className="govt-seat" />
                ))}
              </ul>
              <p className="govt-seats-caption">8 elected regular member seats</p>
              <ul className="govt-exofficio">
                {EX_OFFICIO_SEATS.map((seat) => (
                  <li key={seat.title} className="govt-exofficio-seat">
                    <span className="govt-exofficio-title">{seat.title}</span>
                    <span className="govt-exofficio-detail">{seat.detail}</span>
                    <NotYetVerified context="no reviewed incumbent on record" />
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>

      <div aria-hidden="true" data-gsx-line className="govt-link-line" />

      {/* Tier 4 — Appointed line offices */}
      <section className="govt-tier" aria-labelledby="govt-tier-offices-h">
        <h3 id="govt-tier-offices-h" className="govt-tier-heading">Municipal line offices</h3>
        <div className="govt-offices" data-gsx-node>
          <ul className="govt-office-grid">
            {LINE_OFFICES.map((office) => (
              <li key={office} className="govt-office-chip">{office}</li>
            ))}
          </ul>
          <p className="govt-office-note">
            These appointed offices serve the mayor&rsquo;s executive function. Individual
            office heads are not shown here — dated office-head observations are published
            separately below.
          </p>
        </div>
      </section>

      <div aria-hidden="true" data-gsx-line className="govt-link-line" />

      {/* Tier 5 — Barangays */}
      <section className="govt-tier" aria-labelledby="govt-tier-barangays-h">
        <h3 id="govt-tier-barangays-h" className="govt-tier-heading">Barangay level</h3>
        <Link href="/barangays" className="govt-card govt-card--barangay" data-gsx-node>
          <h4 className="govt-card-title">32 Barangays</h4>
          <p className="govt-card-role">
            Each led by a Punong Barangay with a Sangguniang Barangay; captains federate
            upward through the ABC.
          </p>
          <span className="govt-unverified">Barangay officials not yet verified</span>
          <span className="govt-card-cta">Browse the barangay directory &rarr;</span>
        </Link>
      </section>

      {/* Footnote — statutory citation + evidence gate */}
      <footer className="govt-footnote" data-gsx-node>
        <p>
          Structure per the Local Government Code (RA 7160): mayoral powers (Sec. 444),
          terms of office and succession (Secs. 43&ndash;44), Sangguniang Bayan composition
          and powers (Secs. 446&ndash;447), appointed line offices (Secs. 477&ndash;488),
          barangay organization (Secs. 387&ndash;389).
        </p>
        <p className="govt-evidence-note">
          Names appear only when a reviewed source passes this project&rsquo;s publication
          gate; every other seat keeps a designed &ldquo;not yet verified&rdquo; state
          instead of a guess. <Link href="/sources">How evidence is gated</Link>.
        </p>
      </footer>
    </div>
  );
}
