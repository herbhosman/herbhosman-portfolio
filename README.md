# Herb Hosman Portfolio

Personal site: [https://herbhosman.com](https://herbhosman.com)

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

Next.js · Tailwind CSS · TypeScript · Vercel

## Experiences

The live site uses a full-viewport **snap** layout (section lock + project carousel).

To roll back to the previous continuous page:

1. Open `src/app/page.tsx`
2. Set `PORTFOLIO_EXPERIENCE` to `"classic"`
3. Redeploy

```ts
export const PORTFOLIO_EXPERIENCE: "snap" | "classic" = "classic";
```

## Contact form

The snap experience uses a FormSubmit-powered contact form (destination address is not shown on the page).

1. Submit the form once from the live site (or locally).
2. Open the portfolio inbox and click FormSubmit’s **Activate Form** link (one-time).
3. Submissions will arrive as email after that.

Spam controls: dual honeypots, minimum fill time, browser + IP rate limits, link flood check, and FormSubmit `_blacklist` phrases. AJAX can’t use FormSubmit’s reCAPTCHA, so those layers replace it.

Optional override:

```bash
NEXT_PUBLIC_FORMSUBMIT_ENDPOINT=https://formsubmit.co/ajax/you@example.com
```
