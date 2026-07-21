import { cache } from "react";
import { db } from "@/lib/firebase";
import type { Testimonial } from "./testimonials.types";

const COLLECTION = "testimonials";

export const fetchTestimonials = cache(async (): Promise<Testimonial[]> => {
  const snapshot = await db().collection(COLLECTION).orderBy("order", "asc").get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Testimonial, "id">),
  }));
});
