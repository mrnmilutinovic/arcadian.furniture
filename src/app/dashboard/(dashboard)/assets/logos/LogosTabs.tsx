"use client";

import { ArrowDownToLineIcon } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

type TabKey = "svg" | "png";
interface LogoFile {
  url: string;
  pathname: string;
}

function getName(pathname: string) {
  const name = pathname.split("/").pop();
  return name ?? pathname;
}

function Section({ files }: { files: LogoFile[] }) {
  if (files.length === 0) {
    return <p className="text-sm text-[#d4c4a8]/40">No files found.</p>;
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {files.map((file) => (
        <div
          className="rounded-lg border border-[#d4c4a8]/8 bg-[#d4c4a8]/[0.03] p-3"
          key={file.pathname}
        >
          <div className="relative mb-3 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md border border-[#d4c4a8]/10 bg-[#0f0f0f] p-4">
            <Image
              alt={getName(file.pathname)}
              className="max-h-full max-w-full object-contain"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              src={file.url}
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="truncate text-sm text-[#f3f1ea]/80">
              {getName(file.pathname)}
            </span>
            <a
              className="inline-flex items-center gap-1 rounded-md border border-[#d4c4a8]/20 px-2.5 py-1.5 text-xs text-[#d4c4a8]/70 transition-colors hover:bg-[#d4c4a8]/10 hover:text-[#d4c4a8]"
              download={getName(file.pathname)}
              href={file.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              Download
              <ArrowDownToLineIcon className="size-3.5" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LogosTabs({
  svgFiles,
  pngFiles,
}: {
  svgFiles: LogoFile[];
  pngFiles: LogoFile[];
}) {
  const [tab, setTab] = useState<TabKey>("svg");

  const currentFiles = useMemo(() => {
    return tab === "svg" ? svgFiles : pngFiles;
  }, [pngFiles, svgFiles, tab]);

  return (
    <div className="space-y-4">
      <div className="inline-flex rounded-lg border border-[#d4c4a8]/15 bg-[#d4c4a8]/[0.02] p-1">
        <button
          className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
            tab === "svg"
              ? "bg-[#d4c4a8]/12 text-[#f3f1ea]"
              : "text-[#d4c4a8]/60 hover:text-[#d4c4a8]"
          }`}
          onClick={() => setTab("svg")}
          type="button"
        >
          SVG
        </button>
        <button
          className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
            tab === "png"
              ? "bg-[#d4c4a8]/12 text-[#f3f1ea]"
              : "text-[#d4c4a8]/60 hover:text-[#d4c4a8]"
          }`}
          onClick={() => setTab("png")}
          type="button"
        >
          PNG
        </button>
      </div>

      <Section files={currentFiles} />
    </div>
  );
}
