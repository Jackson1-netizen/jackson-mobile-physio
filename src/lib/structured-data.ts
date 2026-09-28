import { site } from "../content/site";

/** JSON-LD for LocalBusiness / healthcare-oriented mobile service (draft). */
export function getLocalBusinessJsonLd(): Record<string, unknown> {
  const areaServed = site.serviceAreas.suburbs.map((name) => ({
    "@type": "City",
    name: `${name}, Victoria, Australia`,
  }));

  const json: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    name: site.businessName,
    description: site.seo.description,
    url: site.websiteUrl,
    telephone: site.phone,
    areaServed,
    serviceType: "Mobile physiotherapy",
    availableLanguage: [...site.languages],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Melbourne",
      addressRegion: "VIC",
      addressCountry: "AU",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Draft status",
        value: "Site in draft; AHPRA registration pending",
      },
      {
        "@type": "PropertyValue",
        name: "AHPRA status",
        value: site.ahpraStatus,
      },
    ],
  };

  if (site.email && !site.email.includes("NOT PROVIDED")) {
    json.email = site.email;
  }

  if (site.ahpraRegistrationNumber) {
    json.additionalProperty = [
      ...(json.additionalProperty as object[]),
      {
        "@type": "PropertyValue",
        name: "AHPRA registration number",
        value: site.ahpraRegistrationNumber,
      },
    ];
  }

  return json;
}
