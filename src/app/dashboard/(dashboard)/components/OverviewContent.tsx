"use client";

import {
  ArrowUpRightIcon,
  CheckIcon,
  ClipboardIcon,
  EyeIcon,
  Loader2Icon,
  MousePointerClickIcon,
  PlusIcon,
  PowerIcon,
  ShoppingBagIcon,
  Trash2Icon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState, useTransition } from "react";
import {
  createReferralLink,
  deleteReferralLink,
  toggleReferralLink,
} from "@/app/dashboard/actions";
import { Area, AreaChart } from "@/components/charts/area-chart";
import { Grid } from "@/components/charts/grid";
import { XAxis } from "@/components/charts/x-axis";
import type { DailyTraffic, ReferralMetrics } from "@/lib/posthog-analytics";

interface ReferralLinkData {
  id: string;
  code: string;
  label: string;
  isActive: boolean;
}

interface OverviewContentProps {
  contactName: string;
  companyName: string;
  referralLinks: ReferralLinkData[];
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

function CreateLinkForm({ onClose }: { onClose: () => void }) {
  const [label, setLabel] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const result = await createReferralLink({
        label,
        code: code || undefined,
      });
      if (result.error) {
        setError(result.error);
      } else {
        onClose();
      }
    });
  }

  return (
    <form
      className="space-y-3 rounded-lg border border-[#d4c4a8]/10 bg-[#d4c4a8]/[0.03] p-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label
          className="mb-1 block text-[11px] uppercase tracking-[0.1em] text-[#d4c4a8]/50"
          htmlFor="link-label"
        >
          Label *
        </label>
        <input
          className="w-full rounded-md border border-[#d4c4a8]/15 bg-[#1a1918] px-3 py-2 font-mono text-xs text-[#f3f1ea] placeholder:text-[#d4c4a8]/25 focus:border-[#d4c4a8]/30 focus:outline-none"
          id="link-label"
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g. Instagram Bio"
          required
          type="text"
          value={label}
        />
      </div>
      <div>
        <label
          className="mb-1 block text-[11px] uppercase tracking-[0.1em] text-[#d4c4a8]/50"
          htmlFor="link-code"
        >
          Code (optional)
        </label>
        <input
          className="w-full rounded-md border border-[#d4c4a8]/15 bg-[#1a1918] px-3 py-2 font-mono text-xs text-[#f3f1ea] placeholder:text-[#d4c4a8]/25 focus:border-[#d4c4a8]/30 focus:outline-none"
          id="link-code"
          onChange={(e) => setCode(e.target.value.toLowerCase())}
          pattern="[a-z0-9-]*"
          placeholder="auto-generated if empty"
          type="text"
          value={code}
        />
        {code && (
          <p className="mt-1.5 truncate font-mono text-[10px] text-[#d4c4a8]/30">
            https://www.arcadiantables.com/?ref={code}
          </p>
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      <div className="flex items-center gap-2 pt-1">
        <button
          className="flex items-center gap-1.5 rounded-md bg-[#5d4e3c]/50 px-3 py-1.5 text-xs font-medium text-[#f3f1ea] transition-colors hover:bg-[#5d4e3c]/70 disabled:opacity-50"
          disabled={isPending}
          type="submit"
        >
          {isPending && <Loader2Icon className="size-3 animate-spin" />}
          Create
        </button>
        <button
          className="rounded-md px-3 py-1.5 text-xs text-[#d4c4a8]/50 transition-colors hover:text-[#d4c4a8]"
          disabled={isPending}
          onClick={onClose}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function LinkRow({ link }: { link: ReferralLinkData }) {
  const url = `https://www.arcadiantables.com/?ref=${link.code}`;
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleToggle() {
    setError("");
    startTransition(async () => {
      const result = await toggleReferralLink(link.id);
      if (result.error) setError(result.error);
    });
  }

  function handleDelete() {
    setError("");
    startTransition(async () => {
      const result = await deleteReferralLink(link.id);
      if (result.error) {
        setError(result.error);
        setConfirmDelete(false);
      }
    });
  }

  return (
    <div
      className={`flex flex-col gap-2 rounded-lg border border-[#d4c4a8]/8 bg-[#d4c4a8]/[0.03] px-4 py-3 transition-opacity ${
        !link.isActive ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="shrink-0 rounded bg-[#5d4e3c]/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#d4c4a8]/70">
          {link.label}
        </span>
        {!link.isActive && (
          <span className="shrink-0 rounded bg-[#d4c4a8]/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-[#d4c4a8]/40">
            Inactive
          </span>
        )}
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
        <button
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-all disabled:opacity-50 ${
            link.isActive
              ? "border-[#d4c4a8]/15 text-[#d4c4a8]/60 hover:border-[#d4c4a8]/30 hover:text-[#d4c4a8]"
              : "border-[#d4c4a8]/15 text-[#d4c4a8]/30 hover:border-[#d4c4a8]/30 hover:text-[#d4c4a8]"
          }`}
          disabled={isPending}
          onClick={handleToggle}
          title={link.isActive ? "Deactivate" : "Activate"}
          type="button"
        >
          <PowerIcon className="size-3.5" />
        </button>
        {confirmDelete ? (
          <div className="flex items-center gap-1">
            <button
              className="flex h-8 items-center gap-1 rounded-md border border-red-500/30 px-2 text-[10px] font-medium text-red-400 transition-all hover:bg-red-500/10 disabled:opacity-50"
              disabled={isPending}
              onClick={handleDelete}
              type="button"
            >
              {isPending ? (
                <Loader2Icon className="size-3 animate-spin" />
              ) : (
                "Delete"
              )}
            </button>
            <button
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#d4c4a8]/40 hover:text-[#d4c4a8]"
              disabled={isPending}
              onClick={() => setConfirmDelete(false)}
              type="button"
            >
              <XIcon className="size-3.5" />
            </button>
          </div>
        ) : (
          <button
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#d4c4a8]/15 text-[#d4c4a8]/60 transition-all hover:border-red-500/30 hover:text-red-400"
            onClick={() => setConfirmDelete(true)}
            title="Delete"
            type="button"
          >
            <Trash2Icon className="size-3.5" />
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function OverviewContent({
  contactName,
  referralLinks,
  metrics,
  dailyTraffic,
}: OverviewContentProps) {
  const [showForm, setShowForm] = useState(false);
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
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="font-serif text-lg text-[#f3f1ea]">
              Your Referral Links
            </h2>
            <p className="mt-0.5 text-xs text-[#d4c4a8]/40">
              Share these to track conversions back to you
            </p>
          </div>
          {!showForm && (
            <button
              className="flex items-center gap-1.5 rounded-md border border-[#d4c4a8]/15 px-3 py-1.5 text-xs text-[#d4c4a8]/60 transition-all hover:border-[#d4c4a8]/30 hover:text-[#d4c4a8]"
              onClick={() => setShowForm(true)}
              type="button"
            >
              <PlusIcon className="size-3.5" />
              New Link
            </button>
          )}
        </div>

        <div className="space-y-3">
          {showForm && <CreateLinkForm onClose={() => setShowForm(false)} />}

          {referralLinks.map((link) => (
            <LinkRow key={link.id} link={link} />
          ))}

          {referralLinks.length === 0 && !showForm && (
            <p className="py-4 text-center text-sm text-[#d4c4a8]/30">
              No referral links yet. Click &quot;New Link&quot; to create one.
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
