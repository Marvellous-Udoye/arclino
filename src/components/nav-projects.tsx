"use client"

import Link from "next/link"
import { FolderOpen, MoreHorizontal } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
  }[]
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="px-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">Favorite Canvases</SidebarGroupLabel>
      <SidebarMenu className="gap-1">
        {projects.length === 0 ? (
          <SidebarMenuItem>
            <SidebarMenuButton className="h-9 rounded-lg px-3 opacity-50 italic">
              <FolderOpen className="size-4" />
              <span className="text-xs font-bold uppercase tracking-widest">No boards active</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : (
          projects.slice(0, 5).map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild className="h-10 rounded-xl px-3 transition-all hover:bg-sidebar-accent/50 group/item">
                <Link href={item.url}>
                  <div className="flex size-7 items-center justify-center rounded-lg bg-background border border-sidebar-border shadow-sm transition-transform group-hover/item:scale-105">
                     <span className="text-[10px] font-black uppercase text-primary">{item.name[0]}</span>
                  </div>
                  <span className="font-bold text-xs uppercase tracking-widest text-foreground/80 group-hover/item:text-foreground">{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))
        )}
        <SidebarMenuItem className="mt-1">
          <SidebarMenuButton asChild className="h-9 rounded-xl px-3 text-muted-foreground hover:text-primary transition-colors">
            <Link href="/dashboard/boards">
              <MoreHorizontal className="size-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Manage All Boards</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
