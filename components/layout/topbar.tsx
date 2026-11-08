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
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationPopover } from "@/components/layout/notification-popover";
import { Input } from "@/components/ui/input";
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
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between gap-4 border-b bg-background/80 px-4 md:px-6 backdrop-blur-md transition-colors">
      {/* Left side: Navigation / Search */}
      {isComponentRoute ? (
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          {/* Brand Logo & Name */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 group shrink-0 text-foreground transition-opacity hover:opacity-90"
          >
            <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
              A
            </div>
            <span className="font-bold text-foreground text-sm tracking-tight whitespace-nowrap">
              Apex CRM
            </span>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-medium shrink-0">
              Docs
            </span>
          </Link>

          {/* Divider */}
          <div className="hidden sm:block h-4 w-px bg-border/80 shrink-0" aria-hidden="true" />

          {/* Back to CRM */}
          <Link
            href="/dashboard"
            className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-lg bg-muted/40 hover:bg-muted border border-border/60 transition-colors whitespace-nowrap"
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
              className="relative flex items-center justify-start w-full h-9 rounded-lg border border-input/60 bg-muted/30 hover:bg-muted/60 text-muted-foreground px-3 pl-8 pr-10 text-xs transition-colors cursor-pointer min-w-0"
            >
              <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/70 shrink-0" />
              <span className="hidden md:inline truncate">Search components, primitives, hooks...</span>
              <span className="md:hidden truncate">Search components...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 absolute right-2.5 top-1/2 -translate-y-1/2 rounded border bg-muted/80 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground shrink-0">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 flex-1 max-w-md min-w-0">
          <SidebarTrigger className="md:hidden shrink-0" />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative flex items-center justify-center md:justify-start w-10 h-10 md:w-full md:h-9 rounded-lg md:border md:border-input md:bg-muted/30 text-muted-foreground hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 md:focus:ring-0 md:pl-9 md:pr-12 text-xs md:text-sm transition-colors min-w-0"
          >
            <Search className="h-4 w-4 md:absolute md:left-3 md:top-1/2 md:-translate-y-1/2 shrink-0" />
            <span className="hidden md:inline truncate">Search deals, contacts, leads...</span>
            <kbd className="hidden md:inline-flex items-center gap-0.5 absolute right-3 top-1/2 -translate-y-1/2 rounded border bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground shrink-0">
              ⌘K
            </kbd>
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Light / Dark Mode Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title="Toggle Light/Dark Theme"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-indigo-400" />
        </Button>

        {/* Notifications Popover */}
        <NotificationPopover />

        {/* User Profile Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger render={<button className="relative h-10 w-10 rounded-full ml-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" />}>
            <Avatar className="h-10 w-10 border border-border">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">AD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Alex Morgan</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    alex.m@apex-crm.com
                  </p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/settings")}>
              <ShieldCheck className="mr-2 h-4 w-4" />
              <span>Team Permissions</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer" onClick={() => router.push("/settings")}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Command Palette Modal */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="CRM Navigation">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <Search className="mr-2 h-4 w-4" />
              <span>Dashboard Overview</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/components"))}>
              <Layers className="mr-2 h-4 w-4" />
              <span>Components Directory & Usage</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/motion-primitives"))}>
              <span>Motion Primitives Showcase</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/crm/deals"))}>
              <Search className="mr-2 h-4 w-4" />
              <span>Deals Pipeline</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/crm/customers"))}>
              <Search className="mr-2 h-4 w-4" />
              <span>Customer Registry</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/crm/activities"))}>
              <Search className="mr-2 h-4 w-4" />
              <span>Interactions & Feed</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="System Preferences">
            <CommandItem onSelect={() => runCommand(() => router.push("/profile"))}>
              <User className="mr-2 h-4 w-4" />
              <span>User Profile & Security</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))}>
              {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
              <span>Toggle Light/Dark Mode</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
