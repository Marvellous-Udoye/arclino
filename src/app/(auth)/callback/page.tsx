import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthCardMotion } from "@/lib/motion"

export const metadata = {
  title: "Authenticating -- Arclino",
}

export default function AuthCallbackPage() {
  return (
    <AuthCardMotion>
      <Card className="border-white/10 bg-black/70 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Completing sign-in</CardTitle>
          <CardDescription className="text-zinc-400">
            We are finalizing your session. You will be redirected shortly.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-zinc-400">
          Syncing your workspace and permissions.
        </CardContent>
      </Card>
    </AuthCardMotion>
  )
}




