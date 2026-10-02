/**
 * Writes public/_headers before `astro build` copies it into dist/.
 *
 * X-Robots-Tag: noindex, nofollow is added when either is true:
 * - site.draft is true (every context, including production of the staging branch), or
 * - Netlify CONTEXT is deploy-preview or branch-deploy.
 *
 * While site.draft is true, the staging production deploy and its pull-request
 * previews stay noindex. A later production launch can omit this header only
 * after site.draft is false, and only for a production context. This does not
 * change DNS.
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
const previewContext = context === "deploy-preview" || context === "branch-deploy";
const noindex = draft || previewContext;

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: blob: https://server.arcgisonline.com",
  "media-src 'self'",
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
