import { BoardRoom } from "@/features/boards/components/board-room"
import { getBoardRoomData } from "@/features/boards/queries/get-board-room-data"
import { requireUser } from "@/lib/auth/session"

export default async function BoardPage({
  params,
  searchParams,
}: {
  params: Promise<{ boardId: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const user = await requireUser()
  const { boardId } = await params
  const resolvedSearchParams = await searchParams
  const data = await getBoardRoomData(boardId, user.id)
  const inviteNotice =
    typeof resolvedSearchParams["invite-notice"] === "string"
      ? resolvedSearchParams["invite-notice"]
      : null

  return <BoardRoom data={data} inviteNotice={inviteNotice} />
}
