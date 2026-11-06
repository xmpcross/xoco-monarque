/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    /** The current post's gallery, read by `<Gallery />` inside MDX. */
    postGallery?: {
      src: import("astro").ImageMetadata;
      alt: string;
      credit: { name: string; url: string };
    }[];
  }
}
