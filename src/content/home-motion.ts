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

export const homeHero = {
  eyebrow: "Mobile physiotherapy",
  h1Lead: "Expert physiotherapy",
  h1Mid: "in the comfort of",
  h1Em: "home.",
  support: hm.hero.support,
  primaryCta: messages.en.home.primaryCta,
  secondaryCta: messages.en.home.secondaryCta,
  chips: (["home", "people", "heart"] as const).map((icon, i) => ({ icon, line: hm.hero.chips[i] })),
};

export const homePhotos = {
  portrait: {
    src: "/photos/jackson-portrait.jpg",
    width: 1120,
    height: 1400,
    alt: hm.about.portraitAlt,
  },
  homeWalker: {
    src: "/photos/home-walker.jpg",
    width: 819,
    height: 614,
    alt: hm.hero.photoAlt,
  },
  homeGait: {
    src: "/photos/home-gait-support.jpg",
    width: 819,
    height: 614,
    alt: "Jackson supporting standing and gait practice during a home physiotherapy visit",
  },
  homeSitToStand: {
    src: "/photos/home-sit-to-stand.jpg",
    width: 819,
    height: 614,
    alt: "Jackson coaching sit-to-stand practice at home during a physiotherapy visit",
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

export const homeSteps = hm.how.steps.map((step, i) => ({
  num: String(i + 1).padStart(2, "0"),
  ...step,
}));

export const homeWhy = {
  kicker: hm.why.kicker,
  heading: hm.why.heading,
  intro: hm.why.intro,
  items: hm.why.items,
  photos: [homePhotos.homeSeatedDumbbells, homePhotos.hydroAquaDumbbells],
  hydroCaption:
    "Illustrative aquatic-setting care only. Home Motion is a mobile home and community physiotherapy service — we do not run a pool clinic.",
};

export const homeAbout = {
  kicker: "About",
  heading: "Meet Jackson",
  name: site.practitionerName,
  role: site.tagline,
  paragraphs: [...site.aboutParagraphs],
  philosophy: site.differentiator,
  languagesLabel: "Languages",
  qualificationsLabel: "Qualifications",
  photo: homePhotos.portrait,
};

export const homeReferrers = {
  heading: hm.referrers.heading,
  lead: hm.referrers.lead,
  registration: hm.referrers.registration,
  audience:
    "Support Coordinators, Recovery Coaches, GPs, allied health professionals, families and authorised representatives are welcome to get in touch.",
  points: [
    { icon: "notes" as const, title: hm.referrers.points[0] },
    { icon: "group" as const, title: hm.referrers.points[1] },
    { icon: "handshake" as const, title: hm.referrers.points[2] },
  ],
  cta: hm.referrers.cta,
};

export const homeAreas = {
  kicker: hm.areas.heading,
  heading: hm.areas.lead,
  intro:
    "This is a mobile service. We do not publish a clinic or home address. Confirm travel for your location when you enquire.",
  mapCaption: hm.areas.mapCaption,
  cardLabel: hm.areas.cardLabel,
  mapLinkLabel: "Open eastern Melbourne on OpenStreetMap",
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=145.02%2C-37.90%2C145.28%2C-37.76&layer=mapnik",
  mapExternal: "https://www.openstreetmap.org/#map=12/-37.82/145.15",
  motto: "People Movement Home",
  cardPlace: "Melbourne's Eastern Suburbs",
};

/**
 * Draft visual on the business card only.
 * Not a confirmed inbox — do not copy into site.email or the enquiry mailto.
 */
export const homeCardEmail = "hello@homemotionphysio.au";

/** Suburb centres for the service-area map. Not a home or clinic address. */
export const homeMapPins = [
  { name: "Box Hill", lat: -37.819, lng: 145.1227 },
  { name: "Doncaster", lat: -37.788, lng: 145.124 },
  { name: "Blackburn", lat: -37.8197, lng: 145.1515 },
  { name: "Ringwood", lat: -37.8116, lng: 145.2296 },
  { name: "Burwood", lat: -37.8498, lng: 145.1135 },
  { name: "Glen Waverley", lat: -37.8796, lng: 145.1648 },
  { name: "Mitcham", lat: -37.817, lng: 145.1928 },
  { name: "Nunawading", lat: -37.8203, lng: 145.1771 },
] as const;

export const homeSuburbs = site.serviceAreas.suburbs.map((name) => {
  const page = suburbPages.find((s) => s.name === name);
  return {
    name,
    href: page ? suburbPath(page.slug) : "/#areas",
  };
});

export const homeFaq = messages.en.faq.items;

export const homeMedia = {
  hero: homePhotos.homeWalker,
  about: homePhotos.portrait,
  howOne: homePhotos.homeGait,
  howTwo: homePhotos.homeSitToStand,
  whyHome: homePhotos.homeSeatedDumbbells,
  whyHydro: homePhotos.hydroAquaDumbbells,
  ndis: homePhotos.homeGait,
  areasBackdrop: homePhotos.homeWalker,
};

export { images, site };
