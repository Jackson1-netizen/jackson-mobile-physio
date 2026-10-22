#!/usr/bin/env node
/**
 * One-off: build responsive AVIF/WebP photo variants and resized logo copies.
 * Originals in public/ are left untouched. Re-run after replacing a source image:
 *   node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join, parse } from "node:path";

// The current desktop hero has its own lossless PNG-based pipeline.
await import("./optimize-hero.mjs");
await import("./optimize-referrers.mjs");

const root = join(import.meta.dirname, "..", "public");

const photos = [
  { file: "home-walker.jpg", widths: [480, 640, 819] },
  { file: "home-sit-to-stand.jpg", widths: [480, 640, 819] },
  { file: "home-gait-support.jpg", widths: [480, 640, 819] },
  { file: "jackson-portrait.jpg", widths: [480, 640, 800, 1120] },
  { file: "kitchen-bench.jpg", widths: [480, 720, 960, 1200, 1448] },
];

const photoOut = join(root, "photos", "opt");
mkdirSync(photoOut, { recursive: true });

for (const { file, widths } of photos) {
  const { name } = parse(file);
  for (const width of widths) {
    const base = sharp(join(root, "photos", file)).resize({ width, withoutEnlargement: true });
    await base.clone().avif({ quality: 55, effort: 6 }).toFile(join(photoOut, `${name}-${width}.avif`));
    await base.clone().webp({ quality: 74, effort: 6 }).toFile(join(photoOut, `${name}-${width}.webp`));
  }
}

// Hero masters already live at the largest filename. AVIF/WebP are rebuilt from
// those JPEGs. The 3840 and 2400 JPEGs are not recompressed.
const heroDir = join(root, "photos", "hero");
const heroes = [
  { master: "landscape-3840.jpg", name: "landscape", widths: [1280, 1600, 1920, 2560, 3200, 3840] },
  { master: "portrait-2400.jpg", name: "portrait", widths: [800, 1200, 1600, 2400] },
];
for (const { master, name, widths } of heroes) {
  for (const width of widths) {
    const pipeline = sharp(join(heroDir, master)).resize({
      width,
      withoutEnlargement: true,
      kernel: "lanczos3",
    });
    await pipeline.clone().avif({ quality: 72, effort: 6 }).toFile(join(heroDir, `${name}-${width}.avif`));
    await pipeline.clone().webp({ quality: 88, effort: 6 }).toFile(join(heroDir, `${name}-${width}.webp`));
    if (width < Number(master.match(/(\d+)\.jpg$/)[1])) {
      await pipeline.clone().jpeg({ quality: 88, mozjpeg: true }).toFile(join(heroDir, `${name}-${width}.jpg`));
    }
  }
}

// Logo: lossless resizes only, so the artwork looks identical to the original PNG.
const logoOut = join(root, "logo");
mkdirSync(logoOut, { recursive: true });
for (const width of [200, 300, 400]) {
  const base = sharp(join(root, "home-motion-logo.png")).resize({ width, kernel: "lanczos3" });
  await base.clone().png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(join(logoOut, `home-motion-logo-${width}.png`));
  await base.clone().webp({ lossless: true, effort: 6 }).toFile(join(logoOut, `home-motion-logo-${width}.webp`));
}
