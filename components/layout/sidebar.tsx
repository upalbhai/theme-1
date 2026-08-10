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
  Settings,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Headphones,
  CreditCard,
  Building2,
  Sparkles,
} from "lucide-react";

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
      { title: "Dashboard", href: "/", icon: LayoutDashboard },
      { title: "Sales Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    group: "CRM Suite",
    items: [
      { title: "Deals Pipeline", href: "/crm/deals", icon: Kanban, badge: "Live" },
      { title: "Customers", href: "/crm/customers", icon: Users },
      { title: "Activities & Feed", href: "/crm/activities", icon: Activity },
      { title: "Companies", href: "/crm/companies", icon: Building2 },
    ],
  },
  {
    group: "Client Portal",
    items: [
      { title: "Support Tickets", href: "/portal/tickets", icon: Headphones, badge: "3 New" },
      { title: "Invoices & Billing", href: "/portal/billing", icon: CreditCard },
      { title: "Contracts", href: "/portal/contracts", icon: Briefcase },
    ],
  },
  {
    group: "System",
    items: [
      { title: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export function Sidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] transition-all duration-300 z-30 h-screen sticky top-0",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-[hsl(var(--sidebar-border))]">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 text-white shadow-md shadow-violet-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight leading-none text-[hsl(var(--sidebar-foreground))]">
                Apex CRM
              </span>
              <span className="text-xs text-[hsl(var(--muted-foreground))] font-medium mt-1">
                Admin Theme
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex h-7 w-7 items-center justify-center rounded-md border border-[hsl(var(--sidebar-border))] hover:bg-[hsl(var(--sidebar-accent))] transition-colors"
          aria-label="Toggle Sidebar"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            {!collapsed && (
              <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-2">
                {group.group}
              </h3>
            )}
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group relative",
                    isActive
                      ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-sm"
                      : "text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]"
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-[hsl(var(--primary-foreground))]" : "text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--sidebar-accent-foreground))]")} />
                  {!collapsed && (
                    <span className="flex-1 truncate">{item.title}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-semibold",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[hsl(var(--primary))/10] text-[hsl(var(--primary))]"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Pro Banner / Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-[hsl(var(--sidebar-border))]">
          <div className="rounded-xl bg-gradient-to-br from-violet-600/10 via-indigo-600/10 to-transparent p-3.5 border border-violet-500/20">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wide">Commercial Ready</span>
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
              Theme tokens configured in <code className="text-xs font-mono bg-violet-500/10 px-1 py-0.5 rounded">app/globals.css</code>
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
