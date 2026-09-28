#!/usr/bin/env node
/**
 * npm run checkpoint — safe daily checkpoint without force-push or conflict resolution.
 */
import { execSync, spawnSync } from "node:child_process";
import { appendFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const dailyLog = join(root, "docs", "DAILY_LOG.md");

function run(cmd, opts = {}) {
  return execSync(cmd, { cwd: root, encoding: "utf8", ...opts }).trim();
}

function hasRemote() {
  try {
    run("git remote get-url origin");
    return true;
  } catch {
    return false;
  }
}

function statusPorcelain() {
  return run("git status --porcelain");
}

function appendDailyLog(note) {
  const stamp = new Date().toISOString();
  const date = stamp.slice(0, 10);
  const entry = `\n## ${date} (${stamp})\n\n- Checkpoint run\n- ${note}\n`;
  if (!existsSync(dailyLog)) {
    appendFileSync(dailyLog, `# Daily log\n${entry}`);
  } else {
    appendFileSync(dailyLog, entry);
  }
}

function main() {
  let preStatus = "";
  try {
    preStatus = statusPorcelain();
  } catch (e) {
    console.error("Not a git repository or git unavailable.");
    process.exit(1);
  }

  if (preStatus.match(/\.env(\.|$)/)) {
    console.error("Refusing checkpoint: .env files appear in status. Remove secrets from tracking.");
    process.exit(1);
  }

  appendDailyLog(
    preStatus
      ? `Changes before commit:\n\`\`\`\n${preStatus}\n\`\`\``
      : "No tracked changes before log append.",
  );

  const postLogStatus = statusPorcelain();
  if (!postLogStatus) {
    console.log("No changes to commit after DAILY_LOG update — skipping commit.");
    return;
  }

  run("git add -A");
  const staged = statusPorcelain();
  if (!staged) {
    console.log("Nothing staged — skipping commit.");
    return;
  }

  const msg = `checkpoint: ${new Date().toISOString()}`;
  const commit = spawnSync("git", ["commit", "-m", msg], { cwd: root, encoding: "utf8" });
  if (commit.status !== 0) {
    console.error(commit.stderr || commit.stdout);
    console.error("Commit failed — resolve manually. No force operations were attempted.");
    process.exit(commit.status ?? 1);
  }
  console.log(commit.stdout || `Committed: ${msg}`);

  if (!hasRemote()) {
    console.log("No origin remote — push skipped.");
    return;
  }

  const branch = run("git branch --show-current");
  const push = spawnSync("git", ["push", "-u", "origin", branch], { cwd: root, encoding: "utf8" });
  if (push.status !== 0) {
    console.error(push.stderr || push.stdout);
    console.error("Push failed — stop here and resolve (no force-push).");
    process.exit(push.status ?? 1);
  }
  console.log(push.stdout || `Pushed ${branch} to origin.`);
}

main();
