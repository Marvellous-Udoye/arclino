"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="px-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">Platform Hub</SidebarGroupLabel>
      <SidebarMenu className="gap-1">
        {items.map((item) => {
          const isSectionActive =
            pathname === item.url ||
            item.items?.some((subItem) => pathname === subItem.url) ||
            false

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive || isSectionActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton 
                    tooltip={item.title} 
                    isActive={isSectionActive}
                    className="h-10 rounded-xl px-3 transition-all hover:bg-sidebar-accent/50 data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
                  >
                    {item.icon ? <item.icon className="size-4 opacity-70 group-data-[active=true]/collapsible:opacity-100" /> : null}
                    <span className="font-bold text-xs uppercase tracking-widest">{item.title}</span>
                    <ChevronRight className="ml-auto size-3.5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 opacity-40" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="ml-4 mt-1 border-l border-sidebar-border/50 gap-1 pl-2">
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton 
                           asChild 
                           isActive={pathname === subItem.url}
                           className="h-9 rounded-lg px-3 transition-all data-[active=true]:bg-sidebar-accent data-[active=true]:text-foreground data-[active=true]:font-bold"
                        >
                          <Link href={subItem.url}>
                            <span className="text-xs">{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
