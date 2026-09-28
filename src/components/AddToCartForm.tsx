"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function AddToCartForm({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);

  const quoteUrl = buildWhatsAppUrl(
    `Hola, quiero cotizar el ${product.name} (${size}, ${color}) x${qty} de ELECTRONOVA.`
  );

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-1 text-xs uppercase tracking-wide text-ml-grey">Capacidad</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`rounded border px-3 py-1 text-sm ${
                size === s ? "border-ml-blue bg-ml-blue text-white" : "border-ml-grey/30 hover:border-ml-blue"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1 text-xs uppercase tracking-wide text-ml-grey">Color</p>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`rounded border px-3 py-1 text-sm ${
                color === c ? "border-ml-blue bg-ml-blue text-white" : "border-ml-grey/30 hover:border-ml-blue"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="h-8 w-8 rounded border border-ml-grey/30 hover:border-ml-blue"
        >
          −
        </button>
        <span className="w-6 text-center">{qty}</span>
        <button
          type="button"
          onClick={() => setQty((q) => q + 1)}
          className="h-8 w-8 rounded border border-ml-grey/30 hover:border-ml-blue"
        >
          +
        </button>
      </div>

      {product.price !== null ? (
        <button
          type="button"
          onClick={() => addItem(product, size, color, qty)}
          className="rounded-full bg-ml-blue py-3 font-semibold uppercase tracking-wide text-white hover:bg-ml-blue-dark"
        >
          Agregar al carrito
        </button>
      ) : (
        <a
          href={quoteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#25D366] py-3 text-center font-semibold uppercase tracking-wide text-white hover:opacity-90"
        >
          Cotizar por WhatsApp
        </a>
      )}
    </div>
  );
}
