# HOME-002 stable preview — proposal awaiting Jackson's approval

Prepared 2026-10-21 on `agent/HOME-002-about-enquiry`, starting from `22fe1be`
(which includes `c2d7600`). No Netlify/Google Cloud setting has been changed.
No publish, merge, DNS operation, production-branch change, or indexing change is
authorized by this proposal. The following is a reviewable set of proposed changes.

## Confirmed from code / GitHub

- PR #10 is open, head `agent/HOME-002-about-enquiry`, base
  `cto/home-motion-integration`. It does not target the existing Netlify staging
  production branch `cursor/design-option-2-b759`.
- The current map only uses Maps JavaScript API: native raster `Map`, `OverlayView`,
  `LatLng` and `LatLngBounds`. There is no Places/Geocoding/Routes/Directions request,
  `libraries=` SDK parameter, or Map ID requirement.
- The only map credential input is `import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY`.
  Astro/Vite embeds its value at build time; changing it requires a rebuild.
- Jackson confirmed **8 primary map areas**: Box Hill, Doncaster, Blackburn,
  Ringwood, Burwood, Glen Waverley, Mitcham and Nunawading. Balwyn, Forest Hill and
  Caulfield move to the end of the existing Nearby enquiry list, retaining all
  22 service areas. Only those 8 primary areas produce markers, bounds and clusters;
  14 Nearby entries remain enquiry links below the map and never add or pan a marker.
- The Cloud project's configuration and earlier real-map pass are supplied by
  Jackson's handoff, not independently inspected in this session. This checkout
  did not initially contain a local key; Jackson later created `.env.local` for
  testing at port 4721. Never paste its value into chat or Git.

## Prepared code: disabled until approved

`scripts/netlify-ignore-build.mjs` retains the existing staging behavior. The new
non-production path additionally requires the **non-secret** build variable
`HOME_MOTION_STAGING_PREVIEWS=enabled`:

- `branch-deploy`: only `agent/HOME-002-about-enquiry` is allowed.
- `deploy-preview`: verify the numeric PR against GitHub and require that exact
  head branch, the same repository, and base `cto/home-motion-integration`.
- `production`: HOME-002 remains rejected, even with the opt-in variable set.
- `main`, unrelated heads and forks do not become allowed by the new path.
- GitHub lookup failure or missing opt-in fails closed. No key is needed by the
  ignore script. It does not call Netlify or Google Cloud.

The old production branch's existing allowed behavior is unchanged. The opt-in
defaults off, so pushing this code alone does not authorize new previews.

## Exact proposed Netlify settings

Site: `homemotion-staging`. Use Site/Project configuration → Build & deploy →
Continuous deployment → Branches and deploy contexts (labels may vary by UI).

1. **Production branch:** leave `cursor/design-option-2-b759` unchanged.
2. **Branch deploys:** choose individual branches, not all branches; add:
   - `agent/HOME-002-about-enquiry` for the stable working-branch preview.
   - `cto/home-motion-integration` to make PR #10's base eligible for a Deploy
     Preview. The prepared ignore script does not allow an integration branch
     deploy itself. Its existing branch code must also remain ignored.
3. **Deploy Previews:** enable previews for eligible pull requests, including
   PR #10. An ignore-script change alone cannot make an ineligible PR base eligible.
4. **Site configuration → Environment variables:** add both entries with the
   **Builds** scope and values limited to **Branch deploys** and **Deploy Previews**:
   - `PUBLIC_GOOGLE_MAPS_API_KEY`: Jackson enters the existing restricted key in
     the dashboard. No value is stored in this proposal or in `netlify.toml`.
   - `HOME_MOTION_STAGING_PREVIEWS`: value `enabled` (not a credential).
   - No production-context value; do not select an all-contexts value by accident.
5. Keep `npm run build`, publish `dist`, Node 22, and the repository ignore command
   unchanged. Keep Visitor Access/team login on for these preview URLs.
6. **Only after approval and referrer setup**, trigger a fresh non-production build
   from the latest HOME-002 commit. Do not publish it as the site's production deploy.

Expected stable URLs (not yet created or verified here):

