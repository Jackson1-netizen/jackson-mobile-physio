/**
 * Canonical origin for a build.
 *
 * The public domain is used only when production is explicitly launched:
 * `site.draft` is false, and the Netlify context is not a deploy preview
 * or a branch deploy. While `site.draft` is true, PUBLIC_SITE_URL is ignored,
 * including a production-context build of cursor/design-option-2-b759.
 *
 * While the site is a draft and CONTEXT is production, the origin is URL
 * (Netlify's main site URL), then https://homemotion-staging.netlify.app.
 * DEPLOY_PRIME_URL is not used there: on that deploy it is the branch hostname.
 * Deploy previews and branch deploys use DEPLOY_PRIME_URL, then URL, then the
 * staging origin. This does not attach a domain or change DNS.
 */
import { readFileSync } from "node:fs";
import { readSiteDraft } from "./site-draft.mjs";

export { readSiteDraft };

export const STAGING_ORIGIN = "https://homemotion-staging.netlify.app";
export const PUBLIC_ORIGIN = "https://homemotionphysio.com.au";

function strip(value) {
  return String(value || "").trim().replace(/\/$/, "");
}

function draftOrigin(env) {
  const context = env.CONTEXT || "";
  const previewContext = context === "deploy-preview" || context === "branch-deploy";
  if (previewContext) {
    return strip(env.DEPLOY_PRIME_URL) || strip(env.URL) || STAGING_ORIGIN;
  }
  return strip(env.URL) || STAGING_ORIGIN;
}

/**
 * @param {NodeJS.ProcessEnv} [env]
 * @param {{ draft?: boolean }} [options] Pass `draft` in tests. Otherwise the file is read.
 */
export function resolveSiteOrigin(env = process.env, options = {}) {
  const draft =
    options.draft !== undefined
      ? options.draft
      : readSiteDraft(readFileSync(new URL("../src/content/site.ts", import.meta.url), "utf8"));
  const context = env.CONTEXT || "";
  const previewContext = context === "deploy-preview" || context === "branch-deploy";
  const launched = draft === false && !previewContext;

  if (!launched) {
    return draftOrigin(env);
  }

  return strip(env.PUBLIC_SITE_URL) || PUBLIC_ORIGIN;
}
