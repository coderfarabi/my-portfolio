const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

const app = admin.initializeApp({
  credential: admin.cert(serviceAccount)
});

const db = getFirestore(app);

// ------------------------------------------------------------------
// DATA DEFINITION
// ------------------------------------------------------------------

// Single document collections ("main" doc)
const heroData = {
  greeting: "Hello, I'm",
  name: "Your Name",
  title: "Software Engineer",
  subtitle: "Building scalable web apps & cloud solutions.",
  ctaPrimaryLabel: "View Projects",
  ctaPrimaryUrl: "https://example.com/#projects",
  ctaSecondaryLabel: "Contact Me",
  ctaSecondaryUrl: "https://example.com/#contact"
};

const aboutData = {
  name: "Your Name",
  tagline: "Passionate developer building modern tools.",
  bio: "Full-stack developer with experience in Python, JavaScript, and cloud architectures.",
  location: "Chittagong, Bangladesh",
  avatarUrl: "https://example.com/avatar.jpg",
  yearsOfExperience: 3,
  openToWork: true
};

const contactInfoData = {
  email: "your.email@example.com",
  phone: "+880123456789",
  location: "Chittagong, Bangladesh",
  availabilityStatus: "available",
  preferredContactMethod: "email"
};

// Auto-ID collections (Lists)
const experienceData = [
  {
    role: "Full Stack Engineer",
    company: "Tech Corp",
    location: "Remote",
    locationType: "remote",
    employmentType: "full-time",
    startDate: "2023-01-01",
    description: ["Developed backend microservices", "Optimized database performance"],
    technologies: ["Node.js", "Python", "MySQL", "Firebase"],
    isCurrent: true,
    order: 1
  }
];

const educationData = [
  {
    institution: "University Name",
    degree: "Bachelor of Science",
    fieldOfStudy: "Computer Science",
    location: "Bangladesh",
    startDate: "2019-01-01",
    endDate: "2023-01-01",
    isCurrent: false,
    grade: "3.8/4.0",
    order: 1
  }
];

const skillsData = [
  { name: "Python", category: "Languages", level: "advanced", order: 1 },
  { name: "Firebase", category: "Backend", level: "intermediate", order: 2 },
  { name: "MySQL", category: "Databases", level: "intermediate", order: 3 }
];

const projectsData = [
  {
    title: "Blood Connect",
    description: "Database-driven application for connecting blood donors.",
    category: "Web App",
    tags: ["Python", "MySQL", "Flask"],
    isFeatured: true,
    githubRepoName: "blood-connect",
    demoUrl: "https://example.com/blood-connect",
    order: 1
  }
];

const socialLinksData = [
  { platform: "github", label: "GitHub", url: "https://github.com/yourhandle", isVisible: true, order: 1 },
  { platform: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/yourhandle", isVisible: true, order: 2 }
];

// ------------------------------------------------------------------
// PUSH TO FIRESTORE
// ------------------------------------------------------------------

async function seedFirestore() {
  console.log("Starting data migration...");

  // 1. Single Document Collections (Doc ID: "main")
  await db.collection('hero').doc('main').set(heroData);
  await db.collection('about').doc('main').set(aboutData);
  await db.collection('contact-info').doc('main').set(contactInfoData);
  console.log("✓ Uploaded fixed single docs (hero, about, contact-info)");

  // 2. Helper to clear and re-populate Auto-ID collections
  async function populateAutoCollection(collectionName, items) {
    const colRef = db.collection(collectionName);
    const snapshot = await colRef.get();
    
    const batch = db.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    items.forEach((item) => {
      const newDocRef = colRef.doc();
      batch.set(newDocRef, item);
    });

    await batch.commit();
    console.log(`✓ Uploaded ${items.length} items into '${collectionName}'`);
  }

  await populateAutoCollection('experience', experienceData);
  await populateAutoCollection('education', educationData);
  await populateAutoCollection('skills', skillsData);
  await populateAutoCollection('projects-metadata', projectsData);
  await populateAutoCollection('social-links', socialLinksData);

  console.log("All data successfully pushed to Firebase!");
  process.exit(0);
}

seedFirestore().catch((err) => {
  console.error("Error seeding Firestore:", err);
  process.exit(1);
});
