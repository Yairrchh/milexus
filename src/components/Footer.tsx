import Image from "next/image";
import Link from "next/link";
import { categoryLabels, type Category } from "@/data/products";
import { SELLER_WHATSAPP_NUMBER } from "@/lib/whatsapp";

const footerCategories: Category[] = [
  "cocina",
  "linea-blanca",
  "climatizacion",
  "televisores",
  "electronica",
];

const INSTAGRAM_HANDLE = "milexusvenezuela";

const contactMessage = encodeURIComponent(
  "Hola, quiero más información sobre MILEXUS."
);

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 4.99L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.24c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.02.28-3.42-.71-2.88-1.19-4.73-4.1-4.87-4.29-.14-.19-1.16-1.55-1.16-2.96s.72-2.1.98-2.39c.25-.28.55-.35.73-.35.19 0 .37 0 .53.01.17.01.4-.06.62.48.24.58.8 2 .87 2.14.07.15.12.32.02.51-.1.19-.15.31-.29.47-.15.17-.31.37-.44.5-.15.14-.3.3-.13.59.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M13.5 21v-7.9h2.65l.4-3.08h-3.05V8.05c0-.89.25-1.5 1.52-1.5h1.63V3.8A21.9 21.9 0 0 0 14.3 3.7c-2.35 0-3.96 1.44-3.96 4.07v2.27H7.68v3.08h2.66V21h3.16Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M18.24 3H21l-6.4 7.3L22.14 21H16.2l-4.65-6.1L6.2 21H3.4l6.85-7.83L2.86 3h6.1l4.2 5.57L18.24 3Zm-1.05 16.17h1.5L7.88 4.75H6.28l10.91 14.42Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M21.6 7.2s-.2-1.5-.84-2.15c-.8-.86-1.7-.86-2.12-.91C15.7 4 12 4 12 4h-.01s-3.7 0-6.64.14c-.42.05-1.31.05-2.12.91C2.6 5.7 2.4 7.2 2.4 7.2S2.2 9 2.2 10.7v1.6c0 1.7.2 3.5.2 3.5s.2 1.5.83 2.15c.81.86 1.87.83 2.35.92 1.7.17 7.42.22 7.42.22s3.71-.01 6.65-.15c.42-.06 1.31-.06 2.12-.92.64-.65.84-2.15.84-2.15s.2-1.8.2-3.5v-1.6c0-1.7-.2-3.5-.2-3.5ZM9.95 14.5v-5.6l5.4 2.81-5.4 2.8Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-ml-grey/10 bg-ml-surface px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
        <div className="flex flex-col gap-3">
          <div className="w-fit rounded bg-ml-blue px-3 py-2">
            <Image src="/logo.svg" alt="MILEXUS" width={138} height={24} className="h-6 w-auto" />
          </div>
          <p className="max-w-xs text-sm text-ml-grey">
            Distribuidor mayorista de electrodomésticos. Cocina, línea
            blanca, climatización y electrónica.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-ml-ink">
            Categorías
          </h3>
          <nav className="flex flex-col gap-2 text-sm text-ml-grey">
            {footerCategories.map((c) => (
              <Link key={c} href={`/catalogo?categoria=${c}`} className="w-fit hover:text-ml-blue">
                {categoryLabels[c]}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-ml-ink">
            Contacto
          </h3>
          <p className="text-sm text-ml-grey">
            Pedidos al mayor por WhatsApp — te respondemos directo.
          </p>
          <div className="flex gap-3">
            <a
              href={`https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${contactMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribinos por WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:opacity-85"
            >
              <WhatsAppIcon />
            </a>
            <a
              href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguinos en Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:opacity-85"
              style={{
                background:
                  "linear-gradient(45deg, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5)",
              }}
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-ml-grey/10 pt-6 text-xs text-ml-grey">
        © {new Date().getFullYear()} MILEXUS. Todos los derechos reservados.
      </div>

      <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-4 border-t border-ml-grey/10 pt-4 text-xs text-ml-grey sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-bold text-ml-ink">Venezuela/Español</span>
          <span className="text-ml-grey/40">|</span>
          <a
            href={`https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${contactMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ml-blue"
          >
            Contáctanos
          </a>
          <span>Accesibilidad</span>
          <span>Legal</span>
          <span>Privacidad</span>
          <span>Mapa del sitio</span>
        </div>

        <div className="flex items-center gap-3">
          <span>¡Mantente informado!</span>
          <div className="flex items-center gap-2 text-ml-ink">
            <span
              aria-label="Facebook (próximamente)"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-ml-grey/20"
            >
              <FacebookIcon />
            </span>
            <span
              aria-label="X (próximamente)"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-ml-grey/20"
            >
              <XIcon />
            </span>
            <span
              aria-label="Instagram (próximamente)"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-ml-grey/20"
            >
              <InstagramIcon />
            </span>
            <span
              aria-label="YouTube (próximamente)"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-ml-grey/20"
            >
              <YouTubeIcon />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
