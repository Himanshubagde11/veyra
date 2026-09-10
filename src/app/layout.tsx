import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F7F3ED",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "VEYRA — Discover Beyond Ordinary",
    template: "%s | VEYRA",
  },
  description:
    "Curated objects, unexpected essentials and everyday pieces designed to stand apart. Discover products worth finding at VEYRA.",
  keywords: [
    "curated marketplace",
    "premium products",
    "design objects",
    "lifestyle",
    "VEYRA",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "VEYRA",
    title: "VEYRA — Discover Beyond Ordinary",
    description:
      "Curated objects, unexpected essentials and everyday pieces designed to stand apart.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VEYRA — Discover Beyond Ordinary",
    description:
      "Curated objects, unexpected essentials and everyday pieces designed to stand apart.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import { AuthProvider } from "@/components/providers/AuthProvider";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${inter.variable}`}>
      <body className="font-sans bg-veyra-porcelain text-veyra-aubergine antialiased flex flex-col min-h-screen">
        <div 
          className="fixed inset-0 pointer-events-none z-50 mix-blend-multiply opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />
        <AuthProvider>
          <HeaderWrapper />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
