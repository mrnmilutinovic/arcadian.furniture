import { unstable_cache } from "next/cache";

const POSTHOG_API_URL = "https://eu.posthog.com";
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const POSTHOG_PERSONAL_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;

interface HogQLResult {
  results: unknown[][];
  columns: string[];
}

async function queryHogQLUncached(query: string): Promise<HogQLResult> {
  if (!POSTHOG_PERSONAL_API_KEY || !POSTHOG_PROJECT_ID) {
    throw new Error("PostHog credentials not configured");
  }

  const res = await fetch(
    `${POSTHOG_API_URL}/api/projects/${POSTHOG_PROJECT_ID}/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${POSTHOG_PERSONAL_API_KEY}`,
      },
      body: JSON.stringify({
        query: { kind: "HogQLQuery", query },
      }),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PostHog query failed: ${res.status} ${text}`);
  }

  return res.json();
}

const queryHogQL = unstable_cache(queryHogQLUncached, ["posthog-hogql"], {
  revalidate: 300,
});

export interface ReferralMetrics {
  pageViews: number;
  uniqueVisitors: number;
  orders: number;
  conversionRate: number;
}

export interface DailyTraffic {
  date: string;
  pageViews: number;
  uniqueVisitors: number;
}

export async function getReferralMetrics(
  refCode: string,
  options: { daysBack?: number; since?: Date } = {},
): Promise<ReferralMetrics> {
  const timeFilter = options.since
    ? `AND timestamp >= parseDateTimeBestEffort('${options.since.toISOString()}')`
    : `AND timestamp >= now() - interval ${options.daysBack ?? 30} day`;

  const pageViewQuery = `
    SELECT
      count() as page_views,
      count(DISTINCT properties.$session_id) as unique_visitors
    FROM events
    WHERE event = '$pageview'
      AND properties.$current_url LIKE '%ref=${refCode}%'
      ${timeFilter}
  `;

  const orderQuery = `
    SELECT count() as orders
    FROM events
    WHERE event = 'order_submitted'
      AND properties.referral = '${refCode}'
      ${timeFilter}
  `;

  try {
    const [pageViewResult, orderResult] = await Promise.all([
      queryHogQL(pageViewQuery),
      queryHogQL(orderQuery),
    ]);

    const pageViews = Number(pageViewResult.results[0]?.[0] ?? 0);
    const uniqueVisitors = Number(pageViewResult.results[0]?.[1] ?? 0);
    const orders = Number(orderResult.results[0]?.[0] ?? 0);
    const conversionRate =
      uniqueVisitors > 0 ? (orders / uniqueVisitors) * 100 : 0;

    return { pageViews, uniqueVisitors, orders, conversionRate };
  } catch {
    return { pageViews: 0, uniqueVisitors: 0, orders: 0, conversionRate: 0 };
  }
}

export async function getDailyTraffic(
  refCode: string,
  options: { daysBack?: number; since?: Date } = {},
): Promise<DailyTraffic[]> {
  const timeFilter = options.since
    ? `AND timestamp >= parseDateTimeBestEffort('${options.since.toISOString()}')`
    : `AND timestamp >= now() - interval ${options.daysBack ?? 30} day`;

  const query = `
    SELECT
      toDate(timestamp) as day,
      count() as page_views,
      count(DISTINCT properties.$session_id) as unique_visitors
    FROM events
    WHERE event = '$pageview'
      AND properties.$current_url LIKE '%ref=${refCode}%'
      ${timeFilter}
    GROUP BY day
    ORDER BY day
  `;

  try {
    const result = await queryHogQL(query);
    return result.results.map((row) => ({
      date: String(row[0]),
      pageViews: Number(row[1]),
      uniqueVisitors: Number(row[2]),
    }));
  } catch {
    return [];
  }
}

export async function getMultiCodeMetrics(
  refCodes: string[],
  options:
    | { daysBack?: number }
    | { sinceDates: Record<string, Date> } = {},
): Promise<Record<string, ReferralMetrics>> {
  const metrics: Record<string, ReferralMetrics> = {};
  const sinceDates =
    "sinceDates" in options ? options.sinceDates : undefined;
  const results = await Promise.all(
    refCodes.map((code) =>
      getReferralMetrics(
        code,
        sinceDates?.[code]
          ? { since: sinceDates[code] }
          : { daysBack: "daysBack" in options ? options.daysBack : undefined },
      ),
    ),
  );
  for (let i = 0; i < refCodes.length; i++) {
    metrics[refCodes[i]] = results[i];
  }
  return metrics;
}
