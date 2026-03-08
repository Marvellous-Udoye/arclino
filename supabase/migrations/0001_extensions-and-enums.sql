create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'workspace_role') then
    create type public.workspace_role as enum ('owner', 'editor', 'viewer');
  end if;

  if not exists (select 1 from pg_type where typname = 'invite_role') then
    create type public.invite_role as enum ('editor', 'viewer');
  end if;

  if not exists (select 1 from pg_type where typname = 'node_kind') then
    create type public.node_kind as enum (
      'step',
      'decision',
      'input-output',
      'system',
      'database',
      'note'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'board_event_type') then
    create type public.board_event_type as enum (
      'board_created',
      'board_updated',
      'board_deleted',
      'node_created',
      'node_updated',
      'node_moved',
      'node_deleted',
      'edge_created',
      'edge_updated',
      'edge_deleted',
      'message_sent',
      'invite_accepted'
    );
  end if;
end
$$;
