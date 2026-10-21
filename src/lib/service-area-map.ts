type MapCopy = {
  loading: string;
  unavailable: string;
  showArea: string;
  selected: string;
  visitNote: string;
  areaDetails: string;
  enquireArea: string;
  clusterLabel: string;
};
type Area = {
  name: string;
  lat: number;
  lng: number;
  href: string;
  choice: HTMLButtonElement;
  element?: HTMLDivElement;
  pin?: HTMLButtonElement;
  label?: HTMLSpanElement;
  note?: HTMLSpanElement;
};
type ProjectedArea = { area: Area; x: number; y: number };
type Group = { points: ProjectedArea[]; x: number; y: number };

declare global {
  interface Window {
    __hmGoogleMapsReady?: () => void;
    gm_authFailure?: () => void;
  }
}

let mapsReady: Promise<typeof google.maps> | undefined;
let authenticationFailed = false;

/** Official async Maps JavaScript API. No key, tiles or account credentials live in Git. */
function loadGoogleMaps(): Promise<typeof google.maps> {
  if (authenticationFailed) return Promise.reject(new Error("Google Maps authentication failed"));
  if (window.google?.maps?.Map) return Promise.resolve(window.google.maps);
  if (mapsReady) return mapsReady;
  const key = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  if (!key) return Promise.reject(new Error("Google Maps is not configured"));
  mapsReady = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const finish = (error?: Error) => {
      window.clearTimeout(timeout);
      delete window.__hmGoogleMapsReady;
      script.onerror = null;
      if (error) {
        script.remove();
        mapsReady = undefined;
        reject(error);
      } else resolve(window.google.maps);
    };
    const timeout = window.setTimeout(() => finish(new Error("Google Maps timed out")), 20000);
    window.__hmGoogleMapsReady = () => finish();
    window.gm_authFailure = () => {
      authenticationFailed = true;
      finish(new Error("Google Maps authentication failed"));
      window.dispatchEvent(new Event("hm:maps-auth-failure"));
    };
    const query = new URLSearchParams({
      key, v: "quarterly", loading: "async", callback: "__hmGoogleMapsReady",
      region: "AU", language: "en", auth_referrer_policy: "origin",
    });
    script.src = "https://maps.googleapis.com/maps/api/js?" + query;
    script.async = true;
    script.onerror = () => finish(new Error("Google Maps could not load"));
    document.head.append(script);
  });
  return mapsReady;
}

