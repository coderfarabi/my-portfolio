# Implementation Plan: Portavia-Inspired Frontend Redesign

## Overview
A complete visual overhaul of all 13 React components and `globals.css` to match the **Portavia** Framer template aesthetic. The backend API routes, Zod schemas, and data contracts remain **untouched**.

## Design System (from Portavia)

| Token | Dark Value | Purpose |
|---|---|---|
| Background | `#0f0f0f` | Page background |
| Surface | `#1a1a1b` | Card backgrounds |
| Accent | `#d0ff71` | Lime-green CTAs, highlights |
| Text | `#ffffff` | Primary text |
| Text Secondary | `#b5b5b5` | Subheadings, labels |
| Text Muted | `#8f8f8f` | Captions, placeholders |
| Border | `#2a2a2a` | Card borders |
| Display Font | `Antonio` | Headings |
| Body Font | `Inter` | Body text |

## Proposed Changes

---

### Core Design System

#### [MODIFY] [globals.css](file:///e:/my_world/my_folder/projects/portfolio/src/app/globals.css)
- Update `@theme` colors to Portavia palette (lime `#d0ff71` accent, near-black background)
- Add `Antonio` font (already on Google Fonts) alongside Inter
- Add new animation keyframes: `slide-in-left`, `slide-in-right`, `counter-up`, `marquee`
- Add utility classes: `.btn-primary`, `.btn-ghost`, `.tag`, `.section-wrapper`

#### [MODIFY] [layout.tsx](file:///e:/my_world/my_folder/projects/portfolio/src/app/layout.tsx)
- Add `Antonio` to the Google Fonts preconnect
- Update metadata title/description

---

### Section Components

#### [MODIFY] [Header.tsx](file:///e:/my_world/my_folder/projects/portfolio/src/components/Header.tsx)
- Sticky glassmorphism navbar with `backdrop-blur`
- Left: text logo with accent-colored dot
- Center: smooth-scroll nav links (Home, About, Work, Contact)
- Right: "Let's Talk" pill button in accent color
- Mobile: hamburger menu with slide-in drawer

#### [MODIFY] [HeroSection.tsx](file:///e:/my_world/my_folder/projects/portfolio/src/components/HeroSection.tsx)
- Full-screen asymmetric layout: large bold `Antonio` heading on left, avatar card on right
- Avatar in a tall rounded card (not circle) with a decorative lime border
- Status badge (`Available for work`) with pulsing green dot
- Animated staggered entrance using Framer Motion
- Scrolling skill/tech marquee ticker at the bottom of the section

#### [MODIFY] [AboutSection.tsx](file:///e:/my_world/my_folder/projects/portfolio/src/components/AboutSection.tsx)
- 2-column layout: bio text on left, animated stats counters on right
- Stats: Years of Experience, Projects Completed, Happy Clients — bold number + label
- Clean border-separated stat cards

#### [MODIFY] [ServicesSection.tsx](file:///e:/my_world/my_folder/projects/portfolio/src/components/ServicesSection.tsx)
- Grid of service cards (2×3 or 3×2)
- Each card: numbered label, icon, title, short description
- Hover: accent border glow + subtle lift with `translateY(-4px)`

#### [MODIFY] [ExperienceSection.tsx](file:///e:/my_world/my_folder/projects/portfolio/src/components/ExperienceSection.tsx)
- Vertical timeline layout with connecting line
- Each entry: role (bold), company, date range, location pill, and bullet descriptions

#### [MODIFY] [EducationSection.tsx](file:///e:/my_world/my_folder/projects/portfolio/src/components/EducationSection.tsx)
- Same timeline pattern as Experience for visual consistency
- Degree, institution, field of study, grade

#### [MODIFY] [ProjectsSection.tsx](file:///e:/my_world/my_folder/projects/portfolio/src/components/ProjectsSection.tsx)
- Alternating large rows: image left / text right (and reversed)
- Each row: category tag, project title in Antonio, description, tech badges, star/fork counts, demo + repo links
- Image has zoom-on-hover effect

#### [MODIFY] [TestimonialsSection.tsx](file:///e:/my_world/my_folder/projects/portfolio/src/components/TestimonialsSection.tsx)
- Horizontal auto-scrolling marquee of testimonial cards (static data since no API)
- Each card: quote, star rating, client name + company

#### [MODIFY] [FAQSection.tsx](file:///e:/my_world/my_folder/projects/portfolio/src/components/FAQSection.tsx)
- Full-width accordion with animated expand/collapse (Framer Motion `AnimatePresence`)
- Numbered questions, accent-colored expand icon

#### [MODIFY] [BlogSection.tsx](file:///e:/my_world/my_folder/projects/portfolio/src/components/BlogSection.tsx)
- 3-column grid of blog insight cards (static placeholder data)
- Each card: category tag, title, date, read time, arrow CTA

#### [MODIFY] [ContactSection.tsx](file:///e:/my_world/my_folder/projects/portfolio/src/components/ContactSection.tsx)
- Split layout: left info panel (email, availability status, social icons from API), right contact form
- Form posts to `/api/contact` with loading state + success/error toast

#### [MODIFY] [NewsletterSection.tsx](file:///e:/my_world/my_folder/projects/portfolio/src/components/NewsletterSection.tsx)
- Centered banner with large heading and inline email input + subscribe button
- Posts to `/api/newsletter` with duplicate-email handling

#### [MODIFY] [Footer.tsx](file:///e:/my_world/my_folder/projects/portfolio/src/components/Footer.tsx)
- 3-column: brand + tagline, nav links, social links from API
- Bottom bar: copyright + "Back to top" button

---

## Verification Plan

### Manual Verification
- Run `npm run dev` and open `http://localhost:3000`
- Verify all sections render without console errors
- Verify API data loads correctly in each section
- Verify Framer Motion animations play on scroll
- Verify contact form POST works
- Verify mobile responsiveness on 375px viewport
