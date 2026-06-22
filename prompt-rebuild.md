# Prompt: Build the Atelier Admin Dashboard Modal — A to Z

## Context

This is the **Albert & Madame Wedding Platform** (Next.js 15, React 19, TypeScript strict, Tailwind CSS v4, Drizzle ORM + Neon PostgreSQL).

### Hard Rules (CLAUDE.md)
- Named exports ONLY — no `export default` except Next.js page routes
- No `any` type — use `unknown` + type guards
- No lucide-react — react-icons/fi only
- No framer-motion — CSS transitions + Tailwind + state-driven class toggling
- No comments in code
- `'use client'` only when strictly necessary
- Tailwind v4 syntax: `bg-linear-to-r` (NOT `bg-gradient-to-r`)

---

## What Already Exists

### Server Actions (already built, do NOT rebuild)

**`src/server/actions/atelier.ts`**
- `loginToAtelier(passphrase: string): Promise<TVoidActionState>` — sets HTTP-only `atelier_auth` cookie
- `logoutFromAtelier(): Promise<void>` — deletes cookie
- `deleteRsvpAction(id: string): Promise<TVoidActionState>`
- `approveGuestbookEntryAction(id: string): Promise<TVoidActionState>`
- `deleteGuestbookEntryAdminAction(id: string): Promise<TVoidActionState>`
- `addGalleryPhotoAction(url: string, caption: string): Promise<TActionState<TAtelierGalleryPhoto>>`
- `deleteGalleryPhotoAction(id: string): Promise<TVoidActionState>`

**`src/server/actions/config.ts`**
- `getAdminDataAction(): Promise<TActionState<AdminData>>` — returns `{ rsvps, entries, tracks }`
- `updateGeneralConfigAction(data): Promise<TVoidActionState>`
- `updateStoryChaptersAction(chapters: StoryChapterRecord[]): Promise<TVoidActionState>`
- `updateTravelConfigAction(data): Promise<TVoidActionState>`
- `updateDressCodeConfigAction(data, swatches?): Promise<TVoidActionState>`
- `getWeddingConfigAction(): Promise<TActionState<WeddingConfigSelect>>`

**`src/server/actions/music.ts`**
- `addMusicTrackAction(title, artist, requestedBy): Promise<TActionState<MusicTrackSelect>>`
- `voteTrackAction(id, direction: 'up' | 'down'): Promise<TVoidActionState>`

### Types (already defined)

**`src/server/db/schema.ts`**
```typescript
type StoryChapterRecord = { id: string; title: string; period: string; subtitle: string; content: string }
type DressCodeSwatchRecord = { name: string; colorHex: string; description: string }
type RsvpSelect = { id, name, email, attendance, guestsCount, dietary, dietaryDetails, needsShuttle, songRequest, createdAt }
type GuestbookEntrySelect = { id, name, message, stampType, isApproved, createdAt }
type MusicTrackSelect = { id, title, artist, votes, requestedBy, isCurated, createdAt }
type WeddingConfigSelect = { id, brideName, groomName, weddingDateStr, weddingDateReadable, venueName, venueLocation, welcomeInviteMessage, editorialQuote, travelFlights, travelTrains, travelStays, travelTreasures, dressCodeTitle, dressCodeDescription, storyChapters: StoryChapterRecord[], dressCodeSwatches: DressCodeSwatchRecord[], updatedAt }
```

**`src/lib/action-types.ts`**
```typescript
export type TActionState<T> = { success: true; data: T } | { success: false; error: string }
export type TVoidActionState = { success: true } | { success: false; error: string }
```

---

## The Task: Build `AdminModal`

### File to create
`src/modules/home/views/AdminModal.tsx`

### How it integrates
In `src/modules/home/views/HomePageClient.tsx`:
1. Add state: `const [isAdminOpen, setIsAdminOpen] = useState(false)`
2. Replace the `<Link href="/atelier">` button with:
   ```tsx
   <button onClick={() => setIsAdminOpen(true)} ...>
     <FiSettings /> Atelier Admin
   </button>
   ```
