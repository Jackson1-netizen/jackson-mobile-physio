/**
 * Desktop hero: resize directly from the approved PNG, with lossless encoding.
 * Never upscale a smaller export or use an already-compressed JPEG as a master.
 * Run after replacing public/photos/hero/desktop-original.png:
 *   node scripts/optimize-hero.mjs
 * Keep HomeHero.astro's widths in sync if the source dimensions change.
 */
import sharp from "sharp";
import { join } from "node:path";

const directory = join(import.meta.dirname, "..", "public", "photos", "hero");
const original = join(directory, "desktop-original.png");
const metadata = await sharp(original).metadata();
if (metadata.width !== 1672 || metadata.height !== 940) {
  throw new Error("Expected the approved 1672×940 desktop PNG; update the hero dimensions and srcset before changing masters.");
}

for (const width of [1280, 1672]) {
  const output = join(directory, `desktop-${width}.webp`);
  await sharp(original)
    .resize({ width, withoutEnlargement: true, kernel: "lanczos3" })
    .webp({ lossless: true, effort: 6 })
    .toFile(output);
  console.log(`Wrote ${output}`);
}
