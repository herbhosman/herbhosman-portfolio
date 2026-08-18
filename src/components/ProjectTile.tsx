import Image from "next/image";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
};

export function ProjectTile({ project }: Props) {
  const body = (
    <>
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{ backgroundColor: project.accent }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt ?? `${project.name} screenshot`}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-end p-4">
            <span className="text-sm font-medium tracking-wide text-white/80">
              {project.note ?? "Internal"}
            </span>
          </div>
        )}
        {project.note && project.image ? (
          <span className="absolute bottom-3 right-3 bg-foreground/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
            {project.note}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 border-t border-line bg-surface px-4 py-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.02em] text-foreground">
            {project.name}
          </h3>
          <span className="shrink-0 text-xs text-muted">{project.hrefLabel}</span>
        </div>
        <p className="text-sm text-muted">{project.role}</p>
        <p className="text-sm leading-snug text-foreground/75">{project.blurb}</p>
        <p className="mt-1 text-xs leading-snug text-muted">
          {project.stack.join(" · ")}
        </p>
      </div>
    </>
  );

  const className =
    "group flex h-full flex-col overflow-hidden border border-line bg-surface transition-colors hover:border-foreground/25";

  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {body}
      </a>
    );
  }

  return <article className={className}>{body}</article>;
}
