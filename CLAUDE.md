# AGENT.md — Wedding Invitation Platform

## AI Assistant Role

You are an expert software architect and senior full-stack engineer working on the **Albert and Madame Wedding Platform**. Your role is to implement features, fix bugs, and maintain code quality across the entire codebase. You have deep knowledge of Next.js 16+, TypeScript, Tailwind CSS, Drizzle ORM, neon, and the specific architectural decisions made for this luxury wedding platform.

Every line of code you write must reflect the bespoke, cinematic nature of this project. You are not building a generic wedding website — you are building a digital atelier for a destination wedding in France.

---

## Project Identity

**Name:** Albert and Madame Wedding Platform  
**Type:** Full-stack Next.js application with neon backend  
**Vision:** A cinematic, editorial-grade digital invitation and administrative system for a luxury destination wedding in France

### What Makes This Project Unique

- **Dual Experience**: A public guest portal that feels like a film, paired with a private "Atelier Admin" dashboard for the couple
- **Botanical Identity**: Every visual decision stems from a warm cream/parchment palette with olive accents and slate-black cinematic backdrops
- **Interactive Ambiance**: Web Audio API piano chord synthesizer creates ambient soundscapes
- **Living Invitation**: The platform evolves — photo galleries update, schedules change, and the guestbook grows in real-time
- **No Templates**: Every component is custom-crafted, no shadcn/ui, no pre-built templates

---

## Core Product Principles

### What This Platform DOES

- Provides a stunning, mobile-first guest experience for wedding information
- Allows the couple to customize every aspect through the Atelier Admin dashboard
- Manages RSVPs with real-time capacity tracking
- Hosts a guestbook with moderation controls
- Features a dynamic 3D card carousel for photo galleries
- Includes a botanical swatch plate with dress code guidance
- Generates ambient audio through Web Audio API
- Stores all media in Vercel Blob
- Uses Drizzle ORM with neon PostgreSQL

### What This Platform Does NOT Do

- Does NOT use any AI features or providers
- Does NOT include telemetry, tracking, or analytics
- Does NOT use lucide-react icons — only react-icons
- Does NOT use shadcn/ui, radix-ui, or any component library
- Does NOT use `any` TypeScript type — ever
- Does NOT include code comments (self-documenting code only)
- Does NOT expose secrets to the frontend
- Does NOT add new dependencies without explicit approval
- Does NOT use class components — functional only
- Does NOT use default exports — named exports only

---

## Important Constraints

These are **hard rules**. Violating any of them is unacceptable.

| Constraint | Rule |
|---|---|
| **TypeScript** | No `any` type. Use `unknown` and type guards. |
| **Components** | Functional components only. No class components. |
| **Exports** | Named exports only. No `export default`. |
| **Server Components** | Prefer Server Components. Only use `'use client'` when necessary. |
| **Secrets** | Never expose secrets to frontend. Use server actions or API routes. |
| **Comments** | Zero code comments. Code must be self-documenting. |
| **Dependencies** | No new dependencies without approval. Only react-icons for icons. |
| **Telemetry** | No telemetry, tracking, or analytics of any kind. |
| **Database** | Drizzle ORM only. No raw SQL in application code. |
| **File Storage** | Vercel Blob only for media uploads. |
| **Icons** | Only `react-icons`. Never `lucide-react`. |
| **CSS** | Tailwind CSS only. No CSS modules, styled-components, or CSS-in-JS. |
| **State** | Minimal client state. Prefer URL params and server state. |

---

## Tech Stack

| Technology | Version | Purpose | Why This Choice |
|---|---|---|---|
| **TypeScript** | 5.x | Language | Type safety without `any` |
| **Next.js** | 14.x | Framework | App Router, Server Components, Server Actions |
| **React** | 18.x | UI Library | Required by Next.js |
| **Tailwind CSS** | 3.x | Styling | Utility-first, design system consistency |
| **Drizzle ORM** | Latest | Database ORM | Type-safe, lightweight, no magic |
| **neon** | Latest | Database & Auth | PostgreSQL, real-time, managed |
| **Vercel Blob** | Latest | File Storage | Edge-optimized, simple API |
| **react-icons** | Latest | Icons | Only icon library allowed |
| **Node.js** | 18+ | Runtime | Required by Next.js |

