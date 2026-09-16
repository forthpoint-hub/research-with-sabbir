# Research With Sabbir — V1

Next.js + TypeScript + Tailwind site for Research With Sabbir.

## Adding content

- **Research reports:** add an object to `data/research.ts`. For a free
  report, drop the PDF in `public/reports/` and set `pdfUrl`. For a
  premium report, set `externalUrl` to your checkout link.
- **Products:** add an object to `data/products.ts` with a `checkoutUrl`.
- **Insights:** add an object to `data/insights.ts`.

No other code changes are needed to publish new content — the pages read
directly from these files.

## Local development

```
npm install
npm run dev
```

## Deployment

This project deploys on Vercel. Push to GitHub, then import the repo in
Vercel — it builds automatically on every push to the main branch.

Before your first deploy, open `lib/metadata.ts` and update `SITE_URL`
once you know your real Vercel URL (or custom domain).
