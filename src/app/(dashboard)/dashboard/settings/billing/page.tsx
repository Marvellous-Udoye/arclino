import { requireUser } from "@/lib/auth/session"
import { getDashboardData } from "@/features/boards/queries/get-dashboard-data"
import { redirect } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Zap, ShieldCheck, Check } from "lucide-react"

export default async function BillingPage() {
  const user = await requireUser("/dashboard/settings/billing")
  const { workspace } = await getDashboardData(user.id)

  if (!workspace) {
    redirect("/onboarding/workspace")
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="space-y-1">
        <h1 className="text-4xl font-black tracking-tight text-foreground">
          Billing <span className="text-primary">& Plans</span>
        </h1>
        <p className="text-muted-foreground font-medium">
          Manage your subscription and workspace resource limits.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          {/* Active Plan Card */}
          <div className="rounded-[2.5rem] border border-border bg-card/40 p-8 md:p-12 backdrop-blur-xl shadow-xl shadow-primary/5">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-6">
                 <div className="flex size-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-2xl shadow-primary/30">
                    <Zap className="size-10" />
                 </div>
                 <div>
                    <h3 className="text-3xl font-black text-foreground">Workspace Pro</h3>
                    <p className="text-muted-foreground font-medium">Active since March 2026</p>
                 </div>
              </div>
              <div className="flex flex-col items-end">
                 <div className="text-3xl font-black text-foreground">$59/mo</div>
                 <p className="text-xs font-bold uppercase tracking-widest text-primary mt-1">Billed Annually</p>
              </div>
            </div>

            <div className="mt-12 grid gap-6 border-t border-border/50 pt-12 sm:grid-cols-2">
               {[
                 "Unlimited collaborative boards",
                 "Advanced RLS permissions",
                 "Pusher realtime infrastructure",
                 "Workspace activity logs",
                 "Priority engineering support",
                 "Custom board branding",
               ].map((feature) => (
                 <div key={feature} className="flex items-center gap-3">
                    <div className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                       <Check className="size-3" strokeWidth={4} />
                    </div>
                    <span className="text-sm font-medium text-foreground/80">{feature}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Payment Methods */}
          <section className="space-y-4">
             <h2 className="text-xl font-bold tracking-tight px-2">Payment Methods</h2>
             <Card className="rounded-[2rem] border-border/50 bg-card/30 backdrop-blur-sm">
               <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-background border border-border">
                           <CreditCard className="size-6 text-muted-foreground" />
                        </div>
                        <div>
                           <p className="font-bold text-foreground">Visa ending in 4242</p>
                           <p className="text-xs text-muted-foreground">Expires 12/28</p>
                        </div>
                     </div>
                     <Button variant="ghost" className="rounded-xl font-bold text-primary hover:bg-primary/5">Edit</Button>
                  </div>
               </CardContent>
             </Card>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           <div className="rounded-[2.5rem] border border-border bg-primary/5 p-8 backdrop-blur-xl">
              <h4 className="flex items-center gap-2 text-lg font-black text-foreground mb-4">
                 <ShieldCheck className="size-5 text-primary" />
                 Compliance
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Your workspace is protected by enterprise-grade security and RLS data isolation.
              </p>
              <Button className="w-full h-12 rounded-xl font-bold">Download SOC-2 Report</Button>
           </div>

           <div className="rounded-[2.5rem] border border-border/50 bg-card/50 p-8 backdrop-blur-sm">
              <h4 className="font-bold text-foreground mb-4">Usage Limits</h4>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-muted-foreground">
                       <span>Board Slots</span>
                       <span className="text-foreground">12 / 100</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-background overflow-hidden border border-border/50">
                       <div className="h-full w-[12%] bg-primary shadow-[0_0_10px_var(--primary)]" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-muted-foreground">
                       <span>Team Members</span>
                       <span className="text-foreground">8 / 20</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-background overflow-hidden border border-border/50">
                       <div className="h-full w-[40%] bg-primary shadow-[0_0_10px_var(--primary)]" />
                    </div>
                 </div>
              </div>
              <Button variant="outline" className="mt-8 w-full h-11 rounded-xl border-primary/20 bg-primary/5 font-bold text-primary hover:bg-primary/10">
                 Increase Limits
              </Button>
           </div>
        </div>
      </div>
    </div>
  )
}
