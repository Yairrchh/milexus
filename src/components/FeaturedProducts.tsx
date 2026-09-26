"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { products, categoryLabels, type Category } from "@/data/products";

type Tab = "todos" | Category;

const tabs: { key: Tab; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "cocina", label: categoryLabels.cocina },
  { key: "linea-blanca", label: categoryLabels["linea-blanca"] },
  { key: "climatizacion", label: categoryLabels.climatizacion },
  { key: "televisores", label: categoryLabels.televisores },
  { key: "electronica", label: categoryLabels.electronica },
];

const MAX_PER_CATEGORY = 8;

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<Tab>("todos");

  const visibleProducts =
    activeTab === "todos"
      ? products
      : products.filter((p) => p.category === activeTab).slice(0, MAX_PER_CATEGORY);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:pt-14">
      <Reveal>
        <h2 className="mb-6 text-center text-2xl font-extrabold text-ml-ink sm:text-3xl">
          Lo que tu negocio necesita
        </h2>

        <div className="mb-8 flex items-center gap-x-6 overflow-x-auto whitespace-nowrap border-b border-ml-grey/15 px-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:gap-x-8 sm:overflow-visible sm:whitespace-normal [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`relative shrink-0 pb-3 text-sm font-semibold transition ${
                activeTab === tab.key
                  ? "text-ml-ink after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-ml-ink"
                  : "text-ml-grey hover:text-ml-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visibleProducts.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 80} className="h-full">
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
