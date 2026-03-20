# Arclino

Arclino is a realtime collaborative flowchart workspace for teams. It ships authentication, server-side session handling, strict Supabase RLS authorization, and Pusher-powered presence + realtime board events on top of a React Flow canvas.

This repo is intentionally biased toward correctness and security over marketing polish.

## Core Capabilities

- Supabase Auth with email/password and Google OAuth
- SSR-safe session handling in Next.js App Router (cookies + middleware)
- Workspaces and workspace-level roles (`owner`, `editor`, `viewer`)
- Boards list + board room
- React Flow canvas persistence (nodes/edges)
- Pusher presence + typed realtime events
- Chat, activity feed, and invite links
- Strict Supabase RLS and validated server boundaries

## Technology Stack

- Next.js `16.1.6` (App Router)
- React `19.2.3` + TypeScript `5`
- TailwindCSS `4` + shadcn/ui (Radix primitives)
- Supabase (`@supabase/ssr`, `@supabase/supabase-js`) + Postgres
- Pusher (`pusher`, `pusher-js`) for presence/events
- React Flow (`reactflow`) for the canvas
- TanStack Query `5` for server state
- Zustand `5` for client board state + applying remote events
- Zod `4` for validation at server boundaries
- React Hook Form for form handling

## Route Map

Public marketing routes (`src/app/(external)`):

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
- `/callback` (OAuth callback)

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

## Project Structure

```text
src/
├── app/
│   ├── (external)/              # Public marketing pages
│   ├── (auth)/                  # Login/signup/forgot/callback
│   ├── (dashboard)/             # Protected application routes
│   └── api/                     # Route handlers (session, pusher, proxies)
├── features/                    # Domain-first code
│   ├── auth/
│   ├── workspace/
│   ├── boards/
│   ├── canvas/
│   ├── realtime/
│   ├── chat/
│   ├── activity/
│   └── invites/
├── components/                  # Shared components (UI only)
│   ├── ui/                      # shadcn/ui primitives
│   └── external/                # marketing shared components
├── lib/
│   ├── supabase/                # SSR/browser/admin/middleware clients
│   ├── pusher/                  # Pusher client/server helpers
│   └── auth/                    # session helpers and route guards
├── stores/                      # Zustand stores (board state, reducers)
├── hooks/                       # Generic hooks only (no domain hooks)
└── types/                       # Shared TS types

supabase/
└── migrations/                  # schema, RPCs, indexes, RLS
```

## Architecture Rules (Short Version)

- Pages under `src/app` must stay thin: SSR bootstrapping, redirects, composition only.
- Domain logic belongs in `src/features/*`.
- Use route handlers for HTTP concerns (OAuth callbacks, webhooks, `/api/*` endpoints).
- Use server actions for tightly UI-coupled server work (form orchestration), not as a general API layer.
- Validate server inputs/outputs with Zod.
- Treat Supabase RLS as the source of truth for authorization.

## Roles & Permissions

Workspace roles are workspace-wide (v1):

- `viewer`: read boards/nodes/edges/events and send chat only
- `editor`: create/update/delete boards/nodes/edges and write activity
- `owner`: everything editors can do plus member/invite management

## Realtime

Pusher channels:

- `presence-board-[boardId]`
- `private-board-[boardId]`

Board event types:

- `board:node_created`, `board:node_updated`, `board:node_moved`, `board:node_deleted`
- `board:edge_created`, `board:edge_updated`, `board:edge_deleted`
- `board:chat_message`
- `board:node_lock`, `board:node_unlock`

Clients subscribe once per board and apply events through the typed Zustand reducer (`src/stores/board-store.ts`).

## Database (Supabase)

Tables:

- `profiles`, `workspaces`, `workspace_members`
- `boards`, `board_nodes`, `board_edges`
- `board_messages`, `board_events`, `board_invite_links`

RPCs:

- `ensure_profile`
- `create_workspace_with_owner`
- `accept_board_invite`

RLS intent:

- membership required for board reads
- owner/editor can mutate boards, nodes, edges
- viewer can only insert `board_messages`
- owner only can manage invite links and workspace membership

## Environment Variables

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=
NEXT_PUBLIC_PUSHER_KEY=
NEXT_PUBLIC_PUSHER_CLUSTER=
```

## Development

```bash
pnpm install
pnpm dev
```

## Quality Checks

```bash
pnpm check-types
pnpm lint
```

## Manual Verification (Realtime Smoke Test)

Use two browser sessions (normal + incognito):

1. Sign in as two users in the same workspace.
2. Open the same board in both sessions.
3. Confirm presence updates on join/leave.
4. Create/move/edit/delete nodes and edges.
5. Confirm chat messages arrive in realtime.
6. Confirm activity feed updates.
7. Generate an invite as `owner` and accept it from the second session.

## Conventions

- New filenames use kebab-case.
- Do not place reusable domain logic in `page.tsx`.
- Use `src/hooks` only for generic hooks.
- Keep client components focused on interaction/state; keep data reads SSR-first where reasonable.
