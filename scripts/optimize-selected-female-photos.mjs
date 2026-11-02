/** Responsive exports from Jackson's selected female photo candidates.
 * Preserve the supplied masters and never upscale them.
 */
import sharp from "sharp";
import { join } from "node:path";

const photos = join(import.meta.dirname, "..", "public", "photos");
const hero = join(photos, "hero");
const referrers = join(photos, "referrers");

for (const [directory, master, stem, widths] of [
  [hero, "female-desktop-original.png", "female-desktop", [1280, 1672]],
  [referrers, "consultation-female-original.png", "consultation-female", [720, 1080, 1448]],
]) {
  for (const width of widths) {
    await sharp(join(directory, master)).resize({ width, withoutEnlargement: true })
      .webp({ lossless: true, effort: 6 }).toFile(join(directory, `${stem}-${width}.webp`));
  }
}

for (const width of [560, 800, 1122]) {
  const source = () => sharp(join(hero, "female-portrait-original.png"))
    .resize({ width, withoutEnlargement: true });
  await source().avif({ quality: 85, effort: 6 }).toFile(join(hero, `female-portrait-${width}.avif`));
  await source().webp({ lossless: true, effort: 6 }).toFile(join(hero, `female-portrait-${width}.webp`));
  await source().jpeg({ quality: 95, mozjpeg: true }).toFile(join(hero, `female-portrait-${width}.jpg`));
}
console.log("Selected female photos exported at native or smaller sizes.");
