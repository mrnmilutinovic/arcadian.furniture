"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { type SubscribeState, subscribeToUpdates } from "../actions/subscribe";

const initialState: SubscribeState = { success: false, message: "" };

export function Hero() {
  const [heroState, heroAction, heroPending] = useActionState(
    subscribeToUpdates,
    initialState,
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="hero-section relative w-full min-h-[100dvh] overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <Image
          src="/graphics/tryout.jpg"
          alt="Arcadian gaming table with puzzle"
          fill
          sizes="100vw"
          className={`object-cover object-center transition-all duration-[1.5s] ease-out ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          priority
        />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 pb-6 md:p-12 lg:p-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 md:gap-12">
          {/* Headline */}
          <h1
            className={`text-[#ffffff] leading-[50px] md:leading-[80px] font-staatliches-baskerville text-6xl md:text-7xl lg:text-8xl tracking-[-0.01em] max-w-[700px] transition-all duration-1000 ease-out [text-shadow:0_8px_24px_rgba(0,0,0,0.25),0_4px_8px_rgba(0,0,0,0.05)] ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Board gaming nights{" "}
            <span className="font-ruthie text-[100px] sm:text-[110px] md:text-[190px]">
              deserve more
            </span>{" "}
            than a kitchen table
          </h1>

          {/* CTA - Dark Brutalist Block */}
          <div
            className={`transition-all duration-1000 delay-200 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-[#1a1918] text-white p-6 md:p-10 relative overflow-hidden w-full md:min-w-[400px] lg:w-auto">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10" />

              {/* Top section - Kickstarter branding */}
              <div className="relative z-10 mb-6 md:mb-8">
                <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/50 mb-2 md:mb-3">
                  Coming to
                </p>
                <Image
                  src="/kickstarter-logo-white.avif"
                  alt="Kickstarter"
                  width={160}
                  height={36}
                  className="h-6 md:h-8 w-auto mb-3 md:mb-4"
                />
                <p className="font-staatliches-baskerville text-3xl md:text-5xl tracking-tight">
                  MARCH 2026
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-white/20 mb-6 md:mb-8" />

              {/* Form section */}
              <form action={heroAction} className="relative z-10">
                <input type="hidden" name="source" value="hero" />

                <p className="font-sans text-xs md:text-sm text-white/70 mb-3 md:mb-4">
                  Be first to know when we launch.
                </p>

                <div className="flex flex-col gap-2 md:gap-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    className="w-full bg-white/10 border border-white/20 text-white font-sans text-sm md:text-base px-4 py-3 placeholder:text-white/40 focus:outline-none focus:bg-white/15 focus:border-white/40 transition-all"
                    disabled={heroPending}
                  />

                  <button
                    type="submit"
                    disabled={heroPending}
                    className="w-full bg-white text-[#1a1918] font-sans text-xs md:text-sm uppercase tracking-[0.15em] font-semibold py-3 md:py-4 hover:bg-white/90 transition-colors disabled:opacity-50"
                  >
                    {heroPending ? "Subscribing..." : "Notify Me"}
                  </button>
                </div>

                {heroState.message && (
                  <p
                    className={`font-sans text-xs md:text-sm mt-3 md:mt-4 ${heroState.success ? "text-green-400" : "text-red-400"}`}
                  >
                    {heroState.message}
                  </p>
                )}
              </form>

              {/* Bottom decorative element */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
