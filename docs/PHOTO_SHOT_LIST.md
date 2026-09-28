# Photography shot list — Jackson mobile physiotherapy

**Purpose:** Plan real imagery for Website V2. **Never use fake photos of Jackson**, AI-generated likenesses, or stock images presented as the practitioner.

**Status:** Pre-shoot planning. Execute when Jackson is ready (before or during BUILD V2 polish).

---

## 1. Principles

- Jackson is the brand face: **authentic**, professional, approachable.
- Show **mobile / home / community** context — not a fake clinic.
- Respect privacy: no identifiable clients without written consent; prefer Jackson solo or anonymized environments.
- Diversity of settings: reflects eastern suburbs homes (apartment, house, courtyard) without stereotyping CALD communities.
- Files: high-resolution RAW or JPEG; web delivery via WebP/AVIF at build time.

---

## 2. Priority shots (launch blockers)

| ID | Shot | Use | Notes |
|----|------|-----|--------|
| P1 | **Hero portrait** — Jackson waist-up, natural light, neutral or home background, direct eye contact, professional attire (polo or smart casual) | Home hero, About page, OG template | Primary marketing image |
| P2 | **Portrait variant** — relaxed smile, optional folded tablet or folder (no visible client data) | About, referrals PDF | Shows prepared professional |
| P3 | **Environmental wide** — Jackson at front door or entryway with therapy bag (branded subtly if desired) | Home secondary, Mobile physio page | “We come to you” |
| P4 | **In-home context (no client)** — living room or hallway; Jackson demonstrating mobility aid or measuring step **without** a real patient | Mobile physio page | Educational, not treatment claim |
| P5 | **Detail** — hands adjusting exercise band on Jackson’s own wrist/ankle **or** equipment on table | Services sections | Avoid “hands on patient” stock look |

---

## 3. Supporting shots (post-launch nice-to-have)

| ID | Shot | Use |
|----|------|-----|
| S1 | Jackson walking on suburban street (eastern suburbs cues: trees, weatherboard optional) | Service areas |
| S2 | Car boot / organized equipment layout | Trust, preparedness |
| S3 | Jackson on phone (smile, consent to show number blur if needed) | “Speak with your physio” |
| S4 | CALD-friendly detail: Jackson with language note on screen or bilingual welcome card (designed prop) | Multilingual strip |
| S5 | Seasonal refresh (optional yearly) | Social / GBP posts |

---

## 4. Do not shoot / do not use

- Stock “physiotherapist stretching patient” from image banks passed off as Jackson
- Hospital or competitor clinic backgrounds presented as Jackson’s
- Client faces without model release
- Before/after outcome imagery
- AHPRA certificate close-up until registration granted and Jackson approves display

---

## 5. Technical specs

| Spec | Recommendation |
|------|----------------|
| Orientation | Mix landscape (hero) + portrait (About) |
| Resolution | ≥ 2400px long edge for hero |
| Color | Neutral grading; consistent with Direction A palette in `WEBSITE_V2_PLAN.md` |
| Delivery | Folder `media/raw/` (gitignored) → optimized copies in `public/images/` at BUILD |
| Alt text | Descriptive per page in `i18n` or `site.ts` |

---

## 6. Pre-shoot checklist

- [ ] Confirm wardrobe (2 options: polo + button shirt)
- [ ] Clean therapy bag and props (band, step, folder)
- [ ] Locations: Jackson’s home + one consented client home **or** staged rental (if used, disclose as staged in internal notes only)
- [ ] Weather backup for outdoor shots
- [ ] Photographer credit in `docs/DECISIONS.md` if required

---

## 7. Until photos exist

V2 BUILD may ship with **typographic hero** (name + service + region) and neutral abstract background — **not** placeholder SVG faces or third-party practitioner photos.
