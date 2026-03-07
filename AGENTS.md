# AGENTS.md - Arclino Frontend

This document provides essential context for AI agents working on the Arclino frontend codebase. It intentionally includes architectural conventions and planned structures that may not yet exist in the repository. Follow these conventions even when stubbing features.

## Project Overview

**Arclino** is a real-time collaborative flowchart workspace for product, engineering, and operations teams. It enables teams to map systems, document decisions, and collaborate live with presence, activity tracking, and chat. The product ships as a premium marketing site plus a protected app experience.

### Core Purpose

Enable teams to create, discuss, and maintain accurate visual flows with secure workspace-level access, realtime collaboration, and clear audit trails.

## Technology Stack

### Core Technologies

- **Next.js 16.1.6** - App Router architecture
- **React 19.2.3** - UI framework
- **TypeScript 5** - Type safety
- **TailwindCSS 4** - Styling
- **ShadCN UI** - Component library (Radix UI primitives)
- **Framer Motion** - Animations
- **TanStack Query 5** - Server state management
- **Zustand 5** - Client state management
- **Zod 4** - Schema validation
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **Supabase** - Auth + Postgres (RLS)
- **Pusher** - Realtime events and presence
- **React Flow** - Canvas interactions
- **pnpm** - Package manager

### Additional Tools

- **next-themes** - Theme handling
- **react-hot-toast** - Toast notifications
- **ESLint + Prettier** - Code quality
- **Husky + Commitlint** - Git hooks and commit validation
- **Recharts / Chart.js** - Data visualization
- **html2pdf.js** - PDF generation
- **Sonner / React Hot Toast** - Toast notifications
- **next-pwa** - PWA support (optional)

## Build Order (Required)

1. Marketing site (all routes + nav + footer + home sections)
2. Auth pages
3. Onboarding
4. App shell
5. Boards
6. Realtime
7. Chat/Activity
8. Invites

## Project Structure

```
src/
+-- app/                          # Next.js App Router
¦   +-- (external)/               # Marketing site routes
¦   +-- (auth)/                   # Authentication routes
¦   +-- (dashboard)/              # App shell and boards
¦   +-- onboarding/               # Workspace creation
¦   +-- invite/                   # Board invite link flows
¦   +-- api/                      # Route handlers (proxy, session, pusher auth)
¦   +-- loading.tsx               # Global loading
¦   +-- error.tsx                 # Global error boundary
¦   +-- not-found.tsx             # 404
+-- components/                   # React components
¦   +-- external/                 # External layout primitives (navbar/footer)
¦   +-- dashboard/                # Dashboard blocks and layout parts
¦   +-- ui/                       # ShadCN UI components
+-- lib/                          # Libraries and utilities
¦   +-- api/                      # Axios client and error handling
¦   +-- services/                 # API service layer (board, auth, etc.)
¦   +-- schemas/                  # Zod validation schemas
¦   +-- auth/                     # Auth helpers and session management
¦   +-- external/                 # External content sources
¦   +-- motion.ts                 # Shared motion primitives
¦   +-- pusher/                   # Realtime helpers (server/client)
¦   +-- supabase/                 # Auth + DB helpers
¦   +-- utils.ts                  # Utility helpers
+-- stores/                       # Zustand state stores
¦   +-- app-store.ts              # Global app UI state
¦   +-- board-store.ts            # Board canvas + realtime state
¦   +-- [domain]-store.ts         # Other domain stores
+-- hooks/                        # Custom hooks (Query hooks, UI hooks)
¦   +-- use-app-queries.ts
¦   +-- use-board-queries.ts
¦   +-- use-mobile.ts
+-- types/                        # Shared TypeScript types
+-- providers/                    # React context providers
+-- data/                         # Static/mock data
```

## Route Inventory

### Marketing (External)

- `/` (Home)
- `/solutions`
  - `/solutions/product-teams`
  - `/solutions/engineering`
  - `/solutions/startups`
- `/customers`
  - `/customers/case-studies/[slug]`
- `/pricing`
- `/resources`
  - `/resources/blog`
  - `/resources/blog/[slug]`
  - `/resources/changelog`
  - `/resources/help-center`
- `/about`
- `/contact`
- `/security`
- `/legal/privacy`
- `/legal/terms`

### Auth + Onboarding

- `/auth/login`
- `/auth/signup`
- `/auth/forgot-password`
- `/auth/callback`
- `/onboarding/workspace`

### App

- `/app` (boards list)
- `/app/boards/[boardId]`
- `/app/settings/members`
- `/app/settings/profile`

### Invites

- `/invite/board/[token]`

### API Routes

- `/api/pusher/auth`
- `/api/session`
- `/api/proxy-auth/[...path]`

## Key Features & Domains

### 1. Marketing (External)

- **Location**: `src/app/(external)/`, `src/components/external/`
- **Rules**: External pages are Server Components by default.
- **Layout**: `src/app/(external)/layout.tsx` wraps navbar/footer.

### 2. Authentication & Authorization

