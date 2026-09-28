import { site } from "../content/site";

/** JSON-LD for LocalBusiness / healthcare-oriented mobile service (draft placeholders). */
export function getLocalBusinessJsonLd(): Record<string, unknown> {
  const areaServed = site.serviceAreas.map((name) => ({
    "@type": "City",
    name: `${name}, Victoria, Australia`,
  }));

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    name: site.businessName,
    description: site.seo.description,
    url: site.seo.siteUrl,
    telephone: site.contact.phone,
    email: site.contact.email,
    areaServed,
    serviceType: "Mobile physiotherapy",
    availableLanguage: [...site.languages],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Melbourne",
      addressRegion: "VIC",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -37.8136,
      longitude: 145.0,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Draft status",
        value: "Site in draft; AHPRA registration not granted",
      },
    ],
  };
}
