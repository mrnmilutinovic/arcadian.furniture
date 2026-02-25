import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isSuperAdminSession } from "@/lib/roles";
import { createPartnerAccount } from "./actions";

function getMessage(
  searchParams: Record<string, string | string[] | undefined>,
) {
  const success = searchParams.success;
  const error = searchParams.error;
  const warning = searchParams.warning;

  const warningMessage =
    warning === "magic-link-not-sent"
      ? "Partner created, but magic link email could not be sent. You can ask them to request a login link on the login page."
      : null;

  return {
    success:
      success === "1" ? "Partner account created. Magic link sent." : null,
    warning: warningMessage,
    error: typeof error === "string" ? error : null,
  };
}

export default async function AdminPartnersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const hdrs = await headers();
  const session = await auth.api.getSession({ headers: hdrs });

  if (!session) {
    redirect("/dashboard/login");
  }

  if (!isSuperAdminSession(session)) {
    redirect("/dashboard");
  }

  const { success, warning, error } = getMessage(await searchParams);

  const partners = await prisma.partner.findMany({
    include: {
      user: { select: { email: true, createdAt: true, role: true } },
      referralLinks: {
        where: { isActive: true },
        orderBy: { createdAt: "asc" },
        select: { code: true, label: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const totalPartners = partners.length;
  const totalActiveLinks = partners.reduce(
    (sum, partner) => sum + partner.referralLinks.length,
    0,
  );

  return (
    <div className="dark min-h-screen bg-[#0e0d0c]">
      <div className="mx-auto w-full max-w-7xl space-y-6 p-6 text-[#f3f1ea]">
        <div className="rounded-2xl border border-[#d4c4a8]/15 bg-gradient-to-br from-[#1f1d1b] to-[#151412] p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#d4c4a8]/45">
                Super Admin Portal
              </p>
              <h1 className="mt-2 font-serif text-4xl tracking-wide">
                Partner Management
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#d4c4a8]/55">
                Create new partner accounts, assign starter referral codes, and
                monitor active partner link inventory.
              </p>
            </div>
            <Link
              className="rounded-md border border-[#d4c4a8]/30 px-3 py-2 text-xs uppercase tracking-[0.15em] text-[#d4c4a8]/80 hover:bg-[#d4c4a8]/10"
              href="/dashboard"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-4">
            <p className="text-[10px] uppercase tracking-[0.16em] text-[#d4c4a8]/45">
              Total Partners
            </p>
            <p className="mt-2 font-serif text-3xl">{totalPartners}</p>
          </div>
          <div className="rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-4">
            <p className="text-[10px] uppercase tracking-[0.16em] text-[#d4c4a8]/45">
              Active Referral Links
            </p>
            <p className="mt-2 font-serif text-3xl">{totalActiveLinks}</p>
          </div>
          <div className="rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-4">
            <p className="text-[10px] uppercase tracking-[0.16em] text-[#d4c4a8]/45">
              Admin Role
            </p>
            <p className="mt-2 font-serif text-2xl">super_admin</p>
          </div>
        </div>

        {success ? (
          <div className="rounded-xl border border-emerald-600/30 bg-emerald-950/35 px-4 py-3 text-sm text-emerald-200">
            {success}
          </div>
        ) : null}
        {error ? (
          <div className="rounded-xl border border-red-700/40 bg-red-950/35 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}
        {warning ? (
          <div className="rounded-xl border border-amber-600/35 bg-amber-950/35 px-4 py-3 text-sm text-amber-200">
            {warning}
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <section className="rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-6">
            <h2 className="font-serif text-2xl">Create New Partner</h2>
            <p className="mt-1 text-xs text-[#d4c4a8]/45">
              This creates auth user + partner profile + primary referral link.
              Partners sign in via magic link email.
            </p>

            <form action={createPartnerAccount} className="mt-5 space-y-4">
              <div>
                <label
                  className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-[#d4c4a8]/55"
                  htmlFor="email"
                >
                  Partner Email
                </label>
                <input
                  className="w-full rounded-md border border-[#d4c4a8]/20 bg-[#121110] px-3 py-2 text-sm outline-none transition-colors focus:border-[#d4c4a8]/45"
                  id="email"
                  name="email"
                  placeholder="partner@company.com"
                  required
                  type="email"
                />
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label
                    className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-[#d4c4a8]/55"
                    htmlFor="companyName"
                  >
                    Company Name
                  </label>
                  <input
                    className="w-full rounded-md border border-[#d4c4a8]/20 bg-[#121110] px-3 py-2 text-sm outline-none transition-colors focus:border-[#d4c4a8]/45"
                    id="companyName"
                    name="companyName"
                    placeholder="Arcadian Partner LLC"
                    required
                    type="text"
                  />
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-[#d4c4a8]/55"
                    htmlFor="contactName"
                  >
                    Contact Name
                  </label>
                  <input
                    className="w-full rounded-md border border-[#d4c4a8]/20 bg-[#121110] px-3 py-2 text-sm outline-none transition-colors focus:border-[#d4c4a8]/45"
                    id="contactName"
                    name="contactName"
                    placeholder="Jane Smith"
                    required
                    type="text"
                  />
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label
                    className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-[#d4c4a8]/55"
                    htmlFor="refCode"
                  >
                    Primary Referral Code
                  </label>
                  <input
                    className="w-full rounded-md border border-[#d4c4a8]/20 bg-[#121110] px-3 py-2 text-sm lowercase outline-none transition-colors focus:border-[#d4c4a8]/45"
                    id="refCode"
                    name="refCode"
                    placeholder="acme-partner"
                    required
                    type="text"
                  />
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-[#d4c4a8]/55"
                    htmlFor="refLabel"
                  >
                    Link Label
                  </label>
                  <input
                    className="w-full rounded-md border border-[#d4c4a8]/20 bg-[#121110] px-3 py-2 text-sm outline-none transition-colors focus:border-[#d4c4a8]/45"
                    defaultValue="Primary"
                    id="refLabel"
                    name="refLabel"
                    placeholder="Primary"
                    type="text"
                  />
                </div>
              </div>

              <button
                className="w-full rounded-md bg-[#d4c4a8] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#1a1918] transition-colors hover:bg-[#f3f1ea]"
                type="submit"
              >
                Create Partner
              </button>
            </form>
          </section>

          <section className="rounded-xl border border-[#d4c4a8]/10 bg-[#1a1918] p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-serif text-2xl">Existing Partners</h2>
              <span className="rounded-md border border-[#d4c4a8]/20 px-2.5 py-1 text-xs text-[#d4c4a8]/65">
                {partners.length} records
              </span>
            </div>

            {partners.length === 0 ? (
              <p className="text-sm text-[#d4c4a8]/45">No partners yet.</p>
            ) : (
              <div className="space-y-3">
                {partners.map((partner) => (
                  <div
                    className="rounded-xl border border-[#d4c4a8]/10 bg-[#121110] px-4 py-3"
                    key={partner.id}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">
                          {partner.companyName}
                        </p>
                        <p className="text-xs text-[#d4c4a8]/45">
                          {partner.contactName} · {partner.user.email}
                        </p>
                        <p className="mt-1 inline-flex rounded-sm bg-[#d4c4a8]/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[#d4c4a8]/65">
                          {partner.user.role}
                        </p>
                      </div>
                      <p className="text-xs text-[#d4c4a8]/35">
                        Joined {partner.createdAt.toLocaleDateString()}
                      </p>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {partner.referralLinks.length === 0 ? (
                        <span className="text-xs text-[#d4c4a8]/35">
                          No active referral links
                        </span>
                      ) : (
                        partner.referralLinks.map((link) => (
                          <span
                            className="rounded-md border border-[#d4c4a8]/20 px-2 py-1 text-xs text-[#d4c4a8]/75"
                            key={link.code}
                          >
                            {link.label}: {link.code}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
