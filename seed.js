const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = getFirestore();

// ------------------------------------------------------------------
// MARQUEE COLLECTION ONLY (does not touch any other collection)
// Single document "main" with many fields, one field per marquee item
// ------------------------------------------------------------------

const marqueeData = {
  1: "React",
  2: "TypeScript",
  3: "Node.js",
  4: "Python",
  5: "Firebase",
  6: "MySQL",
  7: "Tailwind CSS",
  8: "Framer Motion",
  9: "UI/UX Design",
  10: "Web Development"
};

// ------------------------------------------------------------------
// EDUCATION COLLECTION ONLY
// ------------------------------------------------------------------

const educationData = [
  {
    institution: "University of Science & Technology",
    institutionUrl: "https://example.com/university",
    degree: "Bachelor of Science",
    fieldOfStudy: "Computer Science & Engineering",
    location: "Chittagong, Bangladesh",
    startDate: "2019-01-01",
    endDate: "Present",
    isCurrent: true,
    grade: "3.8/4.0",
    activities: ["Programming Club", "Hackathon Winner"],
    description: "Focused on software engineering, data structures, and cloud computing.",
    order: 1
  }
];

// ------------------------------------------------------------------
// ABOUT STATS COLLECTION ONLY (merge — other fields untouched)
// ------------------------------------------------------------------

const aboutStatsData = [
  { number: "01", label: "Experience", value: "3+", description: "Years working in the industry" },
  { number: "02", label: "Location", value: "Chittagong, Bangladesh", description: "Current residential base" },
  { number: "03", label: "Availability", value: "Available", description: "For new project opportunities" }
];

// ------------------------------------------------------------------
// SKILLS SERVICES DATA (merge — existing skill docs untouched)
// Single document "main" in the skills collection with the section
// description and the services list shown in the Technical Skills section
// ------------------------------------------------------------------

const skillsServicesData = {
  description: "Providing custom digital solutions built on modern tech stacks, strict type systems, and rich visual aesthetics.",
  services: [
    { name: "UI/UX", description: "User-centered visual systems, wireframing, interactive prototyping, and usability workflows." },
    { name: "Frontend", description: "Modern modular applications built with speed, accessibility, and high performance." },
    { name: "Backend", description: "Robust APIs, cloud architecture, system infrastructure, and relational/NoSQL databases." },
    { name: "Mobile", description: "Cross-platform mobile apps with native-level smooth micro-animations and layouts." },
    { name: "DevOps", description: "Automated pipelines, cloud integration, server telemetry, and containerized deployments." },
    { name: "Data Science", description: "Statistical analysis, pipeline data integration, data cleaning, and custom ML algorithms." }
  ]
};

// ------------------------------------------------------------------
// SECTIONS-CONFIG COLLECTION ONLY (merge — other fields untouched)
// ------------------------------------------------------------------

const sectionsConfigData = {
  sections: {
    hero: { order: 1, enabled: true },
    about: { order: 2, enabled: true },
    services: { order: 3, enabled: true },
    experience: { order: 4, enabled: true },
    education: { order: 5, enabled: true },
    "projects-metadata": { order: 6, enabled: true },
    testimonials: { order: 7, enabled: true },
    faq: { order: 8, enabled: true },
    blog: { order: 9, enabled: true },
    "contact-info": { order: 10, enabled: true },
    newsletter: { order: 11, enabled: true },
    skills: { order: 12, enabled: true },
    "social-links": { order: 13, enabled: true },
    footer: { order: 14, enabled: true },
  },
};

// ------------------------------------------------------------------
// PUSH SPECIFIC COLLECTIONS TO FIRESTORE
// ------------------------------------------------------------------

async function seedMarquee() {
  console.log("Seeding 'marquee' collection...");

  // Remove any existing docs so the single-doc structure is clean
  const colRef = db.collection('marquee');
  const snapshot = await colRef.get();

  const deleteBatch = db.batch();
  snapshot.docs.forEach((doc) => deleteBatch.delete(doc.ref));
  if (!snapshot.empty) {
    await deleteBatch.commit();
  }

  // Store as a single document with one field per item
  await db.collection('marquee').doc('main').set(marqueeData);
  console.log(`✓ Uploaded 'marquee/main' with ${Object.keys(marqueeData).length} fields`);
}

async function seedEducation() {
  console.log("Seeding 'education' collection...");

  const colRef = db.collection('education');
  const snapshot = await colRef.get();

  const batch = db.batch();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  educationData.forEach((item) => {
    const newDocRef = colRef.doc();
    batch.set(newDocRef, item);
  });

  await batch.commit();
  console.log(`✓ Uploaded ${educationData.length} items into 'education'`);
}

async function seedAboutStats() {
  console.log("Seeding 'about' stats...");

  await db.collection('about').doc('main').set({ stats: aboutStatsData }, { merge: true });
  console.log(`✓ Added 'stats' to about/main (${aboutStatsData.length} cards, other fields untouched)`);
}

async function seedSectionsConfig() {
  console.log("Seeding 'sections-config'...");

  await db.collection('sections-config').doc('main').set(sectionsConfigData, { merge: true });
  console.log(`✓ Updated sections-config/main with ${Object.keys(sectionsConfigData.sections).length} sections (other fields untouched)`);
}

async function seedSkillsServices() {
  console.log("Seeding 'skills/main' services data...");

  await db.collection('skills').doc('main').set(skillsServicesData, { merge: true });
  console.log(`✓ Updated skills/main with description + ${skillsServicesData.services.length} services (skill docs untouched)`);
}

async function main() {
  await seedMarquee();
  await seedEducation();
  await seedAboutStats();
  await seedSectionsConfig();
  await seedSkillsServices();

  console.log("Done! Other collections were not touched.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error seeding:", err);
  process.exit(1);
});
