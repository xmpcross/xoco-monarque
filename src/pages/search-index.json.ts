import { getCollection } from "astro:content";
import {
  categories,
  categoryHref,
  entrySlug,
  formatDate,
  getAllTags,
  getCategory,
  postHref,
  tagHref,
  visiblePosts,
} from "@/lib/content";
import type { SearchItem } from "@/lib/search";

export async function GET() {
  const posts = visiblePosts(await getCollection("posts"));
  const authors = await getCollection("authors");
  const tags = getAllTags(posts);
  const items: SearchItem[] = [
    ...posts.map((post) => ({
      type: "Story" as const,
      title: post.data.title,
      meta: [
        getCategory(post.data.category)?.name ?? "",
        formatDate(post.data.date, "short"),
      ].filter(Boolean),
      keywords: `${post.data.subtitle} ${post.data.excerpt} ${post.data.tags.join(" ")} ${post.body ?? ""}`,
      href: postHref(post),
    })),
    ...authors.map((author) => ({
      type: "Author" as const,
      title: author.data.name,
      meta: [author.data.role],
      keywords: `${author.data.location} ${author.data.bio}`,
      href: `/authors/${entrySlug(author)}/`,
    })),
    ...categories.map((category) => ({
      type: "Department" as const,
      title: category.name,
      meta: [category.tagline],
      keywords: category.description,
      href: categoryHref(category.slug),
    })),
    ...tags.map((tag) => ({
      type: "Tag" as const,
      title: `#${tag.name}`,
      meta: [],
      keywords: tag.slug,
      href: tagHref(tag.name),
    })),
  ];

  return new Response(JSON.stringify(items), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}
