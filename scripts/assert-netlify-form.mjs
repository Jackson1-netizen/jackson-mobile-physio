/**
 * Fails the build if either enquiry or referral would not be detected as a Netlify Form.
 * Indexing checks follow site.draft: noindex while drafting, indexable after launch.
 */
import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { readSiteDraft } from "./site-draft.mjs";

export { readSiteDraft };

function formErrors(html) {
  const errors = [];
  const formTag = html.match(/<form\b[^>]*>/i)?.[0] ?? "";
  if (!formTag.includes('name="enquiry"')) errors.push('Built HTML has no <form name="enquiry">.');
  if (!/\snetlify(?:=|"|\s|>)/.test(formTag) && !formTag.includes('data-netlify="true"')) {
    errors.push("Built enquiry form is missing the Netlify form attribute.");
  }
  if (!formTag.includes('data-netlify="true"')) {
    errors.push('Built enquiry form is missing data-netlify="true".');
  }
  if (!html.includes('name="form-name"') || !html.includes('value="enquiry"')) {
    errors.push("Built HTML is missing the hidden form-name field Netlify needs.");
  }
  for (const field of ["bot-field", "name", "phone", "email", "suburb", "language", "ndis", "message"]) {
    if (!html.includes(`name="${field}"`)) errors.push(`Built enquiry form is missing field "${field}".`);
  }
  return errors;
}

/** Read HTML attributes without accepting an attribute value from another element. */
function attribute(tag, name) {
  const match = tag.match(new RegExp(`(?:\\s)${name}(?:\\s*=\\s*(?:"([^"<>]*)"|'([^'<>]*)'|([^\\s<>]+)))?(?=\\s|/?>)`, "i"));
  return match ? (match[1] ?? match[2] ?? match[3] ?? "") : null;
}

export const referralFields = [
  "bot-field", "referral-type", "referrer_role", "referrer_name", "referrer_organisation",
  "referrer_phone", "referrer_email", "participant_name", "participant_gender", "participant_dob",
  "participant_phone", "participant_email", "participant_address", "participant_suburb",
  "participant_state", "participant_postcode", "funding_type", "risks", "upload", "consent",
  "update_type", "new_funding_type", "effective_date", "update_notes",
];

/** Check the actual prerendered form, including fields needed after the update toggle. */
export function assertReferralForm({ html, receivedHtml }) {
  const errors = [];
  const form = [...html.matchAll(/<form\b[^>]*>[\s\S]*?<\/form\s*>/gi)]
    .find((match) => attribute(match[0].match(/<form\b[^>]*>/i)?.[0] ?? "", "name") === "referral")?.[0] ?? "";
  const formTag = form.match(/<form\b[^>]*>/i)?.[0] ?? "";
  if (!form) errors.push('Built /referral/ has no <form name="referral">.');
  for (const [name, expected] of [
    ["data-netlify", "true"], ["netlify-honeypot", "bot-field"],
    ["enctype", "multipart/form-data"], ["action", "/referral-received/"],
  ]) {
    if (attribute(formTag, name) !== expected) errors.push(`Built referral form requires ${name}="${expected}".`);
  }
  if (attribute(formTag, "method")?.toLowerCase() !== "post") errors.push("Built referral form must use method=POST.");
  const controls = [...form.matchAll(/<(?:input|select|textarea)\b[^>]*>/gi)].map((match) => match[0]);
  const field = (name) => controls.find((tag) => attribute(tag, "name") === name);
  const formName = field("form-name");
  if (!formName || attribute(formName, "type") !== "hidden" || attribute(formName, "value") !== "referral") {
    errors.push('Built referral form needs a hidden form-name="referral" field.');
  }
  for (const name of referralFields) {
    if (!field(name)) errors.push(`Built referral form is missing field "${name}".`);
  }
  if (attribute(field("referral-type") ?? "", "value") !== "new") {
    errors.push('Built referral form must default to referral-type="new".');
  }
  if (attribute(field("upload") ?? "", "type") !== "file") errors.push("Built referral upload must be a file input.");
  if (attribute(field("consent") ?? "", "type") !== "checkbox") errors.push("Built referral consent must be a checkbox.");
  for (const name of ["referrer_role", "referrer_name", "referrer_phone", "referrer_email", "participant_name", "participant_dob", "funding_type", "consent"]) {
    if (attribute(field(name) ?? "", "required") === null) {
      errors.push(`Built referral field "${name}" needs native required validation.`);
    }
  }
  const receivedRobots = [...receivedHtml.matchAll(/<meta\b[^>]*>/gi)]
    .map((match) => match[0]).find((tag) => attribute(tag, "name") === "robots");
  if (!receivedRobots || attribute(receivedRobots, "content") !== "noindex, nofollow") {
    errors.push("Built /referral-received/ must always have noindex, nofollow robots metadata.");
  }
  if (errors.length) throw new Error(errors.join("\n"));
}

/**
 * @param {{ html: string, robots: string, headers: string, draft: boolean }} files
 */
export function assertPublishedSite({ html, robots, headers, draft }) {
  const errors = formErrors(html);
  if (draft) {
    if (!html.includes('name="robots" content="noindex, nofollow"')) {
      errors.push("Built homepage is missing the noindex robots meta tag.");
    }
    if (!robots.includes("Disallow: /")) errors.push("Built robots.txt does not disallow /.");
    if (!headers.includes("X-Robots-Tag: noindex, nofollow")) {
      errors.push("Built _headers is missing X-Robots-Tag: noindex, nofollow.");
    }
  } else {
    if (!html.includes('name="robots" content="index, follow"')) {
      errors.push('Built homepage is missing the index, follow robots meta tag.');
    }
    if (html.includes('name="robots" content="noindex, nofollow"')) {
      errors.push("Built homepage still contains a noindex robots meta tag.");
    }
    if (headers.includes("X-Robots-Tag")) {
      errors.push("Built _headers still sends X-Robots-Tag after launch.");
    }
    if (!robots.includes("Allow: /")) errors.push("Built robots.txt does not allow /.");
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1] ?? "";
    let origin = "";
    try {
      origin = new URL(canonical).origin;
    } catch {
      origin = "";
    }
    const sitemapLine = origin ? `Sitemap: ${origin}/sitemap-index.xml` : "";
    if (!sitemapLine || !robots.includes(sitemapLine)) {
      errors.push(`Built robots.txt is missing a Sitemap line for ${origin || "the canonical origin"}.`);
    }
    for (const phrase of [
      "Privacy (draft)",
      "Disclaimer (draft)",
      "（草稿）",
      "Draft preview — not indexed",
      "草稿預覽 — 未公開索引",
      "草稿预览 — 未公开索引",
    ]) {
      if (html.includes(phrase)) errors.push(`Built homepage still contains draft copy: ${phrase}`);
    }
  }
  if (errors.length) {
    throw new Error(errors.join("\n"));
  }
}

