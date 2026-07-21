import { z } from "zod";

export const ContactInfoSchema = z.object({
  id: z.string().optional(),
  email: z.string().email("Must be a valid email address"),
  phone: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  availabilityStatus: z.enum(["available", "busy", "not-available"]),
  preferredContactMethod: z.enum(["email", "phone"]),
});

// Incoming POST /api/contact request body
export const ContactMessageSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: z.string().email("Must be a valid email address"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must not exceed 200 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must not exceed 2000 characters"),
});

export type ContactMessageInput = z.infer<typeof ContactMessageSchema>;
export type ContactInfoInput = z.infer<typeof ContactInfoSchema>;
