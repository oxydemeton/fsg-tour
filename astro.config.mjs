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
      build: {
        reportCompressedSize: true, //Set to false to improve build speed
        minify: "terser",
      }
  },
  build: {
    concurrency: 1, //Increase to improve build performance with risk of breaking things
  }
});