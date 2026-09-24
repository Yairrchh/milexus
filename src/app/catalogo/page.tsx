import type { Metadata } from "next";
import { Suspense } from "react";
import FilterBar from "@/components/FilterBar";

export const metadata: Metadata = {
  title: "Catálogo — MILEXUS",
  description: "Electrodomésticos al mayor: cocina, línea blanca, cuidado personal y climatización.",
};

export default function CatalogoPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold uppercase">Catálogo</h1>
      <Suspense fallback={<p className="text-ml-grey">Cargando...</p>}>
        <FilterBar />
      </Suspense>
    </main>
  );
}
