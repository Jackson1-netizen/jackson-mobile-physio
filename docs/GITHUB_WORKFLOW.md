# GitHub workflow — current candidate

Updated 22 October 2026. Repository: Jackson1-netizen/jackson-mobile-physio.
Verify the actual remote URL; do not assume every machine uses the same remote name.

## Session start

- Check working tree cleanliness and fetch agent/HOME-002-about-enquiry.
- Work on that existing candidate branch; integrate upstream with a safe
  fast-forward when clean. Preserve others' changes; never force-push.
- PR #10 stays OPEN into cto/home-motion-integration. The quality-gate workflow
  tests pull requests into that branch.
- Do not use main or cursor/design-option-2-b759 as the current candidate.

## Delivery

Run npm test, npm run check and npm run build, plus required browser checks.
Commit and push only the candidate branch after checking for new remote commits.
Never commit .env files, tokens, API-key values, patient data or private inboxes.

Intended later flow: candidate → reviewed PR #10 → integration → production.
This remediation does not merge PR #10, push to integration, deploy, change Netlify
production source, connect domains or change DNS. Those require the independent
GO/NO-GO review and Jackson's separate launch authorization.

See DEPLOYMENT.md and LAUNCH_STATUS.md for current release controls.
