"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Search,
  Sun,
  Moon,
  User,
  ShieldCheck,
  LogOut,
  Sparkles,
  Layers,
  ArrowLeft,
  LayoutDashboard,
  Kanban,
  Users,
  Activity,
  Briefcase,
  Receipt,
  CheckSquare,
  TrendingUp,
  Clock,
  GitCommit,
  Settings,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationPopover } from "@/components/layout/notification-popover";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";

export function Topbar({ isComponentRoute }: { isComponentRoute?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (isComponentRoute) return; // Component routes use ComponentCommandMenu for Cmd+K

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isComponentRoute]);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-14 md:h-16 w-full items-center justify-between gap-4 border-b border-border/70 bg-background/85 px-4 md:px-6 backdrop-blur-md transition-colors">
      
      {/* ─── LEFT: NAVIGATION OR COMMAND LAUNCHER ─────────────────────────────── */}
      {isComponentRoute ? (
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          {/* Brand Logo & Name */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 group shrink-0 text-foreground transition-opacity hover:opacity-90"
          >
            <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-xs shrink-0 font-heading">
              A
            </div>
            <span className="font-semibold text-foreground text-sm tracking-tight whitespace-nowrap font-heading">
              Apex CRM
            </span>
            <span className="px-1.5 py-0.2 rounded-md bg-primary/10 text-primary text-[10px] font-mono font-medium shrink-0 border border-primary/20">
              Docs
            </span>
          </Link>

          {/* Divider */}
          <div className="hidden sm:block h-4 w-px bg-border/80 shrink-0" aria-hidden="true" />

          {/* Back to CRM */}
          <Link
            href="/dashboard"
            className="shrink-0 flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-lg bg-muted/40 hover:bg-muted border border-border/60 transition-colors whitespace-nowrap"
          >
            <ArrowLeft className="size-3.5 shrink-0" />
            <span className="hidden sm:inline">Back to CRM</span>
            <span className="sm:hidden">CRM</span>
          </Link>

          {/* Search Trigger for Components */}
          <div className="flex-1 max-w-xs md:max-w-sm lg:max-w-md min-w-0 ml-1 sm:ml-2">
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-component-palette"));
                document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }));
              }}
              className="relative flex items-center justify-start w-full h-8.5 rounded-lg border border-border/80 bg-muted/25 hover:bg-muted/50 text-muted-foreground px-3 pl-8 pr-10 text-xs transition-colors cursor-pointer min-w-0"
            >
              <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/70 shrink-0" />
              <span className="hidden md:inline truncate">Search components, primitives, hooks...</span>
              <span className="md:hidden truncate">Search components...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-border/70 bg-card/80 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground shadow-2xs shrink-0">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Universal Sidebar Trigger for both mobile and desktop collapse */}
          <SidebarTrigger className="size-8.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors shrink-0" />

          <div className="hidden sm:block h-4 w-px bg-border/60 shrink-0" aria-hidden="true" />

          {/* Unified Command Launcher */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group relative flex items-center justify-start w-full max-w-xs sm:max-w-sm lg:max-w-md h-8.5 rounded-lg border border-border/80 bg-muted/25 hover:bg-muted/50 text-muted-foreground hover:text-foreground px-3 pl-8 pr-12 text-xs transition-colors cursor-pointer min-w-0"
          >
            <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/70 group-hover:text-foreground transition-colors shrink-0" />
            <span className="truncate">Search deals, pipeline, customers...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-border/70 bg-card/80 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground shadow-2xs shrink-0">
              ⌘K
            </kbd>
          </button>

          {/* Quick Direct Link to Design System & Components on Desktop */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs font-mono text-muted-foreground pl-2">
            <Link
              href="/components"
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md hover:bg-muted/50 hover:text-foreground transition-colors"
            >
              <Layers className="size-3 text-primary" />
              <span>Components</span>
            </Link>
            <span className="text-border/80">•</span>
            <Link
              href="/motion-primitives"
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md hover:bg-muted/50 hover:text-foreground transition-colors"
            >
              <Sparkles className="size-3 text-primary" />
              <span>Motion</span>
            </Link>
          </div>
        </div>
      )}

      {/* ─── RIGHT: UTILITY ACTIONS & PROFILE ─────────────────────────────────── */}
      <div className="flex items-center gap-1.5 shrink-0">
        
        {/* Light / Dark Mode Toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="size-8.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications Popover */}
        <NotificationPopover />

        <div className="h-4 w-px bg-border/60 mx-1 shrink-0" aria-hidden="true" />

        {/* User Profile Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="relative flex items-center gap-2 rounded-full p-0.5 outline-hidden ring-sidebar-ring transition-transform hover:opacity-90 focus-visible:ring-2"
                title="Account menu"
              />
            }
          >
            <Avatar className="size-8.5 border border-border/80 transition-colors">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold font-mono">
                AM
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60 p-1.5 shadow-xl border-border/80 bg-popover" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal p-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Avatar className="size-9 border border-border/80 shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold font-mono">
                      AM
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-0.5 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate font-heading leading-tight">
                      Alex Morgan
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate font-mono">
                      alex.m@apex-crm.com
                    </p>
                    <span className="text-[10px] text-primary font-mono font-medium pt-0.5">
                      Director of Revenue
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem 
              className="gap-2.5 text-xs font-mono cursor-pointer"
              onClick={() => router.push("/profile")}
            >
              <User className="size-3.5 text-muted-foreground" />
              <span>User Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="gap-2.5 text-xs font-mono cursor-pointer"
              onClick={() => router.push("/settings")}
            >
              <ShieldCheck className="size-3.5 text-muted-foreground" />
              <span>Workspace Security</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="gap-2.5 text-xs font-mono cursor-pointer"
              onClick={() => router.push("/components")}
            >
              <Layers className="size-3.5 text-muted-foreground" />
              <span>Design System</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem 
              className="gap-2.5 text-xs font-mono text-destructive focus:text-destructive cursor-pointer"
              onClick={() => router.push("/login")}
            >
              <LogOut className="size-3.5" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ─── COMMAND PALETTE MODAL (CMD + K) ─────────────────────────────────── */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search modules, deals, reports, or settings..." />
        <CommandList className="max-h-[380px]">
          <CommandEmpty>No matching commands found.</CommandEmpty>
          
          <CommandGroup heading="CRM Applications">
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/dashboard"))}
              className="gap-2.5 text-xs font-mono cursor-pointer"
            >
              <LayoutDashboard className="size-3.5 text-muted-foreground" />
              <span>Executive Dashboard</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/crm/deals"))}
              className="gap-2.5 text-xs font-mono cursor-pointer"
            >
              <Kanban className="size-3.5 text-primary" />
              <span>Deals Pipeline (Interactive Kanban)</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/crm/customers"))}
              className="gap-2.5 text-xs font-mono cursor-pointer"
            >
              <Users className="size-3.5 text-muted-foreground" />
              <span>Customer Registry</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/crm/activities"))}
              className="gap-2.5 text-xs font-mono cursor-pointer"
            >
              <Activity className="size-3.5 text-muted-foreground" />
              <span>Customer Activity & Timeline</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/projects"))}
              className="gap-2.5 text-xs font-mono cursor-pointer"
            >
              <Briefcase className="size-3.5 text-muted-foreground" />
              <span>Project Deliverables</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/invoices"))}
              className="gap-2.5 text-xs font-mono cursor-pointer"
            >
              <Receipt className="size-3.5 text-muted-foreground" />
              <span>Billing & Invoices</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/tasks"))}
              className="gap-2.5 text-xs font-mono cursor-pointer"
            >
              <CheckSquare className="size-3.5 text-muted-foreground" />
              <span>Task Management Board</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator className="my-1" />

          <CommandGroup heading="Executive Reports">
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/reports/project"))}
              className="gap-2.5 text-xs font-mono cursor-pointer"
            >
              <Activity className="size-3.5 text-muted-foreground" />
              <span>Project Delivery & Milestones</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/reports/sales"))}
              className="gap-2.5 text-xs font-mono cursor-pointer"
            >
              <TrendingUp className="size-3.5 text-muted-foreground" />
              <span>Sales & Revenue Analytics</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/reports/leads"))}
              className="gap-2.5 text-xs font-mono cursor-pointer"
            >
              <Users className="size-3.5 text-muted-foreground" />
              <span>Lead Conversion Report</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/reports/timesheets"))}
              className="gap-2.5 text-xs font-mono cursor-pointer"
            >
              <Clock className="size-3.5 text-muted-foreground" />
              <span>Timesheets & Capacity</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator className="my-1" />

          <CommandGroup heading="Design System & Documentation">
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/components"))}
              className="gap-2.5 text-xs font-mono cursor-pointer"
            >
              <Layers className="size-3.5 text-primary" />
              <span>Component Library & Registry</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/components/timeline"))}
              className="gap-2.5 text-xs font-mono cursor-pointer"
            >
              <GitCommit className="size-3.5 text-primary" />
              <span>Timeline Component</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/motion-primitives"))}
              className="gap-2.5 text-xs font-mono cursor-pointer"
            >
              <Sparkles className="size-3.5 text-primary" />
              <span>Motion Primitives Showcase</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator className="my-1" />

          <CommandGroup heading="Preferences & Account">
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/profile"))}
              className="gap-2.5 text-xs font-mono cursor-pointer"
            >
              <User className="size-3.5 text-muted-foreground" />
              <span>User Profile Settings</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => router.push("/settings"))}
              className="gap-2.5 text-xs font-mono cursor-pointer"
            >
              <Settings className="size-3.5 text-muted-foreground" />
              <span>Workspace Preferences</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))}
              className="gap-2.5 text-xs font-mono cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun className="size-3.5 text-muted-foreground" />
              ) : (
                <Moon className="size-3.5 text-muted-foreground" />
              )}
              <span>Switch to {theme === "dark" ? "Light" : "Dark"} Mode</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
