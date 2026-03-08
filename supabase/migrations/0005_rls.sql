alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.boards enable row level security;
alter table public.board_nodes enable row level security;
alter table public.board_edges enable row level security;
alter table public.board_messages enable row level security;
alter table public.board_events enable row level security;
alter table public.board_invite_links enable row level security;

drop policy if exists "profiles_select_self" on public.profiles;
create policy "profiles_select_self"
on public.profiles
for select
using (id = auth.uid());

drop policy if exists "profiles_insert_self" on public.profiles;
create policy "profiles_insert_self"
on public.profiles
for insert
with check (id = auth.uid());

drop policy if exists "profiles_update_self" on public.profiles;
create policy "profiles_update_self"
on public.profiles
for update
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "workspaces_select_member" on public.workspaces;
create policy "workspaces_select_member"
on public.workspaces
for select
using (public.is_workspace_member(id));

drop policy if exists "workspaces_insert_owner" on public.workspaces;
create policy "workspaces_insert_owner"
on public.workspaces
for insert
with check (created_by = auth.uid());

drop policy if exists "workspaces_update_owner" on public.workspaces;
create policy "workspaces_update_owner"
on public.workspaces
for update
using (public.workspace_role(id) = 'owner')
with check (public.workspace_role(id) = 'owner');

drop policy if exists "workspaces_delete_owner" on public.workspaces;
create policy "workspaces_delete_owner"
on public.workspaces
for delete
using (public.workspace_role(id) = 'owner');

drop policy if exists "workspace_members_select_member" on public.workspace_members;
create policy "workspace_members_select_member"
on public.workspace_members
for select
using (public.is_workspace_member(workspace_id));

drop policy if exists "workspace_members_insert_owner" on public.workspace_members;
create policy "workspace_members_insert_owner"
on public.workspace_members
for insert
with check (public.workspace_role(workspace_id) = 'owner');

drop policy if exists "workspace_members_update_owner" on public.workspace_members;
create policy "workspace_members_update_owner"
on public.workspace_members
for update
using (public.workspace_role(workspace_id) = 'owner')
with check (public.workspace_role(workspace_id) = 'owner');

drop policy if exists "workspace_members_delete_owner" on public.workspace_members;
create policy "workspace_members_delete_owner"
on public.workspace_members
for delete
using (public.workspace_role(workspace_id) = 'owner');

drop policy if exists "boards_select_member" on public.boards;
create policy "boards_select_member"
on public.boards
for select
using (public.is_workspace_member(workspace_id) and deleted_at is null);

drop policy if exists "boards_insert_editor_or_owner" on public.boards;
create policy "boards_insert_editor_or_owner"
on public.boards
for insert
with check (public.workspace_role(workspace_id) in ('owner', 'editor'));

drop policy if exists "boards_update_editor_or_owner" on public.boards;
create policy "boards_update_editor_or_owner"
on public.boards
for update
using (public.workspace_role(workspace_id) in ('owner', 'editor'))
with check (public.workspace_role(workspace_id) in ('owner', 'editor'));

drop policy if exists "boards_delete_editor_or_owner" on public.boards;
create policy "boards_delete_editor_or_owner"
on public.boards
for delete
using (public.workspace_role(workspace_id) in ('owner', 'editor'));

drop policy if exists "board_nodes_select_member" on public.board_nodes;
create policy "board_nodes_select_member"
on public.board_nodes
for select
using (public.is_workspace_member(workspace_id));

drop policy if exists "board_nodes_insert_editor_or_owner" on public.board_nodes;
create policy "board_nodes_insert_editor_or_owner"
on public.board_nodes
for insert
with check (
  public.workspace_role(workspace_id) in ('owner', 'editor')
  and created_by = auth.uid()
);

drop policy if exists "board_nodes_update_editor_or_owner" on public.board_nodes;
create policy "board_nodes_update_editor_or_owner"
on public.board_nodes
for update
using (public.workspace_role(workspace_id) in ('owner', 'editor'))
with check (public.workspace_role(workspace_id) in ('owner', 'editor'));

drop policy if exists "board_nodes_delete_editor_or_owner" on public.board_nodes;
create policy "board_nodes_delete_editor_or_owner"
on public.board_nodes
for delete
using (public.workspace_role(workspace_id) in ('owner', 'editor'));

drop policy if exists "board_edges_select_member" on public.board_edges;
create policy "board_edges_select_member"
on public.board_edges
for select
using (public.is_workspace_member(workspace_id));

drop policy if exists "board_edges_insert_editor_or_owner" on public.board_edges;
create policy "board_edges_insert_editor_or_owner"
on public.board_edges
for insert
with check (
  public.workspace_role(workspace_id) in ('owner', 'editor')
  and created_by = auth.uid()
);

drop policy if exists "board_edges_update_editor_or_owner" on public.board_edges;
create policy "board_edges_update_editor_or_owner"
on public.board_edges
for update
using (public.workspace_role(workspace_id) in ('owner', 'editor'))
with check (public.workspace_role(workspace_id) in ('owner', 'editor'));

drop policy if exists "board_edges_delete_editor_or_owner" on public.board_edges;
create policy "board_edges_delete_editor_or_owner"
on public.board_edges
for delete
using (public.workspace_role(workspace_id) in ('owner', 'editor'));

drop policy if exists "board_messages_select_member" on public.board_messages;
create policy "board_messages_select_member"
on public.board_messages
for select
using (public.is_workspace_member(workspace_id));

drop policy if exists "board_messages_insert_member" on public.board_messages;
create policy "board_messages_insert_member"
on public.board_messages
for insert
with check (
  public.workspace_role(workspace_id) in ('owner', 'editor', 'viewer')
  and user_id = auth.uid()
);

drop policy if exists "board_events_select_member" on public.board_events;
create policy "board_events_select_member"
on public.board_events
for select
using (public.is_workspace_member(workspace_id));

drop policy if exists "board_events_insert_editor_or_owner" on public.board_events;
create policy "board_events_insert_editor_or_owner"
on public.board_events
for insert
with check (
  public.workspace_role(workspace_id) in ('owner', 'editor')
  and actor_user_id = auth.uid()
);

drop policy if exists "board_invite_links_select_owner" on public.board_invite_links;
create policy "board_invite_links_select_owner"
on public.board_invite_links
for select
using (public.workspace_role(workspace_id) = 'owner');

drop policy if exists "board_invite_links_insert_owner" on public.board_invite_links;
create policy "board_invite_links_insert_owner"
on public.board_invite_links
for insert
with check (
  public.workspace_role(workspace_id) = 'owner'
  and created_by = auth.uid()
);

drop policy if exists "board_invite_links_update_owner" on public.board_invite_links;
create policy "board_invite_links_update_owner"
on public.board_invite_links
for update
using (public.workspace_role(workspace_id) = 'owner')
with check (public.workspace_role(workspace_id) = 'owner');

grant execute on function public.ensure_profile(text) to authenticated;
grant execute on function public.create_workspace_with_owner(text) to authenticated;
grant execute on function public.accept_board_invite(text) to authenticated;
