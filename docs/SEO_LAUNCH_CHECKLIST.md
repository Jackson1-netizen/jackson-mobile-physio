# Final launch verification checklist

Updated 22 October 2026. This is for the independent reviewer and Jackson after
technical remediation; it authorizes no publication or external account changes.

## Source and adoption

- [ ] Review final candidate SHA on agent/HOME-002-about-enquiry and OPEN PR #10
  into cto/home-motion-integration. CI must pass; reviewer gives GO/NO-GO.
- [ ] Future production source is integration after approved merge, never agent,
  legacy design branch or main.
- [x] Repository records privacy/disclaimer as adopted; displayed dates are
  21 October 2026 and 4 October 2026. Do not describe them as pending adoption.
- [ ] ACCOUNT-SIDE VERIFICATION REQUIRED: current registration, insurance, business
  details, domain ownership and owner release approval. Do not reintroduce a
  published AHPRA practitioner number or invent missing qualifications.

## Public origin and account checks

- [ ] **APEX is primary: https://homemotionphysio.com.au/**. www → apex redirects,
  preserving path/query; certificates cover both names.
- [ ] ACCOUNT-SIDE VERIFICATION REQUIRED: actual Netlify integration source,
  correct deploy SHA, build/publish paths and access protection at launch.
- [ ] ACCOUNT-SIDE VERIFICATION REQUIRED: current DNS; preserve mail records.
- [ ] ACCOUNT-SIDE VERIFICATION REQUIRED: Maps JavaScript API restriction, precise
  HTTP referrers, build-time PUBLIC_GOOGLE_MAPS_API_KEY and real map on apex.
- [ ] ACCOUNT-SIDE VERIFICATION REQUIRED: Netlify Forms detection, hosted submission
  acceptance/notification and Workspace aliases. No new mail service.

## Indexing — only after authorized launch

- [ ] Real draft switch is false only after approval; remediation keeps it true.
- [ ] Ordinary HTML index, follow; 404 noindex/no canonical.
- [ ] No visible draft banners, unadopted legal warnings or old placeholder copy.
- [ ] Canonical, OG, JSON-LD and sitemap origins are apex; no staging/loopback leak.
- [ ] robots.txt allows /, disallows /concepts/, names apex sitemap-index.xml.
- [ ] Production response omits site-wide X-Robots-Tag noindex. Non-production
  previews retain it.
- [ ] Adopted privacy/disclaimer remain included/indexable in live mode.

## Functional review

- [ ] Shared menu aria-expanded/open/Escape/keyboard works on home, areas,
  enquiry, privacy and referral at desktop/mobile.
- [ ] Floating contact does not cover hero, carousel pause or primary mobile CTA;
  after-scroll appearance and menu/form/footer avoidance work.
- [ ] Enquiry validation/fallback, 8 main map pins / 14 Nearby enquiry links,
  languages, FAQ, referral/print, contact links and carousel remain functional.
- [ ] Current referral page contains no QR. Verify a QR only if future collateral
  actually renders one; its target must be apex /referral/.
- [ ] npm test, npm run check and npm run build pass; inspect browser evidence.

Search Console submission, business-profile creation and P2/P3/performance work are
separate, later approvals. Do not execute them in this remediation.
