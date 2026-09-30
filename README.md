# WAI WA LAW — mobile physiotherapy (draft)

Launch-ready **draft** marketing site for **WAI WA LAW** — independent mobile physiotherapy in Melbourne's eastern suburbs. Built with **Astro 7**, **TypeScript**, and **Tailwind CSS 4**.

> **Not live:** `site.draft = true`, `noindex`, and `robots.txt` disallow. AHPRA physiotherapy registration is **granted**. The registration number is not on the site until Jackson supplies it. **Do not deploy publicly** until Jackson asks and the remaining launch items in `docs/NEXT_STEPS.md` are done.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:4721](http://127.0.0.1:4721).

```bash
npm run build
npm run preview
npm run check
npm run checkpoint   # safe git checkpoint + DAILY_LOG append
```

## Edit content

| File | Purpose |
|------|---------|
| `src/content/site.ts` | Business details, NDIS/AHPRA posture, launch switches (`draft`, `ahpraStatus`) |
| `src/content/i18n.ts` | UI copy in English, 繁體中文, 简体中文 |
| `src/content/suburbs.ts` | Suburb landing page copy |
| `src/content/index.ts` | Single re-export |

Do not scatter business copy across components.

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home |
| `/areas/box-hill` (etc.) | Suburb landing pages |
| `/referral` | Printable referral sheet |
| `/privacy` | Privacy policy (draft) |

## GitHub

Private repo: `https://github.com/Jackson1-netizen/jackson-mobile-physio.git`  
See `docs/GITHUB_WORKFLOW.md`.

## Documentation

- `docs/NEXT_STEPS.md` — **what to flip when AHPRA is granted**
- `docs/EMAIL_SETUP.md` — public vs private email routing (no live sending yet)
- `docs/PROJECT_BRIEF.md`, `docs/DECISIONS.md`, `docs/DAILY_LOG.md`
