"use client"

import Pusher from "pusher-js"

let pusherClient: Pusher | undefined

export function getPusherClient() {
  if (pusherClient) {
    return pusherClient
  }

  pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    channelAuthorization: {
      endpoint: "/api/pusher/auth",
      transport: "ajax",
    },
  })

  return pusherClient
}
