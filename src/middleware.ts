import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country");

  if (country === "RS") {
    const { pathname } = request.nextUrl;
    const hasLocalePrefix = pathname.startsWith("/sr");
    const hasLocaleCookie = request.cookies.has("NEXT_LOCALE");

    if (!hasLocalePrefix && !hasLocaleCookie) {
      request.headers.set("accept-language", "sr");
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
