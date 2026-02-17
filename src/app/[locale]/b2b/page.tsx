import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Footer } from "../../components/Footer";
import { B2BForm } from "./B2BForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "b2b" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: "/b2b",
      languages: {
        en: "/b2b",
        sr: "/sr/poslovni-kontakt",
        "x-default": "/b2b",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
    },
  };
}

export default async function B2BPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("b2b");

  return (
    <div className="min-h-screen bg-paper">
      <header className="pt-28 md:pt-36 pb-10 px-6 md:px-12 bg-[#F3F1EA]">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { label: t("breadcrumbHome"), href: "/" },
              { label: t("breadcrumbB2B") },
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

      <section className="py-10 md:py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <B2BForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
