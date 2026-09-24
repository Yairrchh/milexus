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
