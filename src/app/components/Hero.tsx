"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import posthog from "posthog-js";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("hero");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCtaClick = () => {
    posthog.capture("hero_cta_order_clicked", {
      location: "hero_section",
      cta_text: t("notifyMe"),
    });
  };

  return (
    <header className="hero-section relative w-full min-h-[100dvh] overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <Image
          src="/graphics/tryout.jpg"
          alt="Arcadian gaming table with puzzle"
          fill
          sizes="100vw"
          className={`object-cover object-center transition-all duration-[1.5s] ease-out ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          priority
        />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-3 pb-4 md:p-12 lg:p-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 md:gap-12">
          {/* Headline */}
          <h1
            className={`text-[#ffffff] leading-[38px] sm:leading-[50px] md:leading-[80px] font-staatliches-baskerville text-[clamp(2.25rem,8vw,3.75rem)] md:text-7xl lg:text-8xl tracking-[-0.01em] max-w-[700px] transition-all duration-1000 ease-out [text-shadow:0_8px_24px_rgba(0,0,0,0.25),0_4px_8px_rgba(0,0,0,0.05)] ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t("headline1")}{" "}
            <span className="font-ruthie text-[clamp(3.5rem,14vw,6.25rem)] sm:text-[110px] md:text-[190px]">
              {t("headline2")}
            </span>{" "}
            {t("headline3")}
          </h1>

          {/* CTA - Dark Brutalist Block */}
          <div
            className={`transition-all duration-1000 delay-200 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-[#1a1918] text-white px-4 py-3 md:p-10 relative overflow-hidden w-full md:min-w-[400px] lg:w-auto">
              {/* Mobile: compact single-row layout | Desktop: stacked layout */}
              <div className="hidden md:block">
                {/* Batch info */}
                <div className="relative z-10 mb-6">
                  <p className="font-sans text-xs uppercase tracking-[0.25em] text-white/50 mb-3">
                    {t("limitedProduction")}
                  </p>
                  <p className="font-staatliches-baskerville text-4xl tracking-tight">
                    {t("batchOpening")}
                  </p>
                </div>

                {/* Price */}
                <div className="relative z-10 mb-8 border-t border-white/10 pt-6">
                  <p className="font-staatliches-baskerville text-4xl tracking-tight mb-2">
                    {t("installmentPrice")}
                  </p>
                  <p className="font-sans text-sm text-white/50">
                    {t("installmentContext")}
                  </p>
                </div>

                {/* CTA */}
                <div className="relative z-10">
                  <Link
                    href={"/order" as "/order"}
                    onClick={handleCtaClick}
                    className="block w-full bg-white text-[#1a1918] font-sans text-sm uppercase tracking-[0.15em] font-semibold py-4 hover:bg-white/90 transition-colors text-center"
                  >
                    {t("notifyMe")}
                  </Link>
                </div>
              </div>

              {/* Mobile: condensed layout */}
              <div className="md:hidden relative z-10">
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/50 mb-0.5">
                      {t("limitedProduction")}
                    </p>
                    <p className="font-staatliches-baskerville text-lg tracking-tight leading-tight">
                      {t("installmentPrice")}
                    </p>
                  </div>
                  <Link
                    href={"/order" as "/order"}
                    onClick={handleCtaClick}
                    className="shrink-0 bg-white text-[#1a1918] font-sans text-[10px] uppercase tracking-[0.15em] font-semibold px-4 py-2.5 hover:bg-white/90 transition-colors"
                  >
                    {t("notifyMe")}
                  </Link>
                </div>
                <p className="font-sans text-[10px] text-white/40 mt-1.5">
                  {t("installmentContext")}
                </p>
              </div>

              {/* Bottom decorative element */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
