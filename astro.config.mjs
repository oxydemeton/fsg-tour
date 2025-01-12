// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  compressHTML: true,
  site: "https://oxydemeton.github.io",
  base: "fsg-tour",
  cacheDir: "./buildCache"
});