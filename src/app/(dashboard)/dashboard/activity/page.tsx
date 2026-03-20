import { redirect } from "next/navigation"
import { getDashboardData } from "@/features/boards/queries/get-dashboard-data"
import { requireUser } from "@/lib/auth/session"
import { Activity, Clock, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default async function ActivityHubPage() {
  const user = await requireUser("/dashboard/activity")
  const { workspace } = await getDashboardData(user.id)

  if (!workspace) {
    redirect("/onboarding/workspace")
  }

  const activities = [
    { user: "Sarah Mitchell", action: "updated nodes on", target: "Architecture Map", time: "2 minutes ago", type: "edit" },
    { user: "David Chen", action: "created new board", target: "Sprint Plan", time: "15 minutes ago", type: "create" },
    { user: "Maria Santos", action: "joined workspace", target: "Arclino", time: "1 hour ago", type: "join" },
    { user: "Alex Turner", action: "commented on", target: "Logic Flow", time: "3 hours ago", type: "comment" },
    { user: "Sarah Mitchell", action: "deleted edge in", target: "Legacy Flow", time: "5 hours ago", type: "delete" },
    { user: "System", action: "auto-archived", target: "Draft Board", time: "Yesterday", type: "system" },
  ]

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Workspace <span className="text-primary">Activity</span>
          </h1>
          <p className="text-muted-foreground font-medium max-w-md">
            A real-time audit trail of all collaborative events in <span className="text-foreground font-bold">{workspace.name}</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Filter activity..." 
              className="h-11 rounded-xl bg-card/50 pl-10 border-border/50 focus:ring-primary/20 transition-all"
            />
          </div>
          <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-border/50 bg-card/50">
            <Filter className="size-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      <div className="rounded-[2.5rem] border border-border bg-card/40 backdrop-blur-xl p-8 shadow-xl shadow-primary/5">
        <div className="space-y-10">
           {activities.map((item, i) => (
             <div key={i} className="group relative flex gap-6">
                {i !== activities.length - 1 && (
                  <div className="absolute left-6 top-12 h-10 w-px bg-border group-hover:bg-primary/30 transition-colors" />
                )}
                <div className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl bg-background border border-border group-hover:border-primary/50 transition-all shadow-sm">
                   <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary text-xs">
                      {item.user[0]}
                   </div>
                   <div className="absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-card bg-primary animate-pulse" />
                </div>
                <div className="flex flex-1 flex-col gap-1 md:flex-row md:items-center md:justify-between">
                   <div className="space-y-1">
                      <p className="text-base font-medium">
                         <span className="font-bold text-foreground hover:text-primary cursor-pointer transition-colors">{item.user}</span>{" "}
                         <span className="text-muted-foreground">{item.action}</span>{" "}
                         <span className="font-bold text-foreground hover:underline cursor-pointer">{item.target}</span>
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                         <Clock className="size-3" />
                         {item.time}
                      </div>
                   </div>
                   <Button variant="ghost" className="hidden size-9 rounded-xl md:flex">
                      <Activity className="size-4 text-muted-foreground" />
                   </Button>
                </div>
             </div>
           ))}
        </div>
        
        <Button variant="outline" className="mt-12 w-full h-14 rounded-2xl border-border/50 bg-background/50 font-bold text-muted-foreground hover:text-foreground hover:bg-background transition-all">
           Load More History
        </Button>
      </div>
    </div>
  )
}
