# Email setup (after domain mail is purchased)

Public identities are already on the draft site. They are **not** live inboxes until the domain email service is configured and verified. Do not treat published addresses as working delivery.

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

## Domain / provider work (not done in this repo)

1. Buy or connect `homemotionphysio.com.au`.
2. Create mailboxes (or aliases) for `hello@` and `referrals@`.
3. Forward both to Jackson’s private inbox **at the provider**, or keep them as mailboxes and add SMTP send.
4. Add SPF, DKIM, and DMARC for the domain.
5. Confirm a test message to each public address arrives, and that a reply shows the public From address.
6. Only then set `EMAIL_DELIVERY_READY=true` in the **server** environment (never in Git) and add `ENQUIRY_NOTIFICATION_EMAIL` / `REFERRAL_NOTIFICATION_EMAIL`.

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
