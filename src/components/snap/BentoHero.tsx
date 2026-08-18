import Image from "next/image";
import { SocialLinks } from "@/components/SocialLinks";

const brands = ["Adobe", "Pluralsight", "Hoodoo", "Caesars"];

const certifications = [
  "ACE — AEM Sites Developer",
  "ACE — AEM Sites Business Practitioner",
  "Certified ScrumMaster",
];

export function BentoHero() {
  return (
    <section
      id="top"
      className="snap-section relative flex min-h-svh flex-col overflow-hidden bg-background"
    >
      {/* Atmosphere — one plane, not a tile collage */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 12% 20%, rgba(196, 92, 38, 0.14), transparent 55%),
            radial-gradient(ellipse 70% 50% at 88% 75%, rgba(61, 107, 122, 0.16), transparent 50%),
            linear-gradient(165deg, #f7f4ef 0%, #efeae3 48%, #e4ddd3 100%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
        }}
      />

      <nav className="reveal-nav relative z-20 flex shrink-0 items-center justify-between gap-3 px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
        <div className="flex items-center gap-5 sm:gap-7">
          <a
            href="#work"
            className="text-sm font-medium tracking-wide text-foreground/65 transition-colors duration-300 hover:text-foreground"
          >
            Work
          </a>
          <a
            href="#about"
            className="text-sm font-medium tracking-wide text-foreground/65 transition-colors duration-300 hover:text-foreground"
          >
            About
          </a>
          <div className="hidden sm:block">
            <SocialLinks showGitHub={false} />
          </div>
        </div>
        <a
          href="#contact"
          className="text-sm font-medium tracking-wide text-foreground/65 transition-colors duration-300 hover:text-foreground"
        >
          Contact
        </a>
      </nav>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-10 pt-2 sm:px-8 sm:pb-14 lg:px-12">
        <div className="flex flex-col items-center gap-8 sm:gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* Circular portrait */}
          <div className="bento-rise bento-rise-1 relative shrink-0">
            <div className="relative mx-auto aspect-square w-[min(52vw,220px)] overflow-hidden rounded-full bg-pacific shadow-[0_20px_50px_rgba(36,48,56,0.22)] sm:w-[240px] lg:w-[280px]">
              <Image
                src="/herb-hosman.jpg"
                alt="Herbert Hosman"
                fill
                priority
                className="object-cover object-[center_18%]"
                sizes="(max-width: 1024px) 240px, 280px"
              />
            </div>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-signal">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="signal-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              Open to work
            </p>
          </div>

          {/* Identity — LinkedIn-aligned */}
          <div className="min-w-0 flex-1 text-center lg:text-left">
            <p className="bento-rise bento-rise-2 text-sm font-medium tracking-[0.04em] text-foreground/55">
              Ventura, CA · Remote / Hybrid
            </p>
            <h1 className="bento-rise bento-rise-2 mt-2 font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-pacific">
              Herb Hosman
            </h1>
            <p className="bento-rise bento-rise-3 mt-3 text-[clamp(1.05rem,2.2vw,1.35rem)] font-medium leading-snug text-foreground">
              AEM Developer · Software Engineer · Engineering Leader
            </p>
            <p className="bento-rise bento-rise-3 mt-1 text-sm text-foreground/65 sm:text-base">
              Ex-Adobe · Director of Engineering, Caesars
            </p>
            <p className="bento-rise bento-rise-4 mx-auto mt-5 max-w-xl text-base leading-relaxed text-foreground/70 lg:mx-0">
              AEM developer and solution architect with 10+ years at Adobe,
              Pluralsight, Hoodoo, and Caesars—building platforms, leading
              delivery, and shipping high-traffic Experience Manager sites.
            </p>

            <div className="bento-rise bento-rise-4 mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
              <a
                href="#work"
                className="bg-pacific px-5 py-3 text-sm font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-foreground"
              >
                View work
              </a>
              <a
                href="mailto:hahosman@gmail.com?subject=Next%20role%20conversation"
                className="text-sm font-semibold tracking-wide text-pacific transition-opacity duration-300 hover:opacity-65"
              >
                Email me
              </a>
              <div className="sm:hidden">
                <SocialLinks showGitHub={false} />
              </div>
            </div>

            <ul className="bento-rise bento-rise-5 mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.7rem] uppercase tracking-[0.12em] text-foreground/50 lg:justify-start">
              {certifications.map((cert, i) => (
                <li key={cert} className="inline-flex items-center gap-3">
                  {i > 0 ? (
                    <span
                      className="hidden h-1 w-1 rounded-full bg-foreground/25 sm:block"
                      aria-hidden
                    />
                  ) : null}
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Proof strip — companies + recommendation */}
        <div className="bento-rise bento-rise-5 mt-8 border-t border-foreground/10 pt-6 sm:mt-10 sm:pt-8 lg:mt-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div>
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-foreground/45">
                Shipped for
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em] text-pacific sm:text-2xl">
                {brands.join(" · ")}
              </p>
            </div>
            <blockquote className="max-w-md text-left text-sm leading-relaxed lg:text-right">
              <p className="italic text-foreground/65">
                “His technical skills are second to none… Whenever I am in a
                pinch, I go back to Mr Reliable.”
              </p>
              <footer className="mt-2 text-xs tracking-wide text-foreground/45 not-italic">
                — Sunny Beck
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
