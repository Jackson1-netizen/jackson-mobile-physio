const SLIDE_MS = 10000;

/** A complete in/out zoom per image; no autoplay for reduced-motion users. */
export function initHeroSlideshow(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>("[data-hm-hero]").forEach((hero) => {
    if (hero.dataset.heroInitialized) return;
    hero.dataset.heroInitialized = "true";
    const slides = [...hero.querySelectorAll<HTMLElement>("[data-hm-hero-slide]")];
    const dots = [...hero.querySelectorAll<HTMLButtonElement>("[data-hm-hero-go]")];
    const toggle = hero.querySelector<HTMLButtonElement>("[data-hm-hero-toggle]")!;
    const controls = hero.querySelector<HTMLElement>("[data-hm-hero-controls]")!;
    const copy: Record<string, { pause: string; play: string }> = JSON.parse(hero.querySelector("[data-hm-hero-copy]")!.textContent!);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active = 0;
    let manualPause = false;
    let focused = false;
    let inView = true;
    let ready = false;
    let timer = 0;
    let started = 0;
    let remaining = SLIDE_MS;
    let request = 0;
    const paused = () => manualPause || focused || motion.matches || document.hidden || !inView;

    function cancelTimer() {
      if (!timer) return;
      window.clearTimeout(timer);
      remaining = Math.max(0, remaining - (performance.now() - started));
      timer = 0;
    }

    function update() {
      hero.dataset.heroPaused = String(paused());
      toggle.hidden = motion.matches;
      toggle.setAttribute("aria-pressed", String(manualPause));
      const text = copy[document.documentElement.lang] ?? copy.en;
      toggle.setAttribute("aria-label", manualPause ? text.play : text.pause);
      if (paused() || !ready) cancelTimer();
      else if (!timer) {
        started = performance.now();
        timer = window.setTimeout(() => {
          timer = 0;
          remaining = 0;
          void show((active + 1) % slides.length, true);
        }, remaining);
      }
    }

    async function show(index: number, automatic = false) {
      if (index === active || index < 0 || index >= slides.length) return;
      const currentRequest = ++request;
      const image = slides[index].querySelector<HTMLImageElement>("img")!;
      try { await image.decode(); }
      catch {
        // Keep the current photo if the next image fails; never fade into a blank.
        if (currentRequest === request) { remaining = SLIDE_MS; update(); }
        return;
      }
      if (currentRequest !== request) return;
      if (automatic && paused()) { remaining = 0; update(); return; }
      cancelTimer();
      const oldImage = slides[active].querySelector<HTMLImageElement>("img")!;
      // Preserve an outgoing frame during the crossfade, including manual switches.
      oldImage.style.transform = getComputedStyle(oldImage).transform;
      slides[active].classList.remove("is-active");
      slides[active].setAttribute("aria-hidden", "true");
      image.style.transform = "";
      active = index;
      slides[active].classList.add("is-active");
      slides[active].setAttribute("aria-hidden", "false");
      dots.forEach((dot, i) => dot.setAttribute("aria-pressed", String(i === active)));
      hero.dataset.heroIndex = String(active);
      remaining = SLIDE_MS;
      update();
    }

    dots.forEach((dot, index) => dot.addEventListener("click", () => { void show(index); }));
    toggle.addEventListener("click", () => {
      manualPause = !manualPause;
      // Explicit Play resumes immediately, even while this button retains focus.
      if (!manualPause) focused = false;
      update();
    });
    controls.addEventListener("focusin", () => { focused = true; update(); });
    controls.addEventListener("focusout", (event) => {
      if (!controls.contains(event.relatedTarget as Node | null)) { focused = false; update(); }
    });
    document.addEventListener("visibilitychange", update);
    motion.addEventListener("change", update);
    new MutationObserver(update).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
      observer.observe(hero);
    }
    controls.hidden = false;
    void slides[0].querySelector<HTMLImageElement>("img")!.decode().catch(() => {}).then(() => {
      ready = true;
      hero.dataset.heroReady = "true";
      hero.dataset.heroIndex = "0";
      update();
    });
  });
}
