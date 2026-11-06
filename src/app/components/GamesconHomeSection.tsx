"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import posthog from "posthog-js";
import { anton, GAMESCON_END, INSTAGRAM_DM_URL } from "./gamescon";

const YELLOW = "#f9cd36";

export function GamesconHomeSection() {
  const t = useTranslations("gamescon.home");

  if (Date.now() >= GAMESCON_END) return null;

  const steps = [t("step1"), t("step2"), t("step3")];

  return (
    <section
      id="gamescon"
      aria-label={t("ariaLabel")}
      className="relative overflow-hidden text-white"
      style={{ backgroundColor: "#05080a" }}
    >
      {/* Yellow glows, echoing gamescon.rs */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 70% at 0% 0%, rgba(249,205,54,0.18), transparent 60%), radial-gradient(50% 60% at 100% 100%, rgba(249,205,54,0.14), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${YELLOW}, transparent)`,
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-28 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Copy */}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Image
              src="/graphics/gamescon-mark.svg"
              alt=""
              width={145}
              height={152}
              className="h-10 w-auto"
            />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f9cd36]/50 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#f9cd36]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f9cd36] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#f9cd36]" />
              </span>
              {t("live")}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">
              {t("venue")}
            </span>
          </div>

          <h2
            className={`${anton.className} uppercase leading-[0.9] text-[clamp(3rem,8vw,6.5rem)]`}
          >
            {t("titleLead")} <span style={{ color: YELLOW }}>Games.con</span>
          </h2>

          <p className="mt-6 max-w-xl font-sans text-base md:text-lg text-white/75 leading-relaxed">
            {t("body")}
          </p>

          <ol className="mt-8 grid gap-3 max-w-xl">
            {steps.map((step, i) => (
              <li key={step} className="flex items-start gap-4">
                <span
                  className={`${anton.className} shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm text-[#05080a]`}
                  style={{ backgroundColor: YELLOW }}
                >
                  {i + 1}
                </span>
                <span className="pt-1 font-sans text-sm md:text-base text-white/85">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href={INSTAGRAM_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                posthog.capture("gamescon_banner_clicked", {
                  location: "home_section",
                  destination: "instagram_dm",
                })
              }
              className={`${anton.className} inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-lg uppercase tracking-wide text-[#05080a] hover:bg-[#ffd94d] transition-colors`}
              style={{
                backgroundColor: YELLOW,
                boxShadow: "0 30px 60px rgba(249,205,54,0.3)",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
              {t("cta")}
            </a>
            <span className="font-sans text-xs text-white/50 max-w-[16rem]">
              {t("ctaNote")}
            </span>
          </div>
        </div>

        {/* Visual */}
        <div className="relative">
          <div
            className="relative aspect-[4/5] md:aspect-[5/4] lg:aspect-[4/5] rounded-2xl overflow-hidden"
            style={{
              boxShadow: `0 0 0 1px rgba(249,205,54,0.35), 0 40px 80px rgba(0,0,0,0.6)`,
            }}
          >
            <Image
              src="/photos/size-big-2.jpeg"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05080a]/70 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 font-mono text-[11px] uppercase tracking-wider text-white/80">
              {t("imageCaption")}
            </p>
          </div>

          {/* Discount sticker */}
          <div
            className="absolute -top-6 -right-2 md:-right-6 w-32 h-32 md:w-40 md:h-40 rounded-full flex flex-col items-center justify-center rotate-[-10deg] text-[#05080a]"
            style={{
              backgroundColor: YELLOW,
              boxShadow: "0 20px 40px rgba(249,205,54,0.35)",
            }}
          >
            <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-wider">
              {t("stickerTop")}
            </span>
            <span
              className={`${anton.className} text-4xl md:text-5xl leading-none`}
            >
              50%
            </span>
            <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-wider">
              {t("stickerBottom")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
