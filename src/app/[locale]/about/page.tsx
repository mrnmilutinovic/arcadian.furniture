import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Footer } from "../../components/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: "/about",
      languages: {
        en: "/about",
        sr: "/sr/o-nama",
        "x-default": "/about",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
      images: [
        {
          url: "/photos/about-hero.jpeg",
          width: 1200,
          height: 630,
          alt: "The Arcadian family team",
        },
      ],
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <div className="min-h-screen bg-paper">
      {/* Hero */}
      <header className="pt-28 md:pt-36 pb-16 px-6 md:px-12 bg-[#F3F1EA]">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { label: t("breadcrumbHome"), href: "/" },
              { label: t("breadcrumbAbout") },
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

      {/* Hero Image - Full Width */}
      <section className="w-full aspect-[21/9] relative bg-ink/5">
        <Image
          src="/photos/about-hero.jpeg"
          alt="The Arcadian team in the workshop"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">
            {t("storyLabel")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mb-8">
            {t("storyTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-7 space-y-6">
              <p className="font-sans text-lg text-ink/70 leading-relaxed">
                {t("storyP1")}
              </p>
              <p className="font-sans text-lg text-ink/70 leading-relaxed">
                {t("storyP2")}
              </p>
              <p className="font-sans text-lg text-ink/70 leading-relaxed">
                {t("storyP3")}
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="aspect-[4/5] relative bg-ink/5 rounded-sm overflow-hidden">
                <Image
                  src="/photos/about-nikola-jana.jpeg"
                  alt="Nikola and Jana, founders of Arcadian"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <p className="font-mono text-[10px] text-ink/40 mt-3 uppercase tracking-widest">
                {t("foundersCaption")}
              </p>
            </div>
          </div>
        </div>

        {/* Additional founder photos */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 mt-12">
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-[4/3] relative bg-ink/5 rounded-sm overflow-hidden">
              <Image
                src="/photos/about-nikola-jana-1.jpeg"
                alt="Nikola and Jana working on Arcadian designs"
                fill
                sizes="(max-width: 768px) 33vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="aspect-[4/3] relative bg-ink/5 rounded-sm overflow-hidden">
              <Image
                src="/photos/about-nikola-jana-2.jpeg"
                alt="Nikola and Jana during a game night"
                fill
                sizes="(max-width: 768px) 33vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="aspect-[4/3] relative bg-ink/5 rounded-sm overflow-hidden">
              <Image
                src="/photos/about-nikola-jana-3.jpeg"
                alt="Nikola and Jana with their board game collection"
                fill
                sizes="(max-width: 768px) 33vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Design Process */}
      <section className="py-16 md:py-24 bg-[#F3F1EA]">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">
            {t("processLabel")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mb-8">
            {t("processTitle")}
          </h2>
          <div className="space-y-6 max-w-3xl">
            <p className="font-sans text-lg text-ink/70 leading-relaxed">
              {t("processP1")}
            </p>
            <p className="font-sans text-lg text-ink/70 leading-relaxed">
              {t("processP2")}
            </p>
          </div>
        </div>

        {/* Process Images - Masonry Layout */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 mt-12">
          <div className="columns-2 md:columns-3 gap-2 space-y-2">
            <div className="break-inside-avoid">
              <Image
                src="/photos/arcadian-about-1.jpeg"
                alt="Arcadian table design and prototyping process"
                width={600}
                height={800}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full h-auto"
              />
            </div>
            <div className="break-inside-avoid">
              <Image
                src="/photos/arcadian-about-2.jpeg"
                alt="Testing board games on the Arcadian prototype"
                width={600}
                height={400}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full h-auto"
              />
            </div>
            <div className="break-inside-avoid">
              <Image
                src="/photos/arcadian-about-3.jpeg"
                alt="Game night testing session"
                width={600}
                height={600}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full h-auto"
              />
            </div>
            <div className="break-inside-avoid">
              <Image
                src="/photos/arcadian-about-10.jpeg"
                alt="Arcadian table in action"
                width={600}
                height={400}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full h-auto"
              />
            </div>
            <div className="break-inside-avoid">
              <video
                src="/videos/arcadian-about-1.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
            </div>
            <div className="break-inside-avoid">
              <Image
                src="/photos/arcadian-about-5.jpeg"
                alt="Playtesting with family and friends"
                width={600}
                height={400}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full h-auto"
              />
            </div>
            <div className="break-inside-avoid">
              <Image
                src="/photos/arcadian-about-6.jpeg"
                alt="Epic board game campaign on Arcadian"
                width={600}
                height={600}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full h-auto"
              />
            </div>
            <div className="break-inside-avoid">
              <video
                src="/videos/arcadian-about-2.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
            </div>
            <div className="break-inside-avoid">
              <Image
                src="/photos/arcadian-about-11.jpeg"
                alt="Board game session close-up"
                width={600}
                height={600}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full h-auto"
              />
            </div>
            <div className="break-inside-avoid">
              <Image
                src="/photos/arcadian-about-7.jpeg"
                alt="Testing the recessed vault with components"
                width={600}
                height={800}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full h-auto"
              />
            </div>
            <div className="break-inside-avoid">
              <Image
                src="/photos/arcadian-about-8.jpeg"
                alt="Long gaming session on the Arcadian table"
                width={600}
                height={400}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full h-auto"
              />
            </div>
            <div className="break-inside-avoid">
              <video
                src="/videos/arcadian-about-3.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
            </div>
            <div className="break-inside-avoid">
              <Image
                src="/photos/arcadian-about-9.jpeg"
                alt="Game night memories on Arcadian table"
                width={600}
                height={600}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Craftsmen */}
      <section className="relative -mt-72 md:-mt-96 pb-16 md:pb-24 px-6 md:px-12 bg-gradient-to-b from-transparent via-paper/60 via-30% to-paper to-50%">
        <div className="pt-48 md:pt-72 max-w-4xl mx-auto">
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">
            {t("workshopLabel")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mb-8">
            {t("workshopTitle")}
          </h2>
          <div className="space-y-6 max-w-3xl">
            <p className="font-sans text-lg text-ink/70 leading-relaxed">
              {t("workshopP1")}
            </p>
            <p className="font-sans text-lg text-ink/70 leading-relaxed">
              {t("workshopP2")}
            </p>
            <p className="font-sans text-lg text-ink/70 leading-relaxed">
              {t("workshopP3")}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-ink text-paper">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">
            {t("valuesLabel")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mb-12">
            {t("valuesTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-2xl mb-3">
                {t("precisionTitle")}
              </h3>
              <p className="font-sans text-paper/60 leading-relaxed">
                {t("precisionDescription")}
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl mb-3">
                {t("durabilityTitle")}
              </h3>
              <p className="font-sans text-paper/60 leading-relaxed">
                {t("durabilityDescription")}
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl mb-3">{t("functionTitle")}</h3>
              <p className="font-sans text-paper/60 leading-relaxed">
                {t("functionDescription")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            {t("ctaTitle")}
          </h2>
          <p className="font-sans text-lg text-ink/60 mb-10 max-w-xl mx-auto">
            {t("ctaDescription")}
          </p>
          <Link
            href="/"
            className="inline-block bg-ink text-paper px-10 py-5 font-mono text-sm uppercase tracking-widest hover:bg-accent transition-colors rounded-full"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
