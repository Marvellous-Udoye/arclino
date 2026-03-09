"use client"

import Link from "next/link"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { ArrowRight, Mail } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgotPasswordAction } from "@/features/auth/actions/auth-actions"
import { forgotPasswordSchema } from "@/features/auth/schemas/auth-schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type ForgotPasswordValues = {
  email: string
}

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      setError(null)
      setMessage(null)
      const result = await forgotPasswordAction(values)

      if (result?.error) {
        setError(result.error)
        return
      }

      setMessage(result?.data?.message ?? "If an account exists, a reset link has been sent.")
    })
  })

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-10"
      >
        <h2 className="mb-2 text-3xl font-black tracking-tight">Reset password</h2>
        <p className="text-sm text-muted-foreground">
          Enter your email and we will send you a reset link.
        </p>
      </motion.div>

      <form className="space-y-6" onSubmit={onSubmit}>
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

        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        {message ? <p className="text-sm text-emerald-400">{message}</p> : null}

        <Button
          className="h-14 w-full gap-3 rounded-xl text-xs font-black uppercase tracking-[0.2em]"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send reset link"}
          <ArrowRight className="size-4" />
        </Button>
      </form>

      <p className="mt-10 text-center text-sm font-medium text-muted-foreground">
        <Link href="/login" className="font-black text-primary hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  )
}
