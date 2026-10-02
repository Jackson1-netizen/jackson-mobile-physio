# Deployment (prepared, not activated)

This file describes how the site is meant to go live. It does not connect a host, change DNS, or issue a certificate.

## Do not do these yet

- Do not point `homemotionphysio.com.au` away from its current VentraIP parking page.
- Do not add a GitHub Pages, Vercel, Netlify, or Cloudflare project unless Jackson asks.
- Do not set `draft` to `false` until the checklist in `docs/LAUNCH_STATUS.md` is actually done.

## What is already prepared

| Piece | Where | What it does |
| --- | --- | --- |
| Launch switch | `draft` in `src/content/site.ts` | `true`: `noindex, nofollow`, draft banner, `robots.txt` disallows `/`. `false`: indexable, banner off, robots allow `/` and list the sitemap. `/concepts/` stays disallowed either way. |
| Production origin | `PUBLIC_SITE_URL` or the default `https://homemotionphysio.com.au` | Canonical URLs, Open Graph, JSON-LD, and the Astro sitemap. See `.env.example`. Changing it does not publish anything. |
| Build | `npm run build` | Static files in `dist/`. No server, database, or mail sender. |

`astro.config.mjs` reads `PUBLIC_SITE_URL` at build time and falls back to `https://homemotionphysio.com.au`. Keep that fallback in step with `src/content/site.ts`.

## When a host is chosen

1. Build with `PUBLIC_SITE_URL=https://homemotionphysio.com.au`.
2. Upload `dist/` only after Jackson asks.
3. At VentraIP, point the domain at that host and turn on HTTPS. Leave this until the host is ready.
4. Confirm `https://homemotionphysio.com.au` serves this site, not the parked page.
5. Only then set `site.draft` to `false` and rebuild.

Suggested host settings, for later: static output, Node 22 or newer for the build, publish directory `dist`. No environment secrets are required for the static site. Do not put private email addresses in the host’s public env.

## Email is separate from the website

Google Workspace already receives mail for the domain. The website only opens the visitor’s own email app. DKIM and DMARC still need to be added in DNS before treating mail as fully authenticated. Details: `docs/EMAIL_SETUP.md`.
