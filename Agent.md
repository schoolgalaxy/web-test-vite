## Agent Context: web-test-vite

This document provides a concise operational context for an assistant/agent working on this codebase. It explains the app’s purpose, architecture, core layout regions, data flow, and the folder structure to help you navigate and extend the project safely.

## Purpose
- A learning platform built with React + Vite and AWS Amplify.
- UX is organized around a persistent shell with navigation and side panels.
- Content in the center panel changes based on selections and filters in the left sidebar; the right sidebar is used for engagement widgets and cross-selling placements.

## Tech Stack
- React (TypeScript) + Vite frontend in `src/`
- AWS Amplify backend in `amplify/` (Auth, Data, Storage, Lambda function(s))
- Static assets and JSON-driven content in `src/assets/`

## App Shell Layout
- Navbar: Top-level navigation and global actions.
- LeftSidebar: Navigation links and filters controlling which component renders in the center panel.
- Center Panel: Primary content area; renders screens, lists, quizzes, or tests based on routing and left sidebar selections.
- RightSidebar: Engagement widgets, events, and cross-selling/ads components.

## Data Flow & Behavior
- LeftSidebar emits selections (links, filters) → these update routing/state → Center Panel re-renders appropriate component.
- RightSidebar content is largely independent of center content and can be updated without affecting primary navigation.
- Content for quizzes and topics is backed by JSON files under `src/assets/data/`.
- AWS Amplify services (Auth/Data/Storage/Functions) live under `amplify/` and integrate into the frontend as needed.

## Routing
- Client-side routing defined in `src/components/routes.tsx` determines which view loads in the center panel.
- Feature areas (Animals, Birds, MCQ, Quizzes, Feedback, etc.) each have list and test views mounted by route.

## Key Frontend Components (src/components)
- `MainLayout.tsx` / `TestLayout.tsx`: Page layouts composing Navbar, LeftSidebar, CenterSection, RightSidebar.
- `Navbar.tsx`: Top navigation.
- `LeftSidebar.tsx`: Source of navigation/filter changes controlling center panel content.
- `CenterSection.tsx` / `Home.tsx` / Feature pages: Primary content region.
- `RightSidebar.tsx`: Engagement widgets and ads placements.
- Feature groups:
  - MCQ: `mcq/McqList.tsx`, `mcq/McqTest.tsx`
  - Quizzes: `quizzes/QuizList.tsx`, `quizzes/QuizTest.tsx`
  - Feedback: `feedback/FeedbackLayout.tsx`, `feedback/FeedbackForm.tsx`
  - Other: `About.tsx`, `Explore.tsx`, `Banner.tsx`, `LoginScreen.tsx`

## Assets and Data (src/assets)
- Styles: `assets/css/*` for feature-specific styles.
- JSON content: `assets/data/*` for quizzes, animals, birds, and other learning content.

## Utilities (src/util)
- `analytics.ts`: Web analytics helpers.
- `reportWebVitals.ts`: Vitals reporting.

## Backend (amplify)
- `auth/`: Authentication resources.
- `data/`: Data models/resources.
- `storage/`: Storage configuration.
- `function/sendFeedbackEmail/`: Lambda for feedback email.
- `backend.ts`, `tsconfig.json`, and Amplify config files.

## Folder Structure Overview
```
/Users/shashi/Downloads/code/web-test-vite/
  amplify/               # Amplify backend (Auth/Data/Storage/Functions)
  dist/                  # Production build output
  public/                # Public static assets
  src/                   # Frontend application (React + TS + Vite)
    assets/              # CSS and JSON content
      css/
      data/
    components/          # UI components and feature modules
      animals/, birds/, mcq/, quizzes/, feedback/
    util/                # Analytics and web vitals
    main.tsx             # App bootstrap
    App.tsx              # Root app component
    index.css            # Global styles
  index.html             # Vite entry HTML
  vite.config.ts         # Vite configuration
```

## Conventions & Notes
- Keep LeftSidebar as the single source of truth for navigation/filter changes that affect center content.
- RightSidebar should not block or interfere with the main content flow; treat it as complementary and safe-to-ignore for core tasks.
- Prefer colocating feature-specific styles and components within their feature folders.
- When adding new learning domains (e.g., new categories), mirror the pattern: `FeatureList.tsx` + `FeatureTest.tsx` and wire them in `routes.tsx`.
- Backend changes under `amplify/` should be deployed via Amplify tooling; keep frontend contracts (types, endpoints) in sync.
- Prefer `import.meta.glob` for batch importing JSON content and images where applicable.

### Vite imports: `import.meta.glob` (JSON and images)
Use Vite’s glob import to load groups of JSON files or images without manual import lists.

- JSON (eager load into memory):
```ts
const modules = import.meta.glob('/src/assets/data/**/*.json', { eager: true });
const jsonByPath: Record<string, unknown> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [path, (mod as any).default])
);
```

- Images (get URLs at build-time):
```ts
// URLs resolved at build time; use eager for immediate availability
const imageUrls = import.meta.glob('/src/assets/**/*.{png,jpg,jpeg,svg,gif}', {
  eager: true,
  query: '?url'
});
// Example usage: (imageUrls['/src/assets/react.svg'] as string)
```

- Lazy loading (on demand):
```ts
const lazyJson = import.meta.glob('/src/assets/data/**/*.json');
// await lazyJson['/src/assets/data/animals/lion.json']();
```

## Quick Start (Local)
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

## What this Agent Should Optimize For
- Clear navigation from LeftSidebar → Center Panel render.
- Non-intrusive RightSidebar enhancements (engagement/cross-sell) with graceful degradation.
- Fast iteration: JSON-backed content enables quick updates without backend changes.
- Accessibility and performance within the persistent app shell.

## Out of Scope
- This file is local documentation and should not be committed or deployed.
