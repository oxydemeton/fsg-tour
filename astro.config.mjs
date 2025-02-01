// @ts-check
import { defineConfig } from 'astro/config';


import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap()],
  compressHTML: true,
  site: "https://oxydemeton.github.io",
  base: "fsg-tour",
  cacheDir: "./buildCache",
  vite: {
    plugins: [tailwindcss()],
  },
});