// The shared header owns menu behaviour on every route. Repeated calls are safe.
export function initHeaderMenus(root: ParentNode = document): void {
  for (const menu of root.querySelectorAll<HTMLDetailsElement>("details.hm-menu")) {
    if (menu.dataset.hmMenuReady === "true") continue;
    const summary = menu.querySelector<HTMLElement>("summary");
    const panel = menu.querySelector<HTMLElement>(".hm-menu-panel");
    if (!summary || !panel) continue;
    menu.dataset.hmMenuReady = "true";

    const syncExpanded = () => summary.setAttribute("aria-expanded", String(menu.open));
    const close = () => {
      menu.open = false;
      syncExpanded();
    };
    syncExpanded();
    // Also synchronize programmatic open/close changes before the next toggle task.
    new MutationObserver(syncExpanded).observe(menu, { attributes: true, attributeFilter: ["open"] });

    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.open) {
        close();
        summary.focus();
      }
    });
    document.addEventListener("click", (event) => {
      if (menu.open && !menu.contains(event.target as Node)) close();
    });
    menu.addEventListener("focusout", (event) => {
      const next = event.relatedTarget as Node | null;
      if (menu.open && next && !menu.contains(next)) close();
    });
    menu.addEventListener("toggle", () => {
      syncExpanded();
      panel.style.maxHeight = "";
      if (!menu.open) return;
      const available = window.innerHeight - panel.getBoundingClientRect().top - 12;
      const cssMax = Number.parseFloat(getComputedStyle(panel).maxHeight);
      const limit = Math.min(Number.isFinite(cssMax) ? cssMax : available, available);
      if (panel.scrollHeight > limit) panel.style.maxHeight = `${Math.max(limit, 160)}px`;
      const first = panel.querySelector<HTMLElement>("a");
      if (first && !panel.contains(document.activeElement)) first.focus();
    });
  }
}
