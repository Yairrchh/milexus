"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import Select from "./Select";
import { products, categoryLabels, type Category } from "@/data/products";

const allCategories = Object.keys(categoryLabels) as Category[];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCategory = searchParams.get("categoria") as Category | null;
  const search = searchParams.get("buscar") ?? "";

  const buildUrl = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    const qs = params.toString();
    return qs ? `/catalogo?${qs}` : "/catalogo";
  };

  const category: Category | "todas" =
    rawCategory && allCategories.includes(rawCategory) ? rawCategory : "todas";
  const setCategory = (v: Category | "todas") => {
    router.replace(buildUrl({ categoria: v === "todas" ? null : v }), { scroll: false });
  };
  const setSearch = (v: string) => {
    router.replace(buildUrl({ buscar: v }), { scroll: false });
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
    if (search.trim() && !p.name.toLowerCase().includes(search.trim().toLowerCase()))
      return false;
    return true;
  });

  const hasActiveFilters =
    category !== "todas" ||
    brand !== "todas" ||
    size !== "todas" ||
    color !== "todos" ||
    search.trim() !== "";

  const clearFilters = () => {
    router.replace("/catalogo", { scroll: false });
    setBrand("todas");
    setSize("todas");
    setColor("todos");
  };

  return (
    <div>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por nombre..."
        className="mb-4 w-full rounded border border-ml-grey/30 bg-ml-white px-3 py-2 text-sm outline-none focus:border-ml-blue sm:max-w-sm"
      />

      <div className="mb-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
        <Select
          value={category}
          onChange={(v) => setCategory(v as Category | "todas")}
          className="w-full sm:w-44"
          options={[
            { value: "todas", label: "Todas las categorías" },
            ...allCategories.map((c) => ({ value: c, label: categoryLabels[c] })),
          ]}
        />

        <Select
          value={brand}
          onChange={setBrand}
          className="w-full sm:w-40"
          options={[
            { value: "todas", label: "Todas las marcas" },
            ...brands.map((b) => ({ value: b, label: b })),
          ]}
        />

        <Select
          value={size}
          onChange={setSize}
          className="w-full sm:w-36"
          options={[
            { value: "todas", label: "Todas las capacidades" },
            ...sizes.map((s) => ({ value: s, label: s })),
          ]}
        />

        <Select
          value={color}
          onChange={setColor}
          className="w-full sm:w-36"
          options={[
            { value: "todos", label: "Todos los colores" },
            ...colors.map((c) => ({ value: c, label: c })),
          ]}
        />

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="col-span-2 text-sm font-semibold uppercase tracking-wide text-ml-blue sm:col-span-1"
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
            <Reveal key={p.id} delay={(i % 4) * 80} className="h-full">
              <ProductCard product={p} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
