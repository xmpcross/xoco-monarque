# Changelog

All notable changes to Monarque are documented here.

## 2.0.0 - 2026-11-04

- Updated Astro to 7.4.5 and other dependencies.
- Added MDX support for posts.
- Added justified photo galleries, placeable anywhere in an MDX post with `<Gallery />`.
- Added photos to the private island resorts gallery.
- Added a share sheet at the end of every article and a share button in the byline.
- Added an author byline and an author card to articles.
- Removed categories from the article sidebar.
- Redesigned the homepage with a most-read strip in the hero, latest dispatches, department tiles, a spotlight story, and editor's picks.
- The home hero headline links to the featured story.
- Replaced the category drawer with a departments megamenu, full screen on mobile.
- Added a Subscribe button to the header.
- Search shows results only once you type, ranked with title matches first, with arrow-key navigation and a `/` shortcut.
- Moved the newsletter sign-up into the footer, social links under Useful Links, and the copyright into a bottom bar.
- Removed eyebrow labels.
- Refined colours, buttons, chips, post cards, and section spacing.
- Headings and paragraphs wrap without orphans.
- Scroll reveals are faster and no longer hide content on the first screen.
- Renamed the Open Graph image to `og-image.png`.
- Restructured the README and moved setup and content details into `CUSTOMIZATION.md`.

## 1.1.1 - 2026-10-21

- Updated Astro to 7.4.1 and other dependencies.
- Updated `AGENTS.md` for Astro 7.
- Files check out with LF line endings on every platform.

## 1.1.0 - 2026-07-31

- Updated Astro to 7.1.6, `@astrojs/markdown-remark` to 7.2.2, and `@astrojs/check` to 0.9.10.
- Updated transitive dependencies to resolve three high-severity advisories in `svgo`, `postcss`, and `fast-xml-parser`.
- Rewrote `AGENTS.md` as an agent-facing guide with instruction precedence, pre-change inspection, change discipline, verification, and completion-report sections.
- Fixed mobile lightbox gallery swipes firing both pointer and touch handlers on modern browsers.

## 1.0.0 - 2026-07-10

- Initial commercial-ready Astro theme release.
- Added Astro 7 templates for home, blog archive, article pages, category archives, author pages, about, contact, newsletter, RSS, robots, sitemap, and 404.
- Added Tailwind CSS 4 design tokens and static-first Astro components.
- Added typed content collections for posts and authors.
- Organized every blog post in its own folder with `index.md` and colocated images.
- Added responsive Astro image handling with Sharp.
- Added canonical URLs, Open Graph, Twitter/X cards, RSS, robots, sitemap generation, and JSON-LD.
- Added accessible landmarks, skip link, visible focus states, semantic forms, and reduced-motion handling.
- Added premium header, search, footer, article table-of-contents, and homepage editorial layout polish.
- Added subtle site-wide scroll reveal animations with reduced-motion support.
