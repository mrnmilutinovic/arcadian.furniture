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

const productSchemaStandard = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Arcadian Standard - Board Game Table",
  description:
    "Premium board game table for 4 players. Features a 90x90cm recessed vault, magnetic rail system for accessories, convertible dining toppers, and handcrafted solid oak construction.",
  image: "https://www.arcadiantables.com/photos/size-small-3.jpeg",
  brand: { "@type": "Brand", name: "Arcadian" },
  manufacturer: { "@type": "Organization", name: "Arcadian" },
  category: "Board Game Tables",
  material: "Solid Oak",
  additionalProperty: [
    { "@type": "PropertyValue", name: "Table Size", value: "108 x 108 cm" },
    { "@type": "PropertyValue", name: "Play Area", value: "90 x 90 cm" },
    { "@type": "PropertyValue", name: "Seating Capacity", value: "4 players" },
  ],
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/PreOrder",
    availabilityStarts: "2026-03-01",
    url: "https://www.arcadiantables.com",
    seller: { "@type": "Organization", name: "Arcadian" },
  },
};

const productSchemaGrand = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Arcadian Grand - Board Game Table",
  description:
    "Premium board game table for 6-8 players. Features a 90x170cm recessed vault, magnetic rail system for accessories, convertible dining toppers, and handcrafted solid oak construction.",
  image: "https://www.arcadiantables.com/photos/size-big-2.jpeg",
  brand: { "@type": "Brand", name: "Arcadian" },
  manufacturer: { "@type": "Organization", name: "Arcadian" },
  category: "Board Game Tables",
  material: "Solid Oak",
  additionalProperty: [
    { "@type": "PropertyValue", name: "Table Size", value: "108 x 189 cm" },
    { "@type": "PropertyValue", name: "Play Area", value: "90 x 170 cm" },
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
    seller: { "@type": "Organization", name: "Arcadian" },
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
