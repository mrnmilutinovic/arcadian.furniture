"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: "en" | "sr") {
    router.replace(pathname as "/", { locale: newLocale });
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
