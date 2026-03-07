import { ForgotPasswordForm } from "@/app/(auth)/_components/forgot-password-form"
import { AuthCardMotion } from "@/lib/motion"

export const metadata = {
  title: "Reset password -- Arclino",
  description: "Reset your Arclino password.",
}

export default function ForgotPasswordPage() {
  return (
    <AuthCardMotion>
      <ForgotPasswordForm />
    </AuthCardMotion>
  )
}




