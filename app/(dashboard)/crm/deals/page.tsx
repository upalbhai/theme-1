"use client";

import * as React from "react";
import { Plus, MoreHorizontal, DollarSign, User, Building, Calendar, Tag, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatedNumber } from "@/components/core/animated-number";
import { AnimatedGroup } from "@/components/core/animated-group";
import { Magnetic } from "@/components/core/magnetic";
import { Tilt } from "@/components/core/tilt";

interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  contact: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
}

interface Column {
  id: string;
  title: string;
  deals: Deal[];
  color: string;
}

const initialPipeline: Column[] = [
  {
    id: "new",
    title: "New Lead",
    color: "bg-slate-500",
    deals: [
      {
        id: "d1",
        title: "Enterprise SaaS Tier Migration",
        company: "Starlight Digital",
        value: 35000,
        contact: "Elena Rostova",
        priority: "High",
        dueDate: "Aug 15",
      },
      {
        id: "d2",
        title: "API Gateway Integration",
        company: "Quantum Labs",
        value: 12000,
        contact: "Mark Vance",
        priority: "Low",
        dueDate: "Aug 20",
      },
    ],
  },
  {
    id: "contacted",
    title: "Contacted / Qualified",
    color: "bg-blue-500",
    deals: [
      {
        id: "d3",
        title: "Cloud Infrastructure Audit",
        company: "Vanguard Tech",
        value: 24500,
        contact: "James Thorne",
        priority: "Medium",
        dueDate: "Aug 12",
      },
    ],
  },
  {
    id: "proposal",
    title: "Proposal Sent",
    color: "bg-purple-500",
    deals: [
      {
        id: "d4",
        title: "Custom CRM Deployment",
        company: "Nexus AI Inc",
        value: 58000,
        contact: "David Miller",
        priority: "High",
        dueDate: "Aug 18",
      },
    ],
  },
  {
    id: "negotiation",
    title: "Negotiation",
    color: "bg-amber-500",
    deals: [
      {
        id: "d5",
        title: "Multi-year Support Contract",
        company: "Acme Corp",
        value: 92000,
        contact: "Sarah Jenkins",
        priority: "High",
        dueDate: "Aug 11",
      },
    ],
  },
  {
    id: "won",
    title: "Closed Won",
    color: "bg-emerald-500",
    deals: [
      {
        id: "d6",
        title: "Mobile App Development",
        company: "Fintech Express",
        value: 46000,
        contact: "Robert Paul",
        priority: "Medium",
        dueDate: "Aug 05",
      },
    ],
  },
];

const priorityStyles = {
  High: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Low: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
};

