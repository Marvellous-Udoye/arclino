"use client"

import * as React from "react"
import { ChevronsUpDown, Hexagon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function TeamSwitcher({
  workspaces,
}: {
  workspaces: {
    name: string
    role: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeWorkspace, setActiveWorkspace] = React.useState(workspaces[0])

  if (!activeWorkspace) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-14 rounded-xl border border-transparent hover:border-sidebar-border/50 hover:bg-sidebar-accent/50 transition-all"
            >
              <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <Hexagon className="size-5 fill-current opacity-80" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                <span className="truncate font-black uppercase tracking-wider text-foreground">
                   {activeWorkspace.name}
                </span>
                <span className="truncate text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                   {activeWorkspace.role}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-2xl border-sidebar-border bg-sidebar p-2 shadow-2xl backdrop-blur-xl"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={12}
          >
            <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
              Active Workspace
            </DropdownMenuLabel>
            {workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.name}
                onClick={() => setActiveWorkspace(workspace)}
                className="gap-3 rounded-xl p-3 focus:bg-primary/10 focus:text-primary transition-colors cursor-pointer"
              >
                <div className="flex size-9 items-center justify-center rounded-lg border border-sidebar-border bg-sidebar-accent/50 shadow-sm">
                   <Hexagon className="size-4 text-primary" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-sm">{workspace.name}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                    {workspace.role}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
