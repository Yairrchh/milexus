"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Product } from "@/data/products";

const TOAST_DURATION_MS = 2500;

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
  toast: string | null;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "electronova-cart";

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
  const [toast, setToast] = useState<string | null>(null);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
    };
  }, []);

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

    setToast(`${product.name} agregado al carrito`);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToast(null), TOAST_DURATION_MS);
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
    () => lines.reduce((sum, l) => sum + (l.product.price ?? 0) * l.qty, 0),
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
        toast,
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
