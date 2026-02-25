"use client";

import { QuoteIcon } from "lucide-react";
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

const talkingPoints = [
  "Arcadian tables are designed for board gamers who want premium furniture that enhances their gaming experience.",
  "Each table features a recessed playing surface, integrated accessories, and a convertible dining top.",
  "Made with sustainably sourced hardwood and hand-finished details.",
  "Launching on Kickstarter — early supporters get exclusive pricing.",
  "Available in multiple wood finishes to match any room aesthetic.",
];

export default function TalkingPointsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <motion.div custom={0} initial="hidden" animate="show" variants={fadeUp}>
        <h1 className="font-serif text-3xl tracking-wide text-[#f3f1ea]">
          Talking Points
        </h1>
        <p className="mt-1 text-sm text-[#d4c4a8]/40">
          Key messages for when you talk about Arcadian.
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
          <QuoteIcon className="size-4 text-[#d4c4a8]/30" />
          <h2 className="font-serif text-lg text-[#f3f1ea]">Key Messages</h2>
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
