/**
 * JSON-LD properties that describe the draft site.
 * Production schema (site.draft === false) must not include them.
 */
export function draftStatusProperties(draft) {
  if (draft !== true) return [];
  return [
    {
      "@type": "PropertyValue",
      name: "Draft status",
      value: "Site in draft; AHPRA physiotherapy registration granted",
    },
  ];
}
