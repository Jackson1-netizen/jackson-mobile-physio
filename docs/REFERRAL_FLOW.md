# Referral form flow

The approved v5.1 form is at `/referral/`. It uses the same Netlify Forms service
as the existing enquiry flow. Both **New referral** and **Update referral / care
plan** submit to the single form named `referral`; no mail API, new provider or
application database has been added. The earlier A4 information sheet remains
available at `/referral-sheet/` through the **Printable referral sheet** link.

## Submission and notification

1. Astro emits the complete form in `dist/referral/index.html`, including
   `name="referral"`, `method="POST"`, `data-netlify="true"`,
   `netlify-honeypot="bot-field"`, `enctype="multipart/form-data"` and the hidden
   `form-name=referral`. Netlify detects this static HTML when deploying.
2. The selected card sets `referral-type=new` or `referral-type=update`. Shared
   referrer details, participant name, consent and upload stay available in
   either mode. Enhanced mode changes hide and disable inactive fields so they
   cannot block validation or leak stale values into the other type of request.
3. The client validates the active fields and presents inline errors. Valid
   enhanced submissions use a same-origin multipart POST. A successful HTTP
   response redirects to `/referral-received/`; an error preserves the form and
   offers the phone/referral-email fallback. No success is shown for an AJAX
   failure. Without the enhanced client, the form remains a normal multipart
   POST to `/referral-received/` handled by Netlify. Mode switching still works
   when JavaScript runs but AJAX is unavailable. With JavaScript completely
   disabled, the form defaults to new referral and displays phone/email contact
   for updates.
4. Netlify stores the submission and optional upload. Jackson configures an email
   notification for this form to **referrals@homemotionphysio.com.au**, the
   `site.referralEmail` public identity. The recipient is stored in the Netlify
   dashboard, not an environment variable or frontend mail client. Existing
   `enquiry` notifications continue to use `hello@homemotionphysio.com.au`.
5. The receipt page is always `noindex, nofollow`. Opening it directly does not
   send a referral, guarantee notification delivery or start treatment.

The code does not save submissions to localStorage, put participant details in
URLs, or keep a database of form submissions. Netlify holds submitted records
and documents; notification mail is handled by Google Workspace. The existing
privacy wording and `/privacy/` link remain. Do not add clinical-history,
diagnosis or other health-detail fields beyond the approved form.

## Field contract

| Submitted name | Purpose / mode |
| --- | --- |
| `form-name` | Hidden Netlify form identifier: `referral` |
| `bot-field` | Hidden spam honeypot; leave empty |
| `referral-type` | `new` or `update` |
| `referrer_role` | Required role; shared |
| `referrer_name` | Required full name; shared |
| `referrer_organisation` | Optional organisation; shared |
| `referrer_phone` | Required phone, Australian phone sanity check; shared |
| `referrer_email` | Required valid email; shared |
| `participant_name` | Required new or existing participant full name; shared |
| `participant_gender` | Optional gender; new referral |
| `participant_dob` | Required date of birth; new referral |
| `participant_phone` | Optional phone; new referral |
| `participant_email` | Optional email, valid when supplied; new referral |
| `participant_address` | Required address; new referral |
| `participant_suburb` | Required suburb; new referral |
| `participant_state` | Required Australian state/territory; new referral |
| `participant_postcode` | Required four-digit postcode; new referral |
| `funding_type` | Required funding category; new referral |
| `risks` | Optional repeated checkbox values: pets, aggressive behaviour, access issues; new referral |
| `update_type` | Required update category: New care plan / Funding change / New referral letter / Other update |
| `new_funding_type` | New funding category; required for Funding change, optional for other updates |
| `effective_date` | Optional date the change takes effect; update |
| `update_notes` | Required short update note; update; do not include detailed health information |
| `upload` | Optional referral letter/documents; either mode; multiple files share the combined size cap |
| `consent` | Required confirmation that the referrer has permission to share these details; either mode |

Visible labels and client feedback support EN/中文. Names and machine values remain
stable across languages so Netlify submissions have a consistent field schema.
Dates and files should contain only the information needed for the referral.

## Upload limits

Netlify's total form-request limit is **8 MB**, including all fields, multipart
headers and file content. The enhanced client limits all selected documents
together to **7 MiB** (7 × 1024 × 1024 bytes; displayed as **7 MB** in the form)
so the rest of the request has space. Native POST is ultimately
limited by Netlify, and JavaScript validation cannot replace platform checks.
Jackson must confirm the account's current Forms allowance and upload behavior
on the approved hosted deployment. Use only small harmless files in tests.
Files may be accessed through the authenticated Netlify submission; do not
assume the notification includes the file as a literal email attachment.

## Local verification

Run from `repo/`, without changing the existing site-wide draft switch:

```sh
npm test
npm run check
npm run build
```

The feature brief describes `site.draft=true`, while the supplied branch contains
`const draft = false`. This discrepancy requires owner clarification before
release; the referral change does not alter the launch switch or global
indexing/headers logic. The receipt page has its own unconditional noindex flag.

