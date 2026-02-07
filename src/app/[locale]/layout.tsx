import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "../components/Header";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
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

const baseUrl = "https://www.arcadiantables.com";

const productSchemaStandard = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Arcadian Standard - Board Game Table",
  description:
    "Premium board game table for 4 players. Square design with a 90x90cm recessed vault (10cm deep), magnetic rail system for modular accessories, convertible solid oak dining toppers, and 0% VOC plant-based hardwax oil finish. Handcrafted from solid European oak in Serbia. Flat-pack delivery, 30-minute assembly.",
  image: [
    `${baseUrl}/photos/size-small-3.jpeg`,
    `${baseUrl}/photos/size-small.jpeg`,
    `${baseUrl}/photos/covered-scene-3.jpeg`,
  ],
  brand: { "@type": "Brand", name: "Arcadian" },
  manufacturer: {
    "@type": "Organization",
    name: "Arcadian",
    url: baseUrl,
  },
  url: baseUrl,
  category: "Board Game Tables",
  material: "Solid European Oak",
  color: "Arcadian Dawn (Natural Oak) / Pan's Shadow (Walnut Tones)",
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Closed Table Size",
      value: "108 × 108 cm (42.5 × 42.5 in)",
    },
    {
      "@type": "PropertyValue",
      name: "Play Area (Vault)",
      value: "90 × 90 cm (35.4 × 35.4 in)",
    },
    { "@type": "PropertyValue", name: "Vault Depth", value: "10 cm (3.9 in)" },
    { "@type": "PropertyValue", name: "Seating Capacity", value: "4 players" },
    { "@type": "PropertyValue", name: "Wood Species", value: "European Oak" },
    {
      "@type": "PropertyValue",
      name: "Finish",
      value: "Plant-based hardwax oil, 0% VOC, solvent-free",
    },
    {
      "@type": "PropertyValue",
      name: "Rail System",
      value: "360° magnetic modular rail for accessories",
    },
    {
      "@type": "PropertyValue",
      name: "Assembly Time",
      value: "30 minutes, single tool",
    },
    {
      "@type": "PropertyValue",
      name: "Delivery",
      value: "Flat-pack, fits through standard doorways",
    },
  ],
  hasVariant: [
    {
      "@type": "ProductModel",
      name: "Arcadian Standard - Arcadian Dawn",
      color: "Natural Oak",
    },
    {
      "@type": "ProductModel",
      name: "Arcadian Standard - Pan's Shadow",
      color: "Walnut Tones",
    },
  ],
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/PreOrder",
    availabilityStarts: "2026-03-01",
    url: baseUrl,
    seller: { "@type": "Organization", name: "Arcadian" },
  },
  isRelatedTo: {
    "@type": "Product",
    name: "Arcadian Grand - Board Game Table",
    url: baseUrl,
  },
};

const productSchemaGrand = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Arcadian Grand - Board Game Table",
  description:
    "Premium board game table for 6-8 players. Rectangular design with a 90x170cm recessed vault (10cm deep), magnetic rail system for modular accessories, convertible solid oak dining toppers, and 0% VOC plant-based hardwax oil finish. Handcrafted from solid European oak in Serbia. Flat-pack delivery, 30-minute assembly.",
  image: [
    `${baseUrl}/photos/size-big-2.jpeg`,
    `${baseUrl}/photos/size-big.jpeg`,
    `${baseUrl}/photos/covered-scene.jpeg`,
    `${baseUrl}/photos/arcadian-gaming-3.jpeg`,
  ],
  brand: { "@type": "Brand", name: "Arcadian" },
  manufacturer: {
    "@type": "Organization",
    name: "Arcadian",
    url: baseUrl,
  },
  url: baseUrl,
  category: "Board Game Tables",
  material: "Solid European Oak",
  color: "Arcadian Dawn (Natural Oak) / Pan's Shadow (Walnut Tones)",
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Closed Table Size",
      value: "108 × 189 cm (42.5 × 74.4 in)",
    },
    {
      "@type": "PropertyValue",
      name: "Play Area (Vault)",
      value: "90 × 170 cm (35.4 × 66.9 in)",
    },
    { "@type": "PropertyValue", name: "Vault Depth", value: "10 cm (3.9 in)" },
    {
      "@type": "PropertyValue",
      name: "Seating Capacity",
      value: "6-8 players",
    },
    { "@type": "PropertyValue", name: "Wood Species", value: "European Oak" },
    {
      "@type": "PropertyValue",
      name: "Finish",
      value: "Plant-based hardwax oil, 0% VOC, solvent-free",
    },
    {
      "@type": "PropertyValue",
      name: "Rail System",
      value: "360° magnetic modular rail for accessories",
    },
    {
      "@type": "PropertyValue",
      name: "Assembly Time",
      value: "30 minutes, single tool",
    },
    {
      "@type": "PropertyValue",
      name: "Delivery",
      value: "Flat-pack, fits through standard doorways",
    },
  ],
  hasVariant: [
    {
      "@type": "ProductModel",
      name: "Arcadian Grand - Arcadian Dawn",
      color: "Natural Oak",
    },
    {
      "@type": "ProductModel",
      name: "Arcadian Grand - Pan's Shadow",
      color: "Walnut Tones",
    },
  ],
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/PreOrder",
    availabilityStarts: "2026-03-01",
    url: baseUrl,
    seller: { "@type": "Organization", name: "Arcadian" },
  },
  isRelatedTo: {
    "@type": "Product",
    name: "Arcadian Standard - Board Game Table",
    url: baseUrl,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://www.arcadiantables.com"),
    alternates: {
      canonical: "/",
      languages: {
        en: "/",
        sr: "/sr",
        "x-default": "/",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
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
      locale: locale === "sr" ? "sr_RS" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/photos/covered-scene-3.jpeg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <>
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
      <NextIntlClientProvider messages={messages}>
        <Header />
        {children}
      </NextIntlClientProvider>
    </>
  );
}
