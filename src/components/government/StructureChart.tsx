"use client";

/**
 * Government structure diagram — /government.
 *
 * Visual tree, Linear/Stripe-style: nodes carry a role label, an incumbent's
 * name, and a verified date — nothing else. Seats without a reviewed
 * incumbent render an empty dashed-square marker (one shared legend below
 * the chart explains it once).
 *
 * Data discipline: incumbent names come ONLY from the reviewed
 * `maddela-leadership-snapshot` record passed in as props by the server page.
 *
 * Motion: one GSAP timeline draws connectors and cascades tiers top-down,
 * once, ~1s total; skipped entirely under prefers-reduced-motion; content is
 * never hidden by CSS before the animation runs.
 */

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface VerifiedIncumbent {
  name: string;
  asOf: string;
}

interface StructureChartProps {
  mayor?: VerifiedIncumbent | null;
  viceMayor?: VerifiedIncumbent | null;
  councilors?: { name: string }[];
}

const EX_OFFICIO_SEATS = [
  "ABC President",
  "SK Federation President",
  "IPMR",
] as const;

const OFFICE_ICONS: Record<string, ReactNode> = {
  "Planning & Development": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  Engineering: (
    <>
      <path d="M3 17L17 3l4 4L7 21z" />
      <path d="M7.5 12.5l2 2M10.5 9.5l2 2M13.5 6.5l2 2" />
    </>
  ),
  Health: <path d="M9.5 4h5v5.5H20v5h-5.5V20h-5v-5.5H4v-5h5.5z" />,
  "Social Welfare": (
    <path d="M12 20s-7-4.5-9-9c-1.3-3 .8-6.5 4-6.5 2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.2 0 5.3 3.5 4 6.5-2 4.5-9 9-9 9z" />
  ),
  Agriculture: (
    <>
      <path d="M12 21v-9" />
      <path d="M12 12C12 8.5 9.5 6 6 6c0 3.5 2.5 6 6 6z" />
      <path d="M12 10c0-2.8 2.2-5 5.5-5 0 3.2-2.2 5-5.5 5z" />
    </>
  ),
  Treasurer: (
    <>
      <circle cx="9.5" cy="9.5" r="5" />
      <circle cx="14.5" cy="14.5" r="5" />
    </>
  ),
  Accountant: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" />
    </>
  ),
  "Civil Registrar": (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 12h5M10 16h5" />
    </>
  ),
  "Human Resources": (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M4 19c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      <circle cx="16.5" cy="9" r="2.5" />
      <path d="M15.5 14.2c2.6.4 4.5 2.4 4.5 4.8" />
    </>
  ),
};

const LINE_OFFICES = Object.keys(OFFICE_ICONS);

function SeatMarker({ large = false }: { large?: boolean }) {
  return (
    <span
      className={large ? "govt-seat-empty govt-seat-empty--lg" : "govt-seat-empty"}
      role="img"
      aria-label="Not yet verified"
    />
  );
}

