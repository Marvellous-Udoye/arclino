"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginAction } from "@/features/auth/actions/auth-actions"
import { loginSchema } from "@/features/auth/schemas/auth-schema"
import { getSafeNextPath } from "@/features/auth/utils/next-path"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type LoginValues = {
  email: string
  password: string
  next?: string
}

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = getSafeNextPath(searchParams.get("next"), "/dashboard")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      next,
    },
  })

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      setError(null)
      const result = await loginAction(values)

      if (result?.error) {
        setError(result.error)
        return
      }

      router.replace(result?.data?.next ?? next)
      router.refresh()
    })
  })

  const signInWithGoogle = () => {
    startTransition(async () => {
      setError(null)
      const supabase = createClient()
      const origin = window.location.origin
      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/callback?next=${encodeURIComponent(next)}`,
        },
      })

      if (oauthError) {
        setError(oauthError.message)
        return
      }

      if (data.url) {
        window.location.assign(data.url)
      }
    })
  }

  return (
    <Card className="w-full border-white/10 bg-black/70">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Access your boards and live workspace.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button type="button" variant="outline" className="w-full" onClick={signInWithGoogle} disabled={isPending}>
          Continue with Google
        </Button>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-sm text-zinc-400 hover:text-white">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" {...form.register("password")} />
          </div>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <p className="text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-white hover:underline">
            Create one
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
