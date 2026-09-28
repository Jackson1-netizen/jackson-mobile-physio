# Home Motion branch redesign — Phase 1 audit (do not implement yet)

> **Status:** AUDIT ONLY. Implementation starts only after Jackson replies **`BUILD HOME MOTION DESIGN`**.  
> **Branch:** `cursor/chatgpt-version-b759`  
> **Do not merge into `main`.** `main` is the saved approved V1.  
> **Do not delete** `src/components/concept1/HomepageV2.astro` or concept archive routes.

**Goal:** Combine existing site behaviour (content, SEO, motion, enquiry, referral, NDIS honesty) with the attached ChatGPT visual specification.

**Reference image:** `docs/references/home-motion-chatgpt-reference.png`  
(Two desktop artboards: left = hero/services/areas/referrers; right = how-it-works / why-choose / areas / referrers. Treat both as one visual system, not two competing sites.)

---

## 0. Git / safety (inspected 2026-09-28)

| Check | Result |
|-------|--------|
| Current branch | `cursor/chatgpt-version-b759` — **not main** |
| `main` tip | `f6a61d2` — saved Home Motion V1 (Jackson approved as baseline) |
| This branch tip | same commit until this audit doc is committed |
| Merge to main | **Forbidden** for this work |
| Rewrite from scratch | **No** — restyle `/` on this branch only |
| Checkpoint | This document + commit **is** the pre-visual checkpoint |

Work only on `cursor/chatgpt-version-b759`. Preserve commit history. Do not force-push. Do not deploy. Draft/`noindex` stays until AHPRA + launch steps in `docs/NEXT_STEPS.md`.

---

## 1. Current homepage / architecture (what `/` actually is)

`/` is **not** the older i18n marketing page. It is Concept 1 Homepage V1:

| File | Role |
|------|------|
| `src/pages/index.astro` | Loads `HomepageV2` with `theme="a"` `mode="v1"` |
| `src/components/concept1/HomepageV2.astro` | Entire homepage: header, hero video, sections, footer, mobile bar, scroll-reveal script |
| `src/styles/concept1.css` | Theme tokens A/B/C, hero, cards, reveal, reduced-motion |
| `src/content/concept1-home.ts` | Homepage copy |
| `src/content/concept1-images.ts` | Stock Pexels video/photos (not Jackson) |
| `src/content/site.ts` | Canonical business facts |
| `src/layouts/BaseLayout.astro` | `v1Home` skips `SiteHeader` / `SiteFooter` / `StickyContactBar` / `I18nScript`; draft banner + SEO head remain |

**Still live, but not used on `/`:**

- `src/components/SiteHeader.astro`, `SiteFooter.astro`, `StickyContactBar.astro`, `LanguageSwitcher.astro`, `I18nScript.astro`, `EnquiryForm.astro` — used on `/referral`, `/privacy`, `/areas/[slug]`
- `src/content/i18n.ts` — fuller EN/繁體/简体 copy, 7 FAQs, 5 how-it-works steps, NDIS legal wording
- `src/content/suburbs.ts` + `/areas/[slug]` — eight suburb landing pages
- Concept archive: `/concepts/`, `/concepts/1|2|3/`

**Stack (keep):** Astro 7, TypeScript, Tailwind 4, static output, port `4721`. No React. No extra animation library.

---

## 2. Existing interactions / motion audit

Honest finding: the current site is **calmer** than the prompt assumed. There is **no** mouse-follow parallax, **no** per-word heading animation, **no** staggered card entrance, **no** button-arrow motion, **no** nav active-pill animation.

### Behaviours that exist today — KEEP by default

