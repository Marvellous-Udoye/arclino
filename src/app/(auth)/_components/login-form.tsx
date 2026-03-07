import Link from "next/link"
import { Mail, Lock } from "lucide-react"

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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-white/10 bg-black/70 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">
            Sign in to Arclino
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Stay in sync with your team and your boards.
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-black/80">
                Or continue with
              </FieldSeparator>
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto text-sm text-zinc-400 underline-offset-4 hover:text-white hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
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
                  Sign in
                </Button>
                <FieldDescription className="text-center text-zinc-400">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/signup" className="text-white hover:underline">
                    Create one
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




