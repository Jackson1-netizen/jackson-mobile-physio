# Desktop hero source and motion

The approved desktop image is the owner's `home-motion-desktop-draft.png`, copied
unchanged to `public/photos/hero/desktop-original.png` (1672 × 940, 2,025,680 bytes).
This is a different composition from the older `landscape-*` exports. The old
3840 × 2160 dimensions did not represent additional native image detail.

Run `node scripts/optimize-hero.mjs` to regenerate 1280px and 1672px lossless WebP
variants directly from this PNG. The general image script also calls this pipeline.
The full-size WebP decodes to exactly the same RGB pixels as the approved PNG;
its 1,356,426-byte size deliberately prioritizes detail over the old lossy AVIF.
The original PNG is retained as a fallback. No upscaling, face reconstruction,
sharpening, or generative changes are applied.

`HomeHero.astro` preloads the same desktop WebP source set used by `<picture>`.
Its `sizes` accounts for cover-cropping and animation overscan. Phones retain
their separate portrait source set. Screens requiring more than 1672 source
pixels will still be limited by this original; a genuinely higher-resolution
master is needed for additional real detail on large or high-DPI displays.

The photo moves smoothly between 1× and 1.035× over 16 seconds per direction,
with no lateral translation. Top-aligned desktop cropping and a face-oriented
transform origin preserve headroom. Reduced-motion preferences disable motion.

Validation: Astro check (0 diagnostics), production build and draft/form assertions,
decoded PNG/WebP pixel comparison, and production-browser checks at 390, 768, 769,
1440 (DPR 1/2), 1920, 2560 (DPR 2), and 3440 CSS pixels. Sampled the zoom-in,
zoom-out and reversal frames: no exposed edges or duplicate hero downloads.