| Behaviour | Where | Mechanism | Decision |
|-----------|--------|-----------|----------|
| Smooth in-page anchors | `global.css` `html { scroll-behavior: smooth }` | CSS | **KEEP** |
| Sticky header + backdrop blur | `HomepageV2` header | CSS `sticky` + `backdrop-blur-md` | **KEEP**, restyle to cream header |
| Services mega-menu | Header `<details>` with thumbnails | Native details | **MODIFY** — conflicts with clean reference nav. Replace with simple Services link + optional lightweight dropdown *without* stock thumbs |
| Mobile menu | Header `<details>` | Native details | **KEEP** pattern, restyle |
| Language chips | Header EN / 粵 / 普 | Static spans (not wired) | **MODIFY** — restore working `LanguageSwitcher` + `I18nScript` on `/` |
| Primary CTA hover | Buttons | Background colour transition | **KEEP**, restyle to burnt orange |
| Service row hover | Services links | `hover:-translate-y-0.5`, border, shadow | **KEEP**, adapt to new 6-card layout |
| How-it-works hover | Step cards | Border colour | **KEEP** + light elevation |
| Image hover scale | `.c1-img-wrap img` | `scale(1.02)` 0.7s | **KEEP** on still photos |
| Hero / section **video** | Hero + “Physiotherapy at home” | Autoplay muted loop; poster if `prefers-reduced-motion` | **KEEP** as motion (reference is a still). Frame it like the reference photo |
| Section scroll reveal | `.c1-reveal` + `IntersectionObserver` | Fade + 1.25rem rise; unobserve after first view | **KEEP**; add **light stagger** on card grids only |
| FAQ accordion | `<details>` + `group-open:rotate-45` on + | Native + CSS | **KEEP**; animate panel height with CSS grid 0fr/1fr if easy, no library |
| Sticky FAQ heading | `lg:sticky` | CSS | **KEEP** |
| Mobile bottom bar | Call / Enquire (V1) or Call / Email / Refer (chrome pages) | Fixed | **KEEP** dual CTA; match orange enquire |
| `:focus-visible` outline | `global.css` | CSS | **KEEP** |
| `prefers-reduced-motion` | concept1.css + reveal script | Disables reveal, hover scale, videos | **KEEP** and extend to any new motion |
| Draft banner | `DraftBanner.astro` | Always on while `site.draft` | **KEEP** |
| Print referral CSS | `/referral` | `@page A4` | **KEEP** (not homepage chrome) |

### Behaviours that do **not** exist — ADD only if they stay subtle

| Requested | Plan |
|-----------|------|
| Hero image cursor-depth / parallax | **ADD** desktop-only, max ~6–8px translate, `pointer` fine + no-reduced-motion. CSS `transform` on mousemove, rAF, reset on leave. No WebGL. |
| Hero heading text reveal | **ADD** one-time clip/fade of the H1 block (not per-word bounce). CSS `@keyframes` + class after load. |
| Button arrow nudge | **ADD** `→` translateX 2–3px on hover |
| Nav active state | **ADD** scroll-spy underline/colour for in-page sections |
| Card stagger | **ADD** 40–80ms delay per child inside already-revealed sections |
| Huge parallax / WebGL / GSAP | **DO NOT ADD** |

### Remove / do not port onto `/`

| Item | Why |
|------|-----|
| Footer “Colour theme archive” link | Concept lab, not the brand site |
| Dummy contact form `onsubmit="return false"` | Dead UI; **replace** with working `EnquiryForm` |
| SVG blob “map” | Fake; **replace** with real interactive map |
| AI merch photos (polo / bottle / towels with fake logo) | User forbids fake branded photography |
| AI-generated business-card **photo** | Rebuild as HTML/CSS using **exact** `/home-motion-logo.png` |
| Duplicate wordmark text beside logo when logo already says Home Motion | Match reference: logo only (plus optional tiny tagline if contrast needs it) |

---

## 3. Section-by-section comparison (current `/` vs reference)

The reference is **two artboards**. Implementation is **one long homepage** that uses left-artboard hero/services/areas/referrers **and** right-artboard how-it-works / why-choose. Do not ship two separate homes.

