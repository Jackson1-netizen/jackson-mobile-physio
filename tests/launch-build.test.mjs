import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const sitePath = join(root, "src/content/site.ts");
const original = readFileSync(sitePath, "utf8");

function withDraft(source, value) {
  const flag = value ? "true" : "false";
  const next = source
    .replace(/const draft = (true|false);/, `const draft = ${flag};`)
    .replace(/draft: (true|false),/, `draft: ${flag},`);
  if (!next.includes(`const draft = ${flag};`) || !next.includes(`draft: ${flag}`)) {
    throw new Error("Could not set site.draft for the launch build");
  }
  return next;
}

function walk(dir, found = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, found);
    else found.push(path);
  }
  return found;
}

test("draft false build uses the apex and drops launch-blocking copy", { timeout: 120000 }, () => {
  assert.match(original, /const draft = true;/);
  assert.match(original, /\bdraft:\s*true/);
  writeFileSync(sitePath, withDraft(original, false));
  try {
    const env = { ...process.env, CONTEXT: "production" };
    delete env.URL;
    delete env.DEPLOY_PRIME_URL;
    delete env.PUBLIC_SITE_URL;
    execFileSync("npm", ["run", "build"], { cwd: root, env, stdio: "pipe" });

    const dist = join(root, "dist");
    const files = walk(dist);
    const banned = ["PHY0004088824", "Expert physiotherapy", "not verified", "Draft site"];
    const hits = [];
    for (const file of files) {
      const text = readFileSync(file);
      for (const needle of banned) {
        if (text.includes(Buffer.from(needle))) hits.push(`${needle} in ${file}`);
      }
    }
    assert.deepEqual(hits, []);

    const home = readFileSync(join(dist, "index.html"), "utf8");
    assert.match(home, /rel="canonical" href="https:\/\/homemotionphysio\.com\.au\/"/);
    assert.match(home, /name="robots" content="index, follow"/);
    const referral = readFileSync(join(dist, "referral/index.html"), "utf8");
    assert.match(referral, /rel="canonical" href="https:\/\/homemotionphysio\.com\.au\/referral\/"/);
    const missing = readFileSync(join(dist, "404.html"), "utf8");
    assert.match(missing, /name="robots" content="noindex, nofollow"/);
    assert.equal(missing.includes('rel="canonical"'), false);
    assert.equal(missing.includes("/404"), false);
    const privacy = readFileSync(join(dist, "privacy/index.html"), "utf8");
    assert.match(privacy, /Not yet adopted/);
    assert.match(privacy, /Pending owner review/);
    const robots = readFileSync(join(dist, "robots.txt"), "utf8");
    assert.match(robots, /Allow: \//);
    assert.match(robots, /Sitemap: https:\/\/homemotionphysio\.com\.au\/sitemap-index\.xml/);
    const headers = readFileSync(join(dist, "_headers"), "utf8");
    assert.equal(headers.includes("X-Robots-Tag"), false);
    const sitemap = readFileSync(join(dist, "sitemap-0.xml"), "utf8");
    assert.match(sitemap, /https:\/\/homemotionphysio\.com\.au\/referral\//);
  } finally {
    writeFileSync(sitePath, original);
  }
});
