# Website V2 — UX, SEO & visual redesign plan

**Status:** Planning only — no BUILD V2 implementation until Jackson approves this document and replies **BUILD V2**.  
**Baseline codebase:** branch `cursor/launch-ready-site-2581` (Phase 1 launch-ready draft).  
**Date:** 28 September 2026.

---

## 1. Executive summary

Phase 1 delivered a **functionally complete draft**: central config, trilingual UI, SEO scaffolding, suburb landing pages, and honest compliance copy. It reads as a **long-form wireframe** — correct information architecture for a single scroll page, but not a conversion-focused, locally credible mobile-physio brand.

**V2 goal:** A small, trustworthy **multi-page** static site that ranks for **service + location intent**, foregrounds **direct access to Jackson** (EN / Cantonese / Mandarin), and stays legally accurate through **AHPRA** and **NDIS non-provider** rules — without suburb doorway farms, fake trust signals, or a locked-in trading name in the visual identity.

**Approved visual direction:** Hybrid **Calm Professional + vitality + approachability + 亲近感 + 伦理感** — locked 2026-09-28. See [§8](#8-visual-directions-approved).

---

## 2. Audit — current codebase & homepage

### 2.1 What is solid (retain in V2)

| Area | Current state | V2 action |
|------|---------------|-----------|
| **Stack** | Astro 7, TypeScript, Tailwind 4, static output | Keep |
| **Central config** | `src/content/site.ts` + `i18n.ts` | Extend (see §5); single source for NAP, AHPRA, draft flag |
| **Draft / noindex** | `site.draft`, robots meta, `robots.txt` disallow | Keep until AHPRA + launch checklist complete |
| **Trilingual** | Client-side `I18nScript` + `data-i18n-path` | Keep pattern; expand strings for new pages |
| **Compliance copy** | NDIS plan/self-managed only; not registered provider; AHPRA pending notice | Keep tone; wire to `registrationStatus` |
| **No fake trust** | Empty reviews section; no star ratings | Keep until real GBP reviews exist |
| **SEO plumbing** | Canonical, OG, LocalBusiness + FAQ JSON-LD, sitemap integration | Retain; tune schema per page type in V2 |
| **Referral collateral** | `/referral` printable sheet | Move to `/referrals/`; keep print CSS |
| **Mobile CTAs** | Sticky contact bar, tel links | Keep; align with new nav |
| **Service-area honesty** | No clinic address | Keep; one `/service-areas/` page |

### 2.2 What is wireframe / placeholder (redesign)

| Area | Issue | V2 target |
|------|--------|-----------|
| **Information architecture** | One homepage with 10+ anchor sections (`#about`, `#services`, …) | Dedicated pages per sitemap (§6) |
| **Primary H1** | `{site.businessName}` (“WAI WA LAW”) — **wrong for SEO intent** | H1 = service + geography (e.g. *Mobile physiotherapy in Melbourne’s eastern suburbs*) |
| **Brand lock-in** | Business name in logo, H1, OG site name | **Wordmark + descriptor**; `businessName` in config/footer/legal only; easy rebrand |
| **Photography** | None; gradient hero; SVG OG placeholder | Real Jackson + in-home context shots (§9); no stock “physio” clichés |
| **Navigation** | Horizontal scroll of hash links | Multi-page primary nav + persistent phone |
| **Suburb SEO** | 8× `/areas/[slug]` mini doorways | **Remove**; consolidate to `/service-areas/` (no mass doorway pages) |
| **Enquiry form** | Missing enquiry type, contact-method choice, email field, **privacy consent**; NDIS checkbox only | Spec in §7.4 |
| **Visual design** | Generic cards, amber draft strips mixed with marketing | Distinct art direction; draft banner only when `draft: true` |
| **About / practitioner** | Buried in home `#about` | `/about/` with portrait, qualifications (when confirmed), languages |
| **Services** | Six equal cards on home | Home **summary** + `/mobile-physiotherapy/` depth |
| **NDIS** | Section on home only | `/ndis-physiotherapy/` with plan/self-managed clarity |
| **Config shape** | `ahpraStatus: "Pending"` string | Align to `registrationStatus: "pending" \| "registered"`, `registrationNumber: null \| string` |

### 2.3 Homepage section map (Phase 1 → V2)

| Phase 1 section (`index.astro`) | V2 disposition |
|---------------------------------|----------------|
| Hero | **Rebuild** — intent H1, portrait/photo, 2 CTAs, language strip |
| About | **Move** → `/about/`; home gets 2–3 sentence teaser + link |
| Services | **Teaser** on home → `/mobile-physiotherapy/` |
| How it works | **Keep on home** (compressed 3–4 steps) — competitors use this for conversion |
| NDIS | **Teaser** + link → `/ndis-physiotherapy/` |
| Service areas | **Teaser** + link → `/service-areas/` (suburb list, no per-suburb URLs) |
| FAQ | **Split** — top 4–5 on home; full FAQ on contact or mobile page |
| Reviews | **Keep empty/honest** until GBP; optional “Find us on Google” post-launch |
| Contact + enquiry | **Move** → `/contact/` |
| Referrers | **Move** → `/referrals/` |

---

## 3. Competitor UX & SEO analysis

Public-site review of five reference competitors (Melbourne east / mobile). **No competitor copy, testimonials, or branding is to be reused.**

### 3.1 Comparison matrix

| Dimension | Lionrock | After Hours | Eastern Mobile | iMotion (home visits) | Get Set Physio |
|-----------|----------|-------------|----------------|----------------------|----------------|
| **Hierarchy** | Single strong home + funding strip | Many suburb + service URLs | Home + About + FAQs + careers | Clinic site + dedicated home-visit LP | Clinic-first + suburb pages |
| **Hero** | Funding + languages + bullets | Urgent hours, call/SMS | Phone above fold, “We come to you” | Book now + clinic/mobile lines | Traditional clinic hero |
| **Trust** | Testimonials, partner logos | Google review embed (~46) | Session count, 5★ badge | Named physio, blog | Longevity, NDIS registered |
| **Photography** | Real team/clinical | Practitioner imagery | Community/senior focus | Clinic + treatment | Clinic stock mix |
| **Nav** | Services, areas, contact | Deep footer + suburb links | Simple + phone CTA | Full clinic nav | Standard multi-page |
| **CTAs** | Enquiry, phone, email | Call, SMS, booking link | Phone-first | Online booking + phone | Phone + form |
| **Services** | NDIS, aged care, mobile | Hand therapy, home, telehealth | Seniors, HCP reports | MSK, GLA:D, pilates + mobile | Clinic + home + school |
| **Home visit story** | Implicit in mobile NDIS | Checklists, what to expect | 5-step journey | Long-form education | Fee note on NDIS page |
| **Referrals** | Welcome referrers | GP-friendly copy | Explicit GP/report line | Professional tone | Standard |
| **Service areas** | Suburb list in footer | **Suburb landing pages** | Ringwood / outer east | Eastern suburbs list | **Suburb SEO pages** |
| **Local SEO** | CALD + east suburbs | Suburb URLs + reviews | Claims + FAQs | Blog + service LP | Blog + geo pages |
| **Mobile** | Responsive | Strong call bar | Phone sticky | Booking-led | Adequate |
| **Footer** | NAP, suburbs, funding | Many links | Guide download | Clinic address + mobile | Address + suburbs |
| **Conversion** | Language + NDIS breadth | Urgency + social proof | Process clarity + phone | Authority content | Registered NDIS trust |

### 3.2 Per-site takeaways (for Jackson — not to copy)

**Lionrock Physiotherapy** (`lionrockphysiotherapy.com.au`)  
- Closest **positioning peer**: mobile NDIS, eastern suburbs, **EN / Cantonese / Mandarin** in hero.  
- Wins on **funding-type clarity** and suburb list visibility.  
- Jackson should **not** mirror registered-provider breadth or testimonial blocks until real.  
- **Gap to exploit:** “Contact = attending physio” and **non-provider NDIS honesty** are clearer on Jackson’s side.

**After Hours Physio** (`afterhoursphysio.com.au`)  
- **Sole practitioner** model; **review volume** and after-hours urgency are their moat.  
- **Suburb landing pages** support local pack adjacency — Jackson V2 **declines** the doorway farm; instead one strong `/service-areas/` plus body copy on home.  
- Jackson competes on **CALD** and **continuity of care**, not 7am–11pm acute visits.

**Eastern Mobile Physio** (`easternmobilephysio.com.au`)  
- **Anti-chain**, neighbour narrative; **5-step process** and phone-first booking.  
- Strong **older-adult** story — Jackson can show inclusive home visit without age-limiting.  
- **Borrow pattern:** numbered “how it works”; **avoid** unverified session/review counts.

**iMotion Physiotherapy** (`imotionphysio.com.au/home-visit-services/`)  
- **Hybrid** clinic + mobile; dedicated **service landing page** in nav (maps to Jackson’s `/mobile-physiotherapy/`).  
- **Content SEO** via blog — optional Phase 3; not required for V2 launch.  
- **Borrow pattern:** “who benefits” and environment-based assessment (original copy only).

**Get Set Physio** (`getsetphysio.com.au`)  
- **Doncaster East** clinic; home visits + **NDIS registered** wording (incl. NDIA-managed).  
- Useful **contrast** for Jackson’s plan/self-managed-only positioning.  
- Suburb pages + blog = authority Jackson can defer.

### 3.3 Strategic gaps Jackson can own

1. **Personal + local + mobile + multilingual** in one hero message (only Lionrock is close on language).  
2. **Direct practitioner access** — no call centre, no roster (under-stated by most peers).  
3. **Transparent NDIS non-registration** — reduces wrong referrals vs registered clinics.  
4. **CALD trust** — visible language switcher, optional Chinese meta/headings where appropriate (not machine-translated clinical claims).  
5. **Lean honesty pre-AHPRA** — professional draft state without fabricated credentials.

---

## 4. Retain vs redesign (summary)

### Retain

- Astro + TS + Tailwind; static; minimal JS (i18n + mailto form only).  
- `site.ts` (extended) as business truth; draft vs production toggle.  
- Trilingual UI; no CMS.  
- Compliance: no fake reviews, awards, clinic address, specialist titles.  
- Phone-first conversion; printable referrals.  
- `noindex` until registration + launch checklist (`docs/SEO_LAUNCH_CHECKLIST.md`).

### Redesign

- Multi-page IA and navigation.  
- Visual identity decoupled from `businessName`.  
- Hero, typography, spacing, photography system.  
- H1/title strategy (service intent).  
- Form fields per spec.  
- Remove `/areas/*` suburb doorways → `/service-areas/`.  
- Page-level SEO + schema (Physician / ProfessionalService where appropriate post-AHPRA).  
- Component structure aligned to pages (implementation in BUILD V2).

### Deprecate after V2 launch

- Hash-only primary navigation as main IA.  
- Per-suburb static routes (retain redirects only if URLs were ever public — currently draft/noindex).

---

## 5. Central config (V2 spec)

Extend `src/content/site.ts` (names illustrative):

```ts
businessName: string;           // legal/trading — footer, schema, invoices
practitionerName: string;       // Wai Wa "Jackson" Law
displayBrand: string;           // optional short wordmark text; rebrand-friendly
tagline: string;                // e.g. "Mobile physiotherapy"

registrationStatus: "pending" | "registered";
registrationNumber: string | null;

draft: boolean;
websiteUrl: string;             // production canonical base

// NAP (no street address)
phone, email, abnDisplay
serviceAreas: { region, suburbs[], surroundingNote }

languages: readonly string[];
ndis: { acceptsPlanManaged: boolean; acceptsSelfManaged: boolean; registeredProvider: false }

seo: { defaultTitleTemplate, pages: Record<slug, { title, description, h1 }> }
```

**Rules**

- UI logo uses `displayBrand` or `tagline` + region — **not** mandatory `businessName` H1.  
- When `registrationStatus === "pending"`: no “registered physiotherapist” claims; show configured notice.  
- When `registered`: show number only from `registrationNumber`.  
- NDIS enquiries copy gated: full NDIS page CTA “after physio registration” if business rule requires — align with Jackson’s brief (plan/self-managed enquiries welcome **after** AHPRA when live).

---

## 6. Proposed sitemap

| Path | Purpose | Primary intent |
|------|---------|----------------|
| `/` | Home — hero, differentiator, how it works teaser, services/NDIS/areas teasers, mini-FAQ, CTA | mobile physiotherapy eastern suburbs Melbourne |
| `/about/` | Jackson, qualifications (when confirmed), languages, AHPRA status, insurance | mobile physiotherapist [name] / about |
| `/mobile-physiotherapy/` | What home visits include, who it suits, what to expect, fees high-level (no guarantees) | mobile physiotherapy / home visit physio |
| `/ndis-physiotherapy/` | Plan-managed & self-managed only; **not** registered provider; eligibility disclaimers | NDIS physiotherapy mobile (non-provider) |
| `/service-areas/` | Eastern suburbs list, map graphic optional, travel note, no doorway URLs | mobile physio Box Hill, Doncaster, … (single page) |
| `/referrals/` | GPs, coordinators, families; link to printable PDF/sheet | refer mobile physiotherapy |
| `/contact/` | NAP, hours (by appointment), enquiry form | contact mobile physiotherapist |
| `/privacy/` | Privacy policy (reviewed before launch) | legal |

**Explicitly out of scope for V2**

- Mass suburb doorway pages (`/areas/box-hill/`, etc.).  
- Blog (optional later).  
- Online booking, payments, patient portal.

**Redirects (BUILD V2)**

- `/referral` → `/referrals/` (301).  
- `/areas/*` → `/service-areas/` (301) if any slug was bookmarked.

---

## 7. SEO keyword & search-intent map

| Page | Primary keywords (AU) | Search intent | Title pattern (EN) |
|------|----------------------|---------------|-------------------|
| Home | mobile physiotherapy eastern suburbs Melbourne; mobile physiotherapist Melbourne east | Hire / enquire | Mobile physiotherapy in Melbourne’s eastern suburbs \| [displayBrand] |
| About | [practitioner] physiotherapist; Cantonese speaking physiotherapist Melbourne | Trust / verify | About [practitionerName] — mobile physiotherapist |
| Mobile physio | home visit physiotherapy; physiotherapist home visit Melbourne | Service understanding | Mobile & home visit physiotherapy |
| NDIS | NDIS physiotherapy plan managed; self managed physio NDIS | Funding fit (non-provider) | NDIS physiotherapy (plan & self-managed) — not a registered provider |
| Service areas | mobile physio Box Hill; physiotherapist Doncaster; … (cluster in one page) | Local relevance | Service areas — eastern suburbs Melbourne |
| Referrals | refer NDIS physiotherapy; GP referral mobile physio | Professional refer | Referrals for health professionals & coordinators |
| Contact | contact mobile physiotherapist | Convert | Contact — speak with your physiotherapist |

**CALD (supporting, not keyword-stuffed)**

- 中文 / 粵語: meta descriptions and key H2s via `i18n` for home, about, contact — mirror meaning, not competitor text.  
- Avoid separate URL per language; use `hreflang` only if Jackson later wants distinct URLs (default: one URL + switcher).

**Content rules**

- One clear **H1 per page** = intent, not business name.  
- Business name in `<title>` suffix and footer.  
- Suburbs: natural list on `/service-areas/` and once in home body — no thin duplicates.

---

## 8. Visual directions (approved)

**Status:** **Locked** — Jackson approved this hybrid on 2026-09-28. Pure A, B, or C were **not** chosen. BUILD V2 implements this section only.

### Approved hybrid — Calm Professional with vitality, warmth, and integrity

| Pillar | Requirement | BUILD V2 expression |
|--------|-------------|---------------------|
| **Base (A)** | Forest/sage palette, serif + sans, referrer-friendly, trustworthy | Deep forest (`#1e4d42`), sage accent (`#3d7a6a`), warm off-white (`#f8f7f4`); **Source Serif 4** headings + **Source Sans 3** body; generous whitespace, rounded cards, subtle borders |
| **Energy** | More vitality than “static” Calm Professional — movement, health, getting around in the **community** | Real photography (street, home, local outings); clear “how it works” flow; slightly **brighter CTA green** on primary buttons only — **no** gym look, startup gradients, flashy animation, parallax, or running-physio / dumbbell icon clichés |
| **Older adults** | Warm, easy to read, uncluttered — not clinical-cold, not youth fitness | Body text **≥18px** (fluid scale), line-height **≥1.6**, WCAG **AA** contrast minimum; short paragraphs; one focal action per section; avoid dense card grids |
| **亲近感 (closeness)** | Personal, one-to-one; Jackson is who you meet | Portrait-forward hero; copy that names Jackson and “you speak with your physio”; human photos (see §10) — not corporate stock teams |
| **伦理感 (integrity)** | Professional ethics; honest compliance; calm confidence | Visible AHPRA/NDIS accuracy (no hype); no fake testimonials or star ratings; tone **informative, not salesy** — no countdowns, “limited spots”, or aggressive urgency |

**Also incorporated (from earlier plan, not Direction C wholesale):** Strong hero typographic hierarchy (clear H1 scale) and **sticky phone bar** on mobile — within the A palette, not navy/teal modern clinic styling.

**Logo / wordmark (V2 BUILD)**

- Text wordmark from `displayBrand` or practitioner first name + “Mobile Physio”; no permanent “WAI WA LAW” lockup in hero.  
- Favicon: simple monogram “J” or abstract **movement** mark (subtle curve/path — not a running figure) — not legal name.

**Motion & interaction**

- Calibrated **interaction density** vs [§14](#14-quality-bar--better-care-health-group-reference) — richer than Phase 1 wireframe, gentler than BetterCare’s review carousel.  
- `prefers-reduced-motion`: static layouts, no drag-marquee; FAQ/step reveals optional and disabled when reduced motion is set.

---

### Reference — Direction A (base only; not chosen alone)

- **Palette / type:** As in approved hybrid table above.  
- **Note:** Jackson rejected using **pure** Direction A without added vitality and warmth pillars.

### Reference — Direction B — Community Local (**not chosen**)

- Terracotta / neighbourly illustration-led look was **not** selected.  
- **Borrowed idea only:** warmth for older readers — achieved via typography and photography, not terracotta palette.

### Reference — Direction C — East Melbourne Modern (**not chosen**)

- Navy/teal clinic-modern system was **not** selected.  
- **Borrowed only:** hero type hierarchy + sticky call bar (see approved hybrid).

---

## 9. Homepage section hierarchy (V2)

Recommended scroll order on `/`:

1. **Hero** — H1 (service + region); subline differentiator; language chips (EN / 粵 / 普); primary CTA Call, secondary Enquire; AHPRA pending badge if `pending`.  
2. **Trust strip** — ABN; “You speak with Jackson”; NDIS plan/self-managed note; **not** registered provider.  
3. **How it works** — 3–4 steps (contact → home visit → plan → ongoing).  
4. **Who we help** — bullets (mobility, balance, NDIS participants, older adults, post-hospital — careful wording).  
5. **Services teaser** — 3 cards + link to `/mobile-physiotherapy/`.  
6. **NDIS teaser** — 2 sentences + link to `/ndis-physiotherapy/`.  
7. **Service areas teaser** — suburb chips + link to `/service-areas/`.  
8. **FAQ** — 4–5 highest-intent questions (home visit, cost discussion, languages, NDIS, AHPRA).  
9. **Reviews** — honest placeholder or hidden until GBP.  
10. **Final CTA** — phone + `/contact/`.

Header nav: Home · Mobile physio · NDIS · Areas · Referrals · About · Contact · [Language].

---

## 10. Imagery & photography

See `docs/PHOTO_SHOT_LIST.md`. Principles:

- **Only real photos of Jackson** (and consented clients/settings if ever used — default: Jackson solo + environment).  
- No stock hands-on-shoulder physio clichés.  
- No fake clinic interior.  
- Hero: Jackson approachable portrait + optional in-home context (living room, hallway mobility — staged with consent).  
- OG image: branded template with portrait crop post-shoot.  
- Until shoot: **neutral illustration or typographic hero** — not another placeholder SVG with lorem.

---

## 11. Forms & conversion (V2)

**Enquiry form** (`/contact/`):

| Field | Required | Notes |
|-------|----------|--------|
| Name | Yes | |
| Preferred contact method | Yes | Phone / Email |
| Phone | Conditional | Required if phone chosen |
| Email | Conditional | Required if email chosen |
| Suburb | Yes | |
| Enquiry type | Yes | General · NDIS · Referral · Other |
| Message | Yes | Short; prompt: no clinical detail |
| Privacy consent | Yes | Link to `/privacy/` |

Submit: mailto compose (static) or future form endpoint — **no** clinical data storage on static host without privacy review.

**Secondary CTAs:** `tel:` persistent in header; referral PDF on `/referrals/`.

---

## 12. BUILD V2 implementation outline (for later — not in this PR)

1. Branch from approved plan; refactor routes and nav.  
2. Migrate content from `site.ts` / `i18n.ts`; remove `suburbs.ts` doorway content or repurpose bullets into `service-areas` only.  
3. Implement visual system (tokens in `global.css`).  
4. Add photography when available; ship typographic hero first.  
5. Update schema per page; sitemap; robots when `draft: false`.  
6. QA: mobile, CALD switcher, Lighthouse, accessibility (focus, contrast).  
7. Jackson sign-off before removing `noindex`.

---

## 13. Approval

- **Visual direction:** **Approved** — hybrid in [§8](#8-visual-directions-approved) (2026-09-28).  
- **Quality bar:** **Reference documented** — Better Care patterns adapted in [§14](#14-quality-bar--better-care-health-group-reference) (2026-09-28); not a second brand approval gate.  
- **Homepage concept:** **Locked — Concept 1 (Editorial Forest)** (2026-09-28).  
- **Wonder refinement:** Completed **in-repo** on `/concepts/1/` (Wonder MCP required auth — not used).  
- **Next:** writing-plans only when Jackson / parent explicitly requests — then executing-plans → production site.  
- **BUILD V2** (full multi-page implementation) runs only after that chain — not after concept pick alone.  
- **Launch:** No deployment until `docs/SEO_LAUNCH_CHECKLIST.md` is satisfied and AHPRA status is updated in config.

---

## 14. Quality bar — Better Care Health Group reference

**Reference site:** [bettercarehg.com](https://www.bettercarehg.com) (Better Care Health Group — Melbourne allied health at home; **not** Jackson’s business model).  
**Benchmark quote (locked):** *“Use Better Care Health Group as a benchmark for information density, polish, purposeful interaction and allied-health credibility — not as a visual template.”*  
**Jackson ask (brainstorming, 2026-09-28):** Match their **visual quality** and **interaction density**, adapted to an **independent sole mobile physio** with the locked hybrid in §8. **No cloning** of their branding, copy, photos, yellow/navy palette, or multi-service catalogue.

### 14.1 Site audit (public pages, desktop + mobile)

| Dimension | Better Care (observed) | Notes for Jackson |
|-----------|------------------------|-------------------|
| **First screen** | Full-viewport hero (`~100dvh − header`); edge-to-edge **photo/video**; oversized H1 (`clamp(3.5rem–6.2rem)`); funding subline; dual pill CTAs; cream gradient wash | Strong **editorial hierarchy** — Jackson H1 stays **service intent**, not slogan-only; one portrait/environment, not multi-discipline montage |
| **Photography** | Staged lifestyle + service imagery on cards; featured **full-bleed** tile; team **portrait** module | Quality bar = **real Jackson** shots, warm grading — not their assets or multi-practitioner team grid |
| **Colour** | Warm cream/butter (`#fffdf8`, `#fff8df`), sun yellow accent (`#f4bd2a`), navy deep (`#083b58`), teal FAQ accents (`#087d76`) | Jackson keeps **forest/sage** §8 — borrow **warmth and section rhythm**, not yellow/navy brand |
| **Type** | Geist sans; tight negative letter-spacing; display-sized section H2s | Jackson keeps **Source Serif + Sans**; adopt **scale rhythm** (eyebrow → display H2 → 18px+ body) |
| **Nav** | Sticky blurred header; **mega-menu** Services (15+ links); CN → `/zh`; primary **Online enquiry** CTA | Jackson: **shallow nav** (8 pages); trilingual **switcher** on same URLs; phone + Enquire |
| **Trust rail** | 3 pills: Registered NDIS, AHPRA practitioners, Melbourne coverage | Jackson: **honest** strip — languages, plan/self-managed NDIS, **not** registered provider, AHPRA status from config |
| **Section rhythm** | Alternating backgrounds (cream → butter → mint FAQ → yellow reviews → enquiry); `clamp()` vertical padding | Adopt **clear chapter breaks**; fewer sections than BetterCare home (sole service) |
| **Cards / density** | 1 featured + 4 service cards (image + hover lift); process **3-up** grid; team preview card | **3–4** interactive blocks on home max above fold on mobile; link out to `/mobile-physiotherapy/` |
| **Motion** | Image scale on hover; card `translateY`; FAQ plus rotate; **auto-scrolling** review track with drag, tilt, grab cursor; reduced-motion → horizontal scroll-snap | Jackson: **no** auto-marquee reviews; optional **manual** scroll row post-GBP; hover lift **subtle** (2–3px); respect `prefers-reduced-motion` |
| **Reviews** | Live Google embed aesthetic: **4.9**, stars, 10 cards, drag UX | **Do not copy** until real reviews — §8 ethics |
| **FAQ** | Two-column: sticky intro + animated `<details>` | Adopt **sticky intro on desktop** + accessible accordion (static Astro-friendly) |
| **Conversion** | Header enquiry CTA; repeated phone/email; bottom enquiry band; floating support prompt (blur card) | **Persistent tel** + one enquiry path; optional discrete “Need help?” **text link**, not intrusive floating promo |
| **Mobile** | `details` hamburger; full service tree inside menu; smaller hero buttons; stacked service cards | Simpler menu; **sticky call bar** (already planned); touch targets ≥44px |

**Interaction density (rough):** BetterCare home **above the fold (mobile):** logo, menu, 2+ CTAs, trust rail (3), hero actions (2) ≈ **8–12** actionable targets. Jackson target: **5–8** (phone, enquire, language, 1–2 in-hero links) — dense enough to feel **finished**, not corporate portal.

### 14.2 Transferable patterns (what “quality” and “density” mean)

| Pattern | What it achieves | Jackson adaptation |
|---------|------------------|-------------------|
| **Staged photography + gradient scrim** | Premium feel without clutter | Portrait + home visit; scrim for text contrast; no video autoplay |
| **Editorial type scale** | Confidence, scanability | Large H1/H2 with **plain language**; body ≥18px |
| **Eyebrow + section title + copy** | Predictable rhythm | Per-page heroes on inner routes |
| **Trust micro-row** | Fast credibility scan | Config-driven badges (AHPRA pending/registered, NDIS honesty) |
| **Interactive service cards** | Explore without wall of text | 3 teasers → dedicated pages; whole card clickable |
| **Process grid** | Reduces anxiety | 3–4 steps on home (already planned §9) |
| **FAQ with motion** | Feels “designed” | CSS-only details; plus icon rotate; RM fallback |
| **Persistent enquiry CTA** | Conversion | Header + footer + sticky mobile call |
| **Section background cadence** | Long-page legibility | 2–3 surface tokens (cream, white, sage mist) — not 6+ colours |
| **Focus/hover affordances** | Density without noise | Buttons lift slightly; visible focus rings |

### 14.3 Adaptation to Jackson’s locked hybrid (§8)

| Pillar | BetterCare signal | Jackson interpretation |
|--------|-------------------|----------------------|
| Calm Professional | Navy/teal discipline | Forest/sage discipline; **no** butter/yellow brand |
| Vitality | Community/service imagery, motion on cards | Community **photos**, step flow, subtle hover — **no** gym/startup motion |
| Older adults | Large type, calm copy (despite flashy reviews) | **Larger** than BetterCare body on mobile; **no** drag-only review UI |
| 亲近感 | Team portrait module, “personal” review quotes | **One** practitioner story on `/about/`; Jackson portrait |
| 伦理感 | Claims NDIS registered + AHPRA team | **Opposite** NDIS registration honesty; AHPRA from `registrationStatus` only |
| Independent mobile physio | Hidden inside multi-service org | Single-offering clarity; **contact = attending physio** in hero subline |
| CALD | `/zh` alternate site | EN/粵/普 **switcher** on same URLs (Phase 1 pattern) |

### 14.4 Will take / will not take

**Will take (BUILD V2)**

- Full-bleed hero with photography (or typographic fallback pre-shoot)  
- Trust strip under hero (config-driven, honest)  
- Section padding rhythm (`clamp`), alternating surfaces  
- Clickable service/teaser cards with hover/focus states  
- Process strip with clear numbering  
- FAQ layout (sticky intro desktop + accordion)  
- Strong enquiry + phone persistence (header, footer, sticky bar)  
- Subtle micro-interactions (button lift, card border, FAQ icon)  
- OG/social image quality tier (post photo shoot)  
- Skip link + semantic landmarks (already partly present)

**Will not take**

- BetterCare **yellow/navy** palette, logo, name, or copy  
- **Registered NDIS provider** / broad allied-health catalogue positioning  
- Mega-menu with 15+ services  
- **Fabricated or imported** Google review carousel (4.9, drag-marquee, tilt cards)  
- Auto-playing review track or scroll-jacking  
- Multi-practitioner **team grid** implying large org  
- Mount Waverley **clinic address** pattern (Jackson is service-area only)  
- Separate `/zh` site fork (unless Jackson later requests)  
- Floating “support prompt” that feels like chat marketing  
- Video hero autoplay  
- Implying **NDIA-managed** or corporate intake team — Jackson is direct practitioner contact

### 14.5 BUILD V2 adaptation approaches

| Approach | Summary | Trade-offs |
|----------|---------|------------|
| **1 — “Polished sole practitioner”** *(recommended)* | BetterCare **layout discipline** (hero, trust row, 3 teasers, process, FAQ, CTA) at **~60% interaction density**; forest/sage; minimal JS | Best fit §8 + ethics; achievable in Astro static |
| **2 — “Editorial lite”** | Strong photography + type; **fewer** hover/card effects; density closer to Phase 1 | Faster BUILD; may feel below BetterCare “designed” bar |
| **3 — “High-motion parity”** | Near BetterCare drag reviews + more animation | **Rejected** for older-audience RM, AHPRA draft honesty, no review data |

**Recommendation:** **Approach 1** — chaptered home, tactile cards, FAQ polish, persistent phone — without review marquee or multi-service chrome.

**Brainstorming status:** Design reference recorded in §14 — **complete**.

---

## 15. Delivery workflow (locked 2026-09-28)

| Step | Status | Output |
|------|--------|--------|
| 1. Competitor reference | Done | Project store `docs/competitor-reference.md` |
| 2. Brainstorming — BetterCare quality bar | Done | §14 |
| 3. **Homepage visual concepts (3)** | Done | `/concepts/1/`, `/concepts/2/`, `/concepts/3/` |
| 4. Jackson picks concept | **Done — Concept 1** | Editorial Forest |
| 5. Wonder refinement | Done (in-repo) | Full homepage system on Concept 1 |
| 5b. **Colour theme pick (A / B / C)** | **Waiting** | Same layout: `/concepts/1/a/`, `/b/`, `/c/` — hub `/concepts/1/` |
| 6. writing-plans | **Waiting** | After colour pick + explicit request |
| 7. executing-plans | **Not started** | |
| 8. Astro/Tailwind production multi-page site | **Not started** | |
| 9. Lighthouse / mobile / SEO audit | Not started | |

**Current gate:** Jackson picks colour theme **A**, **B**, or **C** on the Concept 1 homepage system. Then wait for explicit **writing-plans**. No production multi-page BUILD yet.

### 15.1 Chosen concept — Editorial Forest (Concept 1)

- **Locked:** 2026-09-28.  
- **Homepage system:** Full single-page mockup (all V2 home sections, no reviews) — three palettes, shared layout.  
- **Compare hub:** `http://127.0.0.1:4721/concepts/1/` (or `?theme=a|b|c` redirect).  
- **Themes:** **A** forest/sage · **B** sand/olive · **C** teal/deep green.  
- **Imagery:** Generic illustrative Unsplash blocks via `src/content/concept1-images.ts` — not Jackson, not real clients.  
- **Concepts 2 & 3:** Archived references only.

### 15.2 Homepage visual concepts (comparison — archive)

| Concept | Name | Composition | Type | Photo treatment | Interaction density | Colour temperature |
|---------|------|-------------|------|-----------------|---------------------|-------------------|
| **1** | Editorial Forest | Asymmetric hero; copy left, photo slot right; sticky header | Serif display H1 + sans UI | Cool gradient scrim + dashed portrait frame | **Medium** — trust pills, hover cards, sticky call | Cool forest / sage |
| **2** | Warm Meadow | Centred column; generous vertical rhythm | 1.125rem+ body; serif headlines | Rounded warm frame on cream | **Lower** — stacked blocks, simple nav | Warmer cream / oat |
| **3** | Active Path | Diagonal hero clip; forest header bar | Tags + numbered journey | Pattern block + environment note | **Higher (purposeful)** — scroll-snap steps, tiles, FAQ | Cool forest + lime CTA accent |

Shared rules: service-intent H1, EN/粵/普, honest AHPRA/NDIS, no fake photos or testimonials, concept `noindex` banner.

**Local preview:** `npm run dev` → [concept hub](http://127.0.0.1:4721/concepts/)
