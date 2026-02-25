"use client";

import { CheckIcon, ClipboardIcon, PaletteIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const brandColors = [
  { name: "Paper", hex: "#f3f1ea" },
  { name: "Ink", hex: "#1a1918" },
  { name: "Accent", hex: "#cd4631" },
  { name: "Oak", hex: "#5d4e3c" },
  { name: "Wood Light", hex: "#d4c4a8" },
  { name: "Wood Dark", hex: "#5c4033" },
  { name: "Clay", hex: "#e3e0d6" },
];

export default function ColorsPage() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  async function copyHex(hex: string) {
    await navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => {
      setCopiedHex((current) => (current === hex ? null : current));
    }, 1500);
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <motion.div custom={0} initial="hidden" animate="show" variants={fadeUp}>
        <h1 className="font-serif text-3xl tracking-wide text-[#f3f1ea]">
          Colors
        </h1>
        <p className="mt-1 text-sm text-[#d4c4a8]/40">
          The Arcadian color palette — earthy, warm, and timeless.
        </p>
      </motion.div>

      <motion.div
        className="w-full rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-6"
        custom={1}
        initial="hidden"
        animate="show"
        variants={fadeUp}
      >
        <div className="mb-5 flex items-center gap-2">
          <PaletteIcon className="size-4 text-[#d4c4a8]/30" />
          <h2 className="font-serif text-lg text-[#f3f1ea]">Color Palette</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brandColors.map((color) => (
            <div className="group space-y-3" key={color.name}>
              <button
                aria-label={`Copy ${color.hex}`}
                className="relative block aspect-[4/5] w-full overflow-hidden rounded-lg border border-[#d4c4a8]/8 transition-transform duration-300 group-hover:scale-[1.01]"
                onClick={() => copyHex(color.hex)}
                style={{ backgroundColor: color.hex }}
                type="button"
              >
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                  <span className="flex items-center justify-center gap-1 rounded-md border border-white/20 bg-black/45 px-3 py-1.5 font-mono text-xs text-white">
                    {color.hex}
                    {copiedHex === color.hex ? (
                      <CheckIcon className="size-3" />
                    ) : (
                      <ClipboardIcon className="size-3" />
                    )}
                  </span>
                </div>
              </button>
              <div className="text-sm font-medium text-[#f3f1ea]/80">
                {color.name}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
