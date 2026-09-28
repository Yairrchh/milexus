"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const promoWhatsAppUrl = buildWhatsAppUrl(
  "Hola, quiero información sobre precios al mayor en ELECTRONOVA."
);

const ZOOM_FACTOR = 0.0003;
const ZOOM_MAX = 0.08;

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const update = () => {
      const el = parallaxRef.current;
      if (el) {
        // Anchored at the bottom (see origin-bottom below), so the anchor
        // point — where the products sit flush with the image's edge —
        // never moves. Only zoom, never translate: translating a
        // bottom-flush image either crops the products off-frame or
        // reveals empty space past the photo's real bottom edge.
        const zoom = 1 + Math.min(window.scrollY * ZOOM_FACTOR, ZOOM_MAX);
        el.style.transform = `scale(${zoom})`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-ml-surface via-ml-surface to-white">
      <div className="mx-auto flex max-w-[1600px] flex-col sm:flex-row sm:items-stretch">
        <div className="flex w-full flex-col justify-center gap-6 px-4 py-16 sm:w-[380px] sm:shrink-0 sm:px-10 lg:w-[460px] lg:py-24">
          <h1 className="animate-[hero-slide-in-left_900ms_cubic-bezier(0.22,0.61,0.36,1)_both] text-4xl font-extrabold leading-[1.05] text-ml-ink motion-reduce:animate-none sm:text-5xl lg:text-6xl">
            Todo para tu negocio
          </h1>
          <p className="max-w-sm animate-[hero-slide-in-left_900ms_cubic-bezier(0.22,0.61,0.36,1)_140ms_both] text-ml-grey motion-reduce:animate-none">
            Precios al mayor, atención directa y entrega inmediata para tu
            tienda o negocio. Cocina, línea blanca, climatización y
            electrónica.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 animate-[hero-slide-in-left_900ms_cubic-bezier(0.22,0.61,0.36,1)_280ms_both] motion-reduce:animate-none">
            <Link
              href="/catalogo"
              className="font-semibold text-ml-ink underline underline-offset-4 hover:text-ml-blue"
            >
              Ver catálogo
            </Link>
            <a
              href={promoWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ml-ink px-6 py-3 font-semibold text-white transition hover:bg-black"
            >
              Pedir por WhatsApp
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>

        <div className="relative aspect-[830/620] flex-1 overflow-hidden sm:aspect-auto sm:min-h-[480px]">
          <div ref={parallaxRef} className="absolute inset-0 origin-bottom will-change-transform">
            <Image
              src="/hero/hero.jpg"
              alt="Cocina moderna con nevera side by side y electrodomésticos ELECTRONOVA"
              fill
              className="animate-[hero-image-in_900ms_cubic-bezier(0.16,1,0.3,1)_both] object-cover object-center motion-reduce:animate-none"
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) calc(100vw - 380px), calc(100vw - 460px)"
              quality={90}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