| Section | Current `/` | Reference | Action |
|---------|-------------|-----------|--------|
| Header | Sage-tinted sticky bar; logo **plus** wordmark; nav About/Services mega-menu/NDIS/Areas/Referrals/Contact; sage “Make an enquiry” | Cream bar; **logo only**; Home About Services Service Areas For Referrers FAQs [Contact]; **orange** pill CTA | **MODIFY** visual + nav labels; keep sticky/blur |
| Hero | Gradient sage band; motto *Your physio comes to you.*; H1 geo line; two sage CTAs; **video** | Cream; eyebrow MOBILE PHYSIOTHERAPY; editorial H1 with orange last word; orange + outline CTAs; large still + script overlay *People Movement Home* | **MODIFY** layout to reference; **KEEP** video inside that frame; **KEEP** eastern-suburbs SEO in title + support |
| Trust row | 5 icon advantages + AHPRA pending line | 3 chips (visits / all ages / NDIS&private) | **MODIFY** to 3 chips per Jackson spec (see copy). **KEEP** AHPRA line nearby, not as a marketing chip |
| Purpose / “What we do” | Centre block | Not on artboard | **REFINE** into hero support + Why Choose; do not delete copy |
| Meet Jackson / About | Image right, AHPRA amber box | No dedicated about block on artboard (About is in nav) | **KEEP** as `#about` — required by nav and honesty |
| Physio-at-home video band | Extra video + H2 | Not on artboard | **MOVE** video into hero (or keep one supporting still in How-it-works mosaic). Do not run two autoplay videos |
| Services | Light bg; 7 list rows with arrows | Medium **green gradient**; H2 Our Services + supporting line; **6** rounded cream cards; “View all services” | **MODIFY** visual + count to 6; **KEEP** hover |
| How it works | 3 pale cards, “Step n” | Numbered 01–03, cream cards, supporting photos on the right | **MODIFY** visual; **KEEP** 3 steps; fold extra i18n steps 4–5 into copy/FAQ |
| Why Choose | Missing as a named block | 4 icon cards | **ADD** from existing differentiators |
| NDIS | Full legal section | Only a chip “NDIS & private clients” (too promotional) | **KEEP** full section (honesty). Do **not** use the chip wording that implies registered/private-all |
| Service areas | Suburb pills + fake SVG blob | List + **map** | **MODIFY**: real map + suburb list; **KEEP** `/areas/[slug]` links |
| Branded card / merch | None | Business card; polo/bottle | **ADD** HTML/CSS card with real logo. **SKIP** merch photos unless Jackson supplies unbranded or properly shot assets |
| For referrers | Centre text + two buttons | Dark green band, 3–4 bullets, orange CTA | **MODIFY** visual; **KEEP** `/referral` + phone |
| FAQ | Accordion, 4 items | Not on artboard | **KEEP** (and restore fuller i18n 7 items for SEO) |
| Contact / enquiry | Dark green dummy form | Header/hero CTA only on artboard | **KEEP** `#contact` with real `EnquiryForm` |
| Footer | Minimal preview line | Implied logo/cream | **MODIFY** to logo + ABN + privacy + referral; no concept-lab links |
| Reviews | Intentionally empty elsewhere | None | **KEEP empty** — no fake testimonials |

---

## 4. Content classification

Source of truth remains `src/content/site.ts`. Homepage strings that are unique to V1 live in `concept1-home.ts` / `i18n.ts`. Do not hard-code phone, ABN, AHPRA, languages, suburbs, or NDIS claims in components.

### KEEP (facts and legal posture)

- `businessName` / `displayBrand`: Home Motion  
- `practitionerName`: Wai Wa "Jackson" Law  
- Phone `0433 479 703` / `tel:+61433479703`  
- ABN `75 612 731 757`  
- Languages: English, Cantonese, Mandarin  
- Suburbs: Box Hill, Doncaster, Blackburn, Ringwood, Burwood, Glen Waverley, Mitcham, Nunawading + surrounding  
- `draft: true`, `registrationStatus: "pending"`, AHPRA notice  
- NDIS: plan-managed and self-managed **enquiries only**; **not** a registered provider; no NDIA-managed claims  
- Differentiator: enquire with the physiotherapist who delivers care  
- `aboutParagraphs`, `servicesIntro`, privacy draft, referral sheet  
- Suburb landing copy in `suburbs.ts`  
- No invented email — keep `[EXISTING BUSINESS EMAIL — NOT PROVIDED]`  
- No `info@homemotionphysio.au` from the reference (unconfirmed)  
- No clinic / home address  

