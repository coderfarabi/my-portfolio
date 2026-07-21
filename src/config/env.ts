import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().optional().default("3000"),


  // GitHub GraphQL API
  GITHUB_PAT: z.string().min(1, "GITHUB_PAT is required for GitHub API integration"),

  // Firebase Admin SDK (Dynamic data storage)
  FIREBASE_PROJECT_ID: z.string().min(1, "FIREBASE_PROJECT_ID is required for Firestore"),
  FIREBASE_CLIENT_EMAIL: z.string().email("FIREBASE_CLIENT_EMAIL must be a valid email"),
  FIREBASE_PRIVATE_KEY: z.string().min(1, "FIREBASE_PRIVATE_KEY is required for Firestore authentication"),
});

// Run validation
const parseEnv = () => {
  const parsed = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    GITHUB_PAT: process.env.GITHUB_PAT,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  });

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.format());
    throw new Error("Invalid environment variables configuration");
  }

  return parsed.data;
};

export const env = parseEnv();
export type Env = z.infer<typeof envSchema>;
