"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";
import { type SubscribeState, subscribeToUpdates } from "../actions/subscribe";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";

const initialState: SubscribeState = { success: false, message: "" };

export default function Home() {
  const t = useTranslations("home");

  const [isMetric, setIsMetric] = useState(true);

  // Form state for Kickstarter subscription form
  const [kickstarterState, kickstarterAction, kickstarterPending] =
    useActionState(subscribeToUpdates, initialState);

  const articles = [
    {
      slug: "forest-of-radgost-collaboration",
      title: t("articles.radgost.title"),
      excerpt: t("articles.radgost.excerpt"),
      image: "/photos/radgost-cover-photo.jpeg",
      date: t("articles.radgost.date"),
      category: t("articles.radgost.category"),
    },
    {
      slug: "boris-jovanovic-photoshoot",
      title: t("articles.boris.title"),
      excerpt: t("articles.boris.excerpt"),
      image: "/photos/boris-cover-photo.jpeg",
      date: t("articles.boris.date"),
      category: t("articles.boris.category"),
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".reveal-trigger").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* <div className="noise" /> */}

      {/* HERO SECTION */}
      <Hero />

      {/* FULL WIDTH PHOTOS */}
      <section id="photo-grid" className="w-full h-dvh">
        <div className="grid grid-cols-2 md:grid-cols-4 h-full gap-1">
          <div className=" relative">
            <Image
              src="/photos/preview-16.jpeg"
              alt="Arcadian table close-up showing wood grain texture"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className=" relative">
            <Image
              src="/photos/preview-17.jpeg"
              alt="Board game components on Arcadian table surface"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className=" relative">
            <Image
              src="/photos/preview-11.jpeg"
              alt="Handcrafted oak corner detail of Arcadian table"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className=" relative">
            <Image
              src="/photos/preview-12.jpeg"
              alt="Magnetic accessory rail mounted on table edge"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className=" relative">
            <Image
              src="/photos/preview-13.jpeg"
              alt="Recessed vault area with gaming accessories"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className=" relative">
            <Image
              src="/photos/preview-15.jpeg"
              alt="Cup holder accessory attached to table rail"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className=" relative">
            <Image
              src="/photos/preview-10.jpeg"
              alt="Arcadian table in elegant dining room setting"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className=" relative">
            <Image
              src="/photos/preview-14.jpeg"
              alt="Solid oak table leg with premium finish"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section
        id="transformation"
        className="py-16 md:py-20 bg-[#F3F1EA] border-t border-ink/5 overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-20">
          {/* 1. THE TRANSFORMATION (2-Column Images) */}
          <div className="flex flex-col gap-12">
            <div className="max-w-2xl mx-auto text-center reveal-trigger">
              <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-3">
                {t("transformation.label")}
              </span>
              <h3 className="font-serif text-4xl md:text-5xl mb-2 leading-tight">
                {t("transformation.title")}
                <span className="italic text-ink/50">
                  {" "}
                  {t("transformation.titleAccent")}
                </span>
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-1 rounded-xl">
              <div className="reveal-trigger">
                <div className="aspect-[4/3] relative bg-black/5 overflow-hidden">
                  <Image
                    src="/photos/covered-scene-3.jpeg"
                    alt="Table Transformation - Dining"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 relative">
                  <div className="bg-white px-3 py-1 rounded-lg absolute -top-12 rotate-[-7deg] left-1">
                    <h4 className="font-sans text-2xl">
                      {t("transformation.undercoverMode")}
                    </h4>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <h5 className="font-sans text-2xl mt-4">
                      {t("transformation.whenLifeHappens")}
                    </h5>
                  </div>
                  <p className="font-sans text-sm text-ink/60 leading-relaxed max-w-[500px]">
                    {t("transformation.undercoverDescription")}
                  </p>
                </div>
              </div>
              <div className="reveal-trigger">
                <div className="aspect-[4/3] relative bg-black/5 overflow-hidden">
                  <Image
                    src="/photos/uncovering-scene-2.jpeg"
                    alt="Table Transformation - Gaming"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 relative">
                  <div className="bg-black text-white px-3 py-1 rounded-lg absolute -top-12 rotate-[4deg] left-1">
                    <h4 className="font-sans text-2xl">
                      {t("transformation.vaultMode")}
                    </h4>
                  </div>
                  <div className="flex gap-4 mb-2">
                    <h5 className="font-sans text-2xl mt-4">
                      {t("transformation.whenGamesHappen")}
                    </h5>
                  </div>
                  <p className="font-sans text-sm text-ink/60 leading-relaxed max-w-[500px]">
                    {t("transformation.vaultDescription")}
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto text-center pt-8 border-t border-ink/10">
              <p className="font-mono text-xs text-ink/40 leading-relaxed">
                {t("transformation.topperNote1")}
              </p>
              <p className="font-mono text-xs text-ink/40 leading-relaxed">
                <strong>{t("transformation.topperNote2Heavy")}</strong>{" "}
                {t("transformation.topperNote2Text")}{" "}
                <strong>{t("transformation.topperNote2Light")} </strong>
                {t("transformation.topperNote2End")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE SHOWCASE - MOSAIC LAYOUT */}
      <section
        id="sizing"
        className="py-16 md:py-20 bg-[#F3F1EA] border-t border-ink/5 overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-20">
          {/* 2. SIZES */}
          <div className="flex flex-col gap-12">
            <div className="max-w-2xl mx-auto text-center reveal-trigger">
              <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-3">
                {t("sizing.label")}
              </span>
              <h3 className="font-serif text-4xl md:text-5xl mb-4 leading-tight">
                {t("sizing.title")}
                <span className="italic text-ink/50">
                  {" "}
                  {t("sizing.titleAccent")}
                </span>
              </h3>
              <p className="font-sans text-lg font-light leading-relaxed text-ink/70">
                {t("sizing.intro1")}
              </p>
              <p className="font-sans text-lg font-light leading-relaxed text-ink/70">
                {t("sizing.intro2")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-1">
              {/* The Standard */}
              <div className="reveal-trigger">
                <div className="relative aspect-[4/3] bg-black/5">
                  <Image
                    src="/photos/size-small-3.jpeg"
                    alt="The Standard - Seats 4"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="bg-[#EAE8E1] overflow-hidden">
                  <div className="flex justify-center items-center py-8 h-64 md:h-[500px]">
                    {/* biome-ignore lint/performance/noImgElement: SVG diagram, no benefit from next/image */}
                    <img
                      src="/graphics/small-table.svg"
                      alt="The Standard table diagram"
                      className="w-auto h-[300px] object-contain -rotate-12"
                    />
                  </div>
                  <div className="p-6 pt-0">
                    <div className="flex justify-between items-baseline mb-3">
                      <span className="font-serif text-xl">
                        {t("sizing.standard")}
                      </span>
                      <span className="font-mono text-[10px] md:text-xs opacity-50 uppercase">
                        {t("sizing.seats4")}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="font-sans text-xs md:text-sm opacity-60">
                          {t("sizing.closedTableSize")}
                        </span>
                        <span className="font-mono text-xs md:text-sm opacity-60">
                          {isMetric
                            ? t("sizing.standardClosed.metric")
                            : t("sizing.standardClosed.imperial")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-sans text-xs md:text-sm opacity-60">
                          {t("sizing.playArea")}
                        </span>
                        <span className="font-mono text-xs md:text-sm opacity-60">
                          {isMetric
                            ? t("sizing.standardPlay.metric")
                            : t("sizing.standardPlay.imperial")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Grand */}
              <div className="reveal-trigger">
                <div className="relative aspect-[4/3] bg-black/5">
                  <Image
                    src="/photos/size-big-2.jpeg"
                    alt="The Grand - Seats 6-8"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="bg-[#EAE8E1] overflow-hidden">
                  <div className="flex justify-center items-center h-64 md:h-[500px] py-8">
                    {/* biome-ignore lint/performance/noImgElement: SVG diagram, no benefit from next/image */}
                    <img
                      src="/graphics/large-table.svg"
                      alt="The Grand table diagram"
                      className="w-auto h-[300px] object-contain -rotate-12"
                    />
                  </div>
                  <div className="p-6 pt-0">
                    <div className="flex justify-between items-baseline mb-3">
                      <span className="font-serif text-xl">
                        {t("sizing.grand")}
                      </span>
                      <span className="font-mono text-[10px] md:text-xs opacity-50 uppercase">
                        {t("sizing.seats68")}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="font-sans text-xs md:text-sm opacity-60">
                          {t("sizing.closedTableSize")}
                        </span>
                        <span className="font-mono text-xs md:text-sm opacity-60">
                          {isMetric
                            ? t("sizing.grandClosed.metric")
                            : t("sizing.grandClosed.imperial")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-sans text-xs md:text-sm opacity-60">
                          {t("sizing.playArea")}
                        </span>
                        <span className="font-mono text-xs md:text-sm opacity-60">
                          {isMetric
                            ? t("sizing.grandPlay.metric")
                            : t("sizing.grandPlay.imperial")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Unit Toggle - Centered */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setIsMetric(!isMetric)}
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest"
              >
                <span className={isMetric ? "opacity-100" : "opacity-40"}>
                  {t("sizing.cm")}
                </span>
                <div className="relative w-10 h-5 bg-ink/20 rounded-full">
                  <div
                    className={`absolute top-0.5 w-4 h-4 bg-ink rounded-full transition-all duration-200 ${
                      isMetric ? "left-0.5" : "left-5"
                    }`}
                  />
                </div>
                <span className={!isMetric ? "opacity-100" : "opacity-40"}>
                  {t("sizing.in")}
                </span>
              </button>
            </div>
          </div>

          {/* 4. ASSEMBLY (Video Section) */}
          <div className="reveal-trigger">
            <div className="relative aspect-[4/5] md:aspect-video bg-black overflow-hidden">
              {/* Video placeholder - replace with actual video later */}
              <div className="absolute inset-0">
                <Image
                  src="/photos/assembly.jpeg"
                  alt="Easy Assembly"
                  fill
                  sizes="100vw"
                  className="object-cover opacity-60"
                />
              </div>

              {/* Text overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16">
                <div className="max-w-xl">
                  <span className="font-mono text-[10px] md:text-xs text-accent tracking-widest uppercase block mb-2 md:mb-4">
                    {t("assembly.label")}
                  </span>
                  <h3 className="font-serif text-3xl md:text-6xl leading-tight text-white mb-0">
                    {t("assembly.title1")}
                  </h3>
                  <h3 className="font-sans text-4xl md:text-7xl mb-4 md:mb-6 leading-tight font-bold text-white/80">
                    {t("assembly.title2")}
                  </h3>
                  <p className="font-sans text-sm md:text-lg font-light leading-relaxed text-white/70 mb-4 md:mb-6 max-w-2xl">
                    {t("assembly.description")}
                  </p>
                  <div className="flex items-center gap-2 md:gap-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/40">
                    <span>{t("assembly.singleTool")}</span>
                    <span>///</span>
                    <span>{t("assembly.easyAssembly")}</span>
                  </div>
                </div>
              </div>

              {/* Play button placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="group/play cursor-pointer flex items-center gap-0 hover:gap-4 transition-all duration-300">
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shrink-0">
                    <div className="w-0 h-0 border-t-6 md:border-t-8 border-t-transparent border-l-8 md:border-l-12 border-l-white border-b-6 md:border-b-8 border-b-transparent ml-1" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-white whitespace-nowrap max-w-0 group-hover/play:max-w-40 overflow-hidden transition-all duration-300 opacity-0 group-hover/play:opacity-100">
                    {t("assembly.comingSoon")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="finish"
        className="py-16 md:py-24 px-6 bg-paper reveal-trigger border-t border-ink/5"
      >
        <div className="max-w-[1100px] mx-auto">
          <span className="font-mono text-xs text-oak tracking-widest uppercase block mb-12">
            {t("finish.label")}
          </span>

          <h2 className="font-serif text-6xl md:text-8xl leading-[0.9] text-ink mb-16 reveal-text">
            {t("finish.title")} <br />
            <span className="italic text-oak/60">
              {t("finish.titleAccent")}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            <div
              className="md:col-span-5 reveal-text"
              style={{ transitionDelay: "0.2s" }}
            >
              <p className="font-serif text-2xl md:text-3xl leading-tight text-ink mb-8">
                {t("finish.intro")}
              </p>
              <div className="w-full h-px bg-ink/10 my-8" />
              <p className="font-mono text-xs text-oak uppercase tracking-widest">
                {t("finish.vocFree")}
              </p>
            </div>

            <div
              className="md:col-span-7 font-sans text-lg font-light leading-relaxed text-ink/70 space-y-8 reveal-text"
              style={{ transitionDelay: "0.3s" }}
            >
              <p
                dangerouslySetInnerHTML={{ __html: t.raw("finish.paragraph1") }}
              />
              <p>{t("finish.paragraph2")}</p>
              <p>{t("finish.paragraph3")}</p>
            </div>
          </div>

          <div
            className="mt-24 pt-8 border-t border-ink/10 reveal-text"
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="flex items-start gap-4">
              <span className="font-mono text-xs text-oak">
                {t("finish.footnoteLabel")}
              </span>
              <p className="font-mono text-xs text-ink/40 max-w-3xl leading-relaxed">
                {t("finish.footnoteText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WOOD COLORS */}
      <section className="py-16 md:py-20 px-6 bg-[#eae8e1] reveal-trigger">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-3">
              {t("woodColors.label")}
            </span>
            <h3 className="font-serif text-4xl md:text-5xl leading-tight">
              {t("woodColors.title")}{" "}
              <span className="italic text-ink/50">
                {t("woodColors.titleAccent")}
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Arcadian Dawn - Light */}
            <div className="group relative overflow-hidden">
              <div className="aspect-[3/4] relative">
                <Image
                  src="/photos/light.jpeg"
                  alt="Arcadian Dawn - Light Oak Finish"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-3xl italic text-white mb-2">
                  {t("woodColors.dawnName")}
                </h3>
                <p className="font-sans text-sm text-white/70 max-w-[300px]">
                  {t("woodColors.dawnDescription")}
                </p>
              </div>
            </div>

            {/* Pan's Shadow - Dark */}
            <div className="group relative overflow-hidden">
              <div className="aspect-[3/4] relative">
                <Image
                  src="/photos/dark.jpeg"
                  alt="Pan's Shadow - Dark Walnut Finish"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-3xl italic text-white mb-2">
                  {t("woodColors.shadowName")}
                </h3>
                <p className="font-sans text-sm text-white/70">
                  {t("woodColors.shadowDescription")}
                </p>
              </div>
            </div>

            {/* 2026 Batch Exclusive - Mystery */}
            <div className="group relative overflow-hidden bg-ink">
              <div className="aspect-[3/4] relative flex items-center justify-center">
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)",
                    }}
                  />
                </div>
                <div className="text-center z-10">
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center mx-auto mb-6">
                    <span className="font-serif text-4xl text-white/50">?</span>
                  </div>
                  <h3 className="font-serif text-3xl italic text-white/80 mb-2">
                    {t("woodColors.exclusiveName")}
                  </h3>
                  <p className="font-sans text-sm text-white/40 px-6">
                    {t("woodColors.exclusiveDescription")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE RAIL SYSTEM */}
      <section
        id="rail-system"
        className="py-16 md:py-20 bg-[#F3F1EA] border-t border-ink/5 overflow-hidden"
      >
        <div className="reveal-trigger">
          <div className="text-center max-w-2xl mx-auto mb-10 px-6 md:px-12">
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">
              {t("railSystem.label")}
            </span>
            <h3 className="font-serif text-5xl md:text-6xl leading-tight">
              {t("railSystem.title")}
            </h3>
          </div>

          <div className="w-full aspect-[4/3] md:aspect-[21/9] relative bg-black/5 mb-12">
            <Image
              src="/photos/close-up-rail-scene.jpg"
              alt="Magnetic Rail System"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-ink/10 pt-8">
              <div>
                <h4 className="font-serif text-2xl mb-2">
                  {t("railSystem.magneticTitle")}
                </h4>
                <p className="font-sans text-sm text-ink/60 leading-relaxed">
                  {t("railSystem.magneticDescription")}
                </p>
              </div>
              <div>
                <h4 className="font-serif text-2xl mb-2">
                  {t("railSystem.modularTitle")}
                </h4>
                <p className="font-sans text-sm text-ink/60 leading-relaxed">
                  {t("railSystem.modularDescription")}
                </p>
              </div>
              <div>
                <h4 className="font-serif text-2xl mb-2">
                  {t("railSystem.solidWoodTitle")}
                </h4>
                <p className="font-sans text-sm text-ink/60 leading-relaxed">
                  {t("railSystem.solidWoodDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACCESSORIES / ECOSYSTEM */}
      <section
        id="accessories"
        className="w-full py-16 md:py-20 px-6 md:px-12 border-b border-white/10 bg-[#202020]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-10 border-b border-white/10 pb-6 gap-4">
            <h2 className="font-serif text-5xl md:text-6xl text-white">
              {t("ecosystem.title")}
            </h2>
            <div className="font-mono text-xs md:text-right text-white">
              <div className="uppercase tracking-widest mb-1">
                {t("ecosystem.modularAddOns")}
              </div>
              <div className="opacity-50">{t("ecosystem.status")}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {/* Cup & Mug Holder */}
            <div className="bg-[#282828] p-12 min-h-[350px] flex flex-col justify-between group hover:bg-[#3a3a3a] transition-colors relative">
              <div className="absolute top-4 right-4 font-mono text-[10px] border border-white/20 px-1 text-white/60">
                FIG A.1
              </div>
              <div className="w-full flex-grow border border-dashed border-white/20 flex items-center justify-center mb-6 bg-black/20">
                <span className="font-mono text-[10px] animate-pulse text-white/60">
                  {t("ecosystem.schematicPending")}
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2 text-white">
                  {t("ecosystem.cupHolder")}
                </h3>
                <p className="font-mono text-xs text-white/60">
                  {t("ecosystem.cupHolderDesc")}
                </p>
              </div>
            </div>

            {/* Universal Tray */}
            <div className="bg-[#282828] p-12 min-h-[350px] flex flex-col justify-between group hover:bg-[#3a3a3a] transition-colors relative">
              <div className="absolute top-4 right-4 font-mono text-[10px] border border-white/20 px-1 text-white/60">
                FIG A.2
              </div>
              <div className="w-full flex-grow border border-dashed border-white/20 flex items-center justify-center mb-6 bg-black/20">
                <span className="font-mono text-[10px] animate-pulse text-white/60">
                  {t("ecosystem.schematicPending")}
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2 text-white">
                  {t("ecosystem.universalTray")}
                </h3>
                <p className="font-mono text-xs text-white/60">
                  {t("ecosystem.universalTrayDesc")}
                </p>
              </div>
            </div>

            {/* Dice Tray */}
            <div className="bg-[#282828] p-12 min-h-[350px] flex flex-col justify-between group hover:bg-[#3a3a3a] transition-colors relative">
              <div className="absolute top-4 right-4 font-mono text-[10px] border border-white/20 px-1 text-white/60">
                FIG A.3
              </div>
              <div className="w-full flex-grow border border-dashed border-white/20 flex items-center justify-center mb-6 bg-black/20">
                <span className="font-mono text-[10px] animate-pulse text-white/60">
                  {t("ecosystem.schematicPending")}
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2 text-white">
                  {t("ecosystem.diceTray")}
                </h3>
                <p className="font-mono text-xs text-white/60">
                  {t("ecosystem.diceTrayDesc")}
                </p>
              </div>
            </div>

            {/* Bowl Holder */}
            <div className="bg-[#282828] p-12 min-h-[350px] flex flex-col justify-between group hover:bg-[#3a3a3a] transition-colors relative">
              <div className="absolute top-4 right-4 font-mono text-[10px] border border-white/20 px-1 text-white/60">
                FIG A.4
              </div>
              <div className="w-full flex-grow border border-dashed border-white/20 flex items-center justify-center mb-6 bg-black/20">
                <span className="font-mono text-[10px] animate-pulse text-white/60">
                  {t("ecosystem.schematicPending")}
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2 text-white">
                  {t("ecosystem.bowlHolder")}
                </h3>
                <p className="font-mono text-xs text-white/60">
                  {t("ecosystem.bowlHolderDesc")}
                </p>
              </div>
            </div>

            {/* Player Desk */}
            <div className="bg-[#282828] p-12 min-h-[350px] flex flex-col justify-between group hover:bg-[#3a3a3a] transition-colors relative">
              <div className="absolute top-4 right-4 font-mono text-[10px] border border-white/20 px-1 text-white/60">
                FIG A.5
              </div>
              <div className="w-full flex-grow border border-dashed border-white/20 flex items-center justify-center mb-6 bg-black/20">
                <span className="font-mono text-[10px] animate-pulse text-white/60">
                  {t("ecosystem.schematicPending")}
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2 text-white">
                  {t("ecosystem.playerDesk")}
                </h3>
                <p className="font-mono text-xs text-white/60">
                  {t("ecosystem.playerDeskDesc")}
                </p>
              </div>
            </div>

            {/* Toppers Box */}
            <div className="bg-[#282828] p-12 min-h-[350px] flex flex-col justify-between group hover:bg-[#3a3a3a] transition-colors relative">
              <div className="absolute top-4 right-4 font-mono text-[10px] border border-white/20 px-1 text-white/60">
                FIG A.6
              </div>
              <div className="w-full flex-grow border border-dashed border-white/20 flex items-center justify-center mb-6 bg-black/20">
                <span className="font-mono text-[10px] animate-pulse text-white/60">
                  {t("ecosystem.schematicPending")}
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2 text-white">
                  {t("ecosystem.toppersBox")}
                </h3>
                <p className="font-mono text-xs text-white/60">
                  {t("ecosystem.toppersBoxDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS / STORIES SECTION */}
      <section id="stories" className="py-16 md:py-20 bg-paper px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10 reveal-trigger">
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-3">
              {t("storiesSection.label")}
            </span>
            <h3 className="font-serif text-4xl md:text-5xl leading-tight">
              {t("storiesSection.title")}{" "}
              <span className="italic text-ink/50">
                {t("storiesSection.titleAccent")}
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-1">
            {articles.map((article) => (
              <NextLink
                key={article.slug}
                href={`/stories/${article.slug}`}
                className="group reveal-trigger"
              >
                <article className="flex flex-col">
                  <div className="aspect-[16/10] relative overflow-hidden bg-ink/5 mb-6">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                      {article.category}
                    </span>
                    <span className="w-1 h-1 bg-ink/30 rounded-full" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
                      {article.date}
                    </span>
                  </div>
                  <h4 className="font-serif text-2xl md:text-3xl mb-3 group-hover:text-accent transition-colors leading-tight">
                    {article.title}
                  </h4>
                  <p className="font-sans text-sm md:text-base text-ink/60 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 font-mono text-xs uppercase tracking-widest text-ink/40 group-hover:text-accent transition-colors">
                    {t("storiesSection.readStory")}
                  </div>
                </article>
              </NextLink>
            ))}
          </div>
        </div>
      </section>

      {/* 2026 BATCH CTA */}
      <section className="relative bg-amber-400/80 py-16 md:py-24 px-6 md:px-12 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            {/* Left content */}
            <div className="max-w-2xl">
              <div className="mb-6">
                <span className="font-mono text-2xl uppercase tracking-widest text-black/60">
                  {t("cta.limitedProduction")}
                </span>
              </div>

              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-black mb-6 leading-tight whitespace-nowrap">
                {t("cta.batchOpening")}
              </h2>

              <p className="font-sans text-lg md:text-xl text-black/70 mb-8 max-w-xl">
                {t("cta.ctaDescription")}
              </p>

              {/* Email signup */}
              <form
                action={kickstarterAction}
                className="flex flex-col sm:flex-row gap-3 max-w-md"
              >
                <input type="hidden" name="source" value="kickstarter" />
                <input
                  type="email"
                  name="email"
                  placeholder={t("cta.emailPlaceholder")}
                  className="flex-1 bg-white px-5 py-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black/20 placeholder-black/40 text-black rounded-full"
                  disabled={kickstarterPending}
                />
                <button
                  type="submit"
                  disabled={kickstarterPending}
                  className="bg-black text-white px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-black/80 transition-colors rounded-full whitespace-nowrap disabled:opacity-50"
                >
                  {kickstarterPending ? t("cta.submitting") : t("cta.notifyMe")}
                </button>
              </form>
              {kickstarterState.message && (
                <p
                  className={`font-mono text-xs mt-2 ${kickstarterState.success ? "text-green-700" : "text-red-700"}`}
                >
                  {kickstarterState.message}
                </p>
              )}
            </div>

            {/* Right side - stats/info */}
            <div className="flex flex-col gap-6 md:text-right">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-black/50 mb-1">
                  {t("cta.batchSizeLabel")}
                </div>
                <div className="font-serif text-3xl md:text-4xl text-black">
                  {t("cta.batchSizeValue")}
                </div>
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-black/50 mb-1">
                  {t("cta.earlyBirdLabel")}
                </div>
                <div className="font-serif text-3xl md:text-4xl text-black">
                  {t("cta.earlyBirdValue")}
                </div>
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-black/50 mb-1">
                  {t("cta.deliveryLabel")}
                </div>
                <div className="font-serif text-3xl md:text-4xl text-black">
                  {t("cta.deliveryValue")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
