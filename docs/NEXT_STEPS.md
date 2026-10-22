# Next steps — final independent review

Updated 22 October 2026. LAUNCH_STATUS.md and DEPLOYMENT.md are the active source
and launch runbooks; historical Phase 1/design-branch instructions are superseded.

1. Review the final remediation report and browser evidence for the four P0/P1
   fixes. Candidate is agent/HOME-002-about-enquiry; PR #10 stays OPEN into
   cto/home-motion-integration. Keep main untouched.
2. Have a fresh independent reviewer give GO/NO-GO. This remediation does not
   approve public launch, merge the PR, deploy or change accounts.
3. After independent GO, Jackson separately approves integration merge and Netlify
   production-source cutover. The working agent branch must never be permanent
   production.
4. ACCOUNT-SIDE VERIFICATION REQUIRED: actual Netlify source/deploy/settings,
   restricted Maps key/build variable, anonymous Forms/notification delivery,
   Workspace aliases and current domain/DNS/HTTPS.
5. Public primary domain/canonical is **https://homemotionphysio.com.au/** (apex);
   **www redirects to apex**.
6. Only after explicit launch approval: change the real draft switch, appropriate
   account access settings and deploy the reviewed integration source. Do not
   execute those operations in this remediation.

Privacy and disclaimer are already adopted in repository configuration. The site
is still draft/noindex. Current referral page is text-led concept A, with print
controls and no rendered QR. Current map is Google Maps: 8 main pins, 14 Nearby
enquiry links. The form's required fields are listed in DEPLOYMENT.md.

Performance/P2/P3, old assets and new designs remain outside this pass.
