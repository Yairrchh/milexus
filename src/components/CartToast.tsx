"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CartToast() {
  const { toast } = useCart();
  const [message, setMessage] = useState<string | null>(null);
  const [prevToast, setPrevToast] = useState<string | null>(null);

  if (toast !== prevToast) {
    setPrevToast(toast);
    if (toast) setMessage(toast);
  }

  const visible = toast !== null;

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      onTransitionEnd={() => {
        if (!visible) setMessage(null);
      }}
      className={`fixed left-1/2 top-20 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full bg-ml-ink px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-black/20 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-ml-blue" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
      {message}
    </div>
  );
}
