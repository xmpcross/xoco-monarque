import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteConfig } from "@/config/site";
import { postHref, visiblePosts } from "@/lib/content";

export async function GET() {
  const posts = visiblePosts(await getCollection("posts"));

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: siteConfig.siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.date,
      link: postHref(post),
      customData: `<category>${post.data.category}</category>`,
    })),
    customData: `<language>${siteConfig.language}</language>`,
  });
}
