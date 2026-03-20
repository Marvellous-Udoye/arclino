"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

function getBreadcrumbs(pathname: string) {
  if (pathname === "/dashboard") {
    return {
      parent: "Command Center",
      page: "Overview",
      href: "/dashboard",
    }
  }

  if (pathname === "/dashboard/boards") {
    return {
      parent: "Command Center",
      page: "Boards",
      href: "/dashboard/boards",
    }
  }

  if (pathname === "/dashboard/members") {
    return {
      parent: "Collaboration",
      page: "Members",
      href: "/dashboard/members",
    }
  }

  if (pathname === "/dashboard/activity") {
    return {
      parent: "Collaboration",
      page: "Activity",
      href: "/dashboard/activity",
    }
  }

  if (pathname.startsWith("/dashboard/boards/")) {
    return {
      parent: "Command Center",
      page: "Board Room",
      href: "/dashboard/boards",
    }
  }

  if (pathname === "/dashboard/settings/profile") {
    return {
      parent: "Account",
      page: "Profile",
      href: "/dashboard/settings/profile",
    }
  }

  return {
    parent: "Arclino",
    page: "Workspace",
    href: "/dashboard",
  }
}

export function DashboardShell({
  children,
  user,
  workspace,
  boards,
}: {
  children: ReactNode
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
  const pathname = usePathname()
  const breadcrumb = getBreadcrumbs(pathname)

  return (
    <SidebarProvider>
      <AppSidebar user={user} workspace={workspace} boards={boards} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 backdrop-blur transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link href={breadcrumb.href}>{breadcrumb.parent}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{breadcrumb.page}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-4 md:p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
