import assert from "node:assert/strict";
import test from "node:test";
import { PUBLIC_ORIGIN, STAGING_ORIGIN, resolveSiteOrigin } from "../scripts/site-origin.mjs";

const stagingBranch = "cursor/design-option-2-b759";

test("production context of the staging branch does not use the public domain while draft", () => {
  const origin = resolveSiteOrigin(
    {
      CONTEXT: "production",
      BRANCH: stagingBranch,
    },
    { draft: true },
  );
  assert.notEqual(origin, PUBLIC_ORIGIN);
  assert.equal(origin, STAGING_ORIGIN);
  assert.equal(origin.includes("homemotionphysio.com.au"), false);
});

test("explicit launch uses the public domain", () => {
  const origin = resolveSiteOrigin(
    {
      CONTEXT: "production",
      BRANCH: stagingBranch,
    },
    { draft: false },
  );
  assert.equal(origin, PUBLIC_ORIGIN);
});

test("PUBLIC_SITE_URL cannot select the public domain while the site is still a draft", () => {
  const origin = resolveSiteOrigin(
    {
      CONTEXT: "production",
      BRANCH: stagingBranch,
      PUBLIC_SITE_URL: PUBLIC_ORIGIN,
    },
    { draft: true },
  );
  assert.equal(origin, STAGING_ORIGIN);
});

test("production context prefers the stable site URL over the branch deploy URL", () => {
  const origin = resolveSiteOrigin(
    {
      CONTEXT: "production",
      BRANCH: stagingBranch,
      URL: "https://homemotion-staging.netlify.app",
      DEPLOY_PRIME_URL: "https://cursor-design-option-2-b759--homemotion-staging.netlify.app",
    },
    { draft: true },
  );
  assert.equal(origin, "https://homemotion-staging.netlify.app");
});

test("a draft deploy preview uses DEPLOY_PRIME_URL when one is present", () => {
  const netlify = "https://deploy-preview-4--homemotion-staging.netlify.app";
  const origin = resolveSiteOrigin(
    {
      CONTEXT: "deploy-preview",
      BRANCH: "pull/4/head",
      URL: STAGING_ORIGIN,
      DEPLOY_PRIME_URL: netlify,
      PUBLIC_SITE_URL: PUBLIC_ORIGIN,
    },
    { draft: true },
  );
  assert.equal(origin, netlify);
});

test("after launch, a deploy preview still uses the Netlify URL", () => {
  const netlify = "https://deploy-preview-4--homemotion-staging.netlify.app";
  const origin = resolveSiteOrigin(
    {
      CONTEXT: "deploy-preview",
      DEPLOY_PRIME_URL: `${netlify}/`,
    },
    { draft: false },
  );
  assert.equal(origin, netlify);
});
