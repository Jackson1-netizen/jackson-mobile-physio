/**
 * Fails the build if the published homepage would not be detected as a Netlify Form.
 * Indexing checks follow site.draft: noindex while drafting, indexable after launch.
 */
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export function readSiteDraft(source) {
  const match = String(source).match(/\bdraft:\s*(true|false)/);
  if (!match) throw new Error("Could not read site.draft from src/content/site.ts");
  return match[1] === "true";
}

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
  }
  if (errors.length) {
    throw new Error(errors.join("\n"));
  }
}

function main() {
  const html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
  const robots = readFileSync(new URL("../dist/robots.txt", import.meta.url), "utf8");
  const headers = readFileSync(new URL("../dist/_headers", import.meta.url), "utf8");
  const source = readFileSync(new URL("../src/content/site.ts", import.meta.url), "utf8");
  const draft = readSiteDraft(source);
  try {
    assertPublishedSite({ html, robots, headers, draft });
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
  console.log(
    draft
      ? "Netlify form is in the built HTML, and draft noindex files are present."
      : "Netlify form is in the built HTML, and the launch indexing files allow search.",
  );
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invokedDirectly) main();
