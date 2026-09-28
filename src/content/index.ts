/** Single import point for all site content */
export { site, formatServiceAreasLine, type SiteContent } from "./site";
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
