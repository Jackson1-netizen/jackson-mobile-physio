# Decisions log

Append-only record. Do not silently overwrite prior entries.

> **Superseded / current state (2026-10-02):** Follow `docs/LAUNCH_STATUS.md`. The public brand is Home Motion, not “WAI WA LAW”. AHPRA general registration PHY0004088824 is on the draft site. The canonical origin is not `example.com`. Older entries below are the record of what was decided at the time.

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

## 2026-09-28 — Workflow locked: concepts before plans

- **Chain:** Competitor ref → brainstorming (§14) → **3 homepage concepts** → Jackson pick → Wonder refinement → writing-plans → executing-plans → Astro production → audit.  
- **Benchmark quote** recorded in §14.  
- **Concept routes:** `/concepts/1/` Editorial Forest, `/concepts/2/` Warm Meadow, `/concepts/3/` Active Path — mockups only, `noindex`.  
- **Gate:** Waiting for Jackson to reply **1**, **2**, or **3**. No writing-plans, no executing-plans, no production multi-page site yet.  

## 2026-09-28 — Concept 1 locked; Wonder refinement in-repo

- **Chosen:** **Concept 1 — Editorial Forest** for homepage visual direction.  
- **Wonder MCP:** Namespace `Wonder` status `needsAuth` — Jackson auth not performed; refinement done **in-place** on `/concepts/1/`.  
- **Refinement:** Trust band, nav + dual CTAs, editorial hero (left accent), service teasers, process, FAQ accordion, forest enquiry band; no fake photos/reviews.  
- **Next gate:** Explicit request to run **writing-plans** — not started.  

## 2026-09-28 — Concept 1 homepage system + three colour themes

- **Scope:** Complete V2 **homepage** mockup only (not production multi-page site).  
- **Routes:** `/concepts/1/` compare hub; `/concepts/1/a|b|c/`; `?theme=` redirect on hub.  
- **Content:** Central `concept1-home.ts`, `concept1-images.ts`; component `HomepageV2.astro`.  
- **Sections:** Trust → Physio at home → Services (7) → How it works → Meet Jackson → NDIS → Areas/map → Referrers → FAQ → Contact; reviews skipped.  
- **Gate:** Jackson picks **A**, **B**, or **C** before writing-plans.  

## 2026-09-28 — Palette A locked; Homepage V1 at `/`

- **Palette:** **A (forest/sage)** chosen.  
- **V1:** Full scrollable homepage on **`/`** — video hero (reduced-motion poster), `displayBrand` header, registration line from `registrationStatus`, all sections, no reviews; draft + noindex via `BaseLayout` `v1Home`.  
- **Not done:** Multi-page production site, deploy, writing-plans.  

## 2026-09-28 — Saved V1 on `main`; ChatGPT alternative branch

- **Saved design:** Jackson is happy with the current Home Motion homepage V1 (palette A, forest/sage). That snapshot stays on **`main`** — do not overwrite it with an experimental redesign.
- **Comparison branch:** **`cursor/chatgpt-version-b759`** starts from this same commit. Use it for a possible ChatGPT-produced alternative site so Jackson can come back and pick which design to ship.
- **How to compare:** keep `main` as the baseline; put ChatGPT/experimental UI only on `cursor/chatgpt-version-b759`. No deploy; both remain draft/`noindex`.

## 2026-09-28 — Home Motion ChatGPT visual redesign (audit only)

- **Branch:** `cursor/chatgpt-version-b759` only. No merge to `main`. No implementation until Jackson sends **BUILD HOME MOTION DESIGN**.
- **Spec:** `docs/HOME_MOTION_BRANCH_REDESIGN.md`. Visual source: `docs/references/home-motion-chatgpt-reference.png`.
- **Approach:** New homepage module on `/`; leave Concept 1 archive and `main` V1 untouched.
- **Motion:** Keep existing reveals, video, hovers, accordion, sticky CTAs; add only subtle extras (arrow, stagger, optional desktop parallax). Current site has no mouse-follow or per-word heading animation.
- **Honesty:** Do not use reference email, fake map, fake merch, or “NDIS & private clients” chip.

## 2026-09-28 — AHPRA registration granted

- **Confirmed by Jackson:** AHPRA physiotherapy registration has been granted.
- **Updated:** `registrationStatus` is `registered`; qualifications, notices, FAQs, suburb copy, referral sheet, and schema no longer say pending.
- **Not invented:** registration number is still empty until Jackson provides it. Site stays draft / noindex. Not deployed.

## 2026-09-28 — ChatGPT visual archived; option 2 branch opened

- **Archived:** `cursor/chatgpt-version-b759` is option 1 (ChatGPT visual). Treat as frozen for comparison.
- **New branch:** `cursor/design-option-2-b759` for the second design exploration. Starts from the archived ChatGPT snapshot so Jackson can change it without touching option 1 or `main`.
- **Still do not merge to `main`.** `main` remains the original V1.

## 2026-09-29 — Option 2: honest form, self-hosted assets, lazy map

- **Enquiry form:** No email address or form endpoint is confirmed, so the form checks the fields and then shows a "not available yet — please call" notice. It never claims to send. It switches to a `mailto:` automatically once `site.email` is a real address (`hasConfirmedEmail()`). All other email links are hidden until then.

