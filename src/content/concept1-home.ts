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
};

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
