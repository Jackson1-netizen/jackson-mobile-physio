# Deployment and launch runbook

Updated 22 October 2026. Public launch requires a fresh independent GO/NO-GO review
and Jackson's approval. This runbook does not authorize external changes.

## Source and release flow

- Repository: Jackson1-netizen/jackson-mobile-physio.
- Candidate: agent/HOME-002-about-enquiry; audit/remediation starting SHA:
  1f25c916d259694729e078f7e0f4ac83b3da5faa. Delivery SHA is recorded in the final report.
- PR #10 is OPEN into cto/home-motion-integration. The quality-gate workflow targets
  the same integration branch.
- Intended flow: candidate → reviewed PR #10 → integration → production.
- Future production source: **cto/home-motion-integration**. The agent branch,
  cursor/design-option-2-b759 and main are not production sources.
- The repository gate does not change Netlify's dashboard source. Do not merge,
  deploy or change that setting during remediation.

## Repository build gate

netlify.toml: Node 22 (package.json requires >=22.12.0), npm run build, publish dist,
ignore command node scripts/netlify-ignore-build.mjs. Exit **1 builds**, **0 skips**.

| Context / source | Gate |
| --- | --- |
| production / cto/home-motion-integration | Allow |
| production / old design, agent, main, unrelated | Skip |
| branch-deploy / agent | Only with HOME_MOTION_STAGING_PREVIEWS=enabled |
| deploy-preview / same-repo agent PR into integration | That opt-in plus verified numeric REVIEW_ID |
| Existing legacy design PR preview | Existing non-production behaviour retained |
| Unrelated preview or failed GitHub lookup | Skip |

The opt-in never grants production permission. PR lookup uses public GitHub without
a token. Direct tests: node --test tests/netlify-ignore.test.mjs.

## Canonical and indexing

**Production canonical and primary public domain: https://homemotionphysio.com.au/
(APEX). Redirect direction: www → apex**, preserving path and query.

scripts/site-origin.mjs supplies canonical, Open Graph, JSON-LD and sitemap origins.
PUBLIC_SITE_URL, if used at a later launch, must be the apex origin; leave it unset
on staging. Changing it does not configure DNS.

- Real checkout retains the single const draft = true in src/content/site.ts.
- Draft: HTML noindex, nofollow; robots Disallow: /; generated X-Robots-Tag noindex.
- Production simulation with draft=false: ordinary pages indexable, draft banners
  absent, robots Allow: / and Disallow: /concepts/, apex sitemap. The 404 stays
  noindex and has no canonical.
- Non-production preview response headers stay noindex even if draft is simulated
  false. A preview is not proof of public indexing.
- Privacy and disclaimer are adopted in configuration, independently of site draft.

scripts/write-netlify-headers.mjs writes ignored public/_headers before Astro
copies it to dist. CSP supports the active Google Maps SDK, tiles, connections,
fonts and styles, retaining its existing unsafe-eval allowance. Forms post only
to self; camera, microphone, geolocation and payment remain disabled.
Actual hosted response headers and Maps console errors still require verification.

## Enquiry and referral

The active form is ContactExperience.astro, reused on / and /enquiry/. Netlify Form
enquiry uses POST, data-netlify, bot-field honeypot and hidden form-name.
Required: name (100 chars), enquiring-as, email (254), phone (20), suburb (80),
service, funding, preferred-contact, message (1000).
Preferred language and NDIS-plan checkbox are optional; email and phone both remain
required. The form asks people not to send clinical details or attachments.

JavaScript validates and posts URL-encoded data to /, showing success only for an
OK response. Native POST targets /enquiry-received/. Local Astro is not Netlify
Forms: local rejection must preserve the error and email fallback. General address:
hello@homemotionphysio.com.au; referrals: referrals@homemotionphysio.com.au.
No new mail API or submission database.

/referral/ is approved text-led concept A with enquiry, phone, email and print
controls. **The current page renders no QR code.** site.referralSheetUrl retains
the apex /referral/ URL for future collateral; it does not prove a QR is rendered
or that the public domain is live.

## Environment variables — names only

| Name | Purpose |
| --- | --- |
| CONTEXT, BRANCH, REVIEW_ID, REPOSITORY_URL | Netlify context/source checks |
| URL, DEPLOY_PRIME_URL | Draft/preview origin |
| PUBLIC_SITE_URL | Optional later live apex origin; ignored while draft |
| PUBLIC_GOOGLE_MAPS_API_KEY | Maps browser key via import.meta.env, baked into build |
| HOME_MOTION_STAGING_PREVIEWS | Non-secret enabled opt-in, non-production only |
| NODE_VERSION | Node 22 |

.env.local is ignored. Never commit or print a key. Keep Maps HTTP-referrer and
Maps JavaScript API restrictions; no extra APIs or Map ID are needed. Rebuild after
changing build-time values. The form does not read ENQUIRY_NOTIFICATION_EMAIL,
REFERRAL_NOTIFICATION_EMAIL or EMAIL_DELIVERY_READY; dashboard notifications
are separate. See SERVICE_AREA_MAP.md.

## Later account-side steps — not executed in remediation

Every item below is **ACCOUNT-SIDE VERIFICATION REQUIRED**. Historical staging
records are not evidence of today's domain, account settings or deployed candidate.

1. After independent GO and explicit approval, review/merge PR #10 into integration.
2. Verify Netlify project/repository, then authorize integration as production
   source; verify ignore command, build, publish path, Node and exact deploy SHA.
3. Verify domain ownership and current Netlify DNS targets before any edit.
   Attach apex and www, select **apex** primary, and verify www → apex HTTPS
   redirects. Preserve Workspace MX, SPF, DKIM, DMARC and verification records.
   Do not treat historical IP addresses in old logs as current instructions.
4. Verify certificates for both hostnames and the reviewed deployment at apex.
5. Verify Maps billing, API restrictions, allowed origins and build-context key;
   check real Maps, attribution, CSP and auth errors on the actual origin.
6. Verify Netlify Forms detection, notification routing and both Workspace aliases.
   Actual delivery needs an approved hosted submission and inbox check.
7. Only at authorized launch, change the real draft switch and Visitor Access.
   Verify anonymous access, form delivery, headers, apex canonical, robots and
   sitemap. Search Console submission is a separate later action.

Do not change accounts, DNS, production variables, Google Cloud, Workspace, merge,
deploy or publish as part of this remediation.
