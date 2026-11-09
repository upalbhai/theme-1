"use client";

import * as React from "react";
import { 
  Filter, 
  Clock, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  AlertCircle, 
  MoreVertical, 
  Users, 
  Briefcase,
  TrendingUp,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
  ArrowDownToLine,
  Layers,
  Sparkles,
  ArrowUpRight,
  Check,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from "recharts";
import { AnimatedNumber } from "@/components/core/animated-number";
import { toast } from "sonner";

// ─── TYPES & DATA ─────────────────────────────────────────────────────────────

interface ProjectKPI {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  comparison: string;
  isPositive: boolean;
  benchmark: string;
}

const KPIS: ProjectKPI[] = [
  {
    label: "Active Deliverables",
    value: 14,
    suffix: " Projects",
    comparison: "+3 vs last quarter",
    isPositive: true,
    benchmark: "98% client commit",
  },
  {
    label: "Milestone Clearance",
    value: 92,
    suffix: "%",
    comparison: "+4.2% vs Q3 target",
    isPositive: true,
    benchmark: "Target: ≥ 90%",
  },
  {
    label: "Committed Budget",
    value: 348500,
    prefix: "$",
    comparison: "+12.8% vs last cycle",
    isPositive: true,
    benchmark: "82% total burn",
  },
  {
    label: "Weekly Velocity",
    value: 84,
    suffix: ".2h",
    comparison: "-1.5h unbillable",
    isPositive: true,
    benchmark: "91.2% billable ratio",
  },
];

interface MonthlyDeliveryPoint {
  month: string;
  completed: number;
  ongoing: number;
}

const MONTHLY_DELIVERY_DATA: MonthlyDeliveryPoint[] = [
  { month: "Mar", completed: 18, ongoing: 22 },
  { month: "Apr", completed: 21, ongoing: 24 },
  { month: "May", completed: 26, ongoing: 27 },
  { month: "Jun", completed: 32, ongoing: 29 },
  { month: "Jul", completed: 30, ongoing: 26 },
  { month: "Aug", completed: 36, ongoing: 30 },
  { month: "Sep", completed: 34, ongoing: 25 },
  { month: "Oct", completed: 39, ongoing: 21 },
];

interface MilestoneEvent {
  id: string;
  code: string;
  title: string;
  client: string;
  dueDate: string;
  relativeTime: string;
  ownerName: string;
  ownerAvatar: string;
  status: "Due Soon" | "In Review" | "Scheduled" | "Completed";
}

const UPCOMING_MILESTONES: MilestoneEvent[] = [
  {
    id: "m-1",
    code: "PRJ-101",
    title: "Core Architecture Sign-Off",
    client: "Apex Enterprise",
    dueDate: "Oct 14, 2026",
    relativeTime: "In 2 days",
    ownerName: "Sarah Jenkins",
    ownerAvatar: "SJ",
    status: "Due Soon",
  },
  {
    id: "m-2",
    code: "PRJ-104",
    title: "Multi-Tenant Stripe Billing Sync",
    client: "Nova Financial",
    dueDate: "Oct 19, 2026",
    relativeTime: "Next week",
    ownerName: "Michael Vance",
    ownerAvatar: "MV",
    status: "In Review",
  },
  {
    id: "m-3",
    code: "PRJ-102",
    title: "SOC 2 Type II Directory Audit",
    client: "SecureNet",
    dueDate: "Oct 26, 2026",
    relativeTime: "Oct 26",
    ownerName: "Emma Watson",
    ownerAvatar: "EW",
    status: "Scheduled",
  },
  {
    id: "m-4",
    code: "PRJ-105",
    title: "Terraform Infrastructure Cleared",
    client: "CloudScale Systems",
    dueDate: "Nov 02, 2026",
    relativeTime: "Nov 02",
    ownerName: "David Ray",
    ownerAvatar: "DR",
    status: "Scheduled",
  },
];

interface WeeklyHourPoint {
  day: string;
  billable: number;
  unbillable: number;
}

const WEEKLY_HOURS_DATA: WeeklyHourPoint[] = [
  { day: "Mon", billable: 8.0, unbillable: 1.0 },
  { day: "Tue", billable: 7.5, unbillable: 1.5 },
  { day: "Wed", billable: 8.5, unbillable: 0.5 },
  { day: "Thu", billable: 8.0, unbillable: 1.0 },
  { day: "Fri", billable: 7.0, unbillable: 1.0 },
];

interface TeamContributor {
  name: string;
  role: string;
  tasksCompleted: string;
  progressPercent: number;
  avatar: string;
}

const TEAM_CONTRIBUTORS: TeamContributor[] = [
  { name: "Sarah Jenkins", role: "Design Systems Lead", tasksCompleted: "28/32", progressPercent: 88, avatar: "SJ" },
  { name: "Michael Vance", role: "Principal Frontend", tasksCompleted: "45/49", progressPercent: 92, avatar: "MV" },
  { name: "Emma Watson", role: "Platform Engineer", tasksCompleted: "22/30", progressPercent: 73, avatar: "EW" },
  { name: "David Ray", role: "DevOps & SRE", tasksCompleted: "18/22", progressPercent: 82, avatar: "DR" },
];

interface ProjectRow {
  id: string;
  title: string;
  client: string;
  budget: string;
  stage: string;
  progress: number;
  status: "In Progress" | "In Review" | "Completed" | "Planning";
}

const PROJECTS_DIRECTORY: ProjectRow[] = [
  {
    id: "PRJ-101",
    title: "Apex CRM Design System Overhaul",
    client: "Apex Enterprise",
    budget: "$48,500",
    stage: "Frontend Architecture",
    progress: 88,
    status: "In Progress",
  },
  {
    id: "PRJ-102",
    title: "Enterprise SSO & Directory Sync",
    client: "SecureNet Systems",
    budget: "$32,000",
    stage: "Security Compliance",
    progress: 94,
    status: "In Review",
  },
  {
    id: "PRJ-103",
    title: "Distributed Streaming Analytics",
    client: "DataStream Global",
    budget: "$65,000",
    stage: "Database Indexing",
    progress: 62,
    status: "In Progress",
  },
  {
    id: "PRJ-104",
    title: "Multi-Tenant Stripe Connect Engine",
    client: "Nova Financial",
    budget: "$41,200",
    stage: "Billing Orchestration",
    progress: 100,
    status: "Completed",
  },
  {
    id: "PRJ-105",
    title: "Cloud Infrastructure Automation",
    client: "CloudScale Systems",
    budget: "$28,000",
    stage: "Terraform Modules",
    progress: 75,
    status: "In Progress",
  },
  {
    id: "PRJ-106",
    title: "Real-time Telemetry Pipeline",
    client: "OmniPulse Media",
    budget: "$19,500",
    stage: "Architecture Draft",
    progress: 35,
    status: "Planning",
  },
];

// ─── RECHARTS TOOLTIP ────────────────────────────────────────────────────────

function CustomDeliveryTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border/80 bg-popover px-3 py-2 text-xs shadow-md">
        <p className="font-semibold text-foreground mb-1 font-heading">{label} 2026</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="size-2 rounded-xs" style={{ backgroundColor: entry.color }} />
                {entry.name}
              </span>
              <span className="font-mono font-medium text-foreground tabular-nums">
                {entry.value} Deliverables
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

function CustomHoursTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border/80 bg-popover px-3 py-2 text-xs shadow-md">
        <p className="font-semibold text-foreground mb-1 font-heading">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="size-2 rounded-xs" style={{ backgroundColor: entry.color }} />
                {entry.name}
              </span>
              <span className="font-mono font-medium text-foreground tabular-nums">
                {entry.value}h
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function ProjectReportPage() {
  const [selectedRange, setSelectedRange] = React.useState<"Q4" | "YTD">("Q4");

  const projectTableColumns: ColumnDef<ProjectRow>[] = [
    {
      header: "Code",
      accessorKey: "id",
      className: "w-28 pl-6 font-mono text-xs text-muted-foreground",
    },
    {
      header: "Project Title",
      accessorKey: "title",
      className: "min-w-[240px]",
      render: (row) => (
        <div className="space-y-0.5">
          <p className="text-xs font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
            {row.title}
          </p>
          <p className="text-[11px] text-muted-foreground font-mono">{row.client}</p>
        </div>
      ),
    },
    {
      header: "Stage",
      accessorKey: "stage",
      className: "text-xs text-muted-foreground hidden md:table-cell",
    },
    {
      header: "Milestone",
      accessorKey: "progress",
      className: "min-w-[140px]",
      render: (row) => (
        <div className="space-y-1.5 pr-4">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-muted-foreground">Burnup</span>
            <span className="font-medium text-foreground tabular-nums">{row.progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${row.progress}%` }} 
            />
          </div>
        </div>
      ),
    },
    {
      header: "Budget",
      accessorKey: "budget",
      className: "font-mono text-xs text-right tabular-nums pr-6",
    },
    {
      header: "Status",
      accessorKey: "status",
      className: "w-28",
      render: (row) => {
        const variants = {
          Completed: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
          "In Progress": "bg-primary/10 text-primary border-primary/20",
          "In Review": "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
          Planning: "bg-muted text-muted-foreground border-border/80",
        };
        return (
          <Badge variant="outline" className={`text-[10px] font-mono font-medium px-2 py-0.5 ${variants[row.status]}`}>
            {row.status}
          </Badge>
        );
      },
    },
    {
      header: "",
      id: "actions",
      className: "text-right pr-6 w-12",
      render: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" size="icon-sm" className="size-7">
              <MoreVertical className="size-3.5 text-muted-foreground" />
            </Button>
          } />
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem 
              className="gap-2 text-xs cursor-pointer"
              onClick={() => toast.info(`Viewing ${row.id}: ${row.title}`)}
            >
              <Eye className="size-3.5 text-muted-foreground" /> View Audit
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="gap-2 text-xs cursor-pointer"
              onClick={() => toast.info(`Editing scope for ${row.id}`)}
            >
              <Pencil className="size-3.5 text-muted-foreground" /> Edit Scope
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="gap-2 text-xs text-destructive focus:text-destructive cursor-pointer"
              onClick={() => toast.error(`Archived deliverable ${row.id}`)}
            >
              <Trash2 className="size-3.5" /> Archive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 max-w-7xl mx-auto w-full">
      
      {/* ─── 1. TOP HEADER & BREADCRUMB ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div className="space-y-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard" className="text-xs">Executive Reports</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xs font-mono">Project Delivery</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground font-heading">
            Project Delivery & Milestones
          </h1>
          <p className="text-xs text-muted-foreground">
            Production cycle health, milestone clearance rates, and resource utilization across client deliverables.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border/80 bg-muted/40 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => {
                setSelectedRange("Q4");
                toast.success("Period set to Q4 2026");
              }}
              className={`rounded-md px-2.5 py-1 font-mono transition-colors ${
                selectedRange === "Q4"
                  ? "bg-card text-foreground font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Q4 2026
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedRange("YTD");
                toast.success("Period set to YTD 2026");
              }}
              className={`rounded-md px-2.5 py-1 font-mono transition-colors ${
                selectedRange === "YTD"
                  ? "bg-card text-foreground font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              YTD 2026
            </button>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 gap-1.5 text-xs border-border/80 font-mono"
            onClick={() => toast.info("Filter parameters: All client tiers, Active deliverables")}
          >
            <Filter className="size-3.5 text-muted-foreground" /> Filter
          </Button>
          <Button 
            size="sm" 
            className="h-8 gap-1.5 text-xs bg-primary text-primary-foreground hover:bg-primary/90 font-mono shadow-2xs"
            onClick={() => toast.success("Exporting project delivery summary (PDF/CSV)...")}
          >
            <ArrowDownToLine className="size-3.5" /> Export Report
          </Button>
        </div>
      </div>

      {/* ─── 2. EXECUTIVE METRICS STRIP ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((kpi, idx) => (
          <Card key={idx} className="border-border/80 bg-card shadow-2xs">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium">{kpi.label}</span>
                <span className="font-mono text-[10px] text-muted-foreground/80">{kpi.benchmark}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-2xl font-semibold tracking-tight text-foreground tabular-nums">
                  {kpi.prefix}
                  <AnimatedNumber value={kpi.value} />
                  {kpi.suffix}
                </span>
              </div>
              <div className="flex items-center gap-1.5 pt-1 text-[11px] text-muted-foreground font-mono">
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                  {kpi.comparison}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ─── 3. DELIVERY TRENDS & UPCOMING MILESTONES ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Chart (8-col) */}
        <Card className="lg:col-span-8 border-border/80 bg-card shadow-2xs">
          <CardHeader className="pb-2 flex flex-row items-center justify-between border-b border-border/60">
            <div>
              <CardTitle className="text-sm font-semibold font-heading text-foreground">
                Milestone Clearance & In-Flight Work
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Monthly verified deliverables completed versus ongoing development sprints.
              </CardDescription>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="size-2 rounded-xs bg-primary" />
                Completed
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="size-2 rounded-xs bg-muted-foreground/40" />
                Ongoing
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={MONTHLY_DELIVERY_DATA} 
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  barGap={4}
                >
                  <CartesianGrid 
                    strokeDasharray="2 2" 
                    vertical={false} 
                    stroke="var(--border)"
                    opacity={0.5}
                  />
                  <XAxis 
                    dataKey="month" 
                    tickLine={false} 
                    axisLine={false} 
                    className="text-xs font-mono fill-muted-foreground" 
                  />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false} 
                    className="text-xs font-mono fill-muted-foreground" 
                  />
                  <Tooltip content={<CustomDeliveryTooltip />} />
                  <Bar 
                    dataKey="completed" 
                    fill="var(--primary)" 
                    radius={[3, 3, 0, 0]} 
                    name="Completed" 
                  />
                  <Bar 
                    dataKey="ongoing" 
                    fill="var(--muted-foreground)" 
                    fillOpacity={0.35}
                    radius={[3, 3, 0, 0]} 
                    name="Ongoing" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Quiet Summary Footer */}
            <div className="grid grid-cols-3 gap-2 pt-4 mt-2 border-t border-border/60 text-center">
              <div>
                <p className="text-[11px] text-muted-foreground font-mono">Delivered Milestones</p>
                <p className="text-sm font-semibold font-mono text-foreground tabular-nums">245 YTD</p>
              </div>
              <div className="border-x border-border/60">
                <p className="text-[11px] text-muted-foreground font-mono">Avg Cycle Duration</p>
                <p className="text-sm font-semibold font-mono text-foreground tabular-nums">16.8 Days</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-mono">Delivery Variance</p>
                <p className="text-sm font-semibold font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">-2.4% vs SLA</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Milestones Schedule (4-col) */}
        <Card className="lg:col-span-4 border-border/80 bg-card shadow-2xs flex flex-col justify-between">
          <div>
            <CardHeader className="pb-3 border-b border-border/60">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold font-heading text-foreground">
                    Upcoming Milestones
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Scheduled client demos and release gates.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground">
                  Next 14d
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3.5">
              {UPCOMING_MILESTONES.map((item) => (
                <div 
                  key={item.id} 
                  className="p-3 rounded-lg border border-border/70 bg-muted/20 hover:bg-muted/40 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-semibold text-primary">
                      {item.code}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={`text-[10px] font-mono font-medium px-1.5 py-0 ${
                        item.status === "Due Soon"
                          ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
                          : item.status === "In Review"
                          ? "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
                          : "bg-muted text-muted-foreground border-border/80"
                      }`}
                    >
                      {item.relativeTime}
                    </Badge>
                  </div>
                  <p className="text-xs font-medium text-foreground leading-snug line-clamp-1">
                    {item.title}
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-muted-foreground border-t border-border/40 font-mono">
                    <span className="truncate max-w-[150px]">{item.client}</span>
                    <div className="flex items-center gap-1.5">
                      <Avatar className="size-4.5 border border-border/80">
                        <AvatarFallback className="text-[9px] bg-muted text-foreground font-mono">
                          {item.ownerAvatar}
                        </AvatarFallback>
                      </Avatar>
                      <span>{item.dueDate.split(",")[0]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </div>
          <div className="p-4 pt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs font-mono border-border/80"
              onClick={() => toast.info("Opening full calendar schedule")}
            >
              View Full Release Schedule
            </Button>
          </div>
        </Card>
      </div>

      {/* ─── 4. PROJECT DIRECTORY & RESOURCE UTILIZATION ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Project Directory Table (8-col) */}
        <Card className="lg:col-span-8 border-border/80 bg-card shadow-2xs">
          <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold font-heading text-foreground">
                Active Deliverables Directory
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Tracked pipeline status, engineering stage, and committed project value.
              </CardDescription>
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              6 Active Accounts
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={projectTableColumns}
              data={PROJECTS_DIRECTORY}
              className="border-none shadow-none bg-transparent"
              hidePagination
            />
          </CardContent>
        </Card>

        {/* Engineering Resource Utilization (4-col) */}
        <Card className="lg:col-span-4 border-border/80 bg-card shadow-2xs">
          <CardHeader className="pb-3 border-b border-border/60">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold font-heading text-foreground">
                  Engineering Utilization
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Billable allocation and sprint throughput.
                </CardDescription>
              </div>
              <Clock className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="p-5 space-y-5">
            {/* Split Metrics */}
            <div className="grid grid-cols-2 gap-2 text-center p-3 bg-muted/30 rounded-lg border border-border/70">
              <div>
                <p className="text-[11px] text-muted-foreground font-mono">Billable Hours</p>
                <p className="text-lg font-semibold font-mono text-foreground tabular-nums">38.0h</p>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono">91.2% ratio</span>
              </div>
              <div className="border-l border-border/60">
                <p className="text-[11px] text-muted-foreground font-mono">Internal Ops</p>
                <p className="text-lg font-semibold font-mono text-muted-foreground tabular-nums">4.5h</p>
                <span className="text-[10px] text-muted-foreground font-mono">8.8% ratio</span>
              </div>
            </div>

            {/* Daily Hours Chart */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                <span>Daily Logged Hours</span>
                <span>Mon – Fri</span>
              </div>
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={WEEKLY_HOURS_DATA} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                    <XAxis dataKey="day" tickLine={false} axisLine={false} className="text-[10px] font-mono fill-muted-foreground" />
                    <YAxis tickLine={false} axisLine={false} className="text-[10px] font-mono fill-muted-foreground" />
                    <Tooltip content={<CustomHoursTooltip />} />
                    <Bar dataKey="billable" fill="var(--primary)" radius={[2, 2, 0, 0]} name="Billable" />
                    <Bar dataKey="unbillable" fill="var(--muted-foreground)" fillOpacity={0.35} radius={[2, 2, 0, 0]} name="Internal" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Contributor Roster */}
            <div className="space-y-3 pt-3 border-t border-border/60">
              <p className="text-xs font-semibold text-foreground font-heading">
                Squad Leads & Milestone Clearances
              </p>
              <div className="space-y-2.5">
                {TEAM_CONTRIBUTORS.map((contributor, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-5 border border-border/80">
                          <AvatarFallback className="text-[9px] bg-muted text-foreground font-mono">
                            {contributor.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-medium text-foreground block leading-tight">{contributor.name}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">{contributor.role}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-medium text-muted-foreground tabular-nums">
                        {contributor.tasksCompleted}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary/80 rounded-full" 
                        style={{ width: `${contributor.progressPercent}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
