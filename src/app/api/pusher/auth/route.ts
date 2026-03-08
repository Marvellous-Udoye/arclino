import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getPusherServer } from "@/lib/pusher/server"

function parseBoardId(channelName: string) {
  const match = channelName.match(/(?:presence|private)-board-(.+)$/)
  return match?.[1] ?? null
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const socketId = formData.get("socket_id")?.toString()
  const channelName = formData.get("channel_name")?.toString()

  if (!socketId || !channelName) {
    return NextResponse.json({ error: "Missing socket_id or channel_name" }, { status: 400 })
  }

  const boardId = parseBoardId(channelName)

  if (!boardId) {
    return NextResponse.json({ error: "Invalid channel" }, { status: 400 })
  }

  const { data: board, error: boardError } = await supabase
    .from("boards")
    .select("workspace_id")
    .eq("id", boardId)
    .is("deleted_at", null)
    .maybeSingle()

  if (boardError) {
    return NextResponse.json({ error: boardError.message }, { status: 400 })
  }

  if (!board) {
    return NextResponse.json({ error: "Board not found" }, { status: 404 })
  }

  const { data: membership, error: membershipError } = await supabase
    .from("workspace_members")
    .select("role")
    .eq("workspace_id", board.workspace_id)
    .eq("user_id", user.id)
    .maybeSingle()

  if (membershipError || !membership) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user.id)
    .maybeSingle()

  const pusher = getPusherServer()

  if (channelName.startsWith("presence-")) {
    const auth = pusher.authorizeChannel(socketId, channelName, {
      user_id: user.id,
      user_info: {
        id: user.id,
        name: profile?.full_name || profile?.email || user.email || "Teammate",
        email: profile?.email || user.email || "",
      },
    })

    return NextResponse.json(auth)
  }

  const auth = pusher.authorizeChannel(socketId, channelName)
  return NextResponse.json(auth)
}
