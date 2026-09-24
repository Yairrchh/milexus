# MILEXUS Demo E-commerce Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a working Next.js demo storefront for MILEXUS (wholesale
appliance distributor) with catalog filters, cart, and WhatsApp checkout, to
win a cold-sale client pitch.

**Architecture:** Next.js (App Router) + TypeScript + Tailwind CSS v4, fully
client-side (static product data, Context-based cart persisted to
localStorage), no backend. Directly reuses the validated totalLooks
architecture, reskinned for a light/blue brand identity and adapted for a
single-price (wholesale-only) catalog.

**Tech Stack:** Next.js (latest via create-next-app), React, TypeScript,
Tailwind CSS v4, next/image with Unsplash remote images, deployed to
Netlify.

**Spec:** `docs/superpowers/specs/2026-09-24-milexus-demo-design.md`

## Global Constraints

- No automated test suite this iteration (spec's explicit scope cut). Verify
  with `npx tsc --noEmit`, `npm run lint`, `npm run build`, and manual
  browser click-through.
- Categories are exactly: `"cocina" | "linea-blanca" | "cuidado-personal" | "climatizacion"`.
- Single `price` per product — **no** discount system, **no** retail/mayor
  price split (MILEXUS sells wholesale only). Do not port totalLooks'
  `discountPercent` field or `pricing.ts` helper.
- Brand colors (Tailwind v4 `@theme` tokens in `globals.css`):
  `ml-white:#ffffff` (page bg), `ml-surface:#f3f5f8` (card bg),
  `ml-ink:#101418` (body text, not pure black), `ml-grey:#667085` (secondary
  text), `ml-blue:#1a5fd6` (brand accent), `ml-blue-dark:#123f94` (hover).
- Fonts: keep it simple and legible — "Inter" (Google Font) for everything;
  this is a corporate/catalog identity, not a campaign identity, so no
  display/body split is needed.
- WhatsApp number constant: `584144853795` (user's own number, converted
  from local Venezuelan format `04144853795`).
- Logo source file: `/home/yairrchh/Descargas/milexus-texto-transparente.svg`
  — it's a **white-only** mark (transparent background, no color fill), so
  it must sit on a filled `ml-blue` surface (badge/header bar) to be
  visible, never directly on a white background.
- No decorative background motif (no equivalent of totalLooks' tape-band
  system) — MILEXUS's identity is clean/corporate, not campaign-driven.
  Keep pages plain white/light-surface with blue accents.
- Bake in from the start (all proven UX decisions from the totalLooks
  build, no need to rediscover them): custom `<Select>` component instead
  of native `<select>` (native option-list styling can't be restyled);
  quick-add "+" button on product cards; trash icon (not text) to remove
  cart lines; a confirmation step before the WhatsApp checkout fires;
  `clearCart()` after the order is sent; "Seguir comprando" buttons in both
  the empty-cart state and next to the checkout button; `generateMetadata`
  per product page; category filter state derived from the URL (no
  `useEffect` re-sync).

---

### Task 1: Scaffold project, brand theme, logo

**Files:**
- Create: whole Next.js scaffold via `create-next-app` (App Router, TS,
  Tailwind, ESLint, `src/` dir, `@/*` import alias). Unlike totalLooks,
  "milexus" is already a valid lowercase npm package name, so it can be
  scaffolded directly into the project directory — no temp-dir workaround
  needed (that workaround was only for a directory name npm rejected).
- Modify: `src/app/globals.css`
- Modify: `next.config.ts`
- Create: `public/logo.svg` (copied from the path below)
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: Tailwind tokens `ml-white`, `ml-surface`, `ml-ink`, `ml-grey`,
  `ml-blue`, `ml-blue-dark` usable as `bg-ml-blue`, `text-ml-ink`, etc.

- [ ] **Step 1: Scaffold the app directly in the project directory**

```bash
cd /home/yairrchh/Carpetapersonal/milexus
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir \
  --import-alias "@/*" --use-npm
```

This directory is already a git repo with `docs/` in it — confirm the
installer doesn't overwrite `docs/`. If it refuses to run in a non-empty
directory, fall back to the totalLooks workaround: scaffold into a temp dir
under the scratchpad, then `rsync -a --exclude='.next' <temp>/ ./`.

- [ ] **Step 2: Copy the logo asset**

```bash
mkdir -p public
cp "/home/yairrchh/Descargas/milexus-texto-transparente.svg" public/logo.svg
```

- [ ] **Step 3: Check what Tailwind version got scaffolded**

```bash
cat package.json | grep tailwindcss
```

If it's Tailwind v4 (`"tailwindcss": "^4"`, no `tailwind.config.ts` file),
proceed with Step 4 below (CSS `@theme` tokens). If it scaffolded v3
instead, use a `tailwind.config.ts` `theme.extend.colors` block instead —
adapt the token names/values the same way either way.

- [ ] **Step 4: Configure brand tokens in `src/app/globals.css`**

```css
@import "tailwindcss";

@theme inline {
  --color-ml-white: #ffffff;
  --color-ml-surface: #f3f5f8;
  --color-ml-ink: #101418;
  --color-ml-grey: #667085;
  --color-ml-blue: #1a5fd6;
  --color-ml-blue-dark: #123f94;

  --font-sans: var(--font-inter);
}
```

- [ ] **Step 5: Load Inter via next/font in the root layout**

Edit `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MILEXUS — Electrodomésticos al Mayor",
  description: "Distribuidor mayorista de electrodomésticos en Venezuela.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-ml-white text-ml-ink font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Allow Unsplash remote images**

Edit `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 7: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run dev`, open `http://localhost:3000` — expect a white page with
no console errors (default scaffold content is fine at this point, it gets
replaced in Task 6).

- [ ] **Step 8: Commit**

```bash
cd /home/yairrchh/Carpetapersonal/milexus
git add -A
git commit -m "Scaffold Next.js project with MILEXUS brand theme"
```

---

### Task 2: Product catalog data

**Files:**
- Create: `src/data/products.ts`

**Interfaces:**
- Produces:
  ```ts
  export type Category = "cocina" | "linea-blanca" | "cuidado-personal" | "climatizacion";
  export type Product = {
    id: string;
    slug: string;
    name: string;
    category: Category;
    brand: string;
    price: number;
    sizes: string[];
    colors: string[];
    images: string[];
    description: string;
  };
  export const products: Product[];
  export const categoryLabels: Record<Category, string>;
  ```

- [ ] **Step 1: Write the catalog file**

```ts
// src/data/products.ts
export type Category =
  | "cocina"
  | "linea-blanca"
  | "cuidado-personal"
  | "climatizacion";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  brand: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: string[];
  description: string;
};

export const categoryLabels: Record<Category, string> = {
  cocina: "Cocina",
  "linea-blanca": "Línea Blanca",
  "cuidado-personal": "Cuidado Personal",
  climatizacion: "Climatización",
};

export const products: Product[] = [
  {
    id: "p01",
    slug: "procesadora-alimentos-milexus",
    name: "Procesadora de Alimentos",
    category: "cocina",
    brand: "MILEXUS",
    price: 45,
    sizes: ["1.5L"],
    colors: ["Plateado", "Negro"],
    images: [
      "https://images.unsplash.com/photo-1585237017125-24baf8d7406f?w=800&q=80",
    ],
    description: "Tritura, pica y mezcla en segundos. Ideal para uso en cocina o negocio.",
  },
  {
    id: "p02",
    slug: "licuadora-oster-clasica",
    name: "Licuadora Clásica",
    category: "cocina",
    brand: "Oster",
    price: 38,
    sizes: ["1.25L"],
    colors: ["Negro", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&q=80",
    ],
    description: "Motor potente de alto torque, vaso de vidrio resistente, 3 velocidades.",
  },
  {
    id: "p03",
    slug: "freidora-aire-black-decker",
    name: "Freidora de Aire",
    category: "cocina",
    brand: "Black+Decker",
    price: 65,
    sizes: ["4L"],
    colors: ["Negro"],
    images: [
      "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=800&q=80",
    ],
    description: "Cocina con poco o nada de aceite, panel digital, temporizador integrado.",
  },
  {
    id: "p04",
    slug: "cafetera-oster-12-tazas",
    name: "Cafetera 12 Tazas",
    category: "cocina",
    brand: "Oster",
    price: 40,
    sizes: ["12 tazas"],
    colors: ["Negro"],
    images: [
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&q=80",
    ],
    description: "Jarra de vidrio, filtro permanente, placa de calentamiento antigoteo.",
  },
  {
    id: "p05",
    slug: "batidora-pie-milexus",
    name: "Batidora de Pie",
    category: "cocina",
    brand: "MILEXUS",
    price: 55,
    sizes: ["5L"],
    colors: ["Rojo", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&q=80",
    ],
    description: "Bowl de acero inoxidable, varios accesorios, ideal para repostería.",
  },
  {
    id: "p06",
    slug: "tostadora-black-decker",
    name: "Tostadora 2 Rebanadas",
    category: "cocina",
    brand: "Black+Decker",
    price: 28,
    sizes: ["Único"],
    colors: ["Negro", "Plateado"],
    images: [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80",
    ],
    description: "Control de dorado ajustable, bandeja recogemigas extraíble.",
  },
  {
    id: "p07",
    slug: "frigobar-milexus-90l",
    name: "Frigobar 90L",
    category: "linea-blanca",
    brand: "MILEXUS",
    price: 180,
    sizes: ["90L"],
    colors: ["Negro", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1584568249586-a8fd75d84f37?w=800&q=80",
    ],
    description: "Compacto y eficiente, ideal para apartamentos, oficinas o negocios chicos.",
  },
  {
    id: "p08",
    slug: "microondas-midea-20l",
    name: "Microondas 20L",
    category: "linea-blanca",
    brand: "Midea",
    price: 95,
    sizes: ["20L"],
    colors: ["Negro", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800&q=80",
    ],
    description: "Panel digital, múltiples funciones de cocción, plato giratorio.",
  },
  {
    id: "p09",
    slug: "dispensador-agua-milexus",
    name: "Dispensador de Agua Frío/Caliente",
    category: "linea-blanca",
    brand: "MILEXUS",
    price: 120,
    sizes: ["Único"],
    colors: ["Blanco"],
    images: [
      "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=800&q=80",
    ],
    description: "Compatible con botellón, mini refrigerador incluido, bajo consumo.",
  },
  {
    id: "p10",
    slug: "lavadora-haceb-semiautomatica",
    name: "Lavadora Semiautomática",
    category: "linea-blanca",
    brand: "Haceb",
    price: 250,
    sizes: ["10kg"],
    colors: ["Blanco"],
    images: [
      "https://images.unsplash.com/photo-1washer-placeholder?w=800&q=80",
    ],
    description: "Doble tina, alta capacidad, ideal para el hogar o lavandería.",
  },
  {
    id: "p11",
    slug: "congelador-vertical-midea",
    name: "Congelador Vertical",
    category: "linea-blanca",
    brand: "Midea",
    price: 300,
    sizes: ["150L"],
    colors: ["Blanco"],
    images: [
      "https://images.unsplash.com/photo-1584568249586-a8fd75d84f37?w=800&q=80",
    ],
    description: "Gran capacidad de almacenamiento, ideal para comercios y hogares grandes.",
  },
  {
    id: "p12",
    slug: "secadora-cabello-milexus",
    name: "Secadora de Cabello",
    category: "cuidado-personal",
    brand: "MILEXUS",
    price: 22,
    sizes: ["Único"],
    colors: ["Negro", "Rosado"],
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    ],
    description: "1800W, dos velocidades, boquilla concentradora incluida.",
  },
  {
    id: "p13",
    slug: "plancha-cabello-black-decker",
    name: "Plancha de Cabello",
    category: "cuidado-personal",
    brand: "Black+Decker",
    price: 30,
    sizes: ["Único"],
    colors: ["Negro"],
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
    ],
    description: "Placas cerámicas, calentamiento rápido, control de temperatura.",
  },
  {
    id: "p14",
    slug: "afeitadora-oster",
    name: "Afeitadora Eléctrica",
    category: "cuidado-personal",
    brand: "Oster",
    price: 25,
    sizes: ["Único"],
    colors: ["Negro", "Plateado"],
    images: [
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
    ],
    description: "Cuchillas de acero inoxidable, uso en seco o húmedo, recargable.",
  },
  {
    id: "p15",
    slug: "balanza-corporal-milexus",
    name: "Balanza Corporal Digital",
    category: "cuidado-personal",
    brand: "MILEXUS",
    price: 15,
    sizes: ["Único"],
    colors: ["Negro", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80",
    ],
    description: "Pantalla LCD, superficie de vidrio templado, alta precisión.",
  },
  {
    id: "p16",
    slug: "ventilador-torre-milexus",
    name: "Ventilador de Torre",
    category: "climatizacion",
    brand: "MILEXUS",
    price: 48,
    sizes: ["Único"],
    colors: ["Negro", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    ],
    description: "Oscilación automática, control remoto, varias velocidades.",
  },
  {
    id: "p17",
    slug: "aire-portatil-midea",
    name: "Aire Acondicionado Portátil",
    category: "climatizacion",
    brand: "Midea",
    price: 380,
    sizes: ["12000 BTU"],
    colors: ["Blanco"],
    images: [
      "https://images.unsplash.com/photo-1631048856855-cd0d1e60c9e5?w=800&q=80",
    ],
    description: "No requiere instalación fija, fácil de mover entre ambientes.",
  },
  {
    id: "p18",
    slug: "ventilador-pie-royal",
    name: "Ventilador de Pie",
    category: "climatizacion",
    brand: "Royal",
    price: 35,
    sizes: ["16 pulgadas"],
    colors: ["Negro"],
    images: [
      "https://images.unsplash.com/photo-1541971297127-b9f193b1a5db?w=800&q=80",
    ],
    description: "Altura ajustable, base estable, motor silencioso.",
  },
  {
    id: "p19",
    slug: "calefactor-black-decker",
    name: "Calefactor Eléctrico",
    category: "climatizacion",
    brand: "Black+Decker",
    price: 42,
    sizes: ["Único"],
    colors: ["Negro"],
    images: [
      "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&q=80",
    ],
    description: "Calentamiento rápido, termostato ajustable, protección de sobrecalentamiento.",
  },
  {
    id: "p20",
    slug: "extractor-aire-milexus",
    name: "Extractor de Aire",
    category: "climatizacion",
    brand: "MILEXUS",
    price: 50,
    sizes: ["8 pulgadas"],
    colors: ["Blanco"],
    images: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
    ],
    description: "Ideal para cocinas y baños, instalación sencilla, bajo consumo.",
  },
];
```

- [ ] **Step 2: Verify every image URL actually resolves**

```bash
cd /home/yairrchh/Carpetapersonal/milexus
for u in $(grep -oE 'https://images\.unsplash\.com/[^"]+' src/data/products.ts | sort -u); do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$u")
  echo "$code $u"
done
```

Expected: every line starts with `200`. The placeholder washing-machine URL
(`photo-1washer-placeholder`) is deliberately fake and WILL fail — that's a
flag for "search for a real one," not a bug.

For any URL that returns non-200: use the `WebSearch` tool to search
`"unsplash washing machine photo"` (swap in the relevant product keyword —
blender, air conditioner, hair dryer, etc.), open a real result page or
note a real photo ID from the search results, and replace that exact URL in
`src/data/products.ts` with `https://images.unsplash.com/photo-<real-id>?w=800&q=80`.
Re-run the curl loop until every URL returns 200. Do not guess repeatedly
blind — use WebSearch once a guess fails instead of trying more unverified
IDs.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit` — expect no errors.

- [ ] **Step 4: Commit**

```bash
cd /home/yairrchh/Carpetapersonal/milexus
git add src/data/products.ts
git commit -m "Add product catalog data (20 appliances across 4 categories)"
```

---

### Task 3: Cart context (state + localStorage persistence)

**Files:**
- Create: `src/context/CartContext.tsx`

**Interfaces:**
- Consumes: `Product` type from `src/data/products.ts` (Task 2).
- Produces:
  ```ts
  export type CartLine = {
    lineId: string; // `${productId}-${size}-${color}`
    product: Product;
    size: string;
    color: string;
    qty: number;
  };
  export function CartProvider({ children }: { children: React.ReactNode }): JSX.Element;
  export function useCart(): {
    lines: CartLine[];
    addItem: (product: Product, size: string, color: string, qty: number) => void;
    removeItem: (lineId: string) => void;
    updateQty: (lineId: string, qty: number) => void;
    clearCart: () => void;
    subtotal: number;
    itemCount: number;
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
  ```

- [ ] **Step 1: Write the context**

```tsx
// src/context/CartContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/data/products";

export type CartLine = {
  lineId: string;
  product: Product;
  size: string;
  color: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  addItem: (product: Product, size: string, color: string, qty: number) => void;
  removeItem: (lineId: string) => void;
  updateQty: (lineId: string, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "milexus-cart";

function readStoredLines(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStoredLines(lines: CartLine[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // localStorage unavailable (private browsing) — cart stays in-memory only.
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Intentional: localStorage only exists client-side, so the cart must
    // start empty on the server-rendered pass and hydrate here to avoid a
    // markup mismatch. This is the one-time "subscribe to external state on
    // mount" case, not a derived-state anti-pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines(readStoredLines());
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) writeStoredLines(lines);
  }, [lines, isMounted]);

  const addItem = (product: Product, size: string, color: string, qty: number) => {
    const lineId = `${product.id}-${size}-${color}`;
    setLines((prev) => {
      const existing = prev.find((l) => l.lineId === lineId);
      if (existing) {
        return prev.map((l) =>
          l.lineId === lineId ? { ...l, qty: l.qty + qty } : l
        );
      }
      return [...prev, { lineId, product, size, color, qty }];
    });
    setIsOpen(true);
  };

  const removeItem = (lineId: string) => {
    setLines((prev) => prev.filter((l) => l.lineId !== lineId));
  };

  const updateQty = (lineId: string, qty: number) => {
    if (qty < 1) {
      removeItem(lineId);
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.lineId === lineId ? { ...l, qty } : l))
    );
  };

  const clearCart = () => {
    setLines([]);
  };

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.product.price * l.qty, 0),
    [lines]
  );
  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty, 0),
    [lines]
  );

  return (
    <CartContext.Provider
      value={{
        lines,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        subtotal,
        itemCount,
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` — expect no errors.

- [ ] **Step 3: Commit**

```bash
cd /home/yairrchh/Carpetapersonal/milexus
git add src/context/CartContext.tsx
git commit -m "Add CartContext with localStorage persistence"
```

---

### Task 4: WhatsApp order message utility

**Files:**
- Create: `src/lib/whatsapp.ts`

**Interfaces:**
- Consumes: `CartLine` type from `src/context/CartContext.tsx` (Task 3).
- Produces:
  ```ts
  export const SELLER_WHATSAPP_NUMBER = "584144853795";
  export function buildOrderMessage(lines: CartLine[], subtotal: number, customerName?: string): string;
  export function buildWhatsAppUrl(message: string): string;
  ```

- [ ] **Step 1: Write the utility**

```ts
// src/lib/whatsapp.ts
import type { CartLine } from "@/context/CartContext";

export const SELLER_WHATSAPP_NUMBER = "584144853795";

export function buildOrderMessage(
  lines: CartLine[],
  subtotal: number,
  customerName?: string
): string {
  const header = customerName
    ? `Hola, soy ${customerName}. Quiero hacer este pedido al mayor en MILEXUS:`
    : "Hola, quiero hacer este pedido al mayor en MILEXUS:";

  const items = lines
    .map((l) => {
      const lineTotal = (l.product.price * l.qty).toFixed(2);
      return `• ${l.product.name} (${l.color}, ${l.size}) x${l.qty} — $${lineTotal}`;
    })
    .join("\n");

  return `${header}\n\n${items}\n\nTotal: $${subtotal.toFixed(2)}`;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` — expect no errors.

- [ ] **Step 3: Commit**

```bash
cd /home/yairrchh/Carpetapersonal/milexus
git add src/lib/whatsapp.ts
git commit -m "Add WhatsApp order message builder"
```

---

### Task 5: Select component, Header, CartDrawer, CheckoutPanel

**Files:**
- Create: `src/components/Select.tsx`
- Create: `src/components/Header.tsx`
- Create: `src/components/CartDrawer.tsx`
- Create: `src/components/CheckoutPanel.tsx`
- Modify: `src/app/layout.tsx` (wrap in `CartProvider`, render `<Header />`
  and `<CartDrawer />`)

**Interfaces:**
- Consumes: `useCart()` (Task 3), `buildOrderMessage`/`buildWhatsAppUrl`
  (Task 4), `categoryLabels` (Task 2).
- Produces: `<Select />` (reused by Task 7's `FilterBar`), `<Header />`,
  `<CartDrawer />` (no props — read from `useCart()`).

- [ ] **Step 1: Write the Select component**

```tsx
// src/components/Select.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export type SelectOption = { value: string; label: string };

export default function Select({
  value,
  onChange,
  options,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selected = options.find((o) => o.value === value) ?? options[0];

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-2 rounded border border-ml-grey/30 bg-ml-white px-3 py-2 text-left text-sm hover:border-ml-blue"
      >
        <span className="truncate">{selected.label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-3.5 w-3.5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-30 mt-1 max-h-64 w-full min-w-max overflow-y-auto rounded border border-ml-grey/30 bg-ml-white py-1 shadow-xl shadow-black/10"
        >
          {options.map((o) => (
            <li key={o.value} role="option" aria-selected={o.value === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setIsOpen(false);
                }}
                className={`block w-full px-3 py-2 text-left text-sm hover:bg-ml-surface ${
                  o.value === value ? "bg-ml-blue/10 text-ml-blue" : "text-ml-ink"
                }`}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Write the Header**

```tsx
// src/components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { categoryLabels } from "@/data/products";

export default function Header() {
  const { itemCount, open } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-ml-blue">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="shrink-0">
          <Image src="/logo.svg" alt="MILEXUS" width={130} height={32} priority className="h-8 w-auto" />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-wide text-white sm:flex">
          <Link href="/catalogo?categoria=cocina" className="hover:text-white/70">
            {categoryLabels.cocina}
          </Link>
          <Link href="/catalogo?categoria=linea-blanca" className="hover:text-white/70">
            {categoryLabels["linea-blanca"]}
          </Link>
          <Link href="/catalogo?categoria=cuidado-personal" className="hover:text-white/70">
            {categoryLabels["cuidado-personal"]}
          </Link>
          <Link href="/catalogo?categoria=climatizacion" className="hover:text-white/70">
            {categoryLabels.climatizacion}
          </Link>
          <Link href="/catalogo" className="hover:text-white/70">
            Todo
          </Link>
        </nav>

        <button
          type="button"
          onClick={open}
          aria-label={`Abrir carrito${itemCount > 0 ? ` (${itemCount} producto${itemCount === 1 ? "" : "s"})` : ""}`}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white hover:border-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
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
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ml-ink text-xs font-bold text-white">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Write the CheckoutPanel (confirmation step + clearCart baked in)**

```tsx
// src/components/CheckoutPanel.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, type CartLine } from "@/context/CartContext";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export default function CheckoutPanel({
  lines,
  subtotal,
}: {
  lines: CartLine[];
  subtotal: number;
}) {
  const { close, clearCart } = useCart();
  const [name, setName] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const isEmpty = lines.length === 0;

  const handleCheckoutClick = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    const message = buildOrderMessage(lines, subtotal, name.trim() || undefined);
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    clearCart();
    setIsConfirming(false);
    close();
  };

  return (
    <div className="border-t border-ml-grey/20 px-5 py-4">
      <label htmlFor="checkout-name" className="mb-1 block text-xs uppercase tracking-wide text-ml-grey">
        Tu nombre (opcional)
      </label>
      <input
        id="checkout-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ej: María Pérez"
        className="mb-4 w-full rounded border border-ml-grey/30 bg-ml-white px-3 py-2 text-sm outline-none focus:border-ml-blue"
      />

      <div className="mb-4 flex items-center justify-between text-lg font-bold uppercase">
        <span>Total</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex flex-col gap-2">
        {isConfirming && (
          <p className="text-center text-xs text-ml-grey">
            ¿Confirmás el pedido? Se va a abrir WhatsApp.
          </p>
        )}

        <button
          type="button"
          onClick={handleCheckoutClick}
          disabled={isEmpty}
          className="w-full rounded-full bg-ml-blue py-3 text-center font-semibold uppercase tracking-wide text-white transition hover:bg-ml-blue-dark disabled:cursor-not-allowed disabled:bg-ml-grey/20 disabled:text-ml-grey"
        >
          {isConfirming ? "Sí, enviar pedido" : "Finalizar pedido por WhatsApp"}
        </button>

        {isConfirming && (
          <button
            type="button"
            onClick={() => setIsConfirming(false)}
            className="w-full rounded-full border border-ml-grey/30 py-3 text-center text-sm font-semibold uppercase tracking-wide transition hover:border-ml-blue hover:text-ml-blue"
          >
            Cancelar
          </button>
        )}

        {!isEmpty && !isConfirming && (
          <Link
            href="/catalogo"
            onClick={close}
            className="w-full rounded-full border border-ml-grey/30 py-3 text-center text-sm font-semibold uppercase tracking-wide transition hover:border-ml-blue hover:text-ml-blue"
          >
            Seguir comprando
          </Link>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Write the CartDrawer**

```tsx
// src/components/CartDrawer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CheckoutPanel from "./CheckoutPanel";

export default function CartDrawer() {
  const { isOpen, close, lines, removeItem, updateQty, subtotal } = useCart();

  return (
    <div
      className={`fixed inset-0 z-50 transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={close}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-ml-white transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col shadow-2xl`}
      >
        <div className="flex items-center justify-between border-b border-ml-grey/20 px-5 py-4">
          <h2 className="text-xl font-bold uppercase">Tu Carrito</h2>
          <button type="button" onClick={close} aria-label="Cerrar carrito" className="text-2xl leading-none">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex flex-col items-start gap-4">
              <p className="text-ml-grey">Tu carrito está vacío.</p>
              <Link
                href="/catalogo"
                onClick={close}
                className="rounded-full bg-ml-blue px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-ml-blue-dark"
              >
                Seguir comprando
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {lines.map((l) => (
                <li key={l.lineId} className="flex gap-3 border-b border-ml-grey/20 pb-4">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded bg-ml-surface">
                    <Image src={l.product.images[0]} alt={l.product.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="font-semibold">{l.product.name}</p>
                    <p className="text-sm text-ml-grey">
                      {l.color} · {l.size}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQty(l.lineId, l.qty - 1)}
                        className="h-6 w-6 rounded border border-ml-grey/30 hover:border-ml-blue"
                        aria-label="Restar cantidad"
                      >
                        −
                      </button>
                      <span className="w-6 text-center">{l.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(l.lineId, l.qty + 1)}
                        className="h-6 w-6 rounded border border-ml-grey/30 hover:border-ml-blue"
                        aria-label="Sumar cantidad"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(l.lineId)}
                        aria-label={`Quitar ${l.product.name} del carrito`}
                        className="ml-auto text-ml-grey hover:text-ml-blue"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path d="M3 6h18" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="whitespace-nowrap font-semibold">
                    ${(l.product.price * l.qty).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <CheckoutPanel lines={lines} subtotal={subtotal} />
      </aside>
    </div>
  );
}
```

- [ ] **Step 5: Wire CartProvider, Header, CartDrawer into the root layout**

Edit `src/app/layout.tsx`, add the imports and wrap `{children}`:

```tsx
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
// ...
      <body className={`${inter.variable} bg-ml-white text-ml-ink font-sans min-h-screen`}>
        <CartProvider>
          <Header />
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
```

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run dev` — open the app, click the cart icon, confirm the drawer
slides in with the empty-cart message and a working "Seguir comprando"
button, closes on × and backdrop click.

- [ ] **Step 7: Commit**

```bash
cd /home/yairrchh/Carpetapersonal/milexus
git add src/components/Select.tsx src/components/Header.tsx src/components/CartDrawer.tsx src/components/CheckoutPanel.tsx src/app/layout.tsx
git commit -m "Add Select, Header, CartDrawer, and WhatsApp CheckoutPanel"
```

---

### Task 6: Home page (hero + category shortcuts + featured products)

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/ProductCard.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx` (render `<Footer />`)

**Interfaces:**
- Consumes: `products`, `categoryLabels`, `Category` (Task 2), `useCart`
  (Task 3), `SELLER_WHATSAPP_NUMBER` (Task 4).
- Produces: `<ProductCard product={Product} />` — reused by Task 7 and 8.

- [ ] **Step 1: Write ProductCard (with quick-add button, no discount UI)**

```tsx
// src/components/ProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0], product.colors[0], 1);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-ml-grey/15 bg-white transition hover:border-ml-blue hover:shadow-md">
      <Link
        href={`/producto/${product.slug}`}
        aria-label={product.name}
        className="absolute inset-0 z-10"
      />

      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ml-surface">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        <span className="absolute left-2 top-2 rounded bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-ml-grey shadow-sm">
          {product.brand}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col gap-1 p-3 pr-10 sm:pr-12">
        <h3 className="font-semibold leading-tight">{product.name}</h3>
        <p className="mt-auto text-lg font-bold text-ml-blue">${product.price}</p>

        <button
          type="button"
          onClick={handleQuickAdd}
          aria-label={`Agregar ${product.name} al carrito`}
          className="absolute bottom-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-ml-blue text-white shadow-lg shadow-black/20 transition hover:bg-ml-blue-dark sm:h-9 sm:w-9"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write the Hero (light theme, product photo on desktop)**

```tsx
// src/components/Hero.tsx
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
            src="https://images.unsplash.com/photo-1585237017125-24baf8d7406f?w=1000&q=80"
            alt="Procesadora de alimentos MILEXUS"
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
```

- [ ] **Step 3: Write the Footer**

```tsx
// src/components/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import { categoryLabels, type Category } from "@/data/products";
import { SELLER_WHATSAPP_NUMBER } from "@/lib/whatsapp";

const footerCategories: Category[] = [
  "cocina",
  "linea-blanca",
  "cuidado-personal",
  "climatizacion",
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

export default function Footer() {
  return (
    <footer className="border-t border-ml-grey/10 bg-ml-surface px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
        <div className="flex flex-col gap-3">
          <div className="w-fit rounded bg-ml-blue px-3 py-2">
            <Image src="/logo.svg" alt="MILEXUS" width={110} height={28} className="h-6 w-auto" />
          </div>
          <p className="max-w-xs text-sm text-ml-grey">
            Distribuidor mayorista de electrodomésticos. Cocina, línea
            blanca, cuidado personal y climatización.
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
    </footer>
  );
}
```

- [ ] **Step 4: Write the home page**

```tsx
// src/app/page.tsx
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
```

- [ ] **Step 5: Render Footer in the root layout**

Edit `src/app/layout.tsx`:

```tsx
import Footer from "@/components/Footer";
// ...
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
```

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run dev`, open `/` — expect the hero, four category shortcuts, an
8-item featured grid with quick-add buttons, and the footer, all images
loading (no broken-image icons).

- [ ] **Step 7: Commit**

```bash
cd /home/yairrchh/Carpetapersonal/milexus
git add src/components/Hero.tsx src/components/ProductCard.tsx src/components/Footer.tsx src/app/page.tsx src/app/layout.tsx
git commit -m "Add home page with hero, featured products, and footer"
```

---

### Task 7: Catalog page with filters

**Files:**
- Create: `src/components/FilterBar.tsx`
- Create: `src/app/catalogo/page.tsx`

**Interfaces:**
- Consumes: `products`, `categoryLabels`, `Category` (Task 2), `ProductCard`
  (Task 6), `Select` (Task 5).
- Produces: `<FilterBar />` — self-contained, owns filter state, category
  is derived from the URL search param (no `useEffect` re-sync — that was
  a real bug on totalLooks: `/catalogo` doesn't remount across navbar
  category-link clicks, only the search param changes, so state synced via
  effect goes stale. Deriving directly from `useSearchParams()` avoids the
  whole class of bug).

- [ ] **Step 1: Write FilterBar**

```tsx
// src/components/FilterBar.tsx
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
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Write the catalog page**

```tsx
// src/app/catalogo/page.tsx
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
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run dev`, open `/catalogo` — expect all 20 products; open
`/catalogo?categoria=climatizacion` — expect that category pre-selected and
the grid filtered. Click a category link in the header nav, then click a
*different* category link — confirm the Select and grid update each time
(this is the exact bug totalLooks hit; verify it doesn't happen here).
Change each filter dropdown, confirm the grid updates; pick a combination
with no matches, confirm the empty state with working "Limpiar filtros".

- [ ] **Step 4: Commit**

```bash
cd /home/yairrchh/Carpetapersonal/milexus
git add src/components/FilterBar.tsx src/app/catalogo/page.tsx
git commit -m "Add catalog page with category/brand/size/color filters"
```

---

### Task 8: Product detail page

**Files:**
- Create: `src/app/producto/[slug]/page.tsx`
- Create: `src/components/AddToCartForm.tsx`
- Create: `src/components/BackButton.tsx`

**Interfaces:**
- Consumes: `products` (Task 2), `useCart` (Task 3).
- Produces: nothing consumed by later tasks (leaf page).

- [ ] **Step 1: Write BackButton**

```tsx
// src/components/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Volver"
      className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ml-ink shadow-md backdrop-blur hover:bg-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M18 6 6 18" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  );
}
```

- [ ] **Step 2: Write AddToCartForm**

```tsx
// src/components/AddToCartForm.tsx
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

export default function AddToCartForm({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-1 text-xs uppercase tracking-wide text-ml-grey">Capacidad</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`rounded border px-3 py-1 text-sm ${
                size === s ? "border-ml-blue bg-ml-blue text-white" : "border-ml-grey/30 hover:border-ml-blue"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1 text-xs uppercase tracking-wide text-ml-grey">Color</p>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`rounded border px-3 py-1 text-sm ${
                color === c ? "border-ml-blue bg-ml-blue text-white" : "border-ml-grey/30 hover:border-ml-blue"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="h-8 w-8 rounded border border-ml-grey/30 hover:border-ml-blue"
        >
          −
        </button>
        <span className="w-6 text-center">{qty}</span>
        <button
          type="button"
          onClick={() => setQty((q) => q + 1)}
          className="h-8 w-8 rounded border border-ml-grey/30 hover:border-ml-blue"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => addItem(product, size, color, qty)}
        className="rounded-full bg-ml-blue py-3 font-semibold uppercase tracking-wide text-white hover:bg-ml-blue-dark"
      >
        Agregar al carrito
      </button>
    </div>
  );
}
```

- [ ] **Step 3: Write the product detail page**

```tsx
// src/app/producto/[slug]/page.tsx
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
  if (!product) return { title: "Producto no encontrado — MILEXUS" };

  const title = `${product.name} — $${product.price} | MILEXUS`;
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
          <p className="text-2xl font-bold text-ml-blue">${product.price}</p>
          <p className="text-ml-grey">{product.description}</p>
          <AddToCartForm product={product} />
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run dev`, click into a product from the catalog — expect image,
name, price, description, size/color pickers, quantity stepper, and the
back button (×) in the corner of the image that returns to wherever you
came from. Pick a size/color, add to cart, open the cart drawer — expect
the line item with correct size/color and subtotal. Visit
`/producto/does-not-exist` — expect the 404 page.

- [ ] **Step 5: Commit**

```bash
cd /home/yairrchh/Carpetapersonal/milexus
git add src/app/producto src/components/AddToCartForm.tsx src/components/BackButton.tsx
git commit -m "Add product detail page with size/color selection"
```

---

### Task 9: Netlify config, lint, full manual QA

**Files:**
- Create: `netlify.toml`
- Modify: none (cleanup only)

**Interfaces:**
- Consumes: none new.
- Produces: nothing consumed elsewhere (last task).

- [ ] **Step 1: Add Netlify config**

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

- [ ] **Step 2: Install the Netlify Next.js plugin as a dev dependency**

```bash
cd /home/yairrchh/Carpetapersonal/milexus
npm install -D @netlify/plugin-nextjs
```

- [ ] **Step 3: Remove unused default scaffold assets**

```bash
cd /home/yairrchh/Carpetapersonal/milexus
rm -f public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

- [ ] **Step 4: Full verification pass**

```bash
cd /home/yairrchh/Carpetapersonal/milexus
npx tsc --noEmit
npm run lint
npm run build
```

All three must be clean (no errors, no warnings). Then run
`npm run dev` and manually walk through, per
superpowers:verification-before-completion:
1. Home loads, hero renders, category shortcuts link to filtered catalog
   views, quick-add buttons work from the featured grid.
2. Catalog: each filter narrows results correctly; category nav links from
   the header update the Select and grid every time (not just the first
   click); clearing filters restores all 20 products.
3. Product detail: size/color selection works, back button returns to the
   previous page, add-to-cart opens the drawer with the correct line.
4. Cart: quantity +/− and the trash icon work; subtotal recalculates.
5. Checkout: clicking "Finalizar pedido por WhatsApp" arms a confirmation
   state; "Cancelar" reverts without touching the cart; confirming opens
   `wa.me/584144853795` with the correct itemized message and total, clears
   the cart, and closes the drawer.
6. Refresh with items in the cart — contents survive (localStorage).
7. Resize to ~375px wide — no horizontal scroll, filters and grid stack
   sensibly, footer logo badge and social icons render correctly.

- [ ] **Step 5: Commit**

```bash
cd /home/yairrchh/Carpetapersonal/milexus
git add -A
git commit -m "Add Netlify config, remove unused assets, complete manual QA pass"
```

---

## Final Handoff

After Task 9 passes QA: push to a new GitHub repo (`gh repo create milexus
--private --source=. --remote=origin && git push -u origin master`), then
connect it in Netlify (Add new site → Import from GitHub) to get a public
link.
