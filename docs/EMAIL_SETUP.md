# Email setup

Public identities are on the draft site. Google Workspace is the mail host for `homemotionphysio.com.au` (MX `smtp.google.com`, SPF `include:_spf.google.com`). DKIM and DMARC are **not** set up yet. This website still does not send mail. Do not set `EMAIL_DELIVERY_READY` until a test message to each public address is confirmed.

## Public identity

| Audience | Address | Where it appears |
| --- | --- | --- |
| General enquiries | `hello@homemotionphysio.com.au` (`site.publicEmail`) | Contact, footer, business card, privacy, FAQ, header Email action |
| Referrals / professionals | `referrals@homemotionphysio.com.au` (`site.referralEmail`) | For Referrers, referral sheet |

Do not show both addresses on every surface.

## Intended routing (later)

```
Website enquiry
  → Home Motion enquiry backend (not implemented)
  → notification to ENQUIRY_NOTIFICATION_EMAIL (private inbox, env only)

Referral enquiry
  → Home Motion referral backend (not implemented)
  → notification to REFERRAL_NOTIFICATION_EMAIL (or the same private inbox)
```

The visitor still sees the public Home Motion addresses. The private inbox must never appear in HTML, client JavaScript, JSON-LD, or Git.

Reply-from (later, at the email provider):

- Replies to customers should appear as `hello@homemotionphysio.com.au`
- Replies to referrers should appear as `referrals@homemotionphysio.com.au`

## Domain / provider work

Already in place, from the owner’s DNS records:

1. `homemotionphysio.com.au` is registered at VentraIP (expires 30 Sep 2027).
2. Google Workspace is active for the domain.
3. SPF includes `_spf.google.com`.

Still to do, outside this repo:

1. Confirm mailboxes or aliases exist for `hello@` and `referrals@`, and that a test message arrives at each.
2. Confirm a reply shows that public address as From.
3. Add DKIM and DMARC. Do not commit the keys.
4. Only then set `EMAIL_DELIVERY_READY=true` in the **server** environment (never in Git) and add `ENQUIRY_NOTIFICATION_EMAIL` / `REFERRAL_NOTIFICATION_EMAIL`.

The website host is a separate choice. DNS still shows no website host. See `docs/DEPLOYMENT.md`.

Until step 5 is done:

- The website must not claim an enquiry was sent.
- Opening a visitor’s mail app (`mailto:`) only drafts a message **to** the public address from their own account. Delivery still depends on the mailbox existing.

## What this codebase already has

- `src/content/site.ts` — `publicEmail` and `referralEmail` (display source of truth).
- `src/lib/email-delivery.ts` — separates public identity from private notification env vars; `deliverEnquiry()` is a stub and does not send.
- `.env.example` — names of server env vars. No secrets.

## What this codebase must not do yet

- Configure DNS.
- Invent SMTP credentials.
- Commit `.env` or any private email.
- Send production email from `hello@` or `referrals@`.
