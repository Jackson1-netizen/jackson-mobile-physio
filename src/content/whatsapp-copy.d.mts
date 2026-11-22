interface WhatsAppCopy {
  header: string; headerHref: string; title: string; lead: string; name: string; phone: string; role: string; need: string;
  selectOne: string; roleOptions: string[]; needOptions: string[]; button: string; note: string;
  nameRequired: string; phoneRequired: string;
  message: { intro: string; nameLabel: string; phoneLabel: string; roleLabel: string; needLabel: string; sep: string; source: string };
}
export const whatsappCopy: Record<"en" | "zh-Hant" | "zh-Hans", WhatsAppCopy>;
