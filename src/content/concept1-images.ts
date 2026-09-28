/**
 * Concept 1 homepage imagery — generic people-in-care scenes only.
 * Not Jackson, not real clients. Swap URLs here after Jackson's shoot.
 */
export const concept1Images = {
  heroVideo: {
    mp4: "https://videos.pexels.com/video-files/4761418/4761418-hd_1920_1080_25fps.mp4",
    poster:
      "https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Generic physiotherapist guiding a client through exercise with a therapy band — not Jackson or a specific client",
  },
  physioAtHome: {
    src: "https://images.pexels.com/photos/8421524/pexels-photo-8421524.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Generic hands-on physiotherapy support at home — illustrative only",
  },
  physioAtHomeVideo: {
    mp4: "https://videos.pexels.com/video-files/6550162/6550162-hd_1920_1080_25fps.mp4",
    poster:
      "https://images.pexels.com/photos/4506105/pexels-photo-4506105.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Generic home-visit mobility assistance — not Jackson or a specific client",
  },
  meetJackson: {
    src: "https://images.pexels.com/photos/4506105/pexels-photo-4506105.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Generic practitioner supporting a client with movement — placeholder, not Jackson's portrait",
  },
  mobility: {
    src: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Generic community walking practice with support — illustrative stock scene",
  },
  serviceThumbs: {
    mobilePhysio:
      "https://images.pexels.com/photos/4506164/pexels-photo-4506164.jpeg?auto=compress&cs=tinysrgb&w=400",
    ndisPhysio:
      "https://images.pexels.com/photos/5680177/pexels-photo-5680177.jpeg?auto=compress&cs=tinysrgb&w=400",
    mobility:
      "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=400",
    rehabilitation:
      "https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=400",
    homeExercise:
      "https://images.pexels.com/photos/8419752/pexels-photo-8419752.jpeg?auto=compress&cs=tinysrgb&w=400",
    community:
      "https://images.pexels.com/photos/3823063/pexels-photo-3823063.jpeg?auto=compress&cs=tinysrgb&w=400",
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
