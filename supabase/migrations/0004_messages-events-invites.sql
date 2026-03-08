create table if not exists public.board_messages (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.boards(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(trim(body)) > 0),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.board_events (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.boards(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  actor_user_id uuid not null references auth.users(id) on delete cascade,
  type public.board_event_type not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.board_invite_links (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.boards(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  token text not null unique,
  role public.invite_role not null,
  created_by uuid not null references auth.users(id) on delete cascade,
  expires_at timestamptz,
  max_uses integer check (max_uses is null or max_uses > 0),
  uses_count integer not null default 0,
  revoked_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists board_events_board_created_idx
  on public.board_events(board_id, created_at desc);

create index if not exists board_messages_board_created_idx
  on public.board_messages(board_id, created_at desc);

create index if not exists board_invite_links_board_id_idx
  on public.board_invite_links(board_id);

drop trigger if exists board_invite_links_set_updated_at on public.board_invite_links;
create trigger board_invite_links_set_updated_at
before update on public.board_invite_links
for each row
execute function public.set_updated_at();

create or replace function public.accept_board_invite(_token text)
returns table (
  board_id uuid,
  workspace_id uuid,
  granted_role public.workspace_role,
  membership_created boolean,
  notice text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  invite_row public.board_invite_links%rowtype;
  existing_role public.workspace_role;
  computed_notice text;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  select *
  into invite_row
  from public.board_invite_links invite
  where invite.token = _token
  limit 1;

  if invite_row.id is null then
    raise exception 'Invite not found';
  end if;

  if invite_row.revoked_at is not null then
    raise exception 'Invite has been revoked';
  end if;

  if invite_row.expires_at is not null and invite_row.expires_at < timezone('utc', now()) then
    raise exception 'Invite has expired';
  end if;

  if invite_row.max_uses is not null and invite_row.uses_count >= invite_row.max_uses then
    raise exception 'Invite usage limit reached';
  end if;

  select member.role
  into existing_role
  from public.workspace_members member
  where member.workspace_id = invite_row.workspace_id
    and member.user_id = auth.uid()
  limit 1;

  if existing_role is null then
    insert into public.workspace_members(workspace_id, user_id, role)
    values (
      invite_row.workspace_id,
      auth.uid(),
      case invite_row.role
        when 'editor' then 'editor'::public.workspace_role
        else 'viewer'::public.workspace_role
      end
    );

    update public.board_invite_links
    set uses_count = uses_count + 1
    where id = invite_row.id;

    insert into public.board_events(board_id, workspace_id, actor_user_id, type, payload)
    values (
      invite_row.board_id,
      invite_row.workspace_id,
      auth.uid(),
      'invite_accepted',
      jsonb_build_object('invite_id', invite_row.id, 'role', invite_row.role)
    );

    board_id := invite_row.board_id;
    workspace_id := invite_row.workspace_id;
    granted_role := case invite_row.role
      when 'editor' then 'editor'::public.workspace_role
      else 'viewer'::public.workspace_role
    end;
    membership_created := true;
    notice := null;
    return next;
    return;
  end if;

  if existing_role = 'viewer' and invite_row.role = 'editor' then
    computed_notice := 'You already belong to this workspace as a viewer. Ask an owner to upgrade your role.';
  end if;

  board_id := invite_row.board_id;
  workspace_id := invite_row.workspace_id;
  granted_role := existing_role;
  membership_created := false;
  notice := computed_notice;
  return next;
end;
$$;
