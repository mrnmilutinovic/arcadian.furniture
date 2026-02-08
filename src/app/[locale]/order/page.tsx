import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Footer } from "../../components/Footer";
import { OrderForm } from "./OrderForm";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ size?: string; finish?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "order" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: "/order",
      languages: {
        en: "/order",
        sr: "/sr/narucite",
        "x-default": "/order",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
    },
  };
}

export default async function OrderPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("order");
  const { size, finish } = await searchParams;

  return (
    <div className="min-h-screen bg-paper">
      <header className="pt-28 md:pt-36 pb-16 px-6 md:px-12 bg-[#F3F1EA]">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { label: t("breadcrumbHome"), href: "/" },
              { label: t("breadcrumbOrder") },
            ]}
          />
          <h1 className="font-serif text-5xl md:text-7xl mb-6">
            {t("title")}{" "}
            <span className="italic text-ink/50">{t("titleAccent")}</span>
          </h1>
          <p className="font-sans text-xl text-ink/60 max-w-2xl">
            {t("subtitle")}
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <OrderForm defaultSize={size} defaultFinish={finish} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
