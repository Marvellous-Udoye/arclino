import Link from "next/link"
import { Mail } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-white/10 bg-black/70 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Reset password</CardTitle>
          <CardDescription className="text-zinc-400">
            We will email you a reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Work email</FieldLabel>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    className="border-white/10 bg-black/60 pl-10 text-white placeholder:text-zinc-600"
                  />
                </div>
              </Field>
              <Field>
                <Button type="submit" className="bg-cyan-500 text-black hover:bg-cyan-400">
                  Send reset link
                </Button>
                <FieldDescription className="text-center text-zinc-400">
                  <Link href="/auth/login" className="text-white hover:underline">
                    Back to sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}




