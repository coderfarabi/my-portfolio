import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { env } from "@/config/env";

// Lazy singleton — only initializes when first accessed, never at module load time
let _db: Firestore | null = null;

const getDb = (): Firestore => {
  if (_db) return _db;

  const app =
    getApps().length > 0
      ? getApp()
      : initializeApp({
          credential: cert({
            projectId: env.FIREBASE_PROJECT_ID,
            clientEmail: env.FIREBASE_CLIENT_EMAIL,
            // Newline characters are escaped in .env — restore them at runtime
            privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          }),
        });

  _db = getFirestore(app);
  return _db;
};

// Named export — call this inside route handlers, never at top-level module scope
export { getDb as db };
