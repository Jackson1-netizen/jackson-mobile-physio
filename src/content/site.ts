/**
 * Central source of truth for all business copy and contact details.
 * Do not duplicate these values in components — import from here.
 */

export const site = {
  /** Site is in draft — not a live public professional site */
  draft: true,

  businessName: "BUSINESS_NAME",
  legalNamePlaceholder: "[LEGAL BUSINESS NAME — NOT CONFIRMED]",
  tagline: "Mobile Physiotherapy",
  locationDescriptor: "Melbourne Eastern Suburbs",

  contact: {
    phone: "[PHONE PLACEHOLDER]",
    phoneHref: "tel:+61000000000",
    email: "[EMAIL PLACEHOLDER]",
    emailHref: "mailto:email@placeholder.example",
    websiteDisplay: "[WEBSITE URL PLACEHOLDER]",
    websiteUrl: "https://example.placeholder",
  },

  practitioner: {
    name: "[PRACTITIONER NAME PLACEHOLDER]",
    credentialsPlaceholder: "[CREDENTIALS — NOT CONFIRMED]",
    bioPlaceholder:
      "[Short practitioner bio placeholder — to be confirmed. No qualifications or years of experience stated until verified.]",
  },

  ahpra: {
    status: "submitted_not_granted" as const,
    notice:
      "AHPRA physiotherapy registration has been submitted and is not yet granted. This site is in draft and does not represent a currently AHPRA-registered physiotherapy practice.",
    registrationNumberPlaceholder: "[AHPRA REGISTRATION NUMBER — NOT GRANTED]",
  },

  languages: ["English", "Cantonese", "Mandarin"] as const,

  serviceAreas: [
    "Box Hill",
    "Doncaster",
    "Blackburn",
    "Ringwood",
    "Burwood",
    "Glen Waverley",
    "Mitcham",
    "Nunawading",
  ] as const,

  differentiator:
    "When you enquire, you speak with the physiotherapist who personally delivers your care — not a call centre or rotating roster.",

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

  ndis: {
    heading: "NDIS enquiries",
    intro:
      "Plan-managed and self-managed NDIS participants are welcome to enquire. We can discuss whether mobile physiotherapy may suit your goals and how sessions might be arranged.",
    bullets: [
      "Enquiries welcome from participants, families, and support coordinators.",
      "Funding and eligibility are determined by the NDIA and your plan — we cannot guarantee funding or eligibility.",
      "We are not stating NDIS provider registration status on this draft site; please ask directly about current arrangements.",
    ],
    disclaimer:
      "This is general information only, not financial or NDIS plan advice. Confirm details with your planner or support coordinator.",
  },

  referral: {
    heading: "Refer a participant",
    intro:
      "For support coordinators, families, and participants: share basic details and we will respond when available. No clinical information is required in your first message.",
    ctaLabel: "Refer a participant",
    emailSubject: "Participant referral enquiry — BUSINESS_NAME",
  },

  draftNotice: {
    title: "Draft site — not for public use",
    body:
      "This website is a work in progress for an independent mobile physiotherapy service. Business name, registration, and contact details are placeholders. Do not rely on this page for clinical or emergency care.",
  },

  footer: {
    abnPlaceholder: "[ABN — NOT CONFIRMED]",
    privacyPlaceholder: "[Privacy policy — TO BE ADDED]",
    copyrightSuffix: "All rights reserved.",
  },

  seo: {
    siteUrl: "https://example.placeholder",
    defaultTitle: "BUSINESS_NAME | Mobile Physiotherapy — Melbourne Eastern Suburbs",
    description:
      "Draft marketing site for independent mobile physiotherapy in Melbourne's eastern suburbs. English, Cantonese, and Mandarin enquiries welcome. NDIS plan-managed and self-managed enquiries welcome.",
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

export type SiteContent = typeof site;
