import assert from "node:assert/strict";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
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
  for (const BRANCH of ["main", "cursor/design-option-2-b759", "other", branch]) {
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

test("production allows only the integration source, independently of preview opt-in", async () => {
  for (const optIn of [{}, approved]) {
    assert.equal((await decide({ ...optIn, CONTEXT: "production", BRANCH: "cto/home-motion-integration" })).allow, true);
    assert.equal((await decide({ ...optIn, CONTEXT: "production", BRANCH: "refs/heads/cto/home-motion-integration" })).allow, true);
    for (const BRANCH of ["cursor/design-option-2-b759", branch, "main", "unrelated"]) {
      assert.equal((await decide({ ...optIn, CONTEXT: "production", BRANCH })).allow, false);
    }
  }
});

test("legacy non-production PR previews remain compatible", async () => {
  const env = { CONTEXT: "deploy-preview", BRANCH: "pull/3/head", REVIEW_ID: "3" };
  assert.equal((await decide(env, pr("other", "cursor/design-option-2-b759"))).allow, true);
  assert.equal((await decide({ CONTEXT: "deploy-preview", BRANCH: "cursor/design-option-2-b759" })).allow, true);
});

test("unrelated preview branches and unknown contexts fail closed", async () => {
  assert.equal((await decide({ ...approved, CONTEXT: "deploy-preview", BRANCH: "pull/11/head", REVIEW_ID: "11" }, pr("unrelated", "unrelated"))).allow, false);
  assert.equal((await decide({ ...approved, CONTEXT: "branch-deploy", BRANCH: "unrelated" })).allow, false);
  assert.equal((await decide({ ...approved, BRANCH: "cto/home-motion-integration" })).allow, false);
});

test("direct ignore command uses Netlify's allow=1 and skip=0 exit codes", () => {
  const script = fileURLToPath(new URL("../scripts/netlify-ignore-build.mjs", import.meta.url));
  for (const [BRANCH, expected] of [["cto/home-motion-integration", 1], ["cursor/design-option-2-b759", 0], [branch, 0], ["unrelated", 0]]) {
    const run = spawnSync(process.execPath, [script], {
      env: { ...process.env, CONTEXT: "production", BRANCH }, encoding: "utf8",
    });
    assert.equal(run.status, expected, run.stderr);
    assert.match(run.stdout, expected ? /Netlify build allowed/ : /Netlify build ignored/);
  }
});
