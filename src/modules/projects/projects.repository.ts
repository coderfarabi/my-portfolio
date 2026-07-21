import { cache } from "react";
import { db } from "@/lib/firebase";
import type { ProjectMetadata } from "./projects.types";

const COLLECTION = "projects-metadata";

export const fetchProjectsMetadata = cache(async (): Promise<ProjectMetadata[]> => {
  const snapshot = await db().collection(COLLECTION).orderBy("order", "asc").get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<ProjectMetadata, "id">),
  }));
});
