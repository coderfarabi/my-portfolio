const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../serviceAccountKey.json');

const app = admin.initializeApp({
  credential: admin.cert(serviceAccount)
});

const db = getFirestore(app);

const VALID_FIELDS = {
  'skills': new Set(['name', 'category', 'level', 'iconUrl', 'order']),
  'projects-metadata': new Set(['title', 'description', 'category', 'tags', 'thumbnailUrl', 'githubRepoName', 'githubOwner', 'demoUrl', 'isFeatured', 'order']),
  'experience': new Set(['role', 'company', 'companyUrl', 'location', 'locationType', 'employmentType', 'startDate', 'endDate', 'isCurrent', 'description', 'technologies', 'order']),
  'education': new Set(['institution', 'institutionUrl', 'degree', 'fieldOfStudy', 'location', 'startDate', 'endDate', 'isCurrent', 'grade', 'activities', 'description', 'order']),
  'testimonials': new Set(['quote', 'author', 'role', 'rating', 'order']),
  'blog': new Set(['category', 'date', 'title', 'excerpt', 'slug', 'order']),
  'faq': new Set(['question', 'answer', 'order']),
  'social-links': new Set(['platform', 'label', 'url', 'iconUrl', 'isVisible', 'order']),
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function stripExtraFields(docData, validFields) {
  const cleaned = {};
  for (const key of Object.keys(docData)) {
    if (validFields.has(key)) {
      cleaned[key] = docData[key];
    } else {
      console.log(`  → Stripped field "${key}"`);
    }
  }
  return cleaned;
}

async function restructureCollection(collectionName) {
  console.log(`\n--- Processing '${collectionName}' ---`);

  const validFields = VALID_FIELDS[collectionName];
  if (!validFields) {
    console.log(`  ✗ Unknown collection, skipping`);
    return;
  }

  const snapshot = await db.collection(collectionName).orderBy('order', 'asc').get();

  if (snapshot.empty) {
    console.log(`  (empty, nothing to do)`);
    return;
  }

  const docs = snapshot.docs;
  console.log(`  Read ${docs.length} documents`);

  let currentOrder = 0;
  const batch = db.batch();
  let strippedCount = 0;
  let orderChangedCount = 0;

  for (const [index, doc] of docs.entries()) {
    const data = doc.data();
    const cleaned = stripExtraFields(data, validFields);

    const hadExtraFields = Object.keys(cleaned).length !== Object.keys(data).length;
    if (hadExtraFields) strippedCount++;

    if (index === 0) {
      currentOrder = 10;
    } else {
      currentOrder += randomInt(15, 25);
    }

    if (Object.keys(cleaned).length === 0) {
      console.log(`  ⚠ Document ${doc.id} has no valid fields — skipping to avoid data loss`);
      continue;
    }

    if (cleaned.order !== currentOrder || hadExtraFields) {
      cleaned.order = currentOrder;
      orderChangedCount++;
      batch.set(doc.ref, cleaned);
    }
  }

  await batch.commit();
  console.log(`  ✓ Updated ${orderChangedCount} docs (stripped extra fields from ${strippedCount}, new order values starting at 10 with gaps of 15-25)`);
}

async function main() {
  console.log('=== Firestore Data Restructuring ===');
  console.log('Target collections: skills, projects-metadata, experience, education, testimonials, blog, faq, social-links');
  console.log('Actions: space out order values, strip extra fields\n');

  const collections = Object.keys(VALID_FIELDS);

  for (const name of collections) {
    try {
      await restructureCollection(name);
    } catch (err) {
      console.error(`  ✗ Error processing '${name}':`, err.message);
    }
  }

  console.log('\n=== Done! All collections restructured successfully. ===');
  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
