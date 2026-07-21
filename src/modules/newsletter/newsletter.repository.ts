import { db } from "@/lib/firebase";
import type { NewsletterSubscriber } from "./newsletter.types";

const COLLECTION = "newsletter";

export const findSubscriberByEmail = async (
  email: string
): Promise<NewsletterSubscriber | null> => {
  const snapshot = await db()
    .collection(COLLECTION)
    .where("email", "==", email)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...(doc.data() as Omit<NewsletterSubscriber, "id">) };
};

export const saveSubscriber = async (
  email: string
): Promise<NewsletterSubscriber> => {
  const payload = {
    email,
    subscribedAt: new Date().toISOString(),
    isActive: true,
  };

  const docRef = await db().collection(COLLECTION).add(payload);
  return { id: docRef.id, ...payload };
};
