"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, type CartLine } from "@/context/CartContext";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export default function CheckoutPanel({
  lines,
  subtotal,
}: {
  lines: CartLine[];
  subtotal: number;
}) {
  const { close, clearCart } = useCart();
  const [name, setName] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const isEmpty = lines.length === 0;

  const handleCheckoutClick = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    const message = buildOrderMessage(lines, subtotal, name.trim() || undefined);
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    clearCart();
    setIsConfirming(false);
    close();
  };

  return (
    <div className="border-t border-ml-grey/20 px-5 py-4">
      <label htmlFor="checkout-name" className="mb-1 block text-xs uppercase tracking-wide text-ml-grey">
        Tu nombre (opcional)
      </label>
      <input
        id="checkout-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ej: María Pérez"
        className="mb-4 w-full rounded border border-ml-grey/30 bg-ml-white px-3 py-2 text-sm outline-none focus:border-ml-blue"
      />

      <div className="mb-4 flex items-center justify-between text-lg font-bold uppercase">
        <span>Total</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex flex-col gap-2">
        {isConfirming && (
          <p className="text-center text-xs text-ml-grey">
            ¿Confirmás el pedido? Se va a abrir WhatsApp.
          </p>
        )}

        <button
          type="button"
          onClick={handleCheckoutClick}
          disabled={isEmpty}
          className="w-full rounded-full bg-ml-blue py-3 text-center font-semibold uppercase tracking-wide text-white transition hover:bg-ml-blue-dark disabled:cursor-not-allowed disabled:bg-ml-grey/20 disabled:text-ml-grey"
        >
          {isConfirming ? "Sí, enviar pedido" : "Finalizar pedido por WhatsApp"}
        </button>

        {isConfirming && (
          <button
            type="button"
            onClick={() => setIsConfirming(false)}
            className="w-full rounded-full border border-ml-grey/30 py-3 text-center text-sm font-semibold uppercase tracking-wide transition hover:border-ml-blue hover:text-ml-blue"
          >
            Cancelar
          </button>
        )}

        {!isEmpty && !isConfirming && (
          <Link
            href="/catalogo"
            onClick={close}
            className="w-full rounded-full border border-ml-grey/30 py-3 text-center text-sm font-semibold uppercase tracking-wide transition hover:border-ml-blue hover:text-ml-blue"
          >
            Seguir comprando
          </Link>
        )}
      </div>
    </div>
  );
}
