# Next steps — launch checklist

**Current posture:** `site.draft = true`, `site.ahpraStatus = "Pending"`, site-wide `noindex`, and `robots.txt` disallows all crawlers. **Do not deploy publicly** until Jackson explicitly confirms AHPRA registration is granted **and** you are ready to go live.

---

## Website V2 (visual direction locked — awaiting BUILD)

1. **Visual direction:** **Approved** — hybrid Calm Professional + vitality + older-adult warmth + 亲近感 + 伦理感. See `docs/WEBSITE_V2_PLAN.md` §8.  
2. **Jackson (optional):** Confirm sitemap / suburb list / copy tweaks before BUILD.  
3. **Jackson:** Reply **BUILD V2** in Cursor to authorize implementation (no site work until then).  
4. **After BUILD V2:** Photography per `docs/PHOTO_SHOT_LIST.md`; SEO per `docs/SEO_STRATEGY.md` and `docs/SEO_LAUNCH_CHECKLIST.md`.  
5. **Plan branch:** `cursor/website-v2-plan-e732` (docs). Implementation branches from this plan after BUILD V2.

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
| **Business email** | Replace `[EXISTING BUSINESS EMAIL — NOT PROVIDED]` in `site.ts`; set real `emailHref` (`mailto:`). |
| **Degree / university** | Confirm qualifications line (currently placeholder). |
| **Privacy** | Legal review of `site.privacy`; set `privacy.lastUpdated`. |
| **Legal trading name** | Confirm or remove `legalNamePlaceholder`. |
| **Production URL** | Set `websiteUrl` when domain is known. |
| **Deploy** | Jackson chooses host; agents do not deploy without explicit request. |

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
