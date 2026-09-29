export function initHomeMotion(root: ParentNode = document): void {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  const reveals = root.querySelectorAll(".hm-reveal");
  if (reduced) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    reveals.forEach((el) => observer.observe(el));
  }

  const heading = root.querySelector(".hm-h1-enter");
  if (heading) {
    if (reduced) heading.classList.add("is-in");
    else requestAnimationFrame(() => heading.classList.add("is-in"));
  }

  const media = root.querySelector<HTMLElement>("[data-hm-parallax]");
  if (media && finePointer && !reduced) {
    const max = 8;
    let frame = 0;
    const onMove = (event: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = media.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * max;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * max;
        media.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };
    const reset = () => {
      media.style.transform = "";
    };
    media.addEventListener("mousemove", onMove);
    media.addEventListener("mouseleave", reset);
  }

  initHeaderOffset(root);
  initScrollSpy(root);
  initMenu(root);
}

function initHeaderOffset(root: ParentNode): void {
  const header = root.querySelector<HTMLElement>(".hm-header");
  const host = root.querySelector<HTMLElement>(".hm");
  if (!header || !host) return;
  const update = () => host.style.setProperty("--hm-header-h", `${header.offsetHeight}px`);
  update();
  new ResizeObserver(update).observe(header);
}

function initScrollSpy(root: ParentNode): void {
  const links = [...root.querySelectorAll<HTMLAnchorElement>(".hm-header a[data-spy]")];
  const ids = [...new Set(links.map((link) => link.dataset.spy || ""))];
  const sections = ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => Boolean(el))
    .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
  if (!links.length || !sections.length) return;

  const setActive = (id: string) => {
    for (const link of links) {
      const on = link.dataset.spy === id;
      link.classList.toggle("is-active", on);
      if (on) link.setAttribute("aria-current", id === "top" ? "page" : "location");
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
  const menu = root.querySelector<HTMLDetailsElement>("details.hm-menu");
  const summary = menu?.querySelector<HTMLElement>("summary");
  if (!menu || !summary) return;

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.open = false;
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      menu.open = false;
      summary.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (menu.open && !menu.contains(event.target as Node)) menu.open = false;
  });
  menu.addEventListener("focusout", (event) => {
    const next = event.relatedTarget as Node | null;
    if (menu.open && next && !menu.contains(next)) menu.open = false;
  });
}
