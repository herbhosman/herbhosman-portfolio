"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { BrowserFrame } from "@/components/snap/BrowserFrame";

type Props = {
  projects: Project[];
};

/** Slow start → accelerates into a firm lock */
const SNAP_EASE = "cubic-bezier(0.7, 0, 0.12, 1)";
const SNAP_MS = 720;

function ProjectCopy({ project }: { project: Project }) {
  return (
    <div className="mt-5 px-0.5 sm:mt-6">
      <p className="text-[0.7rem] uppercase tracking-[0.14em] text-white/40">
        {project.role}
      </p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.6rem,4.5vw,2.6rem)] font-bold tracking-[-0.035em] text-white">
        {project.name}
      </h2>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
        {project.blurb}
      </p>
      <p className="mt-3 text-[0.7rem] tracking-wide text-white/35">
        {project.stack.join(" · ")}
      </p>
      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition-opacity duration-300 hover:opacity-70"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => event.stopPropagation()}
        >
          {project.hrefLabel}
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      ) : (
        <p className="mt-5 text-sm font-semibold text-white/40">
          {project.hrefLabel}
        </p>
      )}
    </div>
  );
}

function layoutFor(width: number) {
  const peek = width >= 900;
  const slideW = peek ? Math.min(width * 0.7, 860) : width;
  const gap = peek ? 48 : 0;
  const pad = peek ? (width - slideW) / 2 : 0;
  return { peek, slideW, gap, pad, stride: slideW + gap };
}

