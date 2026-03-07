# Arclino

Arclino is a real-time collaborative flowchart workspace for product, engineering, and operations teams. It ships a premium marketing site and a protected app experience with workspace-based access control.

## Features

- Real-time collaboration (nodes, edges, chat, activity)
- Workspace-level roles (Owner, Editor, Viewer)
- Board invite links with role-gated access
- Presence and activity feed
- Supabase Auth + Postgres (RLS)
- Pusher realtime channels

## Tech Stack

- Next.js App Router
- React 19
- TypeScript
- TailwindCSS 4
- ShadCN UI
- Framer Motion
- Supabase
- Pusher
- React Flow

## Getting Started

### Requirements

- Node.js 20+
- pnpm 9+

### Install

```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```
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

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
pnpm start
```

## Project Structure

```
src/
+-- app/                          # Next.js App Router
ï¿½   +-- (external)/               # Marketing site routes
ï¿½   +-- (auth)/                   # Authentication routes
ï¿½   +-- (dashboard)/              # App shell and boards
ï¿½   +-- onboarding/               # Workspace creation
ï¿½   +-- invite/                   # Board invite link flows
ï¿½   +-- api/                      # Route handlers (proxy, session, pusher auth)
ï¿½   +-- loading.tsx               # Global loading
ï¿½   +-- error.tsx                 # Global error boundary
ï¿½   +-- not-found.tsx             # 404
+-- components/
ï¿½   +-- external/                 # External layout primitives (navbar/footer)
ï¿½   +-- dashboard/                # Dashboard blocks and layout parts
ï¿½   +-- ui/                       # ShadCN UI components
+-- lib/
ï¿½   +-- external/                 # External content sources
ï¿½   +-- motion.ts                 # Shared motion primitives
ï¿½   +-- pusher/                   # Realtime helpers (server/client)
ï¿½   +-- supabase/                 # Auth + DB helpers
ï¿½   +-- utils.ts                  # Utility helpers
+-- providers/                    # Theme + query providers
+-- stores/                       # Zustand stores
+-- types/                        # Shared TypeScript types

## Routes

### Marketing (External)

- `/`
- `/solutions/*`
- `/customers/*`
- `/resources/*`
- `/pricing`
- `/about`
- `/contact`
- `/security`
- `/legal/*`

### App

- `/auth/*`
- `/onboarding/workspace`
- `/app`
- `/app/boards/[boardId]`
- `/app/settings/*`
- `/invite/board/[token]`

## Data Model (Supabase)

Core tables:

- `profiles`
- `workspaces`
- `workspace_members`
- `boards`
- `board_nodes`
- `board_edges`
- `board_events`
- `board_messages`
- `board_comments` (optional)
- `board_invite_links`
- `invites`

## Realtime Channels

- `presence-board-[boardId]`
- `private-board-[boardId]`

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Conventions

- All filenames use kebab-case.
- Use ShadCN UI for all UI components.
- Validate server inputs with Zod.
- RLS is the source of truth for access control.

## License

Private.
