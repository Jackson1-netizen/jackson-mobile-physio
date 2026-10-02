/**
 * Central source of truth for all business copy and contact details.
 * Do not duplicate these values in components — import from here.
 */

/** Public-facing enquiry identity. Display only — mailbox may not be live yet. */
const PUBLIC_BUSINESS_EMAIL = "hello@homemotionphysio.com.au";
/** Public-facing referral identity. Display only — mailbox may not be live yet. */
const REFERRAL_PUBLIC_EMAIL = "referrals@homemotionphysio.com.au";

/**
 * Used only when Astro did not inject __HM_SITE_ORIGIN__.
 * scripts/site-origin.mjs chooses the real origin: staging while site.draft
 * is true, and https://homemotionphysio.com.au only after that switch is false.
 */
const UNINJECTED_ORIGIN = "https://homemotion-staging.netlify.app";

function resolvePublicSiteOrigin(): string {
  const injected = typeof __HM_SITE_ORIGIN__ === "string" ? __HM_SITE_ORIGIN__.trim() : "";
  const value = injected || UNINJECTED_ORIGIN;
  return value.replace(/\/$/, "");
}

/** True when a config value is still an unconfirmed placeholder and must not be shown. */
export function isPlaceholder(value: string): boolean {
  const text = value.trim();
  return text.length === 0 || text.startsWith("[") || text.includes("NOT CONFIRMED") || text.includes("NOT PROVIDED");
}