### REFINE (wording / presentation, not new claims)

| Topic | Current | Redesign |
|-------|---------|----------|
| Visible H1 | “Mobile physiotherapy in Melbourne's eastern suburbs” | **Editorial H1** from reference: “Expert physiotherapy in the comfort of **home.**” (orange on *home.*). **Document title + meta + support line keep the geographic SEO sentence.** One visible H1 only. |
| Hero support | Jackson + trilingual | Keep Jackson-personal + eastern suburbs + home/community. Do not replace with thinner reference blurb if it drops SEO phrases. |
| Motto | “Your physio comes to you.” | Optional eyebrow/script; do not stack motto + editorial H1 + geo H1 (three competing headlines). |
| Trust chips | 5 items including NDIS legal | **3 chips only:** Home & community visits · English / Cantonese / Mandarin · Personalised one-to-one care |
| Services | 7 names including “NDIS Physio” | **6 cards** (below). NDIS stays its own `#ndis` section, not a specialty card. |
| How-it-works | V1 3 steps vs i18n 5 steps | Visual **3 steps** (01 Get in touch / 02 We arrange a visit / 03 Personalised care). Fold “your plan” and “ongoing sessions” into step 3 body + FAQ. |
| Referrers | Short paragraph | Expand audience list (SC, Recovery Coaches, GPs, allied health, families) using existing `referrersCta` + i18n.cta |
| FAQ | 4 V1 items | Prefer **7 i18n FAQs** (clinic, suburbs, NDIS, languages, AHPRA, GP referral, booking) |
| Enquiry | Dummy fields | Restore `EnquiryForm` (name, phone, suburb, language, NDIS checkbox, message → mailto) |

### MOVE

- Second autoplay video → into hero frame or How-it-works stills (one motion surface).  
- Purpose section copy → hero support and/or Why Choose.  
- NDIS “not registered” from hero chips → NDIS section + FAQ (already there).  

### REMOVE (from this branch homepage only — do not delete files on `main`)

- Concept theme archive footer.  
- Services mega-menu stock thumbnails.  
- Fake SVG map.  
- Fake merch / fake card photography.  
- Reference chip “NDIS & private clients” and “All ages welcome” unless Jackson later confirms those as accurate, non-specialist statements. Default: **do not use**.  
- Reference email and any fabricated domain.  
- “Neurological specialist” claims. Card title **Neurological & Disability-Related** must be qualified with existing `servicesIntro` (“may be discussed at assessment”), not presented as a credential.

### Six service cards (labels vs approved copy)

Use existing `site.services` descriptions where they map. Do not invent outcomes.

| Card label (visual) | Approved body source | Notes |
|---------------------|----------------------|--------|
| Mobile Physiotherapy | New short line from `concept1Purpose` / about | Service model, not a specialty |
| Mobility & Balance | Merge “Mobility and movement” + “Strength and balance” / falls prevention intro | Factual |
| Strength & Functional Capacity | “Functional exercise” + strength | Factual |
| Rehabilitation After Hospitalisation | “Rehabilitation” | Do not promise post-op protocols |
| Neurological & Disability-Related | Qualify with `servicesIntro`; NDIS honesty stays in `#ndis` | **Not** a specialist registration claim |
| Home Exercise Programs | Align with functional exercise / community mobility | Home programs, not a product |

---

## 5. Recommended implementation approach

Three options considered:

1. **Restyle `HomepageV2.astro` in place** — fastest, but Concept 1 A/B/C archive shares `concept1.css`. High risk of breaking `/concepts/1/`.  
2. **New homepage module on `/` only; leave Concept 1 files untouched** — slightly more files, safe for `main` comparison and concept archive. **Recommended.**  
3. **Split into multi-page production IA now** (`/about`, `/services`, …) — matches future V2 plan but is out of scope. Nav can still *look* like the reference while remaining in-page anchors plus existing `/referral` `/privacy` `/areas/*`.