- **Location**: `src/app/(auth)/`, `src/lib/auth/`, `src/app/api/session/`
- **Features**: Email/password + Google OAuth (Supabase Auth).
- **Middleware**: `middleware.ts` guards `/onboarding`, `/invite`, `/app` routes.

### 3. Workspace & Boards

- **Location**: `src/app/(dashboard)/`
- **Features**: Boards list, board room, presence, activity feed, chat.

### 4. Realtime Collaboration

- **Location**: `src/lib/pusher/`, `src/lib/motion.ts`
- **Channels**: `presence-board-[boardId]`, `private-board-[boardId]`.
- **Events**: Node/edge changes, chat, locks, activity.

### 5. Invites

- **Location**: `src/app/invite/board/[token]/`
- **Rules**: Invite links can grant **Editor** or **Viewer** only. Owner upgrades are manual.

### 6. Supabase + RLS

- **Location**: `supabase/migrations/`
- **Policies**: Workspace-level access only; editor can mutate boards, viewer is read-only (chat allowed).

### 7. Webhooks (Planned / V2)

- **Purpose**: Notify external systems on board changes (node/edge create/update/delete, chat, activity).
- **Owner**: Backend routes will sign payloads; no secrets client-side.
- **Status**: Stubbed in planning, not shipped in v1 UI.

### 8. Export (Planned / V2)

- **JSON export**: download board nodes/edges/metadata.
- **PNG export**: client-side capture of canvas.

## Onboarding Flow (Detailed)

1. User signs in via `/auth/login` or `/auth/signup`.
2. After successful auth, check if user has a workspace.
3. If no workspace, redirect to `/onboarding/workspace`.
4. Onboarding form creates:
   - `workspaces` row
   - `workspace_members` row with role `Owner`
5. Redirect to `/app` (boards list) on success.

## Invite Link Acceptance Logic (Detailed)

1. User opens `/invite/board/[token]`.
2. If not authenticated, redirect to `/auth/login` with `next` parameter.
3. Validate token in `board_invite_links`:
   - Not revoked
   - Not expired
   - `uses_count < max_uses` (if max_uses is set)
4. If user is NOT a workspace member:
   - Add to `workspace_members` with role from link (`Editor` or `Viewer` only)
   - Increment `uses_count`
5. If user is already a workspace member:
   - Do NOT change role
   - Show notice if invite role is higher than current role
6. Redirect to target board `/app/boards/[boardId]`.

## Data Model (Supabase)

Core tables used by the app:

- `profiles`
- `workspaces`
- `workspace_members` (role: Owner | Editor | Viewer)
- `boards`
- `board_nodes`
- `board_edges`
- `board_events`
- `board_messages`
- `board_comments` (optional v1 UI)
- `board_invite_links` (role: Editor | Viewer only)
- `invites` (role: Editor | Viewer only)

Indexes:

- `board_events (board_id, created_at desc)`
- Standard `board_id` indexes for nodes, edges, messages

## RLS Policy Breakdown

### Shared Rules

- **Workspace Membership Required** for all board access.
- **Viewer** can read boards, nodes, edges, events, and messages.
- **Viewer** can send chat messages (read/write on `board_messages`).
- **Editor** can mutate boards, nodes, edges, events.
- **Owner** can manage members, roles, invite links, and boards.

### Table Policies (Summary)

- `workspaces`: read if member; insert only for self; update only by Owner.
- `workspace_members`: read if member; insert only by Owner (except invite acceptance flow); update only by Owner.
- `boards`: read if member; insert/update/delete by Owner and Editor.
- `board_nodes`: read if member; insert/update/delete by Owner and Editor.
- `board_edges`: read if member; insert/update/delete by Owner and Editor.
- `board_events`: read if member; insert by Owner and Editor.
- `board_messages`: read if member; insert by Owner, Editor, Viewer.
- `board_invite_links`: read only by Owner; insert/update/revoke by Owner.
- `invites`: read only by Owner; insert/revoke by Owner; accept only by email match.

## Realtime Contract

### Channels

- `presence-board-[boardId]`
- `private-board-[boardId]`

### Event Types

- `board:node_created`, `board:node_updated`, `board:node_moved`, `board:node_deleted`
- `board:edge_created`, `board:edge_updated`, `board:edge_deleted`
- `board:chat_message`
- `board:node_lock`, `board:node_unlock`
- `board:activity` (optional)

## User Roles & Permissions

### Owner

- Full access: manage members, roles, invite links, create/delete boards.

### Editor

- Edit board content, chat, view activity.

### Viewer

- Read-only boards + chat enabled.

## State Management Patterns

### Server State (TanStack Query)

- Used for all API-driven data.
- Domain-specific hooks: `use-app-queries.ts`, `use-board-queries.ts`.
- Pattern: Service calls (`src/services/`) wrapped in TanStack Query.

### Client State (Zustand)

- Global UI and session-persistent state in `src/stores/`.
- Stores split by domain (app, board, user, etc.).
- Optional `localStorage` persistence when needed.

### Form State (React Hook Form)

- Robust form handling with Zod validation.
- Shared schemas in `src/lib/schemas/`.
- Standardized components in `src/components/ui/form.tsx`.

