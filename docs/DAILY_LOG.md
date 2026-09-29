# Daily log

## 2026-09-28

- **Changed:** Bootstrapped Astro + Tailwind repo; one-page draft marketing site; `/referral` print sheet; central `site.ts`; docs and checkpoint script.  
- **Decisions:** See `docs/DECISIONS.md` (2026-09-28 entry).  
- **Blockers:** Business name, contact details, AHPRA grant, legal/ABN not confirmed.  
- **Next:** Jackson to fill placeholders in `src/content/site.ts` and review NDIS/AHPRA wording.  

## 2026-09-28 (confirmed details)

- **Changed:** Updated `site.ts` with WAI WA LAW, mobile 0433 479 703, ABN 75 612 731 757; referral/SEO strings; docs and referral copy; OG placeholder text.  
- **Decisions:** Remain draft until AHPRA granted; see `docs/DECISIONS.md` (2026-09-28 Jackson confirmed).  
- **Blockers:** Private GitHub repo not created — `gh auth status` shows not logged in.  
- **Next:** Jackson runs `gh auth login`, creates private `jackson-mobile-physio`, repoints `origin`, push; then merge Phase 1 to `main`.  

## 2026-09-28 (content refactor)

- **Changed:** Expanded `site.ts`; `/privacy` page; about/NDIS/contact/referral updates; referral sheet without website line; docs synced.  
- **Decisions:** See `docs/DECISIONS.md` (2026-09-28 central content refactor).  
- **Blockers:** Email still not provided; AHPRA pending.  
- **Next:** Jackson supplies email; legal review of privacy draft.  

## 2026-09-28 (GitHub private repo)

- **Changed:** Created private `Jackson1-netizen/jackson-mobile-physio`; pushed Phase 1; updated `docs/GITHUB_WORKFLOW.md` with HTTPS clone URL; `main` and feature branch aligned on GitHub.  
- **Decisions:** See `docs/DECISIONS.md` (2026-09-28 private GitHub repo).  
- **Blockers:** Email still not provided; AHPRA pending; no deployment.  
- **Next:** Jackson clones on second computer; continue edits on feature branch or `main` on GitHub.  

## 2026-09-28 (launch-ready site)

- **Changed:** Launch-ready draft marketing site — suburb pages, i18n switcher, FAQ/how-it-works/enquiry form, expanded SEO/schema, docs/NEXT_STEPS launch checklist. Branch `cursor/launch-ready-site-2581`.  
- **Decisions:** See `docs/DECISIONS.md` (2026-09-28 launch-ready upgrade).  
- **Blockers:** Email not provided; AHPRA pending; no deployment.  
- **Next:** Jackson confirms email + AHPRA; follow `docs/NEXT_STEPS.md` before removing noindex.  

## 2026-09-28 (Website V2 plan)

- **Changed:** Authored V2 planning docs (UX/SEO/visual, shot list, launch checklist); appended decisions and next steps. Branch `cursor/website-v2-plan-e732`.  
- **Decisions:** See `docs/DECISIONS.md` (2026-09-28 Website V2 planning).  
- **Blockers:** Jackson review of visual direction (A/B/C) and **BUILD V2** approval before implementation.  
- **Next:** Jackson reads `docs/WEBSITE_V2_PLAN.md` and replies BUILD V2 or feedback.  

## 2026-09-28 (V2 visual direction locked)

- **Changed:** Updated `docs/WEBSITE_V2_PLAN.md` §8 with Jackson-approved hybrid visual direction; §13 approval state; executive summary.  
- **Decisions:** See `docs/DECISIONS.md` (2026-09-28 V2 visual direction approved).  
- **Blockers:** None for planning; **BUILD V2** not started.  
- **Next:** Jackson replies **BUILD V2** when ready for implementation.  

## 2026-09-28 (BetterCare quality bar brainstorm)

- **Changed:** Added `docs/WEBSITE_V2_PLAN.md` §14 — BetterCare audit, pattern mapping, will/won’t take, adaptation approaches.  
- **Decisions:** See `docs/DECISIONS.md` (2026-09-28 BetterCare quality bar).  
- **Blockers:** None for planning.  
- **Next:** **BUILD V2** when Jackson approves; opened reference + local draft in cloud desktop for comparison.  

## 2026-09-28 (homepage visual concepts)

- **Changed:** Three concept mockup routes; `docs/WEBSITE_V2_PLAN.md` §15 workflow; BetterCare benchmark quote in §14.  
- **Decisions:** See `docs/DECISIONS.md` (2026-09-28 workflow locked).  
- **Blockers:** Jackson concept pick (1 / 2 / 3).  
- **Next:** Wonder refinement after pick — not started.  

## 2026-09-28 (Concept 1 locked + refined)

