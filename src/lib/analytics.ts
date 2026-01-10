import { ApiKeySession, EventsApi, ProfilesApi } from "klaviyo-api";

const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
if (!apiKey) {
  throw new Error("KLAVIYO_PRIVATE_API_KEY environment variable is required");
}

const session = new ApiKeySession(apiKey);

export const profilesApi = new ProfilesApi(session);
export const eventsApi = new EventsApi(session);
