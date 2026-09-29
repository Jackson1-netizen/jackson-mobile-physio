#!/usr/bin/env node
/**
 * One-off: build responsive AVIF/WebP photo variants and resized logo copies.
 * Originals in public/ are left untouched. Re-run after replacing a source image:
 *   node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join, parse } from "node:path";

const root = join(import.meta.dirname, "..", "public");

const photos = [
  { file: "home-walker.jpg", widths: [480, 640, 819] },
  { file: "home-sit-to-stand.jpg", widths: [480, 640, 819] },
  { file: "home-gait-support.jpg", widths: [480, 640, 819] },
  { file: "jackson-portrait.jpg", widths: [480, 800, 1120] },
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

// Logo: lossless resizes only, so the artwork looks identical to the original PNG.
const logoOut = join(root, "logo");
mkdirSync(logoOut, { recursive: true });
for (const width of [200, 300, 400]) {
  const base = sharp(join(root, "home-motion-logo.png")).resize({ width, kernel: "lanczos3" });
  await base.clone().png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(join(logoOut, `home-motion-logo-${width}.png`));
  await base.clone().webp({ lossless: true, effort: 6 }).toFile(join(logoOut, `home-motion-logo-${width}.webp`));
}
