# Deployment — Netlify staging

Staging is live at **https://homemotion-staging.netlify.app**. `site.draft` is still `true`, so the site stays `noindex`. There is no custom domain. `main` is untouched and must not be deployed: it has no `netlify.toml` and is the older site.

## Verified on 3 Oct 2026

- Git: pull request #3 is merged into `cursor/design-option-2-b759` (merge commit `a5f5745`). `main` was not updated.
- Netlify production branch: `cursor/design-option-2-b759`.
- Branch deploys: production branch only. Deploy previews: pull requests against that branch.
- No custom domain. No environment variables set in Netlify.
- Visitor Access / team login is on. Anonymous requests get **HTTP 401**. That is acceptable for staging. It must be removed at launch, or the public enquiry form will fail.
- Netlify Forms detection is on. Form `enquiry` is detected. An email notification for `enquiry` goes to `hello@homemotionphysio.com.au`.
- As of about **4:55 AM AEST on 3 Oct 2026**, that path is verified on staging. The test submission “TEST - staging check (please ignore)” at 4:45 AM AEST is in Netlify Forms (name, phone, email, preferred language, reason, suburb, NDIS checkbox). The notification from `formresponses@netlify.com`, subject “Form submission from enquiry form:”, arrived in the `hello@` Workspace inbox, not in Spam.
- Google Workspace: DKIM signing is **active** (admin status “Authenticating email with DKIM”; `google._domainkey` resolves). SPF `v=spf1 include:_spf.google.com ~all` is valid. DMARC `v=DMARC1; p=none` is live. `hello@` and `referrals@` are confirmed aliases on the Workspace user. An outside-sender test to those aliases is still open. Consider `p=quarantine` only after monitoring.

## Do not do these yet

- Do not add `homemotionphysio.com.au` as a custom domain in Netlify.
- Do not change VentraIP DNS. The launch records are at the bottom of this file and need Jackson’s approval.
- Do not merge this work into `main`, and do not set Netlify’s production branch to `main`.
- Do not set `site.draft` to `false`.
- Do not turn off Visitor Access until the launch steps below.
- Do not add Formspree, EmailJS, Resend, SMTP, or any other mail API. Netlify Forms is the form handler. No extra paid account is required.

## Do not do these

- Do not add `homemotionphysio.com.au` as a custom domain in Netlify.
- Do not change VentraIP DNS. The later records are written at the bottom of this file and need Jackson’s separate approval.
- Do not merge this work into `main`. Do not set Netlify’s production branch to `main`.
- Do not set `site.draft` to `false`.
- Do not turn on branch deploys for `main` or any other branch. The only steady deploy is the staging production branch.
- Do not add Formspree, EmailJS, Resend, SMTP, or any other mail API. Netlify Forms is the form handler. No extra paid account is required.

## What the repo already configures

| Piece | Where | What it does |
| --- | --- | --- |
| Build | `netlify.toml` | `npm run build`, publish `dist`, Node 22. |
| Which deploys build | `scripts/netlify-ignore-build.mjs` | Exit 0 skips the build. Exit 1 builds it. |
| Headers | `scripts/write-netlify-headers.mjs` | Writes `public/_headers` (gitignored) before Astro copies it to `dist`. |
| Canonical origin | `scripts/site-origin.mjs` | Staging and preview URLs stay on the Netlify hostname. |
| Enquiry form | `src/components/EnquiryForm.astro` | Netlify Form `enquiry`. Notification address is a dashboard setting, not a secret in Git. |

`npm run build` runs the header script, then `astro build`.

### Why the production branch is not `main`

`main` is the older site and has no `netlify.toml`. Netlify reads that file from the branch it is building. If the production branch were `main`, the first production deploy would not see this ignore script. Netlify would guess the build settings and publish that old site at the public `*.netlify.app` URL, without this `noindex` header.

Set the production branch to `cursor/design-option-2-b759` only after this pull request is merged into that branch, so the file is actually on it. That deploy is staging. It does not attach the production domain.

A real launch later is a separate decision with Jackson: which branch is production, and when the domain is attached. Do not make that decision by flipping `site.draft` on this staging URL.

### Which deploys are allowed

`scripts/netlify-ignore-build.mjs` reads Netlify’s `CONTEXT`, `BRANCH`, and, for a pull request, `REVIEW_ID`:

- **Build** when `CONTEXT` is `production` and `BRANCH` is `cursor/design-option-2-b759`.
- **Build** a deploy preview when `CONTEXT` is `deploy-preview` and the pull request targets that same branch. Netlify often checks the preview out as `pull/<id>/head`, so `BRANCH` is not the base branch. The script reads the public GitHub pull request (`REVIEW_ID`) and continues only when `base.ref` is `cursor/design-option-2-b759`. No token is stored. If GitHub cannot be read, the preview is skipped.
- **Skip** everything else: `main`, other branches, and branch deploys.

