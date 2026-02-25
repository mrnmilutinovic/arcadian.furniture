"use client";

import {
  BarChart3Icon,
  CameraIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  DownloadIcon,
  ImageIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MegaphoneIcon,
  MessageSquareQuoteIcon,
  PaletteIcon,
  ShieldIcon,
  TypeIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

interface PartnerInfo {
  companyName: string;
  contactName: string;
  email: string;
  referralCodes: { code: string; label: string }[];
}

const PARTNER_HOSTS = ["partner.arcadiantables.com", "partner.localhost"];

function useIsPartnerHost() {
  if (typeof window === "undefined") return false;
  return PARTNER_HOSTS.some((h) => window.location.hostname.startsWith(h));
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavItem[];
}

type NavEntry = NavItem | NavGroup;

function isNavGroup(entry: NavEntry): entry is NavGroup {
  return "items" in entry;
}

function getNavEntries(isPartner: boolean): NavEntry[] {
  const prefix = isPartner ? "" : "/dashboard";
  return [
    {
      href: isPartner ? "/" : "/dashboard",
      label: "Overview",
      icon: LayoutDashboardIcon,
    },
    {
      label: "Brand Assets",
      icon: ImageIcon,
      items: [
        {
          href: `${prefix}/assets/brand-voice`,
          label: "Brand Voice",
          icon: MegaphoneIcon,
        },
        {
          href: `${prefix}/assets/colors`,
          label: "Colors",
          icon: PaletteIcon,
        },
        { href: `${prefix}/assets/fonts`, label: "Fonts", icon: TypeIcon },
        { href: `${prefix}/assets/logos`, label: "Logos", icon: DownloadIcon },
        {
          href: `${prefix}/assets/photography`,
          label: "Photography",
          icon: CameraIcon,
        },
        {
          href: `${prefix}/assets/talking-points`,
          label: "Talking Points",
          icon: MessageSquareQuoteIcon,
        },
      ],
    },
    {
      href: `${prefix}/analytics`,
      label: "Analytics",
      icon: BarChart3Icon,
    },
    {
      href: `${prefix}/settings/security`,
      label: "Security",
      icon: ShieldIcon,
    },
  ];
}

function NavUser({
  partner,
  onSignOut,
}: {
  partner: PartnerInfo;
  onSignOut: () => void;
}) {
  const initials = partner.contactName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg bg-[#5d4e3c] text-xs text-[#f3f1ea]">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {partner.contactName}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {partner.email}
                </span>
              </div>
              <ChevronsUpDownIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-[#5d4e3c] text-xs text-[#f3f1ea]">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {partner.contactName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {partner.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <span className="text-muted-foreground">
                  {partner.companyName}
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSignOut}>
              <LogOutIcon />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function getBreadcrumbs(pathname: string, entries: NavEntry[]) {
  for (const entry of entries) {
    if (isNavGroup(entry)) {
      const sub = entry.items.find((i) => pathname === i.href);
      if (sub) {
        return [entry.label, sub.label];
      }
    } else if (
      pathname === entry.href ||
      (entry.href.endsWith("/") && pathname === entry.href.slice(0, -1))
    ) {
      return entry.label === "Overview" ? [] : [entry.label];
    }
  }
  return [];
}

export function DashboardShell({
  partner,
  children,
}: {
  partner: PartnerInfo;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isPartner = useIsPartnerHost();
  const navEntries = getNavEntries(isPartner);
  const breadcrumbs = getBreadcrumbs(pathname, navEntries);

  async function handleSignOut() {
    await authClient.signOut();
    router.push(isPartner ? "/login" : "/dashboard/login");
    router.refresh();
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href={isPartner ? "/" : "/dashboard"}>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#1a1918]">
                    <span className="font-serif text-sm text-[#d4c4a8]">A</span>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-serif font-medium tracking-wide">
                      Arcadian
                    </span>
                    <span className="truncate text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                      Partner Portal
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navEntries.map((entry) => {
                  if (isNavGroup(entry)) {
                    const isOpen = entry.items.some((i) => pathname === i.href);
                    return (
                      <Collapsible
                        key={entry.label}
                        asChild
                        defaultOpen={isOpen}
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              tooltip={entry.label}
                              isActive={isOpen}
                            >
                              <entry.icon />
                              <span>{entry.label}</span>
                              <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {entry.items.map((sub) => (
                                <SidebarMenuSubItem key={sub.href}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={pathname === sub.href}
                                  >
                                    <Link href={sub.href}>
                                      <sub.icon className="size-3.5" />
                                      <span>{sub.label}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    );
                  }
                  return (
                    <SidebarMenuItem key={entry.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === entry.href}
                        tooltip={entry.label}
                      >
                        <Link href={entry.href}>
                          <entry.icon />
                          <span>{entry.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser partner={partner} onSignOut={handleSignOut} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link href={isPartner ? "/" : "/dashboard"}>Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.map((crumb, i) => (
                  <span key={crumb} className="contents">
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      {i === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage>{crumb}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink className="text-muted-foreground">
                          {crumb}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </span>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
