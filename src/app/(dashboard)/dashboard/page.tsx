import { redirect } from "next/navigation"
import { getDashboardData } from "@/features/boards/queries/get-dashboard-data"
import { requireUser } from "@/lib/auth/session"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutGrid, Users, Activity, Clock, Plus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BoardList } from "@/features/boards/components/board-list"

export default async function DashboardOverviewPage() {
  const user = await requireUser("/dashboard")
  const { workspace, boards } = await getDashboardData(user.id)

  if (!workspace) {
    redirect("/onboarding/workspace")
  }

  const recentBoards = boards.slice(0, 3)

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
            Command <span className="text-primary">Center</span>
          </h1>
          <p className="text-muted-foreground font-medium">
            Welcome back to <span className="font-bold text-foreground">{workspace.name}</span>. Here is what is happening.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild className="rounded-xl font-bold shadow-lg shadow-primary/20">
            <Link href="/dashboard/boards">
              <Plus className="mr-2 size-4" /> New Board
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Boards", val: boards.length, icon: LayoutGrid, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Team Members", val: "12", icon: Users, color: "text-primary", bg: "bg-primary/10" },
          { label: "Live Sessions", val: "3", icon: Activity, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Updates Today", val: "24", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
        ].map((stat, i) => (
          <Card key={i} className="group relative overflow-hidden rounded-2xl border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div className={`flex size-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="size-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{stat.val}</div>
            </CardContent>
            <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary transition-transform group-hover:scale-x-100" />
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Main Feed / Recent Boards */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Recent Canvases</h2>
            <Button variant="ghost" asChild className="text-sm font-bold text-primary hover:text-primary hover:bg-primary/5">
              <Link href="/dashboard/boards">
                View All <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
          <BoardList boards={recentBoards} />
          
          <div className="rounded-[2rem] border border-border bg-card/30 p-10 backdrop-blur-xl">
             <div className="max-w-md space-y-4">
                <h3 className="text-2xl font-black tracking-tight leading-none">The map is the territory.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Start a new collaborative flowchart to align your team on architecture, processes, or handoffs.
                </p>
                <Button variant="outline" className="rounded-xl border-primary/20 bg-primary/5 font-bold text-primary hover:bg-primary/10">
                   Open Docs
                </Button>
             </div>
          </div>
        </div>

        {/* Sidebar Activity */}
        <div className="space-y-6">
           <h2 className="text-xl font-bold tracking-tight">System Activity</h2>
           <Card className="rounded-[2rem] border-border/50 bg-card/40 backdrop-blur-xl">
             <CardContent className="p-6">
                <div className="space-y-8">
                   {[
                     { user: "Sarah", action: "updated", target: "Architecture Map", time: "2m ago" },
                     { user: "David", action: "created", target: "Sprint Plan", time: "15m ago" },
                     { user: "Maria", action: "joined", target: "Workspace", time: "1h ago" },
                     { user: "Alex", action: "commented", target: "Logic Flow", time: "3h ago" },
                   ].map((item, i) => (
                     <div key={i} className="flex gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                           {item.user[0]}
                        </div>
                        <div className="space-y-1">
                           <p className="text-sm font-medium leading-none">
                              <span className="font-bold text-foreground">{item.user}</span>{" "}
                              <span className="text-muted-foreground">{item.action}</span>{" "}
                              <span className="font-bold text-foreground">{item.target}</span>
                           </p>
                           <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{item.time}</p>
                        </div>
                     </div>
                   ))}
                </div>
                <Button variant="ghost" className="mt-8 w-full rounded-xl font-bold text-muted-foreground hover:text-foreground">
                   View Full Activity
                </Button>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  )
}
