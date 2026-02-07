import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Footer } from "../../components/Footer";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: locale === "en" ? "/terms" : `/${locale}/uslovi`,
      languages: {
        en: "/terms",
        sr: "/sr/uslovi",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
    },
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "terms" });

  return (
    <div className="min-h-screen bg-paper">
      {/* Content */}
      <main className="pt-28 md:pt-36 pb-16 md:pb-20 px-4 md:px-12 max-w-3xl mx-auto">
        <Breadcrumbs
          items={[
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("breadcrumbTerms") },
          ]}
        />
        <h1 className="font-serif text-4xl md:text-5xl mb-12">{t("title")}</h1>

        <div className="prose prose-lg font-sans text-ink/70 space-y-8">
          <p className="text-sm font-mono text-ink/40 uppercase tracking-widest">
            {t("lastUpdated")}
          </p>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              {t("section1Title")}
            </h2>
            <p>{t("section1Text")}</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              {t("section2Title")}
            </h2>
            <p>{t("section2Text")}</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              {t("section3Title")}
            </h2>
            <p>{t("section3Text")}</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              {t("section4Title")}
            </h2>
            <p>{t("section4Text")}</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              {t("section5Title")}
            </h2>
            <p>{t("section5Text")}</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              {t("section6Title")}
            </h2>
            <p>{t("section6Text")}</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              {t("section7Title")}
            </h2>
            <p>{t("section7Text")}</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
