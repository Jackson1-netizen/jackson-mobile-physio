/// <reference types="astro/client" />

/** Set by astro.config.mjs at build time. Not a secret. */
declare const __HM_SITE_ORIGIN__: string;

interface ImportMetaEnv {
  /**
   * Public site origin for canonical URLs, Open Graph, JSON-LD and the sitemap.
   * Does not publish the site or change DNS. Indexing is controlled by site.draft.
   */
  readonly PUBLIC_SITE_URL?: string;
  /** Private enquiry inbox. Server-only. Never prefix with PUBLIC_. */
  readonly ENQUIRY_NOTIFICATION_EMAIL?: string;
  /** Private referral inbox. Server-only. Falls back to enquiry inbox if unset. */
  readonly REFERRAL_NOTIFICATION_EMAIL?: string;
  /** Set to "true" only after domain email is configured and verified. */
  readonly EMAIL_DELIVERY_READY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
