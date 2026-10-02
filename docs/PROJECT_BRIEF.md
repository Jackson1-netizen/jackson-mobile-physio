# Project brief — Jackson mobile physiotherapy (Phase 1)

> **Superseded / current state (2026-10-02):** `docs/LAUNCH_STATUS.md` is the source of truth. The brand is Home Motion. AHPRA general registration is recorded in that file. Staging is on Netlify. Lines below that say registration is not granted, that the site is not deployed, or that there is no QR code are the original Phase 1 brief and are kept for history.

## Purpose

Marketing website and referral collateral for an independent **mobile / home / community physiotherapy** sole-trader service in **Melbourne's eastern suburbs**. Phase 1 is a **draft** static site — not deployed, not a live public professional presence.

## Audience

- People seeking mobile physio in the eastern suburbs  
- NDIS participants (plan-managed and self-managed **enquiries** only — no registration claims)  
- Families and support coordinators making referrals  

## Stack

- **Astro** + **TypeScript** + **Tailwind CSS**  
- Static output, minimal client JavaScript  
- All business copy and contact placeholders in `src/content/site.ts`  

## Constraints (non-negotiable)

- Do not invent business name, AHPRA status, testimonials, outcomes, or credentials  
- AHPRA registration **submitted, not granted** — draft mode  
- No home address; service-area business  
- Languages: English, Cantonese, Mandarin  
- Never claim “NDIS Registered Provider” or guaranteed funding/eligibility  

## Deliverables in Phase 1

- Single-page marketing site (`/`)  
- Printable referral sheet (`/referral`) + `docs/REFERRAL_SHEET_COPY.md`  
- SEO scaffolding (meta, OG, sitemap, robots, JSON-LD) from central content  
- Repo documentation and `npm run checkpoint` workflow  

## Out of scope (Phase 1)

- Deployment, booking, payments, CMS, auth, database  
- Real photography, QR codes, or live domain  

---

## Phase 2 — Website V2 (planned, not started)

**Intent (2026-09-28):** Full UX, SEO, and visual redesign documented in `docs/WEBSITE_V2_PLAN.md`. Multi-page static site; service-intent H1s; rebrand-friendly identity (`businessName` ≠ hero brand); remove suburb doorway pages in favour of `/service-areas/`. Implementation waits for Jackson approval (**BUILD V2**). Phase 1 history and `cursor/launch-ready-site-2581` remain the current shipped draft codebase until V2 BUILD merges.

**Supporting docs:** `docs/SEO_STRATEGY.md`, `docs/SEO_LAUNCH_CHECKLIST.md`, `docs/PHOTO_SHOT_LIST.md`.
