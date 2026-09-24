"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import Select from "./Select";
import { products, categoryLabels, type Category } from "@/data/products";

const allCategories = Object.keys(categoryLabels) as Category[];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCategory = searchParams.get("categoria") as Category | null;

  const category: Category | "todas" =
    rawCategory && allCategories.includes(rawCategory) ? rawCategory : "todas";
  const setCategory = (v: Category | "todas") => {
    router.replace(v === "todas" ? "/catalogo" : `/catalogo?categoria=${v}`, {
      scroll: false,
    });
  };

  const [brand, setBrand] = useState<string>("todas");
  const [size, setSize] = useState<string>("todas");
  const [color, setColor] = useState<string>("todos");

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    []
  );
  const sizes = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.sizes))).sort(),
    []
  );
  const colors = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.colors))).sort(),
    []
  );

  const filtered = products.filter((p) => {
    if (category !== "todas" && p.category !== category) return false;
    if (brand !== "todas" && p.brand !== brand) return false;
    if (size !== "todas" && !p.sizes.includes(size)) return false;
    if (color !== "todos" && !p.colors.includes(color)) return false;
    return true;
  });

  const clearFilters = () => {
    setCategory("todas");
    setBrand("todas");
    setSize("todas");
    setColor("todos");
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3">
        <Select
          value={category}
          onChange={(v) => setCategory(v as Category | "todas")}
          className="w-44"
          options={[
            { value: "todas", label: "Todas las categorías" },
            ...allCategories.map((c) => ({ value: c, label: categoryLabels[c] })),
          ]}
        />

        <Select
          value={brand}
          onChange={setBrand}
          className="w-40"
          options={[
            { value: "todas", label: "Todas las marcas" },
            ...brands.map((b) => ({ value: b, label: b })),
          ]}
        />

        <Select
          value={size}
          onChange={setSize}
          className="w-36"
          options={[
            { value: "todas", label: "Todas las capacidades" },
            ...sizes.map((s) => ({ value: s, label: s })),
          ]}
        />

        <Select
          value={color}
          onChange={setColor}
          className="w-36"
          options={[
            { value: "todos", label: "Todos los colores" },
            ...colors.map((c) => ({ value: c, label: c })),
          ]}
        />

        {(category !== "todas" || brand !== "todas" || size !== "todas" || color !== "todos") && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-semibold uppercase tracking-wide text-ml-blue"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-ml-grey">
          No hay productos que coincidan con estos filtros.{" "}
          <button type="button" onClick={clearFilters} className="text-ml-blue underline">
            Limpiar filtros
          </button>
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i === 0} />
          ))}
        </div>
      )}
    </div>
  );
}