3. Render `<AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} config={config} />` at bottom of the main div

---

## AdminModal — Full Spec

### Props Interface
```typescript
interface AdminModalProps {
  isOpen: boolean
  onClose: () => void
  config: TWeddingConfig
}
```

### Visual Structure (matching `_proto/src/components/AdminDashboard.tsx`)

```
┌─────────────────────────────────────────────────────────────┐
│  fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-md        │
│  flex items-center justify-center p-4                       │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  bg-cream border rounded-3xl max-w-5xl w-full        │  │
│  │  flex flex-col md:flex-row min-h-[80vh] max-h-[92vh] │  │
│  │                                                      │  │
│  │  LEFT SIDEBAR (w-64, bg-charcoal, text-parchment)    │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  Gold dot + "Couples Studio" title             │  │  │
│  │  │  "Management Workspace" subtitle               │  │  │
│  │  │                                               │  │  │
│  │  │  [if authenticated]: nav buttons for 7 tabs   │  │  │
│  │  │  [if not auth]: locked message box            │  │  │
│  │  │                                               │  │  │
│  │  │  Bottom:                                      │  │  │
│  │  │    [Lock Dashboard] button (if auth)          │  │  │
│  │  │    [Back to Invitation] gold button           │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                      │  │
│  │  RIGHT CONTENT (flex-1, overflow-y-auto, p-10)       │  │
│  │  [Login gate | Authenticated panel]                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### State (all local to AdminModal)
```typescript
const [isAuthenticated, setIsAuthenticated] = useState(false)
const [passphrase, setPassphrase] = useState('')
const [loginError, setLoginError] = useState('')
const [activeTab, setActiveTab] = useState<TAdminTab>('general')
const [saveSuccess, setSaveSuccess] = useState(false)
const [isLoading, setIsLoading] = useState(false)

// Admin data (fetched after auth)
const [rsvps, setRsvps] = useState<RsvpSelect[]>([])
const [entries, setEntries] = useState<GuestbookEntrySelect[]>([])
const [tracks, setTracks] = useState<MusicTrackSelect[]>([])

// Editable config copy
const [localConfig, setLocalConfig] = useState<TWeddingConfig>(config)
```

```typescript
type TAdminTab = 'general' | 'story' | 'travel' | 'dresscode' | 'rsvps_blessings' | 'playlist' | 'gallery'
```

### Login Flow
```typescript
async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const result = await loginToAtelier(passphrase)
  if (result.success) {
    setIsAuthenticated(true)
    setLoginError('')
    // Load admin data
    setIsLoading(true)
    const dataResult = await getAdminDataAction()
    if (dataResult.success) {
      setRsvps(dataResult.data.rsvps)
      setEntries(dataResult.data.entries)
      setTracks(dataResult.data.tracks)
    }
    setIsLoading(false)
  } else {
    setLoginError('Invalid passphrase. Please try again.')
  }
}

