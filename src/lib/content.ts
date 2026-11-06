import type { CollectionEntry } from "astro:content";
import { siteConfig } from "@/config/site";
import { categories, getCategory, type Category, type CategorySlug } from "@/config/categories";

export type Author = CollectionEntry<"authors">;
export type Post = CollectionEntry<"posts">;

export { categories, getCategory, type Category, type CategorySlug };

export const entrySlug = <T extends { id: string }>(entry: T) => entry.id.replace(/\/index$/, "");

export const postHref = (post: Post) => `/blog/${entrySlug(post)}/`;

export const authorHref = (author: Author) => `/authors/${entrySlug(author)}/`;

export const categoryHref = (slug: CategorySlug | string) => `/category/${slug}/`;

export const tagSlug = (tag: string) =>
  tag
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const tagHref = (tag: string) => `/tag/${tagSlug(tag)}/`;

export const byNewest = (a: Post, b: Post) => b.data.date.getTime() - a.data.date.getTime();

export const visiblePosts = (posts: Post[]) =>
  posts.filter((post) => !post.data.draft).sort(byNewest);

export const getFeaturedPost = (posts: Post[]) =>
  visiblePosts(posts).find((post) => post.data.featured) ?? visiblePosts(posts)[0];

export const readingMinutes = (post: Post) => {
  if (post.data.readMinutes) return post.data.readMinutes;

  const words = (post.body ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
};

export const getEditorsPicks = (posts: Post[], limit = 4) =>
  visiblePosts(posts)
    .filter((post) => post.data.editorsPick)
    .slice(0, limit);

export const getTrendingPosts = (posts: Post[], limit = 3) => {
  const visible = visiblePosts(posts);
  return [
    ...visible.filter((post) => post.data.trending),
    ...visible.filter((post) => !post.data.trending),
  ].slice(0, limit);
};

export const getPostsByCategory = (posts: Post[], slug: string) =>
  visiblePosts(posts).filter((post) => post.data.category === slug);

export const getAllTags = (posts: Post[]) => {
  const tagMap = new Map<string, { name: string; slug: string; count: number }>();

  visiblePosts(posts).forEach((post) => {
    post.data.tags.forEach((tag) => {
      const slug = tagSlug(tag);
      if (!slug) return;
      const current = tagMap.get(slug);
      tagMap.set(slug, {
        name: current?.name ?? tag,
        slug,
        count: (current?.count ?? 0) + 1,
      });
    });
  });

  return Array.from(tagMap.values()).sort((a, b) => a.name.localeCompare(b.name));
};

export const getPostsByTag = (posts: Post[], slug: string) =>
  visiblePosts(posts).filter((post) => post.data.tags.some((tag) => tagSlug(tag) === slug));

export const getPostsByAuthor = (posts: Post[], authorSlug: string) =>
  visiblePosts(posts).filter((post) => post.data.author === authorSlug);

export const getRelatedPosts = (posts: Post[], current: Post, limit = 3) =>
  visiblePosts(posts)
    .filter((post) => post.id !== current.id)
    .sort((a, b) => {
      const categoryScore =
        Number(b.data.category === current.data.category) -
        Number(a.data.category === current.data.category);
      return categoryScore || byNewest(a, b);
    })
    .slice(0, limit);

export const formatDate = (date: Date, style: "short" | "long" = "long") =>
  new Intl.DateTimeFormat("en-US", {
    month: style === "short" ? "short" : "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

export interface PaginationPage {
  currentPage: number;
  totalPages: number;
  basePath: string;
  previousHref?: string;
  nextHref?: string;
}

export const paginatePosts = (posts: Post[], currentPage = 1, basePath = "/blog/") => {
  const pageSize = siteConfig.pagination.postsPerPage;
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  const normalizedBase = basePath.endsWith("/") ? basePath : `${basePath}/`;
  const pageHref = (page: number) =>
    page <= 1 ? normalizedBase : `${normalizedBase}page/${page}/`;

  return {
    posts: posts.slice(start, start + pageSize),
    page: {
      currentPage: safePage,
      totalPages,
      basePath: normalizedBase,
      previousHref: safePage > 1 ? pageHref(safePage - 1) : undefined,
      nextHref: safePage < totalPages ? pageHref(safePage + 1) : undefined,
    } satisfies PaginationPage,
  };
};

export const assertValidContentRelationships = (posts: Post[], authors: Author[]) => {
  const authorSlugs = new Set(authors.map(entrySlug));
  const errors = visiblePosts(posts).flatMap((post) => {
    const postSlug = entrySlug(post);
    const postErrors: string[] = [];

    if (!getCategory(post.data.category)) {
      postErrors.push(
        `${postSlug}: category "${post.data.category}" does not exist in src/config/categories.ts`,
      );
    }

    if (!authorSlugs.has(post.data.author)) {
      postErrors.push(
        `${postSlug}: author "${post.data.author}" does not exist in src/content/authors`,
      );
    }

    post.data.tags.forEach((tag) => {
      if (!tagSlug(tag))
        postErrors.push(`${postSlug}: tag "${tag}" cannot produce a valid URL slug`);
    });

    return postErrors;
  });

  if (errors.length > 0) {
    throw new Error(`Content relationship validation failed:\n${errors.join("\n")}`);
  }
};