export default function StructureChart({ mayor, viceMayor, councilors }: StructureChartProps) {
  const seats = Array.from({ length: 8 }, (_, index) => councilors?.[index] ?? null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.4, ease: "power2.out" },
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });

      tl.fromTo(
        "[data-gsx-context]",
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0 },
      )
        .fromTo(
          "[data-gsx-mayor]",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0 },
          "-=0.2",
        )
        // Draw every connector downward.
        .fromTo(
          "[data-gsx-line]",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.35, ease: "power1.inOut", stagger: 0.05 },
          "-=0.1",
        )
        .fromTo(
          "[data-gsx-council]",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, stagger: 0.07 },
          "-=0.15",
        )
        // SB seat squares pop in.
        .fromTo(
          "[data-gsx-seat]",
          { scale: 0 },
          { scale: 1, duration: 0.28, ease: "back.out(2.2)", stagger: 0.025 },
          "<0.05",
        )
        .fromTo(
          "[data-gsx-office]",
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.015 },
          "<",
        )
        .fromTo(
          "[data-gsx-barangay]",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0 },
          ">-0.1",
        )
        .fromTo(
          "[data-gsx-meta]",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.3 },
          "<",
        );
    }, root);

    return () => ctx.revert();
  }, []);


  return (
    <div className="govt-chart" ref={rootRef}>
      {/* Factual context: Republic → Quirino → Maddela */}
      <nav
        className="govt-context"
        data-gsx-context
        aria-label="Where Maddela sits in the government hierarchy"
      >
        <span>Republic of the Philippines</span>
        <span className="govt-context-sep" aria-hidden="true">&rarr;</span>
        <span>Province of Quirino</span>
        <span className="govt-context-sep" aria-hidden="true">&rarr;</span>
        <strong className="govt-context-item--here">Municipality of Maddela</strong>
      </nav>

      {/* Tier 1 — Executive */}
      <article className="govt-node govt-node--mayor" data-gsx-mayor>
        <h3 className="govt-node-role">Mayor</h3>
        {mayor ? (
          <>
            <p className="govt-node-name">{mayor.name}</p>
            <p className="govt-node-asof">
              Verified <time dateTime={mayor.asOf}>{mayor.asOf}</time>
            </p>
          </>
        ) : (
          <SeatMarker large />
        )}
      </article>

      {/* Fork: mayor → vice mayor + sangguniang bayan */}
      <div className="govt-fork" aria-hidden="true">
        <span className="govt-link-line govt-link-line--stem" data-gsx-line />
        <div className="govt-fork-rail">
          <span
            className="govt-link-line govt-link-line--drop govt-link-line--drop-l"
            data-gsx-line
          />
          <span
            className="govt-link-line govt-link-line--drop govt-link-line--drop-r"
            data-gsx-line
          />
        </div>
      </div>

      {/* Tier 2 — Legislature */}
      <div className="govt-split">
        <article className="govt-node govt-node--vice" data-gsx-council>
          <h3 className="govt-node-role">Vice Mayor</h3>
          {viceMayor ? (
            <>
              <p className="govt-node-name">{viceMayor.name}</p>
              <p className="govt-node-asof">
                Term began <time dateTime={viceMayor.asOf}>{viceMayor.asOf}</time>
              </p>
            </>
          ) : (
            <SeatMarker large />
          )}
        </article>

        {/* Mobile-only connector between stacked branches */}
        <span
          className="govt-link-line govt-link-line--m-stem"
          aria-hidden="true"
          data-gsx-line
        />

        <article className="govt-node govt-node--sb" data-gsx-council>
          <h3 className="govt-node-role">Sangguniang Bayan</h3>
          <ul className="govt-seats" aria-label="8 elected regular member seats">
            {seats.map((member, index) => (
              <li key={`seat-${index + 1}`} className="govt-seat-cell" data-gsx-seat>
                {member ? (
                  <>
                    <span className="govt-seat govt-seat--filled" aria-hidden="true" />
                    <span className="govt-seat-name">{member.name}</span>
                  </>
                ) : (
                  <>
                    <span className="govt-seat" aria-hidden="true" />
                    <span className="govt-seat-name govt-seat-name--empty">Not yet verified</span>
                  </>
                )}
              </li>
            ))}
          </ul>
          <ul className="govt-exofficio">
            {EX_OFFICIO_SEATS.map((title) => (
              <li key={title} className="govt-exofficio-row">
                <span className="govt-exofficio-role">{title}</span>
                <SeatMarker />
              </li>
            ))}
          </ul>
        </article>
      </div>

      <span className="govt-link-line govt-link-line--solo" aria-hidden="true" data-gsx-line />

      {/* Tier 3 — Appointed line offices */}
      <section aria-labelledby="govt-offices-h">
        <h3 id="govt-offices-h" className="govt-tier-heading">Line offices</h3>
        <ul className="govt-offices">
          {LINE_OFFICES.map((office) => (
            <li key={office} className="govt-office" data-gsx-office>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                {OFFICE_ICONS[office]}
              </svg>
              <span>{office}</span>
            </li>
          ))}
        </ul>
      </section>

      <span className="govt-link-line govt-link-line--solo" aria-hidden="true" data-gsx-line />

      {/* Tier 4 — Barangays */}
      <Link href="/barangays" className="govt-node govt-node--barangay" data-gsx-barangay>
        <h3 className="govt-node-role">Barangays</h3>
        <p className="govt-node-name">32</p>
        <span className="govt-node-asof">Directory &rarr;</span>
      </Link>

      {/* Shared legend + statutory citation */}
      <p className="govt-legend" data-gsx-meta>
        <span className="govt-legend-swatch" aria-hidden="true" />
        not yet verified
      </p>
      <footer className="govt-footnote" data-gsx-meta>
        <p>
          Structure per the Local Government Code (RA 7160). Names appear only after
          review &mdash; <Link href="/sources">how evidence is gated</Link>.
        </p>
      </footer>
    </div>
  );
}
