import { cache } from "react";
import { db } from "@/lib/firebase";
import type { Skill } from "./skills.types";

const COLLECTION = "skills";

export const fetchSkills = cache(async (): Promise<Skill[]> => {
  const snapshot = await db().collection(COLLECTION).orderBy("order", "asc").get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Skill, "id">),
  }));
});
