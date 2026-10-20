import { site } from "./site";
import { messages } from "./i18n";
import { suburbPages, suburbPath } from "./suburbs";
import { concept1Images as images } from "./concept1-images";

const nav = messages.en.nav;
const hm = messages.en.hm;

export const homeNav = [
  { href: "/", label: nav.home, path: "nav.home", spy: "top" },
  { href: "#about", label: nav.about, path: "nav.about", spy: "about" },
  { href: "#services", label: nav.services, path: "nav.services", spy: "services" },
  { href: "#areas", label: nav.areas, path: "nav.areas", spy: "areas" },
  { href: "#referrers", label: nav.forReferrers, path: "nav.forReferrers", spy: "referrers" },
  { href: "#faq", label: nav.faq, path: "nav.faq", spy: "faq" },
  { href: "#contact", label: nav.contact, path: "nav.contact", spy: "contact" },
] as const;

/** Stable in-page id for a homepage service card. There are no separate service routes. */
export function serviceAnchor(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `service-${slug}`;
}

export const homeHero = {
  eyebrow: "Mobile physiotherapy",
  h1Lead: messages.en.home.h1Lead,
  h1Mid: messages.en.home.h1Mid,
  h1Em: messages.en.home.h1Em,
  support: hm.hero.support,
  primaryCta: messages.en.home.primaryCta,
  secondaryCta: messages.en.home.secondaryCta,
  chips: (["home", "people", "heart"] as const).map((icon, i) => ({ icon, line: hm.hero.chips[i] })),
};

export const homePhotos = {
  portrait: {
    src: "/photos/jackson-portrait.jpg",
    widths: [480, 640, 800, 1120],
    width: 1120,
    height: 1400,
    alt: hm.about.portraitAlt,
  },
  homeWalker: {
    src: "/photos/home-walker.jpg",
    widths: [480, 640, 819],
    width: 819,
    height: 614,
    alt: "Physiotherapist supporting walking practice with a walking frame during a home visit",
  },
  homeGait: {
    src: "/photos/home-gait-support.jpg",
    widths: [480, 640, 819],
    width: 819,
    height: 614,
    alt: hm.photos.gaitAlt,
  },
  homeSitToStand: {
    src: "/photos/home-sit-to-stand.jpg",
    widths: [480, 640, 819],
    width: 819,
    height: 614,
    alt: hm.photos.sitToStandAlt,
  },
  homeSeatedDumbbells: {
    src: "/photos/home-seated-dumbbells.jpg",
    width: 819,
    height: 614,
    alt: "Jackson guiding seated strength exercise with light weights during a home physiotherapy visit",
  },
  gymStepCoaching: {
    src: "/photos/gym-step-coaching.jpg",
    width: 819,
    height: 614,
    alt: "Jackson coaching step-box strength and functional exercise in a community gym setting",
  },
  gymStepStrength: {
    src: "/photos/gym-step-strength.jpg",
    width: 819,
    height: 614,
    alt: "Jackson coaching lower-limb strength exercise on a step box in a community gym setting",
  },
  gymResistanceBand: {
    src: "/photos/gym-resistance-band.jpg",
    width: 819,
    height: 614,
    alt: "Jackson guiding seated resistance-band exercise as part of mobile physiotherapy care",
  },
  hydroAquaDumbbells: {
    src: "/photos/hydro-aqua-dumbbells.jpg",
    width: 819,
    height: 614,
    alt: "Illustrative aquatic-setting physiotherapy with foam weights — not a Home Motion pool clinic",
  },
  hydroWalkingSupport: {
    src: "/photos/hydro-walking-support.jpg",
    width: 819,
    height: 614,
    alt: "Illustrative aquatic-setting walking support — not a Home Motion pool clinic",
  },
} as const;

export const homeServices = {
  heading: hm.services.heading,
  supporting: hm.services.supporting,
  enquire: hm.services.enquire,
  intro: site.servicesIntro,
  cards: [
    {
      icon: "person" as const,
      ...hm.services.cards[0],
    },
    {
      icon: "run" as const,
      ...hm.services.cards[1],
    },
    {
      icon: "dumbbell" as const,
      ...hm.services.cards[2],
    },
    {
      icon: "house" as const,
      ...hm.services.cards[3],
    },
    {
      icon: "brain" as const,
      ...hm.services.cards[4],
    },
    {
      icon: "clipboard" as const,
      ...hm.services.cards[5],
    },
  ],
};

export const homeMenuServices = homeServices.cards.map((card, index) => ({
  href: `#${serviceAnchor(card.title)}`,
  label: card.title,
  path: `hm.services.cards.${index}.title`,
}));

export const homeSteps = hm.how.steps.map((step, i) => ({
  num: String(i + 1).padStart(2, "0"),
  ...step,
}));

export const homeWhy = {
  kicker: hm.why.kicker,
  heading: hm.why.heading,
  intro: hm.why.intro,
  items: hm.why.items,
};

export const kitchenBenchPhoto = {
  src: "/photos/kitchen-bench.jpg",
  widths: [480, 720, 960, 1200, 1448] as const,
  width: 1448,
  height: 1086,
  alt: hm.aboutBlock.photoAlt,
};