`netlify.toml` sets the build command for `[context.production]`, `[context.deploy-preview]`, and `[context."cursor/design-option-2-b759"]`.

The file cannot change the production branch in the Netlify UI. Deploy previews are generated for pull requests into the production branch. Leave other branch deploys off, so a pull request into `main` is not built.

### Search blocking

While `site.draft` is `true`, the staging production deploy and its deploy previews all stay out of search:

- HTML robots meta is `noindex, nofollow` (`src/layouts/BaseLayout.astro`).
- `robots.txt` disallows `/` (`src/pages/robots.txt.ts`).
- `public/_headers`, copied to `dist/_headers`, sends `X-Robots-Tag: noindex, nofollow`.

Those three follow `site.draft` for a production build. Deploy previews and branch deploys also get `X-Robots-Tag` when `CONTEXT` is `deploy-preview` or `branch-deploy`, including after a later change to `site.draft`. Leave `site.draft` true until the launch steps at the bottom of this file.

Other headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` with camera, microphone, geolocation, and payment disabled, `Strict-Transport-Security` for one year with `includeSubDomains` (no preload), and a Content-Security-Policy that allows this site’s own assets, Astro’s inline scripts and styles, and the Esri map tiles (`server.arcgisonline.com`). Forms may post only to this site (`form-action 'self'`). Historical concept pages are archived and are not part of this build, so their font and photo hosts are not in the policy.

## Environment variables

Names only. No values belong in Git. None of these are API keys.

| Name | Who sets it | How the build uses it |
| --- | --- | --- |
| `CONTEXT` | Netlify | `production` for the staging branch, or `deploy-preview` for a pull request. The ignore script builds those two only when they belong to `cursor/design-option-2-b759`. `branch-deploy` is skipped. While `site.draft` is true, the header script sends `X-Robots-Tag` for every context. It also sends that header for `deploy-preview` and `branch-deploy` after a later draft change. |
| `BRANCH` | Netlify | On the staging production deploy this is `cursor/design-option-2-b759`. On a deploy preview it is often `pull/<id>/head`. Passed into `scripts/site-origin.mjs`. It does not by itself select the public domain. |
| `REVIEW_ID` | Netlify | Pull request number for a deploy preview. The ignore script uses it to read the public base branch. It is not a secret. |
| `URL` | Netlify | Main site URL. While `site.draft` is true and `CONTEXT` is `production`, this is the canonical origin. |
| `DEPLOY_PRIME_URL` | Netlify | Primary URL of that specific deploy. Used for `deploy-preview` and `branch-deploy` canonicals. Not used for a draft production-context build, where it is the branch hostname. |
| `REPOSITORY_URL` | Netlify | Used only to choose the GitHub repository for the public pull-request lookup. |
| `NODE_VERSION` | `netlify.toml` (`22`) | Selects the Node version for the build. Not a secret. `package.json` requires Node `>=22.12.0`. |
| `PUBLIC_SITE_URL` | Nobody, until launch | Optional override used only when `site.draft` is `false` and the context is not a deploy preview or branch deploy. **Do not set it** on staging. While `site.draft` is true it is ignored, even if it is `https://homemotionphysio.com.au`. |

### Canonical origin

`scripts/site-origin.mjs` decides the origin. `astro.config.mjs` passes `CONTEXT`, `BRANCH`, `URL`, `DEPLOY_PRIME_URL`, and `PUBLIC_SITE_URL` into it and injects the result as `__HM_SITE_ORIGIN__`. Pages use that for canonical URLs, Open Graph, JSON-LD, and the sitemap.

While `draft: true` and `CONTEXT` is `production`, the origin is `URL`, then `https://homemotion-staging.netlify.app`. `DEPLOY_PRIME_URL` is not used in that context, because Netlify sets it to the branch hostname. Deploy previews and branch deploys use `DEPLOY_PRIME_URL`, then `URL`, then the staging origin. A production-context build does not emit `https://homemotionphysio.com.au`. Setting `PUBLIC_SITE_URL` does not change that.

The public domain is used only when production is explicitly launched: `site.draft` is `false`, and the build is not a deploy preview or branch deploy. `PUBLIC_SITE_URL` can then override that domain. Deploy previews still use the Netlify URL. None of this attaches the domain or changes DNS.

`npm test` covers the staging production case and the explicit-launch case.

These names are **not** read by the enquiry form. Leave them unset. Do not commit values:

