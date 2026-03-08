"use client"

import * as React from "react"
import { LazyMotion, domAnimation, motion, useReducedMotion, type Variants } from "framer-motion"

export const viewportConfig = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -50px 0px",
}

export const staggerContainer = (stagger = 0.08, delayChildren = 0.02): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
})

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

const variantMap = {
  fadeUp: fadeInUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
} as const

type MotionDivProps = React.ComponentProps<typeof motion.div>

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return React.createElement(LazyMotion, { features: domAnimation }, children as React.ReactNode)
}

export function useReducedMotionPref() {
  return useReducedMotion() ?? false
}

export function Reveal({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  ...props
}: MotionDivProps & { variant?: keyof typeof variantMap; delay?: number }) {
  const reduced = useReducedMotionPref()

  return React.createElement(
    motion.div,
    {
      className,
      initial: "hidden",
      whileInView: "show",
      viewport: viewportConfig,
      variants: reduced ? fadeIn : variantMap[variant],
      transition: { delay },
      ...props,
    },
    children as React.ReactNode
  )
}

export function Stagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.02,
  ...props
}: MotionDivProps & { stagger?: number; delayChildren?: number }) {
  const reduced = useReducedMotionPref()

  return React.createElement(
    motion.div,
    {
      className,
      initial: "hidden",
      whileInView: "show",
      viewport: viewportConfig,
      variants: reduced ? undefined : staggerContainer(stagger, delayChildren),
      ...props,
    },
    children as React.ReactNode
  )
}

export function PageTransition({ children, className, ...props }: MotionDivProps) {
  const reduced = useReducedMotionPref()

  return React.createElement(
    motion.div,
    {
      className,
      initial: { opacity: 0, y: reduced ? 0 : 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: reduced ? 0 : 6 },
      transition: { duration: 0.2, ease: "easeOut" },
      ...props,
    },
    children as React.ReactNode
  )
}

export function AuthCardMotion({ children, className, ...props }: MotionDivProps) {
  const reduced = useReducedMotionPref()

  return React.createElement(
    motion.div,
    {
      className,
      initial: { opacity: 0, y: reduced ? 0 : 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.2, ease: "easeOut" },
      ...props,
    },
    children as React.ReactNode
  )
}

export function AuthStagger({ children, className, ...props }: MotionDivProps) {
  const reduced = useReducedMotionPref()

  return React.createElement(
    motion.div,
    {
      className,
      initial: "hidden",
      animate: "show",
      variants: reduced ? undefined : staggerContainer(0.08, 0.05),
      ...props,
    },
    children as React.ReactNode
  )
}

export function AuthStaggerItem({ children, className, ...props }: MotionDivProps) {
  const reduced = useReducedMotionPref()

  return React.createElement(
    motion.div,
    {
      className,
      variants: reduced ? undefined : fadeInUp,
      ...props,
    },
    children as React.ReactNode
  )
}

export function PanelTransition({ children, className, ...props }: MotionDivProps) {
  const reduced = useReducedMotionPref()

  return React.createElement(
    motion.div,
    {
      className,
      initial: { opacity: 0, x: reduced ? 0 : 6 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: reduced ? 0 : -6 },
      transition: { duration: 0.18, ease: "easeOut" },
      ...props,
    },
    children as React.ReactNode
  )
}
