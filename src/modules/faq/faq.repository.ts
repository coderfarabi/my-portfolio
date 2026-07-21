import { cache } from "react";
import { db } from "@/lib/firebase";
import type { FAQ } from "./faq.types";

const COLLECTION = "faq";

export const fetchFAQ = cache(async (): Promise<FAQ[]> => {
  const snapshot = await db().collection(COLLECTION).orderBy("order", "asc").get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<FAQ, "id">),
  }));
});
