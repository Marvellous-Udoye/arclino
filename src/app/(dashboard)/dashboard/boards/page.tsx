import { redirect } from "next/navigation"
import { BoardCreateForm } from "@/features/boards/components/board-create-form"
import { BoardList } from "@/features/boards/components/board-list"
import { getDashboardData } from "@/features/boards/queries/get-dashboard-data"
import { requireUser } from "@/lib/auth/session"
import { Search, Filter, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default async function BoardsHubPage() {
  const user = await requireUser("/dashboard")
  const { workspace, boards } = await getDashboardData(user.id)

  if (!workspace) {
    redirect("/onboarding/workspace")
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Your <span className="text-primary">Canvases</span>
          </h1>
          <p className="text-muted-foreground font-medium max-w-md">
            All collaborative boards in <span className="text-foreground font-bold">{workspace.name}</span>. Filter and manage your shared visual state.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search boards..." 
              className="h-11 rounded-xl bg-card/50 pl-10 border-border/50 focus:ring-primary/20 transition-all"
            />
          </div>
          <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-border/50 bg-card/50">
            <Filter className="size-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Board List Area */}
        <div className="space-y-6">
          <BoardList boards={boards} />
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-1">
             <Plus className="size-4 text-primary" />
             <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Quick Action</h2>
          </div>
          <BoardCreateForm workspaceId={workspace.id} canCreate={workspace.role !== "viewer"} />
          
          <div className="rounded-3xl border border-border bg-card/30 p-6 backdrop-blur-xl">
             <h3 className="font-bold text-foreground mb-2">Workspace Roles</h3>
             <p className="text-sm text-muted-foreground leading-relaxed">
               You are an <span className="text-primary font-bold">{workspace.role}</span>. This allows you to {workspace.role === "owner" ? "manage everything" : workspace.role === "editor" ? "edit boards and chat" : "view boards and join chat"}.
             </p>
          </div>
        </div>
      </div>
    </div>
  )
}
