# AGENTS.md - Arclino Frontend

This document provides essential context and implementation rules for AI agents working on the Arclino frontend codebase. Follow this document over stale patterns.

## Project Overview

**Arclino** is a realtime collaborative flowchart workspace for teams. It combines SSR-first auth/session handling, strict Supabase RLS authorization, and Pusher-powered presence/events around a React Flow canvas.

The application has three main experiences:

- public marketing site (`src/app/(external)`)
- authentication (`src/app/(auth)`)
- protected workspace/dashboard app (`src/app/(dashboard)`)

### Core Purpose

Enable teams to collaborate on shared boards with correct authorization, consistent server-side session behavior, and realtime updates (presence, locks, chat, activity) without trusting client-only auth state.

## Technology Stack

### Core Technologies

- **Next.js 16.1.6** - App Router architecture
- **React 19.2.3** - UI framework
- **TypeScript 5** - Type safety
- **TailwindCSS 4** - styling
- **shadcn/ui** - reusable UI primitives under `src/components/ui`
- **Supabase Auth + Postgres** - authentication and database
- **Supabase SSR** - cookie-backed session available to server, middleware, route handlers
- **Pusher** - presence and realtime board events (never socket.io)
- **React Flow** - canvas and diagram interaction model
- **Zustand 5** - hydrated board state + applying remote events through a typed reducer
- **Zod 4** - schema validation at server boundaries
- **TanStack Query 5** - server state (optional where caching helps)
- **React Hook Form** - form handling

## Project Structure

```text
src/
├── app/                         # Next.js App Router routes
│   ├── (external)/              # Public marketing pages
│   ├── (auth)/                  # Login/signup/forgot-password/callback
│   ├── (dashboard)/             # Protected application routes
│   └── api/                     # Route handlers (HTTP concerns)
├── components/
│   ├── ui/                      # shadcn/ui primitives (shared only)
│   ├── external/                # marketing shared components (shared only)
│   └── dashboard/               # dashboard shell components (shared only)
├── features/                    # Domain-first code (business logic + domain UI)
│   ├── auth/
│   ├── workspace/
│   ├── boards/
│   ├── canvas/
│   ├── realtime/
│   ├── chat/
│   ├── activity/
│   └── invites/
├── hooks/                       # Generic hooks only (no domain hooks)
├── lib/
│   ├── auth/                    # session helpers and guards
│   ├── pusher/                  # Pusher client/server helpers
│   └── supabase/                # SSR/browser/admin/middleware clients
├── stores/                      # Zustand stores
└── types/                       # Shared TS types

supabase/
└── migrations/                  # schema + RPCs + indexes + RLS policies
```

## Architecture Rules

### Non-Negotiable Rules

- Do not reintroduce browser-only auth assumptions. Server must see the session through cookies.
- Supabase RLS is the source of truth for authorization.
- Use Pusher for presence/events (never socket.io).
- Use Zod at server boundaries (route handlers, server actions, unstable API shapes).
- Keep feature-based architecture under `src/features/*`.
- Keep new filenames in kebab-case.

### Route Handler vs Server Action Policy

Use **route handlers** (`src/app/api/**/route.ts`) for HTTP concerns:

- OAuth callbacks (already handled outside `/api/*` as `/callback`)
- Pusher auth endpoints (`/api/pusher/auth`)
- session endpoints (`/api/session`)
- proxying or server-only operations that must be HTTP-accessible

Use **server actions** for tightly UI-coupled server orchestration:

- form submissions that need secure server-only logic
- cookie/session writes during UI flows
- small mutations where an HTTP endpoint would be unnecessary overhead

If the action’s real job is “call an endpoint and return data”, prefer a route handler.

### Thin Page Rule

Pages under `src/app` may:

- read `params` / `searchParams`
- bootstrap SSR session + initial data
- redirect
- compose feature components

Pages under `src/app` must not:

- contain reusable business logic
- duplicate domain formatting/transform rules
- become stateful service containers

## Route Contract

Marketing routes (`src/app/(external)`):

