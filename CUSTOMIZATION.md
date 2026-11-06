# Customization Guide

Use this guide when adapting Monarque for a real publication or client site.

## Site Settings

Edit [src/config/site.ts](./src/config/site.ts) first:

- `name`, `tagline`, `title`, `description` - brand and default metadata
- `siteUrl` - the production origin. Canonical URLs, social image URLs, RSS, robots, and the sitemap all depend on it
- `authorName`, `email`, `language`, `locale`
- `socialImage` - the default Open Graph image, `/og-image.png`
- `navigation` - the header links. The first two sit after **Departments**, left of the logo, and the rest sit right of it. On mobile they are listed under the departments in the full-screen menu
- `socials` - the icons under **Follow** in the footer
- `home` - homepage section titles, the spotlight category and its button label, and the empty-state copy
- `subscribe` - the title and description beside the footer sign-up form
- `forms` - newsletter and contact form endpoints
- `pagination.postsPerPage`
- `legalLinks` - shown in the footer's bottom bar

Then update `name`, `description`, `author`, `homepage`, and `repository` in [package.json](./package.json), and replace [preview.webp](./preview.webp), [public/favicon.svg](./public/favicon.svg), and [public/og-image.png](./public/og-image.png).

## Homepage

The homepage is built from your content:

- **Cover story** - the newest post with `featured: true`, or the newest post when none is featured. Its strip shows the three newest `trending: true` posts, topped up with the latest posts.
- **Latest** - the four newest posts after the cover story and the spotlight.
- **Departments** - every category from [src/config/categories.ts](./src/config/categories.ts).
- **Spotlight** - the newest post in `home.spotlightCategory`.
- **Editor's picks** - up to four `editorsPick: true` posts not already shown above.

## Categories

Departments live in [src/config/categories.ts](./src/config/categories.ts), each with a slug, name, tagline, description, and image. The header's **Departments** menu, the homepage tiles, and the footer all list them from there. Add, remove, or rename them there, then update post frontmatter so every `category` value still matches a slug.

## Posts

Each post is a folder in [src/content/posts](./src/content/posts) with an `index.md` or `index.mdx` file and its own images:

```yaml
---
title: "Story title"
subtitle: "Longer editorial subtitle."
excerpt: "Short description for cards and metadata."
category: "luxury-travel"
author: "alessandra-vale"
date: 2026-06-14
updatedDate: 2026-06-18
cover:
  src: ./cover.jpg
  alt: "Useful image description"
  credit:
    name: "Photographer on Unsplash"
    url: "https://unsplash.com/photos/..."
gallery:
  - src: ./gallery-1.jpg
    alt: "Useful image description"
    credit:
      name: "Photographer on Unsplash"
      url: "https://unsplash.com/photos/..."
featured: false
editorsPick: false
trending: false
draft: false
tags: ["Travel", "Hotels"]
---
```

`category` must match a slug in [src/config/categories.ts](./src/config/categories.ts), and `author` must match an author folder name. `npm run build` fails with a clear message when either points to missing content. Reading time is generated from the body; add `readMinutes` to override it. Tags generate `/tag/[slug]/` archives automatically. `## ` and `### ` headings build the article's Contents sidebar.

## Galleries

A post's `gallery` photos are laid out by [src/components/PhotoGallery.astro](./src/components/PhotoGallery.astro) in justified rows: every row runs the full width at one height, every photo keeps its own proportions, and the order is never rearranged. Clicking a photo opens a lightbox with arrow-key, swipe, and Escape controls and a link to the photo's credit.

The gallery follows the article by default. In an MDX post (`index.mdx`), write `<Gallery />` on its own line to place it at that point instead:

```mdx
The last paragraph of a section.

<Gallery />

## The next section
```

`<Gallery />` takes no props; it reads the post's frontmatter `gallery`.

## Authors

Each author is a folder in [src/content/authors](./src/content/authors) with an `index.md` and an avatar. The folder name is the slug that posts use in `author`:

```yaml
---
name: "Author Name"
role: "Editor"
location: "Paris"
bio: "Short profile used on author cards."
avatar:
  src: ./avatar.jpg
  alt: "Portrait of Author Name"
  credit:
    name: "Photographer on Unsplash"
    url: "https://unsplash.com/photos/..."
social:
  - label: "Instagram"
    href: "https://instagram.com/"
---
```

The Markdown body is the long biography on the author's profile page.

## Sharing

