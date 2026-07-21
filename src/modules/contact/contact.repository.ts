import { cache } from "react";
import { db } from "@/lib/firebase";
import { ApiError } from "@/lib/api-error";
import type { ContactInfo, ContactMessage } from "./contact.types";
import type { ContactMessageInput } from "./contact.schema";

const INFO_COLLECTION = "contact-info";
const INFO_DOCUMENT_ID = "main";
const MESSAGES_COLLECTION = "contact-messages";

export const fetchContactInfo = cache(async (): Promise<ContactInfo> => {
  const doc = await db().collection(INFO_COLLECTION).doc(INFO_DOCUMENT_ID).get();

  if (!doc.exists) {
    throw new ApiError("Contact info not found", 404);
  }

  return { id: doc.id, ...(doc.data() as Omit<ContactInfo, "id">) };
});

export const saveContactMessage = async (
  input: ContactMessageInput
): Promise<ContactMessage> => {
  const payload = {
    ...input,
    createdAt: new Date().toISOString(),
    isRead: false,
  };

  const docRef = await db().collection(MESSAGES_COLLECTION).add(payload);
  return { id: docRef.id, ...payload };
};
