# Email setup

Public identities are on the draft site. Google Workspace is the mail host for `homemotionphysio.com.au` (MX `smtp.google.com`, SPF `include:_spf.google.com`). DKIM and DMARC are **not** set up yet.

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

Already in place, from the owner’s DNS records:

1. `homemotionphysio.com.au` is registered at VentraIP (expires 30 Sep 2027).
2. Google Workspace is active for the domain.
3. SPF includes `_spf.google.com`.

Still to do, outside this repo, and without changing website DNS:

1. Confirm mailboxes or aliases exist for `hello@` and `referrals@`.
2. After the Netlify form notification is saved, send one test enquiry and confirm it arrives at `hello@`.
3. Confirm a reply shows `hello@` or `referrals@` as From, matching the audience.
4. Add DKIM and DMARC when Jackson is ready. Do not commit the keys.

Do not point the website domain at Netlify as part of this email work. See `docs/DEPLOYMENT.md`.
