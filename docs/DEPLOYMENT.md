# Deployment — Netlify preview only

The host for this draft is **Netlify’s free plan**, as a preview. This repository contains the build config. It does not create the Netlify site, attach `homemotionphysio.com.au`, change DNS, or merge into `main`.

Indexing stays off. `site.draft` in `src/content/site.ts` is `true`.

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

Those three follow `site.draft` for a production build. Deploy previews and branch deploys also get `X-Robots-Tag` when `CONTEXT` is `deploy-preview` or `branch-deploy`, including after a later change to `site.draft`. Do not set `site.draft` to `false` until the real launch branch and domain are decided.

Other headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` with camera, microphone, geolocation, and payment disabled, `Strict-Transport-Security` for one year with `includeSubDomains` (no preload), and a Content-Security-Policy that allows this site’s own assets, Astro’s inline scripts and styles, and the map and concept-page hosts already used by the build. Forms may post only to this site (`form-action 'self'`).

## Environment variables

Names only. No values belong in Git. None of these are API keys.

| Name | Who sets it | How the build uses it |
| --- | --- | --- |
| `CONTEXT` | Netlify | `production` for the staging branch, or `deploy-preview` for a pull request. The ignore script builds those two only when they belong to `cursor/design-option-2-b759`. `branch-deploy` is skipped. While `site.draft` is true, the header script sends `X-Robots-Tag` for every context. It also sends that header for `deploy-preview` and `branch-deploy` after a later draft change. |
| `BRANCH` | Netlify | On the staging production deploy this is `cursor/design-option-2-b759`. On a deploy preview it is often `pull/<id>/head`. The staging branch uses the Netlify hostname as its canonical origin. |
| `REVIEW_ID` | Netlify | Pull request number for a deploy preview. The ignore script uses it to read the public base branch. It is not a secret. |
| `URL` | Netlify | Site URL for the deploy. Used as the canonical origin on staging or a preview when `DEPLOY_PRIME_URL` is empty. |
| `DEPLOY_PRIME_URL` | Netlify | Primary URL of that specific deploy. Preferred over `URL` for staging and preview canonicals. |
| `REPOSITORY_URL` | Netlify | Used only to choose the GitHub repository for the public pull-request lookup. |
| `NODE_VERSION` | `netlify.toml` (`22`) | Selects the Node version for the build. Not a secret. `package.json` requires Node `>=22.12.0`. |
| `PUBLIC_SITE_URL` | Nobody, on staging | Optional. **Do not set it** on the staging site or its deploy previews. Those builds use `DEPLOY_PRIME_URL` or `URL`. A local build uses it only when `CONTEXT` is not a preview and `BRANCH` is not the staging branch. If it is also unset, the local fallback is `https://homemotionphysio.com.au`. That fallback does not attach the domain. |

`astro.config.mjs` passes the resolved origin in as `__HM_SITE_ORIGIN__`. Pages read that for canonical URLs, Open Graph, JSON-LD, and the sitemap. It is a public URL, not a credential.

These names are **not** read by the enquiry form. Leave them unset. Do not commit values:

- `ENQUIRY_NOTIFICATION_EMAIL`
- `REFERRAL_NOTIFICATION_EMAIL`
- `EMAIL_DELIVERY_READY`

`src/lib/email-delivery.ts` is still a stub and does not send mail. The live path is Netlify Forms.

## Netlify setup Jackson does in the dashboard

This repo cannot click these. Do them on the free plan. Do not add a custom domain at any step. Do not merge the pull request from here; Jackson merges it.

1. Merge the ready pull request into `cursor/design-option-2-b759` first. That puts `netlify.toml` on the branch Netlify will build. Do not merge it into `main`.
2. Add a new site from Git and choose `Jackson1-netizen/jackson-mobile-physio`.
3. Set the **production branch** to `cursor/design-option-2-b759` before the first deploy runs. Do not leave it on `main`. If a `main` deploy starts, cancel it. If one was published, delete that deploy so the old site is not left on the `*.netlify.app` URL.
4. Build settings come from `netlify.toml`: command `npm run build`, publish directory `dist`, Node 22. Do not add environment variables.
5. Open **Project configuration → Build & deploy → Continuous Deployment → Branches and deploy contexts**.
6. Leave **Branch deploys** off (none, or no extra branches). The staging site is the production-branch deploy, not a separate branch deploy.
7. Under **Deploy Previews**, leave them enabled. Pull requests into `cursor/design-option-2-b759` then get a preview, because that branch is the production branch. Pull requests into `main` are not built.
8. The staging URL will be a `*.netlify.app` hostname. Confirm it is not `homemotionphysio.com.au`.
9. After the first successful deploy, open **Forms**. Netlify should list a form named `enquiry`. The published homepage includes `<form name="enquiry" data-netlify="true">`, the honeypot, and a hidden `form-name` field. The build fails if those are missing from `dist/index.html`. Add an **email notification** to `hello@homemotionphysio.com.au`. Type that address in the dashboard only. It is not an environment variable and it is not a credential in client code or GitHub.
10. Submit one test enquiry on the staging URL and confirm it arrives at `hello@`. The site does not store a second copy.
11. On the staging response, confirm `X-Robots-Tag: noindex, nofollow`, a `noindex` robots meta tag, and `robots.txt` disallowing `/`.

For a real launch later, decide the production branch and the domain with Jackson. The DNS records below stay unused until that decision.

No Formspree, EmailJS, Resend, or SMTP account is added. Netlify Forms on the free plan stores the submission and sends the notification. The privacy draft says Netlify may store that submission outside Australia.

## Enquiry form

- Form name `enquiry`, `method="POST"`, `action="/enquiry-received/"`, `data-netlify="true"`, honeypot `bot-field`.
- Fields: name and phone (required); email, suburb, language, NDIS-plan checkbox, and a short message (optional, 400 characters). The page asks people not to include health information and links to `/privacy`.
- With JavaScript, the browser posts `application/x-www-form-urlencoded` to `/`. The success state is shown only when that response is OK. A local `astro preview` rejects the post, so it must show the failure state and keep the mailto link.
- Without JavaScript, the browser posts to `/enquiry-received/`.
- `mailto:hello@homemotionphysio.com.au` stays visible as a secondary link. It is not the form handler.
- Nothing is written to `localStorage`. This site has no database of submissions.

## DNS — do not apply

**Do not change VentraIP DNS, and do not add the domain in Netlify, until Jackson asks in a separate step.** The domain still shows the VentraIP parked page over HTTP. These notes are only for that later approval.

Free-plan DNS, after he asks (Netlify’s external-DNS guidance; High-Performance Edge uses different targets and is not this plan):

1. Delete every existing apex `A` and `AAAA` record, and delete the parking `www` record.
2. Add one `A` record: host `@` (or blank) → `75.2.60.5`. Leave only that one apex `A` record.
3. Add a `CNAME`: host `www` → the site’s `<name>.netlify.app` hostname shown in the Netlify dashboard. That hostname does not exist until the site is created. Do not guess it.
4. Do not change MX (`smtp.google.com`), SPF (`include:_spf.google.com`), or the Google site-verification TXT.
5. Add the custom domain in Netlify only after those records are in place and he has approved it. HTTPS follows DNS. Then, and only then, consider `site.draft`.

Until that approval, preview and branch deploys stay on `*.netlify.app` and stay `noindex`.
