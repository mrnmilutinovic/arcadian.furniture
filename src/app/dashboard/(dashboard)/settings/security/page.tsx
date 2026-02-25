"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SecuritySettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    setLoading(true);
    try {
      const result = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (result?.error) {
        setError(result.error.message ?? "Could not update password.");
        setLoading(false);
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccess("Password updated.");
    } catch {
      setError("Could not update password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <div>
        <h1 className="font-serif text-3xl tracking-wide text-[#f3f1ea]">
          Security
        </h1>
        <p className="mt-1 text-sm text-[#d4c4a8]/40">
          Update your account password.
        </p>
      </div>

      <div className="w-full rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-6">
        <form className="max-w-xl space-y-4" onSubmit={onSubmit}>
          <div>
            <label
              className="mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-[#d4c4a8]/50"
              htmlFor="current-password"
            >
              Current Password
            </label>
            <input
              autoComplete="current-password"
              className="w-full rounded-md border border-[#d4c4a8]/20 bg-[#121110] px-3 py-2 text-sm text-[#f3f1ea] outline-none focus:border-[#d4c4a8]/50"
              id="current-password"
              onChange={(event) => setCurrentPassword(event.target.value)}
              required
              type="password"
              value={currentPassword}
            />
          </div>

          <div>
            <label
              className="mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-[#d4c4a8]/50"
              htmlFor="new-password"
            >
              New Password
            </label>
            <input
              autoComplete="new-password"
              className="w-full rounded-md border border-[#d4c4a8]/20 bg-[#121110] px-3 py-2 text-sm text-[#f3f1ea] outline-none focus:border-[#d4c4a8]/50"
              id="new-password"
              minLength={8}
              onChange={(event) => setNewPassword(event.target.value)}
              required
              type="password"
              value={newPassword}
            />
          </div>

          <div>
            <label
              className="mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-[#d4c4a8]/50"
              htmlFor="confirm-password"
            >
              Confirm New Password
            </label>
            <input
              autoComplete="new-password"
              className="w-full rounded-md border border-[#d4c4a8]/20 bg-[#121110] px-3 py-2 text-sm text-[#f3f1ea] outline-none focus:border-[#d4c4a8]/50"
              id="confirm-password"
              minLength={8}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              type="password"
              value={confirmPassword}
            />
          </div>

          {error ? <p className="text-sm text-[#cd4631]">{error}</p> : null}
          {success ? (
            <p className="text-sm text-emerald-300">{success}</p>
          ) : null}

          <button
            className="rounded-md bg-[#d4c4a8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#1a1918] transition-colors hover:bg-[#f3f1ea] disabled:opacity-50"
            disabled={loading}
            type="submit"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
