import { headers } from "next/headers"

export async function getAppUrl() {
  const headerStore = await headers()
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host")
  const proto = headerStore.get("x-forwarded-proto") ?? "http"

  if (!host) {
    const envUrl = process.env.NEXT_PUBLIC_APP_URL?.trim()
    if (envUrl) {
      return envUrl.replace(/\/+$/, "")
    }

    return "http://localhost:3000"
  }

  return `${proto}://${host}`
}
