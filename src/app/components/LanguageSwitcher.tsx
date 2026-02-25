"use client";

import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import posthog from "posthog-js";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  function switchLocale(newLocale: "en" | "sr") {
    posthog.capture("language_switched", {
      from_locale: locale,
      to_locale: newLocale,
      page_path: pathname,
    });
    const href = ref ? `${pathname}?ref=${encodeURIComponent(ref)}` : pathname;
    router.replace(href as "/", { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider">
      <button
        type="button"
        onClick={() => switchLocale("en")}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "en"
            ? "text-white bg-white/15"
            : "text-white/40 hover:text-white/70"
        }`}
      >
        EN
      </button>
      <span className="text-white/20">|</span>
      <button
        type="button"
        onClick={() => switchLocale("sr")}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "sr"
            ? "text-white bg-white/15"
            : "text-white/40 hover:text-white/70"
        }`}
      >
        SR
      </button>
    </div>
  );
}
