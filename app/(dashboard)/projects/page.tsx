"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MoreVertical, 
  User, 
  Calendar, 
  DollarSign, 
  LayoutGrid, 
  List, 
  Eye, 
  Pencil, 
  Trash2,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  client: string;
  budget: string;
  deadline: string;
  progress: number;
  status: "In Progress" | "Completed" | "Delayed" | "Planning";
  team: string[];
}

const INITIAL_PROJECTS: ProjectItem[] = [
  { id: "PRJ-01", title: "Apex CRM Design & Redesign", category: "UI/UX", client: "Apex Corp", budget: "$38,500", deadline: "Nov 15, 2026", progress: 85, status: "In Progress", team: ["SJ", "MV", "EW"] },
  { id: "PRJ-02", title: "Enterprise SSO & Auth Integration", category: "Backend", client: "SecureNet Inc", budget: "$19,000", deadline: "Nov 02, 2026", progress: 100, status: "Completed", team: ["DR", "AW"] },
  { id: "PRJ-03", title: "NFT Marketplace Mobile App", category: "Mobile", client: "BlockChain Corp", budget: "$65,000", deadline: "Dec 10, 2026", progress: 60, status: "In Progress", team: ["SJ", "MB"] },
  { id: "PRJ-04", title: "Stripe Multi-tenant Billing System", category: "FinTech", client: "PayGlobal Ltd", budget: "$42,000", deadline: "Oct 25, 2026", progress: 35, status: "Delayed", team: ["MV", "EW", "JS"] },
  { id: "PRJ-05", title: "AI Predictive Analytics Dashboard", category: "AI / ML", client: "DataStream", budget: "$58,000", deadline: "Dec 20, 2026", progress: 20, status: "Planning", team: ["DR", "SC"] },
  { id: "PRJ-06", title: "E-Commerce Infrastructure Cloud Migration", category: "DevOps", client: "Acme Web", budget: "$28,000", deadline: "Nov 28, 2026", progress: 92, status: "In Progress", team: ["AW", "SJ"] },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isOpen, setIsOpen] = useState(false);

  // New project form state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("UI/UX");
  const [newClient, setNewClient] = useState("");
  const [newBudget, setNewBudget] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newClient.trim()) return;

    const newPrj: ProjectItem = {
      id: `PRJ-0${projects.length + 1}`,
      title: newTitle,
      category: newCategory,
      client: newClient,
      budget: newBudget.startsWith("$") ? newBudget : `$${newBudget || "15000"}`,
      deadline: newDeadline || "30 Days Left",
      progress: 10,
      status: "In Progress",
      team: ["SJ", "MV"],
    };

    setProjects([newPrj, ...projects]);
    setNewTitle("");
    setNewClient("");
    setNewBudget("");
    setNewDeadline("");
    setIsOpen(false);
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const projectColumns: ColumnDef<ProjectItem>[] = [
    {
      header: "Project ID & Title",
      className: "p-4 font-semibold pl-6",
      render: (prj) => (
        <>
          <span className="text-xs font-mono text-muted-foreground block">{prj.id}</span>
          {prj.title}
        </>
      ),
    },
    {
      header: "Client",
      accessorKey: "client",
      className: "p-4 text-muted-foreground text-xs",
    },
    {
      header: "Category",
      className: "p-4 text-xs",
      render: (prj) => <Badge variant="outline">{prj.category}</Badge>,
    },
    {
      header: "Budget",
      accessorKey: "budget",
      className: "p-4 font-bold",
    },
    {
      header: "Deadline",
      accessorKey: "deadline",
      className: "p-4 text-xs text-muted-foreground",
    },
    {
      header: "Progress",
      className: "p-4 w-36",
      render: (prj) => (
        <div className="space-y-1">
          <span className="text-[10px] font-bold block">{prj.progress}%</span>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${prj.progress}%` }}></div>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      className: "p-4",
      render: (prj) => getStatusBadge(prj.status),
    },
    {
      header: "Action",
      className: "p-4 text-right pr-6",
      render: (prj) => (
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" size="icon-sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          } />
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> Details</DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-rose-600" onClick={() => deleteProject(prj.id)}>
              <Trash2 className="h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const getStatusBadge = (status: ProjectItem["status"]) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-none">Completed</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none">In Progress</Badge>;
      case "Delayed":
        return <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-none">Delayed</Badge>;
      default:
        return <Badge variant="outline" className="text-muted-foreground">Planning</Badge>;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-[1600px] mx-auto w-full bg-slate-50/50 dark:bg-slate-950/20">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Workspace</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Projects</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-2xl font-bold tracking-tight mt-2">Projects Management</h2>
        </div>

        {/* Create Project Modal */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger render={
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20">
              <Plus className="h-4 w-4" /> Create Project
            </Button>
          } />
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateProject} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="prj-title">Project Name</Label>
                <Input 
                  id="prj-title" 
                  placeholder="e.g. AI Workflow Optimization" 
                  value={newTitle} 
                  onChange={e => setNewTitle(e.target.value)} 
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prj-client">Client / Sponsor</Label>
                  <Input 
                    id="prj-client" 
                    placeholder="Apex Enterprise" 
                    value={newClient} 
                    onChange={e => setNewClient(e.target.value)} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prj-category">Category</Label>
                  <Input 
                    id="prj-category" 
                    placeholder="UI/UX, Backend, etc." 
                    value={newCategory} 
                    onChange={e => setNewCategory(e.target.value)} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prj-budget">Total Budget ($)</Label>
                  <Input 
                    id="prj-budget" 
                    placeholder="25000" 
                    value={newBudget} 
                    onChange={e => setNewBudget(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prj-deadline">Target Deadline</Label>
                  <Input 
                    id="prj-deadline" 
                    placeholder="Dec 15, 2026" 
                    value={newDeadline} 
                    onChange={e => setNewDeadline(e.target.value)} 
                  />
                </div>
              </div>

              <DialogFooter className="pt-4">
                <DialogClose render={<Button type="button" variant="ghost">Cancel</Button>} />
                <Button type="submit" disabled={!newTitle.trim() || !newClient.trim()}>
                  Save Project
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm border border-border/60">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Total Projects</p>
              <h3 className="text-2xl font-bold tracking-tight mt-1">{projects.length}</h3>
              <p className="text-xs text-muted-foreground mt-1">Across all workspace clients</p>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
              <Briefcase className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-border/60">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Active In Progress</p>
              <h3 className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400 mt-1">
                {projects.filter(p => p.status === "In Progress").length}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">Active sprint milestones</p>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
              <Clock className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-border/60">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Completed</p>
              <h3 className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 mt-1">
                {projects.filter(p => p.status === "Completed").length}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">Delivered successfully</p>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <CheckCircle2 className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-border/60">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Delayed / Blocked</p>
              <h3 className="text-2xl font-bold tracking-tight text-rose-600 dark:text-rose-400 mt-1">
                {projects.filter(p => p.status === "Delayed").length}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">Needs team escalation</p>
            </div>
            <div className="p-3 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl">
              <AlertCircle className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls Bar: Search, Status Tabs, View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-4 rounded-xl border border-border/60 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search projects by title, client, category..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-muted/60 p-1 rounded-xl text-xs font-medium">
            {["All", "In Progress", "Completed", "Delayed", "Planning"].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  statusFilter === status 
                    ? "bg-background text-foreground shadow-xs font-semibold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex bg-muted/60 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground"}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-all ${viewMode === "table" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground"}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((prj) => (
            <Card key={prj.id} className="shadow-sm border border-border/60 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] uppercase font-semibold">{prj.category}</Badge>
                    {getStatusBadge(prj.status)}
                  </div>
                  <CardTitle className="text-base font-bold pt-1">{prj.title}</CardTitle>
                  <CardDescription>{prj.client}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger render={
                    <Button variant="ghost" size="icon-sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  } />
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> View Details</DropdownMenuItem>
                    <DropdownMenuItem className="gap-2"><Pencil className="h-4 w-4" /> Edit Project</DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-rose-600" onClick={() => deleteProject(prj.id)}>
                      <Trash2 className="h-4 w-4" /> Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">Completion Progress</span>
                    <span className="text-foreground">{prj.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${prj.status === "Completed" ? "bg-emerald-500" : prj.status === "Delayed" ? "bg-rose-500" : "bg-blue-600"}`} 
                      style={{ width: `${prj.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs text-muted-foreground">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-semibold block">Budget</span>
                    <span className="font-bold text-foreground text-sm">{prj.budget}</span>
                  </div>
                  <div className="space-y-0.5 text-right">
                    <span className="text-[10px] uppercase font-semibold block">Deadline</span>
                    <span>{prj.deadline}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex -space-x-2">
                    {prj.team.map((mem, i) => (
                      <Avatar key={i} className="h-6 w-6 border-2 border-background">
                        <AvatarFallback className="text-[9px] bg-primary/10 text-primary font-semibold">{mem}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs text-blue-600 gap-1 p-0 h-auto font-semibold hover:text-blue-700">
                    Open Workspace <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Table View */
        <Card className="shadow-sm border border-border/60">
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
