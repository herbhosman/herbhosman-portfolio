import { SocialLinks } from "@/components/SocialLinks";
import { BentoHero } from "@/components/snap/BentoHero";
import { ProjectCarousel } from "@/components/snap/ProjectCarousel";
import { Reveal } from "@/components/snap/Reveal";
import {
  aboutParagraphs,
  certifications,
  projects,
  skillKeywords,
} from "@/data/projects";

export function SnapHome() {
  return (
    <div className="experience-snap h-svh overflow-y-auto overscroll-y-contain">
      <BentoHero />

      <section id="work" className="snap-section h-svh bg-foreground">
        <ProjectCarousel projects={projects} />
      </section>

      <section
        id="about"
        className="snap-section flex min-h-svh items-center bg-background-deep"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted">
              About
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl">
              Experience Manager, end to end
            </h2>
            <ul className="mt-8 space-y-3 text-sm text-foreground">
              {certifications.map((cert) => (
                <li key={cert} className="border-l-2 border-signal/80 pl-3">
                  {cert}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="max-h-[70svh] space-y-4 overflow-y-auto text-base leading-relaxed text-muted sm:text-lg">
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
              <p className="border-t border-line/70 pt-4 text-sm text-foreground/80">
                {skillKeywords.join(" · ")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="contact"
        className="snap-section flex min-h-svh flex-col justify-between bg-pacific text-white"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-10 px-5 py-16 sm:px-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-signal">
              Get in touch
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight tracking-[-0.03em]">
              Let&apos;s talk about what you&apos;re building.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
              Open to full-time AEM Architect, Solution Architect, Engineering
              Manager, or Director of Engineering roles—remote or hybrid.
            </p>
          </Reveal>
          <Reveal delay={140} className="flex flex-col gap-6">
            <a
              href="mailto:hahosman@gmail.com?subject=Next%20role%20conversation"
              className="inline-flex w-fit items-center gap-2 bg-signal px-6 py-3.5 text-sm font-semibold tracking-wide text-foreground transition-all duration-300 hover:bg-[#d46a30] hover:tracking-wider"
            >
              hahosman@gmail.com
              <span aria-hidden className="opacity-70">
                →
              </span>
            </a>
            <SocialLinks tone="light" />
          </Reveal>
        </div>
        <footer className="px-5 py-5 text-sm text-white/40 sm:px-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 border-t border-white/10 pt-5 sm:flex-row sm:justify-between">
            <p>© 2026 Herbert Hosman</p>
            <p>Ventura, CA · Next.js · Tailwind CSS · TypeScript · Vercel</p>
          </div>
        </footer>
      </section>
    </div>
  );
}
