import Pusher from "pusher"

let pusherServer: Pusher | undefined

export function getPusherServer() {
  if (pusherServer) {
    return pusherServer
  }

  pusherServer = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.PUSHER_CLUSTER!,
    useTLS: true,
  })

  return pusherServer
}
