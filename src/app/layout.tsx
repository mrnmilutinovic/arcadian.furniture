import type { Metadata } from "next";
import {
  Caveat,
  Cormorant_Garamond,
  Manrope,
  Petemoss,
  Space_Mono,
  Staatliches
} from "next/font/google";
import "./globals.css";

const staatliches = Staatliches({
  variable: "--font-staatliches-baskerville",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"]
})

const ruthie = Petemoss({
  variable: "--font-ruthie",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-brush",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Arcadian | Elevated Board Game Furniture",
  description:
    "We design board game tables that combine function, style, and lasting quality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorantGaramond.variable} ${manrope.variable} ${spaceMono.variable} ${caveat.variable} ${ruthie.variable} ${staatliches.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
