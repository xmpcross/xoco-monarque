export const siteConfig = {
  name: "Monarque",
  tagline: "An editorial dossier of modern luxury.",
  title: "Monarque - Luxury Editorial Astro Theme",
  description:
    "Monarque is a refined Astro and Tailwind CSS theme for luxury magazines, premium blogs, curated travel journals, and editorial brands.",
  siteUrl: "https://monarque.xocoweb.workers.dev/",
  language: "en",
  locale: "en_US",
  authorName: "Andrei Alba",
  email: "hello@example.com",
  socialImage: "/og-image.png",
  navigation: [
    { label: "Latest", href: "/blog/" },
    { label: "Authors", href: "/authors/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "X", href: "https://x.com/" },
    { label: "RSS", href: "/rss.xml" },
  ],
  home: {
    latestTitle: "This week's dispatches",
    departmentsTitle: "The house departments",
    spotlightCategory: "five-star-hotels",
    spotlightCta: "Enter the suite",
    picksTitle: "Chosen this month",
    trendingLabel: "Most read",
    emptyTitle: "Monarque is ready for your first story.",
    emptyDescription:
      "Add Markdown or MDX posts to src/content/posts and they will populate the cover story, archives, search index, RSS feed, and taxonomy pages.",
  },
  subscribe: {
    title: "The Monarque letter.",
    description: "A monthly editorial letter for readers who prefer fewer recommendations.",
  },
  pagination: {
    postsPerPage: 6,
  },
  newsletter: {
    action: "",
    method: "post",
    emailFieldName: "email",
  },
  forms: {
    newsletter: {
      action: "",
      method: "post",
      emailFieldName: "email",
      honeypotFieldName: "company",
    },
    contact: {
      action: "",
      method: "post",
      nameFieldName: "name",
      emailFieldName: "email",
      messageFieldName: "message",
      honeypotFieldName: "company",
    },
  },
  legalLinks: [
    { label: "Privacy", href: "/privacy/" },
    { label: "Terms", href: "/terms/" },
  ],
};
