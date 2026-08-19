"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

/** FormSubmit ajax endpoint — destination stays off the visible page */
const FORMSUBMIT =
  process.env.NEXT_PUBLIC_FORMSUBMIT_ENDPOINT ??
  "https://formsubmit.co/ajax/hahosman@gmail.com";

const MIN_DWELL_MS = 2500;
const RATE_KEY = "hh-contact-subs";
const RATE_MAX = 3;
const RATE_WINDOW_MS = 24 * 60 * 60 * 1000;

/** Phrases FormSubmit will silently drop (spam filters). */
const BLACKLIST = [
  "viagra",
  "cialis",
  "crypto investment",
  "bitcoin profit",
  "seo service",
  "link building",
  "guest post",
  "onlyfans",
  "casino",
  "forex",
].join(",");

function readSubmitCount(): number {
  try {
    const raw = localStorage.getItem(RATE_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw) as { t: number }[];
    const cutoff = Date.now() - RATE_WINDOW_MS;
    return parsed.filter((e) => e.t > cutoff).length;
  } catch {
    return 0;
  }
}

function recordSubmit() {
  try {
    const raw = localStorage.getItem(RATE_KEY);
    const parsed = raw ? (JSON.parse(raw) as { t: number }[]) : [];
    const cutoff = Date.now() - RATE_WINDOW_MS;
    const next = [...parsed.filter((e) => e.t > cutoff), { t: Date.now() }];
    localStorage.setItem(RATE_KEY, JSON.stringify(next));
  } catch {
    // ignore private-mode / blocked storage
  }
}

function countLinks(text: string) {
  return (text.match(/https?:\/\//gi) ?? []).length;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const company = String(data.get("company") ?? "").trim();
    const honey = String(data.get("_honey") ?? "").trim();

    // Honeypots — pretend success so scrapers think it worked
    if (company || honey) {
      setStatus("sent");
      form.reset();
      return;
    }

    if (readSubmitCount() >= RATE_MAX) {
      setStatus("error");
      setError("Too many messages from this browser. Please try again tomorrow.");
      return;
    }

    const dwellMs = Date.now() - mountedAt.current;
    if (dwellMs < MIN_DWELL_MS) {
      setStatus("error");
      setError("Please take a moment before sending.");
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      setError("Name, email, and message are required.");
      return;
    }

    if (message.length > 4000) {
      setStatus("error");
      setError("Message is too long.");
      return;
    }

    if (countLinks(message) > 3) {
      setStatus("error");
      setError("Please shorten the message and try again.");
      return;
    }

    try {
      // Server IP rate limit + dwell check before hitting FormSubmit
      const guard = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company: "", dwellMs }),
      });
      const guardPayload = (await guard.json()) as { error?: string };
      if (!guard.ok) {
        setStatus("error");
        setError(guardPayload.error ?? "Could not send message. Try again later.");
        return;
      }

      const response = await fetch(FORMSUBMIT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _replyto: email,
          _subject: `Portfolio inquiry from ${name}`,
          _template: "table",
          _captcha: "false",
          _honey: "",
          _blacklist: BLACKLIST,
        }),
      });

      const payload = (await response.json()) as {
        success?: string | boolean;
        message?: string;
      };

      const ok =
        payload.success === true ||
        payload.success === "true" ||
        (response.ok &&
          payload.success !== false &&
          payload.success !== "false");

      if (!ok) {
        const detail = (payload.message ?? "").toLowerCase();
        setStatus("error");
        setError(
          detail.includes("activation") || detail.includes("activate")
            ? "Almost there — check the portfolio inbox for FormSubmit’s “Activate Form” email, click it once, then send again."
            : (payload.message ?? "Could not send message. Try again later."),
        );
        return;
      }

      recordSubmit();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="border-t border-white/15 pt-6 text-sm leading-relaxed text-white/80">
        Thanks — your message is on its way. I&apos;ll get back to you soon.
      </div>
    );
  }

  const fieldClass =
    "w-full border-0 border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white outline-none transition-[border-color] duration-300 placeholder:text-white/30 focus:border-signal";

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-1">
      {/* Honeypots — hidden from people, tempting for bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <label className="block">
        <span className="mb-1 block text-[0.65rem] font-medium uppercase tracking-[0.16em] text-white/40">
          Name
        </span>
        <input
          required
          name="name"
          type="text"
          autoComplete="name"
          className={fieldClass}
          placeholder="Your name"
        />
      </label>
      <label className="mt-4 block">
        <span className="mb-1 block text-[0.65rem] font-medium uppercase tracking-[0.16em] text-white/40">
          Email
        </span>
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          placeholder="you@company.com"
        />
      </label>
      <label className="mt-4 block">
        <span className="mb-1 block text-[0.65rem] font-medium uppercase tracking-[0.16em] text-white/40">
          Message
        </span>
        <textarea
          required
          name="message"
          rows={3}
          maxLength={4000}
          className={`${fieldClass} resize-none`}
          placeholder="Tell me about the role…"
        />
      </label>
      {status === "error" ? (
        <p className="mt-3 text-sm text-signal" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-8 inline-flex items-center justify-center rounded-full bg-signal px-7 py-3.5 text-sm font-semibold tracking-wide text-foreground shadow-[0_10px_28px_rgba(196,92,38,0.28)] transition-[background-color,transform,box-shadow,letter-spacing] duration-300 hover:-translate-y-px hover:bg-[#d46a30] hover:tracking-wider hover:shadow-[0_14px_32px_rgba(196,92,38,0.34)] disabled:translate-y-0 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
