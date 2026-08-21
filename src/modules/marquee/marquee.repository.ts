import { cache } from "react";
import { db } from "@/lib/firebase";
import { ApiError } from "@/lib/api-error";
import type { MarqueeItem } from "./marquee.types";

const COLLECTION = "marquee";
const DOCUMENT_ID = "main";

export const fetchMarquee = cache(async (): Promise<MarqueeItem[]> => {
  const doc = await db().collection(COLLECTION).doc(DOCUMENT_ID).get();

  if (!doc.exists) {
    throw new ApiError("Marquee data not found", 404);
  }

  const data = doc.data() ?? {};

  return Object.entries(data)
    .filter(([key]) => /^\d+$/.test(key))
    .sort(([a], [b]) => parseInt(a, 10) - parseInt(b, 10))
    .map(([key, label]) => ({
      label: String(label),
      order: parseInt(key, 10),
    }));
});
