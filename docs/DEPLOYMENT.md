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

- `src/content/site.ts` remains the single source of truth for `draft`. The v5
  feature task describes a `true` baseline, but the supplied feature-branch
  checkout contains `const draft = false`; this discrepancy requires owner
  clarification. The referral implementation does not change that switch or
  indexing/headers logic.
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

/referral/ now uses the approved v5.1 Make a Referral layout. The Netlify Form
named `referral` handles both new referrals (`referral-type=new`) and existing
participant/care plan updates (`referral-type=update`). It is pre-rendered into
static HTML with POST, `data-netlify="true"`, the `bot-field` honeypot, hidden
`form-name=referral` and `multipart/form-data` encoding. Enhanced submission posts
multipart data to the same-origin Netlify endpoint and redirects only after an
OK response to `/referral-received/`; native POST uses that page as its action.
The thank-you page explicitly stays noindex, including after a future launch.
Opening it directly is not proof of a submission or email delivery.

The earlier complete A4 content remains at `/referral-sheet/`, linked as
**Printable referral sheet** from the referral page. `site.referralSheetUrl`
retains its existing apex `/referral/` value; no domain or production-source
configuration changes are part of this feature.

### Referral release and Netlify checklist

The v5 referral work is prepared only on `feat/referral-form-v5`. The manager
reviews and pushes it through the approved release process; this feature does
not change the existing Netlify production-source selection, preview gate, DNS,
domain, CI or the existing draft/indexing configuration. The supplied checkout's
`draft=false` conflicts with the task's stated `true` baseline and must be
resolved explicitly before release. Any account changes below are for Jackson
after the reviewed candidate is available on an approved Netlify deployment.

1. Run `npm test`, `npm run check` and `npm run build`. The build must fail if the
   static referral form, field names, multipart encoding or thank-you noindex
   contract is absent. Inspect `dist/referral/index.html` and
   `dist/referral-received/index.html`. Compare approved desktop/390px screenshots
   separately; browser rendering is not available in the implementation sandbox.
2. Confirm the deployed SHA and project. In Netlify **Forms**, ensure form
   detection is enabled and that the deployed static form appears as `referral`.
   Existing `enquiry` must remain detected.
3. Open **Forms → referral → Notifications → Add notification → Email
   notification**. Some dashboard views expose this under **Configuration →
   Notifications → Form submission notifications**; choose `referral`. Enter
   **referrals@homemotionphysio.com.au** (`site.referralEmail`) as the recipient,
   use a subject such as **Home Motion — Referral / care plan update**, and save.
   Do not include participant data in the subject. Keep enquiry notifications
   routed separately to `hello@homemotionphysio.com.au`.
4. Check Forms allowance and request/file limits in the account. Netlify's total
   form-request limit is **8 MB**; optional uploaded documents have a combined
   client cap of **7 MiB** (7 × 1024 × 1024 bytes, displayed as **7 MB**) to allow
   for fields and multipart overhead. Native uploads remain subject to Netlify's
   own enforcement. Check one and several small harmless attachments are
   accessible from the authenticated submission; an email notification may link
   to them rather than carry the files as attachments.
5. Send synthetic new and update submissions, with and without a small file.
   Confirm the same `referral` form stores the correct mode and fields, the
   thank-you redirect occurs, and mail reaches the referral address. Test
   invalid/empty required fields, bad email/phone, file-size failure, failed AJAX,
   EN/中文, and native POST when AJAX is unavailable. With JavaScript disabled
   entirely, the form defaults to new referral; use the shown phone/email fallback
   for updates. Use no patient data or clinical documents.
6. Inspect **Forms → referral → Verified submissions / Spam submissions**, and
   the recipient's Inbox/Spam and Google Workspace rules. Mark a legitimate test
   **Not spam** as needed. Add only a narrow filter for a verified notification
   sender/subject; keep the honeypot and spam filtering enabled. Verify that
   enquiry delivery still reaches its own recipient.
7. Record the deployed SHA, test modes, stored-record result, attachment result
   and inbox result without committing private addresses or patient information.
   Remove synthetic submissions/files under the practice's retention policy.

No dashboard, inbox or hosted submission checks have been carried out by this
repository change. Notification setup is account-side, not an environment
variable. See `EMAIL_SETUP.md` and `REFERRAL_FLOW.md` for details.

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