export function ProjectCarousel({ projects }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  /** Which slide’s copy is visible — updates after the snap finishes */
  const [copyIndex, setCopyIndex] = useState(0);
  const [dragPx, setDragPx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [width, setWidth] = useState(0);

  const startX = useRef(0);
  const startY = useRef(0);
  const axis = useRef<"x" | "y" | null>(null);
  const dragPxRef = useRef(0);
  const indexRef = useRef(0);
  const draggingRef = useRef(false);
  const widthRef = useRef(0);
  const sectionActive = useRef(false);
  const wheelReady = useRef(false);
  const copyTimer = useRef(0);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(projects.length - 1, next));
      indexRef.current = clamped;
      setIndex(clamped);
      setDragPx(0);
      dragPxRef.current = 0;
      // Keep outgoing text until the card has fully locked
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => {
        setCopyIndex(clamped);
      }, SNAP_MS);
    },
    [projects.length],
  );

  useEffect(() => {
    return () => window.clearTimeout(copyTimer.current);
  }, []);

  const finishDrag = useCallback(() => {
    const wasHorizontal = axis.current === "x";
    const wasDragging = draggingRef.current;
    draggingRef.current = false;
    setDragging(false);
    axis.current = null;

    if (!wasDragging || !wasHorizontal) {
      setDragPx(0);
      dragPxRef.current = 0;
      return;
    }

    const { slideW } = layoutFor(widthRef.current || 1);
    // Sensitive: ~8% of slide or 32px
    const threshold = Math.max(32, Math.min(48, slideW * 0.08));
    const delta = dragPxRef.current;

    if (delta <= -threshold) goTo(indexRef.current + 1);
    else if (delta >= threshold) goTo(indexRef.current - 1);
    else {
      setDragPx(0);
      dragPxRef.current = 0;
    }
  }, [goTo]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth || 0;
      widthRef.current = w;
      setWidth(w);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let settleTimer = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        const fullyIn =
          entry.isIntersecting && entry.intersectionRatio >= 0.92;
        sectionActive.current = fullyIn;
        window.clearTimeout(settleTimer);
        if (!fullyIn) {
          wheelReady.current = false;
          return;
        }
        settleTimer = window.setTimeout(() => {
          wheelReady.current = true;
        }, 450);
      },
      { threshold: [0.5, 0.75, 0.92, 1] },
    );
    io.observe(root);
    return () => {
      window.clearTimeout(settleTimer);
      io.disconnect();
    };
  }, []);

  // Accumulate small trackpad deltas so one intentional flick = one card
  useEffect(() => {
    let steppedThisGesture = false;
    let idleTimer = 0;
    let acc = 0;

    const onWheel = (event: WheelEvent) => {
      if (!sectionActive.current || !wheelReady.current) return;

      const absX = Math.abs(event.deltaX);
      const absY = Math.abs(event.deltaY);
      if (absX < 4 && absY < 4) return;

      const horizontal = absX > absY * 1.05;
      const delta = horizontal ? event.deltaX : event.deltaY;

      if (!horizontal) {
        if (delta > 0 && indexRef.current >= projects.length - 1) return;
        if (delta < 0 && indexRef.current <= 0) return;
      }

      event.preventDefault();
      event.stopPropagation();

      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        steppedThisGesture = false;
        acc = 0;
      }, 180);

      if (steppedThisGesture) return;

      acc += delta;
      // Lower bar so one flick is enough (was requiring multiple)
      if (Math.abs(acc) < 28) return;

      steppedThisGesture = true;
      const dir = acc > 0 ? 1 : -1;
      acc = 0;
      goTo(indexRef.current + dir);
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => {
      window.clearTimeout(idleTimer);
      window.removeEventListener("wheel", onWheel, {
        capture: true,
      } as AddEventListenerOptions);
    };
  }, [goTo, projects.length]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      startX.current = event.touches[0].clientX;
      startY.current = event.touches[0].clientY;
      axis.current = null;
      dragPxRef.current = 0;
      draggingRef.current = true;
      setDragging(true);
      setDragPx(0);
    };

    const onMove = (event: TouchEvent) => {
      if (!draggingRef.current || event.touches.length !== 1) return;
      const dx = event.touches[0].clientX - startX.current;
      const dy = event.touches[0].clientY - startY.current;

      if (!axis.current) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        axis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (axis.current === "y") {
          draggingRef.current = false;
          setDragging(false);
          setDragPx(0);
          dragPxRef.current = 0;
          return;
        }
      }

      if (axis.current !== "x") return;
      event.preventDefault();

      const atStart = indexRef.current === 0 && dx > 0;
      const atEnd = indexRef.current === projects.length - 1 && dx < 0;
      const next = atStart || atEnd ? dx * 0.28 : dx;
      dragPxRef.current = next;
      setDragPx(next);
    };

    const onEnd = () => finishDrag();

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: true });
    el.addEventListener("touchcancel", onEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, [finishDrag, projects.length]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onDown = (event: MouseEvent) => {
      if (event.button !== 0) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button")) return;
      startX.current = event.clientX;
      startY.current = event.clientY;
      axis.current = "x";
      dragPxRef.current = 0;
      draggingRef.current = true;
      setDragging(true);
      setDragPx(0);
    };

    const onMove = (event: MouseEvent) => {
      if (!draggingRef.current || axis.current !== "x") return;
      const dx = event.clientX - startX.current;
      const atStart = indexRef.current === 0 && dx > 0;
      const atEnd = indexRef.current === projects.length - 1 && dx < 0;
      const next = atStart || atEnd ? dx * 0.28 : dx;
      dragPxRef.current = next;
      setDragPx(next);
    };

    const onUp = () => finishDrag();

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [finishDrag, projects.length]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!sectionActive.current) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(indexRef.current + 1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(indexRef.current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo]);

  const { peek, slideW, gap, pad, stride } = layoutFor(width || 1);
  const offsetX = width > 0 ? pad - index * stride + dragPx : 0;

  return (
    <div
      ref={rootRef}
      className="relative flex h-full min-h-0 flex-col bg-[#12100e]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(196,92,38,0.12), transparent 55%)",
        }}
      />
      <p
        className="pointer-events-none absolute left-1/2 top-[36%] z-0 -translate-x-1/2 -translate-y-1/2 select-none font-[family-name:var(--font-display)] text-[clamp(5rem,16vw,12rem)] font-bold tracking-[-0.05em] text-white/[0.03]"
        aria-hidden
      >
        Work
      </p>

      <div className="relative z-20 flex shrink-0 items-end justify-between gap-4 px-5 pt-6 sm:px-10 sm:pt-8">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
            Selected work
          </p>
          <p className="mt-1 text-sm text-white/40">
            Scroll or swipe through shipped sites
          </p>
        </div>
        <div className="flex items-center gap-3 pb-0.5">
          <p className="font-[family-name:var(--font-display)] text-sm tracking-wide text-white/50">
            {String(index + 1).padStart(2, "0")}
            <span className="mx-2 text-white/20">—</span>
            {String(projects.length).padStart(2, "0")}
          </p>
          <div className="hidden h-px w-14 overflow-hidden bg-white/10 sm:block sm:w-20">
            <div
              className="h-px bg-signal transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                width: `${((index + 1) / projects.length) * 100}%`,
              }}
            />
          </div>
          <div className="flex items-center">
            <button
              type="button"
              aria-label="Previous project"
              disabled={index === 0}
              onClick={() => goTo(index - 1)}
              className="px-2 py-1 text-lg text-white/40 transition-colors duration-300 hover:text-white disabled:opacity-20"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next project"
              disabled={index === projects.length - 1}
              onClick={() => goTo(index + 1)}
              className="px-2 py-1 text-lg text-white/40 transition-colors duration-300 hover:text-white disabled:opacity-20"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="project-carousel-viewport relative z-10 min-h-0 flex-1"
        role="region"
        aria-roledescription="carousel"
        aria-label="Project carousel"
      >
        <div
          className="project-carousel-track flex h-full items-center"
          style={{
            gap: peek ? gap : 0,
            transform: `translate3d(${offsetX}px, 0, 0)`,
            transition: dragging
              ? "none"
              : `transform ${SNAP_MS}ms ${SNAP_EASE}`,
          }}
        >
          {projects.map((project, i) => {
            const dist = Math.abs(i - index);
            const dragBias =
              dragging && dragPx !== 0
                ? Math.min(1, Math.abs(dragPx) / Math.max(slideW * 0.5, 1))
                : 0;
            const toward = dragPx < 0 ? 1 : -1;
            const isEmerging =
              dragging && i === index + toward && dist === 1;
            const side = dist >= 1;
            const scale =
              !peek || !side
                ? 1
                : isEmerging
                  ? 0.86 + 0.1 * dragBias
                  : 0.86;
            const opacity =
              !peek || !side
                ? 1
                : isEmerging
                  ? 0.4 + 0.45 * dragBias
                  : 0.4;
            const showCopy = i === copyIndex;

            return (
              <article
                key={project.name}
                className="project-carousel-slide flex h-full shrink-0 flex-col justify-center"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${projects.length}: ${project.name}`}
                aria-hidden={i !== index}
                style={{
                  width: width > 0 ? slideW : "100%",
                  flexBasis: width > 0 ? slideW : "100%",
                  transform: peek ? `scale(${scale})` : undefined,
                  opacity: peek ? opacity : 1,
                  transition: dragging
                    ? "none"
                    : `transform ${SNAP_MS}ms ${SNAP_EASE}, opacity ${SNAP_MS}ms ${SNAP_EASE}`,
                  zIndex: i === index ? 2 : 1,
                }}
              >
                <div
                  className={`mx-auto w-full ${peek ? "" : "max-w-4xl px-5 sm:px-10"}`}
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
                  {/* Always mounted so height never collapses mid-slide */}
                  <div
                    className="project-slide-copy"
                    style={{
                      opacity: showCopy ? 1 : 0,
                      transition: `opacity 280ms ${SNAP_EASE}`,
                      pointerEvents: showCopy ? "auto" : "none",
                    }}
                    aria-hidden={!showCopy}
                  >
                    <ProjectCopy project={project} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
