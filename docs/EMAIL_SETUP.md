# Email setup

> 22 October 2026: ACCOUNT-SIDE VERIFICATION REQUIRED for current Workspace, DNS and Netlify notification settings/delivery. Dated tests below are historical; current form fields and release instructions are in DEPLOYMENT.md. No account changes in this remediation.

Public identities are on the draft site. Google Workspace is the mail host for `homemotionphysio.com.au` (MX `smtp.google.com`). As of about 4:55 AM AEST on 3 Oct 2026, SPF `v=spf1 include:_spf.google.com ~all` is valid, DKIM signing is active (selector `google`, `google._domainkey` resolves, admin status “Authenticating email with DKIM”), and DMARC `v=DMARC1; p=none` is live. The aggregate report address is not written in this repo.

The website does not send mail itself. The enquiry and referral forms are **Netlify Forms**. No Formspree, EmailJS, Resend, SMTP, or other mail API is used, and none should be added. No additional mail provider is required; the account's current Netlify Forms allowance and usage still need checking before deployment.

## Public identity

| Audience | Address | Where it appears |
| --- | --- | --- |
| General enquiries | `hello@homemotionphysio.com.au` (`site.publicEmail`) | Contact form notification, footer, business card, privacy, FAQ, header Email action |
| Referrals / professionals | `referrals@homemotionphysio.com.au` (`site.referralEmail`) | Referral form notification, referral page, printable referral sheet |

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

## How a referral or care plan update is delivered

```
/referral/ form (name="referral", referral-type="new" or "update")
  → Netlify Forms stores the submission and any uploaded document
  → configured email notification to referrals@homemotionphysio.com.au
  → visitor continues to /referral-received/
```

Both modes use the same `referral` form. The existing `enquiry` notification remains separate and goes to `hello@homemotionphysio.com.au`. The referral page also retains a `mailto:` fallback to `site.referralEmail`; that link opens the visitor's email app and does not submit the form.

The repository cannot configure dashboard notifications or prove inbox delivery. Jackson must complete these steps on the approved Netlify deployment:

1. Open the correct Netlify project and confirm that form detection is enabled under **Forms**. After the manager deploys the reviewed build, open **Forms → referral**. Confirm that a form named exactly `referral` exists; do not substitute `enquiry`.
2. Open **Forms → referral → Notifications → Add notification → Email notification**. If notifications are reached through the project's **Configuration → Notifications → Form submission notifications**, select the `referral` form there. Set **Email to notify** to `referrals@homemotionphysio.com.au`, the public address in `src/content/site.ts`.
3. Use a subject such as **Home Motion — Referral / care plan update**. Keep the subject free of participant names, dates of birth and other personal details. Save the notification. Leave the existing enquiry notification in place and check that it still uses `hello@homemotionphysio.com.au`.
4. Check the notification's actual sender in an approved synthetic test. In the receiving Google Workspace account, inspect Inbox, Spam and any forwarding/filter rules. If a legitimate notification is filtered, mark it **Not spam** and create a narrowly scoped filter for the verified sender and referral subject. Do not disable spam filtering generally.
5. In **Forms → referral**, check both **Verified submissions** and **Spam submissions**. The hidden `bot-field` must remain empty in normal use. Move a legitimate synthetic test out of spam if necessary; do not remove the honeypot to force delivery.
6. Check the account's Forms allowance and current upload limits. Netlify's total form-request limit is **8 MB**, including fields and multipart overhead. This form accepts optional documents with a combined client limit of **7 MiB** (7 × 1024 × 1024 bytes; displayed as **7 MB** in the form) to leave room for the rest of the request. Native POST still relies on Netlify's limit; a client-side limit is not a server-side guarantee. Do not use real clinical documents for testing.
7. Run the referral delivery checklist below. A redirect alone does not prove that a notification arrived.

### Referral delivery checklist — Jackson, on the hosted candidate

- Submit a synthetic **New referral** with the honeypot empty and no file. Confirm one stored `referral` record with `referral-type=new`, all expected fields, redirect to `/referral-received/`, and an email received at `referrals@homemotionphysio.com.au`.
- Submit a synthetic **Update referral / care plan**, including update type, applicable funding change, effective date and a short non-clinical note. Confirm `referral-type=update` on the same form and that inactive new-referral fields do not block submission.
- Repeat with one and then several small harmless files. Confirm uploaded files can be opened from the authenticated Netlify submission, and that notification recipients can find the submission. Do not assume that Netlify embeds the files themselves as email attachments.
- Check required fields, invalid email, invalid Australian phone and oversized-file errors. No submission should be created by client-side validation failures.
- Check both modes with EN/中文. With JavaScript enabled but AJAX unavailable, either selected mode falls back to native multipart POST. With JavaScript completely disabled, test the initial new-referral form's native POST; update requests use the displayed phone/email fallback in that case.
- Use the browser's offline/network-failure control for an AJAX submission. Confirm the page displays a failure state, preserves entered data and offers the phone and referral-email fallback without displaying success.
- Check Inbox and Spam, verify that the submission appears under the correct form, reply using the intended public identity, and remove synthetic records/files after testing according to the practice's retention policy.

The form does not write patient details into URLs, browser storage or a repository database. Netlify holds submissions and uploads, and Google Workspace holds notification mail; access and retention are managed in those accounts. See `REFERRAL_FLOW.md` for the field list and test boundaries. The public privacy wording and `/privacy/` link remain in place.

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
