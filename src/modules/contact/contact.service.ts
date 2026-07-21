import { fetchContactInfo, saveContactMessage } from "./contact.repository";
import { ContactMessageSchema } from "./contact.schema";
import type { ContactInfo, ContactMessage } from "./contact.types";

export const getContactInfo = async (): Promise<ContactInfo> => {
  return fetchContactInfo();
};

export const submitContactMessage = async (
  rawBody: unknown
): Promise<ContactMessage> => {
  // Validate incoming request payload — throws ZodError on failure
  // which catchAsync will convert to a 400 response automatically
  const validated = ContactMessageSchema.parse(rawBody);
  return saveContactMessage(validated);
};
