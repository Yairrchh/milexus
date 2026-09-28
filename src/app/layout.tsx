import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import CartToast from "@/components/CartToast";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import "./globals.css";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ELECTRONOVA — Electrodomésticos al Mayor",
  description: "Distribuidor mayorista de electrodomésticos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-ml-white text-ml-ink font-sans min-h-screen">
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartDrawer />
          <CartToast />
          <WhatsAppWidget />
        </CartProvider>
      </body>
    </html>
  );
}
