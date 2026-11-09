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
  Layers,
  CheckSquare,
  MessageSquare,
  Settings,
  CalendarDays,
  FileText,
  FolderOpen,
  PieChart,
  Briefcase,
  StickyNote,
  HardDrive,
  FileSpreadsheet,
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
  useSidebar,
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
      { title: "All Components", href: "/components", icon: Layers, badge: "Design" },
      { title: "Motion Primitives", href: "/motion-primitives", icon: Sparkles, badge: "New" },
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
      { title: "Projects", href: "/projects", icon: Briefcase },
      { title: "Calendar", href: "/calendar", icon: CalendarDays },
      { title: "Tasks & Todos", href: "/tasks", icon: CheckSquare },
      { title: "Notes", href: "/notes", icon: StickyNote },
      { title: "Messages", href: "/messages", icon: MessageSquare, badge: "3 New" },
      { title: "Documents", href: "/documents", icon: FolderOpen },
      { title: "Storage Drive", href: "/storage", icon: HardDrive },
    ],
  },
  {
    group: "Finance",
    items: [
      { title: "Proposals", href: "/proposals", icon: FileSpreadsheet },
      { title: "Invoices", href: "/invoices", icon: FileText, badge: "Action Needed" },
    ],
  },
  {
    group: "Reports",
    items: [
      { title: "Sales Report", href: "/reports/sales", icon: BarChart3 },
      { title: "Leads Report", href: "/reports/leads", icon: PieChart },
      { title: "Project Report", href: "/reports/project", icon: Activity },
      { title: "Timesheets Report", href: "/reports/timesheets", icon: Sparkles },
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
  const { setOpenMobile, isMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="Apex CRM"
              className="gap-3 transition-colors hover:bg-sidebar-accent/60"
              render={
                <Link
                  href="/dashboard"
                  onClick={() => {
                    if (isMobile) setOpenMobile(false);
                  }}
                  className="flex items-center gap-3 w-full"
                >
                  <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading font-bold text-sm shadow-xs transition-transform group-hover/menu-button:scale-105">
                    A
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate font-semibold font-heading text-sidebar-foreground">
                        Apex CRM
                      </span>
                      <span className="rounded-sm bg-primary/10 px-1 py-0.2 font-mono text-[9px] font-medium text-primary">
                        v2.0
                      </span>
                    </div>
                    <span className="truncate text-[11px] font-mono text-muted-foreground">
                      Enterprise Suite
                    </span>
                  </div>
                </Link>
              }
            />
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
                        <Link href={item.href} onClick={() => { if (isMobile) setOpenMobile(false); }}>
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
