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
  const t = await getTranslations({ locale, namespace: "faq" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: locale === "en" ? "/faq" : `/${locale}/cesta-pitanja`,
      languages: {
        en: "/faq",
        sr: "/sr/cesta-pitanja",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
    },
  };
}

export default async function FAQPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "faq" });

  // Build FAQs array from translations
  const faqs = [];
  for (let i = 1; i <= 14; i++) {
    const questionKey = `questions.q${i}.question`;
    const answerKey = `questions.q${i}.answer`;
    faqs.push({
      question: t(questionKey),
      answer: t(answerKey),
    });
  }

  // Generate FAQ Schema from translated content
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <div className="min-h-screen bg-paper">
        {/* Header */}
        <header className="pt-28 md:pt-36 pb-16 px-6 md:px-12 bg-[#F3F1EA]">
          <div className="max-w-4xl mx-auto">
            <Breadcrumbs
              items={[
                { label: t("breadcrumbHome"), href: "/" },
                { label: t("breadcrumbFaq") },
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

        {/* FAQ List */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-0 divide-y divide-ink/10">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group py-6 first:pt-0 last:pb-0"
                >
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <h2 className="font-serif text-xl md:text-2xl pr-8 group-hover:text-accent transition-colors">
                      {faq.question}
                    </h2>
                    <span className="shrink-0 w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center group-open:rotate-45 transition-transform">
                      <svg
                        className="w-4 h-4 text-ink/40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="font-sans text-ink/70 leading-relaxed mt-4 pr-16">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-[#F3F1EA]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              {t("stillHaveQuestions")}
            </h2>
            <p className="font-sans text-lg text-ink/60 mb-8">
              {t("stillHaveQuestionsSubtitle")}
            </p>
            <a
              href="mailto:hello@arcadiantables.com"
              className="inline-block bg-ink text-paper px-10 py-5 font-mono text-sm uppercase tracking-widest hover:bg-accent transition-colors rounded-full"
            >
              {t("contactUs")}
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
