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

## SEO

- Canonical URL `https://herbhosman.com`
- Open Graph / Twitter cards
- JSON-LD Person + ProfilePage
- `/sitemap.xml` and `/robots.txt`
