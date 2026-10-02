# Launch status — Home Motion Physiotherapy

Current status of the owner-approved design branch. Staging is live and stays a **private draft**. Nothing in this file turns on indexing or attaches the production domain.

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
- Netlify staging is live at `https://homemotion-staging.netlify.app`. Production branch is `cursor/design-option-2-b759`. Branch deploys are limited to that production branch. Deploy previews are pull requests against it. No custom domain and no Netlify environment variables. Visitor Access / team login is on (anonymous HTTP 401).
- Pull request #3 is merged into `cursor/design-option-2-b759` (merge commit `a5f5745`). `main` is untouched and is not a deploy target.
- Netlify Forms detected form `enquiry`. The email notification to `hello@homemotionphysio.com.au` is saved. As of about 4:55 AM AEST on 3 Oct 2026, the form-to-email path is verified on staging: the test submission “TEST - staging check (please ignore)” (4:45 AM AEST) is in Netlify Forms, and the notification from `formresponses@netlify.com` with subject “Form submission from enquiry form:” arrived in the `hello@` Workspace inbox, not in Spam.
- The referral sheet includes a QR code generated at build time for `https://homemotionphysio.com.au/referral/`. It does not call a QR website. Until DNS changes, that address still opens the parked page. No page shows a QR placeholder.
- Draft privacy policy and website disclaimer are on the site and linked from the footer. They say the map is loaded from Esri (ArcGIS) and that Netlify hosts the site and processes the form. They are still pending owner review and are not adopted.
- Indexing is off behind `site.draft`. Historical concept pages are in `docs/archive/concepts` and are not part of the build or the sitemap. `robots.txt` still disallows `/concepts/` after launch.
- Canonical URLs, Open Graph, JSON-LD, and the sitemap use the staging origin while `site.draft` is true: `DEPLOY_PRIME_URL`, then `URL`, then `https://homemotion-staging.netlify.app`. A production-context build of `cursor/design-option-2-b759` does not use `https://homemotionphysio.com.au`. `PUBLIC_SITE_URL` is ignored until `site.draft` is false. That does not change DNS. See `docs/DEPLOYMENT.md`.
- The Open Graph image is `public/og.png` (1200×630), made from the existing logo and brand colours. It is not a photograph.

## BLOCKED

- **Do not point the domain at this site yet.** `homemotionphysio.com.au` still shows the VentraIP parked page. The apex `A` record is `103.42.108.46`. There is no HTTPS website on that domain. Launch DNS is in `docs/DEPLOYMENT.md` and needs a separate approval.
- **Do not set `draft` to `false`.** While it is true, the HTML robots meta, `robots.txt`, and `X-Robots-Tag` keep staging and its deploy previews out of search.
- **Do not deploy `main`.** It is untouched, it has no `netlify.toml`, and it is the older site.
- **Do not remove Visitor Access until launch.** Anonymous requests get HTTP 401. Public enquiries fail while that protection stays on.
- **Inbound mail from outside the domain is not confirmed.** The Netlify notification reached `hello@`. A message sent from an outside address to `hello@` and to `referrals@` is still outstanding. `EMAIL_DELIVERY_READY` stays unset.
- The GitHub repository is **public**. Treat every committed file as public. Do not add patient information, passwords, or private inboxes.
- University / degree line is still unconfirmed, so it is kept in config and hidden on the pages.
- Privacy policy and disclaimer are not adopted. They are not legal advice.
- A photographic Open Graph image is optional. The shipped image is the branded logo card at `public/og.png`. The referral QR points at the confirmed public URL, which still parks until DNS changes.

## NEEDS JACKSON

- Confirm the AHPRA public-register entry: practitioner name, profession, General registration status, and any conditions or limitations. Do not infer the result from the number already printed on the draft site.
- Confirm the HOME MOTION PHYSIOTHERAPY business-name registration details. Do not infer them.
- Send a test email from an address outside the domain to `referrals@homemotionphysio.com.au` and to `hello@homemotionphysio.com.au`, and confirm both arrive. That checks inbound alias routing from external senders. The Netlify form notification to `hello@` is already verified.
- After monitoring, consider raising DMARC from `p=none` to `p=quarantine`. Do not change it in this repo, and do not invent keys.
- Confirm the phone number `0433 479 703` and these eight suburbs: Box Hill, Doncaster, Blackburn, Ringwood, Burwood, Glen Waverley, Mitcham, Nunawading.
- Review and approve the `/privacy` and `/disclaimer` drafts, or ask a lawyer to review them (`docs/LEGAL_DRAFTS.md`).
- Decide whether the physiotherapy degree and university should be shown. The line stays hidden until then.
- Decide whether the public wordmark stays “Home Motion” (it does now) while the footer uses the registered name “Home Motion Physiotherapy”.
- Say if he wants a photographic Open Graph image before launch. The branded 1200×630 logo image is already in place.
- Approve launch. The later steps are in `docs/DEPLOYMENT.md`: add `homemotionphysio.com.au` and `www` in Netlify, replace the VentraIP apex `A` record `103.42.108.46` with `75.2.60.5`, replace the `www` `A` record with a CNAME to `homemotion-staging.netlify.app`, wait for the HTTPS certificate, remove Visitor Access, set `site.draft` to `false`, verify the form and both mailboxes on the live domain, then decide the production-branch strategy. Do not deploy `main`.

