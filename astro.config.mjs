// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  output: 'static',
  server: {
    port: 4721,
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
