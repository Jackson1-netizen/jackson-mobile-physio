# SEO & launch checklist

Use this list when Jackson is ready to move from **draft** to **public, indexable** site. Agents do **not** create GBP, buy domains, or deploy without explicit instruction.

**Precondition:** `registrationStatus` updated to `registered` and `registrationNumber` set in `src/content/site.ts` (or successor config) **only when AHPRA has granted registration**.

---

## A. Legal & professional readiness

- [ ] AHPRA physiotherapy registration **granted** (not merely submitted)
- [ ] `registrationStatus: "registered"` and correct `registrationNumber` in central config
- [ ] On-site AHPRA notice and qualifications updated (no “pending” banner in marketing body unless Jackson wants transparency)
- [ ] Professional indemnity insurance current (internal confirmation; wording on site if desired)
- [ ] Privacy policy reviewed by Jackson / adviser; `privacy.lastUpdated` set
- [ ] Business email confirmed and published (replace placeholder)
- [ ] NDIS copy reviewed: plan-managed & self-managed only; **not** NDIS registered provider
- [ ] No fabricated testimonials, ratings, awards, or clinic address

---

## B. Domain & hosting

- [ ] Production domain chosen (Jackson purchases — agents do not buy)
- [ ] DNS pointed to static host (Cloudflare Pages, Netlify, etc. — Jackson chooses)
- [ ] HTTPS certificate active
- [ ] `websiteUrl` in config set to `https://[production-domain]/` (no trailing path errors)
- [ ] 301 redirects configured: `www` ↔ apex if both exist; old `/referral`, `/areas/*` if ever indexed

---

## C. Site config — draft → production

- [ ] `draft: false` in central config
- [ ] `BaseLayout` emits `index, follow`
- [ ] `robots.txt` allows crawlers and references sitemap URL
- [ ] Draft banner hidden or removed
- [ ] `emailHref` uses real `mailto:` address
- [ ] Enquiry form privacy consent live and linked to `/privacy/`
- [ ] Build passes: `npm run build`
- [ ] Spot-check all V2 routes (see `docs/WEBSITE_V2_PLAN.md` sitemap)

---

## D. On-page & technical SEO

- [ ] Unique `<title>` and meta description per page
- [ ] One H1 per page = search/service intent (not business name alone)
- [ ] Canonical tags use production `websiteUrl`
- [ ] OG/Twitter images: real branded image (not placeholder SVG)
- [ ] JSON-LD validated (Google Rich Results Test) — no false `AggregateRating`
- [ ] Sitemap submitted-ready (`/sitemap-index.xml` or Astro default)
- [ ] Internal links: home → service pages → contact
- [ ] Images: alt text, compressed, dimensions set
- [ ] Lighthouse: performance & accessibility acceptable on mobile

---

## E. Google Search Console

- [ ] Property added for production domain (domain or URL prefix)
- [ ] Ownership verified (DNS TXT or HTML file)
- [ ] Sitemap submitted
- [ ] Inspect home URL → request indexing when ready
- [ ] Monitor Coverage / Page indexing for errors post-launch

---

## F. Google Business Profile (GBP)

**Do not create until Jackson is ready to manage it.** Agents document only.

- [ ] Profile type: **Service-area business** (no public home address unless a real office is used)
- [ ] **Business name** matches `businessName` in config (legal/trading name — not practitioner personal name unless that is the registered trading name)
- [ ] Primary phone matches site (`0433 479 703` or updated number)
- [ ] Website URL = production domain
- [ ] Service areas: eastern suburbs aligned with `/service-areas/`
- [ ] Categories: Physiotherapist (and relevant secondary)
- [ ] Description: mobile, multilingual, direct practitioner contact; NDIS plan/self-managed; **not** registered provider if true
- [ ] Hours: by appointment per Jackson
- [ ] Languages: English, Cantonese, Mandarin
- [ ] Photos: real Jackson / service images from shot list
- [ ] ABN in profile if GBP field available and appropriate
- [ ] Verification completed (postcard/video as required)

---

## G. NAP consistency

| Field | Source of truth | GBP | Website footer | Referral PDF |
|-------|-----------------|-----|--------------|--------------|
| Business name | `site.businessName` | Match | Match | Match |
| Phone | `site.phone` | Match | Match | Match |
| Website | `site.websiteUrl` | Match | Match | Optional |
| Address | None (service area) | Service area only | No street | No street |

- [ ] NAP audited across GBP, site, and any directory listings Jackson adds

---

## H. Post-launch (first 30 days)

- [ ] Confirm indexing in Search Console
- [ ] GBP live and linked from site footer (“Google Business” optional text link)
- [ ] Populate reviews section only with authentic Google review link (no fake stars)
- [ ] Share `/referrals/` with coordinators
- [ ] Append outcome to `docs/DAILY_LOG.md`

---

## I. Explicit non-actions (unless Jackson asks)

- Do not enable auto-deploy from git
- Do not purchase domain or GBP on Jackson’s behalf
- Do not remove `noindex` early for “preview” on production domain
- Do not publish suburb doorway pages
