import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b border-ml-grey/10 bg-ml-surface px-4 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 sm:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <span className="rounded-full bg-ml-blue/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-ml-blue">
            Disponible al mayor · Entrega inmediata
          </span>
          <h1 className="text-5xl font-extrabold uppercase leading-[1.05] sm:text-6xl">
            El que no falta
            <br />
            <span className="text-ml-blue">en ningún hogar.</span>
          </h1>
          <p className="max-w-md text-ml-grey">
            Electrodomésticos al mayor para tu negocio. Cocina, línea blanca,
            cuidado personal y climatización.
          </p>
          <Link
            href="/catalogo"
            className="rounded-full bg-ml-blue px-8 py-3 font-semibold uppercase tracking-wide text-white transition hover:bg-ml-blue-dark"
          >
            Ver catálogo
          </Link>
        </div>

        <div className="relative mx-auto hidden aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-ml-grey/15 bg-white shadow-xl shadow-black/5 sm:block">
          <Image
            src="https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?w=1000&q=80"
            alt="Licuadora MILEXUS"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 0px, 384px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
