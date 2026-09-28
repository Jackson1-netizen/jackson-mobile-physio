import type { APIRoute } from "astro";
import { site } from "../content/site";

export const GET: APIRoute = () => {
  const sitemap = new URL("sitemap-index.xml", site.websiteUrl).href;
  const body = [
    "User-agent: *",
    "Disallow: /",
    `# Draft site — update when launching. Sitemap placeholder: ${sitemap}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
