import { SocialLinks } from "@/components/SocialLinks";
import { BentoHero } from "@/components/snap/BentoHero";
import { ContactForm } from "@/components/snap/ContactForm";
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

      <section id="work" className="snap-section h-svh bg-[#12100e]">
        <ProjectCarousel projects={projects} />
      </section>

      <section
        id="about"
        className="snap-section relative flex min-h-svh items-center overflow-hidden bg-background-deep"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 100% 0%, rgba(196,92,38,0.08), transparent 55%)",
          }}
        />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted">
              About
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground">
              Experience Manager,
              <br />
              end to end
            </h2>
            <ul className="mt-10 space-y-4">
              {certifications.map((cert) => (
                <li
                  key={cert}
                  className="border-l-2 border-signal pl-4 text-sm leading-snug text-foreground/85"
                >
                  {cert}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-5 text-base leading-[1.7] text-muted sm:text-lg sm:leading-[1.75]">
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
              <p className="border-t border-line/60 pt-5 text-sm tracking-wide text-foreground/70">
                {skillKeywords.join(" · ")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="contact"
        className="snap-section relative flex min-h-svh flex-col justify-between overflow-hidden bg-pacific text-white"
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 55% at 15% 20%, rgba(196,92,38,0.22), transparent 50%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(61,107,122,0.28), transparent 55%)",
          }}
        />
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-12 px-5 py-20 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
          <Reveal className="max-w-xl">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-signal">
              Get in touch
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.1rem,5vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.035em]">
              Have an interesting role you think I&apos;d be a good fit for?
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/65">
              Drop a note—I&apos;d love to hear about it. Full-time, remote or
              hybrid.
            </p>
            <div className="mt-8">
              <SocialLinks tone="light" />
            </div>
          </Reveal>
          <Reveal delay={120} className="w-full max-w-md">
            <ContactForm />
          </Reveal>
        </div>
        <footer className="relative px-5 py-6 text-sm text-white/35 sm:px-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 border-t border-white/[0.08] pt-5 sm:flex-row sm:justify-between">
            <p>© 2026 Herbert Hosman · Ventura, CA</p>
            <p>This is a custom site built on Next.js · Tailwind CSS · TypeScript · Vercel</p>
          </div>
        </footer>
      </section>
    </div>
  );
}
