# Portfolio Website — Next.js 15 App

A production-ready, highly secure, and optimized portfolio website built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, and Firebase Firestore.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict-mode, zero `any` usage)
- **Validation**: Zod (for environment variables, request bodies, query/route parameters)
- **Database**: Firebase Firestore
- **Version Control & Repository Data**: GitHub GraphQL API (dynamic repository statistics sync)
- **Styling & Aesthetics**: Tailwind CSS v4
- **Animations**: Framer Motion

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Main entry point (Assembles front-end sections)
│   ├── layout.tsx         # Root layout with font preconnect tags
│   ├── globals.css        # Tailwind CSS v4 + theme tokens
│   └── api/              # API route handlers (force-dynamic server rendering)
│       ├── about/
│       ├── contact/
│       ├── contact-info/
│       ├── education/
│       ├── experience/
│       ├── github/
│       ├── hero/
│       ├── newsletter/
│       ├── projects/
│       ├── skills/
│       └── social-links/
├── components/           # Redesigned React components
│   ├── Header.tsx        # Sticky glassmorphism header with active link observer
│   ├── HeroSection.tsx   # Intro hero, outline-framed avatar, and tech marquee
│   ├── AboutSection.tsx  # Bio text + border-separated statistics cards
│   ├── ServicesSection.tsx# Numbered service offerings and tags
│   ├── ExperienceSection.tsx # Vertical timeline of professional roles
│   ├── EducationSection.tsx # Academic cards layout
│   ├── ProjectsSection.tsx # Hover-zoomed portfolio cards with live GitHub stats
│   ├── TestimonialsSection.tsx # Client reviews and satisfaction ratings
│   ├── FAQSection.tsx    # Smooth animated accordion dropdowns
│   ├── BlogSection.tsx   # Articles and insights cards
│   ├── ContactSection.tsx # Contact forms & static details (integrated with POST /api/contact)
│   ├── NewsletterSection.tsx # Inline subscription banner (integrated with POST /api/newsletter)
│   └── Footer.tsx        # Structured footer with scroll-to-top trigger
├── config/
│   └── env.ts            # Zod env validation
├── lib/
│   ├── api-error.ts      # Custom exception class
│   ├── api-response.ts   # Standard JSON wrappers
│   ├── catch-async.ts    # Async error handling decorator
│   ├── firebase.ts       # Lazy Firestore initializer
│   ├── github.ts         # GitHub GraphQL query client with fragment cache
│   └── api.ts            # Client-side API fetch helper
└── modules/              # Feature modules (decoupled repository-service-controller architecture)
    ├── about/
    ├── contact/
    ├── education/
    ├── experience/
    ├── github/
    ├── hero/
    ├── newsletter/
    ├── projects/
    ├── skills/
    └── social-links/
```

---

## Key Backend Features

### Environment Validation (`src/config/env.ts`)
- Validates environment variables using Zod schemas at startup.
- Safe-fails with clear, mapped errors if keys are missing.
- Variables: `NODE_ENV`, `PORT`, `GITHUB_PAT`, `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`

### Standardized API Responses
All API responses follow a consistent envelope structure:

**Success:**
```json
{
  "success": true,
  "message": "Success message",
  "data": { ... },
  "meta": { "count": 1 },
  "timestamp": "2026-07-20T20:32:15.000Z"
}
```

**Error:**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": { ... },
  "statusCode": 400,
  "timestamp": "2026-07-20T20:32:15.000Z"
}
```

### Async Interceptor (`src/lib/catch-async.ts`)
Next.js route handlers are wrapped with a `catchAsync()` decorator to automatically handle and convert promise rejections or validation errors to the standard JSON API error response.

### Lazy Firebase Initializer (`src/lib/firebase.ts`)
Firebase is initialized lazily during route execution, preventing pre-rendering build errors during `npm run build` compilation pipelines.

---

## API Endpoints

| Route | Method | Description |
|---|---|---|
| `/api/hero` | GET | Hero section (greeting, name, CTAs) |
| `/api/about` | GET | About section with bio and stats |
| `/api/skills` | GET | Skills list (supports `?grouped=true` query) |
| `/api/experience` | GET | Work experience sorted by date |
| `/api/education` | GET | Education history sorted by date |
| `/api/projects` | GET | Projects metadata merged dynamically with GitHub stats |
| `/api/github` | GET | Pinned user repositories from GitHub GraphQL API |
| `/api/contact-info` | GET | Static email, availability status, and address details |
| `/api/social-links` | GET | Sorted visible social platforms |
| `/api/contact` | POST | Submits message forms (validated with Zod, saved to Firestore) |
| `/api/newsletter` | POST | Subscribes email addresses (validated with Zod, checks duplicates) |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project with Firestore enabled
- A GitHub Personal Access Token (with `repo` permissions)

### Setup

1. Install project dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory:
```env
GITHUB_PAT=your_github_pat
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
```

3. Download your Firebase service account key from **Project Settings > Service Accounts > Generate New Private Key** and save it as `serviceAccountKey.json` in the project root.

4. Seed your Firestore collections with boilerplate data:
```bash
node seed.js
```

5. Run the local development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio site.

### Build Compilation

Compile the project bundle:
```bash
npm run build
```
