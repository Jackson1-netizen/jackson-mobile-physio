# HOME MOTION
# FINAL PRE-LAUNCH REMEDIATION REPORT

22 October 2026. Scope: the four confirmed P0/P1 findings only. This report does
not approve public launch. The final delivery message pins the resulting commit
SHA; this report and the evidence below are committed with the fixes.

## A. SOURCE

- Starting audited SHA: `1f25c916d259694729e078f7e0f4ac83b3da5faa`.
- Branch: `agent/HOME-002-about-enquiry`; clean before fast-forwarding from the
  earlier local `88e683e` to the fetched candidate.
- PR: [#10](https://github.com/Jackson1-netizen/jackson-mobile-physio/pull/10), OPEN,
  base `cto/home-motion-integration`. No merge or push to integration/main.
- Architecture evidence: actual PR base, existing integration ref and the
  quality-gate workflow targeting integration agree with candidate → PR #10 →
  integration → future production. The old dashboard source is the known P0,
  not evidence that the working agent branch should become production.

## B. P0 PRODUCTION GATE

Previously, production accepted only `cursor/design-option-2-b759`.
Now production accepts only `cto/home-motion-integration`; old design, agent,
main and unrelated production sources are skipped. `refs/heads/` normalization
works. Netlify's allow=1 / skip=0 exit convention is tested through the real script.

Approved, opt-in same-repo agent PR/branch previews still work. The pre-existing
legacy design PR path stays non-production only. Missing approval, unrelated
branches, wrong head/base/repository, invalid review IDs and failed GitHub lookup
remain rejected. Seven automated gate tests pass, including direct CLI cases.
The matching integration context/comment in `netlify.toml` is updated.

Read-only Netlify inspection confirmed its actual production source is still the
old design branch. **No dashboard source change was made.** Cutover to integration
is an account-side action after independent review and approved merge.

## C. MENU FIX

Root cause: `initMenu` lived inside the homepage motion initializer, which only
homepage and referral called. BaseLayout's shared header on other routes lacked
the initializer, leaving stale aria-expanded and no Escape listener.

`HomeHeader.astro` now owns one shared initializer in `src/lib/header-menu.ts`.
The homepage initializer no longer binds menus. A per-element readiness guard
prevents duplicate bindings, including re-executing the initializer. Native
details toggle and programmatic open changes synchronize aria-expanded; close,
Escape/focus return, link navigation, outside click/focus and panel sizing remain.

Actual built pages were exercised in Chrome on `/`, `/areas/`, `/enquiry/`,
`/privacy/`, `/referral/` at 1440×900, 390×844, 320×740: **15 route/viewport passes**.
Clicks, Enter, Space, programmatic open/close, Escape/focus, navigation and repeated
initialization without added listeners passed. See [browser evidence](qa/2026-10-22/browser-qa.json).

## D. FLOATING CONTACT FIX

Root cause: its blocker set covered Contact/footer/menu but not the hero, and the
fixed card could initially paint before its visibility state was initialized.

It starts hidden, stays hidden through the homepage and referral hero, appears
64px after leaving the hero, and hides on returning into the hero. This hysteresis
avoids boundary flicker. A passive scroll listener batches measurements per frame.
Existing form/footer/menu avoidance and page-only dismissal remain. On returning
to the hero with focus in the card, focus moves to the primary hero action before
the card hides. A no-JavaScript normal-flow link remains available. No motion or
layout redesign was added; the former mobile bar remains unused as in the candidate.

Initial and scrolled states at all three sizes passed, including hero CTAs,
carousel control, threshold jitter, stable document height, keyboard handoff,
menu/Contact/footer avoidance and dismissal. Reduced-motion and no-JS checks passed.

Screenshots (actual draft-mode built pages; navigation was not removed):

| Width | Initial hero | After scroll | Protected hero interaction |
| --- | --- | --- | --- |
| 1440 | [Initial](qa/2026-10-22/hero-initial-1440.png) | [Card visible](qa/2026-10-22/after-scroll-1440.png) | [Carousel + CTAs](qa/2026-10-22/hero-controls-1440.png) |
| 390 | [Initial](qa/2026-10-22/hero-initial-390.png) | [Card visible](qa/2026-10-22/after-scroll-390.png) | [Hero CTAs](qa/2026-10-22/hero-cta-390.png) |
| 320 | [Initial](qa/2026-10-22/hero-initial-320.png) | [Card visible](qa/2026-10-22/after-scroll-320.png) | [Hero CTAs](qa/2026-10-22/hero-cta-320.png) |

## E. DOCUMENTATION

Rewrote the four required active documents: `DEPLOYMENT.md`, `LAUNCH_STATUS.md`,
`LEGAL_DRAFTS.md`, `SERVICE_AREA_MAP.md`.
Related active guidance corrected: README, `NEXT_STEPS.md`, `SEO_LAUNCH_CHECKLIST.md`,
`GITHUB_WORKFLOW.md`, `STAGING_PREVIEW_PROPOSAL.md`, `FLOATING_CONTACT.md`,
`REFERRAL_PAGE.md`. Historical context is explicitly marked in `DECISIONS.md`,
`PROJECT_BRIEF.md`, `REFERRAL_SHEET_COPY.md`, `GOOGLE_BUSINESS_PROFILE.md` and
`EMAIL_SETUP.md`; historical logs are not rewritten as current account facts.

Corrections: apex primary/canonical and www → apex; PR/integration flow; adopted
legal pages (privacy 21 October, disclaimer 4 October); Google Maps rather than
Esri; current required form fields; 8 main pins / 14 Nearby links; current concept A
referral/print controls and no rendered QR. Updated only stale comments in site.ts,
not the launch/adoption switches or public copy. Unverified account facts carry
**ACCOUNT-SIDE VERIFICATION REQUIRED** rather than invented current state.

## F. AUTOMATED CHECKS

- `npm test`: **24 tests passed, 0 failed/skipped/cancelled**, final run 363327.6208ms.
- `npm run check`: **75 files; 0 errors, 0 warnings, 0 hints**.
- `npm run build`: **16 pages**, exit 0; Netlify form and draft/noindex assertion passed.
- Gate: **7 tests passed**, including production integration allow, old/agent/unrelated
  rejects, approved preview, and direct executable exit-code checks.
- `git diff --check`: passed. No dependency/framework/paid-service change.

Commands ran locally through the installed npm CLI because npm is not on this
machine's ordinary PATH. The repository scripts themselves are unchanged.

## G. LIVE-MODE SIMULATION

`npm test` built isolated copies without .env files; the actual launch switch stayed
true. An additional retained temporary copy independently checks the same live
production state. See [simulation evidence](qa/2026-10-22/live-simulation.json).

Production simulation: build succeeds, public canonical/OG/JSON-LD/sitemaps use apex,
ordinary pages index/follow, adopted legal pages indexable/included, site-wide
noindex header absent. 404 stays noindex/no canonical. Robots allows `/`, disallows
`/concepts/` and names the apex sitemap. Draft labels are absent; the preview
noindex header rule is unchanged in the context-aware header generator.

Requested built-output search terms: PHY0004088824, Expert physiotherapy,
not verified, Not yet adopted, Pending owner review, localhost, 127.0.0.1,
example.com, Draft site, Draft preview — **zero matches**. No staging origins in
public metadata. The only allowed generic draft-named remnant noted by the broader
existing scan is CSS variable naming such as `color-draft`; it is not visible copy
or one of the requested search terms. No real workspace launch switch was changed.

## H. REGRESSION QA

Actual locally served build, not only source inspection:

- Carousel pause, manual switch, resume and automatic 10-second advance passed.
- English/Simplified Chinese switch and native FAQ open/close passed.
- **Real Google SDK/basemap** on `/` and `/areas/`: ready, Google logo, 8 main
  choices, 14 Nearby enquiry links, selection/external link and reset passed.
- Nearby link prefilled the enquiry suburb. Required validation, failure fallback
  and accepted-response navigation passed using intercepted **local** POST responses.
  No hosted enquiry or notification was sent; this does not prove email delivery.
- Adopted legal pages/dates, both referral print buttons, generated A4 output,
  internal built link paths, draft robots meta, reduced-motion and no-JS fallback passed.
- No page JavaScript errors captured. Existing mobile header/hero actions remain;
  the unused legacy mobile contact bar was not restored.

See [regression results](qa/2026-10-22/regression-qa.json). Browser actions and
screenshots used built static output on port 4721 to avoid development HMR reloads.
Local static hosting does not apply Netlify's response headers; hosted CSP checks
remain account-side. Browser evidence was visually inspected; no full-site WCAG,
Lighthouse or public-launch certification is claimed.

## I. ITEMS STILL REQUIRING JACKSON / ACCOUNT ACCESS

**ACCOUNT-SIDE VERIFICATION REQUIRED**, after the fresh independent review:

- Approved PR #10 merge, integration production-source cutover, exact hosted SHA.
- Current domain/DNS/HTTPS, apex primary and www → apex; preserve mail DNS.
- Current production environment and Visitor Access changes only at approved launch.
- Google Cloud billing/API/key/referrer restrictions and hosted Maps/CSP verification.
- Netlify Forms/notification routing, actual approved submission/inbox delivery,
  Workspace aliases and current professional/business/insurance facts.

The limited read-only Netlify result is [recorded separately](qa/2026-10-22/control-plane-readonly.json).
No Netlify/Cloud/DNS/Workspace mutation, deployment, domain attachment, production
environment change, Search Console submission or merge occurred in this pass.
Pushes deliver the candidate fixes only; the earlier manual alias is not updated.
P2/P3 tasks explicitly excluded by the request were left untouched.

## J. FINAL ASSESSMENT

REMEDIATION STATUS: READY FOR INDEPENDENT FINAL RECHECK

This is readiness for a fresh independent review, not a public-launch GO decision.
