"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import posthog from "posthog-js";
import { useActionState } from "react";
import { Link } from "@/i18n/navigation";
import { type SubscribeState, subscribeToUpdates } from "../actions/subscribe";
import { LanguageSwitcher } from "./LanguageSwitcher";

const initialState: SubscribeState = { success: false, message: "" };

export function Footer() {
  const t = useTranslations("footer");
  const [footerState, footerAction, footerPending] = useActionState(
    subscribeToUpdates,
    initialState,
  );

  return (
    <footer className="bg-[#202020] text-paper py-16 md:py-20 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-16">
        {/* Left Side: Brand & CTA */}
        <div className="flex flex-col justify-between items-start">
          <div className="mb-12">
            <div className="flex items-center gap-4">
              <Image
                src="/focus-logo.svg"
                alt={t("logoAlt")}
                width={96}
                height={96}
                className="h-12 w-auto md:h-24"
              />
            </div>
            <p className="font-sans text-xl opacity-60 font-light max-w-lg mt-4">
              {t("tagline")}
            </p>
          </div>

          <div className="w-full max-w-md">
            <p className="font-mono text-[10px] uppercase tracking-widest mb-4 opacity-50">
              {t("stayUpdated")}
            </p>
            <form
              action={footerAction}
              className="flex border-b border-white/20 pb-4 w-full group focus-within:border-white/60 transition-colors"
            >
              <input type="hidden" name="source" value="footer" />
              <input
                type="email"
                name="email"
                placeholder={t("emailPlaceholder")}
                className="bg-transparent w-full font-mono text-sm focus:outline-none placeholder-white/30 text-white"
                disabled={footerPending}
              />
              <button
                type="submit"
                disabled={footerPending}
                className="font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors disabled:opacity-50"
              >
                {footerPending ? t("submitting") : t("join")}
              </button>
            </form>
            {footerState.message && (
              <p
                className={`font-mono text-[10px] mt-2 ${footerState.success ? "text-green-400" : "text-red-400"}`}
              >
                {footerState.message}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Links */}
        <div className="flex flex-col justify-between md:items-end">
          <nav className="flex flex-col gap-4 md:text-right">
            <a
              href="https://instagram.com/arcadiantables"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                posthog.capture("instagram_link_clicked", {
                  location: "footer",
                })
              }
              className="font-serif text-3xl md:text-4xl hover:text-accent transition-colors hover:italic"
            >
              {t("instagram")}
            </a>
            <Link
              href={"/order" as "/order"}
              className="font-serif text-3xl md:text-4xl hover:text-accent transition-colors hover:italic"
            >
              {t("preOrder")}
            </Link>
            <Link
              href="/logs"
              className="font-serif text-3xl md:text-4xl hover:text-accent transition-colors hover:italic"
            >
              {t("logsLink")}
            </Link>
            <Link
              href="/blog"
              className="font-serif text-3xl md:text-4xl hover:text-accent transition-colors hover:italic"
            >
              {t("blogLink")}
            </Link>
            <Link
              href="/about"
              className="font-serif text-3xl md:text-4xl hover:text-accent transition-colors hover:italic"
            >
              {t("aboutLink")}
            </Link>
            <Link
              href="/faq"
              className="font-serif text-3xl md:text-4xl hover:text-accent transition-colors hover:italic"
            >
              {t("faqLink")}
            </Link>
            <div className="h-8" />
            <Link
              href="/terms"
              className="font-serif text-xl md:text-2xl opacity-60 hover:opacity-100 hover:text-accent transition-colors"
            >
              {t("termsLink")}
            </Link>
            <Link
              href="/privacy"
              className="font-serif text-xl md:text-2xl opacity-60 hover:opacity-100 hover:text-accent transition-colors"
            >
              {t("privacyLink")}
            </Link>
            <Link
              href={"/b2b" as "/b2b"}
              className="font-serif text-xl md:text-2xl hover:text-accent transition-colors border border-white/20 px-4 py-1.5 rounded-full inline-flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
              {t("b2bLink")}
            </Link>
          </nav>

          <div className="mt-16 md:text-right">
            <div className="mb-4">
              <LanguageSwitcher />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest opacity-30">
              {t("copyright", { year: new Date().getFullYear() })}
              <br />
              {t("madeIn")}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
