"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { addItem } = useCart();
  const hasPrice = product.price !== null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0], product.colors[0], 1);
  };

  const quoteUrl = buildWhatsAppUrl(
    `Hola, quiero cotizar el ${product.name} de MILEXUS.`
  );

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-ml-grey/15 bg-white transition hover:border-ml-blue hover:shadow-md">
      <Link
        href={`/producto/${product.slug}`}
        aria-label={product.name}
        className="absolute inset-0 z-10"
      />

      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ml-surface">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain p-4 transition duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 25vw"
          priority={priority}
        />
        <span className="absolute left-2 top-2 rounded bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-ml-grey shadow-sm">
          {product.brand}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col gap-1 p-3 pr-10 sm:pr-12">
        <h3 className="font-semibold leading-tight">{product.name}</h3>
        {hasPrice ? (
          <p className="mt-auto text-lg font-bold text-ml-blue">${product.price}</p>
        ) : (
          <p className="mt-auto text-sm font-semibold text-ml-grey">Consultar precio</p>
        )}

        {hasPrice ? (
          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Agregar ${product.name} al carrito`}
            className="absolute bottom-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-ml-blue text-white shadow-lg shadow-black/20 transition hover:bg-ml-blue-dark sm:h-9 sm:w-9"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        ) : (
          <a
            href={quoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Cotizar ${product.name} por WhatsApp`}
            className="absolute bottom-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:opacity-90 sm:h-9 sm:w-9"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true">
              <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 4.99L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.24c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.02.28-3.42-.71-2.88-1.19-4.73-4.1-4.87-4.29-.14-.19-1.16-1.55-1.16-2.96s.72-2.1.98-2.39c.25-.28.55-.35.73-.35.19 0 .37 0 .53.01.17.01.4-.06.62.48.24.58.8 2 .87 2.14.07.15.12.32.02.51-.1.19-.15.31-.29.47-.15.17-.31.37-.44.5-.15.14-.3.3-.13.59.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
