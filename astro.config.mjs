// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';
import { readFileSync } from 'node:fs';
import { resolveSiteOrigin } from './scripts/site-origin.mjs';
import { includeInSitemap, readAdopted } from './scripts/site-draft.mjs';

// While site.draft is true, the origin is the staging hostname or Netlify's URL.
// The public domain is used only after an explicit launch (site.draft === false).
// This does not attach a custom domain or change DNS.
const fileEnv = loadEnv(process.env.NODE_ENV ?? '', process.cwd(), '');
const site = resolveSiteOrigin({
  CONTEXT: process.env.CONTEXT,
  BRANCH: process.env.BRANCH,
  URL: process.env.URL,
  DEPLOY_PRIME_URL: process.env.DEPLOY_PRIME_URL,
  PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL || fileEnv.PUBLIC_SITE_URL,
});

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  server: {
    port: 4721,
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
    define: {
      __HM_SITE_ORIGIN__: JSON.stringify(site),
    },
  },
  integrations: [
    sitemap({
      // Unadopted legal pages stay out of the sitemap even after site.draft is false.
      filter: (page) => {
        const source = readFileSync(new URL('./src/content/site.ts', import.meta.url), 'utf8');
        const path = new URL(page).pathname;
        return includeInSitemap(path, {
          privacyAdopted: readAdopted(source, 'privacy'),
          disclaimerAdopted: readAdopted(source, 'disclaimer'),
        });
      },
    }),
  ],
});
