/**
 * Writes public/_headers before `astro build` copies it into dist/.
 *
 * X-Robots-Tag: noindex, nofollow is added when any of these is true:
 * - site.draft is true (every build, including a production context), or
 * - Netlify CONTEXT is deploy-preview or branch-deploy, or
 * - BRANCH is cursor/design-option-2-b759 (that branch deploy stays non-indexable).
 *
 * A production deploy omits the header only when site.draft is false and the
 * deploy is not a preview or that branch. This does not change DNS.
 */
import { readFileSync, writeFileSync } from "node:fs";

const source = readFileSync(new URL("../src/content/site.ts", import.meta.url), "utf8");
const draftMatch = source.match(/\bdraft:\s*(true|false)/);
if (!draftMatch) {
  console.error("Could not read site.draft from src/content/site.ts");
  process.exit(1);
}

const draft = draftMatch[1] === "true";
const context = process.env.CONTEXT || "";
const branch = process.env.BRANCH || "";
const previewBranch = branch === "cursor/design-option-2-b759";
const previewContext = context === "deploy-preview" || context === "branch-deploy" || previewBranch;
const noindex = draft || previewContext;

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://server.arcgisonline.com https://images.pexels.com",
  "media-src 'self' https://videos.pexels.com",
  "connect-src 'self' https://server.arcgisonline.com",
  "upgrade-insecure-requests",
].join("; ");

const lines = [
  "/*",
  "  X-Frame-Options: DENY",
  "  X-Content-Type-Options: nosniff",
  "  Referrer-Policy: strict-origin-when-cross-origin",
  "  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()",
  "  Strict-Transport-Security: max-age=31536000; includeSubDomains",
  `  Content-Security-Policy: ${csp}`,
];

if (noindex) {
  lines.push("  X-Robots-Tag: noindex, nofollow");
}

lines.push("");
writeFileSync(new URL("../public/_headers", import.meta.url), `${lines.join("\n")}\n`);
console.log(
  `Netlify headers: draft=${draft} context=${context || "local"} X-Robots-Tag=${noindex ? "noindex, nofollow" : "omitted"}`,
);
