import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  urlLabel: string;
  accent: string;
  note?: string;
  priority?: boolean;
};

export function BrowserFrame({
  src,
  alt,
  urlLabel,
  accent,
  note,
  priority,
}: Props) {
  return (
    <div className="browser-stage" style={{ ["--browser-accent" as string]: accent }}>
      <div className="browser-glow" aria-hidden />
      <div className="browser-shadow" aria-hidden />
      <div className="browser-frame">
        <div className="browser-chrome">
          <div className="browser-traffic" aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <div className="browser-address">
            <svg
              className="browser-lock"
              viewBox="0 0 12 12"
              width="10"
              height="10"
              aria-hidden
            >
              <path
                fill="currentColor"
                d="M6 1a2.5 2.5 0 00-2.5 2.5V5H3a1 1 0 00-1 1v4a1 1 0 001 1h6a1 1 0 001-1V6a1 1 0 00-1-1H8.5V3.5A2.5 2.5 0 006 1zm1.5 4h-3V3.5a1.5 1.5 0 113 0V5z"
              />
            </svg>
            <span className="browser-url">{urlLabel}</span>
          </div>
          <div className="browser-chrome-spacer" aria-hidden />
        </div>
        <div className="browser-viewport">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 92vw, 70vw"
              priority={priority}
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ backgroundColor: accent }}
            >
              <p className="font-[family-name:var(--font-display)] text-xl font-bold text-white/85 sm:text-2xl">
                {note ?? "Internal"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
