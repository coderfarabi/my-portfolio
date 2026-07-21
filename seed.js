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

const testimonialsData = [
  { quote: "They truly understood my vision and turned it into an impactful product. The results went beyond my expectations!", author: "John Harris", role: "Marketing Director", rating: 5, order: 1 },
  { quote: "They took the time to understand our goals and delivered a solution that resonated perfectly with our audience.", author: "Michael Lee", role: "Product Manager", rating: 5, order: 2 },
  { quote: "Their design skills are unmatched. They transformed my ideas into a high-performing, visually striking website.", author: "Sarah Johnson", role: "CEO, TechStart", rating: 5, order: 3 },
  { quote: "As a small business owner, I appreciated how stress-free they made the entire process from start to finish.", author: "Laura Bennett", role: "Small Business Owner", rating: 5, order: 4 }
];

const faqData = [
  { question: "What services do you offer?", answer: "I offer a range of services including UI/UX design, frontend and backend development, mobile app development, and DevOps consulting. Each service is tailored to meet the specific needs of your project.", order: 1 },
  { question: "How does the design process work?", answer: "My process begins with discovery and research, followed by wireframing, prototyping, visual design, and development. I maintain close collaboration with clients throughout each phase to ensure the final product aligns with their vision.", order: 2 },
  { question: "How long does a project usually take?", answer: "Timelines vary based on complexity. A typical website takes 4-8 weeks, while larger web applications may take 2-4 months. I provide a detailed timeline during our initial consultation.", order: 3 },
  { question: "What do you need to get started on a project?", answer: "I need a clear brief outlining your goals, target audience, preferred timeline, and any brand assets (logos, colors, content). The more context you provide, the smoother the process will be.", order: 4 },
  { question: "Do you offer revisions?", answer: "Yes, revisions are part of the process. Each phase includes rounds of feedback and refinement to ensure the deliverables meet your expectations before moving forward.", order: 5 },
  { question: "How do I get started?", answer: "Simply reach out through the contact form with a brief description of your project. I'll get back to you within 24 hours to schedule a free consultation call.", order: 6 }
];

const blogData = [
  { category: "Insights", date: "Apr 30, 2025", title: "5 Design Trends That Will Define 2026", excerpt: "Explore the top design trends for 2026 that will influence web, UI/UX, and branding projects, helping you stay ahead of the curve.", slug: "design-trends-2026", order: 1 },
  { category: "Tutorials", date: "Apr 27, 2025", title: "How to Streamline Your Design Workflow", excerpt: "Discover practical strategies to improve your design process, save time, and deliver quality work more efficiently.", slug: "streamline-design-workflow", order: 2 },
  { category: "Development", date: "Apr 20, 2025", title: "Building Performant React Apps in 2026", excerpt: "Learn about the latest performance optimization techniques for React applications, from server components to streaming SSR.", slug: "performant-react-apps", order: 3 }
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
  await populateAutoCollection('testimonials', testimonialsData);
  await populateAutoCollection('faq', faqData);
  await populateAutoCollection('blog', blogData);

  console.log("All data successfully pushed to Firebase!");
  process.exit(0);
}

seedFirestore().catch((err) => {
  console.error("Error seeding Firestore:", err);
  process.exit(1);
});
