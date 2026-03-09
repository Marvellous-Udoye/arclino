"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type ProgressVariant = "default" | "slim"

function Progress({
  className,
  value,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  variant?: ProgressVariant
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative w-full overflow-hidden rounded-full",
        variant === "slim" ? "h-1.5" : "h-2",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }

