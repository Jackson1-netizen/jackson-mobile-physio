/**
 * Central source of truth for all business copy and contact details.
 * Do not duplicate these values in components — import from here.
 */

const EMAIL_PLACEHOLDER = "[EXISTING BUSINESS EMAIL — NOT PROVIDED]";

export const site = {
  /** Site is in draft — not a live public professional site */
  draft: true,

  businessName: "WAI WA LAW",
  practitionerName: 'Wai Wa "Jackson" Law',
  legalNamePlaceholder: "[LEGAL TRADING NAME IF DISTINCT — NOT CONFIRMED]",

  tagline: "Mobile Physiotherapy",
  locationDescriptor: "Melbourne Eastern Suburbs",

  phone: "0433 479 703",
  phoneHref: "tel:+61433479703",

  email: EMAIL_PLACEHOLDER,
  /** mailto without a fabricated address — subject-only until email is confirmed */
  emailHref: "mailto:?subject=Enquiry%20%E2%80%94%20WAI%20WA%20LAW",

  /**
   * Internal canonical/base URL only. Do not render on public pages.
   * Used for Astro `site`, canonical links, OG URLs, JSON-LD, sitemap.
   */
  websiteUrl: "https://example.com",

  abnDisplay: "ABN 75 612 731 757",

  ahpraRegistrationNumber: "",
  ahpraStatus: "Pending" as const,
  ahpraNotice:
    "AHPRA physiotherapy registration is pending and has not been granted. This draft site must not be read as a currently AHPRA-registered physiotherapy practice.",

  qualifications: [
    {
      label: "Physiotherapy qualification",
      value: "[DEGREE / UNIVERSITY TO BE CONFIRMED]",
    },
    {
      label: "AHPRA registration",
      value: "Pending",
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
      "This website is a work in progress for WAI WA LAW, an independent mobile physiotherapy service. AHPRA registration is pending; contact email is not yet published here. Do not rely on this page for clinical or emergency care.",
  },

  footer: {
    copyrightSuffix: "All rights reserved.",
    privacyLinkLabel: "Privacy (draft)",
  },

  privacy: {
    pageTitle: "Privacy policy (draft)",
    lastUpdated: "[MONTH YEAR — NOT CONFIRMED]",
    workingDraftNotice:
      "This privacy policy is a working draft and must be reviewed before public launch.",
    sections: [
      {
        heading: "About this policy",
        paragraphs: [
          "This draft policy describes how WAI WA LAW (draft mobile physiotherapy service) intends to handle personal information. It applies to this development website and future services once launched.",
          "This privacy policy is a working draft and must be reviewed before public launch.",
        ],
      },
      {
        heading: "What we may collect",
        paragraphs: [
          "If you contact us, we may collect information you choose to provide, such as your name, phone number, email address, general location or suburb, and information about your enquiry or referral.",
          "We do not intentionally collect sensitive information through this draft site without a clear purpose and appropriate consent.",
        ],
      },
      {
        heading: "How we may use information",
        paragraphs: [
          "We may use contact information to respond to enquiries, arrange appointments, and communicate about physiotherapy services you have asked about.",
          "We do not sell personal information.",
        ],
      },
      {
        heading: "Disclosure",
        paragraphs: [
          "We may disclose information where required by law, or to service providers who assist us to operate our practice (for example secure email or record-keeping tools), subject to appropriate confidentiality arrangements.",
        ],
      },
      {
        heading: "Storage and security",
        paragraphs: [
          "We take reasonable steps to protect personal information from misuse, loss, and unauthorised access. Specific systems and retention periods will be confirmed before public launch.",
        ],
      },
      {
        heading: "Access and complaints",
        paragraphs: [
          "You may request access to personal information we hold about you, or lodge a complaint about privacy, by contacting us using the details below.",
          "If you are not satisfied with our response, you may contact the Office of the Australian Information Commissioner (OAIC).",
        ],
      },
      {
        heading: "Contact for privacy",
        paragraphs: [
          "Privacy contact email (placeholder until confirmed):",
        ],
      },
    ],
  },

  seo: {
    defaultTitle: "WAI WA LAW | Mobile Physiotherapy — Melbourne Eastern Suburbs",
    description:
      "Draft marketing site for WAI WA LAW — independent mobile physiotherapy in Melbourne's eastern suburbs. English, Cantonese, and Mandarin enquiries welcome.",
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

export type SiteContent = typeof site;
