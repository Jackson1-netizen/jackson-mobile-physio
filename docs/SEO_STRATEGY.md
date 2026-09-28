# SEO strategy — Jackson mobile physiotherapy (V2)

**Scope:** Organic search for an independent **mobile** physiotherapy service in **Melbourne’s eastern suburbs**, with **English, Cantonese, and Mandarin** support. Site remains **draft / noindex** until AHPRA registration and launch checklist are complete.

**Related:** `docs/WEBSITE_V2_PLAN.md`, `docs/SEO_LAUNCH_CHECKLIST.md`.

---

## 1. Goals

| Goal | Metric (post-launch, 6–12 months) |
|------|-----------------------------------|
| Be discoverable for **mobile physio + suburb/region** queries | Impressions for “mobile physiotherapy [suburb]” cluster |
| Convert **NDIS plan/self-managed** searchers without misleading registration claims | Qualified enquiries; low “wrong provider type” contacts |
| Support **CALD** families searching in English or Chinese descriptors | Clicks from bilingual meta and on-page language signals |
| Earn **referrer** discovery (GPs, coordinators) | Branded + “refer mobile physio eastern suburbs” |

No paid search in V2 scope.

---

## 2. Positioning in SERPs

**We are not:** an NDIS registered provider, a clinic with a street address, or a multi-practitioner chain.

**We are:** a **sole mobile practitioner** — personal care, eastern suburbs, trilingual, **direct contact with the attending physio**.

**Title/H1 policy**

- **H1:** service + geography (or page-specific service intent).  
- **`<title>`:** intent first; `businessName` or `displayBrand` as suffix.  
- Avoid leading every title with the legal trading name.

---

## 3. Technical SEO (Astro static)

| Item | Approach |
|------|----------|
| **Indexing** | `site.draft === true` → `noindex, nofollow` + robots disallow; flip only per checklist |
| **Canonical** | Absolute URLs from `websiteUrl` + path; one canonical per page |
| **Sitemap** | Auto-generated; include only public routes; exclude draft-only assets |
| **robots.txt** | Disallow all while draft; allow + sitemap URL when live |
| **Performance** | Static HTML, minimal JS, optimized images (WebP/AVIF), font subset |
| **Mobile** | Responsive; tap targets ≥44px; sticky phone CTA |
| **HTTPS** | Required on production host |
| **Structured data** | See §5 |

**URL policy**

- Clean paths: `/mobile-physiotherapy/`, trailing slash consistent with Astro config.  
- **No** mass suburb doorway URLs.  
- 301 from deprecated `/areas/*` and `/referral` when V2 ships.

---

## 4. On-page SEO by page

### Home (`/`)

- Primary cluster: *mobile physiotherapy eastern suburbs Melbourne*, *mobile physiotherapist Melbourne east*.  
- Mention 3–5 priority suburbs once in body; link to `/service-areas/`.  
- FAQ block supports FAQ rich results (already patterned in Phase 1).  
- Open Graph image: real photo when available.

### About (`/about/`)

- Practitioner name (Jackson), languages, qualifications **only when confirmed**.  
- E-E-A-T: real person, real phone, ABN in footer — not keyword stuffing.

### Mobile physiotherapy (`/mobile-physiotherapy/`)

- *home visit physiotherapy*, *physiotherapist home visit*, *community physiotherapy*.  
- Explain process, setting, what to prepare — original copy.

### NDIS (`/ndis-physiotherapy/`)

- Target *NDIS physiotherapy* + *plan managed* / *self managed* with **prominent** “not an NDIS registered provider”.  
- Do not target *NDIS registered physiotherapist* as primary intent.

### Service areas (`/service-areas/`)

- Single page listing Box Hill, Doncaster, Blackburn, Ringwood, Burwood, Glen Waverley, Mitcham, Nunawading + surrounding.  
- Use structured list (`<ul>`), optional `areaServed` in JSON-LD.  
- No thin duplicate pages per suburb.

### Referrals (`/referrals/`)

- *refer mobile physiotherapy*, coordinator language.  
- Printable sheet indexable with clear H1.

### Contact (`/contact/`)

- NAP consistency with GBP (phone, business name); **no** fake address.  
- LocalBusiness / Physician schema with `areaServed`, not `streetAddress` unless a real office exists later.

### Privacy (`/privacy/`)

- Indexable at launch; low SEO priority.

---

## 5. Structured data

| Type | Where | Notes |
|------|-------|-------|
| **LocalBusiness** or **Physician** | Site-wide or home | `@type` choice after AHPRA registered; include `telephone`, `areaServed`, `knowsLanguage` |
| **FAQPage** | Home (and optional NDIS page) | Only FAQs visible on page |
| **WebSite** | Home | `url`, `name` from config |
| **BreadcrumbList** | Inner pages | Home → current |

**While `registrationStatus === "pending"`**

- Do not use schema implying active AHPRA registration.  
- Omit `medicalSpecialty` overclaims; use conservative `description`.

**Reviews**

- No `AggregateRating` until real, verifiable Google reviews linked from GBP.

---

## 6. Local SEO (without doorway pages)

1. **Google Business Profile (GBP)** — service-area business; categories aligned to mobile physiotherapy; languages noted in description. See checklist doc.  
2. **NAP consistency** — same `businessName`, phone, website URL across GBP, site footer, referral PDF.  
3. **Service area** — list suburbs on site **once** on `/service-areas/` and in GBP service area settings.  
4. **Citations** — optional post-launch: AHPRA register link (when registered), professional directories Jackson chooses (no spam networks).  
5. **Reviews** — ask satisfied clients post-service **after** launch; embed or link only when authentic.

---

## 7. Multilingual SEO

- **Default:** one URL per page; language switcher updates visible text (Phase 1 pattern).  
- **Meta:** optional `description` translations in `i18n` for home, about, contact.  
- **Do not** auto-translate clinical promises or NDIS legal wording without human review.  
- **hreflang:** defer unless Jackson wants separate `/zh/` paths (not recommended for V2).

---

## 8. Content roadmap (post-V2 launch)

| Phase | Content | SEO role |
|-------|---------|----------|
| Launch | 8 core pages | Core intents |
| +3 months | 2–3 FAQ expansions or short guides (e.g. “What happens at a home physio visit?”) | Long-tail; internal links |
| +6 months | Evaluate **one** location-focused article only if data shows gap — not a suburb farm | Optional |

No blog commitment in V2 BUILD.

---

## 9. Competitor SEO — what we avoid

- **Suburb template farms** (After Hours, Get Set scale) — high maintenance, thin-content risk.  
- **Fake review schema** or star widgets without data.  
- **Copying** Lionrock / others’ CALD or NDIS paragraphs.  
- **Claiming** NDIS registration or NDIA-managed billing.

---

## 10. Measurement

After launch and Search Console verification:

- Track impressions/clicks by page and query (filter mobile).  
- Monitor branded queries once `displayBrand` is final.  
- GBP insights: calls, direction requests (if applicable), website clicks.  
- Quarterly: refresh service area list if coverage changes.

---

## 11. Governance

- All SEO strings live in `site.ts` / `i18n.ts` — not hardcoded in Astro markup.  
- Any change to AHPRA or NDIS claims requires doc update in `docs/DECISIONS.md`.  
- Removing `draft` or `noindex` requires Jackson written approval and checklist completion.
