import Link from "next/link"
import { Mail, Lock, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-white/10 bg-black/70 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Create account</CardTitle>
          <CardDescription className="text-zinc-400">
            Start building real-time flows with your team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <FieldGroup>
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  className="border-white/10 bg-transparent text-white hover:bg-white/10"
                >
                  Continue with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-black/80">
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="name">Full name</FieldLabel>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                  <Input
                    id="name"
                    placeholder="Ariana Wood"
                    required
                    className="border-white/10 bg-black/60 pl-10 text-white placeholder:text-zinc-600"
                  />
                </div>
              </Field>
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
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                    className="border-white/10 bg-black/60 pl-10 text-white placeholder:text-zinc-600"
                  />
                </div>
              </Field>
              <Field>
                <Button type="submit" className="bg-cyan-500 text-black hover:bg-cyan-400">
                  Create account
                </Button>
                <FieldDescription className="text-center text-zinc-400">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-white hover:underline">
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-zinc-500">
        By continuing, you agree to our{" "}
        <Link href="/legal/terms" className="text-white hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/legal/privacy" className="text-white hover:underline">
          Privacy Policy
        </Link>.
      </FieldDescription>
    </div>
  )
}




