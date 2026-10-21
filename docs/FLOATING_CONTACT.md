# Floating contact entry — approved option A

The approved option A replaces the repeated full-width enquiry banner with one
small white contact card at the bottom right. It uses the existing brand fonts,
sage mail icon and orange circular arrow. English text is **Connect with us** /
**Open enquiry form**, with matching Simplified and Traditional Chinese copy.

## Behaviour

- `BaseLayout.astro` renders one `FloatingContact.astro` outside page content so
  it stays fixed to the viewport without inheriting section positioning.
- The entire card link opens `/enquiry/#enquiry-form`. This is the existing
  Netlify enquiry form, not a chat service or an additional form.
- No card is rendered on `/enquiry/` or `/enquiry-received/`.
- On the homepage it hides while the Contact section is visible. On all pages
  it hides while the footer is visible or the navigation menu is open.
- A focused card stays available while scrolling so keyboard focus is not lost.
- The close button dismisses it for the current page only; it sets no cookie or
  storage value. Existing header and contact links remain available.
- The old mobile contact bars are no longer rendered, avoiding duplicate fixed
  controls. Contact/footer spacing reserved for those bars is no longer applied.
- Without JavaScript, the enquiry link still works and the inactive close button
  is hidden. Print styles hide the card.

The former banner and mobile bar source components remain unused; approved image
assets are retained. Existing form fields, validation, POST handling, SEO/draft
settings and the production deployment configuration are unchanged.

## Verification

- Astro check and static build pass, including the Netlify form/noindex check.
- All 21 existing automated tests pass.
- Browser checks cover English, Simplified and Traditional Chinese at 1440,
  1024, 390 and 320 CSS pixels: no horizontal overflow or WCAG A/AA violations
  in the contact card.
- Scroll positioning, dismissal, menu/Contact/footer visibility, keyboard link
  activation, print hiding and JavaScript-disabled navigation were checked.
- Areas, suburb, referral, privacy and disclaimer routes have one card each.
- Following the card lands at the existing form below the sticky header; the
  name/email/phone/suburb required fields and Netlify honeypot remain present.
- Browser verification does not submit a live enquiry.

This change does not authorize production launch, domain changes or merging
into `main`.
