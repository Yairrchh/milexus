import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { products, categoryLabels, type Category } from "@/data/products";

const shortcuts: { category: Category; label: string }[] = [
  { category: "cocina", label: categoryLabels.cocina },
  { category: "linea-blanca", label: categoryLabels["linea-blanca"] },
  { category: "cuidado-personal", label: categoryLabels["cuidado-personal"] },
  { category: "climatizacion", label: categoryLabels.climatizacion },
];

export default function HomePage() {
  const featured = products.slice(0, 8);

  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {shortcuts.map((s) => (
            <Link
              key={s.category}
              href={`/catalogo?categoria=${s.category}`}
              className="rounded-lg border border-ml-grey/15 bg-white px-4 py-6 text-center font-semibold uppercase tracking-wide hover:border-ml-blue hover:text-ml-blue"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="mb-4 text-2xl font-bold uppercase">Destacados</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
