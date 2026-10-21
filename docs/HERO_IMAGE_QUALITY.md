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

The second approved scene is `steps-original.png` (1672 × 941), also exported as
lossless 1280px/1672px WebP. It retains both people through a right-focused mobile
crop with a reserved headline band, so the text does not cover their faces.
Both native-size WebPs preserve the RGB pixels of their respective PNGs.

Each image completes a 1× → 1.035× → 1× zoom over **10 seconds** (5 seconds in,
5 seconds out), then crossfades to the other over 700ms. There is no lateral drift.
The slideshow provides two manual image buttons and pause/resume. It waits for the
next image to decode before changing; an unavailable second image leaves the first
visible. Focus in the controls, hidden tabs and an offscreen hero pause progression.
Reduced-motion users get a static initial image and manual switching without zoom
or crossfade. JavaScript-disabled visitors retain the first image.

Top-aligned desktop cropping and face-oriented transform origins preserve headroom.

Validation: Astro check (0 diagnostics), production build and draft/form assertions,
21 regression tests, and decoded PNG/WebP pixel comparison for both photos.
Browser verification covers the 10-second switch and return, mid-cycle zoom,
manual navigation, pause/resume, reduced-motion and 390px/768px mobile framing.
The earlier single-image version was also checked from 390 to 3440 CSS pixels.
