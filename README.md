# Arclino

Arclino is a realtime collaborative flowchart workspace. The current implementation prioritizes SSR, Supabase Auth, strict RLS, Pusher presence/events, React Flow canvas persistence, workspace roles, chat, activity, and invite links.

## Stack

- Next.js 16 App Router
- React 19 + TypeScript
- TailwindCSS 4 + shadcn/ui
- Supabase Auth + Postgres
- Pusher presence/private channels
- React Flow
- Zustand
- Zod
- React Hook Form

## Routes

Public marketing:

- `/`
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

Auth:

- `/login`
- `/signup`
- `/forgot-password`
- `/callback`

Protected app:

- `/dashboard`
- `/dashboard/boards/[boardId]`
- `/dashboard/settings/members`
- `/dashboard/settings/profile`
- `/onboarding/workspace`
- `/invite/board/[token]`

API routes:

- `/api/session`
- `/api/pusher/auth`
- `/api/proxy-auth/[...path]`

## Architecture

Pages under `src/app` are intentionally thin. They do SSR session/data loading and compose feature modules.

Business logic lives under `src/features/*`:

- `auth`
- `workspace`
- `boards`
- `canvas`
- `realtime`
- `chat`
- `activity`
- `invites`

Each feature can contain:

- `actions/` for server actions
- `components/` for UI
- `queries/` for SSR data loading helpers
- `schemas/` for Zod validation
- `hooks/` for domain-specific client hooks
- `utils/` for feature-local helpers

Global/shared areas:

- `src/lib/supabase/*` for SSR, browser, admin, and middleware clients
- `src/lib/pusher/*` for client/server Pusher helpers
- `src/lib/auth/session.ts` for route/session guards
- `src/stores/board-store.ts` for hydrated board state and typed realtime application
- `src/hooks/*` only for generic hooks
- `supabase/migrations/*` for schema, RPCs, indexes, and RLS

## Roles

Workspace roles are workspace-wide:

- `owner`: manage members, invite links, boards
- `editor`: create/update boards, nodes, edges, activity
- `viewer`: read boards and send chat only

## Realtime

Pusher channels:

- `presence-board-[boardId]`
- `private-board-[boardId]` (reserved for future/private fan-out)

Broadcast event types:

- `board:node_created`
- `board:node_updated`
- `board:node_moved`
- `board:node_deleted`
- `board:edge_created`
- `board:edge_updated`
- `board:edge_deleted`
- `board:chat_message`
- `board:node_lock`
- `board:node_unlock`

The client subscribes once per board and applies remote events through a single Zustand handler.

## Database

Migrations live in `supabase/migrations` and create:

- `profiles`
- `workspaces`
- `workspace_members`
- `boards`
- `board_nodes`
- `board_edges`
- `board_messages`
- `board_events`
- `board_invite_links`

Important database behavior:

- strict RLS on every table
- membership required for board reads
- viewers can only write `board_messages`
- owners only can manage invite links and workspace membership
- atomic RPCs for `ensure_profile`, `create_workspace_with_owner`, and `accept_board_invite`

## Environment

Copy `.env.example` to `.env.local` and provide:

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

Checks:

```bash
pnpm check-types
pnpm exec eslint src middleware.ts
```

## Manual Verification

Use two browser sessions, one normal and one incognito:

1. Sign in as two users in the same workspace.
2. Open the same board in both sessions.
3. Confirm presence updates on join/leave.
4. Create, move, edit, and delete nodes and edges.
5. Confirm chat messages appear in realtime.
6. Confirm activity feed updates and remains capped to 50 recent rows.
7. Generate an invite as owner and accept it from the second session.

## Conventions

- All new filenames use kebab-case.
- Do not put domain logic directly in `page.tsx`.
- Validate all server-side inputs with Zod.
- Use `src/hooks` only for generic hooks.
- Treat Supabase RLS as the source of truth for authorization.
