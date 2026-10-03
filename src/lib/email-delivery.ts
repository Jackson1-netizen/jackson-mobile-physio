/**
 * Server-only enquiry routing.
 *
 * Public identity (safe to render) lives in `src/content/site.ts`.
 * Internal notification destinations are environment variables and must never
 * be imported into client scripts or passed through Astro `define:vars`.
 *
 * This module does not send mail. The live enquiry path is Netlify Forms.
 * SMTP is not used. See docs/EMAIL_SETUP.md.
 */

import { site } from "../content/site";

export type EnquiryChannel = "enquiry" | "referral";

export type DeliveryResult =
  | { ok: true; via: "notification" }
  | { ok: false; reason: "not_configured" | "transport_not_implemented" };

function readServerEnv(name: "ENQUIRY_NOTIFICATION_EMAIL" | "REFERRAL_NOTIFICATION_EMAIL" | "EMAIL_DELIVERY_READY"): string {
  const env = import.meta.env as Record<string, string | undefined>;
  return (env[name] ?? "").trim();
}

/** Public To: address for a channel. Safe to show on the site. */
export function getPublicEmail(channel: EnquiryChannel): string {
  return channel === "referral" ? site.referralEmail : site.publicEmail;
}

/**
 * Private inbox for notifications. Returns null when unset.
 * Call only from server code. Never serialise this value into HTML or JS.
 */
export function getEnquiryNotificationEmail(): string | null {
  const value = readServerEnv("ENQUIRY_NOTIFICATION_EMAIL");
  return value && !value.startsWith("[") ? value : null;
}

export function getReferralNotificationEmail(): string | null {
  const value = readServerEnv("REFERRAL_NOTIFICATION_EMAIL");
  if (value && !value.startsWith("[")) return value;
  return getEnquiryNotificationEmail();
}

/**
 * True only when Jackson has explicitly enabled delivery AND a private
 * notification address exists. Does not mean SMTP is implemented.
 */
export function isEmailDeliveryReady(): boolean {
  return readServerEnv("EMAIL_DELIVERY_READY").toLowerCase() === "true" && Boolean(getEnquiryNotificationEmail());
}

/**
 * Future send path. Until SMTP exists this always reports not ready
 * even if EMAIL_DELIVERY_READY is set — do not claim a message was sent.
 */
export async function deliverEnquiry(_input: {
  channel: EnquiryChannel;
  subject: string;
  body: string;
  replyTo?: string;
}): Promise<DeliveryResult> {
  if (!isEmailDeliveryReady()) {
    return { ok: false, reason: "not_configured" };
  }
  return { ok: false, reason: "transport_not_implemented" };
}
