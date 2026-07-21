import { cache } from "react";
import { db } from "@/lib/firebase";
import type { Experience } from "./experience.types";

const COLLECTION = "experience";

export const fetchExperiences = cache(async (): Promise<Experience[]> => {
  const snapshot = await db().collection(COLLECTION).orderBy("order", "asc").get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Experience, "id">),
  }));
});
