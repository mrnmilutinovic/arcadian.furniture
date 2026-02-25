"use client";

import { MegaphoneIcon } from "lucide-react";
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

const voiceTraits = [
  {
    trait: "Warm & Inviting",
    description:
      "Speak like a host welcoming friends to game night — approachable, genuine, never stuffy.",
    do: "Pull up a chair and roll the dice.",
    dont: "Please be seated at our premium gaming station.",
  },
  {
    trait: "Confident, Not Boastful",
    description:
      "Let the craftsmanship speak for itself. State facts; avoid superlatives.",
    do: "Hand-finished European oak, built to last decades.",
    dont: "The absolute best table ever made!!!",
  },
  {
    trait: "Playful with Purpose",
    description:
      "Board gaming is fun — our tone should reflect that while staying grounded in quality.",
    do: "Your next campaign deserves a worthy battleground.",
    dont: "OMG this table is SO epic you guys!!!",
  },
  {
    trait: "Community-First",
    description:
      "We're building something together with our backers and partners, not selling at them.",
    do: "Join the first 500 backers shaping the Arcadian experience.",
    dont: "Buy now before it's too late!",
  },
];

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
