Portfolio Optimization Plan
Executive Summary
Your portfolio has a solid architectural foundation (clean modules, Zod validation, consistent patterns) but has several issues across three critical areas:
1. Data Integrity — Services validate data but return raw unvalidated objects (validation is effectively dead code)
2. Performance — 10+ redundant API calls per page load with no shared caching layer
3. Security — No rate limiting, no auth on write endpoints, stack trace leaks
Priority 1: CRITICAL — Fix Immediately
1.1 Services Return Raw Data Instead of Validated Data
Impact: Malformed Firestore data silently reaches clients with 200 status
Files: 12 service files across all modules
Current pattern (broken):
const parsed = Schema.safeParse(raw);
if (!parsed.success) console.error(...);
return raw; // ← Always returns raw, validation is dead code
Fix: Return parsed.data instead of raw, or use .parse() (throws on failure)
Affected files:
- hero/hero.service.ts:9-14
- about/about.service.ts:9-14
- skills/skills.service.ts:9-14, 21-26
- experience/experience.service.ts:9-20
- education/education.service.ts:9-20
- social-links/social-links.service.ts:8-13
- marquee/marquee.service.ts:9-14
- sections-config/sections-config.service.ts:8-13
- github/github.service.ts:28-33
- testimonials/testimonials.service.ts:8-15
- faq/faq.service.ts:8-15
- blog/blog.service.ts:8-15
1.2 Projects Service Has Zero Validation
Impact: No validation on assembled Project[] objects despite schemas existing
File: projects/projects.service.ts (entire file)
1.3 Contact Service Missing Output Validation
Impact: getContactInfo() returns raw Firestore data without validation
File: contact/contact.service.ts:6
1.4 GitHub Controller Unvalidated limit Parameter
Impact: parseInt("abc") → NaN propagates; parseInt("-5") → negative limit
File: github/github.controller.ts:8-9
Fix: Add Zod validation or manual bounds check:
const limit = Math.min(Math.max(parseInt(limitStr, 10) || 6, 1), 50);
1.5 Stack Trace Leak in ApiResponse.error
Impact: Error.stack serialized unconditionally in ApiError path
File: api-response.ts:47
Fix: Guard behind NODE_ENV === "development":
error: error instanceof Error 
  ? { message: error.message, ...(process.env.NODE_ENV === "development" && { stack: error.stack }) }
  : error,
