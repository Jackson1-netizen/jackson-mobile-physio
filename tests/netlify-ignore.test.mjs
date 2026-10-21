import assert from "node:assert/strict";
import test from "node:test";
import { decide } from "../scripts/netlify-ignore-build.mjs";

const branch = "agent/HOME-002-about-enquiry";
const repo = "Jackson1-netizen/jackson-mobile-physio";
const approved = { HOME_MOTION_STAGING_PREVIEWS: "enabled" };
const pr = (head = branch, base = "cto/home-motion-integration", owner = repo) => async () => ({
  ok: true, json: async () => ({ base: { ref: base }, head: { ref: head, repo: { full_name: owner } } }),
});

test("HOME-002 previews stay off without explicit dashboard opt-in", async () => {
  assert.equal((await decide({ CONTEXT: "branch-deploy", BRANCH: branch })).allow, false);
  assert.equal((await decide({ CONTEXT: "deploy-preview", BRANCH: "pull/10/head", REVIEW_ID: "10" }, pr())).allow, false);
});

test("approved branch builds only the working branch in branch-deploy context", async () => {
  assert.equal((await decide({ ...approved, CONTEXT: "branch-deploy", BRANCH: branch })).allow, true);
  for (const BRANCH of ["main", "cto/home-motion-integration", "other", branch]) {
    assert.equal((await decide({ ...approved, CONTEXT: "production", BRANCH })).allow, false);
  }
  assert.equal((await decide({ ...approved, CONTEXT: "branch-deploy", BRANCH: "main" })).allow, false);
  assert.equal((await decide({ ...approved, CONTEXT: "branch-deploy", BRANCH: "cto/home-motion-integration" })).allow, false);
});

test("approved PR preview requires the correct head, base, and repository", async () => {
  const env = { ...approved, CONTEXT: "deploy-preview", BRANCH: "pull/10/head", REVIEW_ID: "10" };
  assert.equal((await decide(env, pr())).allow, true);
  assert.equal((await decide(env, pr("main"))).allow, false);
  assert.equal((await decide(env, pr(branch, "main"))).allow, false);
  assert.equal((await decide(env, pr(branch, undefined, "someone/fork"))).allow, false);
  assert.equal((await decide({ ...env, REVIEW_ID: "not-a-number" }, pr())).allow, false);
  assert.equal((await decide(env, async () => { throw Error("offline"); })).allow, false);
  assert.equal((await decide(env, async () => ({ ok: false, status: 403 }))).allow, false);
});

test("existing staging rules remain compatible", async () => {
  assert.equal((await decide({ CONTEXT: "production", BRANCH: "cursor/design-option-2-b759" })).allow, true);
  const env = { CONTEXT: "deploy-preview", BRANCH: "pull/3/head", REVIEW_ID: "3" };
  assert.equal((await decide(env, pr("other", "cursor/design-option-2-b759"))).allow, true);
});