## API Integration

### API Client

- **Location**: `src/lib/api/client.ts`
- **Configuration**: Axios instance with automated interceptors for auth headers and error handling.
- **Proxy**: Some routes proxied via `src/app/api/proxy-auth/`.

### Service Layer

- **Location**: `src/services/`
- **Structure**: Class-based or functional services returning typed promises.
- **Pattern**: `BoardService.getBoards()` and `AuthService.signIn()` style calls.

### Supabase

- **Location**: `src/lib/supabase/`
- **Usage**: All DB access is RLS-enforced; no client secrets.

### Pusher

- **Location**: `src/lib/pusher/`, `/api/pusher/auth`
- **Auth**: Workspace membership required for presence/private channels.

### Proxy + Session

- **Proxy**: `src/app/api/proxy-auth/[...path]/route.ts`
- **Session**: `src/app/api/session/route.ts`

## Styling Guidelines

### TailwindCSS

- Utility-first CSS framework (v4)
- Dark UI: `#0B0B0C` with zinc/slate neutrals
- Single accent: cyan

### Component Styling

- Use ShadCN UI components for all UI elements
- Use `cn()` from `src/lib/utils.ts` for conditional classes
- Motion primitives live in `src/lib/motion.ts`

### Design System

- Modern, minimal, dark UI with crisp borders
- Consistent spacing scale and typography

## Development Workflow

### Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm format
pnpm check-format
pnpm check-types
```

### Code Quality

- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier with Tailwind plugin
- **Type Checking**: TypeScript strict mode
- **Commits**: Conventional Commits format

### Branching Strategy

- **Base Branch**: `main`
- **Feature Branches**: `feat/<description>`
- **Bug Fixes**: `fix/<description>`

## Common Patterns

### Component Structure

```typescript
import { useQuery } from "@tanstack/react-query"
import { useBoardStore } from "@/stores/board-store"

export function ComponentName({ id }: { id: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["board", id],
    queryFn: () => BoardService.getById(id),
  })

  const selectedNode = useBoardStore((state) => state.selectedNodeId)

  if (isLoading) return <div>Loading...</div>

  return <div>{data?.name} {selectedNode}</div>
}
```

### Form Handling

```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/lib/schemas/auth"

const form = useForm({
  resolver: zodResolver(loginSchema),
  defaultValues: { email: "", password: "" },
})
```

## Environment Variables

Required environment variables (check `.env` or `.env.example`):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PUSHER_APP_ID`
- `PUSHER_KEY`
- `PUSHER_SECRET`
- `PUSHER_CLUSTER`
- `NEXT_PUBLIC_PUSHER_KEY`
- `NEXT_PUBLIC_PUSHER_CLUSTER`

## Testing Considerations

- Manual testing across roles (Owner vs Editor vs Viewer)
- Verify realtime sync between two sessions
- Confirm RLS protects all tables
- Check invite flow role escalation rules

## Performance Targets

- Marketing LCP under 2.5 seconds
- Board interactions stay 60fps
- Realtime events throttled to avoid over-render

## Security Considerations

- Role-based access enforced by RLS and middleware
- Invite links cannot grant Owner
- No secrets client-side
- All mutations validated with Zod

## PWA Features

- Offline support via service workers (optional)
- Manifest: `public/manifest.json`
- Optimized for Add to Home Screen

## Key Files Reference

- **Root Layout**: `src/app/layout.tsx`
- **External Layout**: `src/app/(external)/layout.tsx`
- **Dashboard Layout**: `src/app/(dashboard)/layout.tsx`
- **Middleware**: `middleware.ts`
- **Motion**: `src/lib/motion.ts`
- **Supabase Helpers**: `src/lib/supabase/*`
- **Pusher Helpers**: `src/lib/pusher/*`
- **Types**: `src/types/*`
- **Config**: `next.config.ts`, `tsconfig.json`

## Common Tasks

### Adding a New External Page

1. Add a route in `src/app/(external)/`.
2. Keep the page server-rendered by default.
3. Use navbar/footer from `src/components/external/`.

### Adding a New App Feature

1. Create feature branch from `main`.
2. Add types in `src/types/`.
3. Add schemas in `src/lib/schemas/`.
4. Add services in `src/services/`.
5. Add Zustand store if needed in `src/stores/`.
6. Add components in `src/components/` or `_components`.
7. Add routes in `src/app/(dashboard)/`.

### Fixing a Bug

1. Identify root cause.
2. Fix in service or component logic.
3. Test across relevant user roles.
4. Submit PR with Conventional Commit message.

## Notes for AI Agents

- Always use TypeScript types, avoid `any`.
- Validate all inputs with Zod at server boundaries.
- Prefer Server Components for data fetching.
- Use ShadCN UI components for all UI elements.
- Keep motion subtle and respect reduced-motion.
- Keep changes small and consistent.
- Use kebab-case for all new file names.

## Additional Resources

- **README.md**: Project setup instructions.
- **CONTRIBUTING.md**: Guidelines for code contributions.
