"use client";

import { ExternalLinkIcon, TypeIcon } from "lucide-react";
import { motion } from "motion/react";

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

export default function FontsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <motion.div custom={0} initial="hidden" animate="show" variants={fadeUp}>
        <h1 className="font-serif text-3xl tracking-wide text-[#f3f1ea]">
          Fonts
        </h1>
        <p className="mt-1 text-sm text-[#d4c4a8]/40">
          Typography system — the typefaces that define Arcadian.
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
          <TypeIcon className="size-4 text-[#d4c4a8]/30" />
          <h2 className="font-serif text-lg text-[#f3f1ea]">Typography</h2>
        </div>
        <div className="space-y-6">
          <div className="flex items-baseline gap-6 border-b border-[#d4c4a8]/5 pb-6">
            <span className="w-20 shrink-0 text-[10px] uppercase tracking-[0.15em] text-[#d4c4a8]/40">
              Headlines
            </span>
            <div className="w-full">
              <div className="flex items-center justify-between gap-4">
                <p className="font-serif text-2xl text-[#f3f1ea]">
                  Cormorant Garamond
                </p>
                <a
                  className="inline-flex items-center gap-1 text-xs text-[#d4c4a8]/60 underline decoration-[#d4c4a8]/30 underline-offset-4 transition-colors hover:text-[#d4c4a8]"
                  href="https://fonts.google.com/specimen/Cormorant+Garamond"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Open on Google Fonts
                  <ExternalLinkIcon className="size-3" />
                </a>
              </div>
              <p className="mt-0.5 text-xs text-[#d4c4a8]/30">
                Elegant serif for headlines and display text
              </p>
            </div>
          </div>
          <div className="flex items-baseline gap-6 border-b border-[#d4c4a8]/5 pb-6">
            <span className="w-20 shrink-0 text-[10px] uppercase tracking-[0.15em] text-[#d4c4a8]/40">
              Body
            </span>
            <div className="w-full">
              <div className="flex items-center justify-between gap-4">
                <p className="font-sans text-xl text-[#f3f1ea]">Manrope</p>
                <a
                  className="inline-flex items-center gap-1 text-xs text-[#d4c4a8]/60 underline decoration-[#d4c4a8]/30 underline-offset-4 transition-colors hover:text-[#d4c4a8]"
                  href="https://fonts.google.com/specimen/Manrope"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Open on Google Fonts
                  <ExternalLinkIcon className="size-3" />
                </a>
              </div>
              <p className="mt-0.5 text-xs text-[#d4c4a8]/30">
                Clean geometric sans-serif for body copy
              </p>
            </div>
          </div>
          <div className="flex items-baseline gap-6 border-b border-[#d4c4a8]/5 pb-6">
            <span className="w-20 shrink-0 text-[10px] uppercase tracking-[0.15em] text-[#d4c4a8]/40">
              Accent
            </span>
            <div className="w-full">
              <div className="flex items-center justify-between gap-4">
                <p className="font-brush text-2xl text-[#f3f1ea]">Caveat</p>
                <a
                  className="inline-flex items-center gap-1 text-xs text-[#d4c4a8]/60 underline decoration-[#d4c4a8]/30 underline-offset-4 transition-colors hover:text-[#d4c4a8]"
                  href="https://fonts.google.com/specimen/Caveat"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Open on Google Fonts
                  <ExternalLinkIcon className="size-3" />
                </a>
              </div>
              <p className="mt-0.5 text-xs text-[#d4c4a8]/30">
                Handwritten brush for personality touches
              </p>
            </div>
          </div>
          <div className="flex items-baseline gap-6">
            <span className="w-20 shrink-0 text-[10px] uppercase tracking-[0.15em] text-[#d4c4a8]/40">
              Logo
            </span>
            <div className="w-full">
              <div className="flex items-center justify-between gap-4">
                <p
                  className="text-2xl text-[#f3f1ea]"
                  style={{ fontFamily: "Staatliches, sans-serif" }}
                >
                  Staatliches
                </p>
                <a
                  className="inline-flex items-center gap-1 text-xs text-[#d4c4a8]/60 underline decoration-[#d4c4a8]/30 underline-offset-4 transition-colors hover:text-[#d4c4a8]"
                  href="https://fonts.google.com/specimen/Staatliches"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Open on Google Fonts
                  <ExternalLinkIcon className="size-3" />
                </a>
              </div>
              <p className="mt-0.5 text-xs text-[#d4c4a8]/30">
                Strong display font for logo lockups and brand marks
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
