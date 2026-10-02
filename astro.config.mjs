// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

// Intended production origin only. This does not deploy the site or change DNS.
// Keep in step with DEFAULT_PUBLIC_SITE_ORIGIN in src/content/site.ts.
const env = loadEnv(process.env.NODE_ENV ?? '', process.cwd(), '');
const site = (env.PUBLIC_SITE_URL || process.env.PUBLIC_SITE_URL || 'https://homemotionphysio.com.au').replace(
  /\/$/,
  '',
);

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  server: {
    port: 4721,
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      // Concept mockups stay reachable locally but are not part of the site.
      filter: (page) => !new URL(page).pathname.startsWith('/concepts'),
    }),
  ],
});
