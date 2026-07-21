const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

const app = admin.initializeApp({
  credential: admin.cert(serviceAccount)
});

const db = getFirestore(app);

// ------------------------------------------------------------------
// NEW COLLECTIONS DATA (won't touch existing collections)
// ------------------------------------------------------------------

const testimonialsData = [
  {
    quote: "They truly understood my vision and turned it into an impactful product. The results went beyond my expectations!",
    author: "John Harris",
    role: "Marketing Director",
    rating: 5,
    order: 1
  },
  {
    quote: "They took the time to understand our goals and delivered a solution that resonated perfectly with our audience.",
    author: "Michael Lee",
    role: "Product Manager",
    rating: 5,
    order: 2
  },
  {
    quote: "Their design skills are unmatched. They transformed my ideas into a high-performing, visually striking website.",
    author: "Sarah Johnson",
    role: "CEO, TechStart",
    rating: 5,
    order: 3
  },
  {
    quote: "As a small business owner, I appreciated how stress-free they made the entire process from start to finish.",
    author: "Laura Bennett",
    role: "Small Business Owner",
    rating: 5,
    order: 4
  }
];

const faqData = [
  {
    question: "What services do you offer?",
    answer: "I offer a range of services including UI/UX design, frontend and backend development, mobile app development, and DevOps consulting. Each service is tailored to the specific needs of your project.",
    order: 1
  },
  {
    question: "How does the design process work?",
    answer: "My process begins with discovery and research, followed by wireframing, prototyping, visual design, and development. I maintain close collaboration with clients throughout each phase to ensure the final product aligns with their vision.",
    order: 2
  },
  {
    question: "How long does a project usually take?",
    answer: "Timelines vary based on complexity. A typical website takes 4-8 weeks, while larger web applications may take 2-4 months. I provide a detailed timeline during our initial consultation.",
    order: 3
  },
  {
    question: "What do you need to get started on a project?",
    answer: "I need a clear brief outlining your goals, target audience, preferred timeline, and any brand assets (logos, colors, content). The more context you provide, the smoother the process will be.",
    order: 4
  },
  {
    question: "Do you offer revisions?",
    answer: "Yes, revisions are part of the process. Each phase includes rounds of feedback and refinement to ensure the deliverables meet your expectations before moving forward.",
    order: 5
  },
  {
    question: "How do I get started?",
    answer: "Simply reach out through the contact form with a brief description of your project. I'll get back to you within 24 hours to schedule a free consultation call.",
    order: 6
  }
];

const blogData = [
  {
    category: "Insights",
    date: "Apr 30, 2025",
    title: "5 Design Trends That Will Define 2026",
    excerpt: "Explore the top design trends for 2026 that will influence web, UI/UX, and branding projects, helping you stay ahead of the curve.",
    slug: "design-trends-2026",
    order: 1
  },
  {
    category: "Tutorials",
    date: "Apr 27, 2025",
    title: "How to Streamline Your Design Workflow",
    excerpt: "Discover practical strategies to improve your design process, save time, and deliver quality work more efficiently.",
    slug: "streamline-design-workflow",
    order: 2
  },
  {
    category: "Development",
    date: "Apr 20, 2025",
    title: "Building Performant React Apps in 2026",
    excerpt: "Learn about the latest performance optimization techniques for React applications, from server components to streaming SSR.",
    slug: "performant-react-apps",
    order: 3
  }
];

const sectionsConfigData = {
  sections: {
    about: true,
    blog: true,
    "contact-info": true,
    education: true,
    experience: true,
    faq: true,
    footer: true,
    hero: true,
    newsletter: true,
    "projects-metadata": true,
    services: true,
    skills: true,
    "social-links": true,
    testimonials: true,
  },
};

// ------------------------------------------------------------------
// PUSH ONLY NEW COLLECTIONS TO FIRESTORE
// ------------------------------------------------------------------

async function seedNewCollections() {
  console.log("Seeding new collections (testimonials, faq, blog, sections-config)...\n");

  async function populateCollection(collectionName, items) {
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

  await populateCollection('testimonials', testimonialsData);
  await populateCollection('faq', faqData);
  await populateCollection('blog', blogData);

  // Single-doc collections
  await db.collection("sections-config").doc("main").set(sectionsConfigData);
  console.log(`✓ Uploaded sections-config/main`);

  // Add new site-config fields to hero/main (merge so existing data is safe)
  await db.collection("hero").doc("main").set(
    {
      siteTitle: "Portfolio",
      faviconUrl: "https://example.com/favicon.ico",
      brandName: "Portfolio",
      cursorEnabled: true,
    },
    { merge: true },
  );
  console.log(`✓ Updated hero/main with siteTitle, faviconUrl, brandName, cursorEnabled`);

  console.log("\nDone! Existing collections and data were not touched.");
  process.exit(0);
}

seedNewCollections().catch((err) => {
  console.error("Error seeding new collections:", err);
  process.exit(1);
});
