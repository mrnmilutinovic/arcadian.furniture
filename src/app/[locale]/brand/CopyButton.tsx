"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

export function CopyButton({
  value,
  label = "Copy",
  className = "",
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      aria-label={`${label}: ${value}`}
      className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors hover:text-accent ${className}`}
      onClick={copy}
      type="button"
    >
      {copied ? "Copied" : label}
      {copied ? (
        <CheckIcon className="size-3" />
      ) : (
        <CopyIcon className="size-3" />
      )}
    </button>
  );
}
