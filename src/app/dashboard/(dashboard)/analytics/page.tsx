import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getPartnerByUserId } from "@/lib/partner-data";
import { getDailyTraffic, getMultiCodeMetrics } from "@/lib/posthog-analytics";
import { AnalyticsContent } from "../components/AnalyticsContent";

const PARTNER_HOSTS = ["partner.arcadiantables.com", "partner.localhost"];

function getLoginUrl(host: string) {
  const onPartner = PARTNER_HOSTS.some((h) => host.startsWith(h));
  return onPartner ? "/login" : "/dashboard/login";
}

export default async function AnalyticsPage() {
  const hdrs = await headers();
  const host = hdrs.get("host") || "";

  const session = await auth.api.getSession({
    headers: hdrs,
  });

  if (!session) redirect(getLoginUrl(host));

  const partner = await getPartnerByUserId(session.user.id);
  if (!partner) redirect(getLoginUrl(host));

  const refCodes = partner.referralLinks.map((l) => l.code);
  const refLabels = Object.fromEntries(
    partner.referralLinks.map((l) => [l.code, l.label]),
  );
  const sinceDates = Object.fromEntries(
    partner.referralLinks.map((l) => [l.code, l.createdAt]),
  );
  const primaryLink = partner.referralLinks[0];

  const [codeMetrics, dailyTraffic] = await Promise.all([
    getMultiCodeMetrics(refCodes, { sinceDates }),
    primaryLink
      ? getDailyTraffic(primaryLink.code, { since: primaryLink.createdAt })
      : Promise.resolve([]),
  ]);

  return (
    <AnalyticsContent
      referralLinks={partner.referralLinks.map((l) => ({
        code: l.code,
        label: l.label,
      }))}
      codeMetrics={codeMetrics}
      refLabels={refLabels}
      dailyTraffic={dailyTraffic}
    />
  );
}
