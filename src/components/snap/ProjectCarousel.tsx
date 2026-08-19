"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
    <div className="mt-4 px-0.5 sm:mt-6">
      <p className="text-[0.65rem] uppercase tracking-[0.14em] text-white/40 sm:text-[0.7rem]">
        {project.role}
      </p>
      <h2 className="mt-1.5 font-[family-name:var(--font-display)] text-[clamp(1.45rem,4.5vw,2.6rem)] font-bold tracking-[-0.035em] text-white sm:mt-2">
        {project.name}
      </h2>
      <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-white/60 sm:mt-2 sm:text-base">
        {project.blurb}
      </p>
      <p className="mt-2 text-[0.7rem] tracking-wide text-white/35 sm:mt-3">
        {project.stack.join(" · ")}
      </p>
      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition-opacity duration-300 hover:opacity-70 sm:mt-5"
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
        <p className="mt-4 text-sm font-semibold text-white/40 sm:mt-5">
          {project.hrefLabel}
        </p>
      )}
    </div>
  );
}

function layoutFor(width: number) {
  // Desktop: wide peek of neighbors
  if (width >= 900) {
    const slideW = Math.min(width * 0.7, 860);
    const gap = 48;
    const pad = (width - slideW) / 2;
    return { peek: true, slideW, gap, pad, stride: slideW + gap };
  }
  // Mobile / tablet: slight edge peek so swipe is obvious
  if (width > 0) {
    const slideW = width * 0.9;
    const gap = 10;
    const pad = (width - slideW) / 2;
    return { peek: true, slideW, gap, pad, stride: slideW + gap };
  }
  return { peek: false, slideW: 1, gap: 0, pad: 0, stride: 1 };
}

export function ProjectCarousel({ projects }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const frameAnchorRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [dragPx, setDragPx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [width, setWidth] = useState(0);
  const [dotsTop, setDotsTop] = useState<number | null>(null);

  const startX = useRef(0);
  const startY = useRef(0);
  const axis = useRef<"x" | "y" | null>(null);
  const dragPxRef = useRef(0);
  const indexRef = useRef(0);
  const draggingRef = useRef(false);
  const widthRef = useRef(0);
  const sectionActive = useRef(false);
  const wheelReady = useRef(false);
  const dotsSettling = useRef(false);
  const dotsSettleTimer = useRef(0);

  const updateDotsPosition = useCallback(() => {
    if (draggingRef.current || dotsSettling.current) return;
    const root = rootRef.current;
    const header = headerRef.current;
    const frame = frameAnchorRef.current;
    if (!root || !header || !frame) return;
    const rootBox = root.getBoundingClientRect();
    const headerBox = header.getBoundingClientRect();
    const frameBox = frame.getBoundingClientRect();
    if (frameBox.top <= headerBox.bottom + 8) return;
    const mid = (headerBox.bottom + frameBox.top) / 2;
    setDotsTop(mid - rootBox.top);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(projects.length - 1, next));
      const changed = clamped !== indexRef.current;
      indexRef.current = clamped;
      setIndex(clamped);
      setDragPx(0);
      dragPxRef.current = 0;
      if (changed) {
        // Keep dots fixed while the incoming slide scales into place
        dotsSettling.current = true;
        window.clearTimeout(dotsSettleTimer.current);
        dotsSettleTimer.current = window.setTimeout(() => {
          dotsSettling.current = false;
          updateDotsPosition();
        }, SNAP_MS + 50);
      }
    },
    [projects.length, updateDotsPosition],
  );

  useEffect(() => {
    return () => window.clearTimeout(dotsSettleTimer.current);
  }, []);

  useLayoutEffect(() => {
    if (!dotsSettling.current) updateDotsPosition();
    const root = rootRef.current;
    const frame = frameAnchorRef.current;
    const ro = new ResizeObserver(() => {
      if (!dotsSettling.current && !draggingRef.current) updateDotsPosition();
    });
    if (root) ro.observe(root);
    if (frame) ro.observe(frame);
    window.addEventListener("resize", updateDotsPosition);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateDotsPosition);
    };
  }, [updateDotsPosition, index, width]);

  const finishDrag = useCallback(() => {
    const wasHorizontal = axis.current === "x";
    const wasDragging = draggingRef.current;
    draggingRef.current = false;
    setDragging(false);
    axis.current = null;

    if (!wasDragging || !wasHorizontal) {
      setDragPx(0);
      dragPxRef.current = 0;
      window.requestAnimationFrame(() => updateDotsPosition());
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
      window.requestAnimationFrame(() => updateDotsPosition());
    }
  }, [goTo, updateDotsPosition]);

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
  const wide = width >= 900;

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

      <div
        ref={headerRef}
        className="relative z-20 shrink-0 px-5 pt-5 sm:px-10 sm:pt-8"
      >
        <p className="font-[family-name:var(--font-display)] text-[1.35rem] font-bold leading-tight tracking-[-0.03em] text-white sm:text-3xl">
          Sites I&apos;ve worked on
        </p>
        <p className="mt-1 text-sm text-white/55 sm:text-white/40">
          <span className="sm:hidden">Swipe to browse</span>
          <span className="hidden sm:inline">
            Scroll or swipe through shipped sites
          </span>
        </p>
      </div>

      <div
        className="pointer-events-none absolute left-0 right-0 z-30 flex -translate-y-1/2 justify-center gap-2.5 px-5"
        style={{
          top: dotsTop ?? 0,
          opacity: dotsTop == null ? 0 : 1,
          transition: "opacity 180ms ease",
        }}
        role="tablist"
        aria-label="Project pages"
      >
        {projects.map((project, i) => (
          <button
            key={project.name}
            type="button"
            role="tab"
            aria-label={`Show ${project.name}`}
            aria-selected={i === index}
            onClick={() => goTo(i)}
            className={`pointer-events-auto h-3 rounded-full transition-[width,background-color] duration-300 ${
              i === index
                ? "w-8 bg-signal"
                : "w-3 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
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
            const sideScale = wide ? 0.86 : 0.94;
            const sideOpacity = wide ? 0.4 : 0.55;
            const scale =
              !peek || !side
                ? 1
                : isEmerging
                  ? sideScale + (1 - sideScale) * 0.7 * dragBias
                  : sideScale;
            const opacity =
              !peek || !side
                ? 1
                : isEmerging
                  ? sideOpacity + (1 - sideOpacity) * 0.7 * dragBias
                  : sideOpacity;
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
                  pointerEvents: i === index ? "auto" : "none",
                }}
              >
                <div className={`mx-auto w-full ${wide ? "" : "px-3"}`}>
                  <div ref={i === index ? frameAnchorRef : undefined}>
                    <BrowserFrame
                      src={project.image}
                      alt={project.imageAlt ?? `${project.name} screenshot`}
                      urlLabel={
                        project.hrefLabel ||
                        (project.note?.toLowerCase() === "retired"
                          ? "acrobat.adobe.com"
                          : "internal")
                      }
                      accent={project.accent}
                      note={project.note}
                      priority={i === 0}
                    />
                  </div>
                  <ProjectCopy project={project} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