export default function DealsPipelinePage() {
  const [pipeline, setPipeline] = React.useState(initialPipeline);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingDeal, setEditingDeal] = React.useState<Deal | null>(null);
  const [formData, setFormData] = React.useState<Partial<Deal> & { columnId?: string }>({});

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
        dueDate: "",
        columnId: columnId || pipeline[0].id,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveDeal = () => {
    if (!formData.title || !formData.company || !formData.columnId) return;

    setPipeline((prev) => {
      const pipelineWithoutDeal = prev.map((col) => ({
        ...col,
        deals: editingDeal ? col.deals.filter((d) => d.id !== editingDeal.id) : col.deals,
      }));

      return pipelineWithoutDeal.map((col) => {
        if (col.id === formData.columnId) {
          const dealToAdd: Deal = editingDeal
            ? {
                id: editingDeal.id,
                title: formData.title || "",
                company: formData.company || "",
                value: Number(formData.value) || 0,
                contact: formData.contact || "",
                priority: (formData.priority as "High" | "Medium" | "Low") || "Medium",
                dueDate: formData.dueDate || "",
              }
            : {
                id: `d-${Date.now()}`,
                title: formData.title || "",
                company: formData.company || "",
                value: Number(formData.value) || 0,
                contact: formData.contact || "",
                priority: (formData.priority as "High" | "Medium" | "Low") || "Medium",
                dueDate: formData.dueDate || "",
              };
          return { ...col, deals: [...col.deals, dealToAdd] };
        }
        return col;
      });
    });

    setIsDialogOpen(false);
  };

  const handleDeleteDeal = (dealId: string, columnId: string) => {
    setPipeline((prev) =>
      prev.map((col) => {
        if (col.id === columnId) {
          return { ...col, deals: col.deals.filter((d) => d.id !== dealId) };
        }
        return col;
      })
    );
  };

  const totalPipelineValue = pipeline.reduce(
    (sum, col) => sum + col.deals.reduce((colSum, d) => colSum + d.value, 0),
    0
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales Deals Pipeline</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage, track, and progress leads across active pipeline stages.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-muted/20 px-4 py-2 text-sm">
            <span className="text-muted-foreground font-medium">Pipeline Value:</span>
            <span className="text-primary font-bold text-[15px] tracking-tight flex items-center">
              $<AnimatedNumber value={totalPipelineValue} />
            </span>
          </div>
          <Magnetic springOptions={{ bounce: 0.1 }}>
            <Button size="default" className="font-semibold shadow-sm" onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" /> Create Deal
            </Button>
          </Magnetic>
        </div>
      </div>

      {/* Kanban Pipeline Columns */}
      <div className="flex overflow-x-auto pb-4 -mx-2 px-2 snap-x hide-scrollbar">
        <div className="flex gap-4 min-w-max items-start">
          {pipeline.map((col) => {
            const totalColValue = col.deals.reduce((acc, d) => acc + d.value, 0);
            return (
              <div
                key={col.id}
                className="w-[300px] sm:w-[320px] shrink-0 snap-start rounded-xl border border-border/40 bg-muted/20 p-2.5 shadow-sm"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 mb-2 px-1">
                  <div className="flex items-center gap-2.5">
                    <span className={cn("h-2.5 w-2.5 rounded-full shadow-sm", col.color)} />
                    <h3 className="font-semibold text-[13px] uppercase tracking-wider text-foreground/90">
                      {col.title}
                    </h3>
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-background border border-border/50 text-[10px] font-bold text-muted-foreground shadow-sm">
                      {col.deals.length}
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <Button variant="ghost" size="icon-sm" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    } />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenDialog(undefined, col.id)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add deal here
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Column Subtotal */}
                <div className="text-[11px] font-medium text-muted-foreground mb-3 px-1.5 flex items-center gap-1">
                  Subtotal: <span className="font-bold text-foreground/80 flex items-center">$<AnimatedNumber value={totalColValue} /></span>
                </div>

                {/* Deal Cards */}
                <AnimatedGroup preset="scale" className="space-y-2.5">
                  {col.deals.map((deal) => (
                    <Tilt key={deal.id} rotationFactor={4} isReverse>
                      <div
                        className="group relative rounded-xl border border-border/60 bg-card p-3.5 shadow-xs hover:shadow-md hover:border-primary/40 transition-all cursor-pointer space-y-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-[13px] leading-snug group-hover:text-primary transition-colors">
                            {deal.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "rounded-md px-1.5 py-0.5 text-[9px] font-bold border shrink-0 uppercase tracking-wide",
                                priorityStyles[deal.priority]
                              )}
                            >
                              {deal.priority}
                            </span>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger render={
                                <Button variant="ghost" className="h-5 w-5 p-0 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                  <MoreHorizontal className="h-3.5 w-3.5" />
                                </Button>
                              } />
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleOpenDialog(deal, col.id)}>
                                  <Edit className="h-4 w-4 mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50" onClick={() => handleDeleteDeal(deal.id, col.id)}>
                                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-[15px] font-bold text-emerald-600 dark:text-emerald-400">
                          <DollarSign className="h-4 w-4 -mr-1" />
                          <AnimatedNumber value={deal.value} />
                        </div>

                        <div className="space-y-1.5 pt-1.5 border-t border-border/40 text-[11px] text-muted-foreground font-medium">
                          <div className="flex items-center gap-1.5">
                            <Building className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                            <span className="truncate">{deal.company}</span>
                          </div>
                          <div className="flex items-center justify-between pt-0.5">
                            <span className="flex items-center gap-1.5">
                              <User className="h-3.5 w-3.5 text-muted-foreground/70" /> {deal.contact}
                            </span>
                            <span className="flex items-center gap-1.5 text-[10px] bg-muted/40 px-1.5 py-0.5 rounded-md">
                              <Calendar className="h-3 w-3 text-muted-foreground/70" /> {deal.dueDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Tilt>
                  ))}
                </AnimatedGroup>

                {/* Add Deal Button */}
                <Button
                  variant="outline"
                  className="mt-2.5 w-full border-dashed border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:shadow-sm transition-all text-xs font-semibold h-9"
                  onClick={() => handleOpenDialog(undefined, col.id)}
                >
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add Deal
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingDeal ? "Edit Deal" : "Create Deal"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="col-span-3"
                placeholder="Deal Title"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input
                id="company"
                value={formData.company || ""}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="col-span-3"
                placeholder="Company Name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Value ($)
              </Label>
              <Input
                id="value"
                type="number"
                value={formData.value || ""}
                onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact" className="text-right">
                Contact
              </Label>
              <Input
                id="contact"
                value={formData.contact || ""}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="col-span-3"
                placeholder="Contact Name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                Due Date
              </Label>
              <Input
                id="dueDate"
                value={formData.dueDate || ""}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="col-span-3"
                placeholder="e.g. Aug 15"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.priority || "Medium"}
                  onValueChange={(value) => setFormData({ ...formData, priority: value as "High" | "Medium" | "Low" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stage" className="text-right">
                Stage
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.columnId || pipeline[0].id}
                  onValueChange={(value) => setFormData({ ...formData, columnId: value || undefined })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {pipeline.map((col) => (
                      <SelectItem key={col.id} value={col.id}>
                        {col.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDeal}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
