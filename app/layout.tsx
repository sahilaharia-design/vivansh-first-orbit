import type { Metadata } from "next";
import {
  Playfair_Display,
  Inter,
  Noto_Sans_Devanagari,
  Noto_Sans_Gujarati,
} from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const gujarati = Noto_Sans_Gujarati({
  variable: "--font-gujarati",
  subsets: ["gujarati"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vivansh.vercel.app"),
  title: "Vivansh's First Orbit",
  description:
    "One year around the sun. A lifetime of worlds ahead. A first-birthday gift from Sahil Mama & Sakshi Mami.",
  openGraph: {
    title: "Vivansh's First Orbit",
    description:
      "One year around the sun. A lifetime of worlds ahead. A first-birthday gift from Sahil Mama & Sakshi Mami.",
    images: [
      {
        url: "/images/social-preview.png",
        width: 1731,
        height: 909,
        alt: "Vivansh's First Orbit — a first birthday gift from Sahil Mama & Sakshi Mami",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivansh's First Orbit",
    description:
      "One year around the sun. A lifetime of worlds ahead. A first-birthday gift from Sahil Mama & Sakshi Mami.",
    images: ["/images/social-preview.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${devanagari.variable} ${gujarati.variable}`}
    >
      <head>
        <meta name="theme-color" content="#0B1026" />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
