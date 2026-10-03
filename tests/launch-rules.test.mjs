import assert from "node:assert/strict";
import test from "node:test";
import { includeInSitemap, pageRobots, readSiteDraft } from "../scripts/site-draft.mjs";

const oneSwitch = "const draft = true;\nexport const site = { draft, privacy: { adopted: false }, disclaimer: { adopted: false } };";

test("the draft switch is a single const", () => {
  assert.equal(readSiteDraft(oneSwitch), true);
  assert.equal(readSiteDraft(oneSwitch.replace("const draft = true;", "const draft = false;")), false);
});

test("a second draft literal is rejected", () => {
  assert.throws(() => readSiteDraft(`${oneSwitch}\ndraft: false`));
  assert.throws(() => readSiteDraft("const draft = true;\nconst draft = false;"));
});

test("unadopted legal pages stay out of the sitemap and adopted pages are included", () => {
  const hidden = { privacyAdopted: false, disclaimerAdopted: false };
  const shown = { privacyAdopted: true, disclaimerAdopted: true };
  assert.equal(includeInSitemap("/privacy/", hidden), false);
  assert.equal(includeInSitemap("/disclaimer/", hidden), false);
  assert.equal(includeInSitemap("/", hidden), true);
  assert.equal(includeInSitemap("/privacy/", shown), true);
  assert.equal(includeInSitemap("/disclaimer/", shown), true);
});

test("unadopted legal pages are noindex and adopted pages can be indexed", () => {
  assert.equal(pageRobots({ siteDraft: false, forceNoindex: true }), "noindex, nofollow");
  assert.equal(pageRobots({ siteDraft: false, forceNoindex: false }), "index, follow");
  assert.equal(pageRobots({ siteDraft: true, forceNoindex: false }), "noindex, nofollow");
});
