import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { TrackLandingView } from "./TrackLandingView";
import { TrackReferral } from "./TrackReferral";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "landingInstagram" });

  return {
    title: `${t("heroHeadline")} | Arcadian`,
    description: t("heroSubheadline"),
    robots: { index: false, follow: false },
  };
}

export default async function InstagramLandingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "landingInstagram" });
  const faq = await getTranslations({ locale, namespace: "faq.questions" });
  const pricing = await getTranslations({ locale, namespace: "pricing" });

  const faqItems = [
    { q: faq("q1.question"), a: faq("q1.answer") },
    { q: faq("q2.question"), a: faq("q2.answer") },
    { q: faq("q6.question"), a: faq("q6.answer") },
    { q: faq("q4.question"), a: faq("q4.answer") },
    { q: faq("q11.question"), a: faq("q11.answer") },
  ];

  return (
    <>
      <TrackReferral />
      <TrackLandingView />

      {/* ── HERO ── */}
      <header className="relative w-full min-h-[100dvh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/graphics/tryout.jpg"
            alt="Arcadian gaming table"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Top gradient for logo visibility */}
        <div className="absolute top-0 left-0 right-0 z-10 h-40 bg-gradient-to-b from-black/50 to-transparent" />

        {/* Logo top-left */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4 md:p-8 lg:p-12">
          <Image
            src="/new-logo.svg"
            alt="Arcadian"
            width={120}
            height={28}
            className="brightness-0 invert"
          />
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 pb-6 md:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 md:gap-12">
            <h1 className="text-white leading-[1.05] font-staatliches-baskerville text-5xl md:text-7xl lg:text-8xl tracking-[-0.01em] max-w-[700px] [text-shadow:0_8px_24px_rgba(0,0,0,0.25),0_4px_8px_rgba(0,0,0,0.05)]">
              {t("heroHeadline")}
            </h1>

            {/* CTA block — brutalist dark */}
            <div className="w-full md:min-w-[380px] lg:w-auto">
              <div className="bg-[#1a1918] text-white p-6 md:p-10 relative overflow-hidden">
                <div className="mb-6 md:mb-8">
                  <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/50 mb-2">
                    {pricing("label")}
                  </p>
                  <p className="font-staatliches-baskerville text-2xl md:text-4xl tracking-tight">
                    {pricing("batchLabel")}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-xs md:text-sm text-white/70 mb-3 md:mb-4">
                    {t("heroSubheadline")}
                  </p>
                  <Link
                    href={"/order" as "/order"}
                    className="block w-full bg-white text-[#1a1918] font-sans text-xs md:text-sm uppercase tracking-[0.15em] font-semibold py-3 md:py-4 hover:bg-white/90 transition-colors text-center"
                  >
                    {t("heroCta")}
                  </Link>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── PHOTO GRID ── */}
      <section className="w-full h-[40dvh] md:h-[60dvh]">
        <div className="grid grid-cols-3 h-full gap-1">
          <div className="relative">
            <Image
              src="/photos/preview-16.jpeg"
              alt="Wood grain detail"
              fill
              sizes="33vw"
              className="object-cover"
            />
          </div>
          <div className="relative">
            <Image
              src="/photos/preview-17.jpeg"
              alt="Game components on table"
              fill
              sizes="33vw"
              className="object-cover"
            />
          </div>
          <div className="relative">
            <Image
              src="/photos/preview-11.jpeg"
              alt="Oak corner detail"
              fill
              sizes="33vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── TRANSFORMATION ── */}
      <section className="py-16 md:py-20 bg-[#F3F1EA] border-t border-ink/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-3">
              {t("transformTitle")}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              {t("transformDining")}
              <span className="italic text-ink/50">
                {" "}
                &rarr; {t("transformVault")}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-1">
            {/* Dining mode */}
            <div>
              <div className="aspect-[4/3] relative bg-black/5 overflow-hidden">
                <Image
                  src="/photos/covered-scene-3.jpeg"
                  alt={t("transformDining")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 relative">
                <div className="bg-white px-3 py-1 rounded-lg absolute -top-12 rotate-[-7deg] left-1">
                  <h3 className="font-sans text-xl md:text-2xl">
                    {t("transformDining")}
                  </h3>
                </div>
                <p className="font-sans text-sm text-ink/60 leading-relaxed mt-6 max-w-[500px]">
                  {t("transformDiningDesc")}
                </p>
              </div>
            </div>

            {/* Vault mode */}
            <div>
              <div className="aspect-[4/3] relative bg-black/5 overflow-hidden">
                <Image
                  src="/photos/uncovering-scene-2.jpeg"
                  alt={t("transformVault")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 relative">
                <div className="bg-black text-white px-3 py-1 rounded-lg absolute -top-12 rotate-[4deg] left-1">
                  <h3 className="font-sans text-xl md:text-2xl">
                    {t("transformVault")}
                  </h3>
                </div>
                <p className="font-sans text-sm text-ink/60 leading-relaxed mt-6 max-w-[500px]">
                  {t("transformVaultDesc")}
                </p>
              </div>
            </div>
          </div>

          {/* Gaming action shot — full bleed */}
          <div className="mt-12 aspect-[16/9] md:aspect-[21/9] relative overflow-hidden">
            <Image
              src="/photos/arcadian-gaming-3.jpeg"
              alt={t("transformGaming")}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <h3 className="font-serif text-2xl md:text-4xl text-white mb-2">
                {t("transformGaming")}
              </h3>
              <p className="font-sans text-sm md:text-base text-white/70 max-w-lg">
                {t("transformGamingDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="relative bg-ink text-paper overflow-hidden">
        {/* Top gold line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        {/* Batch badge bar */}
        <div className="border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                {pricing("batchLabel")}
              </span>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
              {pricing("deadline")}
            </span>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
          {/* Section header */}
          <div className="text-center mb-16 md:mb-20">
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">
              {pricing("label")}
            </span>
            <h2 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-6">
              {t("specsTitle")}
            </h2>
            <p className="font-sans text-lg text-white/50 max-w-xl mx-auto">
              {pricing("subtitle")}
            </p>
          </div>

          {/* Pricing cards with product photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-1">
            {/* The Standard */}
            <div className="group relative">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src="/photos/size-small-3.jpeg"
                  alt="The Standard — seats 4"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 block mb-1">
                        {t("specsStandardSeats")}
                      </span>
                      <h3 className="font-serif text-3xl md:text-4xl text-white">
                        {t("specsStandard")}
                      </h3>
                    </div>
                    <span className="font-serif text-4xl md:text-5xl text-white leading-none">
                      <span className="text-white/70 text-3xl md:text-4xl align-baseline">€</span>
                      1,920
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-[#242322] p-6 md:p-8">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-sm text-white/50">
                      {pricing("closedSize")}
                    </span>
                    <span className="font-mono text-sm text-white/70">
                      {t("specsStandardSize")}
                    </span>
                  </div>
                  <div className="w-full h-px bg-white/5" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-sm text-white/50">
                      {pricing("playArea")}
                    </span>
                    <span className="font-mono text-sm text-white/70">
                      {t("specsStandardVault")}
                    </span>
                  </div>
                  <div className="w-full h-px bg-white/5" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-sm text-white/50">
                      {pricing("vaultDepth")}
                    </span>
                    <span className="font-mono text-sm text-white/70">
                      10 cm
                    </span>
                  </div>
                </div>
                <Link
                  href={"/order?size=standard" as "/order"}
                  className="block w-full text-center border border-white/20 hover:border-white/50 hover:bg-white/5 py-4 font-mono text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-all duration-300 rounded-full"
                >
                  {t("specsCta")}
                </Link>
              </div>
            </div>

            {/* The Grand */}
            <div className="group relative">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src="/photos/size-big-2.jpeg"
                  alt="The Grand — seats 6-8"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 block mb-1">
                        {t("specsGrandSeats")}
                      </span>
                      <h3 className="font-serif text-3xl md:text-4xl text-white">
                        {t("specsGrand")}
                      </h3>
                    </div>
                    <span className="font-serif text-4xl md:text-5xl text-white leading-none">
                      <span className="text-white/70 text-3xl md:text-4xl align-baseline">€</span>
                      2,390
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-[#242322] p-6 md:p-8">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-sm text-white/50">
                      {pricing("closedSize")}
                    </span>
                    <span className="font-mono text-sm text-white/70">
                      {t("specsGrandSize")}
                    </span>
                  </div>
                  <div className="w-full h-px bg-white/5" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-sm text-white/50">
                      {pricing("playArea")}
                    </span>
                    <span className="font-mono text-sm text-white/70">
                      {t("specsGrandVault")}
                    </span>
                  </div>
                  <div className="w-full h-px bg-white/5" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-sm text-white/50">
                      {pricing("vaultDepth")}
                    </span>
                    <span className="font-mono text-sm text-white/70">
                      10 cm
                    </span>
                  </div>
                </div>
                <Link
                  href={"/order?size=grand" as "/order"}
                  className="block w-full text-center bg-accent hover:bg-accent/90 py-4 font-mono text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 rounded-full"
                >
                  {t("specsCta")}
                </Link>
              </div>
            </div>
          </div>

          {/* Fine print */}
          <div className="mt-10 pt-6 border-t border-white/5">
            <p className="font-mono text-[10px] text-white/25 uppercase tracking-wider text-center">
              {pricing("finePrint")}
            </p>
          </div>
        </div>

        {/* Bottom edge */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* ── FOUNDERS ── */}
      <section className="py-16 md:py-24 px-6 bg-paper">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-5 relative">
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src="/photos/about-nikola-jana.jpeg"
                  alt={t("foundersCaption")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-4">
                {t("foundersCaption")}
              </p>
            </div>
            <div className="md:col-span-7">
              <span className="font-mono text-xs text-oak tracking-widest uppercase block mb-6">
                Arcadian, Serbia
              </span>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight text-ink mb-8">
                {t("foundersTitle")}
              </h2>
              <p className="font-sans text-lg font-light leading-relaxed text-ink/70 mb-8">
                {t("foundersText")}
              </p>
              <Link
                href={"/order" as "/order"}
                className="inline-block bg-ink text-paper px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-ink/90 transition-colors"
              >
                {t("heroCta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-24 px-6 bg-[#EAE8E1] border-t border-ink/5">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-3">
              FAQ
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              {t("faqTitle")}
            </h2>
          </div>
          <div className="space-y-0">
            {faqItems.map((item, i) => (
              <div
                key={item.q}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-t border-ink/10"
              >
                <div className="md:col-span-1">
                  <span className="font-mono text-[10px] text-ink/30">
                    0{i + 1}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-serif text-xl text-ink">{item.q}</h3>
                </div>
                <div className="md:col-span-7">
                  <p className="font-sans text-sm text-ink/60 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA — Amber urgency block ── */}
      <section className="relative bg-amber-400/80 py-16 md:py-24 px-6 md:px-12 overflow-hidden">
        {/* Diagonal pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            <div className="max-w-2xl">
              <span className="font-mono text-2xl uppercase tracking-widest text-black/60 block mb-6">
                {t("finalCtaHeadline")}
              </span>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-black mb-6 leading-tight">
                {pricing("batchLabel")}
              </h2>
              <p className="font-sans text-lg md:text-xl text-black/70 mb-8 max-w-xl">
                {t("finalCtaText")}
              </p>
              <Link
                href={"/order" as "/order"}
                className="inline-block bg-black text-white px-10 py-4 font-mono text-xs uppercase tracking-widest hover:bg-black/80 transition-colors"
              >
                {t("finalCtaCta")}
              </Link>
            </div>

            <div className="flex flex-col gap-6 md:text-right shrink-0">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-black/50 mb-1">
                  {pricing("batchSizeLabel")}
                </div>
                <div className="font-serif text-3xl md:text-4xl text-black">
                  {pricing("batchSizeValue")}
                </div>
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-black/50 mb-1">
                  {pricing("includedLabel")}
                </div>
                <div className="font-sans text-sm text-black/70 space-y-1">
                  <p>{pricing("included.frame")}</p>
                  <p>{pricing("included.toppers")}</p>
                  <p>{pricing("included.rail")}</p>
                  <p>{pricing("included.finish")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amber divider */}
      <div className="relative bg-amber-400/80 h-3 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #000 0, #000 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* ── MINIMAL FOOTER ── */}
      <footer className="py-8 px-6 md:px-12 bg-ink">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image
            src="/new-logo.svg"
            alt="Arcadian"
            width={100}
            height={24}
            className="brightness-0 invert opacity-50"
          />
          <div className="flex items-center gap-6 font-mono text-xs text-white/30">
            <Link
              href={"/terms" as "/terms"}
              className="hover:text-white/60 transition-colors"
            >
              {t("footerTerms")}
            </Link>
            <Link
              href={"/privacy" as "/privacy"}
              className="hover:text-white/60 transition-colors"
            >
              {t("footerPrivacy")}
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
