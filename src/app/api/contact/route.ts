import { NextResponse } from "next/server";

type Body = {
  company?: string;
  /** ms since form was shown — bots often submit instantly */
  dwellMs?: number;
};

/** Soft per-instance limits (Vercel isolates vary; still blocks noisy bursts). */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_DWELL_MS = 2500;

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function prune(timestamps: number[], now: number) {
  return timestamps.filter((t) => now - t < WINDOW_MS);
}

/**
 * Pre-flight guard before the browser posts to FormSubmit.
 * Honeypot + dwell time + IP rate limit.
 */
export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots that fill hidden fields get a fake success
  if ((body.company ?? "").trim()) {
    return NextResponse.json({ ok: true, token: "ok" });
  }

  const dwellMs = Number(body.dwellMs ?? 0);
  if (!Number.isFinite(dwellMs) || dwellMs < MIN_DWELL_MS) {
    return NextResponse.json(
      { error: "Please take a moment before sending." },
      { status: 429 },
    );
  }

  const ip = clientIp(request);
  const now = Date.now();
  const recent = prune(hits.get(ip) ?? [], now);
  if (recent.length >= MAX_PER_WINDOW) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 },
    );
  }
  recent.push(now);
  hits.set(ip, recent);

  return NextResponse.json({ ok: true, token: "ok" });
}
