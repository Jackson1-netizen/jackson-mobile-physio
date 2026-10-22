# Home Motion — mobile physiotherapy (draft)

Draft marketing site for **Home Motion Physiotherapy** — mobile physiotherapy in Melbourne's eastern suburbs. Built with **Astro 7**, **TypeScript**, and **Tailwind CSS 4**.

> **Not live:** `site.draft = true` is the launch switch (`noindex` and `robots.txt` disallow). ABN 75 612 731 757. AHPRA registration is stated without a published practitioner number. **Do not deploy or change DNS** until Jackson asks. Status: `docs/LAUNCH_STATUS.md`.

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
| `/referral` | Text-led referral information and A4 print controls (no QR) |
| `/privacy` | Adopted privacy policy (site remains draft/noindex) |
| `/disclaimer` | Adopted disclaimer (site remains draft/noindex) |

Current candidate: agent/HOME-002-about-enquiry → OPEN PR #10 → cto/home-motion-integration → future production. Public canonical/primary domain is apex https://homemotionphysio.com.au/; www redirects to apex. See docs/DEPLOYMENT.md.

## GitHub

Public repo: `https://github.com/Jackson1-netizen/jackson-mobile-physio.git`  
Do not commit secrets or private inboxes.  
See `docs/GITHUB_WORKFLOW.md`.

## Documentation

- `docs/NEXT_STEPS.md` — final independent review and separately approved release steps
- `docs/EMAIL_SETUP.md` — mail routing history; current delivery needs account-side verification
- `docs/PROJECT_BRIEF.md`, `docs/DECISIONS.md`, `docs/DAILY_LOG.md`
