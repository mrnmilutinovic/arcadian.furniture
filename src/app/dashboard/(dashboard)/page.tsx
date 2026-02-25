import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getPartnerByUserId } from "@/lib/partner-data";
import { getDailyTraffic, getReferralMetrics } from "@/lib/posthog-analytics";
import { OverviewContent } from "./components/OverviewContent";

export default async function OverviewPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/dashboard/login");

  const partner = await getPartnerByUserId(session.user.id);
  if (!partner) redirect("/dashboard/login");

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
      referralLinks={partner.referralLinks.map((l) => ({
        code: l.code,
        label: l.label,
      }))}
      metrics={metrics}
      dailyTraffic={dailyTraffic}
    />
  );
}
