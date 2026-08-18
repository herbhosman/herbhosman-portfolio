import { AvailabilitySignal } from "@/components/AvailabilitySignal";
import { HeroArt } from "@/components/HeroArt";
import { ProfilePhoto } from "@/components/ProfilePhoto";
import { ProjectTile } from "@/components/ProjectTile";
import { SocialLinks } from "@/components/SocialLinks";
import {
  aboutParagraphs,
  certifications,
  projects,
  recentBuilds,
  skillKeywords,
  snapshotFacts,
} from "@/data/projects";

export function ClassicHome() {
  return (
    <div className="min-h-full">
      <header className="relative isolate overflow-hidden border-b border-line sm:min-h-[100svh]">
        <HeroArt />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-start px-5 pb-12 pt-24 sm:min-h-[100svh] sm:justify-end sm:px-10 sm:pb-20 sm:pt-10">
          <nav className="hero-rise absolute left-5 right-5 top-5 flex items-center justify-between gap-3 sm:left-10 sm:right-10 sm:top-8">
            <div className="flex min-w-0 items-center gap-4 sm:gap-6">
              <a
                href="#work"
                className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-foreground"
              >
                Work
              </a>
              <a
                href="#about"
                className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-foreground"
              >
                About
              </a>
              <div className="hidden sm:block">
                <SocialLinks showGitHub={false} bare />
              </div>
            </div>
            <a
              href="#contact"
              className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-foreground"
            >
              Contact
            </a>
          </nav>

          <div className="flex w-full max-w-3xl flex-col gap-5 sm:flex-row sm:items-end sm:gap-8">
            <ProfilePhoto />

            <div className="min-w-0 flex-1">
              <h1 className="hero-rise hero-rise-delay-1 font-[family-name:var(--font-display)] text-[clamp(2rem,8vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-foreground sm:leading-[0.92] sm:tracking-[-0.05em]">
                Herb Hosman
              </h1>

              <AvailabilitySignal />

              <p className="hero-rise hero-rise-delay-2 mt-5 max-w-xl font-[family-name:var(--font-display)] text-[clamp(1.15rem,4.2vw,1.85rem)] font-semibold leading-snug tracking-[-0.02em] text-foreground sm:mt-6">
                AEM architect. Full-stack practitioner. Fast web experiences.
              </p>

              <p className="hero-rise hero-rise-delay-3 mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted sm:mt-4 sm:text-base">
                Ventura, CA · 12+ years shipping Adobe Experience Manager
                programs at Adobe, Pluralsight, Hoodoo, and Caesars.
              </p>

              <div className="hero-rise hero-rise-delay-4 mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="#work"
                  className="inline-flex w-full items-center justify-center bg-foreground px-5 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-pacific sm:w-auto"
                >
                  View selected work
                </a>
                <a
                  href="mailto:hahosman@gmail.com?subject=Next%20role%20conversation"
                  className="inline-flex w-full items-center justify-center border border-foreground/25 bg-transparent px-5 py-3 text-sm font-semibold tracking-wide text-foreground transition-colors hover:border-foreground hover:bg-foreground/5 sm:w-auto"
                >
                  Email Herb
                </a>
                <div className="flex justify-start sm:hidden">
                  <SocialLinks showGitHub={false} bare />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section
          aria-label="Candidate snapshot"
          className="border-b border-line bg-surface"
        >
          <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:grid-cols-3 sm:px-10 sm:py-10">
            {snapshotFacts.map((fact) => (
              <div key={fact.label}>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  {fact.label}
                </p>
                <p className="mt-1.5 font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.02em] text-foreground">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="scroll-mt-8">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-10">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted">
                  Selected work
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-[-0.03em] text-foreground">
                  Sites I&apos;ve shipped
                </h2>
              </div>
              <p className="hidden max-w-[14rem] text-right text-sm leading-relaxed text-muted sm:block">
                Named brands, real URLs, newest first.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectTile key={project.name} project={project} />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6 text-sm text-muted">
              <span className="font-medium text-foreground">Also shipping</span>
              {recentBuilds.map((build) =>
                build.href ? (
                  <a
                    key={build.name}
                    href={build.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground transition-colors hover:text-signal"
                  >
                    {build.name}
                    <span className="ml-1 font-normal text-muted">
                      · {build.hrefLabel}
                    </span>
                  </a>
                ) : null,
              )}
            </div>
          </div>
        </section>

        <section
          id="about"
          className="scroll-mt-8 border-t border-line bg-background-deep"
        >
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted">
                About
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl">
                Experience Manager, end to end
              </h2>
              <div className="mt-8 space-y-3">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  Certifications
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  {certifications.map((cert) => (
                    <li key={cert} className="border-l-2 border-signal pl-3">
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
              <div className="border-t border-line pt-6">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  Core skills
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  {skillKeywords.join(" · ")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-8 border-t border-line bg-pacific text-white"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 sm:px-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-signal">
                Get in touch
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight tracking-[-0.03em]">
                Have an interesting role you think I&apos;d be a good fit for?
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
                Drop a note—I&apos;d love to hear about it. Full-time, remote or
                hybrid.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:hahosman@gmail.com?subject=Next%20role%20conversation"
                className="inline-flex items-center justify-center bg-signal px-6 py-3 text-sm font-semibold tracking-wide text-foreground transition-opacity hover:opacity-90"
              >
                hahosman@gmail.com
              </a>
              <SocialLinks tone="light" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-foreground px-5 py-6 text-sm text-white/55 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Herbert Hosman</p>
          <p>Ventura, CA · Next.js · Tailwind CSS · TypeScript · Vercel</p>
        </div>
      </footer>
    </div>
  );
}
