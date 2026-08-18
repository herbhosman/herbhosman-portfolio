"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { BrowserFrame } from "@/components/snap/BrowserFrame";

type Props = {
  projects: Project[];
};

/** Ease-out quint — quick slide, firm settle (Dribbble “lock” feel). */
function easeOutQuint(t: number) {
  return 1 - Math.pow(1 - t, 5);
}

function animateScrollLeft(
  el: HTMLElement,
  target: number,
  duration = 680,
): Promise<void> {
  return new Promise((resolve) => {
    const start = el.scrollLeft;
    const delta = target - start;
    if (Math.abs(delta) < 1) {
      resolve();
      return;
    }
    const startTime = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      el.scrollLeft = start + delta * easeOutQuint(t);
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    };
    requestAnimationFrame(step);
  });
}

export function ProjectCarousel({ projects }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [detailKey, setDetailKey] = useState(0);
  const scrollingProgrammatically = useRef(false);
  const ignoreScrollEndUntil = useRef(0);

  const goTo = useCallback(
    async (next: number) => {
      const el = trackRef.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(projects.length - 1, next));
      const slide = el.querySelectorAll<HTMLElement>("[data-slide]")[clamped];
      if (!slide) return;

      const target =
        slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2;
      scrollingProgrammatically.current = true;
      // Disable snap during eased scroll so it doesn’t fight the animation
      el.style.scrollSnapType = "none";
      await animateScrollLeft(el, target);
      el.style.scrollSnapType = "";
      scrollingProgrammatically.current = false;
      ignoreScrollEndUntil.current = performance.now() + 120;
      setIndex(clamped);
      setDetailKey((k) => k + 1);
    },
    [projects.length],
  );

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const slides = () =>
      Array.from(el.querySelectorAll<HTMLElement>("[data-slide]"));

    /** Continuous scale/opacity from distance to center — mirrors the wine carousel. */
    const paint = () => {
      const list = slides();
      if (!list.length) return;
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;

      list.forEach((slide, i) => {
        const center = slide.offsetLeft + slide.offsetWidth / 2;
        const distPx = Math.abs(center - mid);
        const t = Math.min(1, distPx / Math.max(slide.offsetWidth * 0.92, 1));
        // Center: scale 1 / opacity 1 · Side: ~0.86 / ~0.38
        const scale = 1 - t * 0.14;
        const opacity = 1 - t * 0.62;
        slide.style.setProperty("--slide-scale", scale.toFixed(4));
        slide.style.setProperty("--slide-opacity", opacity.toFixed(4));
        slide.style.zIndex = String(Math.round((1 - t) * 10));
        slide.classList.toggle("is-active", t < 0.35);
        slide.classList.toggle("is-side", t >= 0.35);

        if (distPx < bestDist) {
          bestDist = distPx;
          best = i;
        }
      });

      // Only commit index (and remount details) when near a snap — not mid-drag
      if (!scrollingProgrammatically.current && bestDist < 48) {
        setIndex((prev) => {
          if (prev !== best) {
            setDetailKey((k) => k + 1);
            return best;
          }
          return prev;
        });
      }
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(paint);
    };

    const onScrollEnd = () => {
      paint();
      if (scrollingProgrammatically.current) return;
      if (performance.now() < ignoreScrollEndUntil.current) return;
      const list = slides();
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      list.forEach((slide, i) => {
        const center = slide.offsetLeft + slide.offsetWidth / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setIndex((prev) => {
        if (prev === best) return prev;
        setDetailKey((k) => k + 1);
        return best;
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", paint);
    paint();
    requestAnimationFrame(() => {
      void goTo(0);
    });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", paint);
    };
  }, [goTo, projects.length]);

  // Vertical wheel → one locked step (cooldown so trackpads don’t skip slides)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let lockedUntil = 0;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (Math.abs(event.deltaY) < 12) return;
      event.preventDefault();
      const now = performance.now();
      if (now < lockedUntil) return;
      lockedUntil = now + 720;
      if (event.deltaY > 0) void goTo(index + 1);
      else void goTo(index - 1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [goTo, index]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        void goTo(index + 1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        void goTo(index - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index]);

  const active = projects[index];

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#14110f]">
      <p
        className="pointer-events-none absolute left-1/2 top-[42%] z-0 -translate-x-1/2 -translate-y-1/2 select-none font-[family-name:var(--font-display)] text-[clamp(5rem,18vw,14rem)] font-bold tracking-[-0.04em] text-white/[0.04]"
        aria-hidden
      >
        Work
      </p>

      <div className="pointer-events-none absolute left-5 right-5 top-5 z-20 flex items-start justify-between sm:left-10 sm:right-10 sm:top-8">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
            Selected work
          </p>
          <p className="mt-1 text-sm text-white/50">
            Swipe through shipped sites
          </p>
        </div>
        <p className="hidden text-xs tracking-wide text-white/40 sm:block">
          Drag · ← →
        </p>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center pt-16 sm:pt-20">
        <div
          ref={trackRef}
          className="project-carousel project-carousel--peek flex h-full items-center overflow-x-auto overflow-y-hidden"
          aria-label="Project carousel"
        >
          {projects.map((project, i) => {
            const isActive = i === index;
            return (
              <div
                key={project.name}
                data-slide
                className="project-slide shrink-0 snap-center is-side"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${projects.length}: ${project.name}`}
                aria-hidden={!isActive}
              >
                <BrowserFrame
                  src={project.image}
                  alt={project.imageAlt ?? `${project.name} screenshot`}
                  urlLabel={
                    project.href
                      ? project.hrefLabel
                      : project.note?.toLowerCase() === "retired"
                        ? "acrobat.adobe.com"
                        : "internal"
                  }
                  accent={project.accent}
                  note={project.note}
                  priority={i === 0}
                />
                {isActive ? (
                  <span className="drag-hint" aria-hidden>
                    Drag
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 px-5 pb-10 pt-2 sm:px-10 sm:pb-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div
            key={`${active.name}-${detailKey}`}
            className="project-detail max-w-xl"
          >
            <p className="text-sm text-white/50">{active.role}</p>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.03em] text-white">
              {active.name}
            </h2>
            <p className="mt-2 max-w-lg text-base leading-relaxed text-white/65">
              {active.blurb}
            </p>
            <p className="mt-3 text-xs text-white/40">
              {active.stack.join(" · ")}
            </p>
            {active.href ? (
              <a
                href={active.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition-opacity duration-300 hover:opacity-70"
              >
                {active.hrefLabel}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            ) : (
              <p className="mt-5 text-sm font-semibold text-white/45">
                {active.hrefLabel}
              </p>
            )}
          </div>

          <div className="flex items-center gap-5">
            <p className="font-[family-name:var(--font-display)] text-sm tracking-wide text-white/55">
              {String(index + 1).padStart(2, "0")}
              <span className="mx-2 text-white/25">—</span>
              {String(projects.length).padStart(2, "0")}
            </p>
            <div className="h-px w-16 bg-white/15 sm:w-24">
              <div
                className="h-px bg-signal transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  width: `${((index + 1) / projects.length) * 100}%`,
                }}
              />
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous project"
                disabled={index === 0}
                onClick={() => void goTo(index - 1)}
                className="px-2 py-1 text-lg text-white/50 transition-colors duration-300 hover:text-white disabled:opacity-25"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next project"
                disabled={index === projects.length - 1}
                onClick={() => void goTo(index + 1)}
                className="px-2 py-1 text-lg text-white/50 transition-colors duration-300 hover:text-white disabled:opacity-25"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