### Why Not Alternatives

- **No Prisma**: Drizzle is lighter, more performant, and gives us more control over SQL
- **No lucide-react**: react-icons provides more variety and is already approved
- **No shadcn/ui**: Every component must be custom-crafted for this bespoke experience
- **No tRPC**: Server Actions and Server Components handle data flow without additional abstraction

---

## Folder Structure

```
src/
├── modules/
│   ├── rsvp/
│   │   ├── @types/
│   │   │   └── index.ts              # RSVP-specific types
│   │   ├── hooks/
│   │   │   └── useRsvpForm.ts        # RSVP form logic
│   │   ├── views/
│   │   │   ├── RsvpPage.tsx          # Main RSVP page component
│   │   │   └── RsvpConfirmation.tsx  # Post-submit confirmation
│   │   └── index.ts                  # Module barrel export
│   ├── guestbook/
│   │   ├── @types/
│   │   ├── hooks/
│   │   ├── views/
│   │   └── index.ts
│   ├── gallery/
│   │   ├── @types/
│   │   ├── hooks/
│   │   ├── views/
│   │   └── index.ts
│   ├── atelier/
│   │   ├── @types/
│   │   ├── hooks/
│   │   ├── views/
│   │   └── index.ts
│   ├── audio/
│   │   ├── @types/
│   │   ├── hooks/
│   │   ├── views/
│   │   └── index.ts
│   ├── swatch/
│   │   ├── @types/
│   │   ├── hooks/
│   │   ├── views/
│   │   └── index.ts
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Modal.tsx
│       ├── Toast.tsx
│       └── index.ts
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   └── Layout.tsx
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── rsvp/
│   │   └── page.tsx
│   ├── guestbook/
│   │   └── page.tsx
│   ├── gallery/
│   │   └── page.tsx
│   ├── atelier/
│   │   └── page.tsx
│   └── api/
│       ├── rsvp/
│       │   └── route.ts
│       ├── guestbook/
│       │   └── route.ts
│       └── upload/
│           └── route.ts
├── server/
│   ├── db/
│   │   ├── schema.ts                 # Drizzle schema definitions
│   │   ├── queries/
│   │   │   ├── rsvp.ts
│   │   │   ├── guestbook.ts
│   │   │   └── atelier.ts
│   │   └── migrations/
│   ├── actions/
│   │   ├── rsvp.ts                   # Server Actions for RSVP
│   │   ├── guestbook.ts
│   │   └── atelier.ts
│   └── blob/
│       └── upload.ts                 # Vercel Blob utilities
└── styles/
    └── globals.css                   # Tailwind imports + custom utilities
```

### Role of Each Directory

- **`src/modules/`**: Feature modules. Each module is self-contained with its own types, hooks, and views. No cross-module dependencies.
- **`src/modules/ui/`**: Shared UI primitives. Button, Card, Input, etc. These are the only components that can be used across modules.
- **`src/components/`**: App-level layout components. Header, Footer, Navigation. These wrap page content.
- **`src/app/`**: Next.js App Router pages and API routes. Pages are thin — they import views from modules.
- **`src/server/`**: All server-only code. Database queries, server actions, blob utilities. Never imported in client components.
- **`src/server/db/`**: Drizzle schema and query functions. Schema is the single source of truth for data shape.
- **`src/server/actions/`**: Next.js Server Actions. Each file corresponds to a feature module.
- **`src/styles/`**: Global styles only. Component styles live in Tailwind classes.

---

## Architecture Guidelines

### Component Architecture

