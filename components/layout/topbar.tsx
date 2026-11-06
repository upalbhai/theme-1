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
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b bg-background/80 px-4 md:px-6 backdrop-blur-md transition-colors">
      {/* Search Input & Mobile Toggle / Brand Logo */}
      <div className="flex items-center gap-3 md:flex-1 md:max-w-xl">
        {isComponentRoute ? (
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 group text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mr-1"
            >
              <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-xs">
                A
              </div>
              <span className="hidden sm:inline font-bold text-foreground text-sm">Apex CRM</span>
              <span className="hidden md:inline px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono">
                Docs
              </span>
            </Link>
            <Link
              href="/dashboard"
              className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-lg bg-muted/50 hover:bg-muted border border-border/60 transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to CRM</span>
            </Link>
          </div>
        ) : (
          <SidebarTrigger className="md:hidden" />
        )}

        <button
          onClick={() => setOpen(true)}
          className="relative flex items-center justify-center md:justify-start w-10 h-10 md:w-full md:h-10 rounded-lg md:border md:border-input md:bg-muted/30 text-muted-foreground hover:bg-muted/50 md:hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 md:focus:ring-0 md:pl-9 md:pr-12 text-[15px]"
        >
          <Search className="h-5 w-5 md:h-4 md:w-4 md:absolute md:left-3 md:top-1/2 md:-translate-y-1/2" />
          <span className="hidden md:inline truncate">
            {isComponentRoute ? "Search components, primitives, hooks..." : "Search deals, contacts, leads..."}
          </span>
          <kbd className="hidden md:inline absolute right-3 top-1/2 -translate-y-1/2 rounded border bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
            K
          </kbd>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
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
              <Sparkles className="mr-2 h-4 w-4" />
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
