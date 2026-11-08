"use client";

import * as React from "react";
import {
  Plus,
  MoreHorizontal,
  DollarSign,
  User,
  Building,
  Calendar,
  Edit,
  Trash2,
  Search,
  MoveRight,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatedNumber } from "@/components/core/animated-number";
import { KanbanBoard, KanbanColumn, ItemMoveEvent } from "@/components/ui/kanban";
import { toast } from "sonner";

export interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  contact: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
}

const INITIAL_COLUMNS: KanbanColumn<Deal>[] = [
  {
    id: "lead",
    title: "New Lead",
    color: "bg-muted-foreground",
    items: [
      {
        id: "d1",
        title: "Enterprise SaaS Tier Migration",
        company: "Starlight Digital",
        value: 35000,
        contact: "Elena Rostova",
        priority: "High",
        dueDate: "Oct 28",
      },
      {
        id: "d2",
        title: "API Gateway Integration",
        company: "Quantum Labs",
        value: 12000,
        contact: "Mark Vance",
        priority: "Low",
        dueDate: "Nov 04",
      },
    ],
  },
  {
    id: "contacted",
    title: "Qualified & In Review",
    color: "bg-primary",
    items: [
      {
        id: "d3",
        title: "Cloud Infrastructure Audit",
        company: "Vanguard Tech",
        value: 24500,
        contact: "James Thorne",
        priority: "Medium",
        dueDate: "Oct 25",
      },
    ],
  },
  {
    id: "proposal",
    title: "Proposal Sent",
    color: "bg-amber-600 dark:bg-amber-500",
    items: [
      {
        id: "d4",
        title: "Custom CRM Deployment",
        company: "Nexus AI Inc",
        value: 58000,
        contact: "David Miller",
        priority: "High",
        dueDate: "Nov 02",
      },
    ],
  },
  {
    id: "negotiation",
    title: "Negotiation",
    color: "bg-rose-600 dark:bg-rose-500",
    items: [
      {
        id: "d5",
        title: "Multi-year Support Contract",
        company: "Acme Corp",
        value: 92000,
        contact: "Sarah Jenkins",
        priority: "High",
        dueDate: "Oct 22",
      },
    ],
  },
  {
    id: "won",
    title: "Closed Won",
    color: "bg-emerald-600 dark:bg-emerald-500",
    items: [
      {
        id: "d6",
        title: "Mobile App Development Retainer",
        company: "Fintech Express",
        value: 46000,
        contact: "Robert Paul",
        priority: "Medium",
        dueDate: "Oct 15",
      },
    ],
  },
];

const PRIORITY_STYLES: Record<Deal["priority"], string> = {
  High: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  Medium: "bg-primary/10 text-primary border-primary/20",
  Low: "bg-muted text-muted-foreground border-border",
};