export const homeAbout = {
  kicker: hm.aboutBlock.kicker,
  heading: hm.aboutBlock.heading,
  p1: hm.aboutBlock.p1,
  p2: hm.aboutBlock.p2,
  points: [
    { icon: "home" as const, ...hm.aboutBlock.points[0] },
    { icon: "person" as const, ...hm.aboutBlock.points[1] },
    { icon: "notes" as const, ...hm.aboutBlock.points[2] },
  ],
  cardTitle: hm.aboutBlock.cardTitle,
  cardBody: hm.aboutBlock.cardBody,
  caption: hm.aboutBlock.caption,
  ahpra: hm.aboutBlock.ahpra,
  insurance: hm.aboutBlock.insurance,
  photo: kitchenBenchPhoto,
};

export const homeBanner = hm.banner;

export const homeReferrers = {
  kicker: hm.referrers.kicker,
  heading: hm.referrers.heading,
  lead: hm.referrers.lead,
  steps: [
    { icon: "mail" as const, ...hm.referrers.steps[0] },
    { icon: "people" as const, ...hm.referrers.steps[1] },
    { icon: "clipboard" as const, ...hm.referrers.steps[2] },
  ],
  registration: hm.referrers.registration,
  ahpraLead: hm.referrers.ahpraLead,
  ahpraRest: hm.referrers.ahpraRest,
  ndisCard: hm.referrers.ndisCard,
  ndisLimit: hm.referrers.ndisLimit,
  quoteBefore: hm.referrers.quoteBefore,
  quoteWord: hm.referrers.quoteWord,
  quoteAfter: hm.referrers.quoteAfter,
  quoteBody: hm.referrers.quoteBody,
  tagline: hm.referrers.tagline,
  cta: hm.referrers.cta,
};

export const homeAreas = {
  kicker: hm.areas.kicker,
  heading: hm.areas.heading,
  lead: hm.areas.lead,
  body: hm.areas.body,
  mapCaption: hm.areas.mapCaption,
  mapChip: hm.areas.mapChip,
  cardLabel: hm.areas.cardLabel,
  logoAlt: hm.areas.logoAlt,
  cardPlace: hm.areas.cardPlace,
  cardRole: hm.areas.cardRole,
  benefits: hm.areas.benefits,
};

/** Approximate suburb centres, not practice addresses or guaranteed coverage boundaries. */
export const homeMapPins = [
  { name: "Box Hill", lat: -37.819, lng: 145.122, side: "left" },
  { name: "Doncaster", lat: -37.784, lng: 145.125, side: "right" },
  { name: "Blackburn", lat: -37.82, lng: 145.151, side: "up" },
  { name: "Ringwood", lat: -37.815, lng: 145.229, side: "down" },
  { name: "Burwood", lat: -37.851, lng: 145.113, side: "right" },
  { name: "Glen Waverley", lat: -37.878, lng: 145.164, side: "left" },
  { name: "Mitcham", lat: -37.815, lng: 145.193, side: "up" },
  { name: "Nunawading", lat: -37.819, lng: 145.176, side: "down" },
  { name: "Balwyn", lat: -37.809, lng: 145.081, side: "left" },
  { name: "Forest Hill", lat: -37.837, lng: 145.183, side: "right" },
  { name: "Caulfield", lat: -37.884, lng: 145.027, side: "left" },
  { name: "Mont Albert", lat: -37.817, lng: 145.105, side: "up" },
  { name: "Surrey Hills", lat: -37.825, lng: 145.099, side: "left" },
  { name: "Camberwell", lat: -37.843, lng: 145.069, side: "left" },
  { name: "Glen Iris", lat: -37.859, lng: 145.058, side: "left" },
  { name: "Mount Waverley", lat: -37.876, lng: 145.129, side: "down" },
  { name: "Burwood East", lat: -37.851, lng: 145.150, side: "down" },
  { name: "Blackburn South", lat: -37.839, lng: 145.153, side: "down" },
  { name: "Vermont", lat: -37.836, lng: 145.194, side: "right" },
  { name: "Vermont South", lat: -37.855, lng: 145.185, side: "down" },
  { name: "Wantirna", lat: -37.851, lng: 145.226, side: "right" },
  { name: "Doncaster East", lat: -37.790, lng: 145.167, side: "up" },
] as const;

export const homeSuburbs = site.serviceAreas.suburbs.map((name) => {
  const page = suburbPages.find((s) => s.name === name);
  return {
    name,
    href: page ? suburbPath(page.slug) : "/enquiry/",
  };
});

export const nearbyMapSuburbs = site.serviceAreas.nearbySuburbs.map((name) => ({
  name,
  href: "/enquiry/",
}));

/** Suburb landing pages only — skip any area that has no real route. */
export const homeMenuAreas = homeSuburbs.filter((area) => area.href.startsWith("/areas/"));

export const homeFaq = messages.en.faq.items;

/**
 * Homepage photo placements — each photo appears once. Hydro images are not used on the
 * homepage (no verified aquatic service); gym images are kept for other pages only.
 */
export const homeMedia = {
  hero: homePhotos.homeWalker,
  about: kitchenBenchPhoto,
  how: homePhotos.homeSitToStand,
  ndis: homePhotos.homeGait,
};

export { images, site };
