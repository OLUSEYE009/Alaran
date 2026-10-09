// Add Abdulamid's verified number (country code + digits only) to open his chat directly.
// Without it, the prefilled message opens WhatsApp's contact picker instead.
export const WHATSAPP_NUMBER = "";

export function makeWhatsAppLink(message: string) {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}