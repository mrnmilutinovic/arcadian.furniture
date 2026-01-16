import type { Metadata } from "next";
import {
  Caveat,
  Cormorant_Garamond,
  Manrope,
  Petemoss,
  Space_Mono,
  Staatliches,
} from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";

const staatliches = Staatliches({
  variable: "--font-staatliches-baskerville",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

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
    "Premium board game tables that transform from elegant dining to immersive gaming. Handcrafted with solid oak, modular accessories, and a recessed vault. Launching on Kickstarter March 2026.",
  metadataBase: new URL("https://arcadian.furniture"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Arcadian | Elevated Board Game Furniture",
    description:
      "Premium board game tables that transform from elegant dining to immersive gaming. Handcrafted with solid oak, modular accessories, and a recessed vault.",
    url: "https://arcadian.furniture",
    siteName: "Arcadian",
    images: [
      {
        url: "/photos/covered-scene-3.jpeg",
        width: 1200,
        height: 630,
        alt: "Arcadian board game table in dining mode",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcadian | Elevated Board Game Furniture",
    description:
      "Premium board game tables that transform from elegant dining to immersive gaming. Launching on Kickstarter March 2026.",
    images: ["/photos/covered-scene-3.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Arcadian",
  url: "https://arcadian.furniture",
  logo: "https://arcadian.furniture/new-logo.svg",
  description:
    "Premium board game tables that transform from elegant dining to immersive gaming. Handcrafted with solid oak, modular accessories, and a recessed vault.",
  foundingDate: "2025",
  sameAs: ["https://instagram.com/arcadian.furniture"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@arcadian.furniture",
    contactType: "customer service",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${manrope.variable} ${spaceMono.variable} ${caveat.variable} ${ruthie.variable} ${staatliches.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
