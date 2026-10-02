/**
 * Fails the build if the published homepage would not be detected as a Netlify Form,
 * or if the draft indexing blocks are missing from the built files.
 */
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
const robots = readFileSync(new URL("../dist/robots.txt", import.meta.url), "utf8");
const headers = readFileSync(new URL("../dist/_headers", import.meta.url), "utf8");

function fail(message) {
  console.error(message);
  process.exit(1);
}

const formTag = html.match(/<form\b[^>]*>/i)?.[0] ?? "";
if (!formTag.includes('name="enquiry"')) fail("Built HTML has no <form name=\"enquiry\">.");
if (!/\snetlify(?:=|"|\s|>)/.test(formTag) && !formTag.includes('data-netlify="true"')) {
  fail("Built enquiry form is missing the Netlify form attribute.");
}
if (!formTag.includes('data-netlify="true"')) fail('Built enquiry form is missing data-netlify="true".');
if (!html.includes('name="form-name"') || !html.includes('value="enquiry"')) {
  fail('Built HTML is missing the hidden form-name field Netlify needs.');
}
for (const field of ["bot-field", "name", "phone", "email", "suburb", "language", "ndis", "message"]) {
  if (!html.includes(`name="${field}"`)) fail(`Built enquiry form is missing field "${field}".`);
}
if (!html.includes('name="robots" content="noindex, nofollow"')) {
  fail("Built homepage is missing the noindex robots meta tag.");
}
if (!robots.includes("Disallow: /")) fail("Built robots.txt does not disallow /.");
if (!headers.includes("X-Robots-Tag: noindex, nofollow")) {
  fail("Built _headers is missing X-Robots-Tag: noindex, nofollow.");
}

console.log("Netlify form is in the built HTML, and draft noindex files are present.");
