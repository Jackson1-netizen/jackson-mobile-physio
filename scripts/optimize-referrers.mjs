/** Responsive, lossless copies of Jackson's supplied consultation PNG. */
import sharp from "sharp";
import { join } from "node:path";

const directory = join(import.meta.dirname, "..", "public", "photos", "referrers");
const original = join(directory, "consultation-original.png");
const metadata = await sharp(original).metadata();
if (metadata.width !== 1448 || metadata.height !== 1086) {
  throw new Error("Update HomeReferrers.astro's dimensions/srcset when replacing the 1448×1086 master.");
}
for (const width of [720, 1080, 1448]) {
  await sharp(original)
    .resize({ width, withoutEnlargement: true, kernel: "lanczos3" })
    .webp({ lossless: true, effort: 6 })
    .toFile(join(directory, `consultation-${width}.webp`));
  console.log(`Wrote consultation-${width}.webp`);
}
