// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://wedding.example.com",
  integrations: [sitemap()],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' }
  }
});
