"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import posthog from "posthog-js";
import { useActionState, useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { trackEvent } from "@/lib/meta-pixel";
import { type OrderState, submitOrder } from "../../actions/submitOrder";

const initialState: OrderState = { success: false, message: "" };

const FELT_COLORS = [
  { value: "light-blue", image: "/felt/arcadian-felt-color-light-blue.jpeg" },
  { value: "blue", image: "/felt/arcadian-felt-color-blue.jpeg" },
  { value: "red", image: "/felt/arcadian-felt-color-red.jpeg" },
  { value: "green", image: "/felt/arcadian-felt-color-green.jpeg" },
  { value: "light-green", image: "/felt/arcadian-felt-color-light-green.jpeg" },
  { value: "lime", image: "/felt/arcadian-felt-color-lime.jpeg" },
  { value: "petrol", image: "/felt/arcadian-felt-color-petrol.jpeg" },

  { value: "yellow", image: "/felt/arcadian-felt-color-yellow.jpeg" },
  { value: "antracit", image: "/felt/arcadian-felt-color-antracit.jpeg" },
] as const;

type FeltValue = (typeof FELT_COLORS)[number]["value"];

const BASE_PRICES = { standard: 1920, grand: 2390 } as const;
const EXTRA_FELT_PRICES = { standard: 20, grand: 30 } as const;

interface OrderFormProps {
  defaultSize?: string;
  defaultFinish?: string;
}

export function OrderForm({ defaultSize, defaultFinish }: OrderFormProps) {
  const t = useTranslations("order");
  const locale = useLocale();
  const [state, action, pending] = useActionState(submitOrder, initialState);

  const [tableSize, setTableSize] = useState<"standard" | "grand" | "">(
    defaultSize === "standard" || defaultSize === "grand" ? defaultSize : "",
  );
  const [feltColor, setFeltColor] = useState<FeltValue>("light-blue");
  const [extraFelts, setExtraFelts] = useState<FeltValue[]>([]);

  const feltColorKey = (v: string) =>
    `felt${v
      .split("-")
      .map((s) => s[0].toUpperCase() + s.slice(1))
      .join("")}` as
      | "feltLightBlue"
      | "feltBlue"
      | "feltRed"
      | "feltGreen"
      | "feltLightGreen"
      | "feltLime"
      | "feltPetrol"
      | "feltYellow"
      | "feltAntracit";

  const extraFeltUnitPrice =
    tableSize === "grand"
      ? EXTRA_FELT_PRICES.grand
      : EXTRA_FELT_PRICES.standard;

  const extraFeltTotal = extraFelts.length * extraFeltUnitPrice;

  const totalPrice = tableSize ? BASE_PRICES[tableSize] + extraFeltTotal : null;

  const euro = <span className="font-sans text-[1.15em] leading-none">€</span>;

  const styledEuro = (text: string) => {
    const idx = text.indexOf("€");
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        {euro}
        {text.slice(idx + 1)}
      </>
    );
  };

  const formatPrice = (n: number) => `€${n.toLocaleString("en-IE")}`;

  const handleTableSizeChange = (size: "standard" | "grand") => {
    setTableSize(size);
    posthog.capture("table_size_selected", {
      size: size,
      table_name: size === "grand" ? "The Grand" : "The Standard",
      price: BASE_PRICES[size],
      currency: "EUR",
    });
  };

  const handleFeltColorChange = (color: FeltValue) => {
    setFeltColor(color);
    posthog.capture("felt_color_selected", {
      felt_color: color,
      is_primary: true,
    });
  };

  const handleFinishColorChange = (finish: "dawn" | "shadow") => {
    posthog.capture("finish_color_selected", {
      finish_color: finish,
      finish_name: finish === "shadow" ? "Pan's Shadow" : "Arcadian Dawn",
    });
  };

  const addExtraFelt = () => {
    setExtraFelts((prev) => [...prev, "blue"]);
    posthog.capture("extra_felt_added", {
      total_extra_felts: extraFelts.length + 1,
      unit_price: extraFeltUnitPrice,
      currency: "EUR",
    });
  };

  const removeExtraFelt = () => {
    setExtraFelts((prev) => prev.slice(0, -1));
  };

  const updateExtraFelt = (index: number, value: FeltValue) => {
    setExtraFelts((prev) => prev.map((v, i) => (i === index ? value : v)));
  };

  const [ref, setRef] = useState("");
  useEffect(() => {
    const stored = localStorage.getItem("arcadian_ref");
    if (stored) setRef(stored);
  }, []);

  const hasTrackedLead = useRef(false);
  useEffect(() => {
    if (state.success && !hasTrackedLead.current) {
      hasTrackedLead.current = true;
      trackEvent("Lead", {
        content_name: tableSize === "grand" ? "The Grand" : "The Standard",
        value: totalPrice ?? 0,
        currency: "EUR",
      });
    }
  }, [state.success, tableSize, totalPrice]);

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
        {/* Hero area */}
        <div className="min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center px-6 relative">
          {/* Decorative line */}
          <div
            className="w-px h-16 bg-ink/10 mb-10"
            style={{
              animation:
                "successLineGrow 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          />

          {/* Checkmark */}
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

          {/* Title */}
          <h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-center mb-4"
            style={{
              animation:
                "successFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both",
            }}
          >
            {t("successTitle")}
          </h1>

          {/* Subtitle */}
          <p
            className="font-brush text-2xl md:text-3xl text-ink/40 text-center mb-8"
            style={{
              animation:
                "successFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both",
            }}
          >
            {t("successSubtitle")}
          </p>

          {/* Message */}
          <p
            className="font-sans text-lg md:text-xl text-ink/50 text-center max-w-lg leading-relaxed"
            style={{
              animation:
                "successFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.65s both",
            }}
          >
            {t("successMessage")}
          </p>

          {/* Batch tag */}
          <div
            className="mt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/30 border border-ink/10 px-5 py-2 rounded-full"
            style={{
              animation:
                "successFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both",
            }}
          >
            {t("successBatchInfo")}
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-xl mx-auto px-6">
          <div className="w-full h-px bg-ink/8" />
        </div>

        {/* What happens next */}
        <div className="max-w-xl mx-auto px-6 py-20 md:py-28">
          <span
            className="font-mono text-xs text-accent tracking-widest uppercase block mb-12 text-center"
            style={{
              animation:
                "successFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1s both",
            }}
          >
            {t("successNextLabel")}
          </span>

          <div className="space-y-10">
            {[
              {
                title: t("successStep1Title"),
                desc: t("successStep1Description"),
                num: "01",
              },
              {
                title: t("successStep2Title"),
                desc: t("successStep2Description"),
                num: "02",
              },
              {
                title: t("successStep3Title"),
                desc: t("successStep3Description"),
                num: "03",
              },
            ].map((step, i) => (
              <div
                key={step.num}
                className="flex gap-6"
                style={{
                  animation: `successFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${1.1 + i * 0.15}s both`,
                }}
              >
                <span className="font-mono text-[11px] text-ink/20 pt-1 shrink-0">
                  {step.num}
                </span>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-ink/45 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div
          className="text-center pb-20 px-6"
          style={{
            animation:
              "successFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.6s both",
          }}
        >
          <Link
            href={"/" as "/"}
            className="inline-block bg-ink text-paper px-10 py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-accent transition-colors duration-500 rounded-full"
          >
            {t("successBack")}
          </Link>
        </div>

        {/* Inline keyframes */}
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
    <form action={action}>
      {/* Hidden fields for controlled state */}
      <input type="hidden" name="ref" value={ref} />
      <input type="hidden" name="feltColor" value={feltColor} />
      <input type="hidden" name="extraFeltCount" value={extraFelts.length} />
      {extraFelts.map((color, i) => (
        <input
          key={`extra-felt-${i}`}
          type="hidden"
          name="extraFeltColors"
          value={color}
        />
      ))}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        {/* Left column: form fields */}
        <div className="lg:col-span-2 space-y-12">
          {/* Contact info */}
          <div>
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-6">
              {t("contactLabel")}
            </span>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50 block mb-2"
                >
                  {t("nameLabel")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t("namePlaceholder")}
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
                  required
                  className="w-full bg-transparent border-b border-ink/20 focus:border-ink pb-3 font-sans text-lg focus:outline-none placeholder-ink/30 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Table Size */}
          <div>
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-6">
              {t("sizeLabel")}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="group cursor-pointer">
                <input
                  type="radio"
                  name="tableSize"
                  value="standard"
                  checked={tableSize === "standard"}
                  onChange={() => handleTableSizeChange("standard")}
                  className="peer sr-only"
                  required
                />
                <div className="border border-ink/15 peer-checked:border-ink peer-checked:bg-ink/[0.03] rounded-sm p-6 transition-all hover:border-ink/40">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-serif text-2xl">{t("standardName")}</h3>
                    <span className="font-serif text-2xl text-ink/80">
                      {t("standardPrice")}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/40">
                    {t("standardSeats")}
                  </p>
                </div>
              </label>
              <label className="group cursor-pointer">
                <input
                  type="radio"
                  name="tableSize"
                  value="grand"
                  checked={tableSize === "grand"}
                  onChange={() => handleTableSizeChange("grand")}
                  className="peer sr-only"
                />
                <div className="border border-ink/15 peer-checked:border-ink peer-checked:bg-ink/[0.03] rounded-sm p-6 transition-all hover:border-ink/40">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-serif text-2xl">{t("grandName")}</h3>
                    <span className="font-serif text-2xl text-ink/80">
                      {t("grandPrice")}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/40">
                    {t("grandSeats")}
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Finish Color */}
          <div>
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-6">
              {t("finishLabel")}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="group cursor-pointer">
                <input
                  type="radio"
                  name="finishColor"
                  value="dawn"
                  defaultChecked={defaultFinish === "dawn"}
                  onChange={() => handleFinishColorChange("dawn")}
                  className="peer sr-only"
                  required
                />
                <div className="border border-ink/15 peer-checked:border-ink peer-checked:bg-ink/[0.03] rounded-sm p-6 transition-all hover:border-ink/40">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#C4A97D] border border-ink/10 shrink-0" />
                    <div>
                      <h3 className="font-serif text-xl">{t("dawnName")}</h3>
                      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40">
                        {t("dawnDescription")}
                      </p>
                    </div>
                  </div>
                </div>
              </label>
              <label className="group cursor-pointer">
                <input
                  type="radio"
                  name="finishColor"
                  value="shadow"
                  defaultChecked={defaultFinish === "shadow"}
                  onChange={() => handleFinishColorChange("shadow")}
                  className="peer sr-only"
                />
                <div className="border border-ink/15 peer-checked:border-ink peer-checked:bg-ink/[0.03] rounded-sm p-6 transition-all hover:border-ink/40">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#5C4033] border border-ink/10 shrink-0" />
                    <div>
                      <h3 className="font-serif text-xl">{t("shadowName")}</h3>
                      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40">
                        {t("shadowDescription")}
                      </p>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Playing Surface */}
          <div>
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-6">
              {t("surfaceLabel")}
            </span>

            {/* Primary felt color picker */}
            <div className="border border-ink/15 rounded-sm p-6 mb-4">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-serif text-xl">{t("feltLabel")}</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  {t("feltIncluded")}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {FELT_COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => handleFeltColorChange(color.value)}
                    className="group/swatch flex flex-col items-center gap-1.5"
                  >
                    <Image
                      src={color.image}
                      alt={t(feltColorKey(color.value))}
                      width={48}
                      height={48}
                      className={`w-12 h-12 rounded-md object-cover transition-all group-hover/swatch:scale-105 ${
                        feltColor === color.value
                          ? "ring-2 ring-ink ring-offset-2"
                          : "ring-1 ring-ink/10"
                      }`}
                    />
                    <span
                      className={`font-mono text-[9px] uppercase tracking-wider max-w-14 text-center leading-tight ${
                        feltColor === color.value
                          ? "text-ink/70"
                          : "text-ink/35"
                      }`}
                    >
                      {t(feltColorKey(color.value))}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Extra felts */}
            <div className="border border-ink/15 rounded-sm p-6 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-serif text-xl">{t("extraFeltLabel")}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40 mt-1">
                    {t("extraFeltDescription")} &middot;{" "}
                    {styledEuro(
                      tableSize === "grand"
                        ? t("extraFeltPriceGrand")
                        : t("extraFeltPriceStandard"),
                    )}{" "}
                    {t("extraFeltEach")}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={removeExtraFelt}
                    disabled={extraFelts.length === 0}
                    className="w-9 h-9 rounded-full border border-ink/20 flex items-center justify-center text-ink/50 hover:border-ink hover:text-ink transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                  >
                    <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
                      <path
                        d="M1 1h12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <span className="font-mono text-lg w-6 text-center tabular-nums">
                    {extraFelts.length}
                  </span>
                  <button
                    type="button"
                    onClick={addExtraFelt}
                    className="w-9 h-9 rounded-full border border-ink/20 flex items-center justify-center text-ink/50 hover:border-ink hover:text-ink transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1v12M1 7h12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {extraFelts.map((selectedColor, index) => (
                <div
                  key={`extra-${index}`}
                  className="mt-4 pt-4 border-t border-ink/10"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 block mb-3">
                    {t("extraFeltLabel")} #{index + 1}
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {FELT_COLORS.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => updateExtraFelt(index, color.value)}
                        className="group/swatch flex flex-col items-center gap-1.5"
                      >
                        <Image
                          src={color.image}
                          alt={t(feltColorKey(color.value))}
                          width={48}
                          height={48}
                          className={`w-12 h-12 rounded-md object-cover transition-all group-hover/swatch:scale-105 ${
                            selectedColor === color.value
                              ? "ring-2 ring-ink ring-offset-2"
                              : "ring-1 ring-ink/10"
                          }`}
                        />
                        <span
                          className={`font-mono text-[9px] uppercase tracking-wider max-w-14 text-center leading-tight ${
                            selectedColor === color.value
                              ? "text-ink/70"
                              : "text-ink/35"
                          }`}
                        >
                          {t(feltColorKey(color.value))}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Speed cloth — coming soon */}
            <div className="border border-ink/10 rounded-sm p-6 mb-4 opacity-40 select-none">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-xl">{t("speedClothLabel")}</h3>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] bg-ink/10 text-ink/50 px-2 py-0.5 rounded-full">
                    {t("comingSoon")}
                  </span>
                </div>
                <span className="font-mono text-sm text-ink/50">
                  {styledEuro(
                    tableSize === "grand"
                      ? t("speedClothPriceGrand")
                      : t("speedClothPriceStandard"),
                  )}
                </span>
              </div>
            </div>

            {/* Vinyl surface — coming soon */}
            <div className="border border-ink/10 rounded-sm p-6 opacity-40 select-none">
              <div className="flex items-center gap-3">
                <h3 className="font-serif text-xl">{t("vinylLabel")}</h3>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] bg-ink/10 text-ink/50 px-2 py-0.5 rounded-full">
                  {t("comingSoon")}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Options — Serbian market only */}
          {locale === "sr" && (
            <div>
              <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-6">
                {t("paymentOptionsLabel")}
              </span>
              <div className="space-y-4">
                {/* Čekovi građana */}
                <div className="border border-ink/15 rounded-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-ink/50"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M2 10h20" />
                        <path d="M6 16h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-serif text-xl mb-1">
                        {t("paymentOptionChecks")}
                      </h3>
                      <p className="font-sans text-sm text-ink/50 leading-relaxed">
                        {t("paymentOptionChecksDescription")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Kreditne kartice */}
                <div className="border border-ink/15 rounded-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-ink/50"
                      >
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-serif text-xl mb-1">
                        {t("paymentOptionCredit")}
                      </h3>
                      <p className="font-sans text-sm text-ink/50 leading-relaxed">
                        {t("paymentOptionCreditDescription")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Debitne kartice */}
                <div className="border border-ink/15 rounded-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-ink/50"
                      >
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <path d="M6 15h2" />
                        <path d="M14 15h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-serif text-xl mb-1">
                        {t("paymentOptionDebit")}
                      </h3>
                      <p className="font-sans text-sm text-ink/50 leading-relaxed">
                        {t("paymentOptionDebitDescription")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Administrativna zabrana — coming soon */}
                <div className="border border-ink/10 rounded-sm p-6 opacity-40 select-none">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-ink/50"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-serif text-xl">
                          {t("paymentOptionAdminBan")}
                        </h3>
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] bg-ink/10 text-ink/50 px-2 py-0.5 rounded-full">
                          {t("comingSoon")}
                        </span>
                      </div>
                      <p className="font-sans text-sm text-ink/50 leading-relaxed">
                        {t("paymentOptionAdminBanDescription")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Potrošački kredit — coming soon */}
                <div className="border border-ink/10 rounded-sm p-6 opacity-40 select-none">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-ink/50"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9 12h6" />
                        <path d="M12 9v6" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-serif text-xl">
                          {t("paymentOptionConsumerLoan")}
                        </h3>
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] bg-ink/10 text-ink/50 px-2 py-0.5 rounded-full">
                          {t("comingSoon")}
                        </span>
                      </div>
                      <p className="font-sans text-sm text-ink/50 leading-relaxed">
                        {t("paymentOptionConsumerLoanDescription")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-mono text-[10px] text-ink/35 uppercase tracking-wider mt-4">
                {t("paymentNote")}
              </p>
            </div>
          )}
        </div>

        {/* Right column: sticky summary sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-32 bg-[#F3F1EA] rounded-sm p-8">
            <h3 className="font-mono text-xs text-accent tracking-widest uppercase mb-6">
              {t("summaryTitle")}
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-sm text-ink/50">
                  {t("summaryBatch")}
                </span>
                <span className="font-mono text-sm text-ink/70">50 Tables</span>
              </div>
              <div className="w-full h-px bg-ink/10" />
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-sm text-ink/50">
                  {t("summaryDelivery")}
                </span>
                <span className="font-mono text-sm text-ink/70">
                  {t("summaryDeliveryValue")}
                </span>
              </div>
              {extraFelts.length > 0 && (
                <>
                  <div className="w-full h-px bg-ink/10" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-sm text-ink/50">
                      {t("summaryExtraFelt")} &times;{extraFelts.length}
                    </span>
                    <span className="font-mono text-sm text-ink/70">
                      +{formatPrice(extraFeltTotal)}
                    </span>
                  </div>
                </>
              )}
              {totalPrice && (
                <>
                  <div className="w-full h-px bg-ink/10" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-sm font-medium text-ink/70">
                      {t("summaryPrice")}
                    </span>
                    <span className="font-serif text-2xl text-ink">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="block w-full text-center bg-ink text-paper py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-accent transition-colors rounded-full disabled:opacity-50"
            >
              {pending ? t("submitting") : t("submitButton")}
            </button>

            {!state.success && errorMessage && (
              <p className="font-mono text-[11px] text-red-600 mt-4 text-center">
                {errorMessage}
              </p>
            )}

            <p className="font-mono text-[10px] text-ink/30 text-center mt-4 uppercase tracking-wider">
              {locale === "sr"
                ? "Bez plaćanja sada · Rate i čekovi dostupni"
                : "No payment required now"}
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