- **Changed:** Refined `/concepts/1/` mockup; docs workflow §15 updated.  
- **Decisions:** Concept 1 Editorial Forest; Wonder N/A (needs auth).  
- **Blockers:** None.  
- **Next:** Wait for Jackson/parent to request writing-plans.  

## 2026-09-28 (Concept 1 colour variants)

- **Changed:** Full homepage system + themes A/B/C on `/concepts/1/`; generic image config.  
- **Decisions:** See DECISIONS (homepage system + colour themes).  
- **Next:** Jackson picks A, B, or C.  

## 2026-09-28 (Homepage V1 preview at /)

- **Changed:** `/` serves Homepage V1 theme A; site `displayBrand` + `registrationStatus`; hero stock video.  
- **Next:** Wait for writing-plans instruction.  

## 2026-09-28 (Home Motion + hero advantages)

- **Changed:** Rebrand to Home Motion (`motto`, logo in header); hero motto + blended icon advantages row; guided-exercise hero video; `AdvantageIcon` component.  
- **Decisions:** Temporary registered name Home Motion — still swappable via `site.ts`.  
- **Next:** Jackson review at `http://127.0.0.1:4721/`.  

## 2026-09-28 (saved V1 + ChatGPT comparison branch)

- **Changed:** Recorded the current Home Motion V1 as the saved baseline on `main`. Created branch `cursor/chatgpt-version-b759` from that snapshot for a possible ChatGPT-produced alternative design.
- **Decisions:** See `docs/DECISIONS.md` (saved V1 on main; ChatGPT alternative branch).
- **Next:** Jackson reviews both later and chooses which design to use. No public deploy.

## 2026-09-28 (Home Motion redesign audit)

- **Changed:** Wrote `docs/HOME_MOTION_BRANCH_REDESIGN.md` (audit + visual spec). Stored reference artboards in `docs/references/`. No homepage implementation.
- **Decisions:** See `docs/DECISIONS.md` (ChatGPT visual redesign audit).
- **Next:** Wait for **BUILD HOME MOTION DESIGN**. Do not merge to `main`.

## 2026-09-28 (Home Motion ChatGPT visual BUILD)

- **Changed:** New `/` homepage module (`src/components/home/*`) matching the ChatGPT reference: cream/orange/medium-green system, editorial H1, 6 service cards, how-it-works, why-choose, OSM service-area map, HTML brand card, FAQ JSON-LD, working enquiry form. Concept archive and `main` untouched.
- **Decisions:** OSM embed instead of Leaflet; no fake merch photos; NDIS honesty retained.
- **Next:** Jackson compares this branch with `main` V1. Do not merge or deploy.

## 2026-09-28 (archive ChatGPT visual; open option 2)

- **Changed:** Frozen ChatGPT homepage as option 1 on `cursor/chatgpt-version-b759`. Opened `cursor/design-option-2-b759` for a second design.
- **Decisions:** See `docs/DECISIONS.md` (ChatGPT visual archived; option 2 branch opened).
- **Next:** Jackson directs the second design. Do not merge to `main`.

## 2026-09-28 (option 2 visual match)

- **Changed:** Restyled `cursor/design-option-2-b759` to match the attached single-page UI: dark forest services band, orange outline icons, chip row, stacked HTML business cards, pin list + OSM map, gold referrer icons. ChatGPT option 1 and `main` untouched.
- **Honesty:** No invented email on the card; AHPRA pending line kept; NDIS legal section still below the fold.

## 2026-09-28 (larger logo + AHPRA granted)

- **Changed:** Header logo enlarged, with a readable “Mobile Physiotherapy” line under it. Hero service label enlarged. AHPRA copy across the site, referrer section, and referral sheet updated to registered. Registration number not added.
- **Follow-up:** Removed the extra line under the logo. Header now shows the full logo file, including the roof tip and the Mobile Physiotherapy line printed on the logo, at a slightly smaller size.
- **Decisions:** See `docs/DECISIONS.md` (AHPRA registration granted).
- **Next:** Jackson can send the AHPRA number to print on the site. Still draft, not deployed.

## 2026-09-29 (option 2 fixes: six staged checkpoints)

- **Changed:** On `cursor/design-option-2-b759` only. Fixed horizontal overflow at every width. The enquiry form now validates inline and says honestly that online sending is not set up yet (phone link instead). Service links and navigation fixed; skip link and scroll-spy added; homepage fully translated into 繁/简. Services are compact and icon-led, with one placement per photo. Motion is lighter, contrast is AA, and focus rings are visible. Fonts are self-hosted, photos served as AVIF/WebP at several widths, and the map loads only when scrolled near. `/concepts` is excluded from the sitemap.
- **Results:** Lighthouse mobile performance 75 → 98 and accessibility 96 → 100, measured on the local production preview. axe: 0 violations.
- **Still open:** Business email, form endpoint, degree, AHPRA number, production domain. Still draft / noindex. Not deployed.
