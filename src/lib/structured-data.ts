import { site, hasConfirmedEmail } from "../content/site";
import { messages } from "../content/i18n";

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
        value: "Site in draft; AHPRA physiotherapy registration granted",
      },
      {
        "@type": "PropertyValue",
        name: "AHPRA status",
        value: site.ahpraStatus,
      },
    ],
  };

  if (hasConfirmedEmail()) {
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

/** FAQPage schema from English FAQ copy (SEO baseline). */
export function getFaqJsonLd(): Record<string, unknown> {
  const items = messages.en.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items,
  };
}
