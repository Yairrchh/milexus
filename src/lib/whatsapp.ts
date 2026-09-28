import type { CartLine } from "@/context/CartContext";

export const SELLER_WHATSAPP_NUMBER = "584144853795";

export function buildOrderMessage(
  lines: CartLine[],
  subtotal: number,
  customerName?: string
): string {
  const header = customerName
    ? `Hola, soy ${customerName}. Quiero hacer este pedido al mayor en ELECTRONOVA:`
    : "Hola, quiero hacer este pedido al mayor en ELECTRONOVA:";

  const items = lines
    .map((l) => {
      const lineTotal = ((l.product.price ?? 0) * l.qty).toFixed(2);
      return `• ${l.product.name} (${l.color}, ${l.size}) x${l.qty} — $${lineTotal}`;
    })
    .join("\n");

  return `${header}\n\n${items}\n\nTotal: $${subtotal.toFixed(2)}`;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