export function initServiceAreas(): void {
  document.querySelectorAll<HTMLElement>("[data-hm-service-areas]").forEach((section) => {
    if (section.dataset.mapInitialized) return;
    section.dataset.mapInitialized = "true";
    const root = section.querySelector<HTMLElement>("[data-hm-map]")!;
    const canvas = root.querySelector<HTMLElement>("[data-hm-map-canvas]")!;
    const external = root.querySelector<HTMLAnchorElement>("[data-hm-google-map]")!;
    const detail = section.querySelector<HTMLAnchorElement>("[data-hm-area-detail]")!;
    const detailName = section.querySelector<HTMLElement>("[data-hm-area-name]")!;
    const detailLabel = section.querySelector<HTMLElement>("[data-hm-detail-label]")!;
    const announcement = root.querySelector<HTMLElement>("[data-hm-area-status]")!;
    const status = root.querySelector<HTMLElement>("[data-hm-map-status]")!;
    const fallback = root.querySelector<HTMLElement>("[data-hm-map-fallback]")!;
    const retry = root.querySelector<HTMLButtonElement>("[data-hm-map-retry]")!;
    const reset = root.querySelector<HTMLButtonElement>("[data-hm-map-reset]")!;
    const copies: Record<string, MapCopy> = JSON.parse(root.querySelector("[data-hm-map-copy]")!.textContent!);
    // Only the main service-area list supplies markers and fit/cluster coordinates.
    const areas: Area[] = [...section.querySelectorAll<HTMLButtonElement>(".hm-area-list [data-hm-area-choice]")].map((choice) => ({
      name: choice.dataset.name!, lat: Number(choice.dataset.lat), lng: Number(choice.dataset.lng),
      href: choice.dataset.href!, choice,
    }));
    let selected = areas[0];
    let map: google.maps.Map | undefined;
    let overlay: google.maps.OverlayView | undefined;
    let mounting: Promise<void> | undefined;
    let tileTimeout = 0;
    const copy = () => copies[document.documentElement.lang] ?? copies.en;

    function setState(state: "loading" | "ready" | "unavailable") {
      root.dataset.mapState = state;
      canvas.inert = state !== "ready";
      canvas.setAttribute("aria-busy", String(state === "loading"));
      fallback.hidden = state === "ready";
      retry.hidden = state !== "unavailable";
      status.dataset.i18nPath = state === "unavailable" ? "hm.areas.mapUnavailable" : "hm.areas.mapLoading";
      status.textContent = state === "unavailable" ? copy().unavailable : copy().loading;
    }

    function positionLabels() {
      const label = selected.label;
      if (!label || selected.element?.hidden) return;
      for (const area of areas) area.label?.classList.remove("is-muted");
      label.style.translate = "";
      const frame = root.getBoundingClientRect();
      const bounds = label.getBoundingClientRect();
      const x = Math.max(frame.left + 12 - bounds.left, Math.min(0, frame.right - 12 - bounds.right));
      const y = Math.max(frame.top + 72 - bounds.top, Math.min(0, frame.bottom - 40 - bounds.bottom));
      label.style.translate = x + "px " + y + "px";
      const visible = [label.getBoundingClientRect()];
      for (const area of areas) {
        if (area === selected || !area.label || area.element?.hidden) continue;
        const next = area.label.getBoundingClientRect();
        if (!next.width || !next.height) continue;
        const overlaps = visible.some((rect) => next.left < rect.right + 5 && next.right > rect.left - 5 && next.top < rect.bottom + 5 && next.bottom > rect.top - 5);
        area.label.classList.toggle("is-muted", overlaps);
        if (!overlaps) visible.push(next);
      }
    }

    function renderSelection(announce = false) {
      const t = copy();
      for (const area of areas) {
        const active = area === selected;
        area.choice.classList.toggle("is-selected", active);
        area.choice.setAttribute("aria-pressed", String(active));
        area.choice.setAttribute("aria-label", t.showArea.replace("{area}", area.name));
        area.element?.classList.toggle("is-selected", active);
        if (area.element) area.element.style.zIndex = active ? "100" : "1";
        area.pin?.setAttribute("aria-pressed", String(active));
        area.pin?.setAttribute("aria-label", active
          ? area.name + " " + t.visitNote + ". " + t.showArea.replace("{area}", area.name)
          : t.showArea.replace("{area}", area.name));
        if (!active && area.label) area.label.style.translate = "";
        if (area.note) area.note.textContent = t.visitNote;
      }
      detail.href = selected.href === "/enquiry/"
        ? "/enquiry/?suburb=" + encodeURIComponent(selected.name) : selected.href;
      detailLabel.textContent = selected.href.startsWith("/areas/") ? t.areaDetails : t.enquireArea;
      detailName.textContent = selected.name;
      external.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(selected.name + " VIC Australia");
      if (announce) announcement.textContent = t.selected.replace("{area}", selected.name);
      if (root.dataset.mapState === "unavailable") status.textContent = t.unavailable;
      else if (root.dataset.mapState !== "ready") status.textContent = t.loading;
      overlay?.draw();
      positionLabels();
    }

    function select(area: Area) {
      const wasClustered = area.element?.hidden;
      selected = area;
      renderSelection(true);
      if (map) {
        if (wasClustered) map.setZoom(Math.max(14, map.getZoom() ?? 12));
        map.panTo({ lat: area.lat, lng: area.lng });
      }
    }

    function fitAll() {
      if (!map) return;
      root.classList.toggle("is-compact", root.clientWidth < 560);
      const bounds = new google.maps.LatLngBounds();
      areas.forEach((area) => bounds.extend({ lat: area.lat, lng: area.lng }));
      map.fitBounds(bounds, { top: 100, right: 42, bottom: 70, left: 42 });
    }

    async function mount(): Promise<void> {
      if (mounting) return mounting;
      setState("loading");
      mounting = (async () => {
        try {
          const maps = await loadGoogleMaps();
          if (map) {
            overlay?.setMap(null);
            maps.event.clearInstanceListeners(map);
            map = undefined;
            canvas.replaceChildren();
          }
          map = new maps.Map(canvas, {
            center: { lat: -37.833, lng: 145.132 }, zoom: 12, minZoom: 10, maxZoom: 17,
            mapTypeId: maps.MapTypeId.ROADMAP, renderingType: maps.RenderingType.RASTER,
            disableDefaultUI: true, clickableIcons: false, gestureHandling: "cooperative",
            keyboardShortcuts: true, scrollwheel: false, disableDoubleClickZoom: true,
            zoomControl: true, zoomControlOptions: { position: maps.ControlPosition.RIGHT_BOTTOM },
            streetViewControl: false, fullscreenControl: false, mapTypeControl: false,
          });

          // OverlayView keeps native, keyboard-accessible buttons at real Google map coordinates.
          // It needs no deprecated Marker API, demo map ID, Places API or extra paid API.
          class SuburbOverlay extends maps.OverlayView {
            layer = document.createElement("div");
            clusterNodes: HTMLButtonElement[] = [];
            groups: Group[] = [];

            onAdd() {
              this.layer.className = "hm-area-overlay";
              this.getPanes()!.overlayMouseTarget.append(this.layer);
              for (const [index, area] of areas.entries()) {
                const element = document.createElement("div");
                element.className = "hm-area-marker";
                element.style.setProperty("--hm-marker-delay", `${index * 45}ms`);
                const pin = document.createElement("button");
                pin.type = "button";
                pin.className = "hm-area-map-pin";
                pin.dataset.hmMapArea = area.name;
                const shape = document.createElement("span");
                shape.className = "hm-area-marker-shape";
                shape.setAttribute("aria-hidden", "true");
                const label = document.createElement("span");
                label.className = "hm-area-marker-label";
                label.setAttribute("aria-hidden", "true");
                const name = document.createElement("strong");
                name.textContent = area.name;
                const note = document.createElement("span");
                note.className = "hm-area-marker-note";
                label.append(name, document.createTextNode(" "), note);
                pin.append(shape, label);
                pin.addEventListener("click", () => select(area));
                maps.OverlayView.preventMapHitsAndGesturesFrom(pin);
                element.append(pin);
                this.layer.append(element);
                Object.assign(area, { element, pin, label, note });
              }
              areas.forEach((_, index) => {
                const cluster = document.createElement("button");
                cluster.type = "button";
                cluster.className = "hm-area-map-cluster";
                cluster.hidden = true;
                cluster.addEventListener("click", () => {
                  const group = this.groups[index];
                  if (!group || !map) return;
                  const bounds = new maps.LatLngBounds();
                  group.points.forEach(({ area }) => bounds.extend({ lat: area.lat, lng: area.lng }));
                  map.fitBounds(bounds, 100);
                });
                maps.OverlayView.preventMapHitsAndGesturesFrom(cluster);
                this.clusterNodes.push(cluster);
                this.layer.append(cluster);
              });
              renderSelection();
            }

            draw() {
              if (!this.getPanes()) return;
              const projection = this.getProjection();
              if (!projection) return;
              this.groups = [];
              // Keep the selected pin exact and visible; group close neighbours to avoid stacked hit targets.
              const ordered = [selected, ...areas.filter((area) => area !== selected)];
              for (const area of ordered) {
                const point = projection.fromLatLngToDivPixel(new maps.LatLng(area.lat, area.lng));
                if (!point || !area.element) continue;
                area.element.style.left = point.x + "px";
                area.element.style.top = point.y + "px";
                area.element.hidden = true;
                const group = this.groups.find((item) => Math.hypot(item.x - point.x, item.y - point.y) < 58);
                const projected = { area, x: point.x, y: point.y };
                if (group) group.points.push(projected);
                else this.groups.push({ points: [projected], x: point.x, y: point.y });
              }
              this.clusterNodes.forEach((node) => { node.hidden = true; });
              this.groups.forEach((group, index) => {
                const lead = group.points[0].area;
                if (group.points.length === 1 || lead === selected) {
                  lead.element!.hidden = false;
                  if (lead === selected && group.points.length > 1) {
                    // Close primary suburbs remain selectable from the main list.
                    lead.pin!.dataset.nearbyCount = String(group.points.length - 1);
                  } else delete lead.pin!.dataset.nearbyCount;
                  return;
                }
                const node = this.clusterNodes[index];
                node.hidden = false;
                node.style.left = group.x + "px";
                node.style.top = group.y + "px";
                node.textContent = String(group.points.length);
                node.setAttribute("aria-label", group.points.length + ". " + copy().clusterLabel + " " + group.points.map(({ area }) => area.name).join(", "));
              });
              positionLabels();
            }

            onRemove() { this.layer.remove(); }
          }
          overlay = new SuburbOverlay();
          overlay.setMap(map);
          reset.disabled = false;
          fitAll();
          maps.event.addListener(map, "idle", positionLabels);
          maps.event.addListenerOnce(map, "tilesloaded", () => {
            window.clearTimeout(tileTimeout);
            setState("ready");
            renderSelection();
          });
          window.clearTimeout(tileTimeout);
          tileTimeout = window.setTimeout(() => setState("unavailable"), 20000);
        } catch {
          window.clearTimeout(tileTimeout);
          reset.disabled = true;
          setState("unavailable");
        }
      })();
      try { await mounting; } finally { mounting = undefined; }
    }

    areas.forEach((area) => {
      area.choice.disabled = false;
      area.choice.addEventListener("click", () => select(area));
    });
    reset.addEventListener("click", fitAll);
    retry.addEventListener("click", () => { void mount(); });
    window.addEventListener("hm:maps-auth-failure", () => {
      window.clearTimeout(tileTimeout);
      reset.disabled = true;
      setState("unavailable");
    });
    new MutationObserver(() => renderSelection()).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    let resizeFrame = 0;
    new ResizeObserver(() => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(fitAll);
    }).observe(root);
    renderSelection();
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          void mount();
        }
      }, { rootMargin: "300px 0px" });
      observer.observe(root);
    } else void mount();
  });
}