async function handleLogout() {
  await logoutFromAtelier()
  setIsAuthenticated(false)
  setPassphrase('')
}
```

### Login Gate UI (right panel, !isAuthenticated)
- Centered column, max-w-md
- `FiLock` icon in gold circle (animate-pulse)
- Title: `"Wedding Atelier Gate"` (font-serif text-3xl font-light)
- Subtitle italic: "Authorized credentials for Madame or Monsieur to edit content in real-time."
- Single passphrase input (type="password")
- Submit button: "VERIFY PASSCODE & OPEN" (bg-charcoal text-white)
- Error message below if loginError
- Hint box (bg-parchment border-taupe rounded-xl text-stone-500):
  - "Ask the couple for the Atelier passphrase."

### Sidebar Nav (7 tabs, icons from react-icons/fi)
```typescript
const TABS = [
  { id: 'general',        label: 'General Settings',    icon: FiSettings },
  { id: 'story',          label: 'Our Story Chapters',  icon: FiBookOpen },
  { id: 'travel',         label: 'Travel Logistics',    icon: FiCompass },
  { id: 'dresscode',      label: 'Dress Code Palette',  icon: FiScissors },
  { id: 'rsvps_blessings',label: 'RSVPs & Guestbook',   icon: FiUsers },
  { id: 'playlist',       label: 'Dance Playlist',      icon: FiMusic },
  { id: 'gallery',        label: 'Gallery Collection',  icon: FiCamera },
]
```
Active tab: `bg-white/10 text-white font-semibold`
Inactive: `text-stone-400 hover:text-white`

### Tab 1: General Settings
Fields (grid 2-col):
- Bride Name (`brideName`)
- Groom Name (`groomName`)
- Wedding Date ISO string (`weddingDateStr`) — monospace input
- Date Readable (`weddingDateReadable`)
- Venue Name (`venueName`)
- Venue Location (`venueLocation`)
- Editorial Quote (`editorialQuote`) — full width, italic

On Save: `await updateGeneralConfigAction({ brideName, groomName, ... })`

### Tab 2: Story Chapters
For each chapter in `localConfig.storyChapters` (3 chapters):
- bg-white rounded-2xl border-taupe p-5
- Chapter title label (gold uppercase)
- Grid 2-col: `title` input, `period` input
- Full-width: `subtitle` input
- Full-width: `content` textarea (rows=3)

On Save: `await updateStoryChaptersAction(localConfig.storyChapters)`

### Tab 3: Travel Logistics
4 textareas (label + textarea for each):
- `travelFlights` — "Transit & Flight Connections"
- `travelTrains` — "TGV Train Transfers"
- `travelStays` — "Reserved Boutique Stays & Codes" (rows=3)
- `travelTreasures` — "Provençal Treasures" (rows=3)

On Save: `await updateTravelConfigAction({ travelFlights, travelTrains, travelStays, travelTreasures })`

### Tab 4: Dress Code Palette
Grid 2-col header inputs:
- `dressCodeTitle`
- `dressCodeDescription`

Swatches grid (3 cols), for each swatch:
- Preview color circle
- `colorHex` input (monospace)
- `name` input (serif)
- `description` input

On Save: `await updateDressCodeConfigAction({ dressCodeTitle, dressCodeDescription }, localConfig.dressCodeSwatches)`

### Tab 5: RSVPs & Guestbook

**RSVP Table** (RsvpSelect[] from state):
- Header: "Registered RSVPs (N)" + total-attending-guests badge
- Overflow table: columns = Guest Name, Status, Party, Dietary, Shuttle, Action
- Status badge: attending=emerald / uncertain=amber / declined=rose
- Delete: `deleteRsvpAction(id)` → filter from local state
- Empty state if no RSVPs

**Guestbook Moderation** (GuestbookEntrySelect[]):
- Header: "Guestbook Blessings (N)"
- Grid 2-col cards: stamp badge + name + italic message + Approve + Delete
- Approve: `approveGuestbookEntryAction(id)` — toggle badge pending→approved
- Delete: `deleteGuestbookEntryAdminAction(id)` → filter from local state
- Empty state if none

### Tab 6: Dance Playlist
Read-only leaderboard from `tracks` state:
- Header: "Ballroom Dancefloor Votes"
- List: `bg-white rounded-xl divide-y`
- Each row: title (serif bold) + artist (sans small uppercase) + votes badge (gold)
- Empty state message

### Tab 7: Gallery Collection
**Add Photo** button at top right → `addGalleryPhotoAction(url, caption)` → append to local photos state

Grid 2-col (max-h-[44vh] overflow-y-auto), for each photo:
- "Photo Frame #N" label + Remove button
- Thumbnail img (80×80 rounded-lg, object-cover)
- URL input (monospace text-[9px])
- Caption input (serif text-xs)
- Remove: `deleteGalleryPhotoAction(id)` → filter from local state

### Authenticated Panel Header
```
Active Atelier Config  ←  gold label
[Tab Title]            ←  font-serif text-2xl

                [Revert to Defaults] [Save Changes]
