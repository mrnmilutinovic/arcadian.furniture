"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isMetric, setIsMetric] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const articles = [
    {
      slug: "forest-of-radgost-collaboration",
      title: "Spirits of the Forest Meet the Arcadian Table",
      excerpt:
        "We partnered with the creators of Forest of Radgost, a Slavic mythology board game, to showcase how epic adventures deserve an epic stage.",
      image: "/photos/forest-of-radgost.jpg",
      date: "December 2024",
      category: "Collaboration",
    },
    {
      slug: "boris-jovanovic-photoshoot",
      title: "Behind the Lens with Boris Jovanovic",
      excerpt:
        "Netflix and Adidas photographer Boris Jovanovic captured the soul of the Arcadian table in our most ambitious photoshoot yet.",
      image: "/photos/boris-photoshoot.jpg",
      date: "December 2024",
      category: "Behind the Scenes",
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

    // Observer for nav visibility
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "photo-grid") {
            setIsNavHidden(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.3 },
    );

    const photoGrid = document.getElementById("photo-grid");
    if (photoGrid) {
      navObserver.observe(photoGrid);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      navObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* <div className="noise" /> */}

      {/* HEADER / NAV */}
      <nav
        className={`w-full py-6 px-6 md:px-12 flex justify-between items-center fixed top-0 z-40 transition-all duration-300 ${isScrolled ? "pb-14" : "pb-20"} ${isNavHidden ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"}`}
      >
        {/* Background with curved bottom */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 1200 50"
        >
          <defs>
            <filter
              id="headerShadow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feDropShadow dx="0" dy="1" stdDeviation="3" floodOpacity="0.1" />
            </filter>
          </defs>
          <path
            d="M 0,0 L 1200,0 L 1200,30 Q 900,25 600,45 Q 300,25 0,30 Z"
            fill="rgba(243, 241, 234, 1)"
            filter="url(#headerShadow)"
          />
          <path
            d="M 0,30 Q 300,25 600,45 Q 900,25 1200,30"
            fill="none"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="0.5"
          />
        </svg>

        {/* Mobile hamburger menu button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden relative z-10 flex justify-center items-center w-8 h-8 ${isScrolled ? "bottom-1" : ""}`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Desktop nav */}
        <ul
          className={`hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-wider relative z-10 bottom-0 transition-all ${isScrolled ? "bottom-1" : ""}`}
        >
          <li>
            <a
              href="#transformation"
              className="hover:text-accent transition-colors"
            >
              The Table
            </a>
          </li>
          <li>
            <a href="#sizing" className="hover:text-accent transition-colors">
              Sizes
            </a>
          </li>
          <li>
            <a href="#finish" className="hover:text-accent transition-colors">
              Finish
            </a>
          </li>
          <li>
            <a
              href="#accessories"
              className="hover:text-accent transition-colors"
            >
              Accessories
            </a>
          </li>
          <li>
            <a href="/logs" className="hover:text-accent transition-colors">
              Logs
            </a>
          </li>
        </ul>
        <div
          className={`absolute left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
            isScrolled ? "scale-80 top-4" : "scale-100 top-8"
          }`}
        >
          <Image
            src="/pan-logo.svg"
            alt="Arcadian Logo"
            width={100}
            height={100}
            className="w-20 h-20 md:w-24 md:h-24"
          />
        </div>
        <div
          className={`font-mono text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2 relative z-10 bottom-0 transition-all ${isScrolled ? "bottom-1" : ""}`}
        >
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="hidden md:inline">
            Kickstarter Launch / March 2026
          </span>
        </div>
      </nav>

      {/* Mobile slide-out menu */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-all duration-300 ${isMobileMenuOpen ? "visible" : "invisible"}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu panel */}
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-paper shadow-xl transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="pt-24 px-6">
            <ul className="flex flex-col gap-4 font-mono text-sm uppercase tracking-wider">
              <li>
                <a
                  href="#transformation"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 hover:text-accent transition-colors"
                >
                  The Table
                </a>
              </li>
              <li>
                <a
                  href="#sizing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 hover:text-accent transition-colors"
                >
                  Sizes
                </a>
              </li>
              <li>
                <a
                  href="#finish"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 hover:text-accent transition-colors"
                >
                  Finish
                </a>
              </li>
              <li>
                <a
                  href="#accessories"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 hover:text-accent transition-colors"
                >
                  Accessories
                </a>
              </li>
              <li>
                <a
                  href="/logs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 hover:text-accent transition-colors"
                >
                  Logs
                </a>
              </li>
            </ul>

            <div className="mt-8 pt-8 border-t border-ink/10">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink/60">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Kickstarter Launch / March 2026
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <header className="relative w-full min-h-screen flex flex-col justify-center items-center border-b border-black/10 px-4 pt-32 pb-20">
        {/* Background Table Image - Tiled Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: "url(/table.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Background Grids */}
        <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-5">
          <div className="border-r border-black h-full" />
          <div className="border-r border-black h-full" />
          <div className="border-r border-black h-full" />
          <div className="border-r border-black h-full" />
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <p className="font-mono text-accent mb-6 tracking-widest uppercase text-xs md:text-sm">
            Established with a mission
          </p>

          <h1 className="font-serif text-7xl md:text-9xl font-bold tracking-tight tight-leading mb-8">
            Your <span className="italic font-light">Kitchen Table</span>
            <br />
            <span className="font-brush text-8xl md:text-[10rem] inline-block -rotate-3 -mt-8 md:-mt-12 text-red-800">
              IS DEAD!
            </span>
          </h1>

          <div className="max-w-2xl mx-auto mb-12">
            <p className="font-serif text-xl md:text-2xl leading-relaxed">
              We believe game nights deserve more than a kitchen table.
            </p>
          </div>

          {/* CTA Form */}
          <div className="relative group w-full max-w-md mx-auto">
            <form className="relative flex flex-col md:flex-row gap-2 md:gap-0 md:bg-paper md:border md:border-black/20 md:p-1 md:rounded-full">
              <input
                type="email"
                placeholder="ENTER EMAIL ADDRESS"
                className="w-full bg-paper md:bg-transparent px-4 py-4 font-mono text-sm focus:outline-none placeholder-black/40 text-ink border border-black/20 md:border-0 rounded-full md:rounded-none"
              />
              <button
                type="submit"
                className="w-full md:w-auto rounded-full bg-ink text-paper px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors duration-300 whitespace-nowrap"
              >
                Join List
              </button>
            </form>
          </div>
          <p className="font-mono text-[10px] mt-4 opacity-50">
            NOTIFY ME ON LAUNCH
          </p>
        </div>
      </header>

      {/* FULL WIDTH PHOTOS */}
      <section id="photo-grid" className="w-full h-dvh">
        <div className="grid grid-cols-2 md:grid-cols-4 h-full gap-1">
          <div className=" relative">
            <Image
              src="/photos/preview-10.jpeg"
              alt="Detail 1"
              fill
              className="object-cover"
            />
          </div>
          <div className=" relative">
            <Image
              src="/photos/preview-11.jpeg"
              alt="Detail 2"
              fill
              className="object-cover"
            />
          </div>
          <div className=" relative">
            <Image
              src="/photos/preview-12.jpeg"
              alt="Detail 3"
              fill
              className="object-cover"
            />
          </div>
          <div className=" relative">
            <Image
              src="/photos/preview-13.jpeg"
              alt="Detail 4"
              fill
              className="object-cover"
            />
          </div>
          <div className=" relative">
            <Image
              src="/photos/preview-14.jpeg"
              alt="Detail 4"
              fill
              className="object-cover"
            />
          </div>
          <div className=" relative">
            <Image
              src="/photos/preview-15.jpeg"
              alt="Detail 4"
              fill
              className="object-cover"
            />
          </div>
          <div className=" relative">
            <Image
              src="/photos/preview-16.jpeg"
              alt="Detail 4"
              fill
              className="object-cover"
            />
          </div>
          <div className=" relative">
            <Image
              src="/photos/preview-17.jpeg"
              alt="Detail 4"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section
        id="transformation"
        className="py-32 bg-[#F3F1EA] border-t border-ink/5 overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-40">
          {/* 1. THE TRANSFORMATION (2-Column Images) */}
          <div className="flex flex-col gap-12">
            <div className="max-w-2xl mx-auto text-center reveal-trigger">
              <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-3">
                The Transformation
              </span>
              <h3 className="font-serif text-4xl md:text-5xl mb-2 leading-tight">
                Dining to gaming
                <span className="italic text-ink/50"> in seconds.</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-1 rounded-xl">
              <div className="reveal-trigger">
                <div className="aspect-[4/3] relative bg-black/5 overflow-hidden">
                  <Image
                    src="/photos/covered-scene-3.jpeg"
                    alt="Table Transformation - Dining"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 relative">
                  <div className="bg-white px-3 py-1 rounded-lg absolute -top-12 rotate-[-7deg] left-1">
                    <h4 className="font-sans text-2xl">Undercover mode</h4>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <h5 className="font-sans text-2xl mt-4">
                      When life happens
                    </h5>
                  </div>
                  <p className="font-sans text-sm text-ink/60 leading-relaxed max-w-[500px]">
                    Toppers on. It's a dining table. Beautiful, functional,
                    completely unsuspicious. Your in-laws will never know.
                  </p>
                </div>
              </div>
              <div className="reveal-trigger">
                <div className="aspect-[4/3] relative bg-black/5 overflow-hidden">
                  <Image
                    src="/photos/uncovering-scene-2.jpeg"
                    alt="Table Transformation - Gaming"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 relative">
                  <div className="bg-black text-white px-3 py-1 rounded-lg absolute -top-12 rotate-[4deg] left-1">
                    <h4 className="font-sans text-2xl">Vault mode</h4>
                  </div>
                  <div className="flex gap-4 mb-2">
                    <h5 className="font-sans text-2xl mt-4">
                      When games happen
                    </h5>
                  </div>
                  <p className="font-sans text-sm text-ink/60 leading-relaxed max-w-[500px]">
                    Toppers off. The Vault revealed. 10cm of recessed gaming
                    paradise, ready for whatever you're playing—and whatever
                    you're leaving set up for next week.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto text-center pt-8 border-t border-ink/10">
              <p className="font-mono text-xs text-ink/40 leading-relaxed">
                Each topper is precision - sized for optimal weight distribution
              </p>
              <p className="font-mono text-xs text-ink/40 leading-relaxed">
                <strong>Heavy enough</strong> to stay put,{" "}
                <strong>light enough </strong>
                for effortless one-hand removal.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* NEWS / STORIES SECTION */}
      <section id="stories" className="py-24 md:py-32 bg-paper px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 reveal-trigger">
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-3">
              Stories
            </span>
            <h3 className="font-serif text-4xl md:text-5xl leading-tight">
              From the <span className="italic text-ink/50">Workshop</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {articles.map((article) => (
              <Link
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
                    Read Story →
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE SHOWCASE - MOSAIC LAYOUT */}
      <section
        id="sizing"
        className="py-32 bg-[#F3F1EA] border-t border-ink/5 overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-40">
          {/* 2. SIZES */}
          <div className="flex flex-col gap-12">
            <div className="max-w-2xl mx-auto text-center reveal-trigger">
              <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-3">
                Sizing
              </span>
              <h3 className="font-serif text-4xl md:text-5xl mb-4 leading-tight">
                Find
                <span className="italic text-ink/50"> Your Fit.</span>
              </h3>
              <p className="font-sans text-lg font-light leading-relaxed text-ink/70">
                Not every game room is the same. Not every group is the same.
              </p>
              <p className="font-sans text-lg font-light leading-relaxed text-ink/70">
                So we made two sizes - one for intimate sessions, one for epic
                campaigns. Both fit through standard doors. Both hide in plain
                sight.👻
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <div className="relative aspect-[4/3] bg-black/5 reveal-trigger">
                <Image
                  src="/photos/size-small-3.jpeg"
                  alt="Wood Detail 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] bg-black/5 reveal-trigger">
                <Image
                  src="/photos/size-big-2.jpeg"
                  alt="Wood Detail 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="bg-[#EAE8E1] p-6 md:p-12 flex flex-col justify-center reveal-trigger max-w-2xl mx-auto w-full">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                <h4 className="font-sans text-2xl md:text-3xl">Two Sizes</h4>
                <button
                  type="button"
                  onClick={() => setIsMetric(!isMetric)}
                  className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest"
                >
                  <span className={isMetric ? "opacity-100" : "opacity-40"}>
                    CM
                  </span>
                  <div className="relative w-10 h-5 bg-ink/20 rounded-full">
                    <div
                      className={`absolute top-0.5 w-4 h-4 bg-ink rounded-full transition-all duration-200 ${
                        isMetric ? "left-0.5" : "left-5"
                      }`}
                    />
                  </div>
                  <span className={!isMetric ? "opacity-100" : "opacity-40"}>
                    IN
                  </span>
                </button>
              </div>
              <div className="space-y-6">
                <div className="border-b border-ink/10 pb-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-3">
                    <span className="font-serif text-xl">The Standard</span>
                    <span className="font-mono text-[10px] md:text-xs opacity-50 uppercase">
                      Seats 4
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="font-sans text-xs md:text-sm opacity-60">
                        Closed Table Size
                      </span>
                      <span className="font-mono text-xs md:text-sm opacity-60">
                        {isMetric ? "108 × 108 cm" : "42.5 × 42.5 in"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sans text-xs md:text-sm opacity-60">
                        Play Area
                      </span>
                      <span className="font-mono text-xs md:text-sm opacity-60">
                        {isMetric ? "90 × 90 cm" : "35.4 × 35.4 in"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-b border-ink/10 pb-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-3">
                    <span className="font-serif text-xl">The Grand</span>
                    <span className="font-mono text-[10px] md:text-xs opacity-50 uppercase">
                      Seats 6-8
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="font-sans text-xs md:text-sm opacity-60">
                        Closed Table Size
                      </span>
                      <span className="font-mono text-xs md:text-sm opacity-60">
                        {isMetric ? "108 × 189 cm" : "42.5 × 74.4 in"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sans text-xs md:text-sm opacity-60">
                        Play Area
                      </span>
                      <span className="font-mono text-xs md:text-sm opacity-60">
                        {isMetric ? "90 × 170 cm" : "35.4 × 66.9 in"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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
                  className="object-cover opacity-60"
                />
              </div>

              {/* Text overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16">
                <div className="max-w-xl">
                  <span className="font-mono text-[10px] md:text-xs text-accent tracking-widest uppercase block mb-2 md:mb-4">
                    Assembly
                  </span>
                  <h3 className="font-serif text-3xl md:text-6xl leading-tight text-white mb-0">
                    Ready to play
                  </h3>
                  <h3 className="font-sans text-4xl md:text-7xl mb-4 md:mb-6 leading-tight font-bold text-white/80">
                    in 30 minutes.
                  </h3>
                  <p className="font-sans text-sm md:text-lg font-light leading-relaxed text-white/70 mb-4 md:mb-6 max-w-2xl">
                    The Arcadian arrives flat-packed and ready. One tool.
                    Pre-drilled holes. No guesswork, no leftover screws.
                  </p>
                  <div className="flex items-center gap-2 md:gap-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/40">
                    <span>Single Tool</span>
                    <span>///</span>
                    <span>Easy Assembly</span>
                  </div>
                </div>
              </div>

              {/* Play button placeholder */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <div className="w-0 h-0 border-t-6 md:border-t-8 border-t-transparent border-l-8 md:border-l-12 border-l-white border-b-6 md:border-b-8 border-b-transparent ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="finish"
        className="py-40 px-6 bg-paper reveal-trigger border-t border-ink/5"
      >
        <div className="max-w-[1100px] mx-auto">
          <span className="font-mono text-xs text-oak tracking-widest uppercase block mb-12">
            The Finish
          </span>

          <h2 className="font-serif text-6xl md:text-8xl leading-[0.9] text-ink mb-16 reveal-text">
            Natural stains <br />
            <span className="italic text-oak/60">& deep protection.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            <div
              className="md:col-span-5 reveal-text"
              style={{ transitionDelay: "0.2s" }}
            >
              <p className="font-serif text-2xl md:text-3xl leading-tight text-ink mb-8">
                We finish our premium boardgaming tables with a revolutionary
                plant-based hardwax oil that delivers both exceptional beauty
                and environmental responsibility.
              </p>
              <div className="w-full h-px bg-ink/10 my-8" />
              <p className="font-mono text-xs text-oak uppercase tracking-widest">
                0% VOC — Solvent Free
              </p>
            </div>

            <div
              className="md:col-span-7 font-sans text-lg font-light leading-relaxed text-ink/70 space-y-8 reveal-text"
              style={{ transitionDelay: "0.3s" }}
            >
              <p>
                This eco-conscious finish is <strong>0% VOC [1]</strong> and
                contains no solvents or water, making it one of the cleanest
                wood treatments available.
              </p>
              <p>
                Oils penetrate the wood fibers to create outstanding resistance
                to wear, water, and heat and that is essential protection for
                gaming tables that endure countless game nights, drink
                condensation, and the natural oils from players&apos; hands.
              </p>
              <p>
                Unlike traditional finishes that sit on the surface, this
                treatment preserves the natural look and feel of the wood,
                allowing you to experience authentic hardwood warmth while
                enjoying a finish that&apos;s as kind to the environment as it
                is tough on daily use.
              </p>
            </div>
          </div>

          <div
            className="mt-24 pt-8 border-t border-ink/10 reveal-text"
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="flex items-start gap-4">
              <span className="font-mono text-xs text-oak">[1]</span>
              <p className="font-mono text-xs text-ink/40 max-w-3xl leading-relaxed">
                VOC stands for Volatile Organic Compounds—chemicals that
                evaporate into the air at room temperature and can contribute to
                indoor air pollution and potential health concerns. Many
                traditional wood finishes contain high levels of VOCs, which
                release fumes during application and curing, often requiring
                extensive ventilation and creating that characteristic &quot;new
                finish&quot; smell. A 0% VOC finish eliminates these concerns
                entirely, ensuring better indoor air quality from the moment the
                piece enters your home, with no toxic fumes, no lingering odors,
                and no ongoing chemical emissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WOOD COLORS */}
      <section className="py-20 px-6 bg-[#eae8e1] reveal-trigger">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-3">
              Choose Your Finish
            </span>
            <h3 className="font-serif text-4xl md:text-5xl leading-tight">
              Two stains,{" "}
              <span className="italic text-ink/50">one mystery.</span>
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
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-3xl italic text-white mb-2">
                  Arcadian Dawn
                </h3>
                <p className="font-sans text-sm text-white/70 max-w-[300px]">
                  Quite neutral, natural oak finish with the hint of lighter
                  tones.
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
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-3xl italic text-white mb-2">
                  Pan&apos;s Shadow
                </h3>
                <p className="font-sans text-sm text-white/70">
                  Rich warm, walnut looking tones with the thread of dark
                  chocolate.
                </p>
              </div>
            </div>

            {/* Kickstarter Exclusive - Mystery */}
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
                    Kickstarter Exclusive
                  </h3>
                  <p className="font-sans text-sm text-white/40 px-6">
                    Revealed at launch. Back early to unlock this mystery
                    finish.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE RAIL SYSTEM */}
      <section
        id="accessories"
        className="py-32 bg-[#F3F1EA] border-t border-ink/5 overflow-hidden"
      >
        <div className="reveal-trigger">
          <div className="text-center max-w-2xl mx-auto mb-16 px-6 md:px-12">
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">
              The Rail System
            </span>
            <h3 className="font-serif text-5xl md:text-6xl leading-tight">
              Everything at hand.
            </h3>
          </div>

          <div className="w-full aspect-[4/3] md:aspect-[21/9] relative bg-black/5 mb-12">
            <Image
              src="/photos/close-up-rail-scene.jpg"
              alt="Magnetic Rail System"
              fill
              className="object-cover"
            />
          </div>

          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-ink/10 pt-8">
              <div>
                <h4 className="font-serif text-2xl mb-2">Magnetic Click</h4>
                <p className="font-sans text-sm text-ink/60 leading-relaxed">
                  Accessories snap into place instantly with industrial strength
                  magnets. No screws required.
                </p>
              </div>
              <div>
                <h4 className="font-serif text-2xl mb-2">360° Modular</h4>
                <p className="font-sans text-sm text-ink/60 leading-relaxed">
                  Attach cup holders and bins anywhere along the inner or outer
                  rail perimeter.
                </p>
              </div>
              <div>
                <h4 className="font-serif text-2xl mb-2">Solid Wood</h4>
                <p className="font-sans text-sm text-ink/60 leading-relaxed">
                  All accessories are crafted from the same premium hardwoods as
                  your table.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACCESSORIES / ECOSYSTEM */}
      <section
        id="ecosystem"
        className="w-full py-24 px-6 md:px-12 border-b border-black/10 bg-[#F0EFE9]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 border-b border-black/10 pb-6 gap-4">
            <h2 className="font-serif text-5xl md:text-6xl">The Ecosystem.</h2>
            <div className="font-mono text-xs md:text-right">
              <div className="uppercase tracking-widest mb-1">
                Modular Add-ons
              </div>
              <div className="opacity-50">STATUS: IN DEVELOPMENT</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10">
            <div className="bg-paper p-12 min-h-[350px] flex flex-col justify-between group hover:bg-white transition-colors relative">
              <div className="absolute top-4 right-4 font-mono text-[10px] border border-black/20 px-1">
                FIG A.1
              </div>
              <div className="w-full flex-grow border border-dashed border-black/20 flex items-center justify-center mb-6 bg-black/5">
                <span className="font-mono text-[10px] animate-pulse">
                  [ SCHEMATIC PENDING ]
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">The Rail System</h3>
                <p className="font-mono text-xs opacity-60">
                  Universal attachment points.
                </p>
              </div>
            </div>

            <div className="bg-paper p-12 min-h-[350px] flex flex-col justify-between group hover:bg-white transition-colors relative">
              <div className="absolute top-4 right-4 font-mono text-[10px] border border-black/20 px-1">
                FIG A.2
              </div>
              <div className="w-full flex-grow border border-dashed border-black/20 flex items-center justify-center mb-6 bg-black/5">
                <span className="font-mono text-[10px] animate-pulse">
                  [ SCHEMATIC PENDING ]
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">Storage Solutions</h3>
                <p className="font-mono text-xs opacity-60">
                  Integrated component bins.
                </p>
              </div>
            </div>

            <div className="bg-paper p-12 min-h-[350px] flex flex-col justify-between group hover:bg-white transition-colors relative">
              <div className="absolute top-4 right-4 font-mono text-[10px] border border-black/20 px-1">
                FIG A.3
              </div>
              <div className="w-full flex-grow border border-dashed border-black/20 flex items-center justify-center mb-6 bg-black/5">
                <span className="font-mono text-[10px] animate-pulse">
                  [ SCHEMATIC PENDING ]
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">Game Master Screen</h3>
                <p className="font-mono text-xs opacity-60">
                  Magnetic alignment.
                </p>
              </div>
            </div>
            <div className="bg-paper p-12 min-h-[350px] flex flex-col justify-between group hover:bg-white transition-colors relative">
              <div className="absolute top-4 right-4 font-mono text-[10px] border border-black/20 px-1">
                FIG A.3
              </div>
              <div className="w-full flex-grow border border-dashed border-black/20 flex items-center justify-center mb-6 bg-black/5">
                <span className="font-mono text-[10px] animate-pulse">
                  [ SCHEMATIC PENDING ]
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">Game Master Screen</h3>
                <p className="font-mono text-xs opacity-60">
                  Magnetic alignment.
                </p>
              </div>
            </div>
            <div className="bg-paper p-12 min-h-[350px] flex flex-col justify-between group hover:bg-white transition-colors relative">
              <div className="absolute top-4 right-4 font-mono text-[10px] border border-black/20 px-1">
                FIG A.3
              </div>
              <div className="w-full flex-grow border border-dashed border-black/20 flex items-center justify-center mb-6 bg-black/5">
                <span className="font-mono text-[10px] animate-pulse">
                  [ SCHEMATIC PENDING ]
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">Game Master Screen</h3>
                <p className="font-mono text-xs opacity-60">
                  Magnetic alignment.
                </p>
              </div>
            </div>
            <div className="bg-paper p-12 min-h-[350px] flex flex-col justify-between group hover:bg-white transition-colors relative">
              <div className="absolute top-4 right-4 font-mono text-[10px] border border-black/20 px-1">
                FIG A.3
              </div>
              <div className="w-full flex-grow border border-dashed border-black/20 flex items-center justify-center mb-6 bg-black/5">
                <span className="font-mono text-[10px] animate-pulse">
                  [ SCHEMATIC PENDING ]
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">Game Master Screen</h3>
                <p className="font-mono text-xs opacity-60">
                  Magnetic alignment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KICKSTARTER CTA */}
      <section className="relative bg-[#05CE78] py-20 md:py-32 px-6 md:px-12 overflow-hidden">
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
                {/* Kickstarter logo */}
                <Image
                  src="/kickstarter-logo-white.avif"
                  alt="Kickstarter"
                  width={200}
                  height={40}
                  className="h-8 md:h-10 w-auto"
                />
              </div>

              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-black mb-6 leading-tight">
                Launching <span className="italic">March 2026</span>
              </h2>

              <p className="font-sans text-lg md:text-xl text-black/70 mb-8 max-w-xl">
                Be the first to know when we go live. Early backers get
                exclusive pricing and the mystery finish reveal.
              </p>

              {/* Email signup */}
              <form className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  className="flex-1 bg-white px-5 py-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black/20 placeholder-black/40 text-black rounded-full"
                />
                <button
                  type="submit"
                  className="bg-black text-white px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-black/80 transition-colors rounded-full whitespace-nowrap"
                >
                  Notify Me
                </button>
              </form>
            </div>

            {/* Right side - stats/info */}
            <div className="flex flex-col gap-6 md:text-right">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-black/50 mb-1">
                  Campaign Goal
                </div>
                <div className="font-serif text-3xl md:text-4xl text-black">
                  €70,000
                </div>
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-black/50 mb-1">
                  Early Bird Slots
                </div>
                <div className="font-serif text-3xl md:text-4xl text-black">
                  30
                </div>
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-black/50 mb-1">
                  Estimated Delivery
                </div>
                <div className="font-serif text-3xl md:text-4xl text-black">
                  Q4 2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-paper py-24 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-16">
          {/* Left Side: Brand & CTA */}
          <div className="flex flex-col justify-between items-start">
            <div className="mb-12">
              <h2 className="font-ruthie text-7xl md:text-9xl mb-0 tracking-tight">
                Arcadian
              </h2>
              <p className="font-sans text-xl opacity-60 font-light max-w-md">
                Designed for families who play. For game nights that run late.
                For campaigns that span months.
              </p>
            </div>

            <div className="w-full max-w-md">
              <p className="font-mono text-[10px] uppercase tracking-widest mb-4 opacity-50">
                Stay Updated
              </p>
              <form className="flex border-b border-white/20 pb-4 w-full group focus-within:border-white/60 transition-colors">
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  className="bg-transparent w-full font-mono text-sm focus:outline-none placeholder-white/30 text-white"
                />
                <button
                  type="submit"
                  className="font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Right Side: Links */}
          <div className="flex flex-col justify-between md:items-end">
            <nav className="flex flex-col gap-4 md:text-right">
              <a
                href="#"
                className="font-serif text-3xl md:text-4xl hover:text-accent transition-colors hover:italic"
              >
                Instagram
              </a>
              <a
                href="#"
                className="font-serif text-3xl md:text-4xl hover:text-accent transition-colors hover:italic"
              >
                TikTok
              </a>
              <a
                href="#"
                className="font-serif text-3xl md:text-4xl hover:text-accent transition-colors hover:italic"
              >
                Kickstarter
              </a>
              <a
                href="/logs"
                className="font-serif text-3xl md:text-4xl hover:text-accent transition-colors hover:italic"
              >
                Logs
              </a>
              <div className="h-8"></div>
              <a
                href="/terms"
                className="font-serif text-xl md:text-2xl opacity-60 hover:opacity-100 hover:text-accent transition-colors"
              >
                Terms & Conditions
              </a>
              <a
                href="/privacy"
                className="font-serif text-xl md:text-2xl opacity-60 hover:opacity-100 hover:text-accent transition-colors"
              >
                Privacy Policy
              </a>
            </nav>

            <div className="mt-16 font-mono text-[10px] uppercase tracking-widest opacity-30 md:text-right">
              © 2025 Arcadian. All rights reserved.
              <br />
              Designed & Crafted in Serbia.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
