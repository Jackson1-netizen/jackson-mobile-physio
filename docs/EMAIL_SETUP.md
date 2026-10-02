# Email setup

Public identities are on the draft site. Google Workspace is the mail host for `homemotionphysio.com.au` (MX `smtp.google.com`). As of about 4:55 AM AEST on 3 Oct 2026, SPF `v=spf1 include:_spf.google.com ~all` is valid, DKIM signing is active (selector `google`, `google._domainkey` resolves, admin status “Authenticating email with DKIM”), and DMARC `v=DMARC1; p=none` is live. The aggregate report address is not written in this repo.

The website does not send mail itself. The enquiry form is a **Netlify Form**. No Formspree, EmailJS, Resend, SMTP, or other mail API is used, and none should be added. No extra paid account is required.

## Public identity

| Audience | Address | Where it appears |
| --- | --- | --- |
| General enquiries | `hello@homemotionphysio.com.au` (`site.publicEmail`) | Contact form notification, footer, business card, privacy, FAQ, header Email action |
| Referrals / professionals | `referrals@homemotionphysio.com.au` (`site.referralEmail`) | For Referrers, referral sheet |

Do not show both addresses on every surface. Do not publish the admin mailbox.

## How an enquiry is delivered

```
Website form (name="enquiry")
  → Netlify Forms (included on the Netlify free plan)
  → email notification to hello@homemotionphysio.com.au
```

Jackson adds that notification in the Netlify dashboard after the first deploy: **Forms → enquiry → email notification**. The address is typed there. It is not an environment variable, and it is not stored in client code or GitHub.

Netlify stores the submission. The privacy draft says that storage may be outside Australia. This site does not keep its own copy and does not write the form to `localStorage`.

`mailto:hello@homemotionphysio.com.au` remains on the page as a secondary link. It opens the visitor’s own email app. It is not the form handler.

Referral email stays a `mailto:` to `referrals@`. There is no second form and no second provider.

## What the build does not use

Leave these unset. The Netlify form does not read them. Do not commit values.

- `ENQUIRY_NOTIFICATION_EMAIL`
- `REFERRAL_NOTIFICATION_EMAIL`
- `EMAIL_DELIVERY_READY`

`src/lib/email-delivery.ts` is still a non-sending stub. Do not turn it into an API client.

## Domain mail (Google Workspace)

Already in place, from the owner’s DNS records, as of about 4:55 AM AEST on 3 Oct 2026:

1. `homemotionphysio.com.au` is registered at VentraIP (expires 30 Sep 2027).
2. Google Workspace is active for the domain. `hello@` and `referrals@` are aliases on that user.
3. SPF `v=spf1 include:_spf.google.com ~all` is valid. DKIM signing is active. DMARC `p=none` is live.
4. The staging enquiry form’s notification to `hello@` arrived (not in Spam). See `docs/LAUNCH_STATUS.md`.

Still to do, outside this repo, and without changing website DNS:

1. Send one message to `hello@` and one to `referrals@` from an address outside the domain, and confirm both arrive.
2. Confirm a reply shows `hello@` or `referrals@` as From, matching the audience.
3. After monitoring, consider raising DMARC from `p=none` to `p=quarantine`. Do not commit keys or the report address.

Do not point the website domain at Netlify as part of this email work. See `docs/DEPLOYMENT.md`.
