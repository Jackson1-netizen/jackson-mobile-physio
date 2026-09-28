/**
 * Concept 1 homepage imagery — generic illustrative photos only.
 * Not Jackson, not real clients. Swap URLs here after Jackson's shoot.
 */
export const concept1Images = {
  heroVideo: {
    mp4: "https://videos.pexels.com/video-files/8434144/8434144-hd_1920_1080_25fps.mp4",
    poster:
      "https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Generic home-visit physiotherapy exercise scene — not Jackson or a specific client",
  },
  hero: {
    src: "https://images.unsplash.com/photo-1556912173-46c735c5fb72?auto=format&fit=crop&w=1600&q=80",
    alt: "Illustrative bright home interior — placeholder for home-visit physiotherapy context",
  },
  physioAtHome: {
    src: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1400&q=80",
    alt: "Illustrative supportive care at home — not a real client or practitioner",
  },
  mobility: {
    src: "https://images.unsplash.com/photo-1519824145375-de6a1bc34e70?auto=format&fit=crop&w=1200&q=80",
    alt: "Illustrative community mobility and walking — generic stock scene",
  },
  meetJackson: {
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80",
    alt: "Abstract clinical calm texture — placeholder until practitioner portrait is available",
  },
} as const;

export type Concept1Theme = "a" | "b" | "c";

export const concept1ThemeMeta: Record<
  Concept1Theme,
  { label: string; description: string }
> = {
  a: {
    label: "A — Forest / Sage",
    description: "Health-forward, premium green — current Editorial Forest direction.",
  },
  b: {
    label: "B — Sand / Olive",
    description: "Warm neutral boutique — approachable, calm, older-adult friendly.",
  },
  c: {
    label: "C — Teal / Deep Green",
    description: "Modern fresh teal accent — crisp allied-health professionalism.",
  },
};