function main() {
  const home = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
  const enquiryUrl = new URL("../dist/enquiry/index.html", import.meta.url);
  const enquiry = existsSync(enquiryUrl) ? readFileSync(enquiryUrl, "utf8") : "";
  const html = `${home}\n${enquiry}`;
  const referralUrl = new URL("../dist/referral/index.html", import.meta.url);
  const receivedUrl = new URL("../dist/referral-received/index.html", import.meta.url);
  const referral = existsSync(referralUrl) ? readFileSync(referralUrl, "utf8") : "";
  const receivedHtml = existsSync(receivedUrl) ? readFileSync(receivedUrl, "utf8") : "";
  const robots = readFileSync(new URL("../dist/robots.txt", import.meta.url), "utf8");
  const headers = readFileSync(new URL("../dist/_headers", import.meta.url), "utf8");
  const source = readFileSync(new URL("../src/content/site.ts", import.meta.url), "utf8");
  const draft = readSiteDraft(source);
  try {
    assertPublishedSite({ html, robots, headers, draft });
    assertReferralForm({ html: referral, receivedHtml });
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
  console.log(
    draft
      ? "Enquiry and referral Netlify forms are in the built HTML; referral receipt and draft noindex checks passed."
      : "Enquiry and referral Netlify forms are in the built HTML; referral receipt stays noindex and launch indexing files allow search.",
  );
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invokedDirectly) main();
