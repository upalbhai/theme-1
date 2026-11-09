"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MoreHorizontal, 
  Calendar, 
  LayoutGrid, 
  List, 
  Eye, 
  Trash2,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { toast } from "sonner";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  client: string;
  budget: string;
  deadline: string;
  progress: number;
  status: "In Progress" | "Completed" | "Delayed" | "Planning";
  team: { name: string; initials: string }[];
}

const INITIAL_PROJECTS: ProjectItem[] = [
  { 
    id: "PRJ-8841", 
    title: "Enterprise Cloud Tenancy Migration", 
    category: "Infrastructure", 
    client: "Northwind Logistics", 
    budget: "$48,500", 
    deadline: "Nov 18, 2026", 
    progress: 88, 
    status: "In Progress", 
    team: [
      { name: "Alex Morgan", initials: "AM" },
      { name: "Sarah Jenkins", initials: "SJ" },
      { name: "David Chen", initials: "DC" }
    ] 
  },
  { 
    id: "PRJ-8842", 
    title: "SOC2 Type II Audit & Telemetry Gateway", 
    category: "Security", 
    client: "Apex Cybernetics", 
    budget: "$62,000", 
    deadline: "Dec 04, 2026", 
    progress: 45, 
    status: "In Progress", 
    team: [
      { name: "David Chen", initials: "DC" },
      { name: "Kai Liu", initials: "KL" }
    ] 
  },
  { 
    id: "PRJ-8843", 
    title: "Stripe Multi-Currency Billing Engine", 
    category: "Fintech", 
    client: "PayGlobal Systems", 
    budget: "$38,000", 
    deadline: "Oct 30, 2026", 
    progress: 100, 
    status: "Completed", 
    team: [
      { name: "Alex Morgan", initials: "AM" },
      { name: "Elena Rostova", initials: "ER" }
    ] 
  },
  { 
    id: "PRJ-8844", 
    title: "Enterprise SSO & SCIM Provisioning", 
    category: "Authentication", 
    client: "SecureNet Corp", 
    budget: "$24,500", 
    deadline: "Nov 25, 2026", 
    progress: 65, 
    status: "In Progress", 
    team: [
      { name: "Sarah Jenkins", initials: "SJ" },
      { name: "David Chen", initials: "DC" }
    ] 
  },
  { 
    id: "PRJ-8845", 
    title: "Customer Intelligence Data Lakehouse", 
    category: "Data Platform", 
    client: "DataStream Global", 
    budget: "$75,000", 
    deadline: "Jan 15, 2027", 
    progress: 20, 
    status: "Planning", 
    team: [
      { name: "Kai Liu", initials: "KL" },
      { name: "Elena Rostova", initials: "ER" }
    ] 
  },
  { 
    id: "PRJ-8846", 
    title: "High-Throughput Webhook Infrastructure", 
    category: "API & Backend", 
    client: "Horizon Media Group", 
    budget: "$32,000", 
    deadline: "Oct 22, 2026", 
    progress: 35, 
    status: "Delayed", 
    team: [
      { name: "Alex Morgan", initials: "AM" },
      { name: "Kai Liu", initials: "KL" }
    ] 
  },
];

