// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap()],
  compressHTML: true,
  site: "https://oxydemeton.github.io",
  base: "fsg-tour",
  cacheDir: "./buildCache"
});