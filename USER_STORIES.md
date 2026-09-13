# User Stories — Portfolio

## Roles

- **Visitor**: Anyone browsing the portfolio.
- **Recruiter / Hiring Manager**: A visitor specifically evaluating the owner for opportunities.
- **Collaborator**: Someone interested in working with the owner.
- **Site Owner**: The developer maintaining and deploying the portfolio.

## Epics

| Epic | ID | Description | Stories |
|---|---|---|---|
| **Core Portfolio Pages** | EPIC-1 | Static pages that introduce the owner and provide utility pages. | US-001, US-004, US-009, US-010 |
| **Navigation & Theming** | EPIC-2 | Global navigation and visual preference controls. | US-002, US-003 |
| **Projects Showcase & Discovery** | EPIC-3 | Fetching, listing, and filtering projects and case studies. | US-005, US-006 |
| **Contact & Engagement** | EPIC-4 | Contact form, contact details, and resume download. | US-007, US-008, US-015 |
| **Quality, Accessibility & Performance** | EPIC-5 | Error handling, accessibility, SEO, and performance optimizations. | US-011, US-012, US-013, US-014 |

---

## US-001 — View the Home Page

**Epic:** Core Portfolio Pages (EPIC-1)

**As a** Visitor,  
**I want to** see a clear hero section and a summary of what the owner does,  
**so that** I can quickly understand the portfolio's purpose and decide where to go next.

### Acceptance Criteria

- The hero section displays a headline, description, and primary CTAs.
- Highlighted stats and current focus tags are visible.
- A "View My Work" CTA links to `/projects`.
- A "Download Resume" CTA downloads `/Full_Stack_Resume.pdf`.
- Up to 6 featured GitHub projects are displayed below the hero.
- The page has a unique `<title>` and meta description.

---

## US-002 — Navigate Using the Header

**Epic:** Navigation & Theming (EPIC-2)

**As a** Visitor,  
**I want to** navigate between pages from a persistent header,  
**so that** I can quickly reach the content I care about.

### Acceptance Criteria

- The header is fixed on all pages.
- The logo links to `/`.
- Navigation links include Home, About, Projects, Changelog, and Contact.
- The active route is visually highlighted.
- On mobile, a hamburger menu opens and closes a collapsible navigation panel.
- The mobile menu supports focus trapping, keyboard navigation, and closes with `Escape`.

---

## US-003 — Toggle Light / Dark Theme

**Epic:** Navigation & Theming (EPIC-2)

**As a** Visitor,  
**I want to** switch between light and dark themes,  
**so that** I can view the site comfortably in different lighting.

### Acceptance Criteria

- A theme toggle button is available in the header on desktop and mobile.
- Clicking the toggle switches the entire UI between light and dark modes.
- The selected theme is persisted in `localStorage` and restored on reload.
- The toggle icon reflects the current mode (sun for dark, moon for light).

---

## US-004 — View the About Page

**Epic:** Core Portfolio Pages (EPIC-1)

**As a** Recruiter / Hiring Manager,  
**I want to** read the owner's background, skills, experience, and achievements,  
**so that** I can evaluate whether they are a good fit for an opportunity.

### Acceptance Criteria

- The page shows a hero section with a short bio and a resume download button.
- A "Mission" section is displayed.
- Skills are listed in categorized cards with icons and descriptions.
- Work experience is listed with title, company, date, location, and duties.
- Achievements and core strengths are displayed.
- Learning goals are shown under Programming Languages, AI, and System Design.

---

## US-005 — Browse Projects

**Epic:** Projects Showcase & Discovery (EPIC-3)

**As a** Visitor,  
**I want to** see a list of the owner's projects and case studies,  
**so that** I can review their work and technical capabilities.

### Acceptance Criteria

- The projects page loads GitHub repositories for the configured user.
- Repositories are rendered as project cards with title, description, language, and links.
- Case studies are shown in a separate spotlight section with status badges.
- Each case study lists technologies, features, impact, and external links.
- A loading state is shown while data is fetched.
- A clear error state with retry action is shown if fetching fails.

---

## US-006 — Search and Filter Projects

**Epic:** Projects Showcase & Discovery (EPIC-3)

**As a** Visitor,  
**I want to** search and filter projects by keyword, language, and case-study status,  
**so that** I can find the most relevant work quickly.

### Acceptance Criteria

- A search input filters projects by name and description.
- Search is debounced (≈300 ms) to avoid excessive re-renders.
- A language dropdown filters by programming language.
- Status tabs (`All`, `In Progress`, `Completed`, `Exploration`) filter case studies.
- A "Reset" button clears all active filters.
- An empty state is shown when no projects match the current filters.

---

## US-007 — Submit the Contact Form

**Epic:** Contact & Engagement (EPIC-4)

**As a** Collaborator,  
**I want to** send a message through the contact form,  
**so that** I can inquire about work or collaboration.

### Acceptance Criteria

