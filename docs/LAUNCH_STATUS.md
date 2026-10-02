# Launch status — Home Motion Physiotherapy

Current status of the owner-approved design branch. The site stays a **private draft**. Nothing in this file publishes the domain or turns on indexing.

**Launch switch:** `draft` in `src/content/site.ts`. While `true`, every page sends `noindex, nofollow` and `robots.txt` disallows all crawlers. Set it to `false` only when Jackson deliberately goes live. See `docs/DEPLOYMENT.md`.

**Legal pages:** `/privacy` and `/disclaimer` are drafts pending owner review. See `docs/LEGAL_DRAFTS.md`.

---

## COMPLETED

- Brand on public pages is **Home Motion** / **Home Motion Physiotherapy**. Old “WAI WA LAW” marketing titles removed from the live pages, suburb titles, referral subject, and Open Graph image.
- Business facts live in `src/content/site.ts`: name, sole trader, registered business name, domain origin, phone, public emails, ABN, AHPRA number, service area, languages, NDIS wording.
- ABN **75 612 731 757** is shown where the site shows the business identity (footer, referral sheet, privacy page).
- AHPRA **general registration** **PHY0004088824** is shown in the hero, about section, referrer section, footer, referral sheet, privacy page, and disclaimer. The expiry date is not stored or shown.
- NDIS copy uses “NDIS plan-managed and self-managed enquiries welcome”, states that Home Motion is not an NDIS registered provider, and does not guarantee funding.
- Enquiry form asks for name and phone, with optional email, suburb, language, an NDIS-plan checkbox, and an optional short reason. It tells people not to include health information. The site does not store or send the form; it opens the visitor’s email app to `hello@homemotionphysio.com.au`. Referrers are directed to `referrals@homemotionphysio.com.au`.
- Draft privacy policy and website disclaimer are on the site and linked from the footer.
- Indexing is off behind `site.draft`. Concept mockups stay out of the sitemap, and stay disallowed in `robots.txt` even after launch.
- Production origin `https://homemotionphysio.com.au` is prepared for canonical URLs, Open Graph, JSON-LD, and the sitemap. `.env.example` documents `PUBLIC_SITE_URL`. This does not change DNS or hosting.
- Favicon and Open Graph image use the Home Motion name. A photographic social image is still outstanding.

## BLOCKED

- **Do not point the domain at this site yet.** `homemotionphysio.com.au` is registered at VentraIP and still shows the VentraIP parked page over HTTP. There is no HTTPS website, and no website host is connected in DNS.
- **Do not set `draft` to `false`.** Indexing, the draft banner, and `robots.txt` all follow that one switch.
- **Do not enable `EMAIL_DELIVERY_READY`.** Google Workspace is the mail host, but this website still does not send mail. DKIM and DMARC are not set up. A test that `hello@` and `referrals@` both receive and reply as those addresses is not recorded.
- **No host is chosen.** There is no GitHub Actions workflow, GitHub Pages site, Vercel project, or Netlify config in this repo. Do not add one until Jackson picks a host.
- The GitHub repository is **public**. Treat every committed file as public. Do not add patient information, passwords, or private inboxes.
- University / degree line is still unconfirmed, so it is kept in config and hidden on the pages.
- Privacy policy and disclaimer are not adopted. They are not legal advice.
- A real 1200×630 social image and a print QR code wait until the public site is actually live. The domain currently parks, so a QR would send people to the wrong page.

## NEEDS JACKSON

- Read and approve, or ask a lawyer to review, `/privacy` and `/disclaimer` before launch (`docs/LEGAL_DRAFTS.md`).
- Choose a website host. DNS at VentraIP should stay as it is until that host is ready and he asks for the change.
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
- [ ] A host is chosen. The production build is deployed only when he asks.
- [ ] VentraIP DNS for `homemotionphysio.com.au` points at that host, with HTTPS working. The parked page is gone.
- [ ] `PUBLIC_SITE_URL` is `https://homemotionphysio.com.au` with no trailing slash.
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
| Website DNS | No website host chosen or connected. The domain shows the **VentraIP parked page over HTTP**. No HTTPS site. |
| Email | **Google Workspace is active.** MX `smtp.google.com`. SPF `include:_spf.google.com`. Site-verification TXT is present. |
| DKIM | Not set up |
| DMARC | Not set up |
| Public addresses | `hello@homemotionphysio.com.au` (enquiries), `referrals@homemotionphysio.com.au` (referrals). The website does not send mail. |
| Admin mailbox | Not published on the site |
| Repository | GitHub `Jackson1-netizen/jackson-mobile-physio` is **public**. No GitHub Pages site (API 404). No deploy workflow. |
| Indexing | Off, via `site.draft === true` |

## Other branches (not merged)

`cursor/launch-ready-site-2581`, `cursor/website-v2-plan-e732`, and `cursor/bootstrap-jackson-mobile-physio-e489` do not share a merge base with this design branch, so they were not merged.

- `cursor/launch-ready-site-2581` is the older Phase 1 draft (WAI WA LAW branding, AHPRA still pending in that history). The useful pieces — central config, draft `noindex`, privacy page, suburb routes, trilingual UI — are already on this design branch in a later form. Merging it would fight the approved Home Motion design.
- `cursor/website-v2-plan-e732` is a planning document for a future multi-page site. Building it would be a redesign, which this pass does not do.
- `cursor/bootstrap-jackson-mobile-physio-e489` is an earlier ancestor of that same Phase 1 history.
- `main` remains the saved Home Motion V1. It was not updated.
