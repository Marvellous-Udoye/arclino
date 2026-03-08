import { redirect } from "next/navigation"
import { ProfileCard } from "@/features/auth/components/profile-card"
import { getProfile } from "@/features/auth/queries/get-profile"
import { requireUser } from "@/lib/auth/session"

export default async function ProfileSettingsPage() {
  const user = await requireUser("/dashboard/settings/profile")
  const profile = await getProfile(user.id)

  if (!profile) {
    redirect("/dashboard")
  }

  return (
    <ProfileCard
      email={profile.email}
      fullName={profile.full_name}
      avatarUrl={profile.avatar_url}
    />
  )
}
