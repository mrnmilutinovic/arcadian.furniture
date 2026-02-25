"use client";

import {
  ArrowUpRightIcon,
  CheckIcon,
  ClipboardIcon,
  EyeIcon,
  MousePointerClickIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Area, AreaChart } from "@/components/charts/area-chart";
import { Grid } from "@/components/charts/grid";
import { XAxis } from "@/components/charts/x-axis";
import type { DailyTraffic, ReferralMetrics } from "@/lib/posthog-analytics";

interface OverviewContentProps {
  contactName: string;
  companyName: string;
  referralLinks: { code: string; label: string }[];
  metrics: ReferralMetrics;
  dailyTraffic: DailyTraffic[];
}

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

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#d4c4a8]/15 text-[#d4c4a8]/60 transition-all hover:border-[#d4c4a8]/30 hover:text-[#d4c4a8]"
      onClick={handleCopy}
      type="button"
    >
      {copied ? (
        <CheckIcon className="size-3.5" />
      ) : (
        <ClipboardIcon className="size-3.5" />
      )}
    </button>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  index,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  index: number;
}) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-5"
      custom={index + 2}
      initial="hidden"
      animate="show"
      variants={fadeUp}
    >
      {/* Subtle warm gradient on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#5d4e3c]/0 to-[#5d4e3c]/0 transition-all duration-500 group-hover:from-[#5d4e3c]/5 group-hover:to-transparent" />
      <div className="relative">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.12em] text-[#d4c4a8]/40">
            {label}
          </span>
          <Icon className="size-4 text-[#d4c4a8]/20" />
        </div>
        <div className="font-serif text-3xl tracking-tight text-[#f3f1ea]">
          {value}
        </div>
      </div>
    </motion.div>
  );
}

export function OverviewContent({
  contactName,
  referralLinks,
  metrics,
  dailyTraffic,
}: OverviewContentProps) {
  const chartData = dailyTraffic.map((d) => ({
    date: d.date,
    pageViews: d.pageViews,
    visitors: d.uniqueVisitors,
  }));

  const firstName = contactName.split(" ")[0];

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Hero greeting with ambient product image */}
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-[#1a1918]"
        custom={0}
        initial="hidden"
        animate="show"
        variants={fadeUp}
      >
        <div className="absolute inset-0">
          <Image
            src="/photos/covered-scene-2.jpeg"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1918] via-[#1a1918]/80 to-transparent" />
        </div>
        <div className="relative px-8 py-10 md:px-12 md:py-14">
          <motion.p
            animate={{ opacity: 1 }}
            className="mb-1 text-[11px] uppercase tracking-[0.2em] text-[#d4c4a8]/50"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            Partner Dashboard
          </motion.p>
          <h1 className="font-serif text-3xl tracking-wide text-[#f3f1ea] md:text-4xl">
            Welcome back, {firstName}
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[#d4c4a8]/50">
            Here&apos;s your referral performance over the last 30 days.
          </p>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Page Views"
          value={metrics.pageViews.toLocaleString()}
          icon={EyeIcon}
          index={0}
        />
        <StatCard
          label="Unique Visitors"
          value={metrics.uniqueVisitors.toLocaleString()}
          icon={UsersIcon}
          index={1}
        />
        <StatCard
          label="Orders"
          value={metrics.orders.toLocaleString()}
          icon={ShoppingBagIcon}
          index={2}
        />
        <StatCard
          label="Conversion"
          value={`${metrics.conversionRate.toFixed(1)}%`}
          icon={MousePointerClickIcon}
          index={3}
        />
      </div>

      {/* Referral links */}
      <motion.div
        className="rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-6"
        custom={6}
        initial="hidden"
        animate="show"
        variants={fadeUp}
      >
        <div className="mb-5">
          <h2 className="font-serif text-lg text-[#f3f1ea]">
            Your Referral Links
          </h2>
          <p className="mt-0.5 text-xs text-[#d4c4a8]/40">
            Share these to track conversions back to you
          </p>
        </div>
        <div className="space-y-3">
          {referralLinks.map((link) => {
            const url = `https://www.arcadiantables.com/?ref=${link.code}`;
            return (
              <div
                className="flex items-center gap-3 rounded-lg border border-[#d4c4a8]/8 bg-[#d4c4a8]/[0.03] px-4 py-3"
                key={link.code}
              >
                <span className="shrink-0 rounded bg-[#5d4e3c]/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#d4c4a8]/70">
                  {link.label}
                </span>
                <code className="min-w-0 flex-1 truncate font-mono text-xs text-[#d4c4a8]/40">
                  {url}
                </code>
                <CopyButton text={url} />
                <a
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#d4c4a8]/15 text-[#d4c4a8]/60 transition-all hover:border-[#d4c4a8]/30 hover:text-[#d4c4a8]"
                  href={url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ArrowUpRightIcon className="size-3.5" />
                </a>
              </div>
            );
          })}
          {referralLinks.length === 0 && (
            <p className="py-4 text-center text-sm text-[#d4c4a8]/30">
              No referral links assigned yet. Contact your Arcadian
              representative.
            </p>
          )}
        </div>
      </motion.div>

      {/* Traffic chart */}
      {chartData.length > 1 && (
        <motion.div
          className="rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-6"
          custom={7}
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <div className="mb-5">
            <h2 className="font-serif text-lg text-[#f3f1ea]">Traffic Trend</h2>
            <p className="mt-0.5 text-xs text-[#d4c4a8]/40">
              Page views and unique visitors over the last 30 days
            </p>
          </div>
          <AreaChart data={chartData} xDataKey="date" aspectRatio="3 / 1">
            <Grid />
            <XAxis />
            <Area
              dataKey="pageViews"
              fill="var(--chart-1)"
              stroke="var(--chart-1)"
            />
            <Area
              dataKey="visitors"
              fill="var(--chart-2)"
              stroke="var(--chart-2)"
            />
          </AreaChart>
        </motion.div>
      )}
    </div>
  );
}
