import { cache } from "react";
import { db } from "@/lib/firebase";
import type { Education } from "./education.types";

const COLLECTION = "education";

export const fetchEducation = cache(async (): Promise<Education[]> => {
  const snapshot = await db().collection(COLLECTION).orderBy("order", "asc").get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Education, "id">),
  }));
});
