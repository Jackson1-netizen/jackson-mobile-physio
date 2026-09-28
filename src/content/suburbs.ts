/** Suburb landing pages — unique copy per area (English body; UI via i18n) */

export type SuburbPage = {
  slug: string;
  name: string;
  seo: {
    title: string;
    description: string;
  };
  headline: string;
  paragraphs: readonly string[];
  localPoints: readonly string[];
};

export const suburbPages: SuburbPage[] = [
  {
    slug: "box-hill",
    name: "Box Hill",
    seo: {
      title: "Mobile Physiotherapist Box Hill | WAI WA LAW",
      description:
        "Independent mobile physiotherapy in Box Hill and surrounds. English, Cantonese, and Mandarin. NDIS plan-managed and self-managed enquiries welcome — not an NDIS registered provider.",
    },
    headline: "Mobile physiotherapy in Box Hill",
    paragraphs: [
      "Box Hill and nearby neighbourhoods suit home and community-based physiotherapy — whether you live in an apartment, family home, or supported accommodation close to local shops and transport.",
      "Jackson attends you directly, so assessment reflects your real environment: steps at your entrance, furniture you use daily, and routes you take in the community.",
    ],
    localPoints: [
      "Convenient for Box Hill Central and hospital precinct surrounds (by appointment)",
      "Cantonese and Mandarin available for families and participants",
      "Plan-managed and self-managed NDIS enquiries only",
    ],
  },
  {
    slug: "doncaster",
    name: "Doncaster",
    seo: {
      title: "Mobile Physiotherapist Doncaster | WAI WA LAW",
      description:
        "Home-visit physiotherapy in Doncaster and Doncaster East. Personal mobile service in English, Cantonese, or Mandarin. AHPRA-registered physiotherapist.",
    },
    headline: "Mobile physiotherapy in Doncaster",
    paragraphs: [
      "Doncaster's mix of hillside homes, townhouses, and retirement living often makes clinic travel difficult — mobile care brings physiotherapy to where you are most comfortable.",
      "From mobility after surgery to longer-term strength and balance goals, care is planned individually after an in-home assessment.",
    ],
    localPoints: [
      "Doncaster and Doncaster East home visits by appointment",
      "Same physiotherapist from enquiry through treatment",
      "Not an NDIS registered provider — confirm plan type before starting",
    ],
  },
  {
    slug: "blackburn",
    name: "Blackburn",
    seo: {
      title: "Mobile Physiotherapist Blackburn | WAI WA LAW",
      description:
        "Mobile physio in Blackburn and Blackburn South. Eastern suburbs home visits; English, Cantonese, and Mandarin. Independent practitioner — not a corporate roster.",
    },
    headline: "Mobile physiotherapy in Blackburn",
    paragraphs: [
      "Blackburn residents often value care that fits around school runs, work, and caring roles. Mobile appointments reduce the burden of transport and waiting rooms.",
      "Sessions focus on practical function — getting safely around your home, building confidence outdoors, and working toward goals that matter to you.",
    ],
    localPoints: [
      "Blackburn, Blackburn South, and nearby streets",
      "Community-based sessions near local parks when appropriate",
      "Self-managed and plan-managed NDIS enquiries welcome",
    ],
  },
  {
    slug: "ringwood",
    name: "Ringwood",
    seo: {
      title: "Mobile Physiotherapist Ringwood | WAI WA LAW",
      description:
        "Home-visit physiotherapy in Ringwood and Ringwood East. Mobile eastern suburbs service with trilingual consultations. AHPRA-registered physiotherapist.",
    },
    headline: "Mobile physiotherapy in Ringwood",
    paragraphs: [
      "Ringwood sits at a busy crossroads of the eastern suburbs — mobile physiotherapy helps if travel to a clinic is tiring or impractical.",
      "Care may include mobility retraining, strength work, falls-prevention strategies, and support to participate in local community activities.",
    ],
    localPoints: [
      "Ringwood and Ringwood East visits",
      "Links with local GPs and coordinators via referral sheet",
      "Languages: English, Cantonese, Mandarin",
    ],
  },
  {
    slug: "burwood",
    name: "Burwood",
    seo: {
      title: "Mobile Physiotherapist Burwood | WAI WA LAW",
      description:
        "Mobile physiotherapy in Burwood and Burwood East. University and family-friendly area; home visits in English, Cantonese, or Mandarin.",
    },
    headline: "Mobile physiotherapy in Burwood",
    paragraphs: [
      "Burwood's student households, multigenerational families, and quieter residential streets all benefit from physiotherapy delivered in familiar surroundings.",
      "Jackson works with you — and your supports if you wish — to set realistic mobility and rehabilitation goals.",
    ],
    localPoints: [
      "Burwood and Burwood East service area",
      "Ideal when stairs, parking, or fatigue make clinic visits hard",
      "Funding must be confirmed before NDIS-related care",
    ],
  },
  {
    slug: "glen-waverley",
    name: "Glen Waverley",
    seo: {
      title: "Mobile Physiotherapist Glen Waverley | WAI WA LAW",
      description:
        "Home-visit physio in Glen Waverley. CALD-friendly mobile physiotherapy across Melbourne's east. NDIS non-provider honesty; plan/self-managed enquiries.",
    },
    headline: "Mobile physiotherapy in Glen Waverley",
    paragraphs: [
      "Glen Waverley's diverse community aligns well with consultations in English, Cantonese, or Mandarin — especially when family members prefer to be involved in care discussions.",
      "Mobile visits suit participants who want continuity with one physiotherapist rather than a rotating clinic roster.",
    ],
    localPoints: [
      "Glen Waverley and adjacent suburbs by arrangement",
      "CALD-friendly communication throughout care",
      "AHPRA-registered physiotherapist",
    ],
  },
  {
    slug: "mitcham",
    name: "Mitcham",
    seo: {
      title: "Mobile Physiotherapist Mitcham | WAI WA LAW",
      description:
        "Mobile physiotherapy in Mitcham and Mitcham East. Quiet residential areas; personal home-visit service. Eastern suburbs; trilingual enquiries.",
    },
    headline: "Mobile physiotherapy in Mitcham",
    paragraphs: [
      "Mitcham's leafy streets and varied housing stock mean home assessments capture the exact challenges you face — driveways, garden paths, and indoor layouts.",
      "Physiotherapy may support recovery, maintenance of independence, or NDIS-related functional goals once funding is confirmed.",
    ],
    localPoints: [
      "Mitcham and Mitcham East coverage",
      "Appointment hours by arrangement",
      "Not NDIA-managed billing — plan-managed or self-managed only",
    ],
  },
  {
    slug: "nunawading",
    name: "Nunawading",
    seo: {
      title: "Mobile Physiotherapist Nunawading | WAI WA LAW",
      description:
        "Home-visit physiotherapy in Nunawading. Mobile service for eastern suburbs participants and private clients. English, Cantonese, Mandarin.",
    },
    headline: "Mobile physiotherapy in Nunawading",
    paragraphs: [
      "Nunawading residents near major arterials still save time and energy when physiotherapy comes to the door — particularly after injury or when balance is a concern.",
      "Enquiries are handled personally by Jackson, who also delivers the hands-on care.",
    ],
    localPoints: [
      "Nunawading and surrounding pockets",
      "Referral-friendly for coordinators and GPs",
      "AHPRA-registered physiotherapist",
    ],
  },
];

export function getSuburbBySlug(slug: string): SuburbPage | undefined {
  return suburbPages.find((s) => s.slug === slug);
}

export function suburbPath(slug: string): string {
  return `/areas/${slug}`;
}