The build assertion checks the pre-rendered referral form's Netlify contract and
the receipt page's noindex marker. Inspect `dist/referral/index.html` for named
controls, multipart encoding, honeypot, action and hidden form-name. Inspect
`dist/referral-received/index.html` for its always-noindex metadata and contact
fallback links. Unit tests cover validation and the build contract. The manager
must render the desktop and 390px layouts against `reference/v5_1_desk.png` and
`reference/v5_1_mob.png`; Chrome cannot be launched in the implementation sandbox.

Local Astro preview does not provide Netlify Forms storage or email. An HTTP
response from a local static server is not evidence of real submission handling.
Do not run a real referral or include patient information in fixtures, logs,
screenshots, commits or test submissions.

## Hosted verification — Jackson

These are account-side checks and have not been performed by repository work:

1. Have the manager push/release the reviewed feature through the approved
   deployment process. Confirm project and deployed SHA, without changing
   production-source selection, DNS, domain or the draft/indexing posture.
2. Confirm **Forms** detection is enabled and **Forms → referral** exists after
   the static build has been deployed. Confirm `enquiry` still exists.
3. Open **Forms → referral → Notifications → Add notification → Email
   notification**. If the UI routes through **Configuration → Notifications →
   Form submission notifications**, select `referral`. Recipient:
   **referrals@homemotionphysio.com.au**. Suggested subject:
   **Home Motion — Referral / care plan update**. Save it. Do not put participant
   details in the subject or change the enquiry recipient.
4. With synthetic details, submit both modes without a file and with a small
   harmless file, then with several small harmless files. Check a stored record
   on `referral`, the correct `referral-type` and active fields, accessible uploads,
   `/referral-received/` redirect, and mail
   received at the intended address. A redirect alone does not prove delivery.
5. Check missing required fields, malformed emails/phones, oversized files and an
   interrupted AJAX request. Errors must retain the form and offer phone/email
   contact. Confirm the update mode can submit without new-only required fields.
6. Check EN/中文 and native submission for either selected mode with AJAX
   unavailable but JavaScript enabled. With JavaScript entirely disabled, test
   the initial new-referral path and the displayed phone/email fallback for
   updates; there is no no-script mode selector. Native field validation differs
   from the enhanced client, but the Netlify form/schema stays the same.
7. Inspect **Forms → referral → Verified submissions / Spam submissions** plus
   Workspace Inbox, Spam and relevant filters. Mark a legitimate test **Not
   spam**; use a narrow filter for the sender/subject verified from that test if
   needed. Keep spam filtering and the honeypot enabled. Verify enquiry delivery
   still reaches `hello@homemotionphysio.com.au`.
8. Record verification without patient details or private inbox addresses, then
   remove synthetic records/files according to the practice's retention policy.

See `EMAIL_SETUP.md` for notification/mail ownership and `DEPLOYMENT.md` for
release boundaries. No environment variable configures the referral recipient.

## Implementation and verification record — 31 October 2026

Changed files, grouped for review:

- Referral pages: `src/pages/referral.astro`, `src/pages/referral-received.astro`,
  `src/pages/referral-sheet.astro`.
- Referral components: `src/components/ReferralExperience.astro`,
  `src/components/ReferralField.astro`, `src/components/ReferralIcon.astro`.
- Shared layout/header/footer: `src/layouts/BaseLayout.astro`,
  `src/components/SiteHeader.astro`, `src/components/home/HomeHeader.astro`,
  `src/components/LanguageSwitcher.astro`, `src/components/SiteFooter.astro`.
- Copy and styles: `src/content/i18n.ts`, `src/content/referral-i18n.ts`,
  `src/styles/referral-experience.css`, `src/styles/home-motion.css`,
  `src/styles/referral.css`.
- Client and build checks: `src/lib/referral-form.mjs`,
  `src/lib/referral-form.d.mts`, `scripts/assert-netlify-form.mjs`,
  `scripts/site-draft.mjs` (receipt sitemap exclusion only).
- Tests: `tests/referral-form.test.mjs`, `tests/referral-interaction.test.mjs`,
  `tests/referral-netlify.test.mjs`, `tests/launch-build.test.mjs`,
  `tests/netlify-ignore.test.mjs`. Existing printable-page checks now target
  `/referral-sheet/`. Existing subprocess tests use temporary log files instead
  of synchronous pipes, preserving assertions while avoiding sandbox `EPERM`.
- Documentation: `docs/EMAIL_SETUP.md`, `docs/DEPLOYMENT.md`,
  `docs/REFERRAL_FLOW.md`.

Offline results on `feat/referral-form-v5`: `npm test` passed all nine test files
(including 21 new referral cases); `npm run check` reported zero errors, warnings
or hints across 86 files; `npm run build` and the Netlify form assertion passed.
Static inspection confirmed one multipart referral form with 27 controls, unique
IDs, both mode fieldsets, translations, the printable link, and both header
actions on all 18 pages with site headers. The referral receipt is noindex and
absent from the sitemap. `git diff --check` passed.

No network, browser rendering, push, deployment or dashboard change was performed.
Hosted storage, notification delivery and screenshot comparison remain manual
checks. The child-age cutoff remains the approved mockup's unconfirmed wording.
The existing `site.draft=false` value was preserved pending clarification of the
conflicting task instructions.
