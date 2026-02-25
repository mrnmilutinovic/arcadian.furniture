"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message ?? "Invalid credentials");
        setLoading(false);
        return;
      }

      const isPartnerHost = [
        "partner.arcadiantables.com",
        "partner.localhost",
      ].some((h) => window.location.hostname.startsWith(h));
      router.push(isPartnerHost ? "/" : "/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="relative z-20 w-full max-w-[400px] px-6"
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Brand mark */}
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
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            type="email"
            value={email}
          />
        </div>
        <div>
          <label
            className="mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-[#d4c4a8]/50"
            htmlFor="password"
          >
            Password
          </label>
          <input
            autoComplete="current-password"
            className="w-full border-0 border-b border-[#d4c4a8]/20 bg-transparent px-0 py-2.5 text-sm text-[#f3f1ea] placeholder:text-[#d4c4a8]/25 focus:border-[#d4c4a8]/50 focus:outline-none focus:ring-0 transition-colors"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            type="password"
            value={password}
          />
        </div>

        {error && (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-[#cd4631]"
            initial={{ opacity: 0, y: -4 }}
          >
            {error}
          </motion.p>
        )}

        <button
          className="mt-2 w-full bg-[#d4c4a8] py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#1a1918] transition-all hover:bg-[#f3f1ea] disabled:opacity-40"
          disabled={loading}
          type="submit"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-10 text-center text-[10px] text-[#d4c4a8]/25">
        Invite-only access. Contact your Arcadian representative.
      </p>
    </motion.div>
  );
}
