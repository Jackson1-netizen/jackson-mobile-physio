# Launch status — Home Motion Physiotherapy

Updated 22 October 2026. **Awaiting independent final GO/NO-GO review.**
Repository remediation does not authorize public launch.

## Candidate and release path

- Candidate: agent/HOME-002-about-enquiry.
- Audited/remediation starting SHA: 1f25c916d259694729e078f7e0f4ac83b3da5faa.
- PR #10 remains OPEN into cto/home-motion-integration; CI targets integration.
- Intended flow: candidate → reviewed PR #10 → integration → production.
- Repository production gate accepts only integration, excluding the working agent,
  legacy design branch and main. Dashboard cutover is a separate approved action.

## Repository reality

- Single launch switch remains const draft = true; indexing stays blocked.
- Production canonical and primary domain: **https://homemotionphysio.com.au/**
  (APEX). Intended redirect: **www → apex**.
- Privacy is adopted in config, updated 21 October 2026 (Google Maps disclosure).
  Disclaimer is adopted, updated 4 October 2026. Adoption is not a claim of
  independent legal certification. Site draft still makes both noindex.
- Registration is stated in words, with no published practitioner number/expiry.
  Business identity/ABN come from site.ts. Placeholder degree/university stay hidden.
- Enquiry requires name, role, email, phone, suburb, service, funding, preferred
  contact and short message. Language and NDIS checkbox are optional. It uses
  Netlify Forms/honeypot; no extra mail provider.
- Active map: Google Maps JavaScript API, PUBLIC_GOOGLE_MAPS_API_KEY.
  Eight main suburbs have pins; fourteen Nearby areas are enquiry links only.
  Textual/error fallback remains available.
- Referral: approved text-led concept A with enquiry, phone, email and A4 print
  controls. **No QR is rendered on the current page**. Future collateral URL is
  apex /referral/.
- Floating contact replaces the former banners/mobile bar; it avoids the hero,
  Contact/form, open menu and footer. Shared header owns menu state on every route.

## Account-side checks

Each row is **ACCOUNT-SIDE VERIFICATION REQUIRED** before public launch.

| System | Verify on actual launch candidate |
| --- | --- |
| Netlify | Current source/contexts, exact deploy, Visitor Access, domain, HTTPS, served CSP/robots, Forms/notifications |
| Google Cloud | Billing, Maps JavaScript API only, restricted key/allowed origins, build variable and successful map at apex |
| DNS | Current records, apex primary and www → apex; preserve mail records |
| Workspace | Current alias routing, replies, SPF/DKIM/DMARC, enquiry notification delivery |
| Owner/professional records | Current registration, business/insurance facts and final release approval |

Old inbox tests and staging logs are not proof of current account state.
Read-only Netlify API check on 22 October 2026 confirmed the existing project
still selects cursor/design-option-2-b759, has no custom domain attached, and has
Visitor Access enabled. These settings were not changed. The future integration
cutover remains a separately approved action after independent review; this
limited read does not verify Cloud, DNS, Workspace or hosted candidate behaviour.
A protected manual review alias was created on 21 October from 88e683e:
https://home-002-review--homemotion-staging.netlify.app.
It does not automatically update on Git pushes and does not establish that today's
candidate is deployed. This remediation does not deploy or change that alias.

## Later release checklist — not performed here

- [ ] Independent reviewer gives GO on final source and evidence.
- [ ] Jackson approves PR #10 merge and separate Netlify integration-source cutover.
- [ ] Reviewed integration source passes checks.
- [ ] Account checks pass; apex HTTPS and www → apex work.
- [ ] Only after launch authorization: draft/Visitor Access cutover, anonymous
  enquiry delivery, real hosted map and CSP checks.
- [ ] Public metadata, robots and sitemap use apex; 404 stays noindex.
- [ ] Search Console/business-profile work is separately approved afterwards.

DEPLOYMENT.md is the active runbook. Old decisions/logs are historical, not
instructions to choose the legacy design branch.