export default function DealsPipelinePage() {
  const [columns, setColumns] = React.useState<KanbanColumn<Deal>[]>(INITIAL_COLUMNS);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingDeal, setEditingDeal] = React.useState<Deal | null>(null);
  const [formData, setFormData] = React.useState<Partial<Deal> & { columnId?: string }>({});

  // Compute Total Pipeline Value
  const totalPipelineValue = React.useMemo(() => {
    return columns.reduce(
      (sum, col) => sum + col.items.reduce((colSum, d) => colSum + d.value, 0),
      0
    );
  }, [columns]);

  const totalDealsCount = React.useMemo(() => {
    return columns.reduce((sum, col) => sum + col.items.length, 0);
  }, [columns]);

  // Handle Drag & Drop item movement
  const handleItemMove = (event: ItemMoveEvent<Deal>) => {
    const targetColumn = columns.find((c) => c.id === event.targetColumnId);
    if (event.sourceColumnId !== event.targetColumnId) {
      toast.success(
        `Moved "${event.item.title}" to ${targetColumn?.title || "stage"}`
      );
    }
  };

  // Open Dialog for Create or Edit
  const handleOpenDialog = (deal?: Deal, columnId?: string) => {
    if (deal) {
      setEditingDeal(deal);
      setFormData({ ...deal, columnId });
    } else {
      setEditingDeal(null);
      setFormData({
        title: "",
        company: "",
        value: 0,
        contact: "",
        priority: "Medium",
        dueDate: "Oct 30",
        columnId: columnId || columns[0].id,
      });
    }
    setIsDialogOpen(true);
  };

  // Save or Create Deal
  const handleSaveDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.company || !formData.columnId) return;

    const targetColumnId = formData.columnId;

    setColumns((prev) => {
      // If editing, first remove it from all columns
      const cleaned = prev.map((col) => ({
        ...col,
        items: editingDeal ? col.items.filter((d) => d.id !== editingDeal.id) : col.items,
      }));

      const dealToInsert: Deal = {
        id: editingDeal ? editingDeal.id : `deal-${Date.now()}`,
        title: formData.title || "",
        company: formData.company || "",
        value: Number(formData.value) || 0,
        contact: formData.contact || "",
        priority: (formData.priority as Deal["priority"]) || "Medium",
        dueDate: formData.dueDate || "Today",
      };

      return cleaned.map((col) => {
        if (col.id === targetColumnId) {
          return {
            ...col,
            items: [dealToInsert, ...col.items],
          };
        }
        return col;
      });
    });

    setIsDialogOpen(false);
    toast.success(editingDeal ? "Deal updated successfully" : "New deal added to pipeline");
  };

  // Move deal to specific stage (accessibility / mobile fallback)
  const handleMoveToStage = (deal: Deal, sourceColId: string, targetColId: string) => {
    if (sourceColId === targetColId) return;

    setColumns((prev) => {
      return prev.map((col) => {
        if (col.id === sourceColId) {
          return { ...col, items: col.items.filter((d) => d.id !== deal.id) };
        }
        if (col.id === targetColId) {
          return { ...col, items: [...col.items, deal] };
        }
        return col;
      });
    });

    const targetTitle = columns.find((c) => c.id === targetColId)?.title;
    toast.success(`Moved to ${targetTitle}`);
  };

  // Delete Deal
  const handleDeleteDeal = (dealId: string, colId: string, title: string) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === colId) {
          return { ...col, items: col.items.filter((d) => d.id !== dealId) };
        }
        return col;
      })
    );
    toast.success(`Deleted: "${title}"`);
  };

  // Filter items by search query if present
  const displayColumns = React.useMemo(() => {
    if (!searchQuery.trim()) return columns;
    const query = searchQuery.toLowerCase();
    return columns.map((col) => ({
      ...col,
      items: col.items.filter(
        (deal) =>
          deal.title.toLowerCase().includes(query) ||
          deal.company.toLowerCase().includes(query) ||
          deal.contact.toLowerCase().includes(query)
      ),
    }));
  }, [columns, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Deals Pipeline</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Drag and drop deals across pipeline stages to track deal velocity and forecasted revenue.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Total Pipeline Pill */}
          <div className="flex items-center gap-2 rounded-lg border border-border/80 bg-muted/30 px-3.5 py-1.5 text-xs">
            <span className="text-muted-foreground">Pipeline Value:</span>
            <span className="text-primary font-bold text-sm tracking-tight font-mono">
              $<AnimatedNumber value={totalPipelineValue} />
            </span>
          </div>

          <Button
            size="sm"
            onClick={() => handleOpenDialog()}
            className="gap-2 cursor-pointer shadow-xs"
          >
            <Plus className="size-4" />
            <span>Create Deal</span>
          </Button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-xs md:max-w-sm w-full">
          <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search deals, companies, contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9 text-xs"
          />
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <span>{totalDealsCount} Total Deals</span>
        </div>
      </div>

      {/* Interactive Drag & Drop Kanban Board */}
      <KanbanBoard<Deal>
        columns={displayColumns}
        onColumnsChange={(newCols) => setColumns(newCols)}
        onItemMove={handleItemMove}
        renderColumnHeader={(column, count) => {
          const colTotal = column.items.reduce((sum, d) => sum + d.value, 0);
          return (
            <div className="pb-3 border-b border-border/60 mb-3 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn("size-2 rounded-full", column.color)} aria-hidden="true" />
                  <h3 className="font-semibold text-xs text-foreground tracking-tight">
                    {column.title}
                  </h3>
                  <span className="text-[10px] font-mono font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    {count}
                  </span>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <MoreHorizontal className="size-3.5" />
                    </Button>
                  } />
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleOpenDialog(undefined, column.id)}>
                      <Plus className="size-3.5 mr-2" /> Add deal here
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Subtotal */}
              <div className="text-[11px] text-muted-foreground font-mono flex items-center gap-1">
                <span>Subtotal:</span>
                <span className="font-semibold text-foreground">
                  $<AnimatedNumber value={colTotal} />
                </span>
              </div>
            </div>
          );
        }}
        renderItem={(deal, column) => (
          <Card className="p-3.5 border-border/80 shadow-2xs hover:border-primary/50 transition-colors bg-card space-y-2.5">
            {/* Title & Priority Badge */}
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-semibold text-xs leading-snug text-foreground hover:text-primary transition-colors">
                {deal.title}
              </h4>

              <div className="flex items-center gap-1 shrink-0">
                <Badge
                  variant="outline"
                  className={cn("text-[9px] py-0 px-1.5 h-4 font-mono font-medium", PRIORITY_STYLES[deal.priority])}
                >
                  {deal.priority}
                </Badge>

                {/* Card Action Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-5 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <MoreHorizontal className="size-3" />
                    </Button>
                  } />
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem onClick={() => handleOpenDialog(deal, column.id)}>
                      <Edit className="size-3.5 mr-2" /> Edit Deal
                    </DropdownMenuItem>

                    {/* Stage Mover for Mobile / Accessibility */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <MoveRight className="size-3.5 mr-2" /> Move to Stage
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        {columns.map((c) => (
                          <DropdownMenuItem
                            key={c.id}
                            disabled={c.id === column.id}
                            onClick={() => handleMoveToStage(deal, column.id, c.id)}
                          >
                            <span className={cn("size-2 rounded-full mr-2", c.color)} />
                            <span>{c.title}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDeleteDeal(deal.id, column.id, deal.title)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="size-3.5 mr-2" /> Delete Deal
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Value */}
            <div className="text-sm font-bold text-foreground font-mono">
              ${deal.value.toLocaleString()}
            </div>

            {/* Company & Contact */}
            <div className="space-y-1 pt-1.5 border-t border-border/50 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-1.5 truncate">
                <Building className="size-3 text-muted-foreground/70 shrink-0" />
                <span className="truncate">{deal.company}</span>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <span className="flex items-center gap-1.5 truncate">
                  <User className="size-3 text-muted-foreground/70 shrink-0" />
                  <span className="truncate">{deal.contact}</span>
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono bg-muted/60 px-1.5 py-0.5 rounded shrink-0">
                  <Calendar className="size-2.5 text-muted-foreground/70" />
                  <span>{deal.dueDate}</span>
                </span>
              </div>
            </div>
          </Card>
        )}
        renderColumnFooter={(column) => (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOpenDialog(undefined, column.id)}
            className="w-full border-dashed border-border/80 text-muted-foreground hover:text-foreground hover:border-primary/50 text-xs h-8 cursor-pointer"
          >
            <Plus className="size-3.5 mr-1" /> Add Deal
          </Button>
        )}
      />

      {/* Create / Edit Deal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingDeal ? "Edit Deal" : "Create New Deal"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveDeal} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="deal-title" className="text-xs font-semibold">
                Deal Title
              </Label>
              <Input
                id="deal-title"
                placeholder="e.g. Enterprise Cloud Migration"
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="deal-company" className="text-xs font-semibold">
                  Company Name
                </Label>
                <Input
                  id="deal-company"
                  placeholder="e.g. Acme Corp"
                  value={formData.company || ""}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="deal-value" className="text-xs font-semibold">
                  Value ($)
                </Label>
                <Input
                  id="deal-value"
                  type="number"
                  placeholder="e.g. 50000"
                  value={formData.value || ""}
                  onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="deal-contact" className="text-xs font-semibold">
                  Primary Contact
                </Label>
                <Input
                  id="deal-contact"
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.contact || ""}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="deal-date" className="text-xs font-semibold">
                  Target Close Date
                </Label>
                <Input
                  id="deal-date"
                  placeholder="e.g. Nov 15"
                  value={formData.dueDate || ""}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Priority</Label>
                <select
                  value={formData.priority || "Medium"}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value as Deal["priority"] })
                  }
                  className="w-full h-9 px-3 rounded-lg border border-input bg-card text-xs focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Stage</Label>
                <select
                  value={formData.columnId || columns[0].id}
                  onChange={(e) => setFormData({ ...formData, columnId: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-input bg-card text-xs focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {columns.map((col) => (
                    <option key={col.id} value={col.id}>
                      {col.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!formData.title || !formData.company}>
                {editingDeal ? "Save Changes" : "Create Deal"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