export const site = {
  /**
   * LAUNCH SWITCH. While true, every page is noindex and robots.txt disallows all crawlers.
   * Set to false only when Jackson deliberately launches. See docs/LAUNCH_STATUS.md.
   */
  draft: true,

  businessName: "Home Motion",
  /** Swappable wordmark in header — rebrand without restructuring site */
  displayBrand: "Home Motion",
  practitionerName: 'Wai Wa "Jackson" Law',
  /** ABN holder. ABR records the entity as LAW, WAI WA, sole trader. */
  soleTraderName: "Wai Wa Law",
  /** ASIC registered business name. The public wordmark remains Home Motion. */
  registeredBusinessName: "Home Motion Physiotherapy",

  tagline: "Mobile Physiotherapy",
  /** Brand line in hero — swappable */
  motto: "Your physio comes to you.",
  locationDescriptor: "Melbourne Eastern Suburbs",

  phone: "0433 479 703",
  phoneHref: "tel:+61433479703",

  /**
   * Public business emails for display and future routing.
   * These mailboxes are not verified as receiving mail until domain email is configured.
   * Internal notification destinations live in env vars — never duplicate those here.
   */
  publicEmail: PUBLIC_BUSINESS_EMAIL,
  referralEmail: REFERRAL_PUBLIC_EMAIL,
  /** Alias of publicEmail for general-contact surfaces. */
  email: PUBLIC_BUSINESS_EMAIL,
  emailHref: `mailto:${PUBLIC_BUSINESS_EMAIL}?subject=${encodeURIComponent("Enquiry — Home Motion")}`,

  /**
   * Canonical origin for SEO, JSON-LD and the sitemap.
   * This does not point DNS or deploy the site. Indexing is controlled only by `draft`.
   */
  websiteUrl: resolvePublicSiteOrigin(),
  /**
   * Printed on the referral sheet as a QR code.
   * Always the public referral page, never the Netlify staging hostname.
   * Until DNS is changed, this URL still opens the VentraIP parked page.
   */
  referralSheetUrl: "https://homemotionphysio.com.au/referral/",

  /** ABN 75 612 731 757, registered to LAW, WAI WA, sole trader. */
  abn: "75 612 731 757",
  abnDisplay: "ABN 75 612 731 757",

  /**
   * General registration as a physiotherapist.
   * The expiry date is intentionally not stored or published.
   */
  ahpraRegistrationNumber: "PHY0004088824",
  registrationStatus: "registered" as "pending" | "registered",
  registrationNumber: "PHY0004088824",
  ahpraRegistrationType: "General",
  ahpraStatus: "Registered" as const,
  ahpraNotice:
    "Jackson holds general registration as a physiotherapist with AHPRA (PHY0004088824).",

  qualifications: [
    {
      label: "Physiotherapy qualification",
      value: "[DEGREE / UNIVERSITY TO BE CONFIRMED]",
    },
    {
      label: "AHPRA registration",
      value: "General registration · PHY0004088824",
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
    "Jackson (Wai Wa Law) provides a personal, mobile physiotherapy service focused on home and community-based care across Melbourne's eastern suburbs. The service is designed to make physiotherapy more accessible and convenient, with appointments available in English, Cantonese and Mandarin.",
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
  /** Approved public wording. Do not shorten this into a registration claim. */
  ndisDescription: "NDIS plan-managed and self-managed enquiries welcome.",
  ndisNotRegistered: "Home Motion is not an NDIS registered provider.",
  ndisFundingNote:
    "Funding eligibility and availability must be confirmed before care begins. Nothing on this site guarantees NDIS funding, approval, or outcomes.",

  referral: {
    heading: "Refer a participant",
    ctaLabel: "Refer a participant",
    emailSubject: "Referral enquiry — Home Motion",
    howToRefer: [
      "Phone Jackson, or email the referral address on this page. You will reach the physiotherapist who provides the service.",
      "For a first contact, a name, phone number, suburb, preferred language, and whether the enquiry is plan-managed or self-managed is enough.",
      "Please do not include health information or other sensitive details in the first email.",
    ],
  },

  draftNotice: {
    title: "Draft site — not for public use",
    body:
      "This website is a private draft for Home Motion, a mobile physiotherapy service in Melbourne's eastern suburbs. It is not indexed. AHPRA physiotherapy registration has been granted. Public email addresses are listed, but those mailboxes are not verified yet. Do not use this page for clinical or emergency care.",
  },

  footer: {
    copyrightSuffix: "All rights reserved.",
    privacyLinkLabel: "Privacy (draft)",
    disclaimerLinkLabel: "Disclaimer (draft)",
  },

  privacy: {
    pageTitle: "Privacy policy (draft)",
    metaDescription:
      "Draft privacy policy for people who contact Home Motion, a mobile physiotherapy practice in Melbourne's eastern suburbs. Pending owner review.",
    lastUpdatedLabel: "Status:",
    lastUpdated: "Draft for owner review — October 2026. Not yet adopted.",
    privacyEnquiriesContactLabel: "For privacy enquiries, contact:",
    workingDraftNotice:
      "This privacy policy is a draft pending review by Jackson. It is not legal advice and has not been adopted. Do not treat it as the practice's final policy until he approves it.",
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "Home Motion Physiotherapy is a registered business name of Wai Wa Law (Jackson Law), a sole trader (ABN 75 612 731 757), providing mobile physiotherapy in Melbourne's eastern suburbs. When you enquire, you are contacting the physiotherapist who provides the service. Jackson holds general registration as a physiotherapist with AHPRA (PHY0004088824).",
          "This policy describes how the practice handles personal information, including health information, in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles. In Victoria, the Health Records Act 2001 (Vic) may also apply to health information. This draft is written in plain language for review. It is not a complete statement of every legal duty.",
        ],
      },
      {
        heading: "What this website asks for",
        paragraphs: [
          "The enquiry form is for a first contact only. It asks for your name and phone number. You may also give an email address, suburb, preferred language, whether the enquiry relates to an NDIS plan (plan-managed or self-managed), and a brief reason for getting in touch.",
          "Please do not include health information or other sensitive details in the form, in email, or in a text message. A short note is enough for us to reply. There is no online booking, payment, or clinical record on this website.",
        ],
      },
      {
        heading: "If you become a client",
        paragraphs: [
          "If physiotherapy goes ahead, the practice may collect health information that is reasonably necessary for assessment, care, professional records, invoices, and legal duties. That collection happens as part of care, not through this public form.",
          "Health information is sensitive information. It is handled with extra care and is used for the purpose it was collected, a directly related purpose you would expect, or where the law requires or authorises it.",
        ],
      },
      {
        heading: "How information is used and shared",
        paragraphs: [
          "Personal information is used to respond to enquiries, arrange appointments, provide and administer physiotherapy, communicate with you, and meet professional or legal requirements.",
          "We may share information with someone you ask us to contact, such as a family member, support coordinator, plan manager, GP, or another health professional involved in your care. We may also disclose information where you consent, where it is reasonably necessary for the service you requested, or where the law requires or authorises it.",
          "We do not sell personal information. We do not use enquiry details for unrelated marketing.",
        ],
      },
      {
        heading: "Email, storage, and overseas access",
        paragraphs: [
          "The enquiry form is handled by Netlify, the service hosting this website. Netlify stores the name, phone number, and any optional details you submit, and can email that enquiry to hello@homemotionphysio.com.au. Netlify may process and store that information outside Australia. This website does not keep its own database of form submissions.",
          "You can also email hello@homemotionphysio.com.au from your own email app. Those messages are handled by Google Workspace, which may store them outside Australia. This draft has not been legally reviewed against either arrangement.",
        ],
      },
      {
        heading: "Hosting and the service-area map",
        paragraphs: [
          "This website is hosted by Netlify. When your browser loads a page, that request can send standard connection information, such as your IP address and browser details, to Netlify.",
          "The service-area map is loaded from Esri (ArcGIS). When the map loads, standard connection information such as your IP address and browser details may be sent to Esri. The map does not ask for your location, and this website does not store those map requests.",
        ],
      },
      {
        heading: "Security, access, and correction",
        paragraphs: [
          "Reasonable steps are taken to protect personal information from misuse, loss, and unauthorised access or disclosure. No method of sending information over the internet is completely secure.",
          "You may ask for access to, or correction of, personal information the practice holds about you. Contact the address below. We may need to confirm your identity before releasing information, and some professional or legal duties limit what can be changed or deleted.",
        ],
      },
      {
        heading: "Complaints",
        paragraphs: [
          "If you have a privacy concern, contact the practice first so it can be looked at. You may also contact the Office of the Australian Information Commissioner (OAIC) at oaic.gov.au. Concerns about a health service in Victoria may also be raised with the Health Complaints Commissioner.",
        ],
      },
    ],
  },

  disclaimer: {
    pageTitle: "Website disclaimer (draft)",
    metaDescription:
      "Draft website disclaimer for Home Motion mobile physiotherapy. General information only. Pending owner review.",
    lastUpdatedLabel: "Status:",
    lastUpdated: "Draft for owner review — October 2026. Not yet adopted.",
    workingDraftNotice:
      "This disclaimer is a draft pending review by Jackson. It is not legal advice and has not been adopted.",
    sections: [
      {
        heading: "General information only",
        paragraphs: [
          "This website tells you about Home Motion and how to get in touch. It is general information about a mobile physiotherapy service. It is not a diagnosis, a treatment plan, or personal clinical advice.",
          "Reading this site, sending an enquiry, or receiving a reply does not by itself create a physiotherapist–client relationship. Care starts only when that is agreed with you.",
        ],
      },
      {
        heading: "Emergencies and urgent care",
        paragraphs: [
          "Do not use this website, the enquiry form, or email for a medical emergency or urgent health concern. In an emergency, call 000.",
        ],
      },
      {
        heading: "The practitioner",
        paragraphs: [
          "Jackson (Wai Wa Law) holds general registration as a physiotherapist with AHPRA (PHY0004088824) and is the person who provides the physiotherapy. Home Motion Physiotherapy is a registered business name of Wai Wa Law (ABN 75 612 731 757).",
          "The university qualification is not shown until it is confirmed. Professional insurance is maintained as required for practice.",
        ],
      },
      {
        heading: "NDIS",
        paragraphs: [
          "NDIS plan-managed and self-managed enquiries welcome. Home Motion is not an NDIS registered provider. Funding is not guaranteed. Eligibility, plan rules, and payment arrangements must be confirmed before services commence.",
        ],
      },
      {
        heading: "No guaranteed outcomes",
        paragraphs: [
          "Service descriptions are examples of support that may be discussed at assessment. They are not a promise of a particular treatment, result, appointment time, or travel to every address.",
        ],
      },
      {
        heading: "Draft website",
        paragraphs: [
          "While this site is marked as a draft, it is not a public professional presence and should not be relied on. Details can change before launch.",
        ],
      },
    ],
  },

  seo: {
    defaultTitle: "Home Motion | Mobile Physiotherapy — Melbourne Eastern Suburbs",
    description:
      "Home Motion provides mobile physiotherapy at home and in the community across Melbourne's eastern suburbs. Jackson Law, AHPRA-registered physiotherapist. English, Cantonese and Mandarin. NDIS plan-managed and self-managed enquiries welcome. Not an NDIS registered provider.",
    locale: "en_AU",
    ogImagePath: "/og.png",
    ogImageAlt: "Home Motion Physiotherapy",
    ogImageWidth: 1200,
    ogImageHeight: 630,
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

/** Public enquiry address is published. Does not mean the mailbox is receiving mail. */
export function hasConfirmedEmail(): boolean {
  return Boolean(site.publicEmail);
}

/** mailto to the public enquiry address. Delivery is not guaranteed until domain email is live. */
export function getEmailHref(subject = "Enquiry — Home Motion"): string {
  return `mailto:${site.publicEmail}?subject=${encodeURIComponent(subject)}`;
}

/** mailto to the public referral address. */
export function getReferralEmailHref(subject = site.referral.emailSubject): string {
  return `mailto:${site.referralEmail}?subject=${encodeURIComponent(subject)}`;
}

/** Qualification lines that are confirmed enough to show. Placeholders stay in config only. */
export function publicQualifications(): ReadonlyArray<(typeof site.qualifications)[number]> {
  return site.qualifications.filter((item) => !isPlaceholder(item.value));
}

/** Full service-area line for prose (no website URL). */
export function formatServiceAreasLine(): string {
  const { region, suburbs, surroundingNote } = site.serviceAreas;
  return `${region} — ${suburbs.join(", ")}, ${surroundingNote}`;
}

/** One-line AHPRA status for the homepage trust line. Expiry is never included. */
export function getRegistrationDisplayLine(): string {
  if (site.registrationStatus === "registered" && site.registrationNumber) {
    return `AHPRA registered physiotherapist · ${site.registrationNumber}`;
  }
  if (site.registrationStatus === "registered") {
    return "AHPRA registered physiotherapist";
  }
  return "AHPRA registration pending — not yet registered as a physiotherapist";
}

export type SiteContent = typeof site;
