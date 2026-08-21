import { cache } from "react";
import { db } from "@/lib/firebase";
import { ApiError } from "@/lib/api-error";
import type { Skill } from "./skills.types";
import type { Services } from "./skills.types";

const COLLECTION = "skills";
const SERVICES_DOCUMENT_ID = "main";

export const fetchSkills = cache(async (): Promise<Skill[]> => {
  const snapshot = await db().collection(COLLECTION).get();

  const docs = snapshot.docs
    .filter((doc) => doc.id !== SERVICES_DOCUMENT_ID)
    .map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Skill, "id">),
    }));

  return docs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
});

export const fetchServices = cache(async (): Promise<Services> => {
  const doc = await db().collection(COLLECTION).doc(SERVICES_DOCUMENT_ID).get();

  if (!doc.exists) {
    throw new ApiError("Services data not found", 404);
  }

  const data = doc.data() as Omit<Services, "id">;
  return { id: doc.id, ...data };
});
