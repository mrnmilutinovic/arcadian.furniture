'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [activeScenario, setActiveScenario] = useState('homework');
  const [isScrolled, setIsScrolled] = useState(false);

  const scenarios = {
    boardgames: {
      title: 'Boardgames',
      desc: 'Remove the leaves to reveal the vault. Felt-lined silence, card rails, and component organizers.',
      img: 'https://images.unsplash.com/photo-1610890716271-e7466f54d519?q=80&w=2070&auto=format&fit=crop',
    },
    ttrpg: {
      title: 'TTRPG',
      desc: 'Deep vault walls protect your minis. Plenty of space for character sheets, dice towers, and DM screens.',
      img: 'https://images.unsplash.com/photo-1640498886469-f6c6cb99e51e?q=80&w=2070&auto=format&fit=crop',
    },
    homework: {
      title: 'Homework',
      desc: 'A distraction-free surface for homework or home office. Indistinguishable from a high-end dining table.',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    },
    legos: {
      title: 'Legos',
      desc: 'Pause your build without cleaning up. Cover your progress for dinner, and resume exactly where you left off.',
      img: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?q=80&w=2071&auto=format&fit=crop',
    },
    puzzle: {
      title: 'Puzzle',
      desc: 'Pause your build without cleaning up. Cover your progress for dinner, and resume exactly where you left off.',
      img: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?q=80&w=2071&auto=format&fit=crop',
    },
    family: {
      title: 'Feast',
      desc: 'Pause your build without cleaning up. Cover your progress for dinner, and resume exactly where you left off.',
      img: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?q=80&w=2071&auto=format&fit=crop',
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal-trigger').forEach((el) => observer.observe(el));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* <div className="noise" /> */}

      {/* HEADER / NAV */}
      <nav className={`w-full py-6 px-6 md:px-12 flex justify-between items-center fixed top-0 z-40 transition-all duration-300 ${isScrolled ? 'pb-14' : 'pb-20'
        }`}>
        {/* Background with curved bottom */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 50">
          <defs>
            <filter id="headerShadow" x="-50%" y="-50%" width="200%" height="200%">
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

        <ul className={`hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-wider relative z-10 bottom-0 transition-all ${isScrolled ? 'bottom-1' : ''}`}>
          <li><a href="#tables" className="hover:text-accent transition-colors">Tables</a></li>
          <li><a href="#craft" className="hover:text-accent transition-colors">Craft</a></li>
          <li><a href="#accessories" className="hover:text-accent transition-colors">Accessories</a></li>
          <li><a href="#kickstarter" className="hover:text-accent transition-colors">Kickstarter</a></li>
          <li><a href="#story" className="hover:text-accent transition-colors">Story</a></li>
        </ul>
        <div className={`absolute left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${isScrolled ? 'scale-80 top-4' : 'scale-100 top-8'
          }`}>
          <Image
            src="/pan-logo.svg"
            alt="Arcadian Logo"
            width={100}
            height={100}
            className="w-20 h-20 md:w-24 md:h-24"
          />
        </div>
        <div className={`font-mono text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2 relative z-10 bottom-0 transition-all ${isScrolled ? 'bottom-1' : ''}`}>
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          Kickstarter Launch / March 2026
        </div>

      </nav>

      {/* HERO SECTION */}
      <header className="relative w-full min-h-screen flex flex-col justify-center items-center border-b border-black/10 px-4 pt-32 pb-20">
        {/* Background Table Image - Tiled Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'url(/table.png)',
            backgroundRepeat: 'repeat',
            backgroundSize: '1000px auto',
            backgroundPosition: 'center'
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
            <span className="font-brush text-8xl md:text-[10rem] inline-block -rotate-3 -mt-8 md:-mt-12 text-red-800">IS DEAD!</span>
          </h1>

          <div className="max-w-2xl mx-auto mb-12">
            <p className="font-serif text-xl md:text-2xl leading-relaxed">
              We believe game nights deserve more than a kitchen table.
            </p>
          </div>

          {/* CTA Form */}
          <div className="relative group w-full max-w-md mx-auto">
            <form className="relative flex flex-col md:flex-row gap-0 bg-paper border border-black/20 p-1 rounded-full">
              <input
                type="email"
                placeholder="ENTER EMAIL ADDRESS"
                className="w-full bg-transparent px-4 py-4 font-mono text-sm focus:outline-none placeholder-black/40 text-ink"
              />
              <button
                type="submit"
                className="w-full md:w-auto rounded-full bg-ink text-paper px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors duration-300 whitespace-nowrap"
              >
                Join List
              </button>
            </form>
          </div>
          <p className="font-mono text-[10px] mt-4 opacity-50">NOTIFY ME ON LAUNCH</p>
        </div>
      </header>

      {/* FULL WIDTH 4 PHOTOS */}
      <section className="w-full h-dvh">
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

      <section className="py-32 bg-[#F3F1EA] border-t border-ink/5 overflow-hidden">
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
                    src="/photos/dining-scene.jpeg"
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
                    <h5 className="font-sans text-2xl mt-4">When life happens</h5>
                  </div>
                  <p className="font-sans text-sm text-ink/60 leading-relaxed max-w-[500px]">
                    Toppers on. It's a dining table. Beautiful, functional, completely unsuspicious. Your in-laws will never know.
                  </p>
                </div>
              </div>
              <div className="reveal-trigger">
                <div className="aspect-[4/3] relative bg-black/5 overflow-hidden">
                  <Image
                    src="/photos/uncovering-scene.jpeg"
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
                    <h5 className="font-sans text-2xl mt-4">When games happen</h5>
                  </div>
                  <p className="font-sans text-sm text-ink/60 leading-relaxed max-w-[500px]">
                    Toppers off. The Vault revealed. Three inches of recessed gaming paradise, ready for whatever you're playing—and whatever you're leaving set up for next week.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      {/* SCENARIOS CAROUSEL */}
      <section id="scenarios" className="relative bg-paper p-10">
        <div className="relative h-[85vh] overflow-hidden">
          {/* Images - Full Screen */}
          <div className="absolute inset-0 overflow-hidden">
            {Object.entries(scenarios).map(([key, data]) => (
              <div
                key={key}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeScenario === key ? 'opacity-100' : 'opacity-0'
                  }`}
              >
                <Image
                  src={data.img}
                  alt={data.title}
                  fill
                  className="object-cover"
                  priority={key === 'homework'}
                />
              </div>
            ))}
          </div>

          {/* Titles - Top Left */}
          <div className="relative z-10 pt-12 px-6 md:px-12 max-w-2xl">
            <div className="font-mono text-[10px] text-white/80 mb-8 tracking-widest uppercase">
              Select Mode
            </div>

            {/* Scenario Titles */}
            <div>
              {Object.entries(scenarios).map(([key, data]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveScenario(key)}
                  className={`text-left font-sans text-3xl md:text-4xl font-medium tracking-tight transition-all duration-300 ease-out block py-2 ${activeScenario === key
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/60'
                    }`}
                >
                  {data.title}
                </button>
              ))}
            </div>
          </div>

          {/* Description - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 pb-12">
            <div className="relative h-24">
              {Object.entries(scenarios).map(([key, data]) => (
                <div
                  key={key}
                  className={`transition-all duration-500 ${activeScenario === key ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-4 absolute top-0'
                    }`}
                >
                  <p className="font-sans text-xl md:text-2xl font-light leading-relaxed text-white/90 max-w-2xl">
                    {data.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE SHOWCASE - MOSAIC LAYOUT */}
      <section className="py-32 bg-[#F3F1EA] border-t border-ink/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-40">
          
          {/* 2. CRAFTSMANSHIP */}
          <div className="flex flex-col gap-12">
            <div className="max-w-2xl mx-auto text-center reveal-trigger">
              <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-3">
                Craftsmanship
              </span>
              <h3 className="font-serif text-4xl md:text-5xl mb-4 leading-tight">
                Built to last
                <span className="italic text-ink/50"> generations.</span>
              </h3>
              <p className="font-sans text-lg font-light leading-relaxed text-ink/70">
                Handcrafted from sustainably sourced European White Oak or American Black Walnut.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <div className="relative aspect-[4/3] bg-black/5 reveal-trigger">
                <Image
                  src="/photos/close-up-1.jpeg"
                  alt="Wood Detail 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] bg-black/5 reveal-trigger">
                <Image
                  src="/photos/close-up-2.jpeg"
                  alt="Wood Detail 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="bg-[#EAE8E1] p-12 flex flex-col justify-center reveal-trigger max-w-2xl mx-auto w-full">
              <h4 className="font-sans text-3xl mb-8">Two Sizes</h4>
              <div className="space-y-6">
                <div className="border-b border-ink/10 pb-4">
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="font-serif text-xl">The Standard</span>
                    <span className="font-mono text-xs opacity-50 uppercase">Comfortably seats 4 PEOPLE</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="font-sans text-sm opacity-60">Closed Table Size</span>
                      <span className="font-mono text-sm opacity-60">108 × 108 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sans text-sm opacity-60">Play Area</span>
                      <span className="font-mono text-sm opacity-60">90 × 90 cm</span>
                    </div>
                  </div>
                </div>
                <div className="border-b border-ink/10 pb-4">
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="font-serif text-xl">The Grand</span>
                    <span className="font-mono text-xs opacity-50 uppercase">Comfortably seats 6-8 PEOPLE</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="font-sans text-sm opacity-60">Closed Table Size</span>
                      <span className="font-mono text-sm opacity-60">108cm x 189cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sans text-sm opacity-60">Play Area</span>
                      <span className="font-mono text-sm opacity-60">90cm x 170cm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. ASSEMBLY (Asymmetric) */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="w-full md:w-1/3 flex flex-col justify-end pb-12 reveal-trigger">
              <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-6">
                Assembly
              </span>
              <h3 className="font-serif text-3xl md:text-4xl leading-tight">
                Ready to play
              </h3>
              <h3 className="font-sans text-4xl md:text-5xl mb-6 leading-tight">
                in 15 minutes.
              </h3>
              <p className="font-sans text-lg font-light leading-relaxed text-ink/70 mb-8">
                The Arcadian arrives with the vault fully assembled.
                Simply attach the four legs using the included single tool.
              </p>
              <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-ink/40">
                <span>Single Tool</span>
                <span>///</span>
                <span>Super easy assembly</span>
              </div>
            </div>
            <div className="w-full md:w-2/3 aspect-[4/3] relative bg-black/5 reveal-trigger">
              <Image
                src="/photos/assembly.jpeg"
                alt="Easy Assembly"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </section>
      <section id="finish" className="py-40 px-6 bg-paper reveal-trigger border-t border-ink/5">
        <div className="max-w-[1100px] mx-auto">
          <span className="font-mono text-xs text-oak tracking-widest uppercase block mb-12">
            The Finish
          </span>

          <h2 className="font-serif text-6xl md:text-8xl leading-[0.9] text-ink mb-16 reveal-text">
            Organic science <br />
            <span className="italic text-oak/60">& deep protection.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            <div className="md:col-span-5 reveal-text" style={{ transitionDelay: '0.2s' }}>
              <p className="font-serif text-2xl md:text-3xl leading-tight text-ink mb-8">
                We finish our premium boardgaming tables with a revolutionary plant-based hardwax oil
                that delivers both exceptional beauty and environmental responsibility.
              </p>
              <div className="w-full h-px bg-ink/10 my-8" />
              <p className="font-mono text-xs text-oak uppercase tracking-widest">
                0% VOC — Solvent Free
              </p>
            </div>

            <div
              className="md:col-span-7 font-sans text-lg font-light leading-relaxed text-ink/70 space-y-8 reveal-text"
              style={{ transitionDelay: '0.3s' }}
            >
              <p>
                This eco-conscious finish is <strong>0% VOC [1]</strong> and contains no solvents
                or water, making it one of the cleanest wood treatments available.
              </p>
              <p>
                Oils penetrate the wood fibers to create outstanding resistance to wear, water, and
                heat and that is essential protection for gaming tables that endure countless game
                nights, drink condensation, and the natural oils from players&apos; hands.
              </p>
              <p>
                Unlike traditional finishes that sit on the surface, this treatment preserves the
                natural look and feel of the wood, allowing you to experience authentic hardwood
                warmth while enjoying a finish that&apos;s as kind to the environment as it is
                tough on daily use.
              </p>
            </div>
          </div>

          <div className="mt-24 pt-8 border-t border-ink/10 reveal-text" style={{ transitionDelay: '0.4s' }}>
            <div className="flex items-start gap-4">
              <span className="font-mono text-xs text-oak">[1]</span>
              <p className="font-mono text-xs text-ink/40 max-w-3xl leading-relaxed">
                VOC stands for Volatile Organic Compounds—chemicals that evaporate into the air at
                room temperature and can contribute to indoor air pollution and potential health
                concerns. Many traditional wood finishes contain high levels of VOCs, which release
                fumes during application and curing, often requiring extensive ventilation and
                creating that characteristic &quot;new finish&quot; smell. A 0% VOC finish eliminates these
                concerns entirely, ensuring better indoor air quality from the moment the piece
                enters your home, with no toxic fumes, no lingering odors, and no ongoing chemical
                emissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WOOD COLORS */}
      <section className="py-20 px-6 bg-[#eae8e1] reveal-trigger">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-ink/10 border-t border-b border-ink/10">
          <div className="py-12 md:px-12 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-[#Cbbfa6] shadow-inner mb-6 ring-4 ring-white/50" />
            <h3 className="font-serif text-3xl italic">Arcadian Dawn</h3>
            <p className="font-sans text-sm mt-3 text-ink/60 max-w-xs">
              Quite neutral, natural oak finish with the hint of lighter tones.
            </p>
          </div>

          <div className="py-12 md:px-12 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-[#4A3B32] shadow-inner mb-6 ring-4 ring-white/50" />
            <h3 className="font-serif text-3xl italic">Pan&apos;s Shadow</h3>
            <p className="font-sans text-sm mt-3 text-ink/60 max-w-xs">
              Rich warm, walnut looking tones with the thread of dark chocolate.
            </p>
          </div>

          <div className="py-12 md:px-12 flex flex-col items-center text-center bg-white/50">
            <div className="w-24 h-24 rounded-full border border-dashed border-ink/30 flex items-center justify-center mb-6">
              <span className="font-mono text-xs">?</span>
            </div>
            <h3 className="font-serif text-3xl italic text-ink/40">Kickstarter Exclusive</h3>
            <p className="font-sans text-sm mt-3 text-ink/40">Revealed at the time of the launch.</p>
          </div>
        </div>
      </section>

      {/* THE RAIL SYSTEM */}
      <section className="py-32 bg-[#F3F1EA] border-t border-ink/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="reveal-trigger">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">
                The Rail System
              </span>
              <h3 className="font-serif text-5xl md:text-6xl leading-tight">
                Everything at hand.
              </h3>
            </div>

            <div className="w-full aspect-[21/9] relative bg-black/5 mb-12">
              <Image
                src="/photos/close-up-rail-scene.jpg"
                alt="Magnetic Rail System"
                fill
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-ink/10 pt-8">
              <div>
                <h4 className="font-serif text-2xl mb-2">Magnetic Click</h4>
                <p className="font-sans text-sm text-ink/60 leading-relaxed">
                  Accessories snap into place instantly with industrial strength magnets. No screws required.
                </p>
              </div>
              <div>
                <h4 className="font-serif text-2xl mb-2">360° Modular</h4>
                <p className="font-sans text-sm text-ink/60 leading-relaxed">
                  Attach cup holders and bins anywhere along the inner or outer rail perimeter.
                </p>
              </div>
              <div>
                <h4 className="font-serif text-2xl mb-2">Solid Wood</h4>
                <p className="font-sans text-sm text-ink/60 leading-relaxed">
                  All accessories are crafted from the same premium hardwoods as your table.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACCESSORIES / ECOSYSTEM */}
      <section className="w-full py-24 px-6 md:px-12 border-b border-black/10 bg-[#F0EFE9]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 border-b border-black/10 pb-6 gap-4">
            <h2 className="font-serif text-5xl md:text-6xl">The Ecosystem.</h2>
            <div className="font-mono text-xs md:text-right">
              <div className="uppercase tracking-widest mb-1">Modular Add-ons</div>
              <div className="opacity-50">STATUS: IN DEVELOPMENT</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10">
            <div className="bg-paper p-12 min-h-[350px] flex flex-col justify-between group hover:bg-white transition-colors relative">
              <div className="absolute top-4 right-4 font-mono text-[10px] border border-black/20 px-1">
                FIG A.1
              </div>
              <div className="w-full flex-grow border border-dashed border-black/20 flex items-center justify-center mb-6 bg-black/5">
                <span className="font-mono text-[10px] animate-pulse">[ SCHEMATIC PENDING ]</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">The Rail System</h3>
                <p className="font-mono text-xs opacity-60">Universal attachment points.</p>
              </div>
            </div>

            <div className="bg-paper p-12 min-h-[350px] flex flex-col justify-between group hover:bg-white transition-colors relative">
              <div className="absolute top-4 right-4 font-mono text-[10px] border border-black/20 px-1">
                FIG A.2
              </div>
              <div className="w-full flex-grow border border-dashed border-black/20 flex items-center justify-center mb-6 bg-black/5">
                <span className="font-mono text-[10px] animate-pulse">[ SCHEMATIC PENDING ]</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">Storage Solutions</h3>
                <p className="font-mono text-xs opacity-60">Integrated component bins.</p>
              </div>
            </div>

            <div className="bg-paper p-12 min-h-[350px] flex flex-col justify-between group hover:bg-white transition-colors relative">
              <div className="absolute top-4 right-4 font-mono text-[10px] border border-black/20 px-1">
                FIG A.3
              </div>
              <div className="w-full flex-grow border border-dashed border-black/20 flex items-center justify-center mb-6 bg-black/5">
                <span className="font-mono text-[10px] animate-pulse">[ SCHEMATIC PENDING ]</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">Game Master Screen</h3>
                <p className="font-mono text-xs opacity-60">Magnetic alignment.</p>
              </div>
            </div>
            <div className="bg-paper p-12 min-h-[350px] flex flex-col justify-between group hover:bg-white transition-colors relative">
              <div className="absolute top-4 right-4 font-mono text-[10px] border border-black/20 px-1">
                FIG A.3
              </div>
              <div className="w-full flex-grow border border-dashed border-black/20 flex items-center justify-center mb-6 bg-black/5">
                <span className="font-mono text-[10px] animate-pulse">[ SCHEMATIC PENDING ]</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">Game Master Screen</h3>
                <p className="font-mono text-xs opacity-60">Magnetic alignment.</p>
              </div>
            </div>
            <div className="bg-paper p-12 min-h-[350px] flex flex-col justify-between group hover:bg-white transition-colors relative">
              <div className="absolute top-4 right-4 font-mono text-[10px] border border-black/20 px-1">
                FIG A.3
              </div>
              <div className="w-full flex-grow border border-dashed border-black/20 flex items-center justify-center mb-6 bg-black/5">
                <span className="font-mono text-[10px] animate-pulse">[ SCHEMATIC PENDING ]</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">Game Master Screen</h3>
                <p className="font-mono text-xs opacity-60">Magnetic alignment.</p>
              </div>
            </div>
            <div className="bg-paper p-12 min-h-[350px] flex flex-col justify-between group hover:bg-white transition-colors relative">
              <div className="absolute top-4 right-4 font-mono text-[10px] border border-black/20 px-1">
                FIG A.3
              </div>
              <div className="w-full flex-grow border border-dashed border-black/20 flex items-center justify-center mb-6 bg-black/5">
                <span className="font-mono text-[10px] animate-pulse">[ SCHEMATIC PENDING ]</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">Game Master Screen</h3>
                <p className="font-mono text-xs opacity-60">Magnetic alignment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      {/* FOOTER */}
      <footer className="bg-black text-paper py-24 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-16">

          {/* Left Side: Brand & CTA */}
          <div className="flex flex-col justify-between items-start">
            <div className="mb-12">
              <h2 className="font-serif text-7xl md:text-9xl mb-6 tracking-tight italic">Arcadian</h2>
              <p className="font-sans text-xl opacity-60 font-light max-w-md">
                Crafting the future of board game furniture.
              </p>
            </div>

            <div className="w-full max-w-md">
              <p className="font-mono text-[10px] uppercase tracking-widest mb-4 opacity-50">Stay Updated</p>
              <form className="flex border-b border-white/20 pb-4 w-full group focus-within:border-white/60 transition-colors">
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  className="bg-transparent w-full font-mono text-sm focus:outline-none placeholder-white/30 text-white"
                />
                <button type="submit" className="font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors">
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Right Side: Links */}
          <div className="flex flex-col justify-between md:items-end">
            <nav className="flex flex-col gap-4 md:text-right">
              <a href="#" className="font-serif text-3xl md:text-4xl hover:text-accent transition-colors hover:italic">Instagram</a>
              <a href="#" className="font-serif text-3xl md:text-4xl hover:text-accent transition-colors hover:italic">TikTok</a>
              <a href="#" className="font-serif text-3xl md:text-4xl hover:text-accent transition-colors hover:italic">Kickstarter</a>
              <a href="#" className="font-serif text-3xl md:text-4xl hover:text-accent transition-colors hover:italic">Logs</a>
              <div className="h-8"></div>
              <a href="#" className="font-serif text-xl md:text-2xl opacity-60 hover:opacity-100 hover:text-accent transition-colors">Terms & Conditions</a>
              <a href="#" className="font-serif text-xl md:text-2xl opacity-60 hover:opacity-100 hover:text-accent transition-colors">Privacy Policy</a>
            </nav>

            <div className="mt-16 font-mono text-[10px] uppercase tracking-widest opacity-30 md:text-right">
              © 2025 Arcadian. All rights reserved.<br />
              Designed & Crafted in Serbia.
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
