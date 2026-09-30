/// <reference types="astro/client" />

interface ImportMetaEnv {
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