- `/`
- `/solutions`, `/solutions/product-teams`, `/solutions/engineering`, `/solutions/startups`
- `/customers`, `/customers/case-studies/[slug]`
- `/pricing`
- `/resources`, `/resources/blog`, `/resources/blog/[slug]`, `/resources/changelog`, `/resources/help-center`
- `/about`, `/contact`, `/security`
- `/legal/privacy`, `/legal/terms`

Auth routes (`src/app/(auth)`):

- `/login`
- `/signup`
- `/forgot-password`
- `/callback`

Protected app routes (`src/app/(dashboard)`):

- `/dashboard`
- `/dashboard/boards/[boardId]`
- `/dashboard/settings/members`
- `/dashboard/settings/profile`

Other required routes:

- `/onboarding/workspace`
- `/invite/board/[token]`

Route handlers:

- `/api/session`
- `/api/pusher/auth`
- `/api/proxy-auth/[...path]`

## Key Domains

### 1. Authentication & Session

- **Location**: `src/app/(auth)/*`, `src/app/api/session/route.ts`, `src/lib/supabase/*`, `src/lib/auth/session.ts`, `src/features/auth/*`
- **Rules**:
  - middleware protects `/dashboard`, `/onboarding`, and `/invite/board`
  - do not add manual token cookies
  - on first authenticated session, ensure a `profiles` row exists
  - users without a workspace must be redirected to `/onboarding/workspace`

### 2. Workspaces & Roles

- **Location**: `src/features/workspace/*`, Supabase RLS policies + RPCs
- **Roles**:
  - `owner`, `editor`, `viewer` (workspace-level only in v1)
- **Do not** add board-level overrides in v1.

### 3. Boards & Canvas Persistence

- **Location**: `src/features/boards/*`, `src/features/canvas/*`
- **Rules**:
  - persist nodes/edges through authenticated server boundaries
  - keep canvas interaction client-side, persistence server-side

### 4. Realtime (Presence, Events, Locks)

- **Location**: `src/features/realtime/*`, `src/lib/pusher/*`, `src/app/api/pusher/auth/route.ts`, `src/stores/board-store.ts`
- **Channels**:
  - `presence-board-[boardId]`
  - `private-board-[boardId]`
- **Events**:
  - `board:node_created`, `board:node_updated`, `board:node_moved`, `board:node_deleted`
  - `board:edge_created`, `board:edge_updated`, `board:edge_deleted`
  - `board:chat_message`
  - `board:node_lock`, `board:node_unlock`
- **Implementation requirements**:
  - authorize channels in `/api/pusher/auth`
  - verify workspace membership before authorizing
  - apply all remote events through the typed Zustand reducer (`src/stores/board-store.ts`)
  - throttle node move persistence/broadcast to ~50–100ms
  - soft-lock nodes while dragging with a 10-second TTL

## Database and RLS Rules

Migrations must live under `supabase/migrations`.

Required tables:

- `profiles`
- `workspaces`
- `workspace_members`
- `boards`
- `board_nodes`
- `board_edges`
- `board_messages`
- `board_events`
- `board_invite_links`

Required RPCs:

- `ensure_profile`
- `create_workspace_with_owner`
- `accept_board_invite`

RLS intent:

- membership required for board reads
- owner/editor can mutate boards, nodes, edges
- viewer can only insert `board_messages`
- owner only can manage invite links and workspace membership
- invite links can grant `editor` or `viewer`, never `owner`

## UI Rules

- Minimal UI is acceptable.
- Prefer server components for data reads.
- Keep client components focused on interaction/state.
- Do not chase ornamental marketing polish at the expense of correctness/security.

## Testing Expectations

Before calling work complete, verify:

- `pnpm check-types`
- `pnpm lint`

Manual product checks:

1. Login/signup/OAuth
2. Onboarding redirect behavior
3. Board creation and SSR board loading
4. Node/edge CRUD for owner/editor
5. Viewer edit restrictions
6. Presence in two sessions
7. Realtime chat delivery
8. Activity feed updates
9. Invite acceptance + role preservation

## Notes for Future Agents

- If a route/component pattern conflicts with the feature architecture, favor the feature architecture.
- Keep `page.tsx` thin.
- Use Zod at server boundaries.
- Treat Supabase RLS as the source of truth for authorization.
