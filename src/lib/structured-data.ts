import { site } from "../content/site";
import { messages } from "../content/i18n";
import { draftStatusProperties } from "./draft-schema.mjs";

/** JSON-LD for LocalBusiness / healthcare-oriented mobile service. */
export function getLocalBusinessJsonLd(): Record<string, unknown> {
  const areaServed = site.serviceAreas.suburbs.map((name) => ({
    "@type": "City",
    name: `${name}, Victoria, Australia`,
  }));

  const json: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    name: site.registeredBusinessName,
    alternateName: [site.displayBrand, site.practitionerName],
    description: site.seo.description,
    url: `${site.websiteUrl}/`,
    telephone: site.phoneHref.replace(/^tel:/, ""),
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
      ...draftStatusProperties(site.draft),
      {
        "@type": "PropertyValue",
        name: "AHPRA status",
        value: site.ahpraStatus,
      },
    ],
  };

  if (site.publicEmail) {
    json.email = site.publicEmail;
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
