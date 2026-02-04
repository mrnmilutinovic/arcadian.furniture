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
    "Premium board game tables that transform from elegant dining to immersive gaming. Handcrafted with solid oak, modular accessories, and a recessed vault. 2026 batch opening soon.",
  metadataBase: new URL("https://www.arcadiantables.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Arcadian | Elevated Board Game Furniture",
    description:
      "Premium board game tables that transform from elegant dining to immersive gaming. Handcrafted with solid oak, modular accessories, and a recessed vault.",
    url: "https://www.arcadiantables.com",
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
      "Premium board game tables that transform from elegant dining to immersive gaming. 2026 batch opening soon.",
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
  url: "https://www.arcadiantables.com",
  logo: "https://www.arcadiantables.com/new-logo.svg",
  description:
    "Premium board game tables that transform from elegant dining to immersive gaming. Handcrafted with solid oak, modular accessories, and a recessed vault.",
  foundingDate: "2025",
  sameAs: ["https://instagram.com/arcadiantables"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@arcadiantables.com",
    contactType: "customer service",
  },
};

const productSchemaStandard = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Arcadian Standard - Board Game Table",
  description:
    "Premium board game table for 4 players. Features a 90x90cm recessed vault, magnetic rail system for accessories, convertible dining toppers, and handcrafted solid oak construction.",
  image: "https://www.arcadiantables.com/photos/size-small-3.jpeg",
  brand: {
    "@type": "Brand",
    name: "Arcadian",
  },
  manufacturer: {
    "@type": "Organization",
    name: "Arcadian",
  },
  category: "Board Game Tables",
  material: "Solid Oak",
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Table Size",
      value: "108 x 108 cm",
    },
    {
      "@type": "PropertyValue",
      name: "Play Area",
      value: "90 x 90 cm",
    },
    {
      "@type": "PropertyValue",
      name: "Seating Capacity",
      value: "4 players",
    },
  ],
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/PreOrder",
    availabilityStarts: "2026-03-01",
    url: "https://www.arcadiantables.com",
    seller: {
      "@type": "Organization",
      name: "Arcadian",
    },
  },
};

const productSchemaGrand = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Arcadian Grand - Board Game Table",
  description:
    "Premium board game table for 6-8 players. Features a 90x170cm recessed vault, magnetic rail system for accessories, convertible dining toppers, and handcrafted solid oak construction.",
  image: "https://www.arcadiantables.com/photos/size-big-2.jpeg",
  brand: {
    "@type": "Brand",
    name: "Arcadian",
  },
  manufacturer: {
    "@type": "Organization",
    name: "Arcadian",
  },
  category: "Board Game Tables",
  material: "Solid Oak",
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Table Size",
      value: "108 x 189 cm",
    },
    {
      "@type": "PropertyValue",
      name: "Play Area",
      value: "90 x 170 cm",
    },
    {
      "@type": "PropertyValue",
      name: "Seating Capacity",
      value: "6-8 players",
    },
  ],
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/PreOrder",
    availabilityStarts: "2026-03-01",
    url: "https://www.arcadiantables.com",
    seller: {
      "@type": "Organization",
      name: "Arcadian",
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchemaStandard),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchemaGrand),
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