Every article ends with [src/components/ShareCard.astro](./src/components/ShareCard.astro), and the byline carries a second share button. Both open one [ShareSheet](./src/components/ShareSheet.astro) per page, with WhatsApp, Facebook, Pinterest, email, X, Bluesky, and Threads, plus Telegram, LinkedIn, and Reddit behind **More**, and a copy-link field. On devices with a native share sheet, [ShareButton](./src/components/ShareButton.astro) uses that instead. Edit the target lists at the top of `ShareSheet.astro`.

## Search

The header search opens with the search icon, `/`, or Cmd/Ctrl+K. It shows results only once you type, and ranks title matches above labels and body text. The index is built at [src/pages/search-index.json.ts](./src/pages/search-index.json.ts) and fetched on first use; ranking lives in [src/lib/search.ts](./src/lib/search.ts).

## Forms

The footer newsletter and the contact page form are provider-neutral. Configure their endpoints in `siteConfig.forms`:

```ts
forms: {
  newsletter: {
    action: "https://example.com/newsletter",
    method: "post",
    emailFieldName: "email",
    honeypotFieldName: "company",
  },
  contact: {
    action: "https://example.com/contact",
    method: "post",
    nameFieldName: "name",
    emailFieldName: "email",
    messageFieldName: "message",
    honeypotFieldName: "company",
  },
},
```

Leave `action` empty while using the theme as a static demo, and set it to your provider's endpoint before production. The header's **Subscribe** button links to the footer form at `#subscribe`.

## Theme Tokens

Colour, typography, button, chip, prose, focus, and motion rules live in [src/styles/global.css](./src/styles/global.css). Change the `:root` token block to adjust the palette; Tailwind utilities such as `bg-ink`, `text-pearl`, and `text-gold` read those tokens.

Monarque is dark-only and square: there is no border radius on buttons, cards, images, or panels. Sections are separated by background tone (`ink` and `charcoal`) rather than rules.

Reusable classes: `.shell` (page width and gutters), `.display` (Cormorant headings), `.button` with `.button-primary`, `.button-ghost`, `.button-glass`, and `.button-sm`, `.chip`, `.surface`, `.link-line`, and `.prose` / `.article-prose` for article bodies.

## Fonts and Icons

Fonts are self-hosted WOFF2 files in [public/fonts](./public/fonts), declared in [src/styles/global.css](./src/styles/global.css): Manrope for interface text and prose, and Cormorant Garamond for display headings. The bundled files are Latin subsets; replace or extend them if your publication needs broader language coverage.

Icons are local SVG files rendered by [src/components/LocalIcon.astro](./src/components/LocalIcon.astro): Lucide in [src/icons](./src/icons) and Bootstrap Icons for the share targets in [src/icons/bootstrap](./src/icons/bootstrap). Add an icon by dropping its SVG there and registering it in `LocalIcon.astro`.

## Components and Routes

Components in [src/components](./src/components):

- `ArchiveGrid.astro`, `Pagination.astro`, `PostCard.astro`, `SectionHead.astro`
- `PhotoGallery.astro`, `PostGallery.astro` (the MDX `<Gallery />`)
- `ShareButton.astro`, `ShareCard.astro`, `ShareSheet.astro`
- `SiteHeader.astro`, `SiteFooter.astro`, `SearchDialog.astro`
- `ImageCredit.astro`, `LocalIcon.astro`

[src/layouts/BaseLayout.astro](./src/layouts/BaseLayout.astro) owns metadata, structured data, the header, the footer, the skip link, and the scroll reveal.

Routes in [src/pages](./src/pages): home, `blog/` with pagination, `blog/[slug]/`, `category/[slug]/` and `tag/[slug]/` with pagination, `authors/` and `authors/[slug]/`, `about/`, `contact/`, `privacy/`, `terms/`, `404`, plus `search-index.json`, `rss.xml`, and `robots.txt`.

## Metadata

Shared metadata is generated in [src/layouts/BaseLayout.astro](./src/layouts/BaseLayout.astro). Article pages pass `Article` JSON-LD and their cover as the social image from [src/pages/blog/[slug].astro](./src/pages/blog/[slug].astro).

## Before Launch

- Set `siteUrl` in [src/config/site.ts](./src/config/site.ts)
- Replace demo posts, images, authors, credits, contact details, and social links
- Replace the favicon, preview image, and Open Graph image
- Connect the newsletter and contact forms
- Review `/privacy/` and `/terms/` for your jurisdiction and business model
- Run `npm run release:check`, which runs Astro's type and content check, builds the site, scans the generated HTML for core metadata and broken internal links, and checks formatting
