"use server"

import { createClient } from "@/lib/supabase/server"
import { forgotPasswordSchema, loginSchema, signupSchema } from "@/features/auth/schemas/auth-schema"
import { getAppUrl } from "@/features/auth/utils/get-app-url"
import { getPostAuthPath } from "@/features/auth/utils/get-post-auth-path"

export async function loginAction(input: {
  email: string
  password: string
  next?: string
}) {
  const parsed = loginSchema.safeParse(input)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid login details." }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  })

  if (error) {
    return { error: error.message }
  }

  await supabase.rpc("ensure_profile")
  const nextPath = data.user ? await getPostAuthPath(data.user.id) : parsed.data.next ?? "/dashboard"
  const shouldHonorRequestedNext =
    parsed.data.next && parsed.data.next !== "/dashboard"

  return { data: { next: shouldHonorRequestedNext ? parsed.data.next : nextPath } }
}

export async function signupAction(input: {
  fullName: string
  email: string
  password: string
}) {
  const parsed = signupSchema.safeParse(input)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid signup details." }
  }

  const supabase = await createClient()
  const appUrl = await getAppUrl()
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.fullName,
        name: parsed.data.fullName,
      },
      emailRedirectTo: `${appUrl}/callback?next=/dashboard`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (data.session) {
    await supabase.rpc("ensure_profile", { full_name: parsed.data.fullName })
    const nextPath = data.user ? await getPostAuthPath(data.user.id) : "/dashboard"
    return { data: { immediate: true, next: nextPath } }
  }

  return {
    data: {
      immediate: false,
      message: "Check your email to confirm your account, then continue to the app.",
    },
  }
}

export async function forgotPasswordAction(input: { email: string }) {
  const parsed = forgotPasswordSchema.safeParse(input)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid email address." }
  }

  const supabase = await createClient()
  const appUrl = await getAppUrl()
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${appUrl}/callback?next=/dashboard`,
  })

  if (error) {
    return { error: error.message }
  }

  return {
    data: {
      message: "If an account exists, a reset link has been sent.",
    },
  }
}