**Chosen:** Option 2. `/` becomes a new `HomeMotionPage` assembled from section components. `HomepageV2` remains the concept archive.

---

## 6. New component hierarchy

```
src/pages/index.astro
  → HomeMotionPage.astro          # branch homepage only
       HomeHeader.astro
       HomeHero.astro             # video/photo frame + H1 + CTAs + 3 chips
       HomeServices.astro         # green gradient + 6 cards
       HomeHowItWorks.astro       # 01–03 + optional stills (no fake branded photos)
       HomeWhyChoose.astro        # 4 differentiators
       HomeAbout.astro            # Meet Jackson (KEEP)
       HomeNdis.astro             # KEEP legal NDIS
       HomeAreas.astro            # suburb list + real map
       HomeReferrers.astro        # dark green band + HTML brand card
       HomeFaq.astro              # accordion
       HomeContact.astro          # EnquiryForm
       HomeFooter.astro
       HomeMobileBar.astro        # Call + Enquire

src/styles/home-motion.css        # tokens + motion (do not overwrite concept1.css)
src/content/home-motion.ts        # page-only strings; import facts from site.ts
src/lib/home-motion-motion.ts     # optional tiny cursor-parallax helper (no package)
src/components/home/ServiceAreaMap.astro
```

**Reuse as-is (import, restyle wrappers if needed):**

- `DraftBanner.astro`
- `EnquiryForm.astro` (+ i18n data attributes)
- `LanguageSwitcher.astro` + `I18nScript.astro`
- `AdvantageIcon.astro` (or simpler CSS icons for Why Choose)
- `src/lib/structured-data.ts`
- `/referral`, `/privacy`, `/areas/[slug]` pages (header chrome on those pages should eventually match, but **Phase BUILD homepage first**; inner pages can keep current chrome until a follow-up)

**Do not delete:** `concept1/*`, `pages/concepts/**`.

**Content files:** extend `site.ts` only for tokens that are true business facts. Visual labels for the 6 cards live in `home-motion.ts` and must import descriptions from `site.services` / NDIS copy.

---

## 7. Visual design tokens

Do not blindly force contrast-failing colours. Check text on green bands (white / cream) and orange on cream.

```css
:root {
  --hm-forest: #173d35;          /* deep text / dark bands */
  --hm-orange: #d85a26;          /* primary CTA, H1 emphasis */
  --hm-orange-hover: #c04e20;
  --hm-olive: #8b9c67;
  --hm-cream: #f7f2e9;
  --hm-warm-white: #fcfaf6;
  --hm-green-grad: linear-gradient(135deg, #52785f 0%, #71956f 45%, #8fa97a 100%);
  --hm-refer-grad: linear-gradient(160deg, #2f5a45 0%, #4d7a5c 55%, #6b9468 100%);
  --hm-radius-card: 1.25rem;
  --hm-radius-pill: 999px;
  --hm-serif: "Source Serif 4", Georgia, serif;   /* already loaded */
  --hm-sans: "Source Sans 3", system-ui, sans-serif;
}
```

- Page background: cream / warm white, **not** current cool grey-green `#f4f6f4`.  
- Header: warm white, hairline border, **no** dark utility bar.  
- Primary buttons: burnt orange fill, white text, pill. Arrow `→` with 2px hover shift.  
- Secondary buttons: forest outline, transparent/cream fill.  
- Services / referrers: **medium** green gradient (not polo-dark, not pale sage).  
- Cards: cream, large radius, soft shadow, no hard Material elevation.  
- Optional leaf SVG decorations (CSS/SVG, not photos) at section corners — very low contrast, `aria-hidden`.  
- Script overlay “People Movement Home”: CSS text on the media frame, not baked into images.

**Logo:** only `/public/home-motion-logo.png` (627×388 PNG). Do not redraw, recolour, or generate. Header/footer/HTML card use this file. Do not overlay the logo onto stock photos.

**Typography:** keep Source Serif 4 for H1/H2; Source Sans 3 for nav, body, cards, buttons, labels. H1 clamp ~2.4–3.6rem, tight leading, forest ink, orange on the emphasised phrase.

---

