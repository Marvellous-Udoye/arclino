export type AuthMode = "login" | "signup"

export type AuthUserProfile = {
  id: string
  email: string
  fullName: string | null
  avatarUrl: string | null
}

export type SessionWorkspace = {
  workspaceId: string
  role: "owner" | "editor" | "viewer"
}
