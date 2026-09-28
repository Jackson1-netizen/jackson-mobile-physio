import { site } from "./site";
import { messages } from "./i18n";
import { suburbPages, suburbPath } from "./suburbs";
import { concept1Purpose } from "./concept1-home";
import { concept1Images as images } from "./concept1-images";

const mobility = site.services.find((s) => s.title === "Mobility and movement");
const strength = site.services.find((s) => s.title === "Strength and balance");
const functional = site.services.find((s) => s.title === "Functional exercise");
const rehab = site.services.find((s) => s.title === "Rehabilitation");
const community = site.services.find((s) => s.title === "Community mobility");

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
    "Independent mobile physiotherapy in Melbourne's eastern suburbs. When you enquire, you speak directly with Jackson — the physiotherapist who personally delivers your care. Appointments in English, Cantonese and Mandarin.",
  primaryCta: "Make an enquiry",
  secondaryCta: "Learn about our services",
  scriptOverlay: "People Movement Home",
  chips: [
    { icon: "home" as const, line: "Home & community visits" },
    { icon: "lang" as const, line: "English / Cantonese / Mandarin" },
    { icon: "self" as const, line: "Personalised one-to-one care" },
  ],
};

export const homeServices = {
  kicker: "Our Services",
  heading: "Supporting your movement, function and independence.",
  viewAll: "View all services",
  intro: site.servicesIntro,
  cards: [
    {
      title: "Mobile Physiotherapy",
      body: "One-to-one physiotherapy at home and in the community across Melbourne's eastern suburbs.",
    },
    {
      title: "Mobility & Balance",
      body: mobility?.description ?? "Support to move more comfortably at home and in the community.",
    },
    {
      title: "Strength & Functional Capacity",
      body: functional?.description ?? strength?.description ?? "",
    },
    {
      title: "Rehabilitation After Hospitalisation",
      body: rehab?.description ?? "Recovery-focused physiotherapy in familiar settings; scope and frequency agreed with you.",
    },
    {
      title: "Neurological & Disability-Related",
      body: `${site.servicesIntro} Community and disability settings may be discussed where relevant — this is not a specialist registration claim.`,
    },
    {
      title: "Home Exercise Programs",
      body: community?.description ?? functional?.description ?? "Activities aligned with what matters to you, practised in your own environment.",
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
};

export const homeAbout = {
  kicker: "About",
  heading: "Meet Jackson",
  paragraphs: [...site.aboutParagraphs],
  philosophy: site.differentiator,
  languagesLabel: "Languages",
  qualificationsLabel: "Qualifications",
};

export const homeReferrers = {
  heading: "For Referrers",
  lead: "I work collaboratively with GPs, specialists and allied health professionals to support shared clients with timely, goal-oriented physiotherapy care.",
  audience:
    "Support Coordinators, Recovery Coaches, GPs, allied health professionals, families and authorised representatives are welcome to get in touch.",
  points: [
    "Clear communication and progress updates",
    "Goal-oriented, client-centred care",
    "Flexible and responsive service",
  ],
  cta: "Referral information",
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
};

export const homeSuburbs = site.serviceAreas.suburbs.map((name) => {
  const page = suburbPages.find((s) => s.name === name);
  return {
    name,
    href: page ? suburbPath(page.slug) : "/#areas",
  };
});

export const homeFaq = messages.en.faq.items;

export const homeMedia = {
  heroVideo: images.heroVideo,
  about: images.meetJackson,
  howOne: images.physioAtHome,
  howTwo: images.mobility,
};

export { images, site };
