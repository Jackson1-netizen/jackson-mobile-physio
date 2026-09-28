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

## 2026-09-28 — Central content refactor + privacy page

- **Single file:** All public copy fields consolidated in `src/content/site.ts` (practitionerName, qualifications, about paragraphs, NDIS single description, privacy sections, internal `websiteUrl` only).  
- **Email:** `[EXISTING BUSINESS EMAIL — NOT PROVIDED]` — Jackson did not supply an address; no invented email.  
- **`websiteUrl`:** `https://example.com` for Astro/canonical/JSON-LD only — **not rendered** on public pages or referral sheet.  
- **AHPRA:** `ahpraStatus` Pending; `ahpraRegistrationNumber` empty; no registered-physio claims.  
- **`/privacy`:** Draft policy from `site.privacy`; footer links to `/privacy`.  
- **Hours:** Stored in `businessHours` for docs/GBP prep; not shown on marketing pages.  
