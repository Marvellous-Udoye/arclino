"use client"

import { create } from "zustand"

type AppStore = {
  inviteNotice: string | null
  setInviteNotice: (notice: string | null) => void
}

export const useAppStore = create<AppStore>((set) => ({
  inviteNotice: null,
  setInviteNotice: (inviteNotice) => set({ inviteNotice }),
}))
