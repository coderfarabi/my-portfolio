import { findSubscriberByEmail, saveSubscriber } from "./newsletter.repository";
import { NewsletterSubscribeSchema } from "./newsletter.schema";
import { ApiError } from "@/lib/api-error";
import type { NewsletterSubscriber } from "./newsletter.types";

export const subscribeToNewsletter = async (
  rawBody: unknown
): Promise<NewsletterSubscriber> => {
  // Validate incoming payload — throws ZodError on failure
  const { email } = NewsletterSubscribeSchema.parse(rawBody);

  // Check for duplicate subscriptions
  const existing = await findSubscriberByEmail(email);
  if (existing) {
    if (existing.isActive) {
      throw new ApiError("This email is already subscribed to the newsletter", 409);
    }
    // Could re-activate here in a future iteration
    throw new ApiError("This email was previously unsubscribed", 409);
  }

  return saveSubscriber(email);
};
