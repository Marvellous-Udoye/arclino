"use client"

import {
  LogOut,
  Users,
  CreditCard,
  Bell,
  UserCircle
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { signOutAction } from "@/features/auth/actions/sign-out-action"
import Link from "next/link"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-12 rounded-xl transition-all"
            >
              <Avatar className="h-9 w-9 rounded-lg border border-sidebar-border shadow-sm">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-bold">{initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                <span className="truncate font-bold text-foreground">{user.name}</span>
                <span className="truncate text-[10px] font-medium text-muted-foreground">{user.email}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-64 rounded-2xl border-sidebar-border bg-sidebar p-2 shadow-2xl backdrop-blur-xl"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={12}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-3 py-3 text-left text-sm">
                <Avatar className="h-10 w-10 rounded-xl border border-sidebar-border shadow-md">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-xl bg-primary/10 text-primary font-black">{initials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-black text-foreground">{user.name}</span>
                  <span className="truncate text-xs font-medium text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-sidebar-border/50" />
            <DropdownMenuGroup className="p-1">
              <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5 focus:bg-primary/10 focus:text-primary transition-colors cursor-pointer">
                <Link href="/dashboard/settings/profile">
                  <UserCircle className="mr-2 size-4 opacity-70" />
                  <span className="font-bold text-xs uppercase tracking-widest">My Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5 focus:bg-primary/10 focus:text-primary transition-colors cursor-pointer">
                <Link href="/dashboard/settings/billing">
                  <CreditCard className="mr-2 size-4 opacity-70" />
                  <span className="font-bold text-xs uppercase tracking-widest">Subscription</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-sidebar-border/50" />
            <DropdownMenuGroup className="p-1">
              <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5 focus:bg-primary/10 focus:text-primary transition-colors cursor-pointer">
                <Link href="/dashboard/members">
                  <Users className="mr-2 size-4 opacity-70" />
                  <span className="font-bold text-xs uppercase tracking-widest">Team Access</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5 focus:bg-primary/10 focus:text-primary transition-colors cursor-pointer">
                <Link href="/dashboard/activity">
                  <Bell className="mr-2 size-4 opacity-70" />
                  <span className="font-bold text-xs uppercase tracking-widest">Activity Logs</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-sidebar-border/50" />
            <div className="p-1">
               <form action={signOutAction}>
                 <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5 focus:bg-destructive/10 focus:text-destructive transition-colors cursor-pointer">
                   <button type="submit" className="flex w-full items-center">
                     <LogOut className="mr-2 size-4 opacity-70" />
                     <span className="font-bold text-xs uppercase tracking-widest">End Session</span>
                   </button>
                 </DropdownMenuItem>
               </form>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
