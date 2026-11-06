"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  COMPONENTS_REGISTRY,
  getCategories,
  getComponentsByCategory,
  ComponentCategory,
} from "@/lib/components-registry";
import {
  Sparkles,
  Type,
  TrendingUp,
  MousePointer,
  Layers,
  PanelTop,
  Box,
  Copy,
  Check,
  ExternalLink,
  Search,
} from "lucide-react";
import { toast } from "sonner";

interface ComponentCommandMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CATEGORY_ICONS: Record<ComponentCategory, React.ComponentType<{ className?: string }>> = {
  Typography: Type,
  Numbers: TrendingUp,
  "Micro-Interactions": MousePointer,
  "Surfaces & Layouts": Layers,
  "Overlays & Disclosures": PanelTop,
  "UI Primitives": Box,
};

export function ComponentCommandMenu({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: ComponentCommandMenuProps) {
  const router = useRouter();
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [copiedInstall, setCopiedInstall] = React.useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = (val: boolean) => {
    if (isControlled && setControlledOpen) {
      setControlledOpen(val);
    } else {
      setInternalOpen(val);
    }
  };

  // Listen for Cmd+K / Ctrl+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  const navigateTo = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  const copyInstallCommand = () => {
    navigator.clipboard.writeText("npm install motion react-use-measure");
    setCopiedInstall(true);
    toast.success("Copied to clipboard: npm install motion react-use-measure");
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const categories = getCategories();

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Search Components & Primitives"
      description="Quickly jump to any UI component, motion primitive, or copy install commands."
    >
      <CommandInput placeholder="Type a component name or feature (e.g. 'Dock', 'Tilt', 'Number')..." />
      <CommandList className="max-h-[380px]">
        <CommandEmpty>No matching components found.</CommandEmpty>

        {/* Quick Actions */}
        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() => navigateTo("/components")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="size-4 text-primary" />
            <span>Components Overview</span>
            <CommandShortcut>/components</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => navigateTo("/motion-primitives")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Layers className="size-4 text-purple-500" />
            <span>Motion Primitives Showcase</span>
            <CommandShortcut>/motion-primitives</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={copyInstallCommand}
            className="flex items-center gap-2 cursor-pointer"
          >
            {copiedInstall ? (
              <Check className="size-4 text-emerald-500" />
            ) : (
              <Copy className="size-4 text-muted-foreground" />
            )}
            <span>Copy install: npm install motion</span>
            <CommandShortcut>npm</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Grouped Components */}
        {categories.map((category) => {
          const items = getComponentsByCategory(category);
          const Icon = CATEGORY_ICONS[category] || Box;

          return (
            <CommandGroup key={category} heading={category}>
              {items.map((item) => (
                <CommandItem
                  key={item.slug}
                  value={`${item.title} ${item.description} ${item.category}`}
                  onSelect={() => navigateTo(`/components/${item.slug}`)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="size-6 rounded-md bg-muted/60 flex items-center justify-center text-muted-foreground">
                      <Icon className="size-3.5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{item.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-muted text-muted-foreground shrink-0 ml-2">
                    {item.badge}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          );
        })}
      </CommandList>
    </CommandDialog>
  );
}

export function CommandMenuTrigger({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className || "flex items-center gap-2 w-full px-3 py-2 text-xs text-muted-foreground bg-muted/40 hover:bg-muted/70 border border-border/80 rounded-lg transition-colors cursor-pointer"}
      >
        <Search className="size-3.5" />
        <span className="flex-1 text-left">Search components...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <ComponentCommandMenu open={open} onOpenChange={setOpen} />
    </>
  );
}