1.6 Delete Redundant serviceAccountKey.json
Impact: Doubles attack surface for credential theft
File: serviceAccountKey.json (delete entirely)
Reason: Same credentials exist in .env.local, and firebase.ts reads from env vars only. Update seed scripts to use env vars.
Priority 2: HIGH — Fix Soon
2.1 Add Rate Limiting to Write Endpoints
Impact: Contact form and newsletter vulnerable to spam/abuse
Files: api/contact/route.ts, api/newsletter/route.ts
Fix: Add lightweight rate limiter (e.g., next-rate-limit or Vercel edge middleware)
2.2 Fix Duplicate Event Listeners in CustomCursor
Impact: Memory leak — anonymous functions cannot be removed
File: CustomCursor.tsx:72-73, 78-79
Fix: Use named function references for add/removeEventListener
2.3 Reduce Redundant API Calls
Impact: 5× getHero(), 3× getAbout(), 2× getSkills(), 2× getSocialLinks() per page load
Files: Multiple components
Fix options (choose one):
- Option A (Recommended): Introduce React Query / SWR for automatic deduplication + caching
- Option B: Create a React Context provider for shared data
- Option C: Move data fetching to server components, pass as props
2.4 Fix Inconsistent meta.count in Array Responses
Impact: Clients cannot reliably use meta.count
Files missing it:
- blog/blog.controller.ts:5-7
- faq/faq.controller.ts:5-7
- testimonials/testimonials.controller.ts:5-7
2.5 Add Security Headers
Impact: No CSP, HSTS, X-Frame-Options, X-Content-Type-Options
File: next.config.ts
2.6 Fix order Field Validation Inconsistency
Impact: Accepts negative floats for sort order
Files:
- testimonials/testimonials.schema.ts:9 — z.number().optional() → add .int().nonnegative()
- faq/faq.schema.ts:7 — same fix
- blog/blog.schema.ts:10 — same fix
2.7 Fix URL Validation Gaps
Impact: Invalid URLs pass validation
Files:
- hero/hero.schema.ts:10,12 — ctaPrimaryUrl, ctaSecondaryUrl use .min(1) → add .url()
- social-links/social-links.schema.ts:14 — url uses .min(1) → add .url()
Priority 3: MEDIUM — Improve Quality
3.1 Standardize Error Handling in Services
Impact: Inconsistent patterns across modules
Fix: Choose one approach:
- Use .parse() everywhere (throws, catches via catchAsync) — stricter
- Use .safeParse() + return parsed.data everywhere — defensive
3.2 Add Loading States to AboutSection
File: AboutSection.tsx:8-14 — renders nothing during fetch
3.3 Fix ServicesSection Loading Race Condition
File: ServicesSection.tsx:21-30 — loading flag only covers getSkills, not getServices
3.4 Add Accessibility Improvements
- NewsletterSection.tsx:71-78 — add <label> for email input
- TestimonialsSection.tsx:56-68 — add accessible label for star ratings
- Header.tsx:106-126 — add aria-expanded to hamburger button
- Header.tsx:129-157 — add focus trapping for mobile menu
- FAQSection.tsx:69-83 — add aria-hidden to chevron SVG
- BlogSection.tsx, TestimonialsSection.tsx, FAQSection.tsx — add id attributes for deep-linking
3.5 Fix Non-null Assertions on Optional endDate
Files:
- EducationSection.tsx:66 — edu.endDate!
- ExperienceSection.tsx:79 — exp.endDate!
3.6 Standardize Styling System
Impact: 3 components (Blog, FAQ, Testimonials) use bare Tailwind while 13 use CSS vars
Files: BlogSection.tsx, FAQSection.tsx, TestimonialsSection.tsx
3.7 Add Missing Input Type Exports
Files:
- projects/projects.schema.ts — no ProjectMetadataInput type
- github/github.schema.ts — no RepositoryDetailsInput type
3.8 Fix Date Format Validation
File: blog/blog.schema.ts:6 — date field only validates min(1), not format
3.9 Fix Testimonial Rating Non-integer
File: testimonials/testimonials.schema.ts:8 — missing .int() constraint
3.10 Fix experience vs education endDate Inconsistency
Files:
- experience/experience.schema.ts:12 — only allows date format
- education/education.schema.ts:11 — allows date OR "Present"
Fix: Align both to allow "Present" when isCurrent is true
Priority 4: LOW — Nice to Have
4.1 Extract Shared Utilities
- formatDate duplicated in EducationSection.tsx:127-133 and ExperienceSection.tsx:174-180
- NAV_ITEMS duplicated in Header.tsx:7-13 and Footer.tsx:7-12
4.2 Remove Unused Imports
- AboutSection.tsx:4 — unused motion import from framer-motion
4.3 Memoize Derived Data
- HeroSection.tsx:146-168 — marquee array rebuilt every render
- ServicesSection.tsx:140-141 — in-place .sort() on every render
- ProjectsSection.tsx:31-38 — filter + sort on every render
4.4 Fix CustomCursor API Call for Boolean Config
File: CustomCursor.tsx:59-65 — makes API call solely to check cursorEnabled
4.5 Move Site-Level Config Out of Hero Type
File: hero/hero.types.ts:12-15 — siteTitle, faviconUrl, brandName, cursorEnabled should be in a separate config module
4.6 Fix AboutStat.number Naming
File: about/about.types.ts:2 — number?: string is semantically confusing
4.7 Remove or Complete slug Route
File: app/[slug]/route.ts — stub with no real logic
4.8 Add Retry Mechanism for Failed Data Loads
Impact: Once request fails, section is invisible until page refresh
Implementation Order (Recommended)
Phase	Items
Phase 1	1.1-1.6 (Critical fixes)
Phase 2	2.1-2.7 (High priority)
Phase 3	3.1-3.10 (Medium)
Phase 4	4.1-4.8 (Low)
Total estimated effort: 11-15 hours





Proposed Plan (6 phases)
Phase 1: Server-Side Rendering (biggest impact — reduces 98s → ~3-5s)
Files: page.tsx, DataContext.tsx, layout.tsx
1. Convert page.tsx to a server component — fetch all data server-side using the repository functions directly (not via /api/* fetch)
2. Pass server data as props to a new PortfolioClient client component
3. Modify DataProvider to accept initialData prop — if provided, skip the useEffect fetch entirely
4. Remove DataProvider from layout.tsx — move it into the PortfolioClient wrapper since it only wraps page content
Result: Browser receives HTML with the image URL already embedded → image starts loading immediately → LCP drops to ~3-5s.
Phase 2: Image Optimization
Files: HeroSection.tsx, next.config.ts
1. Replace <img> with next/image in HeroSection
2. Add priority prop to the hero image (tells Next.js to preload it)
3. Configure next.config.ts with images.remotePatterns for the Firebase Storage domain
4. Add blur placeholder (optional — requires knowing image dimensions)
Phase 3: Font Optimization
Files: src/app/layout.tsx, globals.css
1. Migrate Google Fonts to next/font — self-hosts fonts, eliminates render-blocking @import
2. Replace @import url(...) in globals.css with @font-face declarations generated by next/font
3. Apply font variables to <html> or <body> class
Phase 4: Lazy Loading Below-Fold Sections
Files: PortfolioClient.tsx (or wherever sections render)
1. Wrap below-fold sections (services, experience, education, projects, testimonials, FAQ, blog, contact) in React.lazy() with <Suspense> boundaries
2. Keep hero, header, social sidebar eagerly loaded — they're above the fold
Phase 5: API Caching Headers
Files: next.config.ts, API route handlers
1. Add Cache-Control headers in next.config.ts for API routes (e.g., s-maxage=60, stale-while-revalidate)
2. Consider ISR for sections-config (rarely changes)
Phase 6: Framer Motion Tree-Shaking
Files: Components using framer-motion
1. Replace import { motion } from "framer-motion" with specific imports where possible
2. Verify the build doesn't include unused Framer Motion modules