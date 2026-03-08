create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) >= 2),
  slug text unique,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.workspace_role not null,
  created_at timestamptz not null default timezone('utc', now()),
  unique(workspace_id, user_id)
);

create index if not exists workspace_members_user_id_idx
  on public.workspace_members(user_id);

create or replace function public.is_workspace_member(_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(
    select 1
    from public.workspace_members member
    where member.workspace_id = _workspace_id
      and member.user_id = auth.uid()
  );
$$;

create or replace function public.workspace_role(_workspace_id uuid)
returns public.workspace_role
language sql
stable
security definer
set search_path = public
as $$
  select member.role
  from public.workspace_members member
  where member.workspace_id = _workspace_id
    and member.user_id = auth.uid()
  limit 1;
$$;

create or replace function public.ensure_profile(full_name text default null)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user auth.users%rowtype;
  profile_row public.profiles%rowtype;
begin
  select *
  into current_user
  from auth.users
  where id = auth.uid();

  if current_user.id is null then
    raise exception 'Authentication required';
  end if;

  insert into public.profiles(id, email, full_name, avatar_url)
  values (
    current_user.id,
    coalesce(current_user.email, ''),
    coalesce(full_name, current_user.raw_user_meta_data ->> 'full_name', current_user.raw_user_meta_data ->> 'name'),
    current_user.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url),
    updated_at = timezone('utc', now())
  returning * into profile_row;

  return profile_row;
end;
$$;

create or replace function public.create_workspace_with_owner(_name text)
returns public.workspaces
language plpgsql
security definer
set search_path = public
as $$
declare
  created_workspace public.workspaces%rowtype;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if exists (
    select 1 from public.workspace_members where user_id = auth.uid()
  ) then
    raise exception 'User already belongs to a workspace';
  end if;

  insert into public.workspaces(name, created_by)
  values (trim(_name), auth.uid())
  returning * into created_workspace;

  insert into public.workspace_members(workspace_id, user_id, role)
  values (created_workspace.id, auth.uid(), 'owner');

  return created_workspace;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists workspaces_set_updated_at on public.workspaces;
create trigger workspaces_set_updated_at
before update on public.workspaces
for each row
execute function public.set_updated_at();
