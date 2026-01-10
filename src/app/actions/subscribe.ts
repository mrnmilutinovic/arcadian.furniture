"use server";

import type {
  EventCreateQueryV2,
  SubscriptionCreateJobCreateQuery,
} from "klaviyo-api";
import { eventsApi, profilesApi } from "@/lib/analytics";

export type SubscribeSource = "hero" | "kickstarter" | "footer";

export interface SubscribeState {
  success: boolean;
  message: string;
}

export async function subscribeToUpdates(
  _prevState: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = formData.get("email") as string;
  const source = formData.get("source") as SubscribeSource;

  if (!email || !email.includes("@")) {
    return {
      success: false,
      message: "Please enter a valid email address",
    };
  }

  const listId = process.env.KLAVIYO_LIST_ID;
  if (!listId) {
    console.error("KLAVIYO_LIST_ID is not configured");
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  try {
    // Subscribe the profile to the list with email marketing consent
    const subscriptionQuery: SubscriptionCreateJobCreateQuery = {
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          customSource: `Arcadian Website - ${source}`,
          profiles: {
            data: [
              {
                type: "profile",
                attributes: {
                  email: email,
                  subscriptions: {
                    email: {
                      marketing: {
                        consent: "SUBSCRIBED",
                      },
                    },
                  },
                },
              },
            ],
          },
        },
        relationships: {
          list: {
            data: {
              type: "list",
              id: listId,
            },
          },
        },
      },
    };

    await profilesApi.bulkSubscribeProfiles(subscriptionQuery);

    // Track the subscription event
    const eventQuery: EventCreateQueryV2 = {
      data: {
        type: "event",
        attributes: {
          properties: {
            source: source,
            campaign: "kickstarter-2026",
            signup_date: new Date().toISOString(),
          },
          metric: {
            data: {
              type: "metric",
              attributes: {
                name: "Subscribed to Updates",
              },
            },
          },
          profile: {
            data: {
              type: "profile",
              attributes: {
                email: email,
              },
            },
          },
        },
      },
    };

    await eventsApi.createEvent(eventQuery);

    return {
      success: true,
      message: "You're on the list! We'll notify you when we launch.",
    };
  } catch (error) {
    console.error("Subscription error:", error);
    // Log detailed error response from Klaviyo
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response?: { data?: unknown; status?: number } };
      console.error("Klaviyo API response:", JSON.stringify(axiosError.response?.data, null, 2));
      console.error("Status:", axiosError.response?.status);
    }
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
