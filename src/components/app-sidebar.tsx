"use client"

import { LayoutGrid, Settings2, BarChart3 } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({
  user,
  workspace,
  boards,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: {
    name: string
    email: string
    avatar: string
  }
  workspace: {
    name: string
    role: "owner" | "editor" | "viewer"
  }
  boards: {
    id: string
    name: string
  }[]
}) {
  const navMain = [
    {
      title: "Workspace",
      url: "/dashboard",
      icon: LayoutGrid,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Boards",
          url: "/dashboard/boards",
        },
        {
          title: "Members",
          url: "/dashboard/members",
        },
        {
          title: "Activity",
          url: "/dashboard/activity",
        },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings/profile",
      icon: Settings2,
      items: [
        {
          title: "My Profile",
          url: "/dashboard/settings/profile",
        },
        {
          title: "Billing & Plans",
          url: "/dashboard/settings/billing",
        },
        {
          title: "Workspace Settings",
          url: "/dashboard/settings/workspace",
        },
      ],
    },
    {
      title: "Intelligence",
      url: "#",
      icon: BarChart3,
      items: [
        {
          title: "Analytics",
          url: "#",
        },
        {
          title: "Export Logs",
          url: "#",
        },
      ],
    },
  ]

  const projects = boards.map((board) => ({
    name: board.name,
    url: `/dashboard/boards/${board.id}`,
  }))

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          workspaces={[
            {
              name: workspace.name,
              role: workspace.role,
            },
          ]}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
