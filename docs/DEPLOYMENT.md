# Deployment — Netlify preview only

The host for this draft is **Netlify’s free plan**, as a preview. This repository contains the build config. It does not create the Netlify site, attach `homemotionphysio.com.au`, change DNS, or merge into `main`.

Indexing stays off. `site.draft` in `src/content/site.ts` is `true`.

## Do not do these

- Do not add `homemotionphysio.com.au` as a custom domain in Netlify.
- Do not change VentraIP DNS. The later records are written at the bottom of this file and need Jackson’s separate approval.
- Do not merge this work into `main`, and do not set Netlify’s production branch to `cursor/design-option-2-b759`.
- Do not set `site.draft` to `false`.
- Do not add Formspree, EmailJS, Resend, SMTP, or any other mail API. Netlify Forms is the form handler. No extra paid account is required.

## What the repo already configures

| Piece | Where | What it does |
| --- | --- | --- |
| Build | `netlify.toml` | `npm run build`, publish `dist`, Node 22. |
| Which deploys build | `scripts/netlify-ignore-build.mjs` | Exit 0 skips the build. Exit 1 builds it. |
| Headers | `scripts/write-netlify-headers.mjs` | Writes `public/_headers` (gitignored) before Astro copies it to `dist`. |
| Canonical origin | `scripts/site-origin.mjs` | Preview URLs stay on the Netlify hostname. |
| Enquiry form | `src/components/EnquiryForm.astro` | Netlify Form `enquiry`. Notification address is a dashboard setting, not a secret in Git. |

`npm run build` runs the header script, then `astro build`.

### Which deploys are allowed

`scripts/netlify-ignore-build.mjs` reads `CONTEXT` and `BRANCH` (both set by Netlify):

- **Build** when `CONTEXT` is `deploy-preview` (any pull-request preview), or when `BRANCH` is `cursor/design-option-2-b759`.
- **Skip** `main` and every other branch, including a production deploy of `main`.

`netlify.toml` sets the same build command for `[context.deploy-preview]`, `[context.branch-deploy]`, and `[context."cursor/design-option-2-b759"]`.

The file cannot flip Netlify’s dashboard toggles. Jackson still has to enable Deploy Previews and a branch deploy for `cursor/design-option-2-b759`. A pull request into that branch gets a deploy preview only after that branch deploy is enabled. Netlify requires the preview’s base branch to be the production branch or a branch with branch deploys turned on.

### Search blocking

While `site.draft` is `true`, every page has `noindex, nofollow` in the HTML, `robots.txt` disallows `/`, and the generated `_headers` file sends `X-Robots-Tag: noindex, nofollow`.

The header is also added when `CONTEXT` is `deploy-preview` or `branch-deploy`, and when `BRANCH` is `cursor/design-option-2-b759`, even if `site.draft` is later set to `false`. A future production deploy can omit that header only after `site.draft` is `false` and the deploy is not a preview of that branch.

Other headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` with camera, microphone, geolocation, and payment disabled, `Strict-Transport-Security` for one year with `includeSubDomains` (no preload), and a Content-Security-Policy that allows this site’s own assets, Astro’s inline scripts and styles, and the map and concept-page hosts already used by the build. Forms may post only to this site (`form-action 'self'`).

## Environment variables

Names only. No values belong in Git. None of these are API keys.

| Name | Who sets it | How the build uses it |
| --- | --- | --- |
| `CONTEXT` | Netlify | `deploy-preview`, `branch-deploy`, or `production`. The ignore script builds deploy previews. The header and origin scripts treat preview and branch-deploy contexts as non-public. |
| `BRANCH` | Netlify | The ignore script builds `cursor/design-option-2-b759` and skips other branches. That branch also stays `noindex` and uses the Netlify URL as its canonical origin. |
| `URL` | Netlify | Site URL for the deploy. Used as the canonical origin on a preview or on that branch when `DEPLOY_PRIME_URL` is empty. |
| `DEPLOY_PRIME_URL` | Netlify | Primary URL of that specific deploy. Preferred over `URL` for preview and branch canonicals. |
| `NODE_VERSION` | `netlify.toml` (`22`) | Selects the Node version for the build. Not a secret. `package.json` requires Node `>=22.12.0`. |
| `PUBLIC_SITE_URL` | Nobody, on this preview | Optional. **Do not set it** on the Netlify preview or the `cursor/design-option-2-b759` branch deploy. Those builds ignore it and use `DEPLOY_PRIME_URL` or `URL`. A local build uses it only when `CONTEXT` is not a preview and `BRANCH` is not that branch. If it is also unset, the local fallback is `https://homemotionphysio.com.au`. That fallback does not attach the domain. |

`astro.config.mjs` passes the resolved origin in as `__HM_SITE_ORIGIN__`. Pages read that for canonical URLs, Open Graph, JSON-LD, and the sitemap. It is a public URL, not a credential.

These names are **not** read by the enquiry form. Leave them unset. Do not commit values:

- `ENQUIRY_NOTIFICATION_EMAIL`
- `REFERRAL_NOTIFICATION_EMAIL`
- `EMAIL_DELIVERY_READY`

`src/lib/email-delivery.ts` is still a stub and does not send mail. The live path is Netlify Forms.

## Netlify setup Jackson does in the dashboard

This repo cannot click these. Do them on the free plan. Do not add a custom domain at any step.

1. Add a new site from Git and choose `Jackson1-netizen/jackson-mobile-physio`.
2. Leave the production branch as `main`. The ignore script skips `main`, so that branch does not publish the preview.
3. Build settings come from `netlify.toml`: command `npm run build`, publish directory `dist`, Node 22. Do not add environment variables.
4. Open **Project configuration → Build & deploy → Continuous Deployment → Branches and deploy contexts**.
5. Under **Branch deploys**, choose **Let me add individual branches** and add `cursor/design-option-2-b759`.
6. Under **Deploy Previews**, leave them enabled (not “None”). Pull requests then get a preview URL. Pull requests into `cursor/design-option-2-b759` are included because that base branch has a branch deploy.
7. Deploy the branch. The URL will be a `*.netlify.app` hostname. Confirm it is not `homemotionphysio.com.au`.
8. After the first successful deploy, open **Forms**. Netlify should list a form named `enquiry` (from `data-netlify="true"` on the static form). Add an **email notification** to `hello@homemotionphysio.com.au`. Type that address in the dashboard only. It is not an environment variable and it is not a credential in client code or GitHub.
9. Submit one test enquiry on the preview URL and confirm it arrives at `hello@`. The site does not store a second copy.
10. On the preview response, confirm `X-Robots-Tag: noindex, nofollow` and a `noindex` robots meta tag.

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
