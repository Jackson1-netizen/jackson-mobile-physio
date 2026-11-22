export const WHATSAPP_NUMBER: string;
export function whatsappUrl(text?: string): string;
export function consultMessage(
  copy: { intro: string; nameLabel: string; phoneLabel: string; roleLabel: string; needLabel: string; sep: string; source: string },
  fields: { name?: string; phone?: string; role?: string; need?: string },
): string;
