# Referral page — approved concept A

The `/referral/` page follows Jackson's selected concept A: a text-led green hero, four service facts, three referral steps, support/funding and first-enquiry panels, and a green contact/provider section. It uses the existing Home Motion header and a compact local footer. Other pages and shared header styles are unchanged.

## Content and actions

- English, Simplified Chinese and stored Traditional Chinese preferences are supported through `referralPage.designA` in `src/content/i18n.ts`.
- Public phone, referral email, business name, ABN and public domain come from `src/content/site.ts`.
- “Make a referral enquiry” opens the existing `/enquiry/` form. It does not claim to be a separate clinical referral portal or request medical attachments.
- Phone links use `tel:`; the referral email opens the existing referral `mailto:` link.
- The current concept A page renders no QR code. `site.referralSheetUrl` retains
  the apex `/referral/` URL for future collateral; that is not a rendered QR.
- Both print buttons invoke the browser's print dialog. The page also supports Ctrl+P / Cmd+P; with JavaScript disabled, the page explains that browser shortcut instead of displaying inactive print buttons.

## Print and verification

- Print styles are A4 with 12 mm margins, compact typography and white backgrounds. Navigation, action buttons and the draft banner are hidden only in print; contact details and the substantive referral information remain visible.
- Local Chrome output was checked in all three locales: each produced one A4 page. Other browsers/printer settings may paginate differently.
- Local browser QA covered six widths from 320 to 1440 pixels in all three locales, WCAG A/AA checks, keyboard/menu behavior, consultation navigation, no-JavaScript fallback and both print controls.
- The original 320-pixel referral-sheet overflow is eliminated by this page layout.
- The launch-build regression checks still verify registration and the canonical origin, and now verify the new enquiry and print controls. Temporary test copies exclude all `.env` files, including local API keys.

The existing draft/noindex switch, canonical/origin logic, form handler and hosting configuration remain unchanged. This change does not authorize production cutover.
