"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { Link } from "@/i18n/navigation";
import {
  type B2BState,
  submitB2BInquiry,
} from "../../actions/submitB2BInquiry";

const initialState: B2BState = { success: false, message: "" };

const INQUIRY_TYPES = ["retailer", "distributor", "club", "rental"] as const;

export function B2BForm() {
  const t = useTranslations("b2b");
  const [state, action, pending] = useActionState(
    submitB2BInquiry,
    initialState,
  );

  const errorMessage =
    state.message === "required"
      ? t("errorRequired")
      : state.message === "email"
        ? t("errorEmail")
        : state.message === "generic"
          ? t("errorGeneric")
          : "";

  if (state.success) {
    return (
      <div className="fixed inset-0 z-40 bg-paper overflow-y-auto">
        <div className="min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center px-6 relative">
          <div
            className="w-px h-16 bg-ink/10 mb-10"
            style={{
              animation:
                "successLineGrow 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          />

          <div
            className="w-14 h-14 rounded-full border border-ink/15 flex items-center justify-center mb-10"
            style={{
              animation:
                "successFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both",
            }}
          >
            <svg
              className="w-6 h-6 text-ink/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-center mb-4"
            style={{
              animation:
                "successFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both",
            }}
          >
            {t("successTitle")}
          </h1>

          <p
            className="font-sans text-lg md:text-xl text-ink/50 text-center max-w-lg leading-relaxed mt-4"
            style={{
              animation:
                "successFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both",
            }}
          >
            {t("successMessage")}
          </p>

          <div
            className="mt-12"
            style={{
              animation:
                "successFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both",
            }}
          >
            <Link
              href={"/" as "/"}
              className="inline-block bg-ink text-paper px-10 py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-accent transition-colors duration-500 rounded-full"
            >
              {t("successBack")}
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes successFadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes successLineGrow {
            from { opacity: 0; transform: scaleY(0); }
            to { opacity: 1; transform: scaleY(1); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <form action={action} className="max-w-2xl">
      <div className="space-y-12">
        {/* Inquiry Type */}
        <div>
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-6">
            {t("inquiryTypeLabel")}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INQUIRY_TYPES.map((type) => (
              <label key={type} className="group cursor-pointer">
                <input
                  type="radio"
                  name="inquiryType"
                  value={type}
                  className="peer sr-only"
                  required
                />
                <div className="border border-ink/15 peer-checked:border-ink peer-checked:bg-ink/[0.03] rounded-sm p-5 transition-all hover:border-ink/40">
                  <h3 className="font-serif text-lg">
                    {t(`type${type.charAt(0).toUpperCase() + type.slice(1)}`)}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40 mt-1">
                    {t(
                      `type${type.charAt(0).toUpperCase() + type.slice(1)}Desc`,
                    )}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Company Info */}
        <div>
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-6">
            {t("companyLabel")}
          </span>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="company"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50 block mb-2"
              >
                {t("companyNameLabel")}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder={t("companyNamePlaceholder")}
                required
                className="w-full bg-transparent border-b border-ink/20 focus:border-ink pb-3 font-sans text-lg focus:outline-none placeholder-ink/30 transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50 block mb-2"
              >
                {t("contactPersonLabel")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={t("contactPersonPlaceholder")}
                required
                className="w-full bg-transparent border-b border-ink/20 focus:border-ink pb-3 font-sans text-lg focus:outline-none placeholder-ink/30 transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50 block mb-2"
              >
                {t("emailLabel")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t("emailPlaceholder")}
                required
                className="w-full bg-transparent border-b border-ink/20 focus:border-ink pb-3 font-sans text-lg focus:outline-none placeholder-ink/30 transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50 block mb-2"
              >
                {t("phoneLabel")}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder={t("phonePlaceholder")}
                className="w-full bg-transparent border-b border-ink/20 focus:border-ink pb-3 font-sans text-lg focus:outline-none placeholder-ink/30 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-6">
            {t("messageLabel")}
          </span>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder={t("messagePlaceholder")}
            className="w-full bg-transparent border-b border-ink/20 focus:border-ink pb-3 font-sans text-lg focus:outline-none placeholder-ink/30 transition-colors resize-none"
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={pending}
            className="bg-ink text-paper px-10 py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-accent transition-colors rounded-full disabled:opacity-50"
          >
            {pending ? t("submitting") : t("submitButton")}
          </button>

          {!state.success && errorMessage && (
            <p className="font-mono text-[11px] text-red-600 mt-4">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
