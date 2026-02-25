import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

const authDebugEnabled = process.env.AUTH_DEBUG_LOGS === "true";
const handlers = toNextJsHandler(auth);

function authDebugLog(event: string, payload: Record<string, unknown>) {
  if (!authDebugEnabled) return;
  console.log(`[auth-debug] ${event}`, payload);
}

function isMagicLinkPath(pathname: string): boolean {
  return pathname.includes("/magic-link");
}

async function handleAuth(
  request: Request,
  method: "GET" | "POST",
): Promise<Response> {
  const url = new URL(request.url);
  const handler = handlers[method];

  if (!handler) {
    return new Response("Method Not Allowed", { status: 405 });
  }

  if (isMagicLinkPath(url.pathname)) {
    authDebugLog("magic_link.request", {
      method,
      pathname: url.pathname,
      host: request.headers.get("host"),
      origin: request.headers.get("origin"),
      forwardedHost: request.headers.get("x-forwarded-host"),
      forwardedProto: request.headers.get("x-forwarded-proto"),
      callbackURL: url.searchParams.get("callbackURL"),
      errorCallbackURL: url.searchParams.get("errorCallbackURL"),
      hasToken: Boolean(url.searchParams.get("token")),
      userAgent: request.headers.get("user-agent"),
    });
  }

  try {
    const response = await handler(request);
    if (isMagicLinkPath(url.pathname)) {
      authDebugLog("magic_link.response", {
        method,
        pathname: url.pathname,
        status: response.status,
        location: response.headers.get("location"),
        setCookie: Boolean(response.headers.get("set-cookie")),
      });
    }
    return response;
  } catch (error) {
    authDebugLog("magic_link.error", {
      method,
      pathname: url.pathname,
      error:
        error instanceof Error ? error.message : "Unknown route handler error",
    });
    throw error;
  }
}

export async function GET(request: Request) {
  return handleAuth(request, "GET");
}

export async function POST(request: Request) {
  return handleAuth(request, "POST");
}
