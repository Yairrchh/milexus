"use client";

import { useEffect, useRef, useState } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const promoWhatsAppUrl = buildWhatsAppUrl(
  "Hola, quiero información sobre precios al mayor en ELECTRONOVA."
);

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 4.99L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.24c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.02.28-3.42-.71-2.88-1.19-4.73-4.1-4.87-4.29-.14-.19-1.16-1.55-1.16-2.96s.72-2.1.98-2.39c.25-.28.55-.35.73-.35.19 0 .37 0 .53.01.17.01.4-.06.62.48.24.58.8 2 .87 2.14.07.15.12.32.02.51-.1.19-.15.31-.29.47-.15.17-.31.37-.44.5-.15.14-.3.3-.13.59.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

const DRAG_THRESHOLD = 4;
const EDGE_MARGIN = 8;

export default function WhatsAppWidget() {
  const [collapsed, setCollapsed] = useState(false);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ pointerX: number; pointerY: number; left: number; top: number } | null>(null);
  const moved = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setCollapsed(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = shellRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragStart.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      left: pos?.left ?? rect.left,
      top: pos?.top ?? rect.top,
    };
    moved.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current || !shellRef.current) return;
    const dx = e.clientX - dragStart.current.pointerX;
    const dy = e.clientY - dragStart.current.pointerY;
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) moved.current = true;
    if (!moved.current) return;

    const rect = shellRef.current.getBoundingClientRect();
    const newLeft = Math.min(
      Math.max(dragStart.current.left + dx, EDGE_MARGIN),
      window.innerWidth - rect.width - EDGE_MARGIN
    );
    const newTop = Math.min(
      Math.max(dragStart.current.top + dy, EDGE_MARGIN),
      window.innerHeight - rect.height - EDGE_MARGIN
    );
    setPos({ left: newLeft, top: newTop });
  };

  const handlePointerUp = () => {
    dragStart.current = null;
    if (!moved.current) {
      window.open(promoWhatsAppUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsed(true);
  };

  return (
    <div
      ref={shellRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={pos ? { left: pos.left, top: pos.top, touchAction: "none" } : { touchAction: "none" }}
      className={`fixed z-50 flex cursor-grab select-none items-center bg-white shadow-xl shadow-black/10 transition-[padding,gap,border-radius] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:cursor-grabbing ${
        pos ? "" : "bottom-4 right-4 sm:bottom-6 sm:right-6"
      } ${collapsed ? "gap-0 rounded-full p-3" : "gap-3 rounded-2xl p-4"}`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
        <WhatsAppIcon />
      </span>

      <div
        className={`overflow-hidden transition-[max-width,opacity] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          collapsed ? "pointer-events-none max-w-0 opacity-0" : "max-w-[220px] opacity-100"
        }`}
      >
        <div className="flex w-[220px] items-start gap-2 text-sm">
          <div className="flex-1">
            <p className="font-semibold text-ml-ink">¡Compra al mayor!</p>
            <p className="text-ml-grey">
              Escríbenos por WhatsApp y recibe precios especiales.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label="Cerrar aviso"
            className="shrink-0 text-ml-grey hover:text-ml-ink"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
