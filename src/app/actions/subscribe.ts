"use server";

import { analytics } from "@/lib/analytics";

export type SubscribeSource = "hero" | "kickstarter" | "footer";

export interface SubscribeState {
  success: boolean;
  message: string;
}

export async function subscribeToUpdates(
  prevState: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const email = formData.get("email") as string;
  const source = formData.get("source") as SubscribeSource;

  if (!email || !email.includes("@")) {
    return {
      success: false,
      message: "Please enter a valid email address",
    };
  }

  try {
    // Identify the user in Customer.io
    analytics.identify({
      userId: email,
      traits: {
        email: email,
        signup_source: source,
        signup_date: new Date().toISOString(),
        campaign: "kickstarter-2026",
      },
    });

    // Track the subscription event
    analytics.track({
      userId: email,
      event: "Subscribed to Updates",
      properties: {
        source: source,
        campaign: "kickstarter-2026",
      },
    });

    // Add to the pre-launch group
    analytics.group({
      userId: email,
      groupId: "kickstarter-prelaunch",
      traits: {
        name: "Kickstarter Pre-Launch",
        campaign: "kickstarter-2026",
      },
    });

    return {
      success: true,
      message: "You're on the list! We'll notify you when we launch.",
    };
  } catch (error) {
    console.error("Subscription error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
