/**
 * Netlify ignore command.
 * Exit 0 skips the build. Exit 1 lets it run.
 *
 * Build only:
 * - CONTEXT=production and BRANCH=cursor/design-option-2-b759
 *   (Netlify's staging production branch; no custom domain)
 * - CONTEXT=deploy-preview when the pull request targets that same branch
 *
 * main and every other branch are skipped. Branch deploys are skipped.
 * This does not merge or attach a custom domain.
 *
 * On a deploy preview, Netlify's BRANCH is often pull/<id>/head, not the
 * base branch. REVIEW_ID is the pull request number. The base branch is read
 * from the public GitHub API. No token is used. If that lookup fails, the
 * preview is skipped.
 */
import { pathToFileURL } from "node:url";

const STAGING_BRANCH = "cursor/design-option-2-b759";

function branchName(value) {
  return String(value || "").replace(/^refs\/heads\//, "");
}

function repoSlug(env) {
  const raw = env.REPOSITORY_URL || "https://github.com/Jackson1-netizen/jackson-mobile-physio";
  const match = String(raw).match(/github\.com[:/]([^/]+\/[^/.]+)/);
  return match ? match[1] : "Jackson1-netizen/jackson-mobile-physio";
}

export async function decide(env = process.env, fetchImpl = globalThis.fetch) {
  const context = env.CONTEXT || "";
  const branch = branchName(env.BRANCH);

  if (context === "production" && branch === STAGING_BRANCH) {
    return { allow: true, reason: "production deploy of the staging branch" };
  }

  if (context === "deploy-preview" && branch === STAGING_BRANCH) {
    return { allow: true, reason: "deploy preview checked out as the staging branch" };
  }

  if (context !== "deploy-preview") {
    return {
      allow: false,
      reason: `skipped: context=${context || "unset"} branch=${branch || "unset"}`,
    };
  }

  const reviewId = env.REVIEW_ID || "";
  if (!/^\d+$/.test(reviewId)) {
    return { allow: false, reason: "skipped: deploy preview without a numeric REVIEW_ID" };
  }

  const url = `https://api.github.com/repos/${repoSlug(env)}/pulls/${reviewId}`;
  let base = "";
  try {
    const response = await fetchImpl(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "home-motion-netlify-ignore",
      },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) {
      return { allow: false, reason: `skipped: GitHub pull request lookup returned ${response.status}` };
    }
    const data = await response.json();
    base = typeof data?.base?.ref === "string" ? data.base.ref : "";
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { allow: false, reason: `skipped: could not read the pull request base (${message})` };
  }

  if (base === STAGING_BRANCH) {
    return { allow: true, reason: `deploy preview of pull request #${reviewId} into ${STAGING_BRANCH}` };
  }

  return {
    allow: false,
    reason: `skipped: pull request #${reviewId} targets ${base || "an unknown branch"}`,
  };
}

const invokedDirectly =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (invokedDirectly) {
  const result = await decide();
  console.log(result.allow ? `Netlify build allowed: ${result.reason}` : `Netlify build ignored: ${result.reason}`);
  process.exit(result.allow ? 1 : 0);
}
