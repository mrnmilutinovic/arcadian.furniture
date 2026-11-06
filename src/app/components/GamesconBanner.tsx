"use client";

import { Anton } from "next/font/google";
import Image from "next/image";
import { useTranslations } from "next-intl";
import posthog from "posthog-js";
import { useState } from "react";

// Games.con brand typography (headings use Anton on gamescon.rs)
const anton = Anton({ subsets: ["latin", "latin-ext"], weight: "400" });

// Opens a DM thread with us (Instagram app on mobile, instagram.com/direct on desktop)
const INSTAGRAM_DM_URL = "https://ig.me/m/arcadiantables";

const trackClick = () =>
  posthog.capture("gamescon_banner_clicked", {
    location: "banner",
    destination: "instagram_dm",
  });

export function GamesconBanner() {
  const t = useTranslations("gamescon");
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <section
      id="gamescon-banner"
      aria-label={t("ariaLabel")}
      className="fixed top-0 inset-x-0 z-50 h-[var(--promo-h)] overflow-hidden text-white"
      style={{
        backgroundColor: "#05080a",
        boxShadow: "0 1px 0 rgba(249,205,54,0.35), 0 8px 30px rgba(0,0,0,0.45)",
      }}
    >
      {/* Yellow diagonal glow, echoing the Games.con site */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 220% at 0% 50%, rgba(249,205,54,0.22), transparent 45%), radial-gradient(80% 220% at 100% 50%, rgba(249,205,54,0.14), transparent 50%)",
        }}
      />

      <div className="relative h-full max-w-[1400px] mx-auto px-9 md:px-14 flex items-center justify-center gap-3 md:gap-5">
        {/* Live pill */}
        <span className="hidden sm:inline-flex items-center gap-1.5 shrink-0 rounded-full border border-[#f9cd36]/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#f9cd36]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f9cd36] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#f9cd36]" />
          </span>
          {t("live")}
        </span>

        <Image
          src="/graphics/gamescon-mark.svg"
          alt=""
          width={145}
          height={152}
          className="h-6 w-auto md:h-7 shrink-0"
        />

        <p className="flex items-baseline gap-2 md:gap-3 min-w-0 leading-none">
          <span
            className={`${anton.className} uppercase text-[15px] md:text-xl tracking-wide whitespace-nowrap`}
          >
            {t("title")}
          </span>
          <span className="hidden lg:inline text-white/30">/</span>
          <span className="hidden lg:inline font-sans text-sm text-white/80 truncate">
            {t("offer")}
          </span>
          <span className="lg:hidden font-sans text-xs md:text-sm font-semibold text-[#f9cd36] whitespace-nowrap">
            {t("offerShort")}
          </span>
        </p>

        <span className="hidden xl:inline font-mono text-[10px] uppercase tracking-wider text-white/50 whitespace-nowrap">
          {t("venue")}
        </span>

        <a
          href={INSTAGRAM_DM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackClick}
          className={`${anton.className} hidden md:inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#f9cd36] px-4 py-1.5 text-sm uppercase tracking-wide text-[#05080a] hover:bg-[#ffd94d] transition-colors`}
          style={{ boxShadow: "0 10px 30px rgba(249,205,54,0.3)" }}
        >
          {t("cta")}
          <span aria-hidden>→</span>
        </a>
      </div>

      {/* Whole bar is tappable on mobile */}
      <a
        href={INSTAGRAM_DM_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackClick}
        className="md:hidden absolute inset-0"
        aria-label={t("cta")}
      />

      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-1.5 text-white/40 hover:text-white transition-colors"
        aria-label={t("close")}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>
    </section>
  );
}
