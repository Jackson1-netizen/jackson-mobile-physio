# Launch status — Home Motion Physiotherapy

Current status of the owner-approved design branch. The site stays a **private draft**. Nothing in this file publishes the domain or turns on indexing.

**Launch switch:** `draft` in `src/content/site.ts`. While `true`, every page sends `noindex, nofollow`, `robots.txt` disallows all crawlers, and the Netlify header sends `X-Robots-Tag: noindex, nofollow`. That covers the staging production deploy and deploy previews of pull requests into it. Set `draft` to `false` only when Jackson deliberately goes live. See `docs/DEPLOYMENT.md`.

**Legal pages:** `/privacy` and `/disclaimer` are drafts pending owner review. See `docs/LEGAL_DRAFTS.md`.

---

## COMPLETED

- Brand on public pages is **Home Motion** / **Home Motion Physiotherapy**. Old “WAI WA LAW” marketing titles removed from the live pages, suburb titles, referral subject, and Open Graph image.
- Business facts live in `src/content/site.ts`: name, sole trader, registered business name, domain origin, phone, public emails, ABN, AHPRA number, service area, languages, NDIS wording.
- ABN **75 612 731 757** is shown where the site shows the business identity (footer, referral sheet, privacy page).
- AHPRA **general registration** **PHY0004088824** is shown in the hero, about section, referrer section, footer, referral sheet, privacy page, and disclaimer. The expiry date is not stored or shown.
- NDIS copy uses “NDIS plan-managed and self-managed enquiries welcome”, states that Home Motion is not an NDIS registered provider, and does not guarantee funding.
- Enquiry form asks for name and phone, with optional email, suburb, language, an NDIS-plan checkbox, and an optional short reason. It tells people not to include health information and links to `/privacy`. It posts to **Netlify Forms** (form name `enquiry`, honeypot, no extra email provider). A success message is shown only when that post is accepted. `mailto:hello@homemotionphysio.com.au` stays as a secondary link. Referrers are directed to `referrals@homemotionphysio.com.au`.
- Netlify staging config is in the repo: `netlify.toml`, build ignore rules, and generated security headers including `X-Robots-Tag: noindex, nofollow` while `site.draft` is true. The ignore script builds a production deploy only when the branch is `cursor/design-option-2-b759`, and deploy previews only for pull requests into that branch. `main` and every other branch are skipped. No custom domain is configured. The enquiry form is in the built homepage HTML with `data-netlify="true"` so Netlify Forms can detect it.
- Draft privacy policy and website disclaimer are on the site and linked from the footer.
- Indexing is off behind `site.draft`. Concept mockups stay out of the sitemap, and stay disallowed in `robots.txt` even after launch.
- Canonical URLs on the staging deploy and its pull-request previews use the hostname Netlify assigns (`DEPLOY_PRIME_URL` or `URL`). They do not claim the public domain. A local build still falls back to `https://homemotionphysio.com.au` unless `PUBLIC_SITE_URL` is set. That fallback does not change DNS. `.env.example` lists variable names only.
- Favicon and Open Graph image use the Home Motion name. A photographic social image is still outstanding.

## BLOCKED

- **Do not point the domain at this site.** `homemotionphysio.com.au` stays on the VentraIP parked page over HTTP. There is no HTTPS website. DNS is unchanged. The records for a later go-live are in `docs/DEPLOYMENT.md` and need a separate approval.
- **Do not set `draft` to `false`.** While it is true, the HTML robots meta, `robots.txt`, and `X-Robots-Tag` keep the staging production deploy and its deploy previews out of search.
- **Do not merge into `main`, and do not use `main` as Netlify’s production branch.** `main` has no `netlify.toml`. A production deploy of `main` would publish the old site at `*.netlify.app` without this ignore script or `X-Robots-Tag`.
- **The Netlify site is not connected yet.** After this pull request is merged into `cursor/design-option-2-b759`, Jackson creates the free-plan site with that branch as the production branch (staging only, no custom domain) and leaves other branch deploys off. Deploy previews then cover pull requests into that branch.
- **Form notification is not turned on until he saves it in Netlify.** Destination: `hello@homemotionphysio.com.au`, typed in the Netlify Forms notification settings. No second provider. `EMAIL_DELIVERY_READY` is unused and must stay unset.
- **DKIM and DMARC are not set up.** A test that `hello@` and `referrals@` receive mail is not recorded. Google Workspace remains the mailbox host.
- The GitHub repository is **public**. Treat every committed file as public. Do not add patient information, passwords, or private inboxes.
- University / degree line is still unconfirmed, so it is kept in config and hidden on the pages.
- Privacy policy and disclaimer are not adopted. They are not legal advice.
- A real 1200×630 social image and a print QR code wait until the public site is actually live. The domain currently parks, so a QR would send people to the wrong page.

## NEEDS JACKSON

