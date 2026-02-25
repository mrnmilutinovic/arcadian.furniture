import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getPartnerByUserId, getPartnerWithLinks } from "@/lib/partner-data";
import { getDailyTraffic, getReferralMetrics } from "@/lib/posthog-analytics";
import { OverviewContent } from "./components/OverviewContent";

export default async function OverviewPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/dashboard/login");

  const partner = await getPartnerByUserId(session.user.id);
  if (!partner) redirect("/dashboard/login");

  // Fetch all links (including inactive) for the management UI
  const allLinks = await getPartnerWithLinks(partner.id);
  const allReferralLinks = allLinks?.referralLinks ?? [];

  // Use only active links for metrics
  const refCodes = partner.referralLinks.map((l) => l.code);
  const primaryCode = refCodes[0];

  let metrics = {
    pageViews: 0,
    uniqueVisitors: 0,
    orders: 0,
    conversionRate: 0,
  };
  let dailyTraffic: {
    date: string;
    pageViews: number;
    uniqueVisitors: number;
  }[] = [];

  if (primaryCode) {
    [metrics, dailyTraffic] = await Promise.all([
      getReferralMetrics(primaryCode),
      getDailyTraffic(primaryCode),
    ]);
  }

  return (
    <OverviewContent
      contactName={partner.contactName}
      companyName={partner.companyName}
      referralLinks={allReferralLinks.map((l) => ({
        id: l.id,
        code: l.code,
        label: l.label,
        isActive: l.isActive,
      }))}
      metrics={metrics}
      dailyTraffic={dailyTraffic}
    />
  );
}
