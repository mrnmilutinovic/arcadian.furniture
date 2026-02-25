"use client";

import { useSearchParams } from "next/navigation";
import { createNavigation } from "next-intl/navigation";
import type { ComponentProps } from "react";
import { routing } from "./routing";

const nav = createNavigation(routing);

export const { redirect, usePathname, useRouter, getPathname } = nav;

const BaseLink = nav.Link;

type LinkProps = ComponentProps<typeof BaseLink>;

export function Link(props: LinkProps) {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  if (ref && typeof props.href === "string") {
    const separator = props.href.includes("?") ? "&" : "?";
    const href =
      `${props.href}${separator}ref=${encodeURIComponent(ref)}` as typeof props.href;
    return <BaseLink {...props} href={href} />;
  }

  return <BaseLink {...props} />;
}