const STATUS_CONFIG = {
  "In Progress": {
    label: "In Progress",
    badgeClass: "bg-primary/10 text-primary border-primary/25",
    barClass: "bg-primary"
  },
  "Completed": {
    label: "Completed",
    badgeClass: "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/25",
    barClass: "bg-emerald-600 dark:bg-emerald-500"
  },
  "Delayed": {
    label: "Delayed",
    badgeClass: "bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/25",
    barClass: "bg-rose-600 dark:bg-rose-500"
  },
  "Planning": {
    label: "Planning",
    badgeClass: "bg-muted text-foreground border-border/80",
    barClass: "bg-muted-foreground"
  }
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isOpen, setIsOpen] = useState(false);

  // New project form state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Infrastructure");
  const [newClient, setNewClient] = useState("");
  const [newBudget, setNewBudget] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newClient.trim()) return;

    const newPrj: ProjectItem = {
      id: `PRJ-${8840 + projects.length + 1}`,
      title: newTitle.trim(),
      category: newCategory.trim() || "Delivery",
      client: newClient.trim(),
      budget: newBudget.startsWith("$") ? newBudget.trim() : `$${newBudget.trim() || "25,000"}`,
      deadline: newDeadline.trim() || "Dec 31, 2026",
      progress: 10,
      status: "In Progress",
      team: [
        { name: "Alex Morgan", initials: "AM" },
        { name: "Sarah Jenkins", initials: "SJ" }
      ],
    };

    setProjects([newPrj, ...projects]);
    toast.success("Project workspace created");
    setNewTitle("");
    setNewClient("");
    setNewBudget("");
    setNewDeadline("");
    setIsOpen(false);
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
    toast.success("Project removed from workspace");
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const projectColumns: ColumnDef<ProjectItem>[] = [
    {
      header: "Project & Client",
      className: "w-[300px] pl-4",
      render: (prj) => (
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs text-foreground">{prj.title}</span>
            <span className="text-[10px] font-mono text-muted-foreground">{prj.id}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {prj.client} • {prj.category}
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      className: "w-[130px]",
      render: (prj) => {
        const config = STATUS_CONFIG[prj.status];
        return (
          <Badge variant="outline" className={`text-[10px] font-medium ${config.badgeClass}`}>
            {config.label}
          </Badge>
        );
      },
    },
    {
      header: "Progress",
      className: "w-[170px]",
      render: (prj) => {
        const config = STATUS_CONFIG[prj.status];
        return (
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">Milestones</span>
              <span className="text-foreground font-medium tabular-nums">{prj.progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${config.barClass}`} style={{ width: `${prj.progress}%` }} />
            </div>
          </div>
        );
      },
    },
    {
      header: "Budget",
      className: "w-[120px] text-right font-mono",
      render: (prj) => (
        <span className="text-xs font-semibold text-foreground font-mono tabular-nums">
          {prj.budget}
        </span>
      ),
    },
    {
      header: "Target Delivery",
      className: "w-[130px] text-right font-mono text-xs text-muted-foreground",
      accessorKey: "deadline",
    },
    {
      header: "Team",
      className: "w-[110px]",
      render: (prj) => (
        <div className="flex -space-x-1.5">
          {prj.team.map((mem, i) => (
            <Avatar key={i} className="size-6 border border-background">
              <AvatarFallback className="text-[9px] font-mono bg-muted text-foreground">
                {mem.initials}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      ),
    },
    {
      header: "",
      className: "w-[50px] text-right pr-4",
      render: (prj) => (
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="size-3.5" />
            </Button>
          } />
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toast.success(`Opened details for ${prj.title}`)}>
              <Eye className="size-3.5 mr-2" /> View Workspace
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => deleteProject(prj.id)}>
              <Trash2 className="size-3.5 mr-2" /> Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <Breadcrumb>
            <BreadcrumbList className="text-xs">
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard" className="text-muted-foreground hover:text-foreground">
                  Workspace
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-foreground">
                  Projects & Delivery
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-2 mt-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Projects</h1>
            <Badge variant="outline" className="text-xs font-mono font-medium text-muted-foreground border-border/70">
              Q3 2026
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Active client implementations, engineering sprints, and milestone delivery.
          </p>
        </div>

        {/* Create Project Modal */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger render={
            <Button className="h-8.5 gap-1.5 px-3.5 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="size-3.5" />
              <span>Create Project</span>
            </Button>
          } />
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base font-semibold">New Project Workspace</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateProject} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="prj-title" className="text-xs">Project Title</Label>
                <Input 
                  id="prj-title" 
                  placeholder="e.g. Multi-Tenant Telemetry Gateway" 
                  value={newTitle} 
                  onChange={e => setNewTitle(e.target.value)} 
                  className="h-9 text-sm"
                  autoFocus
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="prj-client" className="text-xs">Client Account</Label>
                  <Input 
                    id="prj-client" 
                    placeholder="Acme Corp" 
                    value={newClient} 
                    onChange={e => setNewClient(e.target.value)} 
                    className="h-9 text-xs"
                    required 
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="prj-category" className="text-xs">Category</Label>
                  <Input 
                    id="prj-category" 
                    placeholder="Infrastructure, Security..." 
                    value={newCategory} 
                    onChange={e => setNewCategory(e.target.value)} 
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="prj-budget" className="text-xs">Budget ($)</Label>
                  <Input 
                    id="prj-budget" 
                    placeholder="45,000" 
                    value={newBudget} 
                    onChange={e => setNewBudget(e.target.value)} 
                    className="h-9 text-xs font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="prj-deadline" className="text-xs">Target Delivery</Label>
                  <Input 
                    id="prj-deadline" 
                    placeholder="Nov 30, 2026" 
                    value={newDeadline} 
                    onChange={e => setNewDeadline(e.target.value)} 
                    className="h-9 text-xs font-mono"
                  />
                </div>
              </div>

              <DialogFooter className="pt-2">
                <DialogClose render={
                  <Button type="button" variant="outline" size="sm" className="h-8.5 text-xs">
                    Cancel
                  </Button>
                } />
                <Button 
                  type="submit" 
                  size="sm"
                  disabled={!newTitle.trim() || !newClient.trim()}
                  className="h-8.5 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Create Workspace
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* 4 Balanced KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/70 bg-card shadow-xs">
          <CardContent className="p-4 space-y-1.5">
            <div className="flex items-center justify-between text-muted-foreground text-xs">
              <span className="font-medium">Total Workspaces</span>
              <Briefcase className="size-3.5 text-muted-foreground" />
            </div>
            <div className="text-2xl font-semibold tracking-tight text-foreground font-mono tabular-nums">
              {projects.length}
            </div>
            <p className="text-[11px] font-mono text-muted-foreground">
              Across all client accounts
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card shadow-xs">
          <CardContent className="p-4 space-y-1.5">
            <div className="flex items-center justify-between text-muted-foreground text-xs">
              <span className="font-medium">Active Sprints</span>
              <Clock className="size-3.5 text-primary" />
            </div>
            <div className="text-2xl font-semibold tracking-tight text-foreground font-mono tabular-nums">
              {projects.filter(p => p.status === "In Progress").length}
            </div>
            <p className="text-[11px] font-mono text-muted-foreground">
              In flight delivery milestones
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card shadow-xs">
          <CardContent className="p-4 space-y-1.5">
            <div className="flex items-center justify-between text-muted-foreground text-xs">
              <span className="font-medium">Delivered Projects</span>
              <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-2xl font-semibold tracking-tight text-foreground font-mono tabular-nums">
              {projects.filter(p => p.status === "Completed").length}
            </div>
            <p className="text-[11px] font-mono text-muted-foreground">
              Sign-off verified Q3
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card shadow-xs">
          <CardContent className="p-4 space-y-1.5">
            <div className="flex items-center justify-between text-muted-foreground text-xs">
              <span className="font-medium">Blocked / Delayed</span>
              <AlertCircle className="size-3.5 text-rose-600 dark:text-rose-400" />
            </div>
            <div className="text-2xl font-semibold tracking-tight text-foreground font-mono tabular-nums">
              {projects.filter(p => p.status === "Delayed").length}
            </div>
            <p className="text-[11px] font-mono text-muted-foreground">
              Needs escalation review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar: Search, Status Filter & View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input 
            placeholder="Search projects by title, client, or category..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            className="h-8.5 pl-8 text-xs"
          />
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Status Tabs */}
          <div className="flex items-center rounded-lg border border-border/70 bg-card p-0.5">
            {["All", "In Progress", "Completed", "Delayed", "Planning"].map(status => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  statusFilter === status 
                    ? "bg-muted text-foreground font-medium shadow-xs" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* View Mode Switcher */}
          <div className="inline-flex items-center rounded-lg border border-border/70 bg-card p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "grid" 
                  ? "bg-muted text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "table" 
                  ? "bg-muted text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Table View"
            >
              <List className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Grid or Table */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((prj) => {
            const config = STATUS_CONFIG[prj.status];
            return (
              <Card key={prj.id} className="border-border/70 bg-card shadow-xs hover:border-border transition-colors flex flex-col justify-between">
                <CardHeader className="py-4 px-4 pb-3 border-b border-border/60 bg-muted/15 flex flex-row items-start justify-between space-y-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-[10px] font-medium ${config.badgeClass}`}>
                        {config.label}
                      </Badge>
                      <span className="text-[10px] font-mono text-muted-foreground">{prj.id}</span>
                    </div>
                    <CardTitle className="text-sm font-semibold text-foreground leading-snug pt-0.5">
                      {prj.title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground font-medium">
                      {prj.client} • {prj.category}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-foreground -mr-1">
                        <MoreHorizontal className="size-3.5" />
                      </Button>
                    } />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toast.success(`Opened workspace for ${prj.title}`)}>
                        <Eye className="size-3.5 mr-2" /> View Workspace
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => deleteProject(prj.id)}>
                        <Trash2 className="size-3.5 mr-2" /> Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>

                <CardContent className="p-4 space-y-4 flex-1 flex flex-col justify-between">
                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Milestones</span>
                      <span className="text-foreground font-semibold tabular-nums">{prj.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${config.barClass}`} 
                        style={{ width: `${prj.progress}%` }} 
                      />
                    </div>
                  </div>

                  {/* Budget & Target Delivery */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/40 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-muted-foreground block">Budget</span>
                      <span className="font-semibold text-foreground font-mono tabular-nums">{prj.budget}</span>
                    </div>
                    <div className="space-y-0.5 text-right">
                      <span className="text-[10px] font-mono text-muted-foreground block">Target Delivery</span>
                      <span className="font-mono text-muted-foreground">{prj.deadline}</span>
                    </div>
                  </div>

                  {/* Team Roster & Action Link */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/40">
                    <div className="flex -space-x-1.5">
                      {prj.team.map((mem, i) => (
                        <Avatar key={i} className="size-6 border border-background">
                          <AvatarFallback className="text-[9px] font-mono bg-muted text-foreground">
                            {mem.initials}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <Button 
                      variant="link" 
                      size="sm" 
                      onClick={() => toast.success(`Opened workspace for ${prj.title}`)}
                      className="p-0 h-auto text-xs text-primary font-medium flex items-center gap-1 hover:text-primary/90"
                    >
                      <span>Workspace</span>
                      <ChevronRight className="size-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <Card className="border-border/70 bg-card shadow-xs overflow-hidden">
          <CardContent className="p-0">
            <DataTable
              columns={projectColumns}
              data={filteredProjects}
              className="border-none shadow-none bg-transparent"
              hidePagination
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}