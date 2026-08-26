"use client";

/*
 * BoardMotion — GSAP orchestration for the projects board.
 *
 * Everything runs inside gsap.matchMedia() with a prefers-reduced-motion
 * condition: reduced-motion users get the static server-rendered board with
 * no animation and no hidden content. All triggers are once:true.
 *
 * Choreography:
 *   1. blocks ([data-reveal]) stagger-rise as they enter the viewport;
 *   2. numbers ([data-count]) count up from zero on scroll-in
 *      (data-count-format="peso" formats as PHP currency);
 *   3. stage tracks draw their completed segments dot-by-dot
 *      (.proj-track-line-fill scaleX / scaleY per orientation).
 */

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function peso(value: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
  }).format(value);
}

export function BoardMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        isMobile: "(max-width: 720px)",
        animate: "(prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        if (ctx.conditions?.reduceMotion) return;
        const vertical = Boolean(ctx.conditions?.isMobile);

        // 1. Blocks stagger-rise on scroll-in.
        const blocks = gsap.utils.toArray<HTMLElement>("[data-reveal]", el);
        ScrollTrigger.batch(blocks, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { autoAlpha: 0, y: 36 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.09,
                overwrite: true,
              },
            ),
        });

        // 2. Numbers count up from zero.
        el.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
          const target = Number(node.dataset.count);
          if (!Number.isFinite(target)) return;
          const format = node.dataset.countFormat === "peso" ? peso : (v: number) =>
            String(Math.round(v));
          const state = { v: 0 };
          node.textContent = format(0);
          gsap.to(state, {
            v: target,
            duration: node.dataset.countFormat === "peso" ? 1.4 : 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: node, start: "top 88%", once: true },
            onUpdate: () => {
              node.textContent = format(state.v);
            },
          });
        });

        // 3. Stage tracks draw their completed segments in sequence.
        el.querySelectorAll<HTMLElement>(".proj-track").forEach((track) => {
          const fills = track.querySelectorAll<HTMLElement>(
            ".proj-track-step.done .proj-track-line-fill",
          );
          const dots = track.querySelectorAll<HTMLElement>(
            ".proj-track-step.done .proj-track-dot",
          );
          if (dots.length === 0) return;

          const tl = gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: { trigger: track, start: "top 88%", once: true },
          });

          dots.forEach((dot, i) => {
            const at = i * 0.26;
            if (i === 0) {
              tl.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.35 }, at);
            } else {
              const fill = fills[i - 1];
              if (fill) {
                tl.fromTo(
                  fill,
                  vertical ? { scaleY: 0 } : { scaleX: 0 },
                  vertical
                    ? { scaleY: 1, duration: 0.22, ease: "none" }
                    : { scaleX: 1, duration: 0.22, ease: "none" },
                  at,
                );
              }
              tl.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.35 }, at + 0.18);
            }
          });
        });
      },
      el,
    );

    return () => mm.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}
