import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { categorySlugs } from "@/config/categories";

const creditSchema = z.object({
  name: z.string(),
  url: z.url(),
});

const authors = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/authors" }),
  schema: ({ image }) => {
    const imageSchema = z.object({
      src: image(),
      alt: z.string(),
      credit: creditSchema,
    });

    return z.object({
      name: z.string(),
      role: z.string(),
      location: z.string(),
      bio: z.string(),
      avatar: imageSchema,
      social: z
        .array(
          z.object({
            label: z.string(),
            href: z.url(),
          }),
        )
        .default([]),
    });
  },
});

const posts = defineCollection({
  loader: glob({ pattern: "**/index.{md,mdx}", base: "./src/content/posts" }),
  schema: ({ image }) => {
    const imageSchema = z.object({
      src: image(),
      alt: z.string(),
      credit: creditSchema,
    });

    return z.object({
      title: z.string(),
      subtitle: z.string(),
      excerpt: z.string(),
      category: z.enum(categorySlugs),
      author: z.string(),
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      readMinutes: z.number().int().positive().optional(),
      cover: imageSchema,
      gallery: z.array(imageSchema).default([]),
      pullQuote: z.string().optional(),
      featured: z.boolean().default(false),
      editorsPick: z.boolean().default(false),
      trending: z.boolean().default(false),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
    });
  },
});

export const collections = { authors, posts };