- Read and approve, or ask a lawyer to review, `/privacy` and `/disclaimer` before launch (`docs/LEGAL_DRAFTS.md`). The privacy draft now names Netlify as the form host.
- Merge this pull request into `cursor/design-option-2-b759` (not into `main`). Then in Netlify (free plan): connect the GitHub repo, set the production branch to `cursor/design-option-2-b759`, enable Deploy Previews, and leave other branch deploys off. Do not add a custom domain. Steps: `docs/DEPLOYMENT.md`.
- For a real launch later, decide the production branch and the domain with Jackson. That is separate from this staging setup.
- After the first preview deploy, add a Netlify Forms email notification for form `enquiry` to `hello@homemotionphysio.com.au`, then send one test enquiry.
- Confirm a test message arrives at `hello@homemotionphysio.com.au` and `referrals@homemotionphysio.com.au`, and that replies show those From addresses.
- Add DKIM and DMARC in Google Workspace / DNS when he is ready. Do not invent the keys in this repo.
- Supply the physiotherapy degree and university if he wants that line on the site.
- Decide whether the public wordmark stays “Home Motion” (it does now) while the footer uses the registered name “Home Motion Physiotherapy”.
- Approve a photographic Open Graph image if he wants one before launch.
- Say explicitly when to set `site.draft` to `false`. That is the go-live switch for indexing.

## READY FOR LAUNCH

Do these only after the blocked items and Jackson’s decisions above. Checking a box here does not perform the step.

- [ ] Jackson has approved the privacy policy and disclaimer, and the draft banners on those pages have been updated to the adopted date.
- [ ] `hello@` and `referrals@` receive a test message. Replies use those addresses.
- [ ] DKIM and DMARC are in place if he wants them before launch.
- [ ] The Netlify preview is already the chosen host. A production domain is added only when he asks, using the VentraIP records in `docs/DEPLOYMENT.md`.
- [ ] VentraIP DNS for `homemotionphysio.com.au` points at that Netlify site, with HTTPS working. The parked page is gone. MX, SPF, and the site-verification TXT are unchanged.
- [ ] The production branch and the public domain are chosen with Jackson. `PUBLIC_SITE_URL` is set for that launch build only, with no trailing slash. It stays unset on the staging deploy and its previews.
- [ ] `site.draft` is set to `false` in `src/content/site.ts` (single launch switch).
- [ ] `robots.txt` then allows `/`, still disallows `/concepts/`, and publishes the sitemap.
- [ ] Homepage title no longer says “(draft)”. The amber draft banner is gone.
- [ ] Search Console property is added only after the real site answers on HTTPS.
- [ ] Google Business Profile is created from `docs/GOOGLE_BUSINESS_PROFILE.md`, not before the website URL is live.
- [ ] QR code on the referral sheet is added only after that public URL works.

---

## Infrastructure

As supplied from the owner’s records and DNS. This repo does not change any of it.

| Item | State |
| --- | --- |
| Domain | `homemotionphysio.com.au`, registered at VentraIP, expires **30 Sep 2027** |
| Website host | **Netlify free plan, preview only.** Config is in this repo (`netlify.toml`). The Netlify site itself is not created from here. No custom domain. |
| Website DNS | Unchanged. The domain shows the **VentraIP parked page over HTTP**. No HTTPS site. Do not apply the later DNS notes until Jackson asks. |
| Email | **Google Workspace is active.** MX `smtp.google.com`. SPF `include:_spf.google.com`. Site-verification TXT is present. |
| DKIM | Not set up |
| DMARC | Not set up |
| Public addresses | `hello@homemotionphysio.com.au` (enquiries), `referrals@homemotionphysio.com.au` (referrals). The enquiry form notifies `hello@` through Netlify Forms once Jackson saves that notification. No extra mail provider. |
| Environment variables | Names only, in `.env.example` and `docs/DEPLOYMENT.md`. Netlify sets `CONTEXT`, `BRANCH`, `URL`, `DEPLOY_PRIME_URL`. Do not set `PUBLIC_SITE_URL` on the preview. `ENQUIRY_NOTIFICATION_EMAIL`, `REFERRAL_NOTIFICATION_EMAIL`, and `EMAIL_DELIVERY_READY` stay unset. |
| Admin mailbox | Not published on the site |
| Repository | GitHub `Jackson1-netizen/jackson-mobile-physio` is **public**. No GitHub Pages site. No GitHub Actions deploy. Netlify builds from `netlify.toml` after Jackson connects the repo. |
| Indexing | Off, via `site.draft === true` |

## Other branches (not merged)

`cursor/launch-ready-site-2581`, `cursor/website-v2-plan-e732`, and `cursor/bootstrap-jackson-mobile-physio-e489` do not share a merge base with this design branch, so they were not merged.

- `cursor/launch-ready-site-2581` is the older Phase 1 draft (WAI WA LAW branding, AHPRA still pending in that history). The useful pieces — central config, draft `noindex`, privacy page, suburb routes, trilingual UI — are already on this design branch in a later form. Merging it would fight the approved Home Motion design.
- `cursor/website-v2-plan-e732` is a planning document for a future multi-page site. Building it would be a redesign, which this pass does not do.
- `cursor/bootstrap-jackson-mobile-physio-e489` is an earlier ancestor of that same Phase 1 history.
- `main` remains the saved Home Motion V1. It was not updated.