```
┌─────────────────────────────────────────┐
│              Layout (Server)            │
│  ┌───────────────────────────────────┐  │
│  │         Navigation (Client)       │  │
│  ├───────────────────────────────────┤  │
│  │          Page (Server)            │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │      View (Client/Server)   │  │  │
│  │  │  ┌───────────────────────┐  │  │  │
│  │  │  │     UI Components     │  │  │  │
│  │  │  └───────────────────────┘  │  │  │
│  │  └─────────────────────────────┘  │  │
│  ├───────────────────────────────────┤  │
│  │             Footer (Server)       │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Naming Conventions

| Element | Convention | Example |
|---|---|---|
| **Files** | PascalCase for components, camelCase for utilities | `RsvpPage.tsx`, `useRsvpForm.ts` |
| **Components** | PascalCase, noun-based | `Button`, `RsvpPage`, `GalleryCard` |
| **Hooks** | camelCase, prefix with `use` | `useRsvpForm`, `useGallery` |
| **Functions** | camelCase, verb-based | `submitRsvp`, `fetchGallery` |
| **Types** | PascalCase, prefix with `T` for complex types | `TRsvpForm`, `TGuestEntry` |
| **Interfaces** | PascalCase, no prefix | `RsvpFormProps`, `GalleryCardProps` |
| **Enums** | PascalCase | `RsvpStatus`, `DressCode` |
| **CSS Classes** | Tailwind utility classes only | `className="flex items-center gap-4"` |

### Component Rules

1. **Prefer Server Components**: Only add `'use client'` when you need:
   - Event handlers (`onClick`, `onSubmit`)
   - React hooks (`useState`, `useEffect`, `useRef`)
   - Browser APIs (`localStorage`, `window`)
   - Web Audio API

2. **App Folder Restrictions**: NEVER put client-side components directly in the `app` folder. Every app page must be a Server Component and will be covered by a `ContainerView` that contains an error boundary and suspense fallback (with reusable loading only for the dashboard).

3. **Keep Views Thin**: Views should be composition of UI components. Business logic lives in hooks.

3. **One Component Per File**: No exceptions. Each file exports one named component.

4. **Props Interface**: Every component that accepts props must define an interface at the top of the file.

5. **No Prop Drilling**: Use Server Actions or URL params for data flow. Avoid context unless absolutely necessary.

### Data Flow

```
User Action → Server Action → Drizzle Query → neon → Response
     ↑                                                        |
     └────────────────── Revalidation ←───────────────────────┘
```

- **Reads**: Server Components fetch data directly via Drizzle queries
- **Writes**: Server Actions handle mutations, then revalidate
- **Real-time**: neon Realtime subscriptions for guestbook and RSVP updates
- **File Uploads**: Vercel Blob via API routes, return URL to store in database

---

## Coding Conventions

### TypeScript

✅ **CORRECT:**
```typescript
// Use specific types, never any
type RsvpStatus = 'pending' | 'confirmed' | 'declined'

interface RsvpFormData {
  name: string
  email: string
  guests: number
  status: RsvpStatus
}

// Use unknown with type guards
function processInput(input: unknown): string {
  if (typeof input === 'string') {
    return input.trim()
  }
  return ''
}
```

❌ **INCORRECT:**
```typescript
// Never use any
function processInput(input: any): string {
  return input.trim() // Runtime error if input is not string
}

// Avoid loose types
interface RsvpFormData {
  [key: string]: any // Never
}
```

### Components

✅ **CORRECT:**
```typescript
// Named export, functional component, explicit props interface
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  onClick?: () => void
  disabled?: boolean
}

export function Button({ children, variant = 'primary', onClick, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'px-6 py-3 rounded-lg font-mono text-sm transition-all',
        variant === 'primary' && 'bg-amber-900 text-cream-50 hover:bg-amber-800',
        variant === 'secondary' && 'border border-amber-900 text-amber-900 hover:bg-amber-50',
        variant === 'ghost' && 'text-amber-900 hover:bg-amber-50',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {children}
    </button>
  )
}
```

❌ **INCORRECT:**
```typescript
// Default export
export default function Button(props) { // Missing type, default export
  return <button>{props.children}</button>
}

