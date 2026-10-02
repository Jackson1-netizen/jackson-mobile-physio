# Next steps — launch checklist

**Current posture (2026-10-02):** see `docs/LAUNCH_STATUS.md`. `site.draft = true` is the only indexing switch. ABN 75 612 731 757 and AHPRA PHY0004088824 are published. The domain is registered and still parked. **Do not deploy or change DNS** until Jackson asks.

The sections below are the earlier checklist and are kept for history. Where they disagree with `docs/LAUNCH_STATUS.md`, follow `docs/LAUNCH_STATUS.md`.

---

## Design comparison (do not mix)

| Branch | What it is |
|--------|------------|
| `main` | **Saved** Home Motion V1 — original forest/sage homepage Jackson liked. Baseline. Do not overwrite. |
| `cursor/chatgpt-version-b759` | **Archived option 1** — ChatGPT visual redesign (cream / orange / medium green). Frozen. Do not keep experimenting here. |
| `cursor/design-option-2-b759` | **Option 2** — second design branch. New visual experiments go here. |

Jackson will come back and pick which design to use. Keep experimental redesigns off `main`. Do not merge into `main` until Jackson chooses.

## Website V2 (workflow — Concept 1 refined)

1. **Review V1:** `http://127.0.0.1:4721/` (palette A, draft, noindex).  
2. **Archive:** `/concepts/1/` for B/C comparison only.  
3. **Next:** Explicit **writing-plans** when ready — not production multi-page yet.  
4. **Then:** executing-plans → production multi-page Astro site → Lighthouse/SEO audit.  
5. **Branch:** `cursor/website-v2-plan-e732`.

---

## When Jackson confirms AHPRA registration is granted

Jackson must **tell you in writing** (message to Cursor agent or confirmed note) before any public launch step below.

1. **`src/content/site.ts`**
   - Set `ahpraStatus` to `"Registered"` (or the exact label you agree with your adviser).
   - Set `ahpraRegistrationNumber` to the real AHPRA number (no placeholders).
   - Replace `ahpraNotice` with accurate registered-physiotherapist wording approved by Jackson.
   - Update qualifications line for AHPRA from `"Pending"` to the registration display you want on the site.

2. **Still draft until you choose go-live**
   - Leave `draft: true` until Jackson also approves removing draft mode (privacy review, email, domain).

3. **When ready for public indexing** (only after AHPRA + email + privacy review):
   - Set `draft: false` in `site.ts`.
   - `BaseLayout.astro` will emit `index, follow` when `draft` is false.
   - Update `src/pages/robots.txt.ts` to allow crawling and point to the live sitemap URL.
   - Set `websiteUrl` in `site.ts` to the **real** production URL (used for canonical, OG, JSON-LD, sitemap — still not shown as body copy unless you add it deliberately).
   - Remove or shorten the visible draft banner (`DraftBanner.astro` is tied to `site.draft`).
   - Deploy to your chosen host (not done by agents until you ask).

4. **After launch**
   - Add verified Google Business Profile and link real Google reviews in the home “Reviews” section (currently an honest empty slot).
   - Submit sitemap in Search Console.

---

## Before launch (still required)

| Item | Action |
|------|--------|
| **Business email** | Public addresses are in `site.publicEmail` / `site.referralEmail`. The enquiry form is a Netlify Form; the notification to `hello@` is a Netlify dashboard setting (`docs/EMAIL_SETUP.md`). Leave `EMAIL_DELIVERY_READY` unset. |
| **Degree / university** | Confirm qualifications line (currently placeholder). |
| **Privacy** | Legal review of `site.privacy`; set `privacy.lastUpdated`. |
| **Legal trading name** | Confirm or remove `legalNamePlaceholder`. |
| **Production URL** | Set `websiteUrl` when domain is known. |
| **Deploy** | Netlify free-plan preview only. Config is in the repo. Jackson connects the site and does not attach the production domain (`docs/DEPLOYMENT.md`). |

---

## Local development

```bash
npm install
npm run dev    # http://127.0.0.1:4721
npm run build
```

## Content editing

- Business facts and launch switches: `src/content/site.ts`
- UI strings (EN / 繁體 / 简体): `src/content/i18n.ts`
- Suburb landing copy: `src/content/suburbs.ts`
- Re-export: `src/content/index.ts`

## Key routes

| Path | Purpose |
|------|---------|
| `/` | Home — hero, about, services, how it works, NDIS, areas, FAQ, enquiry, referrers |
| `/areas/[slug]` | Suburb landing pages (8 suburbs) |
| `/referral` | Printable referral sheet |
| `/privacy` | Privacy policy (draft) |