## 2026-09-30 — Public business emails published, delivery not live

- **Public identity:** `publicEmail` = `hello@homemotionphysio.com.au`; `referralEmail` = `referrals@homemotionphysio.com.au` in `src/content/site.ts`. Displayed by audience (contact/footer vs referrers/referral sheet). Old `hello@homemotionphysio.au` card address removed.
- **Not live:** Mailboxes are not verified. The form still never claims a message was sent. `src/lib/email-delivery.ts` keeps private notification env vars (`ENQUIRY_NOTIFICATION_EMAIL`, `REFERRAL_NOTIFICATION_EMAIL`) off the frontend. No SMTP, DNS, or secrets were added.
- **Later:** Domain forwarding and reply-from identity are documented in `docs/EMAIL_SETUP.md`. Set `EMAIL_DELIVERY_READY=true` only after a test message arrives.
- **Fonts:** Source Sans 3 / Source Serif 4 Latin subsets are self-hosted in `public/fonts/` with `font-display: swap`. They use the same weights as before, plus metric-matched local fallbacks so the swap doesn't shift the layout. Google Fonts are no longer requested by the site; concept mockups are unchanged.
- **Images:** `scripts/optimize-images.mjs` (sharp, already installed with Astro) writes AVIF/WebP variants to `public/photos/opt/` and lossless resized logo copies to `public/logo/`. Originals, including `home-motion-logo.png`, are unchanged.
- **Map:** Leaflet JS and CSS load only when the map is within 300px of the viewport. If they fail, the static pin fallback stays visible.
- **Sitemap:** `/concepts/**` excluded. Draft / noindex unchanged.

## 2026-10-02 — Launch-readiness pass on the option 2 design (still draft)

- **Branch:** work landed on `cursor/launch-readiness-16bd`, based on `cursor/design-option-2-b759`. Not merged to `main`. Not deployed.
- **Identity published from public registers:** ABN 75 612 731 757 (LAW, WAI WA, sole trader; ASIC business name Home Motion Physiotherapy). AHPRA general registration PHY0004088824. Expiry date is not published.
- **Launch switch:** `site.draft` remains `true` (noindex + robots disallow). Production origin prepared as `https://homemotionphysio.com.au` without changing DNS.
- **NDIS:** “NDIS plan-managed and self-managed enquiries welcome.” Not an NDIS registered provider. No funding guarantee.
- **Enquiry:** name and phone required; other fields optional; no health-detail fields; note not to include sensitive information. Mailto only.
- **Legal:** `/privacy` and `/disclaimer` rewritten as drafts pending owner review (`docs/LEGAL_DRAFTS.md`).
- **Not merged:** `cursor/launch-ready-site-2581` and related branches have no merge base with this design and would conflict. Recorded in `docs/LAUNCH_STATUS.md`.

## 2026-10-02 — Netlify preview only (no production domain)

- **Host:** Netlify free plan. `netlify.toml` builds `dist` with Node 22. The ignore script allows pull-request deploy previews and the branch `cursor/design-option-2-b759`. It skips `main` and every other branch.
- **Not done from this repo:** creating the Netlify site, adding a custom domain, changing VentraIP DNS, or merging to `main`.
- **Indexing:** `site.draft` stays `true`. HTML `noindex`, `robots.txt` disallow, and a generated `X-Robots-Tag` stay in place. Preview and that branch deploy stay `noindex` even if the draft switch later changes.
- **Canonicals:** preview and branch deploys use `DEPLOY_PRIME_URL` or `URL`. `PUBLIC_SITE_URL` stays unset on those deploys.
- **Enquiry form:** Netlify Forms, notification destination `hello@homemotionphysio.com.au` (dashboard only). No Formspree, EmailJS, Resend, SMTP, or other new account. `ENQUIRY_NOTIFICATION_EMAIL`, `REFERRAL_NOTIFICATION_EMAIL`, and `EMAIL_DELIVERY_READY` are unused and must stay unset.
- **Env names** (no values in Git): `CONTEXT`, `BRANCH`, `URL`, `DEPLOY_PRIME_URL` from Netlify; `NODE_VERSION` in `netlify.toml`; optional `PUBLIC_SITE_URL` for a non-preview local build only.

## 2026-10-02 — Staging production branch is the design branch

- **Risk:** `main` has no `netlify.toml`. If Netlify’s production branch stayed `main`, the first production deploy would auto-detect a build, skip the ignore script, and publish the old site at `*.netlify.app` without this `noindex` header.
- **Staging:** After PR #3 is merged into `cursor/design-option-2-b759`, that branch is Netlify’s production branch. No custom domain. No merge to `main`.
- **Ignore script:** Builds only `CONTEXT=production` with `BRANCH=cursor/design-option-2-b759`, and deploy previews whose pull request targets that branch (`REVIEW_ID` via the public GitHub API). Everything else is skipped.
- **Indexing:** While `site.draft` is true, that production deploy and those previews stay `noindex` in the HTML meta tag, `robots.txt`, and `X-Robots-Tag`.
- **Launch later:** The real production branch and the domain are a separate decision with Jackson.