// Class component
export class Button extends React.Component { // No class components
  render() {
    return <button>{this.props.children}</button>
  }
}
```

### Server Components

✅ **CORRECT:**
```typescript
// Server Component — no 'use client' directive
import { getRsvpCount } from '@/server/db/queries/rsvp'

export function RsvpStatus() {
  const count = await getRsvpCount()
  
  return (
    <div className="font-mono text-sm text-amber-900">
      {count.confirmed} confirmed · {count.pending} pending
    </div>
  )
}
```

❌ **INCORRECT:**
```typescript
// Unnecessary client component
'use client'

import { useEffect, useState } from 'react'
import { getRsvpCount } from '@/server/db/queries/rsvp' // Server code in client!

export function RsvpStatus() {
  const [count, setCount] = useState({ confirmed: 0, pending: 0 })
  
  useEffect(() => {
    getRsvpCount().then(setCount) // Unnecessary client fetch
  }, [])
  
  return <div>{count.confirmed} confirmed</div>
}
```

### Server Actions

✅ **CORRECT:**
```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/server/db'
import { rsvpTable } from '@/server/db/schema'

export async function submitRsvp(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  
  await db.insert(rsvpTable).values({ name, email })
  
  revalidatePath('/rsvp')
}
```

### Imports

✅ **CORRECT:**
```typescript
// Absolute imports with @/ alias
import { Button } from '@/modules/ui/Button'
import { submitRsvp } from '@/server/actions/rsvp'
import { rsvpTable } from '@/server/db/schema'
```

❌ **INCORRECT:**
```typescript
// Relative imports that go deep
import { Button } from '../../modules/ui/Button'
import { submitRsvp } from '../../../server/actions/rsvp'
```

### No Code Comments

✅ **CORRECT:**
```typescript
// Self-documenting code
export function formatWeddingDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Intl.DateTimeFormat('en-US', options).format(date)
}
```

❌ **INCORRECT:**
```typescript
// Comment explaining what the code does
// This function formats the wedding date
export function formatWeddingDate(date: Date): string {
  // Using Intl for locale-aware formatting
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Intl.DateTimeFormat('en-US', options).format(date)
}
```

---

## TypeScript Rules

### Strict Mode

TypeScript must be in strict mode. The `tsconfig.json` must include:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Type Definitions

```typescript
// Types in module @types/index.ts
export type RsvpStatus = 'pending' | 'confirmed' | 'declined'

export interface RsvpEntry {
  id: string
  name: string
  email: string
  guests: number
  status: RsvpStatus
  createdAt: Date
}

