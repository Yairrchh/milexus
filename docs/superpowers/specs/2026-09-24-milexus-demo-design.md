# MILEXUS — Demo E-commerce — Design Spec

Date: 2026-09-24

## Context

Second cold-outreach demo, same playbook as the TOTAL LOOKS project
(`/home/yairrchh/Carpetapersonal/totalLooks`): a prospect asked for an example
of what a site would look like, was shown a generic reference site, and went
quiet — likely because it didn't feel tailored to their business. Building a
personalized demo, branded to their actual identity, converts far better (as
proven by TOTAL LOOKS) and doubles as a portfolio piece regardless of outcome.

## Business

MILEXUS — wholesale-only home appliance distributor (Venezuela). Sells
exclusively "al mayor" (wholesale), no retail tier. Instagram:
instagram.com/milexusvenezuela. Reference creative: bright white/marble
background, bold blue wordmark, clean product-catalog photography, blue
accent bar with copy like "Disponible al mayor con entrega inmediata."

## Brand identity

- Name: MILEXUS. Logo provided (`milexus-texto-transparente.svg`).
- Visual style: light/white, NOT dark like TOTAL LOOKS — bold blue as the
  brand accent, clean catalog photography, minimal/professional (wholesale
  distributor tone, not streetwear/campaign energy).
- No real product photos available. Same tradeoff as before: generic
  appliance stock photos (Unsplash) stand in for real inventory.

## Scope (this iteration)

Full demo: home (hero introducing MILEXUS), catalog with filters, product
detail page, cart drawer, WhatsApp checkout. No backend, no payment gateway,
no admin panel, no retail/wholesale price split (single price per product,
since MILEXUS sells wholesale only) — out of scope for this pitch demo.

## Architecture

Reuses the TOTAL LOOKS architecture directly (validated, no changes needed):

- Next.js (App Router), TypeScript, Tailwind CSS v4.
- Routes: `/` (home), `/catalogo` (grid + filters), `/producto/[slug]`
  (detail). Cart is a global slide-over drawer.
- Static product data in `src/data/products.ts`, no CMS/API.
- `CartContext` (React Context) persisted to `localStorage`, with a
  confirmation step before checkout and `clearCart()` after the order is
  sent (both already built and proven in TOTAL LOOKS — carry over as-is).
- Custom `<Select>` dropdown component for filters (native `<select>`
  options popups can't be restyled — learned this the hard way on TOTAL
  LOOKS; carry the fix over from day one instead of rediscovering it).
- Product detail `params` is `Promise<{ slug: string }>` (Next 16 async
  params — also already learned).

## Data model

```ts
type Category = "cocina" | "linea-blanca" | "cuidado-personal" | "climatizacion";

type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  brand: string;
  price: number; // single wholesale price, no retail/mayor split
  sizes: string[]; // capacity/variant labels where relevant (e.g. "1.5L"), else ["Único"]
  colors: string[];
  images: string[]; // Unsplash URLs, verified with curl before use
  description: string;
};
```

~16-20 products across the four categories (smaller catalog than TOTAL
LOOKS' 30 — appliance categories naturally have fewer SKUs for a demo).

## Checkout → WhatsApp

Same pattern as TOTAL LOOKS: `SELLER_WHATSAPP_NUMBER = "584144853795"`
(user's own number, converted from local `04144853795`), order message
built from cart lines, confirmation step before opening WhatsApp, cart
clears after sending.

## Brand background treatment

TOTAL LOOKS used a dark diagonal "caution tape" motif matching their
campaign. MILEXUS's identity is bright/clean/corporate — no equivalent
motif exists in their reference creative, so **no decorative background
system this iteration**. Keep it simple: white/light surfaces, blue accents,
clean product photography does the visual work. Avoid inventing a visual
gimmick that isn't grounded in their actual brand material (YAGNI + don't
guess at identity they haven't shown).

## Testing

No automated test suite — same deliberate scope cut as TOTAL LOOKS, same
reasoning (pitch-demo timeline). Manual verification: `npm run dev`,
click through add-to-cart, filters, product detail, full WhatsApp checkout
flow, `npm run lint` and `npm run build` clean before handoff.

## Deploy

Netlify, same as TOTAL LOOKS (`netlify.toml` with `@netlify/plugin-nextjs`).

## Out of scope (explicitly)

- Retail/wholesale price split (single price only — they sell wholesale only).
- Real payment gateway / checkout beyond WhatsApp handoff.
- Admin panel / CMS (discussed with the user as a possible future add-on,
  not part of this demo).
- Real product photography or MILEXUS's actual inventory.
- Automated tests.
- Accounts/auth, wishlists, reviews, discount system (not requested for
  this project — TOTAL LOOKS had one because it was requested there).
