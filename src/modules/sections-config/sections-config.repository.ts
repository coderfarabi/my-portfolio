import { cache } from "react";
import { db } from "@/lib/firebase";
import { ApiError } from "@/lib/api-error";
import type { SectionsConfig } from "./sections-config.types";

const COLLECTION = "sections-config";
const DOCUMENT_ID = "main";

export const fetchSectionsConfig = cache(async (): Promise<SectionsConfig> => {
  const doc = await db().collection(COLLECTION).doc(DOCUMENT_ID).get();

  if (!doc.exists) {
    throw new ApiError("Sections config not found", 404);
  }

  const data = doc.data() as Omit<SectionsConfig, "id">;
  return { id: doc.id, ...data };
});
