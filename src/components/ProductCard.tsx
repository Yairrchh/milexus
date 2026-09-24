"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0], product.colors[0], 1);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-ml-grey/15 bg-white transition hover:border-ml-blue hover:shadow-md">
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
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        <span className="absolute left-2 top-2 rounded bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-ml-grey shadow-sm">
          {product.brand}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col gap-1 p-3 pr-10 sm:pr-12">
        <h3 className="font-semibold leading-tight">{product.name}</h3>
        <p className="mt-auto text-lg font-bold text-ml-blue">${product.price}</p>

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
      </div>
    </div>
  );
}
