# Legal page adoption and launch indexing

Updated 22 October 2026. Filename retained for existing links.

Privacy and disclaimer are **adopted in repository configuration**:
privacyAdopted = true and disclaimerAdopted = true in src/content/site.ts.
Privacy displays **21 October 2026**, including Google Maps disclosure;
disclaimer displays **4 October 2026**. The site-wide draft switch remains true,
so both stay noindex until an approved public launch. An isolated live simulation
must include them in the sitemap and remove their draft/adoption warnings.

Adoption records owner/configuration approval, not independent legal certification
or legal advice. This technical pass does not revise adopted legal wording.

Current facts relevant to the pages:

- Business identity and ABN come from central config. AHPRA registration is stated
  in words; practitioner number/expiry are not rendered; placeholders stay hidden.
- First-contact form requires name, role, email, phone, suburb, service, funding,
  preferred contact and short message. Language/NDIS checkbox are optional.
  It asks people not to send clinical details or attachments.
- Netlify Forms handles submissions; public mail addresses are hello@ and
  referrals@ at the business domain. No new mail API.
- Google Maps is the active provider, not Esri; no device geolocation is used.
- NDIS plan-managed/self-managed enquiries welcome; no registered-provider claim
  or funding guarantee.

**ACCOUNT-SIDE VERIFICATION REQUIRED:** current third-party processing/account
configuration, hosted Forms delivery, Workspace routing, domain/hosting state and
subsequent professional/owner approvals are not proved by repository flags.
See DEPLOYMENT.md and the final independent review.
