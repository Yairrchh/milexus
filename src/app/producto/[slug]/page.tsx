import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import AddToCartForm from "@/components/AddToCartForm";
import BackButton from "@/components/BackButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Producto no encontrado — ELECTRONOVA" };

  const priceLabel = product.price !== null ? `$${product.price}` : "Consultar precio";
  const title = `${product.name} — ${priceLabel} | ELECTRONOVA`;
  const description = `${product.description} ${product.brand} · Disponible al mayor.`;

  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: product.images[0] }] },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-ml-surface">
          <BackButton />
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ml-grey">{product.brand}</p>
          <h1 className="text-3xl font-bold uppercase">{product.name}</h1>
          {product.price !== null ? (
            <p className="text-2xl font-bold text-ml-blue">${product.price}</p>
          ) : (
            <p className="text-lg font-semibold text-ml-grey">Consultar precio</p>
          )}
          <p className="text-ml-grey">{product.description}</p>
          <AddToCartForm product={product} />
        </div>
      </div>
    </main>
  );
}
