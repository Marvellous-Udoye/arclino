create table if not exists public.boards (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null check (char_length(trim(name)) >= 2),
  description text,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table if not exists public.board_nodes (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.boards(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  type public.node_kind not null,
  label text not null,
  data jsonb not null default '{}'::jsonb,
  position_x double precision not null default 0,
  position_y double precision not null default 0,
  width double precision,
  height double precision,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.board_edges (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.boards(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  source_node_id uuid not null references public.board_nodes(id) on delete cascade,
  target_node_id uuid not null references public.board_nodes(id) on delete cascade,
  label text,
  data jsonb not null default '{}'::jsonb,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists boards_workspace_id_idx
  on public.boards(workspace_id);

create index if not exists boards_workspace_updated_idx
  on public.boards(workspace_id, updated_at desc);

create index if not exists board_nodes_board_id_idx
  on public.board_nodes(board_id);

create index if not exists board_nodes_workspace_id_idx
  on public.board_nodes(workspace_id);

create index if not exists board_nodes_board_updated_idx
  on public.board_nodes(board_id, updated_at desc);

create index if not exists board_edges_board_id_idx
  on public.board_edges(board_id);

create index if not exists board_edges_workspace_id_idx
  on public.board_edges(workspace_id);

create index if not exists board_edges_board_updated_idx
  on public.board_edges(board_id, updated_at desc);

create or replace function public.board_workspace_id(_board_id uuid)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select board.workspace_id
  from public.boards board
  where board.id = _board_id
    and board.deleted_at is null
  limit 1;
$$;

create or replace function public.is_board_member(_board_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_workspace_member(public.board_workspace_id(_board_id));
$$;

drop trigger if exists boards_set_updated_at on public.boards;
create trigger boards_set_updated_at
before update on public.boards
for each row
execute function public.set_updated_at();

drop trigger if exists board_nodes_set_updated_at on public.board_nodes;
create trigger board_nodes_set_updated_at
before update on public.board_nodes
for each row
execute function public.set_updated_at();

drop trigger if exists board_edges_set_updated_at on public.board_edges;
create trigger board_edges_set_updated_at
before update on public.board_edges
for each row
execute function public.set_updated_at();
