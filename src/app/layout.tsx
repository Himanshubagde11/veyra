import type { Metadata } from "next";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${inter.variable}`}>
      <body className="font-sans bg-veyra-porcelain text-veyra-aubergine antialiased">
        {children}
      </body>
    </html>
  );
}
