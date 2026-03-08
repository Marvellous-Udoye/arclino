"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema } from "@/features/auth/schemas/auth-schema"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type SignupValues = {
  fullName: string
  email: string
  password: string
}

export function SignupForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      setError(null)
      setMessage(null)
      const supabase = createClient()

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
            name: values.fullName,
          },
          emailRedirectTo: `${window.location.origin}/callback?next=/dashboard`,
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      if (data.session) {
        await supabase.rpc("ensure_profile", { full_name: values.fullName })
        router.replace("/dashboard")
        router.refresh()
        return
      }

      setMessage("Check your email to confirm your account, then continue to the app.")
    })
  })

  const signInWithGoogle = () => {
    startTransition(async () => {
      setError(null)
      const supabase = createClient()
      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/callback?next=/dashboard`,
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
        <CardTitle>Create account</CardTitle>
        <CardDescription>Start a workspace and collaborate in realtime.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button type="button" variant="outline" className="w-full" onClick={signInWithGoogle} disabled={isPending}>
          Continue with Google
        </Button>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="full-name">Full name</Label>
            <Input id="full-name" {...form.register("fullName")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...form.register("password")} />
          </div>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          {message ? <p className="text-sm text-emerald-400">{message}</p> : null}
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Creating account..." : "Create account"}
          </Button>
        </form>
        <p className="text-sm text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
