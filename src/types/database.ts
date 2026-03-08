export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      workspaces: {
        Row: {
          id: string
          name: string
          slug: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          slug?: string | null
          updated_at?: string
        }
      }
      workspace_members: {
        Row: {
          id: string
          workspace_id: string
          user_id: string
          role: "owner" | "editor" | "viewer"
          created_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          user_id: string
          role: "owner" | "editor" | "viewer"
          created_at?: string
        }
        Update: {
          role?: "owner" | "editor" | "viewer"
        }
      }
      boards: {
        Row: {
          id: string
          workspace_id: string
          name: string
          description: string | null
          created_by: string
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          workspace_id: string
          name: string
          description?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          name?: string
          description?: string | null
          updated_at?: string
          deleted_at?: string | null
        }
      }
      board_nodes: {
        Row: {
          id: string
          board_id: string
          workspace_id: string
          type: "step" | "decision" | "input-output" | "system" | "database" | "note"
          label: string
          data: Json
          position_x: number
          position_y: number
          width: number | null
          height: number | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          board_id: string
          workspace_id: string
          type: "step" | "decision" | "input-output" | "system" | "database" | "note"
          label: string
          data?: Json
          position_x: number
          position_y: number
          width?: number | null
          height?: number | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          label?: string
          type?: "step" | "decision" | "input-output" | "system" | "database" | "note"
          data?: Json
          position_x?: number
          position_y?: number
          width?: number | null
          height?: number | null
          updated_at?: string
        }
      }
      board_edges: {
        Row: {
          id: string
          board_id: string
          workspace_id: string
          source_node_id: string
          target_node_id: string
          label: string | null
          data: Json
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          board_id: string
          workspace_id: string
          source_node_id: string
          target_node_id: string
          label?: string | null
          data?: Json
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          label?: string | null
          data?: Json
          updated_at?: string
        }
      }
      board_messages: {
        Row: {
          id: string
          board_id: string
          workspace_id: string
          user_id: string
          body: string
          created_at: string
        }
        Insert: {
          id?: string
          board_id: string
          workspace_id: string
          user_id: string
          body: string
          created_at?: string
        }
        Update: never
      }
      board_events: {
        Row: {
          id: string
          board_id: string
          workspace_id: string
          actor_user_id: string
          type: string
          payload: Json
          created_at: string
        }
        Insert: {
          id?: string
          board_id: string
          workspace_id: string
          actor_user_id: string
          type: string
          payload?: Json
          created_at?: string
        }
        Update: never
      }
      board_invite_links: {
        Row: {
          id: string
          board_id: string
          workspace_id: string
          token: string
          role: "editor" | "viewer"
          created_by: string
          expires_at: string | null
          max_uses: number | null
          uses_count: number
          revoked_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          board_id: string
          workspace_id: string
          token: string
          role: "editor" | "viewer"
          created_by: string
          expires_at?: string | null
          max_uses?: number | null
          uses_count?: number
          revoked_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          expires_at?: string | null
          max_uses?: number | null
          uses_count?: number
          revoked_at?: string | null
          updated_at?: string
        }
      }
    }
    Functions: {
      ensure_profile: {
        Args: { full_name?: string | null }
        Returns: Database["public"]["Tables"]["profiles"]["Row"]
      }
      create_workspace_with_owner: {
        Args: { _name: string }
        Returns: Database["public"]["Tables"]["workspaces"]["Row"]
      }
      accept_board_invite: {
        Args: { _token: string }
        Returns: {
          board_id: string
          workspace_id: string
          granted_role: "owner" | "editor" | "viewer"
          membership_created: boolean
          notice: string | null
        }[]
      }
    }
  }
}
