/**
 * Canonical origin for a build.
 *
 * The public domain is used only when production is explicitly launched:
 * `site.draft` is false, and the Netlify context is not a deploy preview
 * or a branch deploy. While `site.draft` is true, PUBLIC_SITE_URL is ignored,
 * including a production-context build of cursor/design-option-2-b759.
 *
 * Staging and previews use DEPLOY_PRIME_URL, then URL, then
 * https://homemotion-staging.netlify.app. This does not attach a domain or change DNS.
 */
import { readFileSync } from "node:fs";

export const STAGING_ORIGIN = "https://homemotion-staging.netlify.app";
export const PUBLIC_ORIGIN = "https://homemotionphysio.com.au";

export function readSiteDraft(source) {
  const match = String(source).match(/\bdraft:\s*(true|false)/);
  if (!match) {
    throw new Error("Could not read site.draft from src/content/site.ts");
  }
  return match[1] === "true";
}

function strip(value) {
  return String(value || "").trim().replace(/\/$/, "");
}

function netlifyOrigin(env) {
  return strip(env.DEPLOY_PRIME_URL) || strip(env.URL);
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
    return netlifyOrigin(env) || STAGING_ORIGIN;
  }

  return strip(env.PUBLIC_SITE_URL) || PUBLIC_ORIGIN;
}