```
- "Revert": confirm dialog → `getWeddingConfigAction()` to reload
- "Save": calls the right action for activeTab, then `setSaveSuccess(true)` for 2.5s
- Success banner: bg-sage/10 border-sage/30 text-xs italic

### Save success banner
```tsx
{saveSuccess && (
  <div className="bg-sage/10 text-sage border border-sage/30 p-3 rounded-xl mb-6 text-xs flex items-center gap-2 font-serif italic">
    <FiCheckCircle className="w-4 h-4 text-sage" />
    Atelier settings saved! Changes reflect on the invitation immediately.
  </div>
)}
```

---

## Imports to Use

```typescript
import {
  FiSettings, FiBookOpen, FiCompass, FiScissors, FiUsers, FiMusic, FiCamera,
  FiLogOut, FiEye, FiLock, FiKey, FiSave, FiRotateCcw, FiCheckCircle, FiTrash2,
  FiPlus, FiCheck,
} from 'react-icons/fi'
import { loginToAtelier, logoutFromAtelier, deleteRsvpAction, approveGuestbookEntryAction, deleteGuestbookEntryAdminAction, addGalleryPhotoAction, deleteGalleryPhotoAction } from '@/server/actions/atelier'
import { getAdminDataAction, updateGeneralConfigAction, updateStoryChaptersAction, updateTravelConfigAction, updateDressCodeConfigAction } from '@/server/actions/config'
import type { TWeddingConfig } from '@/modules/home/@types'
import type { RsvpSelect, GuestbookEntrySelect, MusicTrackSelect, StoryChapterRecord, DressCodeSwatchRecord } from '@/server/db/schema'
import type { TVoidActionState } from '@/lib/action-types'
```

---

## Wire into HomePageClient

After building `AdminModal`, update `src/modules/home/views/HomePageClient.tsx`:

1. Add import: `import { AdminModal } from './AdminModal'`
2. Add state: `const [isAdminOpen, setIsAdminOpen] = useState(false)`
3. Replace the `<Link href="/atelier">` with:
```tsx
<button
  onClick={() => setIsAdminOpen(true)}
  className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-parchment border border-taupe/60 hover:border-gold/60 text-charcoal text-xs rounded-lg transition-all cursor-pointer"
>
  <FiSettings className="w-3.5 h-3.5 text-gold-dark" />
  <span className="font-sans uppercase text-[9px] tracking-widest">Atelier Admin</span>
</button>
```
4. Add at bottom of the main content div:
```tsx
<AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} config={config} />
```

---

## Notes on `if (!isOpen) return null`

The modal should short-circuit early:
```typescript
if (!isOpen) return null
```

This prevents any data fetching or rendering overhead when closed.

---

## TypeScript Gotchas

- `exactOptionalPropertyTypes: true` — when spreading partial updates, use:
  ```typescript
  await updateGeneralConfigAction({
    ...(localConfig.brideName ? { brideName: localConfig.brideName } : {}),
    ...
  })
  ```
  Or just pass the full object since all fields are required strings.

- `noUncheckedIndexedAccess: true` — always null-guard:
  ```typescript
  const first = rsvps[0]
  if (!first) return null
  ```

- For the delete actions, filter with: `prev.filter(r => r.id !== id)`

---

## File Checklist

- [ ] `src/modules/home/views/AdminModal.tsx` — create (named export `AdminModal`)
- [ ] `src/modules/home/views/HomePageClient.tsx` — update (add isAdminOpen state + AdminModal render + swap Link for button)
- [ ] `src/modules/home/index.ts` — add `export { AdminModal } from './views/AdminModal'`
