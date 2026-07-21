import { cache } from "react";
import { db } from "@/lib/firebase";
import { ApiError } from "@/lib/api-error";
import type { Hero } from "./hero.types";

const COLLECTION = "hero";
const DOCUMENT_ID = "main";

export const fetchHero = cache(async (): Promise<Hero> => {
  const doc = await db().collection(COLLECTION).doc(DOCUMENT_ID).get();

  if (!doc.exists) {
    throw new ApiError("Hero data not found", 404);
  }

  const data = doc.data() as Omit<Hero, "id">;
  return { id: doc.id, ...data };
});
