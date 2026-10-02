import assert from "node:assert/strict";
import test from "node:test";
import { draftStatusProperties } from "../src/lib/draft-schema.mjs";

test("draft schema includes the draft status line only while site.draft is true", () => {
  const draft = JSON.stringify(draftStatusProperties(true));
  assert.match(draft, /Site in draft/);
});

test("production schema has no Site in draft wording", () => {
  const launched = JSON.stringify(draftStatusProperties(false));
  assert.equal(launched.includes("Site in draft"), false);
  assert.deepEqual(draftStatusProperties(false), []);
});