- The form contains fields for Name, Email, Subject, and Message.
- All fields are validated on submit.
  - Name: at least 2 characters.
  - Email: valid email format.
  - Subject: 3–100 characters.
  - Message: 10–1000 characters.
- The first invalid field receives focus when validation fails.
- Error messages are associated with fields via `aria-describedby`.
- On success, the form clears and a success message is announced.
- On failure, an error message is displayed and can be retried.
- Submissions are sent to Formspree using `VITE_FORMSPREE_FORM_ID`.

---

## US-008 — Access Contact Information

**Epic:** Contact & Engagement (EPIC-4)

**As a** Visitor,  
**I want to** see contact details and social links,  
**so that** I can connect through my preferred channel.

### Acceptance Criteria

- Contact page shows Email, Phone, and Location.
- Email and phone are clickable (`mailto:` and `tel:`).
- Social links for GitHub and LinkedIn open in a new tab.
- A contact image is displayed with lazy loading and proper `alt` text.

---

## US-009 — View the Changelog

**Epic:** Core Portfolio Pages (EPIC-1)

**As a** Visitor,  
**I want to** see a history of recent updates to the portfolio,  
**so that** I can understand how the project is evolving.

### Acceptance Criteria

- The `/changelog` page fetches `/changelog.json`.
- Each entry shows commit hash, date, subject, and body.
- Commits are categorized as Feature, Bug Fix, Improvement, or Security.
- A loading state, error state, and empty state are handled.

---

## US-010 — Handle Unknown Pages (404)

**Epic:** Core Portfolio Pages (EPIC-1)

**As a** Visitor,  
**I want to** see a friendly 404 page when I visit a non-existent route,  
**so that** I know the page is missing and can return home.

### Acceptance Criteria

- Unknown routes display a 404 page with `404` and "Page Not Found" messaging.
- A "Go back home" link returns the visitor to `/`.

---

## US-011 — Recover From Runtime Errors

**Epic:** Quality, Accessibility & Performance (EPIC-5)

**As a** Visitor,  
**I want to** see a clear error message and a way to retry when a page crashes,  
**so that** I am not stuck on a blank screen.

### Acceptance Criteria

- A global error boundary catches unhandled React errors.
- The error UI shows a friendly message and a "Try Again" button.
- In development, the error message and stack are visible.
- Errors are reported to Sentry when a DSN is configured.

---

## US-012 — Use the Portfolio with Assistive Technology

**Epic:** Quality, Accessibility & Performance (EPIC-5)

**As a** Visitor using a screen reader or keyboard,  
**I want to** navigate and interact with the site using assistive technology,  
**so that** the content is accessible to me.

### Acceptance Criteria

- Skip links are provided for main content and navigation.
- Interactive elements have visible focus indicators.
- Page changes are announced via an aria-live region.
- Form fields have associated labels, `aria-required`, `aria-invalid`, and `aria-describedby`.
- The mobile menu has `aria-expanded`, `aria-controls`, and focus trapping.
- Images and icons have meaningful `alt` text or are hidden from assistive tech.

---

## US-013 — Discover Pages via SEO

**Epic:** Quality, Accessibility & Performance (EPIC-5)

**As a** Site Owner,  
**I want** each page to have unique metadata and semantic markup,  
**so that** search engines and social platforms can index the portfolio correctly.

### Acceptance Criteria

- Each route has a unique `<title>` and `<meta name="description">`.
- The HTML `lang` attribute is set to `en`.
- Semantic elements (`<main>`, `<header>`, `<nav>`, `<section>`, `<h1>`) are used.
- Route-based content is rendered client-side with `react-helmet-async`.

---

## US-014 — Experience Fast Page Loads

**Epic:** Quality, Accessibility & Performance (EPIC-5)

**As a** Visitor,  
**I want** the portfolio to load quickly and work offline when possible,  
**so that** I have a smooth experience even on slow or unreliable networks.

### Acceptance Criteria

- Pages are lazy-loaded with a `Suspense` fallback.
- Images are lazy-loaded with `loading="lazy"` and `decoding="async"`.
- A loading spinner is shown during data fetches and initial page loads.
- PWA support is configured via Vite PWA plugin.
- Web Vitals are monitored and reported.

---

## US-015 — Download the Resume

**Epic:** Contact & Engagement (EPIC-4)

**As a** Recruiter / Hiring Manager,  
**I want to** download the owner's resume as a PDF,  
**so that** I can review it offline or share it with a hiring panel.

### Acceptance Criteria

- A "Download Resume" button is available on the Home and About pages.
- Clicking it downloads `/Full_Stack_Resume.pdf`.
- The link uses a `download` attribute.

---

## Notes

- These stories are derived from the current implementation in `src/pages`, `src/components`, `src/hooks`, `src/constants/routes.ts`, and `README.md`.
- Non-functional concerns (security, performance, maintainability) are represented as dedicated stories where they are directly user-visible.
