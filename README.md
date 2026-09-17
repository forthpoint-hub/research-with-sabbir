# Research With Sabbir — V2

Next.js + TypeScript + Tailwind site, backed by Supabase (database, auth,
file storage) with an admin dashboard for managing content.

## Managing content

Go to `/admin` on the live site, log in with the admin account created in
Supabase, and use the dashboard to add/edit/delete:

- Research reports (with PDF upload for free reports)
- Products (with external checkout links)
- Insights

No code changes or GitHub pushes are needed to publish content — changes
appear on the live site within a few seconds.

## Local development

```
npm install
npm run dev
```

## Deployment

This project deploys on Vercel. Push to GitHub, then import the repo in
Vercel — it builds automatically on every push to the main branch.

The Supabase project URL and anon key are set directly in
`lib/supabaseClient.ts` (Supabase's anon key is designed to be public;
access control is handled by Row Level Security policies on each table,
not by hiding this key).