## READY FOR LAUNCH

Do these only after the blocked items and Jackson’s decisions above. Checking a box here does not perform the step.

- [ ] Jackson has approved the privacy policy and disclaimer, and the draft banners on those pages have been updated to the adopted date.
- [x] DKIM signing is active, and DMARC `p=none` is live (3 Oct 2026).
- [ ] `hello@` and `referrals@` each receive a message sent from outside the domain. Replies use those From addresses.
- [ ] DMARC is raised to `p=quarantine` only after that monitoring, if Jackson wants it before launch.
- [ ] Visitor Access is removed so anonymous visitors can open the site and submit the form.
- [ ] Custom domains `homemotionphysio.com.au` and `www` are added in Netlify, with `www` primary. VentraIP apex `A` `103.42.108.46` is replaced by `75.2.60.5`. The `www` `A` record is replaced by a CNAME to `homemotion-staging.netlify.app`. MX, SPF, DKIM, DMARC, and the site-verification TXT are unchanged. HTTPS is issued.
- [ ] The production-branch strategy is decided with Jackson after that. `PUBLIC_SITE_URL` stays unset on staging. Do not deploy `main`.
- [ ] `site.draft` is set to `false` in `src/content/site.ts` (single launch switch).
- [ ] `robots.txt` then allows `/`, still disallows `/concepts/`, and publishes the sitemap.
- [ ] Homepage title no longer says “(draft)”. The amber draft banner is gone.
- [ ] Search Console property is added only after the real site answers on HTTPS.
- [ ] Google Business Profile is created from `docs/GOOGLE_BUSINESS_PROFILE.md`, not before the website URL is live.
- [ ] The printed QR code opens `https://homemotionphysio.com.au/referral/` over HTTPS, not the parked page.

---

## Infrastructure

As supplied from the owner’s records and DNS. This repo does not change any of it.

| Item | State |
| --- | --- |
| Domain | `homemotionphysio.com.au`, registered at VentraIP, expires **30 Sep 2027** |
| Website host | **Netlify free plan.** Staging: `https://homemotion-staging.netlify.app`. Production branch `cursor/design-option-2-b759`. Branch deploys: that branch only. Deploy previews: pull requests against it. No custom domain. No Netlify env vars. Visitor Access on (HTTP 401). |
| Website DNS | Unchanged. Apex `A` is **`103.42.108.46`**. The domain shows the **VentraIP parked page over HTTP**. No HTTPS site on the domain. |
| Email | **Google Workspace Business Starter** (Flexible, trial; paid from about 1 Nov 2026). One user. MX `smtp.google.com`. |
| SPF | `v=spf1 include:_spf.google.com ~all` — valid, as of about 4:55 AM AEST on 3 Oct 2026 |
| DKIM | **Active.** Admin console: “Authenticating email with DKIM”. The `google._domainkey` TXT record resolves publicly. 2048-bit selector `google`. |
| DMARC | `v=DMARC1; p=none` is live, with an aggregate report address set. The report address is not written here. |
| Public addresses | `hello@` and `referrals@` are confirmed aliases on the Workspace user (no extra licence). The admin mailbox is not published on the site. |
| Form email | Verified on staging. Notification from `formresponses@netlify.com`, subject “Form submission from enquiry form:”, reached the `hello@` inbox (not Spam) for the 4:45 AM AEST test. |
| Environment variables | None set in Netlify. Names are in `.env.example`. `ENQUIRY_NOTIFICATION_EMAIL`, `REFERRAL_NOTIFICATION_EMAIL`, and `EMAIL_DELIVERY_READY` stay unset. |
| Admin mailbox | Not published on the website |
| Repository | GitHub `Jackson1-netizen/jackson-mobile-physio` is **public**. Pull request #3 is merged to the design branch. `main` is untouched. |
| Indexing | Off, via `site.draft === true` |
| Staging QA | Desktop and mobile passed for nav, anchors, mobile menu, CTAs, phone `0433 479 703`, both public mailto links, referrer section, printable referral sheet, FAQs, the eight suburb pages, draft privacy and disclaimer, footer ABN and AHPRA, the 404 page, and the draft banner. Console: 0 errors. The referral placeholder text was the failure and is removed in this change. |

## Other branches (not merged)

`cursor/launch-ready-site-2581`, `cursor/website-v2-plan-e732`, and `cursor/bootstrap-jackson-mobile-physio-e489` do not share a merge base with this design branch, so they were not merged.

- `cursor/launch-ready-site-2581` is the older Phase 1 draft (WAI WA LAW branding, AHPRA still pending in that history). The useful pieces — central config, draft `noindex`, privacy page, suburb routes, trilingual UI — are already on this design branch in a later form. Merging it would fight the approved Home Motion design.
- `cursor/website-v2-plan-e732` is a planning document for a future multi-page site. Building it would be a redesign, which this pass does not do.
- `cursor/bootstrap-jackson-mobile-physio-e489` is an earlier ancestor of that same Phase 1 history.
- `main` remains the saved Home Motion V1. Pull request #3 did not touch it, and it must not be deployed.
