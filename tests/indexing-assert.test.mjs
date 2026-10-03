import assert from "node:assert/strict";
import test from "node:test";
import { assertPublishedSite } from "../scripts/assert-netlify-form.mjs";

const form = `<form name="enquiry" data-netlify="true" netlify-honeypot="bot-field"><input name="form-name" value="enquiry"><input name="bot-field"><input name="name"><input name="phone"><input name="email"><input name="suburb"><input name="language"><input name="ndis"><textarea name="message"></textarea></form>`;

test("draft build must keep noindex", () => {
  assert.doesNotThrow(() =>
    assertPublishedSite({
      html: `${form}<meta name="robots" content="noindex, nofollow"><link rel="canonical" href="https://homemotion-staging.netlify.app/">`,
      robots: "User-agent: *\nDisallow: /\n",
      headers: "X-Robots-Tag: noindex, nofollow\n",
      draft: true,
    }),
  );
});

test("launch build must allow indexing on the canonical origin", () => {
  assert.doesNotThrow(() =>
    assertPublishedSite({
      html: `${form}<meta name="robots" content="index, follow"><link rel="canonical" href="https://homemotionphysio.com.au/">`,
      robots: "User-agent: *\nAllow: /\nSitemap: https://homemotionphysio.com.au/sitemap-index.xml\n",
      headers: "X-Frame-Options: DENY\n",
      draft: false,
    }),
  );
});

test("launch build fails while noindex remains", () => {
  assert.throws(() =>
    assertPublishedSite({
      html: `${form}<meta name="robots" content="noindex, nofollow">`,
      robots: "Allow: /\n",
      headers: "X-Robots-Tag: noindex, nofollow\n",
      draft: false,
    }),
  );
});