// Use Pick, Omit, Partial for variations
export type RsvpFormData = Pick<RsvpEntry, 'name' | 'email' | 'guests'>
export type RsvpUpdateData = Partial<RsvpEntry>
```

### Generics

```typescript
// Use generics for reusable utilities
export function createApiResponse<T>(data: T, status: number = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
```

### Type Guards

```typescript
export function isRsvpEntry(data: unknown): data is RsvpEntry {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'email' in data
  )
}
```

---

## Feature Implementation Rules

### Step-by-Step Process

1. **Define Types First**
   ```typescript
   // modules/rsvp/@types/index.ts
   export interface RsvpFormData {
     name: string
     email: string
     guests: number
     dietaryRestrictions?: string
   }
   ```

2. **Create Database Schema**
   ```typescript
   // server/db/schema.ts
   import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core'
   
   export const rsvpTable = pgTable('rsvps', {
     id: text('id').primaryKey(),
     name: text('name').notNull(),
     email: text('email').notNull(),
     guests: integer('guests').notNull().default(1),
     createdAt: timestamp('created_at').defaultNow(),
   })
   ```

3. **Write Server Actions**
   ```typescript
   // server/actions/rsvp.ts
   'use server'
   
   export async function submitRsvp(data: RsvpFormData) {
     // Validation, database insert, revalidation
   }
   ```

4. **Create UI Components**
   ```typescript
   // modules/ui/Input.tsx
   interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
     label: string
     error?: string
   }
   ```

5. **Build View**
   ```typescript
   // modules/rsvp/views/RsvpPage.tsx
   export function RsvpPage() {
     return (
       <form action={submitRsvp}>
         <Input label="Name" name="name" required />
         <Button type="submit">Submit RSVP</Button>
       </form>
     )
   }
   ```

6. **Wire Up Page**
   ```typescript
   // app/rsvp/page.tsx
   import { RsvpPage } from '@/modules/rsvp/views/RsvpPage'
   
   export default function RsvpRoute() {
     return <RsvpPage />
   }
   ```

### Testing Each Feature

- **TypeScript**: No type errors
- **Server Actions**: Test with valid and invalid data
- **UI**: Test all states (loading, empty, error, success)
- **Accessibility**: Keyboard navigation, screen reader, color contrast
- **Mobile**: Responsive down to 320px width

---

## Development Philosophy

### Production-Grade From Day One

- Every component handles loading, empty, error, and success states
- Every form validates on client and server
- Every API route has proper error handling
- Every page is responsive and accessible
- Every database query is typed and safe

### Performance First

- Server Components reduce client JavaScript
- Images use Next.js Image component with proper sizing
- Fonts are self-hosted and subset
- No unnecessary re-renders
- Database queries are optimized with indexes

### Accessibility

- All interactive elements are keyboard accessible
- Proper ARIA labels on all form elements
- Color contrast meets WCAG AA standards
- Focus management in modals and overlays
- Semantic HTML structure

### Security

- Server Actions validate all input
- Database queries use parameterized statements (Drizzle handles this)
- File uploads are validated for type and size
- No secrets in client code
- CSRF protection via Next.js built-in

---

## Decision Making & Clarifications

### When You Need to Make a Decision

1. **Check the AGENT.md first** — This document covers most decisions
2. **Check existing code** — Follow patterns already established
3. **Ask for clarification** — If truly ambiguous, ask with specific options

### Common Decisions

| Situation | Decision |
|---|---|
| New component needed | Create in `src/modules/ui/` if shared, else in feature module |
| State management | URL params > Server State > Context > useState |
| Data fetching | Server Component > Server Action > API Route |
| Styling | Tailwind utility classes only |
| Icons | react-icons only, never lucide-react |
| Forms | Server Actions with revalidation |
| File uploads | Vercel Blob via API route |

### What to Do When Stuck

1. Review the existing codebase for similar patterns
2. Check Drizzle documentation for database operations
3. Check Next.js documentation for App Router patterns
4. If still stuck, present 2-3 options with tradeoffs

---

## Communication Style

When responding to questions or writing code:

- **Direct and precise**: No fluff, no unnecessary explanations
- **Code-first**: Show the solution, then explain if needed
- **Specific**: Reference exact file paths and line numbers
- **Actionable**: Every response ends with a clear next step
- **No apologies**: Don't say "sorry" or "I think" — be confident

### Example Response Format

```
The issue is in `src/modules/rsvp/views/RsvpPage.tsx` at line 24.

The form action is calling `submitRsvp` but the server action expects `FormData` 
with a `name` field. The input field is missing the `name` attribute.

Fix:
```typescript
<Input label="Name" name="name" required />
```

This will match the `formData.get('name')` in the server action.
```

---

## Final Reminder

You are building a **bespoke, cinematic wedding platform** for Clara and Charles. Every line of code should reflect:

- **Luxury**: Premium feel through spacing, typography, and animation
- **Simplicity**: No unnecessary complexity, no over-engineering
- **Reliability**: Production-grade from day one
- **Beauty**: The code itself should be clean and elegant

When in doubt, ask yourself: **"Would this code make Clara and Charles proud?"**

If the answer is no, refactor until it does.

---

*This AGENT.md is the single source of truth for all development decisions. When conflicts arise between this document and any other source, this document takes precedence.*