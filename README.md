# Modern Portfolio

A responsive developer portfolio built with React 19, TypeScript, Vite, and Tailwind CSS. It uses lazy-loaded routes, a PWA manifest, SEO meta tags, and Sentry error tracking.

## Features

- **Tech Stack:** React 19, TypeScript, Vite 7, Tailwind CSS 3.4
- **Type Safety:** Strict TypeScript with `noUncheckedIndexedAccess`
- **Performance:** Code splitting, lazy-loaded pages, and PWA offline support
- **SEO:** React Helmet Async, canonical links, Open Graph, JSON-LD, sitemap, robots.txt, and RSS feed
- **Error Tracking:** Sentry integration via `VITE_SENTRY_DSN`
- **PWA:** Vite PWA Plugin with generated service worker
- **Accessibility:** Skip-to-content link, focus-visible styles, ARIA labels, and live regions

## Tech Stack

- **Frontend:** React, React DOM, React Router v7
- **Styling:** Tailwind CSS, `tailwind-merge`, `clsx`
- **Build Tool:** Vite
- **Data:** Static data files, GitHub API via `@tanstack/react-query`
- **Error Tracking:** `@sentry/react`
- **PWA:** `vite-plugin-pwa`, Workbox

## Quick Start

### Prerequisites

- Node.js 18+
- npm (v9+) or yarn

### Installation

1. **Clone and install**

   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   npm install
   ```

2. **Start the development server**

   ```bash
   npm run dev
   ```

   Open the local URL shown in the terminal (usually `http://localhost:5173`).

3. **Type check and build**

   ```bash
   npm run typecheck
   npm run build
   npm run preview
   ```

## Environment Variables

Copy `.env.example` to `.env` and fill in your own values:

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Canonical, Open Graph, sitemap, and feed URLs |
| `VITE_SENTRY_DSN` | Sentry error tracking (optional) |
| `VITE_FORMSPREE_FORM_ID` | Contact form endpoint (optional) |

## Project Structure

```
src/
├── components/       # Reusable UI components
├── design-system/    # Design primitives (Heading, Text, Badge)
├── data/             # Static content (about, essays, case studies, social links)
├── hooks/            # Custom React hooks
├── pages/            # Route pages
├── styles/           # Global styles
├── types/            # TypeScript types
├── utils/            # Utility functions
├── App.tsx           # Root component
└── main.tsx          # Application entry point
```

## Customization

1. Update personal info in `src/data/` files.
2. Replace images and the resume PDF in `public/`.
3. Set `VITE_FORMSPREE_FORM_ID` for the contact form.

## Deployment

The repo includes `app.yaml` and `.gcloudignore` for Google App Engine. You can also deploy the `dist/` folder to any static host.

## License

This project is open source and available under the [BSD 3-Clause License](LICENSE).
