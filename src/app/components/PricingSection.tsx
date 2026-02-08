"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function PricingSection() {
  const t = useTranslations("pricing");

  const included = [
    t("included.frame"),
    t("included.toppers"),
    t("included.rail"),
    t("included.finish"),
    t("included.delivery"),
    t("included.assembly"),
  ];

  return (
    <section className="relative bg-ink text-paper overflow-hidden">
      {/* Top edge — thin gold line */}
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
              {t("batchLabel")}
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            {t("deadline")}
          </span>
        </div>
      </div>

      {/* Main pricing content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20 reveal-trigger">
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">
            {t("label")}
          </span>
          <h2 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-6">
            {t("title")} <br />
            <span className="italic text-white/40">{t("titleAccent")}</span>
          </h2>
          <p className="font-sans text-lg text-white/50 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Two tables side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-1 reveal-trigger">
          {/* The Standard */}
          <div className="group relative">
            {/* Photo */}
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src="/photos/size-small-3.jpeg"
                alt="The Standard — seats 4"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

              {/* Price overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 block mb-1">
                      {t("standardSeats")}
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl text-white">
                      {t("standardName")}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-4xl md:text-5xl text-white leading-none">
                      €1,920
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="bg-[#242322] p-6 md:p-8">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-sans text-sm text-white/50">
                    {t("closedSize")}
                  </span>
                  <span className="font-mono text-sm text-white/70">
                    108 × 108 cm
                  </span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex justify-between items-baseline">
                  <span className="font-sans text-sm text-white/50">
                    {t("playArea")}
                  </span>
                  <span className="font-mono text-sm text-white/70">
                    90 × 90 cm
                  </span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex justify-between items-baseline">
                  <span className="font-sans text-sm text-white/50">
                    {t("vaultDepth")}
                  </span>
                  <span className="font-mono text-sm text-white/70">10 cm</span>
                </div>
              </div>

              <Link
                href={"/order?size=standard" as "/order"}
                className="block w-full text-center border border-white/20 hover:border-white/50 hover:bg-white/5 py-4 font-mono text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-all duration-300 rounded-full"
              >
                {t("reserveCta")}
              </Link>
            </div>
          </div>

          {/* The Grand */}
          <div className="group relative">
            {/* Photo */}
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src="/photos/size-big-2.jpeg"
                alt="The Grand — seats 6-8"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

              {/* Price overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 block mb-1">
                      {t("grandSeats")}
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl text-white">
                      {t("grandName")}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-4xl md:text-5xl text-white leading-none">
                      €2,390
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="bg-[#242322] p-6 md:p-8">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-sans text-sm text-white/50">
                    {t("closedSize")}
                  </span>
                  <span className="font-mono text-sm text-white/70">
                    108 × 189 cm
                  </span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex justify-between items-baseline">
                  <span className="font-sans text-sm text-white/50">
                    {t("playArea")}
                  </span>
                  <span className="font-mono text-sm text-white/70">
                    90 × 170 cm
                  </span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex justify-between items-baseline">
                  <span className="font-sans text-sm text-white/50">
                    {t("vaultDepth")}
                  </span>
                  <span className="font-mono text-sm text-white/70">10 cm</span>
                </div>
              </div>

              <Link
                href={"/order?size=grand" as "/order"}
                className="block w-full text-center bg-accent hover:bg-accent/90 py-4 font-mono text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 rounded-full"
              >
                {t("reserveCta")}
              </Link>
            </div>
          </div>
        </div>

        {/* What's included */}
        <div className="mt-16 md:mt-20 pt-10 border-t border-white/10 reveal-trigger">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                {t("includedLabel")}
              </span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-3">
                {included.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full shrink-0" />
                    <span className="font-sans text-sm text-white/60">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:text-right shrink-0">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 block mb-2">
                {t("batchSizeLabel")}
              </span>
              <span className="font-serif text-3xl text-white">
                {t("batchSizeValue")}
              </span>
            </div>
          </div>
        </div>

        {/* Fine print */}
        <div className="mt-10 pt-6 border-t border-white/5">
          <p className="font-mono text-[10px] text-white/25 uppercase tracking-wider text-center">
            {t("finePrint")}
          </p>
        </div>
      </div>

      {/* Bottom edge */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
