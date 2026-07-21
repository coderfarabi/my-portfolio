import { cache } from "react";
import { db } from "@/lib/firebase";
import { ApiError } from "@/lib/api-error";
import type { About } from "./about.types";

// Rowy stores the About section as a single document in the "about" collection
const COLLECTION = "about";
const DOCUMENT_ID = "main";

export const fetchAbout = cache(async (): Promise<About> => {
  const doc = await db().collection(COLLECTION).doc(DOCUMENT_ID).get();

  if (!doc.exists) {
    throw new ApiError("About data not found", 404);
  }

  const data = doc.data() as Omit<About, "id">;
  return { id: doc.id, ...data };
});
