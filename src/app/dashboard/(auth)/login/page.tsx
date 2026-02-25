"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

function getRoleFromSession(session: unknown): string | null {
  if (!session || typeof session !== "object") return null;
  if (!("data" in session)) return null;

  const data = (session as { data?: unknown }).data;
  if (!data || typeof data !== "object") return null;
  if (!("user" in data)) return null;

  const user = (data as { user?: unknown }).user;
  if (!user || typeof user !== "object") return null;
  if (!("role" in user)) return null;

  const role = (user as { role?: unknown }).role;
  return typeof role === "string" ? role : null;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [callbackError, setCallbackError] = useState("");
  const effectiveError = error || callbackError;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authError = params.get("error");

    const message =
      authError === "INVALID_TOKEN"
        ? "This sign-in link is invalid or already used. Request a new one."
        : authError === "EXPIRED_TOKEN"
          ? "This sign-in link has expired. Request a new one."
          : authError
            ? "This sign-in link failed. Request a new one."
            : "";

    setCallbackError(message);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function checkSessionAndRedirect() {
      const session = await authClient.getSession();
      if (!mounted || !session.data) return;

      const role = getRoleFromSession(session);
      const isPartnerHost = [
        "partner.arcadiantables.com",
        "partner.localhost",
      ].some((host) => window.location.hostname.startsWith(host));

      if (!isPartnerHost && role === "super_admin") {
        router.push("/dashboard/admin");
      } else {
        router.push(isPartnerHost ? "/" : "/dashboard");
      }
      router.refresh();
    }

    checkSessionAndRedirect();

    return () => {
      mounted = false;
    };
  }, [router]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setCallbackError("");
    setInfo("");
    setLoading(true);

    try {
      const isPartnerHost = [
        "partner.arcadiantables.com",
        "partner.localhost",
      ].some((host) => window.location.hostname.startsWith(host));

      const callbackURL = isPartnerHost ? "/login" : "/dashboard/login";

      const result = await authClient.signIn.magicLink({
        email,
        callbackURL,
        errorCallbackURL: callbackURL,
      });

      if (result.error) {
        setError(result.error.message ?? "Could not send sign-in link.");
        setLoading(false);
        return;
      }

      setInfo("Magic link sent. Check your inbox.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="relative z-20 w-full max-w-[420px] px-6"
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ opacity: 1 }}
        className="mb-12 text-center"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="mb-3 font-serif text-3xl tracking-wide text-[#d4c4a8]">
          Arcadian
        </div>
        <div className="text-xs uppercase tracking-[0.25em] text-[#d4c4a8]/40">
          Partner Portal
        </div>
      </motion.div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            className="mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-[#d4c4a8]/50"
            htmlFor="email"
          >
            Email
          </label>
          <input
            autoComplete="email"
            className="w-full border-0 border-b border-[#d4c4a8]/20 bg-transparent px-0 py-2.5 text-sm text-[#f3f1ea] placeholder:text-[#d4c4a8]/25 focus:border-[#d4c4a8]/50 focus:outline-none focus:ring-0 transition-colors"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            required
            type="email"
            value={email}
          />
        </div>

        {effectiveError ? (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-[#cd4631]"
            initial={{ opacity: 0, y: -4 }}
          >
            {effectiveError}
          </motion.p>
        ) : null}

        {info ? (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-emerald-300"
            initial={{ opacity: 0, y: -4 }}
          >
            {info}
          </motion.p>
        ) : null}

        <button
          className="mt-2 w-full bg-[#d4c4a8] py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#1a1918] transition-all hover:bg-[#f3f1ea] disabled:opacity-40"
          disabled={loading}
          type="submit"
        >
          {loading ? "Sending link..." : "Send Magic Link"}
        </button>
      </form>

      <p className="mt-10 text-center text-[10px] text-[#d4c4a8]/25">
        Invite-only access. Contact your Arcadian representative.
      </p>
    </motion.div>
  );
}
