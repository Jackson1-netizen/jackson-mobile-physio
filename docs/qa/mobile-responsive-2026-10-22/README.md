# Mobile responsive evidence — 22 October 2026

Base: integration `2d7e85f7c38316eeb8372bb45b7799c5048fe2f9`. Change branch: `agent/mobile-responsive-refinement`. No merge or production deployment.

`comparisons/` contains 40 paired viewport screenshots: eight sections at 1440, 768, 430, 390 and 320px. Left is before; right is after. Full-resolution originals and all seven-width captures (including 1024/360) are retained locally at `D:/HOMEMOTION/mobile-responsive-evidence-2026-10-22` alongside `comparison.html`, an interactive gallery. No competitor images or creative assets were added to the website or this evidence folder.

- [390px hero](comparisons/hero-390.webp)
- [320px service flow](comparisons/how-320.webp)
- [768px Jackson introduction](comparisons/about-768.webp)
- [390px Contact](comparisons/contact-390.webp)
- [Referrers photo before](referral-photo-before-390.webp) / [after](referral-photo-after-390.webp)

`before-metrics.json` / `after-metrics.json`: condensed measured browser geometry at all seven widths; complete raw measurements remain in the local evidence directory. `checks.json` / `layout-summary.json`: automated and desktop comparison results. `browser-results.json`: menus, floating contact, actual carousel, Google Maps, form/FAQ/legal/print regression. `phone-qa.json`: 48 route/locale/width cases, rotation, maps and both hero photos. `validation-source-hashes.json`: proves the isolated test copy used the exact frontend/scripts/tests source.

Local infrastructure: the original release server on 4721 was left untouched. A separate static server serves this worktree at 4731; test browser contexts proxy their 4721 requests to it, preserving the existing authorized localhost Maps referrer. This changes no Cloud, DNS, hosting setting or application code.

Windows worktree dependency junctions cause the existing test-copy helper to hit EPERM. The original link/worktrees were preserved; the exact source was copied without .env files into a separate validation directory with physical dependencies. npm test there passed 24/24. No test was weakened or skipped. Actual-worktree check/build passed. A test probe initially queried the Google logo before its asynchronous attribution element appeared; the settled, visible real logo was then explicitly awaited. A form geometry probe was corrected to measure checkboxes as touch targets rather than expecting them to be text-field width. These were QA fixture corrections, not application failures.

Static screenshots await fonts and photo decoding and settle entry animations. They are not evidence of hosted launch readiness, and no hosted form submission/email was sent.
