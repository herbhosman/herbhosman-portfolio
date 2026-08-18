import { NextResponse } from "next/server";

type Body = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

type FormSubmitPayload = {
  success?: string | boolean;
  message?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  // Honeypot — bots fill this; humans leave it empty
  if ((body.company ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const to = process.env.CONTACT_EMAIL;
  if (!to) {
    return NextResponse.json(
      { error: "Contact form is not configured yet." },
      { status: 503 },
    );
  }

  const subject = `Portfolio inquiry from ${name}`;
  const text = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
  const origin = "https://herbhosman.com";

  // FormSubmit requires browser-like Origin and a one-time inbox activation
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: `${origin}/`,
      },
      body: JSON.stringify({
        name,
        email,
        message: text,
        _replyto: email,
        _subject: subject,
        _template: "table",
        _captcha: "false",
      }),
    },
  );

  let payload: FormSubmitPayload | null = null;
  try {
    payload = (await response.json()) as FormSubmitPayload;
  } catch {
    payload = null;
  }

  const success =
    payload?.success === true ||
    payload?.success === "true" ||
    (response.ok && payload?.success !== false && payload?.success !== "false");

  if (!success) {
    const detail = (payload?.message ?? "").toLowerCase();
    if (detail.includes("activation") || detail.includes("activate")) {
      return NextResponse.json(
        {
          error:
            "Almost there — open the portfolio inbox and click FormSubmit’s “Activate Form” link (one-time), then send again.",
        },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { error: "Could not send message. Try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
