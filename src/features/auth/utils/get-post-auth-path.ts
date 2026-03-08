import { createClient } from "@/lib/supabase/server"

export async function getPostAuthPath(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("workspace_members")
    .select("workspace_id")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data ? "/dashboard" : "/onboarding/workspace"
}
