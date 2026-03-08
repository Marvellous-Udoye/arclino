import { z } from "zod"

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  next: z.string().optional(),
})

export const signupSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.email(),
  password: z.string().min(8),
})

export const forgotPasswordSchema = z.object({
  email: z.email(),
})

export const authCallbackSchema = z.object({
  code: z.string().optional(),
  next: z.string().optional(),
})
