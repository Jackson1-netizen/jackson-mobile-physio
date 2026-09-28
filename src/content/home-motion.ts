import { site } from "./site";
import { messages } from "./i18n";
import { suburbPages, suburbPath } from "./suburbs";
import { concept1Purpose } from "./concept1-home";
import { concept1Images as images } from "./concept1-images";

export const homeNav = [
  { href: "/", label: "Home", path: "nav.home", spy: null },
  { href: "#about", label: "About", path: "nav.about", spy: "about" },
  { href: "#services", label: "Services", path: "nav.services", spy: "services" },
  { href: "#areas", label: "Service Areas", path: "nav.areas", spy: "areas" },
  { href: "#referrers", label: "For Referrers", path: "nav.forReferrers", spy: "referrers" },
  { href: "#faq", label: "FAQs", path: "nav.faq", spy: "faq" },
  { href: "#contact", label: "Contact", path: "nav.contact", spy: "contact" },
] as const;

export const homeHero = {
  eyebrow: "Mobile physiotherapy",
  h1Lead: "Expert physiotherapy",
  h1Mid: "in the comfort of",
  h1Em: "home.",
  support:
    "Personalised, evidence-based physiotherapy care in Melbourne's eastern suburbs. Helping you move better, stay independent and enjoy everyday life.",
  primaryCta: "Make an enquiry",
  secondaryCta: "Learn about our services",
  chips: [
    { icon: "home" as const, line: "Home & community visits" },
    { icon: "people" as const, line: "All ages welcome" },
    { icon: "heart" as const, line: "NDIS & private clients" },
  ],
};

export const homePhotos = {
  portrait: {
    src: "/photos/jackson-portrait.jpg",
    width: 1120,
    height: 1400,
    alt: "Jackson, Home Motion mobile physiotherapist, in a Home Motion polo",
  },
  homeWalker: {
    src: "/photos/home-walker.jpg",
    width: 819,
    height: 614,
    alt: "Jackson providing mobile physiotherapy at home, supporting walking practice with a walking frame",
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
  heading: "Our Services",
  supporting: "Supporting your movement, function and independence.",
  viewAll: "View all services",
  intro: site.servicesIntro,
  cards: [
    {
      icon: "person" as const,
      title: "Mobile Physiotherapy",
      body: "One-on-one care at home and in the community.",
      image: homePhotos.homeSeatedDumbbells,
    },
    {
      icon: "run" as const,
      title: "Mobility & Balance",
      body: "Improve safety and confidence in daily activities.",
      image: homePhotos.homeGait,
    },
    {
      icon: "dumbbell" as const,
      title: "Strength & Functional Capacity",
      body: "Build strength for independence.",
      image: homePhotos.gymStepCoaching,
    },
    {
      icon: "house" as const,
      title: "Rehabilitation After Hospitalisation",
      body: "Support your recovery and return to everyday life.",
      image: homePhotos.homeSitToStand,
    },
    {
      icon: "brain" as const,
      title: "Neurological & Disability-Related",
      body: "Tailored physiotherapy for your individual goals.",
      image: homePhotos.gymResistanceBand,
    },
    {
      icon: "clipboard" as const,
      title: "Home Exercise Programs",
      body: "Practical and individualised exercise plans.",
      image: homePhotos.gymStepStrength,
    },
  ],
};

export const homeSteps = [
  {
    num: "01",
    title: "Get in touch",
    body: "Make an enquiry and share your suburb, language and needs. You speak with Jackson — not a call centre.",
  },
  {
    num: "02",
    title: "We arrange a visit",
    body: "We talk through goals, location and funding context, then arrange a home or community appointment if suitable.",
  },
  {
    num: "03",
    title: "Personalised care",
    body: "You receive assessment and a practical plan in your environment, with the same physiotherapist for follow-up visits.",
  },
] as const;

export const homeWhy = {
  heading: "Why Choose Home Motion?",
  intro: concept1Purpose.body,
  items: [
    {
      title: "Care at home",
      body: "Physiotherapy where you live and move — no clinic visit required.",
    },
    {
      title: "Personalised approach",
      body: site.differentiator,
    },
    {
      title: "Greater independence",
      body: "Practical goals focused on mobility, function and everyday tasks that matter to you.",
    },
    {
      title: "Local and flexible",
      body: `Home and community visits across ${site.serviceAreas.region}, by appointment.`,
    },
  ],
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
  heading: "For Referrers",
  lead: "I work collaboratively with GPs, specialists and allied health professionals to support shared clients with timely, goal-oriented physiotherapy care.",
  registration: "AHPRA registered physiotherapist.",
  audience:
    "Support Coordinators, Recovery Coaches, GPs, allied health professionals, families and authorised representatives are welcome to get in touch.",
  points: [
    { icon: "notes" as const, title: "Clear communication and progress updates" },
    { icon: "group" as const, title: "Goal-oriented, client-centred care" },
    { icon: "handshake" as const, title: "Flexible and responsive service" },
  ],
  cta: "Referrer information",
};

export const homeAreas = {
  kicker: "Service Areas",
  heading: "Home and community visits across Melbourne's eastern suburbs",
  intro:
    "This is a mobile service. We do not publish a clinic or home address. Confirm travel for your location when you enquire.",
  mapCaption: "Interactive map of the eastern suburbs service area — no private address pin.",
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
