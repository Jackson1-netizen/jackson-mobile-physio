# Jackson mobile physiotherapy — Phase 1 (draft)

Static marketing site for an independent **mobile physiotherapy** service in Melbourne's eastern suburbs. Built with **Astro**, **TypeScript**, and **Tailwind CSS**.

> **Draft:** Placeholders only. Not deployed. Not a live public professional site. AHPRA registration is described as submitted-not-granted.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:4721](http://127.0.0.1:4721).

Other commands:

```bash
npm run build    # static output to dist/
npm run preview  # preview production build
npm run check    # astro check
npm run checkpoint  # safe git checkpoint + DAILY_LOG append
```

## Edit business content

All name, contact, areas, services, NDIS, and SEO strings live in:

`src/content/site.ts`

Do not scatter business copy across components.

## Key routes

| Path | Purpose |
|------|---------|
| `/` | Single-page marketing site |
| `/referral` | A4-friendly printable referral sheet |

## Documentation

See `docs/PROJECT_BRIEF.md`, `docs/NEXT_STEPS.md`, and `docs/GITHUB_WORKFLOW.md`.
