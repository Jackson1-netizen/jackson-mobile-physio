/** WhatsApp entry points. Nothing is posted to this site or stored; the message is built in the browser. */
export const WHATSAPP_NUMBER = "61433479703";

/** @param {string} text */
export function whatsappUrl(text = "") {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  const message = String(text).trim();
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * @param {{ intro: string, nameLabel: string, phoneLabel: string, roleLabel: string, needLabel: string, sep: string, source: string }} copy
 * @param {{ name?: string, phone?: string, role?: string, need?: string }} fields
 */
export function consultMessage(copy, fields) {
  const lines = [copy.intro];
  for (const [label, value] of [
    [copy.nameLabel, fields.name], [copy.phoneLabel, fields.phone],
    [copy.roleLabel, fields.role], [copy.needLabel, fields.need],
  ]) {
    const clean = String(value ?? "").replace(/\s+/g, " ").trim();
    if (clean) lines.push(`${label}${copy.sep}${clean}`);
  }
  lines.push(copy.source);
  return lines.join("\n");
}
