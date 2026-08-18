"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"),
        }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setStatus("error");
        setError(payload.error ?? "Something went wrong.");
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
