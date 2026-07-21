# Portfolio

A portfolio website built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, and Firebase Firestore.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict-mode, zero `any` usage)
- **Validation**: Zod (for environment variables, request bodies, query/route parameters)
- **Database**: Firebase Firestore
- **Version Control & Repository Data**: GitHub GraphQL API
- **Styling**: Tailwind CSS v4

## Architecture

```
src/
├── app/
│   ├── page.tsx           # Main portfolio page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Tailwind CSS v4 + custom theme tokens
│   └── api/              # API route handlers (force-dynamic)
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
├── components/           # React frontend components
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ExperienceSection.tsx
│   ├── EducationSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ContactSection.tsx
│   ├── NewsletterSection.tsx
│   └── Footer.tsx
├── config/
│   └── env.ts            # Zod env validation
├── lib/
│   ├── api-error.ts      # Custom exception class
│   ├── api-response.ts   # Standard JSON wrappers
│   ├── catch-async.ts    # Async error handling decorator
│   ├── firebase.ts       # Lazy Firestore singleton
│   ├── github.ts         # GitHub GraphQL query client
│   └── api.ts            # Client-side API fetcher
└── modules/              # Feature modules (types, schema, repository, service, controller)
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

## Key Features

### Environment Validation (`src/config/env.ts`)
- Validates environment variables using Zod schemas at startup
- Safe-fails with clear error messages if keys are missing
- Variables: `NODE_ENV`, `PORT`, `GITHUB_PAT`, `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`

### Standardized API Responses
All API responses follow a consistent format:

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

### Async Interceptor
Route handlers are wrapped with `catchAsync()` to auto-handle all rejections.

### Lazy Firebase Initializer
Firebase is initialized lazily when a route starts execution, bypassing static pre-generation errors on Vercel with dummy env variables.

### GitHub GraphQL Wrapper
Configures a cacheable GraphQL client using React Cache to fetch repositories cleanly.

## API Routes

| Route | Method | Description |
|---|---|---|
| `/api/hero` | GET | Hero section (greeting, name, CTAs) |
| `/api/about` | GET | About section with bio and stats |
| `/api/skills` | GET | Skills grouped by category, sorted by level |
| `/api/experience` | GET | Work experience sorted by date |
| `/api/education` | GET | Education history sorted by date |
| `/api/projects` | GET | Projects with GitHub stats merged |
| `/api/github` | GET | Pinned GitHub repositories |
| `/api/contact-info` | GET | Contact details from Firestore |
| `/api/social-links` | GET | Social media links |
| `/api/contact` | POST | Submit a contact message (saved to `contact-messages`) |
| `/api/newsletter` | POST | Subscribe to newsletter (returns `409` on duplicates) |

## Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project with Firestore enabled
- A GitHub Personal Access Token

### Setup

1. Clone and install dependencies:
```bash
npm install
```

2. Create a `.env.local` file:
```env
GITHUB_PAT=your_github_pat
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
```

3. Download your Firebase service account key from **Project Settings > Service Accounts > Generate New Private Key** and save it as `serviceAccountKey.json` in the project root.

4. Seed the database:
```bash
node seed.js
```

5. Start the dev server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
```
