export function initHomeMotion(root: ParentNode = document): void {
  initHeaderOffset(root);
  initScrollSpy(root);
  initMenu(root);
}

function initHeaderOffset(root: ParentNode): void {
  const header = root.querySelector<HTMLElement>(".a-header");
  if (!header) return;
  const update = () => {
    const height = header.offsetHeight;
    document.documentElement.style.setProperty("--a-header-h", `${height}px`);
    document.documentElement.style.scrollPaddingTop = `${height + 12}px`;
  };
  update();
  if ("ResizeObserver" in window) new ResizeObserver(update).observe(header);
}

function initScrollSpy(root: ParentNode): void {
  const links = [...root.querySelectorAll<HTMLAnchorElement>("a[data-spy]")];
  const ids = [...new Set(links.map((link) => link.dataset.spy || "").filter(Boolean))];
  const sections = ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => Boolean(el))
    .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
  if (!links.length || !sections.length || !("IntersectionObserver" in window)) return;

  const setActive = (id: string) => {
    for (const link of links) {
      const on = link.dataset.spy === id;
      link.classList.toggle("is-active", on);
      if (link.getAttribute("aria-current") === "page") continue;
      if (on) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  };

  const visible = new Map<Element, boolean>();
  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) visible.set(entry.target, entry.isIntersecting);
      const current = sections.find((section) => visible.get(section));
      if (current) setActive(current.id);
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );
  sections.forEach((section) => spy.observe(section));
}

function initMenu(root: ParentNode): void {
  const menu = root.querySelector<HTMLElement>("#a-menu");
  const button = root.querySelector<HTMLButtonElement>(".a-menu-btn");
  if (!menu || !button) return;

  const sync = () => {
    const open = menu.matches(":popover-open");
    button.setAttribute("aria-expanded", open ? "true" : "false");
  };

  menu.addEventListener("toggle", () => {
    sync();
    if (menu.matches(":popover-open")) {
      menu.querySelector<HTMLElement>("a")?.focus();
    }
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.matches(":popover-open") && "hidePopover" in menu) {
        menu.hidePopover();
      }
    });
  });
}
