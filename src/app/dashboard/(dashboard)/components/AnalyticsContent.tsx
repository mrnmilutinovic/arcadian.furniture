"use client";

import {
  EyeIcon,
  MousePointerClickIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { Area, AreaChart } from "@/components/charts/area-chart";
import { Bar } from "@/components/charts/bar";
import { BarChart } from "@/components/charts/bar-chart";
import { BarXAxis } from "@/components/charts/bar-x-axis";
import { Grid } from "@/components/charts/grid";
import { XAxis } from "@/components/charts/x-axis";
import type { DailyTraffic, ReferralMetrics } from "@/lib/posthog-analytics";

interface AnalyticsContentProps {
  referralLinks: { code: string; label: string }[];
  codeMetrics: Record<string, ReferralMetrics>;
  refLabels: Record<string, string>;
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

export function AnalyticsContent({
  referralLinks,
  codeMetrics,
  dailyTraffic,
}: AnalyticsContentProps) {
  const totals = Object.values(codeMetrics).reduce(
    (acc, m) => ({
      pageViews: acc.pageViews + m.pageViews,
      uniqueVisitors: acc.uniqueVisitors + m.uniqueVisitors,
      orders: acc.orders + m.orders,
    }),
    { pageViews: 0, uniqueVisitors: 0, orders: 0 },
  );
  const totalConversion =
    totals.uniqueVisitors > 0
      ? (totals.orders / totals.uniqueVisitors) * 100
      : 0;

  const barData = referralLinks.map((link) => ({
    name: link.label,
    pageViews: codeMetrics[link.code]?.pageViews ?? 0,
    orders: codeMetrics[link.code]?.orders ?? 0,
  }));

  const areaData = dailyTraffic.map((d) => ({
    date: d.date,
    pageViews: d.pageViews,
    visitors: d.uniqueVisitors,
  }));

  const stats = [
    {
      label: "Total Page Views",
      value: totals.pageViews.toLocaleString(),
      icon: EyeIcon,
    },
    {
      label: "Unique Visitors",
      value: totals.uniqueVisitors.toLocaleString(),
      icon: UsersIcon,
    },
    {
      label: "Total Orders",
      value: totals.orders.toLocaleString(),
      icon: ShoppingBagIcon,
    },
    {
      label: "Conversion Rate",
      value: `${totalConversion.toFixed(1)}%`,
      icon: MousePointerClickIcon,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div custom={0} initial="hidden" animate="show" variants={fadeUp}>
        <h1 className="font-serif text-3xl tracking-wide text-[#f3f1ea]">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-[#d4c4a8]/40">
          Detailed performance breakdown across all referral codes — last 30
          days
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            className="group relative overflow-hidden rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-5"
            custom={i + 1}
            initial="hidden"
            animate="show"
            key={stat.label}
            variants={fadeUp}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#5d4e3c]/0 to-[#5d4e3c]/0 transition-all duration-500 group-hover:from-[#5d4e3c]/5 group-hover:to-transparent" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.12em] text-[#d4c4a8]/40">
                  {stat.label}
                </span>
                <stat.icon className="size-4 text-[#d4c4a8]/20" />
              </div>
              <div className="font-serif text-3xl tracking-tight text-[#f3f1ea]">
                {stat.value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Per-code breakdown */}
      <motion.div
        className="rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-4 sm:p-6"
        custom={5}
        initial="hidden"
        animate="show"
        variants={fadeUp}
      >
        <div className="mb-5">
          <h2 className="font-serif text-lg text-[#f3f1ea]">
            Per-Code Breakdown
          </h2>
          <p className="mt-0.5 text-xs text-[#d4c4a8]/40">
            Performance for each referral code
          </p>
        </div>
        <div className="-mx-1 overflow-x-auto px-1 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[680px]">
            <thead>
              <tr className="border-b border-[#d4c4a8]/8">
                <th className="pb-3 text-left text-[11px] uppercase tracking-[0.1em] text-[#d4c4a8]/40 font-normal">
                  Code
                </th>
                <th className="pb-3 text-right text-[11px] uppercase tracking-[0.1em] text-[#d4c4a8]/40 font-normal">
                  Page Views
                </th>
                <th className="pb-3 text-right text-[11px] uppercase tracking-[0.1em] text-[#d4c4a8]/40 font-normal">
                  Visitors
                </th>
                <th className="pb-3 text-right text-[11px] uppercase tracking-[0.1em] text-[#d4c4a8]/40 font-normal">
                  Orders
                </th>
                <th className="pb-3 text-right text-[11px] uppercase tracking-[0.1em] text-[#d4c4a8]/40 font-normal">
                  Conversion
                </th>
              </tr>
            </thead>
            <tbody>
              {referralLinks.map((link) => {
                const m = codeMetrics[link.code] ?? {
                  pageViews: 0,
                  uniqueVisitors: 0,
                  orders: 0,
                  conversionRate: 0,
                };
                return (
                  <tr
                    className="border-b border-[#d4c4a8]/5 transition-colors hover:bg-[#d4c4a8]/[0.03]"
                    key={link.code}
                  >
                    <td className="py-3.5">
                      <span className="rounded bg-[#5d4e3c]/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#d4c4a8]/70">
                        {link.label}
                      </span>
                      <code className="ml-2 font-mono text-[11px] text-[#d4c4a8]/30">
                        {link.code}
                      </code>
                    </td>
                    <td className="py-3.5 text-right font-mono text-sm text-[#f3f1ea]/80">
                      {m.pageViews.toLocaleString()}
                    </td>
                    <td className="py-3.5 text-right font-mono text-sm text-[#f3f1ea]/80">
                      {m.uniqueVisitors.toLocaleString()}
                    </td>
                    <td className="py-3.5 text-right font-mono text-sm text-[#f3f1ea]/80">
                      {m.orders.toLocaleString()}
                    </td>
                    <td className="py-3.5 text-right font-mono text-sm text-[#f3f1ea]/80">
                      {m.conversionRate.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
              {referralLinks.length === 0 && (
                <tr>
                  <td
                    className="py-8 text-center text-sm text-[#d4c4a8]/30"
                    colSpan={5}
                  >
                    No referral codes assigned
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Charts row */}
      <div className="grid gap-4 xl:grid-cols-2">
        {/* Bar chart */}
        {barData.length > 0 && (
          <motion.div
            className="rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-4 sm:p-6"
            custom={6}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <div className="mb-5">
              <h2 className="font-serif text-lg text-[#f3f1ea]">
                Code Comparison
              </h2>
              <p className="mt-0.5 text-xs text-[#d4c4a8]/40">
                Page views and orders per code
              </p>
            </div>
            <BarChart data={barData} xDataKey="name" aspectRatio="2 / 1">
              <Grid />
              <BarXAxis />
              <Bar dataKey="pageViews" fill="var(--chart-1)" />
              <Bar dataKey="orders" fill="var(--chart-2)" />
            </BarChart>
          </motion.div>
        )}

        {/* Area chart */}
        {areaData.length > 1 && (
          <motion.div
            className="rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-4 sm:p-6"
            custom={7}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <div className="mb-5">
              <h2 className="font-serif text-lg text-[#f3f1ea]">
                Traffic Over Time
              </h2>
              <p className="mt-0.5 text-xs text-[#d4c4a8]/40">
                Daily views and visitors for primary code
              </p>
            </div>
            <AreaChart data={areaData} xDataKey="date" aspectRatio="2 / 1">
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
    </div>
  );
}
