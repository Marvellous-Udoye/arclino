export type WorkspaceRole = "owner" | "editor" | "viewer"

export type WorkspaceSummary = {
  id: string
  name: string
  createdAt: string
  role: WorkspaceRole
}

export type WorkspaceMember = {
  id: string
  userId: string
  workspaceId: string
  role: WorkspaceRole
  createdAt: string
  profile: {
    email: string
    fullName: string | null
    avatarUrl: string | null
  } | null
}
