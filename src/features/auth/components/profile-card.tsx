import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Camera, Mail, User } from "lucide-react"

export function ProfileCard({
  email,
  fullName,
  avatarUrl,
}: {
  email: string
  fullName: string | null
  avatarUrl: string | null
}) {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="space-y-1">
        <h1 className="text-4xl font-black tracking-tight text-foreground">
          My <span className="text-primary">Profile</span>
        </h1>
        <p className="text-muted-foreground font-medium">
          Manage your identity and authentication settings across the Arclino ecosystem.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[2.5rem] border border-border bg-card/40 p-8 md:p-12 backdrop-blur-xl shadow-xl shadow-primary/5">
          <div className="flex flex-col gap-10">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <div className="group relative">
              <div className="flex size-28 items-center justify-center rounded-[2.5rem] border-4 border-background bg-primary/10 text-4xl font-black text-primary shadow-2xl transition-all group-hover:scale-105">
                  {fullName?.[0] || email[0]?.toUpperCase()}
                </div>
                {avatarUrl ? (
                  <span className="sr-only">{avatarUrl}</span>
                ) : null}
                <button className="absolute -bottom-2 -right-2 flex size-10 items-center justify-center rounded-2xl bg-foreground text-background shadow-lg transition-transform hover:scale-110 active:scale-95">
                   <Camera className="size-5" />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-foreground">{fullName || "System User"}</h3>
                <p className="text-muted-foreground">Collaborating in Arclino Workspace</p>
                <div className="mt-3 flex items-center justify-center gap-2 sm:justify-start">
                   <span className="rounded-full bg-green-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-green-500">Active Session</span>
                   <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary">Pro Tier</span>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                  <User className="size-3" /> Full Name
                </label>
                <Input defaultValue={fullName || ""} className="h-14 rounded-2xl bg-background border-border/50 focus:ring-primary/20" />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                  <Mail className="size-3" /> Email Address
                </label>
                <Input disabled value={email} className="h-14 rounded-2xl bg-muted/30 border-border/50 opacity-60" />
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-border/50 pt-10 sm:flex-row sm:items-center sm:justify-between">
               <p className="max-w-xs text-xs text-muted-foreground leading-relaxed">
                 Updating your profile information will reflect across all shared boards and activity logs.
               </p>
               <Button className="h-14 rounded-2xl px-10 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                  Save Changes
               </Button>
            </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
           <div className="rounded-[2rem] border border-border bg-card/50 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4 text-primary">
                 <Shield className="size-5" />
                 <h4 className="font-bold text-foreground">Security Hub</h4>
              </div>
              <div className="space-y-4">
                 <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-border/50 bg-background/50 font-bold text-xs">
                    Change Password
                 </Button>
                 <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-border/50 bg-background/50 font-bold text-xs">
                    2FA Settings
                 </Button>
                 <Button variant="ghost" className="w-full justify-start h-12 rounded-xl font-bold text-destructive hover:bg-destructive/5 text-xs">
                    Log out from all devices
                 </Button>
              </div>
           </div>
           
           <div className="rounded-[2rem] border border-border/50 bg-destructive/5 p-6 backdrop-blur-sm">
              <h4 className="font-bold text-destructive mb-2">Danger Zone</h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Permanently delete your profile and all workspace data associated with your account.
              </p>
              <Button variant="destructive" className="w-full h-11 rounded-xl font-bold text-xs">
                 Delete Account
              </Button>
           </div>
        </div>
      </div>
    </div>
  )
}
