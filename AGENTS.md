# AGENTS.md - Arclino Frontend

This file defines the active architecture and implementation rules for AI agents working in this repository. Follow this document over stale code patterns.

## Product Goal

Arclino is a realtime collaborative flowchart workspace for teams. The priority is application correctness and security, not premium landing-page polish.

Ship these capabilities end-to-end:

- Supabase Auth with email/password and Google OAuth
- SSR-safe session handling in Next.js App Router
- workspace creation and workspace-wide roles
- boards list and board room
- React Flow canvas persistence
- Pusher presence and realtime board events
- chat and activity feed
- board invite links
- strict Supabase RLS and validated server boundaries

## Non-Negotiables

- Next.js App Router + TypeScript
- Supabase Auth and Postgres
- strict RLS for access control
- Pusher for presence and events, never socket.io
- React Flow for nodes/edges/canvas interactions
- Zustand for hydrated board state and applying remote events
- Zod validation at server boundaries
- feature-based architecture under `src/features/*`
- kebab-case filenames for new files

## Route Contract

Marketing routes remain public under `src/app/(external)`:

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

Auth routes live in `src/app/(auth)` and resolve to:

- `/login`
- `/signup`
- `/forgot-password`
- `/callback`

Protected app routes live in `src/app/(dashboard)` and resolve to:

- `/dashboard`
- `/dashboard/boards/[boardId]`
- `/dashboard/settings/members`
- `/dashboard/settings/profile`

Other required routes:

- `/onboarding/workspace`
- `/invite/board/[token]`
- `/api/session`
- `/api/pusher/auth`
- `/api/proxy-auth/[...path]`

## Folder Rules

Pages under `src/app` must be thin:

- do SSR session and initial data loading
- compose feature components
- redirect when needed
- do not place complex domain logic directly in `page.tsx`

Business logic belongs in feature folders:

```text
src/features/
  auth/
  workspace/
  boards/
  canvas/
  realtime/
  chat/
  activity/
  invites/
```

Feature folders may include:

- `components/`
- `actions/`
- `queries/`
- `schemas/`
- `hooks/`
- `utils/`

Shared areas:

- `src/lib/supabase/*` for SSR/browser/admin/middleware clients
- `src/lib/pusher/*` for Pusher client/server setup
- `src/lib/auth/session.ts` for auth and workspace routing helpers
- `src/stores/*` for Zustand stores
- `src/types/*` for shared TS types
- `src/hooks/*` only for generic hooks, never domain hooks

## Current Build Order

1. Supabase migrations + RLS
2. Auth + SSR session handling + route protection
3. Onboarding workspace creation
4. Dashboard boards list + SSR board fetch
5. Canvas CRUD + persistence
6. Pusher auth + realtime + presence + soft locks
7. Chat
8. Activity feed
9. Invite links
10. Docs sync

## Auth and Session Rules

- Use Supabase SSR helpers from `src/lib/supabase/*`
- Middleware protects `/dashboard`, `/onboarding`, and `/invite/board`
- Do not reintroduce manual token cookies
- On first authenticated session, ensure a `profiles` row exists
- Redirect users without a workspace to `/onboarding/workspace`

## Authorization Rules

Workspace roles are:

- `owner`
- `editor`
- `viewer`

Permissions:

- `viewer`: read boards/nodes/edges/events and send chat only
- `editor`: create/update/delete boards/nodes/edges and write activity
- `owner`: everything editors can do plus member/invite management

Roles are workspace-level only in v1. Do not add board-level role overrides.

## Realtime Rules

Use Pusher channels:

- `presence-board-[boardId]`
- `private-board-[boardId]`

Supported board events:

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

Implementation requirements:

- authorize channels in `/api/pusher/auth`
- verify board workspace membership before authorizing
- never expose server secrets client-side
- apply all remote events through the typed Zustand reducer in `src/stores/board-store.ts`
- throttle node move persistence/broadcasting to roughly 50-100ms
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

## UI and Implementation Bias

- Minimal UI is acceptable
- Preserve existing dark styling primitives where convenient
- Prefer server components for data reads
- Keep client components focused on interaction/state
- Do not spend time on ornamental marketing polish until product functionality is correct

## Testing Expectations

Before closing substantial work, validate:

- `pnpm check-types`
- `pnpm exec eslint src middleware.ts`

Manual product checks should include:

1. Login/signup/OAuth
2. Onboarding redirect behavior
3. Board creation and SSR board loading
4. Node and edge CRUD for owner/editor
5. Viewer edit restrictions
6. Presence in two sessions
7. Realtime chat delivery
8. Activity feed updates
9. Invite acceptance flow and role preservation

## Notes for Future Agents

- If a route or component pattern conflicts with the feature architecture, favor the feature architecture.
- Keep `page.tsx` thin.
- Keep filenames kebab-case.
- Use Zod at server boundaries.
- Treat Supabase RLS as the source of truth for authorization.
