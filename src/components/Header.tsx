"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { categoryLabels } from "@/data/products";

const navLinks = [
  { href: "/catalogo?categoria=cocina", label: categoryLabels.cocina },
  { href: "/catalogo?categoria=linea-blanca", label: categoryLabels["linea-blanca"] },
  { href: "/catalogo?categoria=climatizacion", label: categoryLabels.climatizacion },
  { href: "/catalogo?categoria=televisores", label: categoryLabels.televisores },
  { href: "/catalogo?categoria=electronica", label: categoryLabels.electronica },
  { href: "/catalogo", label: "Todo" },
];

export default function Header() {
  const { itemCount, open } = useCart();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    router.push(q ? `/catalogo?buscar=${encodeURIComponent(q)}` : "/catalogo");
    setSearchOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b border-ml-grey/15 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-sm shadow-black/5" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 transition-[padding] duration-300 ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center text-ml-ink hover:text-ml-blue sm:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>

        <Link href="/" className="shrink-0">
          <Image
            src="/logo-blue.svg"
            alt="MILEXUS"
            width={184}
            height={32}
            priority
            className={`w-auto transition-[height] duration-300 ${scrolled ? "h-5" : "h-6"}`}
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ml-ink sm:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ml-blue">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen((o) => !o)}
            aria-label={searchOpen ? "Cerrar búsqueda" : "Buscar productos"}
            aria-expanded={searchOpen}
            className="flex h-10 w-10 items-center justify-center text-ml-ink hover:text-ml-blue"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>

          <button
            type="button"
            onClick={open}
            aria-label={`Abrir carrito${itemCount > 0 ? ` (${itemCount} producto${itemCount === 1 ? "" : "s"})` : ""}`}
            className="relative flex h-10 w-10 items-center justify-center text-ml-ink hover:text-ml-blue"
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.5 2.5h2l2.6 12.6a2 2 0 0 0 2 1.6h8.1a2 2 0 0 0 2-1.6L21 6.5H6" />
          </svg>
          {itemCount > 0 && (
            <span
              key={itemCount}
              className="absolute -right-1 -top-1 flex h-5 w-5 animate-[cart-badge-pop_350ms_ease-out] items-center justify-center rounded-full bg-ml-blue text-xs font-bold text-white motion-reduce:animate-none"
            >
              {itemCount}
            </span>
          )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-ml-grey/15 px-4 py-3">
          <form onSubmit={handleSearchSubmit} className="mx-auto flex max-w-6xl items-center gap-2">
            <input
              type="search"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full rounded-full border border-ml-grey/30 bg-ml-white px-4 py-2 text-sm outline-none focus:border-ml-blue"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-ml-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-black"
            >
              Buscar
            </button>
          </form>
        </div>
      )}

      {menuOpen && (
        <nav className="flex flex-col border-t border-ml-grey/15 px-4 py-2 text-sm font-medium text-ml-ink sm:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-ml-grey/10 py-3 last:border-b-0 hover:text-ml-blue"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
