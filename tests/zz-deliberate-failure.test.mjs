import assert from "node:assert/strict";
import test from "node:test";

test("TEMP: deliberate failure", () => {
  assert.equal(false, true);
});
