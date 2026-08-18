export function AvailabilitySignal() {
  return (
    <a
      href="mailto:hahosman@gmail.com?subject=Next%20role%20conversation"
      className="hero-rise group mt-4 flex w-full max-w-xl flex-col gap-2 border border-foreground/15 bg-surface/90 px-3.5 py-3 backdrop-blur-[2px] transition-colors hover:border-signal/50 hover:bg-surface sm:mt-5 sm:gap-2.5 sm:px-4 sm:py-3.5"
      aria-label="Open to work — email Herb"
    >
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden>
          <span className="signal-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
        </span>
        <span className="font-[family-name:var(--font-display)] text-[0.65rem] font-bold uppercase tracking-[0.14em] text-signal sm:text-xs sm:tracking-[0.16em]">
          Open to work
        </span>
      </div>
      <p className="text-[0.9rem] leading-snug text-foreground sm:pl-[1.375rem] sm:text-[0.95rem]">
        Seeking full-time roles: AEM Architect, Solution Architect, Engineering
        Manager, Director of Engineering. Remote or hybrid.
      </p>
      <p className="text-sm font-semibold text-foreground underline decoration-signal/40 underline-offset-4 transition-colors group-hover:decoration-signal sm:pl-[1.375rem]">
        Start a conversation →
      </p>
    </a>
  );
}
