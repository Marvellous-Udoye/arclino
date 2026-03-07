import { SignupForm } from "@/app/(auth)/_components/signup-form"
import { AuthCardMotion } from "@/lib/motion"

export const metadata = {
  title: "Sign up -- Arclino",
  description: "Create your Arclino workspace.",
}

export default function SignupPage() {
  return (
    <AuthCardMotion>
      <SignupForm />
    </AuthCardMotion>
  )
}




