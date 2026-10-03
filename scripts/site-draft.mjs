/**
 * The only launch switch is `const draft = true|false` in src/content/site.ts.
 * `site.draft` is that binding. A second `draft: true` literal is rejected.
 */
export function readSiteDraft(source) {
  const text = String(source);
  const literals = [...text.matchAll(/\bdraft:\s*(true|false)\b/g)];
  if (literals.length) {
    throw new Error("site.draft must not use a second draft: true|false literal");
  }
  const bindings = [...text.matchAll(/\bconst draft = (true|false);/g)];
  if (bindings.length !== 1) {
    throw new Error(`Expected exactly one const draft = true|false, found ${bindings.length}`);
  }
  return bindings[0][1] === "true";
}

export function readAdopted(source, block) {
  const match = String(source).match(new RegExp(`${block}:\\s*\\{[\\s\\S]*?\\badopted:\\s*(true|false)`));
  if (!match) throw new Error(`Could not read ${block}.adopted`);
  return match[1] === "true";
}

export function includeInSitemap(pathname, { privacyAdopted, disclaimerAdopted }) {
  if (pathname.startsWith("/concepts")) return false;
  if (pathname.startsWith("/enquiry-received")) return false;
  if (pathname === "/404" || pathname === "/404/") return false;
  if ((pathname === "/privacy" || pathname === "/privacy/") && !privacyAdopted) return false;
  if ((pathname === "/disclaimer" || pathname === "/disclaimer/") && !disclaimerAdopted) return false;
  return true;
}

export function pageRobots({ siteDraft, forceNoindex = false }) {
  return siteDraft || forceNoindex ? "noindex, nofollow" : "index, follow";
}
