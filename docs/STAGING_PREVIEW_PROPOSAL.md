# Non-production preview configuration — current proposal

Updated 22 October 2026. See DEPLOYMENT.md for the production source gate.
This document authorizes no dashboard or Google Cloud change.

## Current evidence and boundaries

Candidate: agent/HOME-002-about-enquiry; PR #10 remains OPEN into
cto/home-motion-integration. Future production source is integration after approved
review/merge. The agent branch is not a permanent production source.

The historical old Netlify production-source setting is not an instruction to
retain the old design branch for future production. **ACCOUNT-SIDE VERIFICATION
REQUIRED** for today's actual dashboard configuration.

A manual, protected alias was created on 21 October from 88e683e at
https://home-002-review--homemotion-staging.netlify.app.
It is not auto-updated by subsequent pushes and is not today's candidate.
Do not deploy or change its access protection in remediation.

## Prepared continuous non-production behaviour

- Gate opt-in HOME_MOTION_STAGING_PREVIEWS=enabled, non-production contexts only.
- Eligible branch-deploy: agent/HOME-002-about-enquiry.
- Eligible PR preview: verified numeric REVIEW_ID, same-repository agent head into
  integration. No opt-in means these continuous previews are skipped.
- Legacy design PR previews retain their prior non-production behaviour.
- Production accepts only integration, independently of the preview opt-in.
  Main, agent and legacy design production contexts are rejected.
- GitHub lookup failure and unrelated branches fail closed.

## Settings to approve separately, if continuous previews are wanted

**ACCOUNT-SIDE VERIFICATION REQUIRED** for existing settings before any change.

1. Check Netlify branch/Deploy Preview eligibility for the agent branch and PR #10
   base. The ignore script alone cannot enable a dashboard-ineligible preview.
2. Add the non-secret opt-in and PUBLIC_GOOGLE_MAPS_API_KEY in the required
   non-production build contexts only. Jackson enters the key directly; no values
   in source, PRs, docs, logs or chat. Rebuild after changing variables.
3. Verify the real normalized preview hostname before adding its exact origin to
   the existing Maps key's HTTP-referrer restrictions. No broad wildcard. Keep
   Maps JavaScript API as the only API restriction.
4. Preserve Visitor Access/noindex and check the exact approved candidate, real
   basemap/attribution, primary-only pins, mobile controls, served CSP and Maps
   authentication errors on that origin. Local dev does not apply Netlify headers.

Expected continuous URLs require confirmation; they are not claimed to exist:
agent-home-002-about-enquiry--homemotion-staging.netlify.app and
deploy-preview-10--homemotion-staging.netlify.app.

No Netlify, Cloud, DNS, production environment or Workspace changes are part of
the current remediation. A preview does not authorize public launch.