- Working branch: `https://agent-home-002-about-enquiry--homemotion-staging.netlify.app`
  (confirm Netlify's normalized branch hostname / `DEPLOY_PRIME_URL` after creation).
- PR #10: `https://deploy-preview-10--homemotion-staging.netlify.app`.

The root `https://homemotion-staging.netlify.app` still serves the existing staging
production branch. This proposal deliberately does not put HOME-002 at that root.

## Exact proposed Google Cloud restriction additions

Edit the **existing** Maps JavaScript key in `home-motion-website`; do not create
more APIs or replace existing restrictions. Keep Maps JavaScript API as the only
API restriction. Add these approved preview origins as individual website entries:

```
https://agent-home-002-about-enquiry--homemotion-staging.netlify.app
https://deploy-preview-10--homemotion-staging.netlify.app
```

Confirm the branch hostname before saving it if Netlify normalizes it differently.
These are origin-only entries, compatible with the loader's
`auth_referrer_policy=origin`; they permit that host's pages without allowing all
Netlify sites. For future PR N, add its exact `deploy-preview-N--homemotion-staging`
hostname as another entry. Do not use a bare `*`, `https://*.netlify.app`, or an
unverified partial-wildcard deploy-preview hostname.

The root staging origin `https://homemotion-staging.netlify.app` only needs adding
if Jackson separately approves and uses a map-enabled build at that root. It is
not required for this branch/PR proposal. Existing approved localhost and business
domain entries remain unchanged. The local test origin remains port **4721**.

## CSP review and remaining staging checks

The header generator already allows the loader's `maps.googleapis.com` and
`maps.gstatic.com` scripts, Google Maps image/connect domains, Google font/style
sources, Google frames and blob workers. Its existing `unsafe-eval` allowance is
retained for Maps JS. No broader CSP permission was added for this change.

After Jackson approves the settings and a new protected preview is built:

- Authenticate through Visitor Access and confirm the deploy SHA and actual origin.
- Confirm a real Google basemap loads on `/` and `/areas/`, with Google logo and
  attribution visible and unchanged. Confirm `data-map-state=ready`.
- Confirm no CSP violations in browser console/network against the actual Netlify
  response header, no `RefererNotAllowedMapError`, no authentication/billing/API
  errors, and no blocked map image/script/font/worker requests. Never copy key-bearing
  network URLs into reports. Record only error names and redacted origins.
- Verify primary-only pins, selection, panning, bounds/cluster reset and brief pin
  entrance; no Nearby marker, including after clicking a Nearby enquiry link.
- Verify 390px mobile, keyboard navigation, Chinese/English controls, reduced motion,
  and the two-slide hero's 10-second cycle and pause/manual controls.
- Verify HTML meta robots, `robots.txt`, and `X-Robots-Tag` stay noindex, Visitor
  Access remains enabled, and the production branch/domain settings did not change.
- Confirm the build used preview/branch values rather than production values.

A no-key fallback or test SDK does not prove the real Google basemap or API
restrictions passed. Local Astro dev does not apply Netlify's `_headers`.

### Local real-map result after Jackson supplied `.env.local`

At `http://127.0.0.1:4721`, the real Google SDK/basemap passed on the desktop home
page, desktop `/areas/`, and 390px home page: state `ready`, all 8 primary marker
inputs, 14 Nearby enquiry links, Google logo present, selection/reset working,
and zero captured console/page errors. No additional Places/Geocoding/Routes/
Directions endpoints were requested. The check recorded only provider hostnames
and paths, never API-key query values. All remote Netlify/header checks above
remain pending approval and an actual protected staging build.

## Sources used for this proposal

Checks completed before this handoff: Astro check (0 errors/warnings), production
build with draft/form assertions, all 21 regression tests, browser-tested two-scene
timing/manual/pause/reduced-motion behavior, and SDK-test-double checks on `/` and
`/areas/` showing primary-only marker inputs and Nearby enquiry links. The SDK
test double is explicitly not a real Google basemap or key/CSP validation.

- [Netlify Deploy Previews: base-branch eligibility and stable PR URLs](https://docs.netlify.com/deploy/deploy-types/deploy-previews/)
- [Netlify branch deploys: explicit branches and stable branch URLs](https://docs.netlify.com/deploy/deploy-types/branch-deploys/)
- [Netlify environment-variable contexts and scopes](https://docs.netlify.com/build/environment-variables/overview/)
- [Netlify ignore-build exit codes](https://docs.netlify.com/build/configure-builds/ignore-builds/)
- [Google Maps JS loading and origin referrer policy](https://developers.google.com/maps/documentation/javascript/load-maps-js-api)
- [Google Maps CSP guidance](https://developers.google.com/maps/documentation/javascript/content-security-policy)
