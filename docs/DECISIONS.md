# Decisions log

Append-only record. Do not silently overwrite prior entries.

## 2026-09-28 — Phase 1 bootstrap

- **Stack:** Astro 7 + TypeScript (strict) + Tailwind CSS 4, static output.  
- **Port:** Dev server on `4721` (uncommon default).  
- **Content:** Single module `src/content/site.ts` for all business placeholders and SEO strings.  
- **Draft posture:** Site-wide `noindex` robots meta + `robots.txt` disallow + visible draft banner; AHPRA described as submitted-not-granted only.  
- **NDIS copy:** Welcomes plan-managed and self-managed **enquiries**; explicitly avoids registered-provider language and funding guarantees.  
- **Referral:** Dedicated `/referral` page with print CSS (A4); no client-side print script.  
- **Checkpoint:** `npm run checkpoint` appends `docs/DAILY_LOG.md`, commits, pushes current branch if origin exists — no force-push.  

## 2026-09-28 — Jackson confirmed business details (stay draft)

- **Confirmed in `site.ts`:** `businessName` and `practitioner.name` → **WAI WA LAW**; phone **0433 479 703** (`tel:+61433479703`); ABN **75 612 731 757** (display formatted).  
- **Still placeholder:** email, website URL, credentials, bio, AHPRA registration number, distinct legal trading name, hours, privacy policy.  
- **Draft posture unchanged:** `noindex` / robots disallow until AHPRA granted; no claim of current AHPRA registration or NDIS registered provider status.  
- **GitHub:** Jackson wants a **private** repo `jackson-mobile-physio`; creation blocked in cloud — `gh` not authenticated (`gh auth login` required on his side or token via secure env, not in repo).  

## 2026-09-28 — Private GitHub repo created (Phase 1 push)

- **Owner:** `Jackson1-netizen` / repo `jackson-mobile-physio` (private).  
- **Clone:** `https://github.com/Jackson1-netizen/jackson-mobile-physio.git`  
- **Remotes in dev:** keep Cursor **Origin** as `origin`; add **GitHub** as `github`.  
- **Branches on GitHub:** `cursor/bootstrap-jackson-mobile-physio-e489` (Phase 1 tip ~`b627277`); `main` fast-forwarded to same tip (safe — Origin `main` was README-only).  
- **Deploy:** not performed; site remains draft (`noindex`).  

## 2026-09-28 — Central content refactor + privacy page

- **Single file:** All public copy fields consolidated in `src/content/site.ts` (practitionerName, qualifications, about paragraphs, NDIS single description, privacy sections, internal `websiteUrl` only).  
- **Email:** `[EXISTING BUSINESS EMAIL — NOT PROVIDED]` — Jackson did not supply an address; no invented email.  
- **`websiteUrl`:** `https://example.com` for Astro/canonical/JSON-LD only — **not rendered** on public pages or referral sheet.  
- **AHPRA:** `ahpraStatus` Pending; `ahpraRegistrationNumber` empty; no registered-physio claims.  
- **`/privacy`:** Draft policy from `site.privacy`; footer links to `/privacy`.  
- **Hours:** Stored in `businessHours` for docs/GBP prep; not shown on marketing pages.  

## 2026-09-28 — Launch-ready marketing upgrade (still draft)

- **Scope:** Multi-section home, 8 suburb pages under `/areas/[slug]`, FAQ accordion + FAQPage schema, how-it-works steps, enquiry mailto form, sticky mobile CTAs, trilingual UI via `src/content/i18n.ts` (English / 繁體 / 简体).  
- **Content split:** `site.ts` (business + launch switches), `i18n.ts` (UI strings), `suburbs.ts` (geo landing copy), `index.ts` re-export.  
- **SEO prep:** Per-page title/description, OG tags, LocalBusiness + FAQ JSON-LD, Astro sitemap integration (blocked from indexing while draft).  
- **Trust:** No fake testimonials; empty reviews slot; AHPRA remains Pending; NDIS plan/self-managed only — not registered provider.  
- **Deploy:** Not performed; `draft: true`, `noindex`, robots disallow unchanged until Jackson confirms AHPRA and launch steps in `docs/NEXT_STEPS.md`.  

## 2026-09-28 — Website V2 planning (no implementation)

- **Direction reset:** Jackson requested a full UX/SEO/visual **plan only** — no BUILD V2, no homepage decoration, no deploy.  
- **Deliverables:** `docs/WEBSITE_V2_PLAN.md`, `docs/SEO_STRATEGY.md`, `docs/SEO_LAUNCH_CHECKLIST.md`, `docs/PHOTO_SHOT_LIST.md` on branch `cursor/website-v2-plan-e732`.  
- **IA:** Multi-page sitemap (`/`, `/about/`, `/mobile-physiotherapy/`, `/ndis-physiotherapy/`, `/service-areas/`, `/referrals/`, `/contact/`, `/privacy/`); **deprecate** `/areas/[slug]` suburb doorway pages.  
- **SEO:** H1 = service/search intent, not `businessName`; `businessName` separate from `practitionerName`; rebrand-friendly `displayBrand` proposed in config spec.  
- **AHPRA config (V2):** `registrationStatus: "pending" | "registered"`, `registrationNumber: null | string` — replace ad-hoc pending strings at implementation.  
- **NDIS:** Remain not a registered provider; plan/self-managed enquiries only; no NDIA-managed claims.  
- **Visual:** Three directions documented; **recommended Direction A (Calm Professional)** with C-style hero typography.  
- **Approval gate:** Jackson replies **BUILD V2** after reviewing plan; until then Phase 1 code on `cursor/launch-ready-site-2581` remains canonical implementation.  

## 2026-09-28 — V2 visual direction approved (hybrid)

- **Chosen:** Hybrid on **Direction A (Calm Professional)** base — forest/sage, serif+sans, referrer-friendly — plus **vitality** (community movement, not gym/startup/flashy animation), **older-adult readability** (large type, high contrast, uncluttered warmth), **亲近感** (personal, Jackson-forward photography/copy), **伦理感** (honest AHPRA/NDIS, no fake social proof, calm not salesy).  
- **Not chosen alone:** Pure B (Community Local) or pure C (East Melbourne Modern); partial borrow from C: hero type hierarchy + sticky phone bar only.  
- **Documented in:** `docs/WEBSITE_V2_PLAN.md` §8.  
- **Implementation:** Still blocked until Jackson sends **BUILD V2**; no UI changes in this update.  

## 2026-09-28 — BetterCare quality bar (brainstorming, planning only)

- **Reference:** [bettercarehg.com](https://www.bettercarehg.com) for **visual quality** and **interaction density** — adapted, not cloned.  
- **Documented:** `docs/WEBSITE_V2_PLAN.md` §14 (audit, transferable patterns, will/won’t take, three BUILD approaches).  
- **Recommended BUILD approach:** “Polished sole practitioner” (~60% BetterCare interaction density, forest/sage hybrid §8).  
- **Explicit won’t copy:** Yellow/navy brand, mega-menu, fake/review carousel UX, NDIS registered positioning, team-at-scale imagery.  
- **No implementation** — awaiting **BUILD V2**.  
