"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

/** FormSubmit ajax endpoint — destination stays off the visible page */
const FORMSUBMIT =
  process.env.NEXT_PUBLIC_FORMSUBMIT_ENDPOINT ??
  "https://formsubmit.co/ajax/hahosman@gmail.com";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill this; humans leave it empty
    if (String(data.get("company") ?? "").trim()) {
      setStatus("sent");
      form.reset();
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

    try {
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
      <input
        type="text"
        name="company"
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
        className="mt-8 inline-flex items-center justify-center bg-signal px-6 py-3.5 text-sm font-semibold tracking-wide text-foreground transition-[background-color,transform] duration-300 hover:bg-[#d46a30] hover:tracking-wider disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
