"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { type MouseEvent, useCallback, useState } from "react";
import { Link } from "@/i18n/navigation";

export function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const prefix = locale === "en" ? "" : `/${locale}`;

  const handleHashClick = useCallback((e: MouseEvent, href: string) => {
    const hash = href.split("#")[1];
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${hash}`);
    }
  }, []);

  const navItems = [
    { href: `${prefix}/#transformation`, label: t("table"), isHash: true },
    { href: `${prefix}/#sizing`, label: t("sizes"), isHash: true },
    { href: `${prefix}/#finish`, label: t("finish"), isHash: true },
    { href: `${prefix}/#accessories`, label: t("addOns"), isHash: true },
    { href: `${prefix}/#stories`, label: t("stories"), isHash: true },
    { href: "/logs", label: t("logs"), isHash: false },
    {
      href: `${prefix}/#pricing`,
      label: t("pricing"),
      isHash: true,
      emphasized: true,
    },
  ];

  const mobileNavItems = [
    {
      href: `${prefix}/#transformation`,
      label: t("mobileTable"),
      isHash: true,
    },
    { href: `${prefix}/#sizing`, label: t("sizes"), isHash: true },
    { href: `${prefix}/#finish`, label: t("finish"), isHash: true },
    {
      href: `${prefix}/#accessories`,
      label: t("mobileAccessories"),
      isHash: true,
    },
    { href: `${prefix}/#stories`, label: t("stories"), isHash: true },
    { href: "/logs", label: t("logs"), isHash: false },
    {
      href: `${prefix}/#pricing`,
      label: t("pricing"),
      isHash: true,
      emphasized: true,
    },
  ];

  return (
    <>
      {/* HEADER / NAV — Split Console */}
      <nav className="w-full fixed top-0 z-40 pointer-events-none">
        <div className="flex items-start justify-between pr-4 md:pr-6 pt-4 md:pt-6">
          {/* Left: Logo Ribbon dropping from top */}
          <div className="pointer-events-auto fixed top-0 left-4 md:left-6">
            <Link
              href="/"
              className="relative w-16 md:w-20 pt-10 pb-5 md:pt-14 md:pb-6 rounded-b-full flex items-end justify-center block"
              style={{
                backgroundColor: "#1a1918",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }}
            >
              {/* Logo */}
              <Image
                src="/new-logo.svg"
                alt={t("logoAlt")}
                width={80}
                height={80}
                className="w-9 h-9 md:w-11 md:h-11"
              />

              {/* Bottom subtle glow */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </Link>
          </div>

          {/* Right: Navigation Console */}
          <div className="pointer-events-auto ml-auto">
            {/* Desktop Console */}
            <div
              className="hidden md:flex items-center gap-1 px-2 py-2 rounded-full"
              style={{
                backgroundColor: "#1a1918",
                boxShadow:
                  "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {navItems.map((item) =>
                item.isHash ? (
                  <NextLink
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleHashClick(e, item.href)}
                    className={
                      item.emphasized
                        ? "px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-wide bg-accent text-white hover:bg-accent/80 transition-all duration-200"
                        : "px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-wide text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
                    }
                  >
                    {item.label}
                  </NextLink>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href as "/logs"}
                    className="px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-wide text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center gap-3 px-4 py-3 rounded-full"
              style={{
                backgroundColor: "#1a1918",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
              aria-label="Toggle menu"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/60">
                {isMobileMenuOpen ? t("close") : t("menu")}
              </span>
              <div className="flex flex-col gap-1">
                <span
                  className={`block w-4 h-px bg-white/60 transition-all duration-300 origin-center ${isMobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""}`}
                />
                <span
                  className={`block w-4 h-px bg-white/60 transition-all duration-300 origin-center ${isMobileMenuOpen ? "-rotate-45 -translate-y-[2px]" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-all duration-300 ${isMobileMenuOpen ? "visible" : "invisible pointer-events-none"}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundColor: "rgba(26,25,24,0.95)" }}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel - drops from top right */}
        <div
          className={`absolute top-24 right-4 left-4 transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          <div
            className="p-2 rounded-2xl"
            style={{ backgroundColor: "#1a1918" }}
          >
            <nav className="flex flex-col gap-1">
              {mobileNavItems.map((item, index) =>
                item.isHash ? (
                  <NextLink
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      handleHashClick(e, item.href);
                    }}
                    className={
                      item.emphasized
                        ? "px-4 py-3 rounded-xl font-mono text-sm uppercase tracking-wider bg-accent text-white transition-all text-center"
                        : "px-4 py-3 rounded-xl font-mono text-sm uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-all"
                    }
                    style={{
                      transitionDelay: isMobileMenuOpen
                        ? `${index * 30}ms`
                        : "0ms",
                    }}
                  >
                    {item.label}
                  </NextLink>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href as "/logs"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl font-mono text-sm uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-all"
                    style={{
                      transitionDelay: isMobileMenuOpen
                        ? `${index * 30}ms`
                        : "0ms",
                    }}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            {/* Footer */}
            <div className="px-4 py-3 mt-2 border-t border-white/10 flex items-center justify-center">
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                  {t("batchStatus")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
