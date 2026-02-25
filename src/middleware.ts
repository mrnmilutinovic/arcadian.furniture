import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const PARTNER_HOSTS = ["partner.arcadiantables.com", "partner.localhost"];

function isPartnerHost(host: string): boolean {
  return PARTNER_HOSTS.some((h) => host.startsWith(h));
}

function handleDashboardAuth(request: NextRequest): NextResponse {
  const host = request.headers.get("host") || "";
  const onPartnerHost = isPartnerHost(host);
  const { pathname } = request.nextUrl;

  // Normalize: on partner subdomain paths have no /dashboard prefix,
  // on main domain they do. Map to a canonical dashboard-relative path.
  const dashboardPath = pathname.replace(/^\/dashboard/, "") || "/";

  const isLoginPage = dashboardPath === "/login";
  const isAuthApi = pathname.startsWith("/api/auth");

  if (isAuthApi) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);

  // Build redirect URLs respecting the host context
  const loginUrl = onPartnerHost ? "/login" : "/dashboard/login";
  const homeUrl = onPartnerHost ? "/" : "/dashboard";

  if (isLoginPage) {
    if (sessionCookie) {
      return NextResponse.redirect(new URL(homeUrl, request.url));
    }
    // On partner subdomain, rewrite /login → /dashboard/login (internal routing)
    if (onPartnerHost && !pathname.startsWith("/dashboard/")) {
      const url = request.nextUrl.clone();
      url.pathname = `/dashboard${pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  if (!sessionCookie) {
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  // On partner subdomain, rewrite to /dashboard/* for internal routing
  if (onPartnerHost) {
    if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = `/dashboard${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export default function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  // Dashboard routes — auth logic, skip i18n
  if (isPartnerHost(host) || pathname.startsWith("/dashboard")) {
    return handleDashboardAuth(request);
  }

  // Main site — existing i18n logic
  const country = request.headers.get("x-vercel-ip-country");

  if (country === "RS") {
    const hasLocalePrefix = pathname.startsWith("/sr");
    const hasLocaleCookie = request.cookies.has("NEXT_LOCALE");

    if (!hasLocalePrefix && !hasLocaleCookie) {
      request.headers.set("accept-language", "sr");
    }
  }

  const response = intlMiddleware(request);
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|ingest|.*\\..*).*)",
};
