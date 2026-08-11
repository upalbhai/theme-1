"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Kanban,
  Users,
  Activity,
  BarChart3,
  Sparkles,
  CheckSquare,
  MessageSquare,
  Settings,
  CalendarDays,
  FileText,
  FolderOpen,
  PieChart,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    group: "Overview",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "Sales Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    group: "CRM Suite",
    items: [
      { title: "Deals Pipeline", href: "/crm/deals", icon: Kanban, badge: "Live" },
      { title: "Customers", href: "/crm/customers", icon: Users },
      { title: "Activities & Feed", href: "/crm/activities", icon: Activity },
    ],
  },
  {
    group: "Workspace",
    items: [
      { title: "Calendar", href: "/calendar", icon: CalendarDays },
      { title: "Tasks & Todos", href: "/tasks", icon: CheckSquare },
      { title: "Messages", href: "/messages", icon: MessageSquare, badge: "3 New" },
      { title: "Documents", href: "/documents", icon: FolderOpen },
    ],
  },
  {
    group: "Finance",
    items: [
      { title: "Invoices", href: "/invoices", icon: FileText, badge: "Action Needed" },
    ],
  },
  {
    group: "Reports",
    items: [
      { title: "Leads Report", href: "/reports/leads", icon: PieChart },
    ],
  },
  {
    group: "Account",
    items: [
      { title: "User Profile", href: "/profile", icon: Users },
      { title: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-primary/80 text-sidebar-primary-foreground shadow-md shadow-primary/20">
                  <Sparkles className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold">Apex CRM</span>
                  <span className="truncate text-xs">Admin Theme</span>
                </div>
              </Link>
            } />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group, idx) => (
          <SidebarGroup key={idx}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton isActive={isActive} tooltip={item.title} render={
                        <Link href={item.href}>
                          <Icon />
                          <span>{item.title}</span>
                        </Link>
                      } />
                      {item.badge && (
                        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="p-3 group-data-[collapsible=icon]:hidden">
          <div className="rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-3.5 border border-primary/20">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-primary uppercase tracking-wide">Commercial Ready</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Theme tokens configured in <code className="text-xs font-mono bg-primary/10 px-1 py-0.5 rounded">app/globals.css</code>
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
