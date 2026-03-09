"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { ArrowRight, Github, Lock, Mail, User } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupAction } from "@/features/auth/actions/auth-actions"
import { signupSchema } from "@/features/auth/schemas/auth-schema"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
      const result = await signupAction(values)

      if (result?.error) {
        setError(result.error)
        return
      }

      if (result?.data?.immediate) {
        router.replace(result.data.next ?? "/dashboard")
        router.refresh()
        return
      }

      setMessage(
        result?.data?.message ??
          "Check your email to confirm your account, then continue to the app."
      )
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
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-10"
      >
        <h2 className="mb-2 text-3xl font-black tracking-tight">Create account</h2>
        <p className="text-sm text-muted-foreground">
          Set up your account and start collaborating.
        </p>
      </motion.div>

      <div className="mb-8 grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-xl border-border/60 py-6 text-xs font-black uppercase tracking-widest"
          onClick={signInWithGoogle}
          disabled={isPending}
        >
                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-xl border-border/60 py-6 text-xs font-black uppercase tracking-widest"
          disabled
        >
          <Github className="size-4" />
          Github
        </Button>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border/40" />
        </div>
        <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
          <span className="bg-background px-4 text-muted-foreground">
            or continue with email
          </span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label
            htmlFor="full-name"
            className="ml-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground"
          >
            Full name
          </label>
          <div className="group relative">
            <User className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              id="full-name"
              placeholder="Ariana Wood"
              className="h-14 rounded-xl border-border/40 bg-muted/20 pl-12"
              {...form.register("fullName")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="ml-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground"
          >
            Email address
          </label>
          <div className="group relative">
            <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              className="h-14 rounded-xl border-border/40 bg-muted/20 pl-12"
              {...form.register("email")}
            />
          </div>

        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="ml-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground"
          >
            Password
          </label>
          <div className="group relative">
            <Lock className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-14 rounded-xl border-border/40 bg-muted/20 pl-12"
              {...form.register("password")}
            />
          </div>
        </div>

        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        {message ? <p className="text-sm text-emerald-400">{message}</p> : null}

        <Button
          className="h-14 w-full gap-3 rounded-xl text-xs font-black uppercase tracking-[0.2em]"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create account"}
          <ArrowRight className="size-4" />
        </Button>
      </form>

      <p className="mt-10 text-center text-sm font-medium text-muted-foreground">
        Already have an account?
        <Link href="/login" className="ml-1 font-black text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
