export const MAX_UPLOAD_BYTES: number;
export const REFERRAL_SUCCESS_PATH: string;
export interface ReferralData {
  get(name: string): unknown;
  getAll(name: string): unknown[];
}
export interface ReferralError {
  name: string;
  key: string;
}
export interface ReferralCopy {
  readonly submitLabel: string;
  readonly sending: string;
  readonly errorSummary: string;
  readonly newTitle: string;
  readonly updateTitle: string;
  readonly errors: Readonly<Record<string, string>>;
}
export function australianPhoneValid(value: string): boolean;
export function validateReferral(data: ReferralData, options?: { today?: string }): ReferralError[];
export function submitReferral(data: FormData, options?: {
  fetcher?: (url: string, options: { method: string; body: FormData }) => Promise<{ ok: boolean }>;
  navigate?: (path: string) => void;
}): Promise<void>;
export function initReferralForm(options: {
  messages: Readonly<Record<string, ReferralCopy>>;
  document?: Document;
  window?: Window;
}): void;
