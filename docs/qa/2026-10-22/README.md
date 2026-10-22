# Pre-launch remediation evidence — 22 October 2026

Source baseline: `1f25c916d259694729e078f7e0f4ac83b3da5faa`, candidate branch
`agent/HOME-002-about-enquiry`. Evidence is committed with the fixes; final SHA is
pinned in the delivery message. See ../../FINAL_PRELAUNCH_REMEDIATION_REPORT.md.

- browser-qa.json: 15 route/viewport menu cases, 3 floating-contact viewport cases.
  Actual built HTML/scripts in Chrome, served locally at port 4721. Click/keyboard,
  Escape, state sync, navigation and duplicate initialization were exercised.
- Screenshots: 1440×900, 390×844, 320×740, initial and after-scroll, plus hero
  controls/CTA proofs. Existing navigation/draft banner were not hidden. Images
  were visually inspected. The card is absent through hero interactions and
  appears after leaving the hero.
- regression-qa.json: real local Google Maps, carousel, FAQ, language switch,
  enquiry validation and locally intercepted POST outcomes, referral controls,
  internal link paths, reduced-motion and no-JS fallback.
- live-simulation.json: isolated production-mode build with draft=false;
  environment files excluded; real source launch switch unchanged; case-insensitive
  requested-term search, metadata/canonical/robots/sitemap/legal assertions.
- control-plane-readonly.json: limited read-only Netlify verification; no setting
  changes, account secrets or key-bearing request URLs are included.

Limitations: local static hosting does not apply Netlify's response headers.
Intercepted local form responses do not verify hosted Forms/email delivery.
No external mutation or new deployment was performed. These are technical
remediation checks, not a public-launch approval, full accessibility audit or
Lighthouse/performance assessment.
