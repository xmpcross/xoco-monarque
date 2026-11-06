import luxuryTravelImage from "@/assets/departments/luxury-travel.jpg";
import hotelsImage from "@/assets/departments/five-star-hotels.jpg";
import fashionImage from "@/assets/departments/designer-fashion.jpg";
import supercarsImage from "@/assets/departments/supercars.jpg";
import yachtsJetsImage from "@/assets/departments/yachts-jets.jpg";
import diningImage from "@/assets/departments/fine-dining.jpg";
import watchesImage from "@/assets/departments/watches-jewelry.jpg";
import interiorsImage from "@/assets/departments/interiors.jpg";

export const categories = [
  {
    slug: "luxury-travel",
    name: "Luxury Travel",
    tagline: "Rare journeys and private addresses.",
    description:
      "Private islands, alpine retreats, villa escapes, and the discreet rituals that make travel feel considered.",
    image: luxuryTravelImage,
  },
  {
    slug: "five-star-hotels",
    name: "Five-Star Hotels",
    tagline: "Grand rooms, exacting service.",
    description:
      "Hotel openings, palace restorations, spas, suites, and destination properties worth building a trip around.",
    image: hotelsImage,
  },
  {
    slug: "designer-fashion",
    name: "Designer Fashion",
    tagline: "Quiet signals, lasting craft.",
    description:
      "Atelier fashion, materials, silhouettes, and the move from obvious logos toward exacting restraint.",
    image: fashionImage,
  },
  {
    slug: "supercars",
    name: "Supercars",
    tagline: "Engineering as sculpture.",
    description:
      "Coachbuilt automobiles, collector garages, analogue driving, and the studios shaping modern performance design.",
    image: supercarsImage,
  },
  {
    slug: "yachts-jets",
    name: "Yachts & Private Jets",
    tagline: "The choreography of arrival.",
    description:
      "Explorer yachts, private aviation, airport rituals, and the residential language of life in motion.",
    image: yachtsJetsImage,
  },
  {
    slug: "fine-dining",
    name: "Fine Dining",
    tagline: "Tables worth the flight.",
    description:
      "Restaurants, chefs, cellars, service, and the dining rooms that turn a meal into an itinerary.",
    image: diningImage,
  },
  {
    slug: "watches-jewelry",
    name: "Watches & Jewelry",
    tagline: "Independent, rare, collectible.",
    description:
      "Independent watchmakers, high jewelry ateliers, auctions, and the collectors shaping scarcity.",
    image: watchesImage,
  },
  {
    slug: "interiors",
    name: "Luxury Interiors",
    tagline: "Private rooms, deeply made.",
    description:
      "Penthouses, libraries, country houses, and the designers building spaces for privacy and permanence.",
    image: interiorsImage,
  },
] as const;

export type Category = (typeof categories)[number];
export type CategorySlug = Category["slug"];

export const categorySlugs = categories.map((category) => category.slug) as [
  CategorySlug,
  ...CategorySlug[],
];

export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
