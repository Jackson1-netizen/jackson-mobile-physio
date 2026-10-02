/**
 * Canonical origin for a build.
 *
 * Preview and branch deploys use the URL Netlify assigns (DEPLOY_PRIME_URL or URL).
 * They do not use the public domain. PUBLIC_SITE_URL is optional and is only
 * read outside those contexts. No value is committed.
 */
const PREVIEW_BRANCH = "cursor/design-option-2-b759";

export function resolveSiteOrigin(env = process.env) {
  const context = env.CONTEXT || "";
  const branch = env.BRANCH || "";
  const preview =
    context === "deploy-preview" ||
    context === "branch-deploy" ||
    branch === PREVIEW_BRANCH;
  if (preview) {
    const netlifyOrigin = (env.DEPLOY_PRIME_URL || env.URL || "").trim();
    if (netlifyOrigin) return netlifyOrigin.replace(/\/$/, "");
  }
  const explicit = (env.PUBLIC_SITE_URL || "").trim();
  if (explicit) return explicit.replace(/\/$/, "");
  return "https://homemotionphysio.com.au";
}
