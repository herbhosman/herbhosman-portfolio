import Image from "next/image";
import { SocialLinks } from "@/components/SocialLinks";

const brands = ["Adobe", "Pluralsight", "Hoodoo", "Caesars"];

export function BentoHero() {
  return (
    <section
      id="top"
      className="snap-section relative flex min-h-svh flex-col overflow-hidden bg-background"
    >
      <div className="hero-atmosphere pointer-events-none absolute inset-0" aria-hidden />

      <nav className="reveal-nav relative z-20 flex shrink-0 items-center justify-between gap-3 px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
        <div className="flex items-center gap-6 sm:gap-8">
          <a href="#work" className="nav-link">
            Work
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
          <div className="hidden sm:block">
            <SocialLinks showGitHub={false} />
          </div>
        </div>
        <a href="#contact" className="nav-link">
          Contact
        </a>
      </nav>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-10 pt-4 sm:px-8 sm:pb-14 lg:px-12">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-20">
          <div className="bento-rise bento-rise-1 relative shrink-0">
            <div className="portrait-ring relative mx-auto">
              <div className="relative aspect-square w-[min(38vw,148px)] overflow-hidden rounded-full bg-pacific sm:w-[220px] lg:w-[268px]">
                <Image
                  src="/herb-hosman.jpg"
                  alt="Herbert Hosman"
                  fill
                  priority
                  className="object-cover object-[center_18%] transition-transform duration-[1.4s] ease-out"
                  sizes="(max-width: 640px) 148px, (max-width: 1024px) 220px, 268px"
                />
              </div>
            </div>
            <a
              href="#contact"
              className="mt-5 flex items-center justify-center gap-2.5 text-base font-semibold tracking-[-0.01em] text-signal transition-opacity hover:opacity-80 sm:mt-6 sm:text-lg"
            >
              <span className="relative flex h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" aria-hidden>
                <span className="signal-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-signal sm:h-3.5 sm:w-3.5" />
              </span>
              Open to work
            </a>
          </div>

          <div className="min-w-0 flex-1 text-center lg:text-left">
            <p className="bento-rise bento-rise-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-foreground/45 sm:text-xs">
              Ventura, CA · Remote / Hybrid
            </p>
            <h1 className="bento-rise bento-rise-2 mt-3 font-[family-name:var(--font-display)] text-[clamp(2.35rem,8vw,4.25rem)] font-bold leading-[0.98] tracking-[-0.04em] text-pacific">
              Herb Hosman
            </h1>
            <p className="bento-rise bento-rise-3 mt-3 text-[clamp(1rem,3.2vw,1.35rem)] font-medium leading-snug tracking-[-0.01em] text-foreground/90">
              Software Engineer · Engineering Leader · AEM Expert
            </p>
            <p className="bento-rise bento-rise-3 mt-1.5 text-sm text-foreground/55">
              Ex-Adobe · Director of Engineering, Caesars
            </p>
            <p className="bento-rise bento-rise-4 mx-auto mt-5 hidden max-w-xl text-base leading-relaxed text-foreground/65 sm:block lg:mx-0">
              Software engineer with a focus in the Adobe Experience Cloud—10+
              years of implementation at Adobe, Pluralsight, Hoodoo, and
              Caesars.
            </p>

            <div className="bento-rise bento-rise-4 mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:justify-start">
              <a href="#work" className="btn-primary">
                View work
              </a>
              <a href="#contact" className="btn-ghost">
                Get in touch
              </a>
              <div className="sm:hidden">
                <SocialLinks showGitHub={false} />
              </div>
            </div>
          </div>
        </div>

        <div className="bento-rise bento-rise-5 mt-10 border-t border-foreground/[0.08] pt-6 sm:mt-14 sm:pt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div>
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-foreground/40">
                Experience at
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.15rem,3vw,1.75rem)] font-bold tracking-[-0.03em] text-pacific">
                {brands.join("  ·  ")}
              </p>
            </div>
            <blockquote className="max-w-md border-l-2 border-signal/40 pl-4 text-left sm:border-l-0 sm:pl-0 lg:text-right">
              <p className="font-[family-name:var(--font-display)] text-sm leading-relaxed text-foreground/60 italic sm:text-[0.95rem]">
                “His technical skills are second to none… Whenever I am in a
                pinch, I go back to Mr Reliable.”
              </p>
              <footer className="mt-2.5 text-[0.7rem] tracking-[0.04em] text-foreground/40 not-italic">
                Sunny Beck · Sr. Manager, Growth Marketing, Adobe
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
