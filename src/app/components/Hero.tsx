"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useLocale, useTranslations } from "next-intl";
import posthog from "posthog-js";
import { useEffect, useState } from "react";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCtaClick = () => {
    posthog.capture("hero_cta_clicked", {
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
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 pb-6 md:p-12 lg:p-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 md:gap-12">
          {/* Headline */}
          <h1
            className={`text-[#ffffff] leading-[50px] md:leading-[80px] font-staatliches-baskerville text-6xl md:text-7xl lg:text-8xl tracking-[-0.01em] max-w-[700px] transition-all duration-1000 ease-out [text-shadow:0_8px_24px_rgba(0,0,0,0.25),0_4px_8px_rgba(0,0,0,0.05)] ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t("headline1")}{" "}
            <span className="font-ruthie text-[100px] sm:text-[110px] md:text-[190px]">
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
            <div className="bg-[#1a1918] text-white p-6 md:p-10 relative overflow-hidden w-full md:min-w-[400px] lg:w-auto">
              {/* Top section - 2026 Batch */}
              <div className="relative z-10 mb-6 md:mb-8">
                <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/50 mb-2 md:mb-3">
                  {t("limitedProduction")}
                </p>
                <p className="font-staatliches-baskerville text-2xl md:text-4xl tracking-tight">
                  {t("batchOpening")}
                </p>
              </div>

              {/* CTA */}
              <div className="relative z-10">
                <p className="font-sans text-xs md:text-sm text-white/70 mb-3 md:mb-4">
                  {t("ctaText")}
                </p>

                <NextLink
                  href={`${prefix}/#pricing`}
                  onClick={handleCtaClick}
                  className="block w-full bg-white text-[#1a1918] font-sans text-xs md:text-sm uppercase tracking-[0.15em] font-semibold py-3 md:py-4 hover:bg-white/90 transition-colors text-center"
                >
                  {t("notifyMe")}
                </NextLink>
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
