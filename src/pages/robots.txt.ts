import type { APIRoute } from "astro";
import { site } from "../content/site";

/**
 * Indexing follows the single launch switch `site.draft`.
 * /concepts/ is archived and not built. The disallow remains so an old URL stays out of search.
 */
export const GET: APIRoute = () => {
  const lines = ["User-agent: *"];

  if (site.draft) {
    lines.push("Disallow: /", "# Draft — not for indexing. Set site.draft to false in src/content/site.ts to launch.");
  } else {
    const sitemap = new URL("/sitemap-index.xml", site.websiteUrl).href;
    lines.push("Allow: /", "Disallow: /concepts/", `Sitemap: ${sitemap}`);
  }

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