## 8. Animation / microinteraction plan

Target: *static reference + premium subtle motion from (and beyond) the current site.*

| Element | Motion | Reduced-motion |
|---------|--------|----------------|
| Page sections | Existing `c1-reveal` equivalent (opacity + 12–16px rise, 0.55–0.65s, once) | Instant visible |
| Service / why / step cards | Stagger 50ms; hover lift 2px + shadow + 1px border | No stagger/hover lift |
| Hero media | Keep video if no reduced motion; desktop cursor parallax ≤8px; hover scale 1.02 on stills | Poster only, no parallax |
| H1 | Single block fade/slide 400ms on load | Immediate |
| Buttons | Colour 150ms; arrow +3px | Colour only |
| FAQ | + rotates; answer appears | Instant open |
| Nav | Scroll-spy colour; no bouncing indicator | Colour only |
| Map | Native pan/zoom of embed/library | Static fallback image of **eastern Melbourne**, no address pin |

No animation libraries unless a map library is required. No WebGL.

---

## 9. Responsive behaviour

Desktop matches the reference **composition** (two-column hero, 6-up services, map beside list, referrers split).

**Mobile (intentional, not scaled-down artboard):**

- Logo readable (~40–44px height), orange Enquire visible in header **or** sticky bottom bar (not both fighting). Prefer: compact header CTA hidden, **sticky Call | Enquire** like today.  
- Hero stacks: copy first, media second, then 3 chips.  
- Services: 1 col → 2 col from `sm`.  
- How-it-works: vertical 01–03; photos under or omitted if they bloat LCP.  
- Map: full-width, min-height ~220px, pinch-zoom OK.  
- Referrers: stack copy + CTA; HTML card below.  
- Type: keep clamp(); body ≥16px.  
- Touch targets ≥44px.  
- Disable cursor parallax (`pointer: coarse` or no hover).  
- One autoplay video max; pause off-screen if easy (`IntersectionObserver` on video).  

---

## 10. SEO — must not regress

| Item | Current | Build requirement |
|------|---------|-------------------|
| `lang="en-AU"` | Yes | Keep; language switcher updates `documentElement.lang` |
| Title | Includes “(preview)” | Keep draft wording until launch; still include **mobile physiotherapy** + **eastern suburbs** |
| Meta description | Thin preview string | Restore fuller `site.seo.description` (NDIS honesty + languages + pending AHPRA) |
| Canonical / OG / twitter | Yes | Keep |
| `robots` noindex while draft | Yes | Keep |
| `robots.txt` Disallow | Yes | Keep |
| Sitemap integration | Yes (blocked by robots) | Keep |
| H1 | One geographic H1 | One editorial H1; geo stays in `<title>`, description, support, JSON-LD `serviceType` / `areaServed` |
| H2s | Multiple | Map to Our Services, How it works, Why choose, About, NDIS, Service areas, Referrers, FAQ, Contact |
| FAQPage JSON-LD | **Not enabled on `/`** (`includeFaqSchema` default false) | **Turn on** using English FAQ answers (i18n `en`) |
| LocalBusiness JSON-LD | Yes | Keep; no street address |
| Internal links | `/areas/*`, `/referral`, `/privacy` | Keep; suburb names in Areas should link to `/areas/[slug]` |
| Alt text | Present on stock media | Keep “illustrative / not Jackson” honesty |
| Semantic HTML | Generally good | Header/nav/main/footer; ordered list for steps; no JS-only headings |
| Suburb pages | Unique titles/descriptions | Keep |

Do not hide service-area names or NDIS legal copy behind tabs that never render in HTML.

---

## 11. Map (real, not the AI screenshot)

- **Do not** use the fake Google screenshot from the reference.  
- **Do not** pin Jackson’s home or any private address.  
- Centre on Melbourne’s eastern suburbs (Box Hill / Doncaster / Ringwood bounding box).  
- Preferred implementation: **Leaflet** (or MapLibre) with OSM tiles + a **polygon/circle of the service region**, suburb labels as HTML list beside the map. Load Leaflet only on this page (`client` script or ESM import).  
- Fallback if JS fails: static OSM static-map **or** linked “View eastern suburbs on OpenStreetMap” plus the suburb list (list is the SEO content).  
- Visual: rounded cream container, soft shadow, matching the reference’s map well — not the fake pins on a private street.

