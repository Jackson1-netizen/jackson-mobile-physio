# Home Motion mobile responsive refinement

## Source and boundaries

22 October 2026. Isolated worktree/branch `agent/mobile-responsive-refinement`, based on approved integration `2d7e85f7c38316eeb8372bb45b7799c5048fe2f9` (PR #10 merge). The release worktree is unchanged. No deployment, merge, launch switch, business/legal copy, infrastructure or map/form backend changes are part of this task.

Browser evidence lives in `D:/HOMEMOTION/mobile-responsive-evidence-2026-10-22`. Chrome rendered the reference and Home Motion at 1440, 1024, 768, 430, 390, 360 and 320px. Before screenshots and computed geometry were captured before implementation. The reference is [Better Care](https://www.bettercarehg.com/); it is a behaviour benchmark, not a source of assets or branding.

## Better Care responsive principles — observed before implementation

1. Header stays 80px tall at tested desktop and phone widths; navigation collapses at the inspected 960px breakpoint rather than shrinking every desktop control.
2. A bounded shell is 1280px at 1440px, 728px at 768px, and 362px at 390px. Mobile gutters change deliberately (20px tablet, 14px phone in the sampled sections).
3. Authored H1 uses `clamp(3.5rem, 6.4vw, 6.2rem)` on desktop and a different `clamp(3.1rem, 13vw, 5.6rem)` in the mobile layout. This is an inspected rule, not a guess from screenshots.
4. Section headings use their own bounded scale: sampled general H2 is 72px at 1440 and 36px on phones; they are not simply the desktop H1 scaled down.
5. General sections use `clamp(72px, 8vw, 128px)` padding, then a deliberate 72px phone value. Internal spacing remains generous after stacking.
6. Intro/team split grids become single columns; the sampled intro gap becomes 48px on a phone. Text retains usable width instead of staying in narrow desktop tracks.
7. Hero media retains cover fitting but changes its mobile focal position to `67% top`. Text is positioned in a separate quiet part of the composition.
8. Service grids and person cards change their tracks; measured phone grids have one full-width column rather than miniature desktop cards.
9. Body/lead copy has distinct line-height and max-width constraints; the sampled intro lead is 17.28px/30.24px on mobile.
10. Mobile hero buttons keep a 46px minimum height and can sit inline when their labels fit. Touch size survives the breakpoint.
11. Footer columns become two at the inspected 960px breakpoint, then one at 680px with a 34px gap, preserving information groups.
12. These are not universal prescriptions: Home Motion keeps its serif headings, forest/orange/sage identity, existing copy, photos and content order where already appropriate. Better Care's tight headline leading, large type minimums, exact section designs and floating banner are not copied.

## BETTER CARE vs HOME MOTION — MOBILE RESPONSIVE COMPARISON

This matrix and the proposed system were written before frontend edits.

| Section | Better Care approach | Home Motion before | Difference / assessment | Recommended change | Priority |
| --- | --- | --- | --- | --- | --- |
| Header/nav | Stable 80px header; explicit collapsed nav; scrollable menu | Compact 71px phone header, existing functional menu; some language targets narrower than 44px | Similar structure, no reason to replace the header | Retain height/logo/behaviour; normalize phone touch targets and shared gutter | M2 |
| Hero | Phone-specific type/composition and media focal point | H1 22.72px at 390; absolute copy over portrait; 768px media remains 4:5 | Heading is smaller than later H2s; tablet hero is 1187px tall | Put phone headline in normal flow, use deliberate H1 scale/natural wrapping; bounded mobile/tablet photo frames | M1 |
| Intro/philosophy | Copy-first stacked grid with readable measure | Copy-first already works; mobile image/callout treatment is separate from tablet | Mostly sound; width/rhythm differs from later panels | Shared gutters/type/spacing; retain copy and photo, keep callout in normal mobile flow | M2 |
| Services | Full-width phone cards; grid tracks collapse | Icon takes 52px plus a 15px gap at 320, leaving ~179px for text | Unnecessarily narrow descriptions and long wraps | Compact icon/title row, allow description to span card width on phones; shared card gap/padding | M1 |
| How it works | Stacked cards retain full reading width | 52px number + divider/gaps leave narrow paragraph column; full-width 4:5 image at tablet | 320px paragraph occupies 6–7 lines; 768px section is 1596px tall | Number/title row with full-width body; landscape tablet image and shared frame radius | M1 |
| About/Jackson | Team content has its own mobile tracks/frame | Portrait expands to ~728px wide with 22rem minimum/intrinsic height before bio at 768 | Portrait dominates a tablet viewport and postpones the introduction | Bound mobile/tablet portrait frame and present introduction before portrait; preserve desktop columns | M1 |
| Service areas | Stacked location copy/media with controlled gutters | 390px area H2 43.2px versus ordinary H2 29.6px; Nearby pills inherit 57.6px main-row height | Heading scale and secondary-link density differ | Shared H2/gutter; distinguish Nearby link sizing; keep all 8 main/14 nearby facts | M2 |
| Google map | Contained location media | Real Google map already usable, 464px phone frame and 44px controls | Core function is good; floating card can overlap the map's controls while scrolling | Retain map dimensions/API/markers/controls; avoid contact overlay in the map region | M1 |
| Referrers | Clear single-column content groups | Main content stacks well; separate phone visual keeps a 35rem absolute photo/quote frame | Fixed promotional frame imposes height and competes with quote text | Normal-flow photo/quote composition on phones; keep desktop decorative composition | M2 |
| FAQ | Full-width accessible disclosure groups | Native disclosures already work and fit | Same; no invented interaction issue | Shared heading/gutter only; preserve disclosure behaviour | M2 |
| Contact/enquiry | Readable full-width controls; deliberate content hierarchy | Contact H2 is 57.6px on a phone while hero H1 is 22.72px; 88px at 768; decorative scene before form | Inverted title hierarchy and avoidable distance to fields | Shared H2/page-H1 scales, body size and gutter; shorter decorative scene; keep every field/validation/POST unchanged | M1 |
| Footer | Grouped columns collapse with consistent gaps | Already stacks and preserves all information; 20px gutter differs from form's 16px | Structure is sound; phone link hit areas can improve | Shared gutter and readable grouped spacing/44px link targets; no copy changes | M2 |
| Inner pages | Responsive type/container constraints | Areas/enquiry/referral H1s range 43.2–57.6px on phones, legal H1 30px; varying 16/20px gutters | Different entry-point scales without a consistent shared system | Shared responsive page-title/gutter tokens, with legal prose measure preserved | M2 |
| Floating contact | Reference has a different large fixed banner; not adopted | Existing 288×88px card covers a large share of a 320px viewport's reading width | Existing hero/form/menu/footer safety works, but content/map interference remains | Compact phone presentation and map avoidance, retaining existing focus/dismissal/hero safety | M1 |

## Proposed Home Motion responsive system — defined before implementation

- Desktop (>=1024px): preserve existing geometry, typography and composition.
- Shared phone/tablet gutter: `clamp(16px, 4.65vw, 24px)`; all primary containers use the same token within the responsive scope.
- Section spacing: `clamp(44px, 37.6px + 2vw, 56px)`; existing Home Motion density is retained rather than copying the reference's 72px.
- H1: `clamp(32px, 22.4px + 3vw, 40px)`; H2: `clamp(30px, 24.8px + 1.6vw, 40px)`; leading ~1.12, natural wrapping and Home Motion serif retained. Small labels remain subordinate.
- Body: existing 16–17px with approximately 1.5–1.65 leading; never shrink copy merely to fit a desktop track.
- Cards: 16px gap, 16–20px padding, existing ~18px radius. On phones, descriptive copy can use the full card width beneath icon/number/title rows.
- Buttons: approximately 48px minimum phone height; header/menu/link targets at least 44px where practical; primary/secondary hierarchy preserved.
- Images: existing photos only; 4:3 mobile frames and wider tablet frames as appropriate, explicit focal points; avoid unbounded full-width portraits.
- Breakpoints: existing 600/768/1024 families, with component-specific boundaries retained only where needed; no new collection of arbitrary device widths.
- Keep existing map size/SDK/data/selection/cluster behaviour and form contract. Responsive changes apply to their presentation and adjacent overlay only.

## Final refinement report

### A. Better Care responsive observations

The twelve measured principles above are the reference findings. Authored CSS and computed styles were inspected in Chrome; the implementation was not inferred from source alone. Seven widths were rendered. Reference captures/authored-rule records stay in the local evidence folder; no competitor assets were added to Home Motion.

### B. Home Motion differences

The main differences were an under-scaled mobile hero heading, oversized tablet portraits, narrow phone card text tracks, inconsistent primary-container gutters/title scales, a fixed-height phone referral photo/quote composition, and a contact overlay competing with map interaction. The comparison matrix records the priorities and the areas that were already working.

### C. Principles adapted

Adapted: deliberate phone composition, bounded typography, usable line width, shared spacing, full-width stacked cards, explicit image crops, readable entry-point hierarchy and progressive grid collapse. Home Motion keeps its serif/sans pairing, colors, photos, icons, copy and service information. Its existing section density remains approximately 44–56px rather than copying the reference's 72px phone spacing.

### D. Changes by section

| Section | Final implementation |
| --- | --- |
| Header | Existing compact/sticky structure retained; both phone language controls have 44px minimum targets; shared minimum gutter. Menu/ARIA/Escape code unchanged. |
| Hero | Phone heading in normal flow, natural line wrapping, separate photograph frame; portrait source below 600px and landscape source for tablet; 4:3 phone / 3:2 small-tablet frame. Primary/secondary actions precede auxiliary trust chips on phones. Existing ten-second carousel, pause/play and reduced-motion behaviour retained. |
| Intro | Shared title/gutter/section rhythm; photo and enquiry callout remain readable in normal flow on compact layouts. |
| Services | Phone icon/title row, full-width description beneath it; shared padding/gaps/radius. Supporting subtitle has a calmer 20px phone scale. |
| How it works | Number/title row and full-width body on compact layouts; 4:3 photo frame; desktop two-column design retained. |
| About/Jackson | Introduction appears before the bounded portrait on compact layouts; portrait capped at 576px wide with a 4:3 crop. Explicit desktop grid placement preserves the original photo-left composition. |
| Areas | Shared heading/gutter/section tokens; Nearby pills retain 44px minimum height instead of inheriting the main suburb-row height. All facts and links retained. |
| Map | No map-code, SDK, marker-data, clustering, selection or dimensions change. FloatingContact observes the existing frame to avoid covering map controls on compact screens. |
| Referrers | Phone image and quote use normal document flow; fixed 35rem promotional frame removed for phones. Desktop decorative frame retained. |
| Contact | Coherent section-H2/page-H1 scale, 17px lead, shared gutter/card padding, shorter decorative scene, two-column tablet fields and single-column phone fields. Fields, names, required rules, honeypot, validation, serialization and POST unchanged. |
| Footer | Existing information groups retained; shared gutter and 44px compact-layout link targets. |
| Inner pages | Enquiry, phone Areas/referral, legal and receipt entry points use the shared responsive title/container rules without changing their wording. |
| Floating contact | Phone entry becomes a compact labelled pill with a 44px dismiss target; desktop card unchanged. Existing hero/menu/form/footer avoidance, focus and dismissal retained; compact-map avoidance added. |

### E. Mobile typography

Computed at 390px, English, font settings unchanged between captures:

| Element | Before | After |
| --- | ---: | ---: |
| Homepage H1 | 22.72px | 34.10px |
| Ordinary section H2 | 29.60px | 31.04px |
| Areas H2 | 43.20px | 31.04px |
| Referrers H2 | 41.60px | 31.04px |
| Contact H2 | 57.60px | 31.04px |
| Enquiry page H1 | 57.60px | 34.10px |
| Standard homepage body | 17px | 17px |
| Form labels | 17.6px | 16px |

Page-title token is 32–40px, section-title token 30–40px. English headings use approximately 1.12 leading; existing Chinese leading/language rules remain. The 320px English hero naturally needs four lines for the unchanged wording; it no longer depends on forced desktop breaks or a miniature heading over the faces.

### F. Mobile spacing

| Rule | Final value |
| --- | --- |
| Minimum page gutter | 16px at 320; 18.14px at 390; 20px at 430; 24px tablet cap |
| Section padding | 44–56px fluid token |
| Content stack | 24px |
| Card gap | 16px |
| Card padding | 16–20px |
| Shared image/card frame radius | 18px where adopted; existing brand shapes retained elsewhere |
| Phone action height | 48px minimum; menu/footer/dismiss targets 44px |
| Hero frame | 4:3 phone, 3:2 at 600–768px |
| Jackson portrait | 4:3, max 576px wide on compact screens |

Shared rules live in `src/styles/responsive-tokens.css`; the existing component breakpoints consume them. Desktop values remain outside the responsive token scope.

### G. Screenshot results

Two visual passes were completed. Pass one identified an overly prominent 320px service subtitle and delayed hero action priority; pass two corrected both. Final captures explicitly await photo decoding so lazy images are not mistaken for missing content.

Paired viewport screenshots exist for **1440, 768, 430, 390 and 320px**, covering hero, services, Jackson introduction, areas/map, referrers, how it works, Contact and footer: **40 pairs** in [the QA folder](qa/mobile-responsive-2026-10-22/README.md). Before/after full-page originals also exist at 1024/360px in the local evidence directory.

- [390px hero comparison](qa/mobile-responsive-2026-10-22/comparisons/hero-390.webp)
- [320px process comparison](qa/mobile-responsive-2026-10-22/comparisons/how-320.webp)
- [768px introduction comparison](qa/mobile-responsive-2026-10-22/comparisons/about-768.webp)
- [390px Contact comparison](qa/mobile-responsive-2026-10-22/comparisons/contact-390.webp)
- [Phone referral visual before](qa/mobile-responsive-2026-10-22/referral-photo-before-390.webp) / [after](qa/mobile-responsive-2026-10-22/referral-photo-after-390.webp)

Local interactive viewer: `D:/HOMEMOTION/mobile-responsive-evidence-2026-10-22/comparison.html`.

Measured page heights: 768px view 15450 → 14126px; 390px view 16207 → 15754px; 320px view 17027 → 16401px. Shortening the entire page was not the goal: the clearer 320px hero intentionally becomes taller, while the tablet portrait/process/contact excess is reduced.

### H. Test results

- `npm test`: **24 pass, 0 fail, 0 skipped, 0 cancelled**, 410137.7529ms, in a byte-identical isolated validation copy with physical dependencies. SHA-256 manifest confirms every frontend/script/test input matches the branch. The direct Windows worktree attempt hit EPERM when the existing fixture-copy helper tried to duplicate a dependency junction; no test was weakened, skipped or changed.
- `npm run check`: **75 files; 0 errors, 0 warnings, 0 hints** in the actual worktree.
- `npm run build`: **16 pages, 3.31s, exit 0** in the actual worktree; built Netlify form and draft/noindex assertions pass.
- Production-mode fixture builds pass, including adopted legal indexing and all existing banned-copy checks. Actual draft state remains true.
- Browser: 15 route/viewport menu combinations; three floating-contact sizes; 48 phone route/locale/width cases across EN/简中/繁中 where supported; rotation 844×390 and back; zero horizontal overflow at all seven sampled homepage widths.
- Real Google basemaps on home/Areas and both phone widths; eight main markers, fourteen Nearby links, selection/reset/external links and prefill pass. Compact contact entry hides during map interaction. Generated CSP enforced locally also passes.
- Actual ten-second carousel, both photo selections, pause/play, reduced motion, no-JS fallback, FAQ, legal/404, referral/one-page A4 print and 580 internal links pass. No page exceptions or Maps/auth console errors recorded.
- Form success/failure responses were intercepted locally; required-field feedback, NDIS/honeypot payload, error/mail fallback and receipt navigation pass. No hosted submission or email was sent.

See [checks](qa/mobile-responsive-2026-10-22/checks.json), [browser results](qa/mobile-responsive-2026-10-22/browser-results.json) and [phone QA](qa/mobile-responsive-2026-10-22/phone-qa.json). GitHub's quality-gate result is available on the review PR. Verification used desktop Chrome rendering/emulation, not a physical-device Safari certification.

### I. Desktop regression

**PASS.** At both 1440 and 1024px, measured header, every heading, section heights and non-map image geometry are identical before/after. Overall heights remain 9436px and 9776px. Dynamic map tiles are excluded from image-array/pixel equivalence. Manual screenshot review found no desktop composition change.

### J. Mobile verdict

**MOBILE RESPONSIVE STATUS: READY FOR REVIEW**

Changes are committed only to the mobile branch for review. No automatic merge, production deployment, Netlify/DNS/Cloud/email setting, business/legal wording, service-area fact, map function, Forms backend or launch-switch change was made in this task. The original release worktree remains clean at the approved integration SHA.
