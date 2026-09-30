/** Single import point for all site content */
export { site, formatServiceAreasLine, getEmailHref, getReferralEmailHref, hasConfirmedEmail, type SiteContent } from "./site";
export {
  messages,
  localeLabels,
  defaultLocale,
  flattenMessages,
  getNestedValue,
  type Locale,
} from "./i18n";
export {
  suburbPages,
  getSuburbBySlug,
  suburbPath,
  type SuburbPage,
} from "./suburbs";
export {
  homeNav,
  homeHero,
  homeServices,
  homeSteps,
  homeWhy,
  homeAbout,
  homeReferrers,
  homeAreas,
  homeSuburbs,
  homeFaq,
  homeMedia,
  homePhotos,
} from "./home-motion";
