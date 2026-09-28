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

  const links = [...root.querySelectorAll<HTMLAnchorElement>(".hm-nav a[data-spy]")];
  const sections = links
    .map((link) => document.getElementById(link.dataset.spy || ""))
    .filter((el): el is HTMLElement => Boolean(el));
  if (links.length && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target.id) return;
        links.forEach((link) => {
          link.classList.toggle("is-active", link.dataset.spy === visible.target.id);
        });
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    sections.forEach((section) => spy.observe(section));
  }
}
