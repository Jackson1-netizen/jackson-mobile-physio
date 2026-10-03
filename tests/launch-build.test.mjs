import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, sep } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const sitePath = join(root, "src/content/site.ts");
const original = readFileSync(sitePath, "utf8");

function withDraft(source, value) {
  const flag = value ? "true" : "false";
  if (!source.includes("const draft = true;") && !source.includes("const draft = false;")) {
    throw new Error("Could not find the single draft switch");
  }
  const next = source.replace(/const draft = (true|false);/, `const draft = ${flag};`);
  if (/\bdraft:\s*(true|false)\b/.test(next)) {
    throw new Error("site.ts still has a second draft literal");
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

test("draft false build uses the apex and drops launch-blocking copy", { timeout: 180000 }, () => {
  assert.match(original, /const draft = true;/);
  assert.doesNotMatch(original, /\bdraft:\s*(true|false)\b/);
  const temp = mkdtempSync(join(tmpdir(), "hm-launch-"));
  try {
    cpSync(root, temp, {
      recursive: true,
      filter: (src) => {
        const rel = src.slice(root.length);
        return (
          !rel.includes(`${sep}node_modules`) &&
          !rel.includes(`${sep}.git`) &&
          rel !== `${sep}dist` &&
          !rel.startsWith(`${sep}dist${sep}`)
        );
      },
    });
    const linkedModules = join(temp, "node_modules");
    if (!existsSync(linkedModules)) symlinkSync(join(root, "node_modules"), linkedModules);
    const tempSite = join(temp, "src/content/site.ts");
    writeFileSync(tempSite, withDraft(readFileSync(tempSite, "utf8"), false));
    assert.match(readFileSync(sitePath, "utf8"), /const draft = true;/);

    const env = { ...process.env, CONTEXT: "production" };
    delete env.URL;
    delete env.DEPLOY_PRIME_URL;
    delete env.PUBLIC_SITE_URL;
    execFileSync("npm", ["run", "build"], { cwd: temp, env, stdio: "pipe" });

    const dist = join(temp, "dist");
    const files = walk(dist);
    const banned = [
      "PHY0004088824",
      "Expert physiotherapy",
      "not verified",
      "Draft site",
      "(draft)",
      "Draft preview",
      "（草稿）",
      "草稿預覽",
      "草稿预览",
    ];
    const hits = [];
    for (const file of files) {
      const text = readFileSync(file);
      for (const needle of banned) {
        if (text.includes(Buffer.from(needle))) hits.push(`${needle} in ${file}`);
      }
    }
    const counts = Object.fromEntries(
      banned.map((needle) => [needle, hits.filter((hit) => hit.startsWith(`${needle} in`)).length]),
    );
    console.log(`launch-build grep ${JSON.stringify(counts)}`);
    assert.deepEqual(hits, []);

    const home = readFileSync(join(dist, "index.html"), "utf8");
    assert.match(home, /rel="canonical" href="https:\/\/homemotionphysio\.com\.au\/"/);
    assert.match(home, /name="robots" content="index, follow"/);
    assert.match(home, /href="\/privacy\/"/);
    assert.match(home, /href="\/referral\/"/);
    assert.match(home, /href="\/areas\/box-hill\/"/);
    const referral = readFileSync(join(dist, "referral/index.html"), "utf8");
    assert.match(referral, /rel="canonical" href="https:\/\/homemotionphysio\.com\.au\/referral\/"/);
    assert.match(referral, /Registration:<\/span> AHPRA registered physiotherapist/);
    assert.doesNotMatch(referral, /AHPRA registration/);
    const missing = readFileSync(join(dist, "404.html"), "utf8");
    assert.match(missing, /name="robots" content="noindex, nofollow"/);
    assert.equal(missing.includes('rel="canonical"'), false);
    const privacy = readFileSync(join(dist, "privacy/index.html"), "utf8");
    const disclaimer = readFileSync(join(dist, "disclaimer/index.html"), "utf8");
    assert.match(privacy, /name="robots" content="noindex, nofollow"/);
    assert.match(disclaimer, /name="robots" content="noindex, nofollow"/);
    assert.match(privacy, /Not yet adopted/);
    assert.match(privacy, /Pending owner review/);
    assert.match(disclaimer, /Not yet adopted/);
    const robots = readFileSync(join(dist, "robots.txt"), "utf8");
    assert.match(robots, /Allow: \//);
    assert.match(robots, /Disallow: \/privacy\//);
    assert.match(robots, /Disallow: \/disclaimer\//);
    assert.match(robots, /Sitemap: https:\/\/homemotionphysio\.com\.au\/sitemap-index\.xml/);
    const headers = readFileSync(join(dist, "_headers"), "utf8");
    assert.equal(headers.includes("X-Robots-Tag"), false);
    const sitemap = readFileSync(join(dist, "sitemap-0.xml"), "utf8");
    assert.match(sitemap, /https:\/\/homemotionphysio\.com\.au\/referral\//);
    assert.doesNotMatch(sitemap, /\/privacy\//);
    assert.doesNotMatch(sitemap, /\/disclaimer\//);
  } finally {
    rmSync(temp, { recursive: true, force: true });
    assert.match(readFileSync(sitePath, "utf8"), /const draft = true;/);
  }
});