- `ENQUIRY_NOTIFICATION_EMAIL`
- `REFERRAL_NOTIFICATION_EMAIL`
- `EMAIL_DELIVERY_READY`

`src/lib/email-delivery.ts` is still a stub and does not send mail. The live path is Netlify Forms.

## Netlify settings already in place

These match the live staging site. Do not point the production branch back at `main`.

- Site: `https://homemotion-staging.netlify.app`
- Production branch: `cursor/design-option-2-b759`
- Branch deploys: production branch only
- Deploy previews: pull requests against that branch
- Build command `npm run build`, publish `dist`, Node 22, from `netlify.toml`
- No environment variables
- No custom domain
- Visitor Access / team login on (HTTP 401 for anonymous requests)
- Form `enquiry` detected; notification to `hello@homemotionphysio.com.au` saved in the dashboard, not in Git

The published homepage includes `<form name="enquiry" data-netlify="true">`, the honeypot, and a hidden `form-name` field. The build fails if those are missing from `dist/index.html`.

No Formspree, EmailJS, Resend, or SMTP account is added. Netlify Forms on the free plan stores the submission and sends the notification. The privacy draft says Netlify may store that submission outside Australia.

## Enquiry form

- Form name `enquiry`, `method="POST"`, `action="/enquiry-received/"`, `data-netlify="true"`, honeypot `bot-field`.
- Fields: name (100) and phone (20) required; email (254), suburb (80), language, NDIS-plan checkbox, and a short message (1000) optional. The note beside the message says not to include detailed medical or health information and links to `/privacy`. The honeypot is off-screen, not `display: none`. There is no CAPTCHA.
- With JavaScript, the browser posts `application/x-www-form-urlencoded` to `/`. The success state is shown only when that response is OK. A local `astro preview` rejects the post, so it must show the failure state and keep the mailto link.
- Without JavaScript, the browser posts to `/enquiry-received/`.
- `mailto:hello@homemotionphysio.com.au` stays visible as a secondary link. It is not the form handler.
- Nothing is written to `localStorage`. This site has no database of submissions.

## Launch steps — do not apply until Jackson approves

The domain still shows the VentraIP parked page. Do these only as a later, approved launch. High-Performance Edge uses different DNS targets; this site is on the free plan.

Netlify’s external-DNS guidance ([configure external DNS](https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns), [SSL troubleshooting](https://docs.netlify.com/manage/domains/troubleshooting/troubleshoot-ssl-and-https)):

- Apex domains cannot use a CNAME. The recommended record is an ALIAS, ANAME, or flattened CNAME to `apex-loadbalancer.netlify.com`.
- VentraIP does not offer that record type. Use the documented fallback: one `A` record to Netlify’s load balancer IP **`75.2.60.5`**.
- `www` is a CNAME to the site hostname **`homemotion-staging.netlify.app`**.
- Keep a single apex `A` record. Extra apex `A` or `AAAA` records block the certificate.
- Prefer `www` as the primary domain in Netlify when DNS stays at VentraIP. Netlify then redirects the apex to `www`.

Order:

1. In Netlify, add the custom domains `homemotionphysio.com.au` and `www.homemotionphysio.com.au`. Do not turn on Netlify DNS. Set `www` as the primary domain.
2. At VentraIP, replace the apex `A` record **`103.42.108.46`** with one `A` record: host `@` (or blank) → **`75.2.60.5`**. Delete any other apex `A` or `AAAA` record.
3. Replace the `www` `A` record with a `CNAME`: host `www` → **`homemotion-staging.netlify.app`**.
4. Do not change MX (`smtp.google.com`), SPF (`v=spf1 include:_spf.google.com ~all`), the DKIM TXT for selector `google`, the DMARC TXT, or the Google site-verification TXT.
5. Wait until Netlify shows the HTTPS certificate as issued for the new domain.
6. Remove Netlify Visitor Access / team login. While it is on, anonymous visitors get HTTP 401 and cannot submit the enquiry form. Leave it on until this step.
7. Set `site.draft` to `false` in `src/content/site.ts` and redeploy. Until then the HTML meta tag, `robots.txt`, and `X-Robots-Tag` stay `noindex`, and canonical URLs stay on the staging hostname. Do this after HTTPS works, so the public URL is the domain rather than only the staging hostname. The referral QR already points at `https://homemotionphysio.com.au/referral/`. Until this DNS cutover, that address opens the VentraIP parked page.
8. On the live HTTPS site, submit one enquiry and confirm it arrives at `hello@homemotionphysio.com.au`. Send one message to `hello@` and one to `referrals@` from an outside address.
9. After that, decide with Jackson whether the Netlify production branch stays `cursor/design-option-2-b759` or changes. Do not point production at `main`.
