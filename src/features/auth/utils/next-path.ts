export function getSafeNextPath(next: string | null | undefined, fallback = "/dashboard") {
  if (!next || !next.startsWith("/")) {
    return fallback
  }

  if (next.startsWith("//")) {
    return fallback
  }

  return next
}
