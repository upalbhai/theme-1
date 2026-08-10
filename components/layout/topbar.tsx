"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useThemePreset, ThemePreset } from "@/components/providers/theme-provider";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Paintbrush,
  Menu,
  Check,
  User,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TopbarProps {
  onMobileMenuToggle: () => void;
}

const themePresets: { id: ThemePreset; label: string; color: string }[] = [
  { id: "violet", label: "Violet (Default)", color: "#8b5cf6" },
  { id: "emerald", label: "Emerald Green", color: "#10b981" },
  { id: "blue", label: "Royal Blue", color: "#3b82f6" },
  { id: "amber", label: "Sunset Amber", color: "#f59e0b" },
  { id: "rose", label: "Passion Rose", color: "#f43f5e" },
];

export function Topbar({ onMobileMenuToggle }: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const { preset, setPreset } = useThemePreset();
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b bg-[hsl(var(--background))/80] px-4 md:px-6 backdrop-blur-md transition-colors">
      {/* Search Input & Mobile Toggle */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onMobileMenuToggle}
          className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg border hover:bg-[hsl(var(--accent))]"
          aria-label="Open Mobile Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Search deals, contacts, leads... (Press ⌘K)"
            className="h-9 w-full rounded-lg border bg-[hsl(var(--card))] pl-9 pr-12 text-sm placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border bg-[hsl(var(--muted))] px-1.5 py-0.5 text-[10px] font-medium text-[hsl(var(--muted-foreground))]">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Theme Accent Color Picker Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-[hsl(var(--accent))] transition-colors relative"
            title="Customize Theme Accent Color"
          >
            <Paintbrush className="h-4 w-4 text-[hsl(var(--primary))]" />
          </button>

          {showColorPicker && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-[hsl(var(--card))] p-3 shadow-lg ring-1 ring-black/5 z-50 animate-in fade-in zoom-in-95">
              <div className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-2">
                Select Accent Preset
              </div>
              <div className="space-y-1">
                {themePresets.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPreset(p.id);
                      setShowColorPicker(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-[hsl(var(--accent))]",
                      preset === p.id && "bg-[hsl(var(--accent))]"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3.5 w-3.5 rounded-full shadow-sm"
                        style={{ backgroundColor: p.color }}
                      />
                      <span>{p.label}</span>
                    </div>
                    {preset === p.id && <Check className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Light / Dark Mode Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-[hsl(var(--accent))] transition-colors"
          title="Toggle Light/Dark Theme"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-indigo-400" />
        </button>

        {/* Notifications Icon */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-[hsl(var(--accent))] transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
        </button>

        {/* User Profile Avatar */}
        <div className="relative ml-2">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 rounded-full border p-1 hover:bg-[hsl(var(--accent))] transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-xs font-bold text-[hsl(var(--primary-foreground))]">
              AD
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-[hsl(var(--card))] p-2 shadow-lg ring-1 ring-black/5 z-50">
              <div className="px-3 py-2 border-b">
                <p className="text-sm font-semibold">Alex Morgan</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">alex.m@apex-crm.com</p>
              </div>
              <div className="py-1">
                <button className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium hover:bg-[hsl(var(--accent))]">
                  <User className="h-3.5 w-3.5" /> Profile Settings
                </button>
                <button className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium hover:bg-[hsl(var(--accent))]">
                  <ShieldCheck className="h-3.5 w-3.5" /> Team Permissions
                </button>
                <button className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30">
                  <LogOut className="h-3.5 w-3.5" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
