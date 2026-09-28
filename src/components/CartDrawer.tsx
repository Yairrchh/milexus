"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CheckoutPanel from "./CheckoutPanel";

export default function CartDrawer() {
  const { isOpen, close, lines, removeItem, updateQty, subtotal } = useCart();

  return (
    <div
      className={`fixed inset-0 z-50 transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={close}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-ml-white transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col shadow-2xl`}
      >
        <div className="flex items-center justify-between border-b border-ml-grey/20 px-5 py-4">
          <h2 className="text-xl font-bold uppercase">Tu Carrito</h2>
          <button type="button" onClick={close} aria-label="Cerrar carrito" className="text-2xl leading-none">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex flex-col items-start gap-4">
              <p className="text-ml-grey">Tu carrito está vacío.</p>
              <Link
                href="/catalogo"
                onClick={close}
                className="rounded-full bg-ml-blue px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-ml-blue-dark"
              >
                Seguir comprando
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {lines.map((l) => (
                <li key={l.lineId} className="flex gap-3 border-b border-ml-grey/20 pb-4">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded bg-ml-surface">
                    <Image src={l.product.images[0]} alt={l.product.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="font-semibold">{l.product.name}</p>
                    <p className="text-sm text-ml-grey">
                      {l.color} · {l.size}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQty(l.lineId, l.qty - 1)}
                        className="h-6 w-6 rounded border border-ml-grey/30 hover:border-ml-blue"
                        aria-label="Restar cantidad"
                      >
                        −
                      </button>
                      <span className="w-6 text-center">{l.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(l.lineId, l.qty + 1)}
                        className="h-6 w-6 rounded border border-ml-grey/30 hover:border-ml-blue"
                        aria-label="Sumar cantidad"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(l.lineId)}
                        aria-label={`Quitar ${l.product.name} del carrito`}
                        className="ml-auto text-ml-grey hover:text-ml-blue"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path d="M3 6h18" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="whitespace-nowrap font-semibold">
                    ${((l.product.price ?? 0) * l.qty).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <CheckoutPanel lines={lines} subtotal={subtotal} />
      </aside>
    </div>
  );
}
