"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { createWorkspaceAction } from "@/features/workspace/actions/create-workspace-action"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function WorkspaceOnboardingForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  return (
    <Card className="mx-auto w-full max-w-lg border-white/10 bg-black/70">
      <CardHeader>
        <CardTitle>Create your workspace</CardTitle>
        <CardDescription>Every user belongs to one workspace in v1.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="workspace-name">Workspace name</Label>
          <Input
            id="workspace-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Platform Team"
          />
        </div>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <Button
          className="w-full"
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              setError(null)
              const result = await createWorkspaceAction({ name })

              if (result?.error) {
                setError(result.error)
                return
              }

              router.replace("/dashboard")
              router.refresh()
            })
          }
        >
          {isPending ? "Creating workspace..." : "Create workspace"}
        </Button>
      </CardContent>
    </Card>
  )
}
