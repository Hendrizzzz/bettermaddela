"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type HistoryChipVariant = "gold" | "straw" | "outline" | "quiet";

export interface HistoryTimelineItem {
  /** Stable key for the list item. */
  key: string;
  /** Visual variant driving the node dot (mirrors the evidence kind). */
  kindClass: "law" | "tradition" | "context" | "gap";
  /** Big period/year label shown on the card. */
  period: string;
  /** ISO date for the period label, when it is a single calendar date. */
  periodDateTime?: string;
  chipLabel: string;
  chipVariant: HistoryChipVariant;
  heading: string;
  /** Card body rendered by the server page (summaries, details, provenance). */
  children: ReactNode;
}

/**
 * Vertical story timeline: staggered node reveals plus a rail that draws as
 * the reader scrolls. All motion is skipped entirely under
 * prefers-reduced-motion, and every tween is short (well under ~1.5s per
 * viewport). Without JavaScript the markup is fully visible and readable.
 */
export function HistoryTimeline({ items }: { items: HistoryTimelineItem[] }) {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const fill = frame.querySelector<HTMLElement>(".hst-line-fill");
      if (fill) {
        // The rail draws downward as the reader scrolls through the story.
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top 72%",
              end: "bottom 62%",
              scrub: 0.4,
            },
          },
        );
      }

      gsap.utils.toArray<HTMLElement>(".hst-item", frame).forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 86%", once: true },
          },
        );

        const dot = item.querySelector<HTMLElement>(".hst-dot");
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0.4, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "back.out(1.8)",
              scrollTrigger: { trigger: item, start: "top 86%", once: true },
            },
          );
        }
      });
    }, frame);

    return () => ctx.revert();
  }, []);

  return (
    <div className="hst-frame" ref={frameRef}>
      <div className="hst-line" aria-hidden="true">
        <span className="hst-line-fill" />
      </div>
      <ol className="hst-timeline">
        {items.map((item) => (
          <li key={item.key} className={`hst-item hst-item--${item.kindClass}`}>
            <span className="hst-dot" aria-hidden="true" />
            <article className="hst-card">
              <header className="hst-card-head">
                <p className="hst-period">
                  {item.periodDateTime ? (
                    <time dateTime={item.periodDateTime}>{item.period}</time>
                  ) : (
                    item.period
                  )}
                </p>
                <span className={`hst-chip hst-chip--${item.chipVariant}`}>
                  {item.chipLabel}
                </span>
              </header>
              <h2 className="hst-heading">{item.heading}</h2>
              {item.children}
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}