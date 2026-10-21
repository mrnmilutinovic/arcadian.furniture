"use client";

import { MegaphoneIcon } from "lucide-react";
import { motion } from "motion/react";
import { voiceTraits } from "@/lib/brand";

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


export default function BrandVoicePage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <motion.div custom={0} initial="hidden" animate="show" variants={fadeUp}>
        <h1 className="font-serif text-3xl tracking-wide text-[#f3f1ea]">
          Brand Voice
        </h1>
        <p className="mt-1 text-sm text-[#d4c4a8]/40">
          How Arcadian sounds — tone, personality, and messaging guidelines.
        </p>
      </motion.div>

      {/* Voice Traits */}
      <div className="space-y-4">
        {voiceTraits.map((item, i) => (
          <motion.div
            className="w-full rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-6"
            custom={i + 1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            key={item.trait}
          >
            <div className="mb-4 flex items-center gap-2">
              <MegaphoneIcon className="size-4 text-[#d4c4a8]/30" />
              <h2 className="font-serif text-lg text-[#f3f1ea]">
                {item.trait}
              </h2>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-[#f3f1ea]/60">
              {item.description}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
                <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.15em] text-emerald-400/70">
                  Do
                </span>
                <p className="text-sm italic text-[#f3f1ea]/50">
                  &ldquo;{item.do}&rdquo;
                </p>
              </div>
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
                <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.15em] text-red-400/70">
                  Don&apos;t
                </span>
                <p className="text-sm italic text-[#f3f1ea]/50">
                  &ldquo;{item.dont}&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
