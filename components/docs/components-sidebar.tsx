"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  COMPONENTS_REGISTRY,
  getCategories,
  getComponentsByCategory,
  ComponentCategory,
} from "@/lib/components-registry";
import { CommandMenuTrigger } from "./component-command-menu";
import {
  Sparkles,
  Type,
  TrendingUp,
  MousePointer,
  Layers,
  PanelTop,
  Box,
  ChevronDown,
  LayoutGrid,
  Menu,
  X,
  Compass,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CATEGORY_ICONS: Record<ComponentCategory, React.ComponentType<{ className?: string }>> = {
  Typography: Type,
  Numbers: TrendingUp,
  "Micro-Interactions": MousePointer,
  "Surfaces & Layouts": Layers,
  "Overlays & Disclosures": PanelTop,
  "UI Primitives": Box,
};

export function ComponentsSidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const categories = getCategories();

  // Close mobile drawer on route navigation
  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const SidebarContent = (
    <div className="flex flex-col h-full space-y-4">
      {/* Search & Command trigger */}
      <div className="px-1">
        <CommandMenuTrigger />
      </div>

      {/* Primary Links */}
      <div className="space-y-1">
        <Link
          href="/components"
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors",
            pathname === "/components"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <LayoutGrid className="size-4" />
          <span>All Components Hub</span>
          <Badge variant="outline" className={cn("ml-auto text-[10px] h-4.5 px-1.5", pathname === "/components" && "border-white/30 text-white")}>
            {COMPONENTS_REGISTRY.length}
          </Badge>
        </Link>

        <Link
          href="/motion-primitives"
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors",
            pathname === "/motion-primitives"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <span>Motion Showcase</span>
          <Badge variant="secondary" className="ml-auto text-[10px] h-4.5 px-1.5 bg-primary/10 text-primary border border-primary/20">
            Live
          </Badge>
        </Link>
      </div>

      <div className="h-px bg-border/80" />

      {/* Grouped Component Links */}
      <div className="flex-1 overflow-y-auto space-y-5 pr-1 text-xs">
        {categories.map((category) => {
          const items = getComponentsByCategory(category);
          const Icon = CATEGORY_ICONS[category] || Box;

          return (
            <div key={category} className="space-y-1">
              <div className="flex items-center gap-2 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <Icon className="size-3.5" />
                <span>{category}</span>
                <span className="ml-auto text-[10px] font-mono opacity-60">({items.length})</span>
              </div>

              <div className="space-y-0.5 pl-2">
                {items.map((item) => {
                  const isActive = pathname === `/components/${item.slug}`;

                  return (
                    <Link
                      key={item.slug}
                      href={`/components/${item.slug}`}
                      className={cn(
                        "group flex items-center justify-between px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary pl-2.5"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      )}
                    >
                      <span className="truncate">{item.title}</span>
                      {isActive && (
                        <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Credit Footer */}
      <div className="pt-2 border-t border-border/60 shrink-0">
        <a
          href="https://github.com/ibelick/motion-primitives"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between text-[11px] text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-lg hover:bg-muted/60"
        >
          <span className="truncate">Credit: ibelick/motion-primitives</span>
          <ExternalLink className="size-3 shrink-0 ml-1.5" />
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Trigger Bar */}
      <div className="lg:hidden flex items-center justify-between p-3 bg-card border-b sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setMobileOpen(true)}
            className="h-8 gap-1.5 text-xs font-medium"
          >
            <Menu className="size-4" />
            Components Menu
          </Button>
          <span className="text-xs text-muted-foreground truncate">
            {COMPONENTS_REGISTRY.find((c) => pathname === `/components/${c.slug}`)?.title || "Explore Library"}
          </span>
        </div>
        <CommandMenuTrigger className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground bg-muted/50 rounded-md border text-[11px]" />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden flex">
          <div className="relative w-72 max-w-[80vw] bg-card h-full p-4 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b mb-3">
              <div className="flex items-center gap-2">
                <Compass className="size-4 text-primary" />
                <span className="font-bold text-sm">Components Docs</span>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setMobileOpen(false)}
                className="size-7"
              >
                <X className="size-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {SidebarContent}
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <aside
        className={cn(
          "hidden lg:block w-64 shrink-0 border-r border-border/70 p-4 h-[calc(100vh-4rem)] sticky top-16 overflow-hidden",
          className
        )}
      >
        {SidebarContent}
      </aside>
    </>
  );
}

