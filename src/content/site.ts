/**
 * Central source of truth for all business copy and contact details.
 * Do not duplicate these values in components — import from here.
 */

const EMAIL_PLACEHOLDER = "[EXISTING BUSINESS EMAIL — NOT PROVIDED]";

export const site = {
  /** Site is in draft — not a live public professional site */
  draft: true,

  businessName: "Home Motion",
  /** Swappable wordmark in header — rebrand without restructuring site */
  displayBrand: "Home Motion",
  practitionerName: 'Wai Wa "Jackson" Law',
  legalNamePlaceholder: "[LEGAL TRADING NAME IF DISTINCT — NOT CONFIRMED]",

  tagline: "Mobile Physiotherapy",
  /** Brand line in hero — swappable */
  motto: "Your physio comes to you.",
  locationDescriptor: "Melbourne Eastern Suburbs",

  phone: "0433 479 703",
  phoneHref: "tel:+61433479703",

  email: EMAIL_PLACEHOLDER,
  /** mailto without a fabricated address — subject-only until email is confirmed */
  emailHref: "mailto:?subject=Enquiry%20%E2%80%94%20Home%20Motion",

  /**
   * Internal canonical/base URL only. Do not render on public pages.
   * Used for Astro `site`, canonical links, OG URLs, JSON-LD, sitemap.
   */
  websiteUrl: "https://example.com",

  abnDisplay: "ABN 75 612 731 757",

  ahpraRegistrationNumber: "",
  registrationStatus: "registered" as "pending" | "registered",
  registrationNumber: null as string | null,
  ahpraStatus: "Registered" as const,
  ahpraNotice:
    "AHPRA physiotherapy registration has been granted. Jackson is an AHPRA-registered physiotherapist.",

  qualifications: [
    {
      label: "Physiotherapy qualification",
      value: "[DEGREE / UNIVERSITY TO BE CONFIRMED]",
    },
    {
      label: "AHPRA registration",
      value: "Registered",
    },
    {
      label: "Professional insurance",
      value: "Maintained as required for practice",
    },
  ] as const,

  languages: ["English", "Cantonese", "Mandarin"] as const,

  serviceAreas: {
    region: "Melbourne Eastern Suburbs",
    suburbs: [
      "Box Hill",
      "Doncaster",
      "Blackburn",
      "Ringwood",
      "Burwood",
      "Glen Waverley",
      "Mitcham",
      "Nunawading",
    ],
    surroundingNote: "and surrounding areas",
  },

  /** For docs / internal reference — not shown on the public marketing site */
  businessHours: [
    { days: "Monday–Friday", hours: "By appointment" },
    { days: "Saturday", hours: "By appointment" },
    { days: "Sunday", hours: "Closed" },
  ] as const,

  aboutParagraphs: [
    "Jackson provides a personal, mobile physiotherapy service focused on home and community-based care across Melbourne's eastern suburbs. The service is designed to make physiotherapy more accessible and convenient, with appointments available in English, Cantonese and Mandarin.",
    "Jackson has experience working with people in community and disability settings and values practical, individualised care focused on mobility, function and meaningful everyday goals.",
  ] as const,

  differentiator:
    "When you enquire, you speak with the physiotherapist who personally delivers your care — not a call centre or rotating roster.",

  contactCta:
    "Looking for mobile physiotherapy in Melbourne's eastern suburbs? Contact us to discuss your needs, location and appointment availability.",

  referrersCta:
    "Support Coordinators, Recovery Coaches, families and other health professionals are welcome to get in touch regarding potential referrals.",

  servicesIntro:
    "Examples of support that may be discussed at assessment. Specific care is planned individually; nothing below is a guarantee of treatment or outcomes.",

  services: [
    {
      title: "Mobility and movement",
      description:
        "Support to move more comfortably at home and in the community, tailored to your goals and environment.",
    },
    {
      title: "Strength and balance",
      description:
        "Graded exercise and practical strategies to build confidence with everyday tasks.",
    },
    {
      title: "Functional exercise",
      description:
        "Activities aligned with what matters to you — from household tasks to community outings.",
    },
    {
      title: "Falls prevention",
      description:
        "Assessment-informed approaches to reduce fall risk where appropriate; always discussed with you and your supports.",
    },
    {
      title: "Community mobility",
      description:
        "Planning and practice for getting around locally, including transport and access considerations.",
    },
    {
      title: "Rehabilitation",
      description:
        "Recovery-focused physiotherapy in familiar settings; scope and frequency agreed with you.",
    },
  ] as const,

  ndisHeading: "NDIS enquiries",
  ndisDescription:
    "Enquiries welcome from self-managed and plan-managed NDIS participants. Funding eligibility and availability should be confirmed before services commence.",

  referral: {
    heading: "Refer a participant",
    ctaLabel: "Refer a participant",
    emailSubject: "Participant referral enquiry — WAI WA LAW",
  },

  draftNotice: {
    title: "Draft site — not for public use",
    body:
      "This website is a work in progress for WAI WA LAW, an independent mobile physiotherapy service. AHPRA physiotherapy registration has been granted. Contact email is not yet published here. Do not rely on this page for clinical or emergency care.",
  },

  footer: {
    copyrightSuffix: "All rights reserved.",
    privacyLinkLabel: "Privacy (draft)",
  },

  privacy: {
    pageTitle: "Privacy policy (draft)",
    metaDescription:
      "Draft privacy policy for people who contact or use the WAI WA LAW mobile physiotherapy service.",
    lastUpdatedLabel: "Last updated:",
    lastUpdated: "[MONTH YEAR — NOT CONFIRMED]",
    paragraphs: [
      "We respect the privacy of people who contact or use our service. We may collect personal information such as your name, contact details, referral information and information you voluntarily provide when making an enquiry.",
      "Where healthcare services are provided, relevant health and clinical information may also be collected where reasonably necessary for providing care, maintaining appropriate records and meeting professional or legal obligations.",
      "Personal information is used only for purposes connected with providing and administering the service, communicating with clients or referrers, managing appointments, invoicing and meeting applicable professional or legal requirements.",
      "We do not sell personal information. Information may be disclosed to another person or organisation where the individual has provided consent, where it is reasonably necessary for providing the requested service, or where disclosure is required or authorised by law.",
      "Reasonable steps are taken to protect personal information from misuse, loss, unauthorised access or disclosure.",
      "Individuals may contact us to request access to, or correction of, personal information we hold about them.",
    ],
    privacyEnquiriesContactLabel: "For privacy enquiries, contact:",
    workingDraftNotice:
      "This privacy policy is a working draft and must be reviewed before public launch.",
  },

  seo: {
    defaultTitle: "WAI WA LAW | Mobile Physiotherapist — Melbourne Eastern Suburbs",
    description:
      "Independent mobile physiotherapy in Melbourne's eastern suburbs — Box Hill, Doncaster, Ringwood, and surrounds. English, Cantonese, and Mandarin. NDIS plan-managed and self-managed enquiries welcome. AHPRA-registered physiotherapist.",
    locale: "en_AU",
    ogImagePath: "/og-placeholder.svg",
    keywords: [
      "mobile physiotherapist Box Hill",
      "NDIS physiotherapist Box Hill",
      "Cantonese physiotherapist Melbourne",
      "Mandarin physiotherapist Melbourne",
      "Chinese physiotherapist Melbourne",
      "mobile physiotherapy eastern suburbs Melbourne",
    ],
  },
} as const;

/** Full service-area line for prose (no website URL). */
export function formatServiceAreasLine(): string {
  const { region, suburbs, surroundingNote } = site.serviceAreas;
  return `${region} — ${suburbs.join(", ")}, ${surroundingNote}`;
}

/** One-line AHPRA status for homepage trust strip. Number is shown only when Jackson supplies it. */
export function getRegistrationDisplayLine(): string {
  if (site.registrationStatus === "registered") {
    return site.registrationNumber
      ? `AHPRA registered physiotherapist · ${site.registrationNumber}`
      : "AHPRA registered physiotherapist";
  }
  return "AHPRA registration pending — not yet registered as a physiotherapist";
}

export type SiteContent = typeof site;
