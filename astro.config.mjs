// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { unified } from "@astrojs/markdown-remark";
import rehypeSlug from "rehype-slug";
import { siteConfig } from "./src/config/site.ts";

export default defineConfig({
  site: siteConfig.siteUrl,
  integrations: [sitemap(), mdx()],
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeSlug],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
