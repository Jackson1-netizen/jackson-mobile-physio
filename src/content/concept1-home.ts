import { site } from "./site";

export const concept1Hero = {
  h1: "Mobile physiotherapy in Melbourne's eastern suburbs",
  support:
    "When you enquire, you speak directly with Jackson — the physiotherapist who personally delivers your care. Appointments available in English, Cantonese and Mandarin.",
  chips: [
    "NDIS plan & self-managed",
    "Not an NDIS registered provider",
    "AHPRA registration pending",
  ] as const,
  primaryCta: "Make an enquiry",
  secondaryCta: "Explore services",
};

export const concept1Purpose = {
  heading: "Personal mobile physiotherapy",
  body:
    "We provide one-to-one physiotherapy in your home and community across Melbourne's eastern suburbs — built on clear communication, practical goals, and care in English, Cantonese, and Mandarin. The person you speak with is the person who provides your care.",
};

export const concept1TrustHighlights = [
  { icon: "home" as const, line: "Home & community visits" },
  { icon: "plan" as const, line: "Plan-managed enquiries welcome" },
  { icon: "self" as const, line: "Self-managed enquiries welcome" },
  { icon: "ndis" as const, line: "Not an NDIS registered provider" },
  { icon: "lang" as const, line: "English · 廣東話 · 普通話" },
] as const;

export const concept1ServiceNav = [
  { label: "Mobile Physio", href: "#services", thumbKey: "mobilePhysio" as const },
  { label: "NDIS Physio", href: "#ndis", thumbKey: "ndisPhysio" as const },
  { label: "Mobility & Balance", href: "#services", thumbKey: "mobility" as const },
  { label: "Rehabilitation", href: "#services", thumbKey: "rehabilitation" as const },
  { label: "Home Exercise Programs", href: "#services", thumbKey: "homeExercise" as const },
  { label: "Community Mobility", href: "#services", thumbKey: "community" as const },
] as const;

export const concept1TrustStrip = [
  { title: "Home & community visits", body: "Physiotherapy where you live — no clinic visit required." },
  { title: "Eastern suburbs", body: "Mobile service across Melbourne's east and surrounding areas." },
  { title: "Languages", body: "English · 廣東話 · 普通話" },
  { title: "One-to-one care", body: "The person you speak with is the person who provides your care." },
] as const;

export const concept1Services = [
  "Mobile Physio",
  "NDIS Physio",
  "Mobility & Balance",
  "Strength & Functional Capacity",
  "Rehabilitation",
  "Community Mobility",
  "Home Exercise Programs",
] as const;

export const concept1Steps = [
  { title: "Get in touch", body: "Call, enquire, or ask a referrer to contact us with your suburb and goals." },
  {
    title: "Discuss needs and location",
    body: "We talk through what you need, where you are, languages, and funding context where relevant.",
  },
  {
    title: "Home or community appointment",
    body: "If suitable, we arrange a visit for assessment and planning in your environment.",
  },
] as const;

export const concept1MeetJackson = {
  heading: "Meet Jackson",
  paragraphs: [
    "Jackson is a mobile physiotherapist focused on practical, person-centred care across Melbourne's eastern suburbs.",
    "He values clear communication, realistic goals, and working with you (and your supports) in familiar settings.",
  ],
  philosophy:
    "Professional, calm, and direct — the same clinician from your first conversation through to your visits.",
  qualificationsPlaceholder: "Physiotherapy qualification — to be confirmed on public launch.",
  ahpra: site.ahpraNotice,
};

export const concept1Ndis = {
  heading: "NDIS physiotherapy enquiries",
  lead:
    "Enquiries welcome from self-managed and plan-managed NDIS participants. We are not an NDIS registered provider — please confirm funding arrangements before services commence.",
  bullets: [
    "Self-managed participants may engage directly subject to suitability and availability.",
    "Plan-managed participants — your plan manager can be involved in invoicing where agreed.",
    "We do not provide NDIA-managed (agency-managed) billing as a registered provider.",
  ],
};

export const concept1Suburbs = site.serviceAreas.suburbs;

export const concept1Faq = [
  {
    q: "Who will I speak with when I enquire?",
    a: "Jackson — the physiotherapist who would attend your home or community appointment.",
  },
  {
    q: "Are you an NDIS registered provider?",
    a: "No. We welcome plan-managed and self-managed enquiries only.",
  },
  {
    q: "Is AHPRA registration current?",
    a: "AHPRA physiotherapy registration is pending. This site does not claim current registration.",
  },
  {
    q: "Do you have a clinic I can visit?",
    a: "This is a mobile service. We do not publish a clinic address — visits are at your home or agreed community locations.",
  },
] as const;

export const concept1Nav = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#ndis", label: "NDIS" },
  { href: "#areas", label: "Service Areas" },
  { href: "#referrers", label: "Referrals" },
  { href: "#contact", label: "Contact" },
] as const;

export const concept1Phone = site.phone;
export const concept1PhoneHref = site.phoneHref;
