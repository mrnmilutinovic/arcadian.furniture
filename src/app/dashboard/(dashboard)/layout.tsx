import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getPartnerByUserId } from "@/lib/partner-data";
import { isSuperAdminSession } from "@/lib/roles";
import { DashboardShell } from "./components/DashboardShell";

const PARTNER_HOSTS = ["partner.arcadiantables.com", "partner.localhost"];

function getLoginUrl(host: string) {
  const onPartner = PARTNER_HOSTS.some((h) => host.startsWith(h));
  return onPartner ? "/login" : "/dashboard/login";
}

export const metadata: Metadata = {
  title: "Partner Dashboard — Arcadian",
  robots: "noindex, nofollow",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hdrs = await headers();
  const host = hdrs.get("host") || "";

  const session = await auth.api.getSession({
    headers: hdrs,
  });

  if (!session) {
    redirect(getLoginUrl(host));
  }

  const partner = await getPartnerByUserId(session.user.id);

  if (!partner) {
    if (isSuperAdminSession(session)) {
      redirect("/dashboard/admin");
    }
    redirect(getLoginUrl(host));
  }

  return (
    <div className="dark">
      <DashboardShell
        partner={{
          companyName: partner.companyName,
          contactName: partner.contactName,
          email: session.user.email,
          referralCodes: partner.referralLinks.map((l) => ({
            code: l.code,
            label: l.label,
          })),
        }}
      >
        {children}
      </DashboardShell>
    </div>
  );
}
