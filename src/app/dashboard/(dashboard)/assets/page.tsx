"use client";

import {
  ArrowDownToLineIcon,
  CheckIcon,
  ClipboardIcon,
  PaletteIcon,
  QuoteIcon,
  TypeIcon,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
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
  { name: "Paper", hex: "#f3f1ea", dark: true },
  { name: "Ink", hex: "#1a1918", dark: false },
  { name: "Accent", hex: "#cd4631", dark: false },
  { name: "Oak", hex: "#5d4e3c", dark: false },
  { name: "Wood Light", hex: "#d4c4a8", dark: true },
  { name: "Wood Dark", hex: "#5c4033", dark: false },
  { name: "Clay", hex: "#e3e0d6", dark: true },
];

const productPhotos = [
  { src: "/photos/covered-scene.jpeg", label: "Dining Mode" },
  { src: "/photos/uncovering-scene.jpeg", label: "Revealing" },
  { src: "/photos/arcadian-gaming-3.jpeg", label: "Gaming Setup" },
  { src: "/photos/close-up-1.jpeg", label: "Wood Detail" },
  { src: "/photos/close-up-2.jpeg", label: "Corner Detail" },
  { src: "/photos/dining-scene.jpeg", label: "Dining Scene" },
  { src: "/photos/light.jpeg", label: "Arcadian Dawn" },
  { src: "/photos/dark.jpeg", label: "Pan's Shadow" },
];

const talkingPoints = [
  "Arcadian tables are designed for board gamers who want premium furniture that enhances their gaming experience.",
  "Each table features a recessed playing surface, integrated accessories, and a convertible dining top.",
  "Made with sustainably sourced hardwood and hand-finished details.",
  "Launching on Kickstarter — early supporters get exclusive pricing.",
  "Available in multiple wood finishes to match any room aesthetic.",
];

function CopyHex({ hex }: { hex: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <button
      className="flex items-center gap-1 font-mono text-[10px] text-[#d4c4a8]/40 transition-colors hover:text-[#d4c4a8]/70"
      onClick={copy}
      type="button"
    >
      {hex}
      {copied ? (
        <CheckIcon className="size-2.5" />
      ) : (
        <ClipboardIcon className="size-2.5" />
      )}
    </button>
  );
}

export default function AssetsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <motion.div custom={0} initial="hidden" animate="show" variants={fadeUp}>
        <h1 className="font-serif text-3xl tracking-wide text-[#f3f1ea]">
          Brand Assets
        </h1>
        <p className="mt-1 text-sm text-[#d4c4a8]/40">
          Everything you need to represent Arcadian. Download, reference, and
          share.
        </p>
      </motion.div>

      {/* Color Palette */}
      <motion.div
        className="rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-6"
        custom={1}
        initial="hidden"
        animate="show"
        variants={fadeUp}
      >
        <div className="mb-5 flex items-center gap-2">
          <PaletteIcon className="size-4 text-[#d4c4a8]/30" />
          <h2 className="font-serif text-lg text-[#f3f1ea]">Color Palette</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {brandColors.map((color) => (
            <div className="group" key={color.name}>
              <div
                className="mb-2 aspect-[4/3] overflow-hidden rounded-lg border border-[#d4c4a8]/8 transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ backgroundColor: color.hex }}
              />
              <div className="text-xs font-medium text-[#f3f1ea]/70">
                {color.name}
              </div>
              <CopyHex hex={color.hex} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Typography */}
      <motion.div
        className="rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-6"
        custom={2}
        initial="hidden"
        animate="show"
        variants={fadeUp}
      >
        <div className="mb-5 flex items-center gap-2">
          <TypeIcon className="size-4 text-[#d4c4a8]/30" />
          <h2 className="font-serif text-lg text-[#f3f1ea]">Typography</h2>
        </div>
        <div className="space-y-6">
          <div className="flex items-baseline gap-6 border-b border-[#d4c4a8]/5 pb-6">
            <span className="w-20 shrink-0 text-[10px] uppercase tracking-[0.15em] text-[#d4c4a8]/40">
              Headlines
            </span>
            <div>
              <p className="font-serif text-2xl text-[#f3f1ea]">
                Cormorant Garamond
              </p>
              <p className="mt-0.5 text-xs text-[#d4c4a8]/30">
                Elegant serif for headlines and display text
              </p>
            </div>
          </div>
          <div className="flex items-baseline gap-6 border-b border-[#d4c4a8]/5 pb-6">
            <span className="w-20 shrink-0 text-[10px] uppercase tracking-[0.15em] text-[#d4c4a8]/40">
              Body
            </span>
            <div>
              <p className="font-sans text-xl text-[#f3f1ea]">Manrope</p>
              <p className="mt-0.5 text-xs text-[#d4c4a8]/30">
                Clean geometric sans-serif for body copy
              </p>
            </div>
          </div>
          <div className="flex items-baseline gap-6">
            <span className="w-20 shrink-0 text-[10px] uppercase tracking-[0.15em] text-[#d4c4a8]/40">
              Accent
            </span>
            <div>
              <p className="font-brush text-2xl text-[#f3f1ea]">Caveat</p>
              <p className="mt-0.5 text-xs text-[#d4c4a8]/30">
                Handwritten brush for personality touches
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Product Photos */}
      <motion.div
        className="rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-6"
        custom={3}
        initial="hidden"
        animate="show"
        variants={fadeUp}
      >
        <div className="mb-5">
          <h2 className="font-serif text-lg text-[#f3f1ea]">
            Product Photography
          </h2>
          <p className="mt-0.5 text-xs text-[#d4c4a8]/40">
            High-res photos for your promotional materials — right-click to save
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {productPhotos.map((photo) => (
            <a
              className="group relative aspect-[4/3] overflow-hidden rounded-lg"
              href={photo.src}
              key={photo.src}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                alt={photo.label}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                src={photo.src}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-xs font-medium text-white">
                  {photo.label}
                </span>
              </div>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Downloadable Assets */}
      <motion.div
        className="rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-6"
        custom={4}
        initial="hidden"
        animate="show"
        variants={fadeUp}
      >
        <div className="mb-5">
          <h2 className="font-serif text-lg text-[#f3f1ea]">
            Downloadable Files
          </h2>
          <p className="mt-0.5 text-xs text-[#d4c4a8]/40">
            Logos and brand marks for promotional use
          </p>
        </div>
        <a
          className="flex items-center justify-between rounded-lg border border-[#d4c4a8]/8 bg-[#d4c4a8]/[0.03] px-4 py-3 transition-colors hover:bg-[#d4c4a8]/[0.06]"
          download
          href="/icon.svg"
        >
          <div>
            <div className="text-sm font-medium text-[#f3f1ea]/80">
              Logo (SVG)
            </div>
            <div className="text-[11px] text-[#d4c4a8]/30">
              Vector format, scalable
            </div>
          </div>
          <ArrowDownToLineIcon className="size-4 text-[#d4c4a8]/40" />
        </a>
      </motion.div>

      {/* Talking Points */}
      <motion.div
        className="rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-6"
        custom={5}
        initial="hidden"
        animate="show"
        variants={fadeUp}
      >
        <div className="mb-5 flex items-center gap-2">
          <QuoteIcon className="size-4 text-[#d4c4a8]/30" />
          <h2 className="font-serif text-lg text-[#f3f1ea]">Talking Points</h2>
        </div>
        <div className="space-y-4">
          {talkingPoints.map((point, i) => (
            <div className="flex gap-4" key={point}>
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#d4c4a8]/10 font-mono text-[10px] text-[#d4c4a8]/30">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-[#f3f1ea]/60">
                {point}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
