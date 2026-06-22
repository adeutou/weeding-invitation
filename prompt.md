# Project Implementation Prompts

These prompts are designed to be run sequentially to build the Albert and Madame Wedding Platform from A to Z, strictly following the defined architecture.

## Prompt 1: Project Configuration, Tailwind & Botanical Identity
```text
Read @[CLAUDE.md] and follow it strickly and the technical intrcutlion. 
The design reference for this project is in the `_proto` folder — you must follow it strictly for all interfaces and design elements.

Task: Set up the foundational configuration and styling.
1. Update `tsconfig.json` to enforce strict mode as specified in the guidelines.
2. Configure Tailwind CSS (`tailwind.config.ts`) and `src/styles/globals.css` using the exact botanical identity, typography, and color tokens found in the `_proto` design reference.
3. Ensure no unauthorized dependencies are added (e.g., use `react-icons`, NEVER `lucide-react`, no shadcn/ui).
```

## Prompt 2: Database Schema & Vercel Blob Storage Setup
```text
Read @[CLAUDE.md] and follow it strickly and the technical intrcutlion. 
The design reference for this project is in the `_proto` folder — you must follow it strictly for all interfaces and design elements.

Task: Establish the data layer and storage utilities.
1. Create the complete Drizzle ORM schema in `src/server/db/schema.ts` covering RSVP, Guestbook, and Atelier modules.
2. Set up Vercel Blob utilities in `src/server/blob/upload.ts` for media uploads.
3. Create the API route for file uploads at `src/app/api/upload/route.ts`.
```

## Prompt 3: Core UI Primitives & App ContainerView
```text
Read @[CLAUDE.md] and follow it strickly and the technical intrcutlion. 
The design reference for this project is in the `_proto` folder — you must follow it strictly for all interfaces and design elements.

Task: Build the shared design system components and core error handling.
1. Build the shared UI primitives in `src/modules/ui/` (e.g., Button, Card, Input, Select, Modal, Toast). These must be custom-crafted functional components, perfectly matching `_proto`.
2. Create the `ContainerView` wrapper component. It must contain an ErrorBoundary and Suspense fallback. Ensure it includes a reusable loading state specifically targeted for the Atelier dashboard.
```

## Prompt 4: App Layouts & Experiential Modules (Audio, Swatch, Gallery)
```text
Read @[CLAUDE.md] and follow it strickly and the technical intrcutlion. 
The design reference for this project is in the `_proto` folder — you must follow it strictly for all interfaces and design elements.

Task: Build global layouts and the cinematic visual/audio features.
1. Create `Header`, `Footer`, and `Navigation` components in `src/components/`.
2. Build the Audio module (`src/modules/audio/`) using the Web Audio API for the piano chord synthesizer.
3. Build the Swatch module (`src/modules/swatch/`) for dress code guidance.
4. Build the Gallery module (`src/modules/gallery/`) featuring the dynamic 3D card carousel.
```

## Prompt 5: Interactive Modules (RSVP & Guestbook)
```text
Read @[CLAUDE.md] and follow it strickly and the technical intrcutlion. 
The design reference for this project is in the `_proto` folder — you must follow it strictly for all interfaces and design elements.

Task: Implement the core guest interactions.
1. Define strict TypeScript types in `@types` for RSVP and Guestbook.
2. Write the Drizzle database queries (`src/server/db/queries/`) and Server Actions (`src/server/actions/`).
3. Build the views and custom hooks for the RSVP form and the Guestbook (with real-time/optimistic updates) in their respective `src/modules/` folders.
```

## Prompt 6: Atelier Admin Dashboard & Page Assembly
```text
Read @[CLAUDE.md] and follow it strickly and the technical intrcutlion. 
The design reference for this project is in the `_proto` folder — you must follow it strictly for all interfaces and design elements.

Task: Build the administrative portal and assemble all app pages.
1. Build the Atelier dashboard views (`src/modules/atelier/views/`) for RSVP management, guestbook moderation, and gallery updates.
2. Assemble all route pages in the `src/app/` folder (`page.tsx`, `rsvp/page.tsx`, `guestbook/page.tsx`, `gallery/page.tsx`, `atelier/page.tsx`).
3. CRITICAL: Ensure NO client components are directly placed in the `app` folder. All page components must be Server Components, and every route must be securely wrapped by the `ContainerView`.
```