No Google API key required for OSM. If Jackson later wants Google, that is a follow-up (needs a key).

---

## 12. Performance

- Keep Astro static; client JS = reveal + optional parallax + map + enquiry mailto + i18n.  
- One hero video, `playsinline` `muted` `preload="metadata"`, poster for LCP.  
- Images: `width`/`height`, `loading="lazy"` below fold, hero poster `eager`. Prefer existing Pexels URLs with `w=` until Jackson supplies photos.  
- Do not load concept CSS on `/` (new `home-motion.css` only).  
- Fonts: existing Google Fonts preconnect; consider `font-display=swap` (already on the Google URL).  
- No second autoplay video.

---

## 13. Inner pages (this BUILD vs later)

| Route | This BUILD | Later |
|-------|------------|--------|
| `/` | Full visual redesign | — |
| `/referral` `/privacy` `/areas/[slug]` | **Do not break**; optional light token alignment | Match new header if Jackson asks |
| `/concepts/**` | Unchanged archive | Unchanged |

---

## 14. Assets required from Jackson

**Have already (use these):**

- Official logo: `public/home-motion-logo.png`  
- Reference artboards: `docs/references/home-motion-chatgpt-reference.png`  
- Phone, ABN, languages, suburbs, draft AHPRA posture  
- Stock Pexels video/photos (illustrative only)

**Need from Jackson before public launch (not blockers for BUILD, but do not invent):**

1. **Business email** — still placeholder. Enquiry stays `mailto:?subject=...` until provided.  
2. **Approved photography** — hero still (home visit), Jackson portrait if he wants Meet Jackson to stop using stock, referrer/how-it-works stills. Do **not** AI-brand stock photos.  
3. **Whether H1 must be the geo line** — default in this plan: **editorial H1** (reference) + geo in title/meta/support. Say so if you want the opposite.  
4. **Polo / bottle / merch photos** — skip until real products exist; do not generate.  
5. **Google Maps key** — only if OSM/Leaflet is rejected.  
6. **Degree / university** — still placeholder in About.  
7. Confirmation **not** to use “All ages welcome” / “NDIS & private clients” chips (plan assumes **do not use**).

---

## 15. BUILD sequence (after approval only)

Checkpoint commit on `cursor/chatgpt-version-b759` before each visual group. Never merge to `main`.

1. Tokens + `home-motion.css` + fonts/colours smoke on a blank shell.  
2. Header + footer + mobile bar (logo exact, orange CTA, nav).  
3. Hero (editorial H1, chips, CTAs, media frame, keep video + reduced-motion poster).  
4. Services (6 cards, green gradient, hover).  
5. How it works + Why choose.  
6. About + NDIS (honesty preserved).  
7. Areas + real map.  
8. Referrers (HTML card with real logo) + FAQ + EnquiryForm.  
9. Wire i18n switcher on `/`.  
10. SEO: FAQ JSON-LD on, meta description restored, heading outline check.  
11. Motion: reveal, stagger, arrow, optional cursor parallax, reduced-motion pass.  
12. Responsive pass (mobile + desktop).  
13. `astro check` + `astro build`. Visual QA against the reference.  
14. Stop. **Do not merge. Do not deploy.**

---

## 16. Success criteria

The branch site should feel like **a real, interactive version of the reference**, not a screenshot in a box.

- Cream / medium green / burnt orange system is obvious at a glance.  
- Exact Home Motion logo in header, footer, and HTML card.  
- Existing useful motion kept; a few new *subtle* motions added; reduced-motion respected.  
- NDIS and AHPRA wording still honest.  
- No private address. Real map.  
- `main` unchanged. Concept archive unchanged.  
- SEO tags, suburb pages, referral sheet, privacy page still work.

---

## 17. Gate

**Do not write implementation code until Jackson sends:**

`BUILD HOME MOTION DESIGN`
