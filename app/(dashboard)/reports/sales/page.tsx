"use client";

import * as React from "react";
import { 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  MoreVertical, 
  Users, 
  Target, 
  Briefcase, 
  Eye, 
  Pencil, 
  Trash2,
  ArrowDownToLine,
  CheckCircle2,
  Layers,
  Clock,
  ChevronRight,
  Sparkles
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
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from "recharts";
import { AnimatedNumber } from "@/components/core/animated-number";
import { toast } from "sonner";

// ─── DATA & TYPES ─────────────────────────────────────────────────────────────

interface SalesKPI {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  comparison: string;
  isPositive: boolean;
  benchmark: string;
}

const SALES_KPIS: SalesKPI[] = [
  {
    label: "Closed Revenue",
    value: 382450,
    prefix: "$",
    comparison: "+18.4% vs last quarter",
    isPositive: true,
    benchmark: "Target: $350K",
  },
  {
    label: "Active Pipeline",
    value: 1240000,
    prefix: "$",
    comparison: "+24.2% vs last cycle",
    isPositive: true,
    benchmark: "3.2x quota coverage",
  },
  {
    label: "Deal Win Rate",
    value: 28,
    suffix: ".6%",
    comparison: "+3.2% vs baseline",
    isPositive: true,
    benchmark: "Cohort avg: 22%",
  },
  {
    label: "Avg Contract Value",
    value: 48500,
    prefix: "$",
    comparison: "+12.1% vs Q3 cohort",
    isPositive: true,
    benchmark: "Enterprise tier",
  },
];

interface MonthlyRevenuePoint {
  month: string;
  revenue: number;
  pipeline: number;
}

const REVENUE_TREND_DATA: MonthlyRevenuePoint[] = [
  { month: "Jan", revenue: 185, pipeline: 240 },
  { month: "Feb", revenue: 210, pipeline: 270 },
  { month: "Mar", revenue: 245, pipeline: 310 },
  { month: "Apr", revenue: 228, pipeline: 300 },
  { month: "May", revenue: 275, pipeline: 360 },
  { month: "Jun", revenue: 315, pipeline: 410 },
  { month: "Jul", revenue: 295, pipeline: 380 },
  { month: "Aug", revenue: 340, pipeline: 440 },
  { month: "Sep", revenue: 325, pipeline: 420 },
  { month: "Oct", revenue: 382, pipeline: 490 },
];

interface EnterpriseDeal {
  id: string;
  contactName: string;
  company: string;
  amount: string;
  stageName: string;
  stageProgress: number;
  status: "Closing" | "Proposal" | "Contracting" | "Discovery";
  ownerName: string;
  ownerAvatar: string;
}

const ENTERPRISE_DEALS: EnterpriseDeal[] = [
  {
    id: "DL-301",
    contactName: "Jonathan Sterling",
    company: "Vanguard Capital",
    amount: "$68,000",
    stageName: "Executive Sign-Off",
    stageProgress: 95,
    status: "Closing",
    ownerName: "Sarah Jenkins",
    ownerAvatar: "SJ",
  },
  {
    id: "DL-302",
    contactName: "Alexandra Wright",
    company: "InnoTech Solutions",
    amount: "$52,400",
    stageName: "Contract Review",
    stageProgress: 85,
    status: "Contracting",
    ownerName: "Alex Morgan",
    ownerAvatar: "AM",
  },
  {
    id: "DL-303",
    contactName: "Marcus Brody",
    company: "Global Logistics Corp",
    amount: "$42,100",
    stageName: "Commercial Proposal",
    stageProgress: 60,
    status: "Proposal",
    ownerName: "Michael Vance",
    ownerAvatar: "MV",
  },
  {
    id: "DL-304",
    contactName: "Elena Rostova",
    company: "CyberShield Security",
    amount: "$38,500",
    stageName: "Technical Discovery",
    stageProgress: 40,
    status: "Discovery",
    ownerName: "Elena Rostova",
    ownerAvatar: "ER",
  },
  {
    id: "DL-305",
    contactName: "Sophia Chen",
    company: "BioHealth Diagnostics",
    amount: "$29,800",
    stageName: "Security Validation",
    stageProgress: 75,
    status: "Contracting",
    ownerName: "David Ray",
    ownerAvatar: "DR",
  },
  {
    id: "DL-306",
    contactName: "Robert Taylor",
    company: "OmniData Mesh",
    amount: "$45,000",
    stageName: "Commercial Review",
    stageProgress: 90,
    status: "Closing",
    ownerName: "Sarah Jenkins",
    ownerAvatar: "SJ",
  },
];

interface QuotaProgressItem {
  team: string;
  achieved: string;
  target: string;
  percent: number;
  reps: string;
}

const QUOTA_PROGRESS: QuotaProgressItem[] = [
  { team: "Enterprise North America", achieved: "$248K", target: "$260K", percent: 95, reps: "8 Reps" },
  { team: "Strategic Accounts EMEA", achieved: "$182K", target: "$210K", percent: 86, reps: "6 Reps" },
  { team: "Mid-Market Growth", achieved: "$94K", target: "$110K", percent: 85, reps: "5 Reps" },
];

const REVENUE_CHANNELS = [
  { name: "Direct Enterprise", share: 62, value: "$237,100", change: "+14%" },
  { name: "Strategic Partners", share: 24, value: "$91,800", change: "+22%" },
  { name: "Self-Serve Expansion", share: 14, value: "$53,550", change: "+8%" },
];

// ─── RECHARTS TOOLTIP ────────────────────────────────────────────────────────

function CustomSalesTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border/80 bg-popover px-3 py-2 text-xs shadow-md">
        <p className="font-semibold text-foreground mb-1 font-heading">{label} 2026</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="size-2 rounded-xs" style={{ backgroundColor: entry.stroke || entry.color }} />
                {entry.name}
              </span>
              <span className="font-mono font-medium text-foreground tabular-nums">
                ${entry.value}K USD
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

export default function SalesReportPage() {
  const [selectedRange, setSelectedRange] = React.useState<"Q4" | "YTD">("Q4");

  const dealsTableColumns: ColumnDef<EnterpriseDeal>[] = [
    {
      header: "Deal ID",
      accessorKey: "id",
      className: "w-24 pl-6 font-mono text-xs text-muted-foreground",
    },
    {
      header: "Contact & Enterprise",
      accessorKey: "contactName",
      className: "min-w-[220px]",
      render: (deal) => (
        <div className="space-y-0.5">
          <p className="text-xs font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
            {deal.contactName}
          </p>
          <p className="text-[11px] text-muted-foreground font-mono">{deal.company}</p>
        </div>
      ),
    },
    {
      header: "Contract Value",
      accessorKey: "amount",
      className: "font-mono text-xs font-semibold tabular-nums text-foreground",
    },
    {
      header: "Pipeline Stage",
      accessorKey: "stageName",
      className: "min-w-[150px]",
      render: (deal) => (
        <div className="space-y-1 pr-4">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-muted-foreground truncate">{deal.stageName}</span>
            <span className="font-medium text-foreground tabular-nums">{deal.stageProgress}%</span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${deal.stageProgress}%` }} 
            />
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      className: "w-28",
      render: (deal) => {
        const variants = {
          Closing: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
          Contracting: "bg-primary/10 text-primary border-primary/20",
          Proposal: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
          Discovery: "bg-muted text-muted-foreground border-border/80",
        };
        return (
          <Badge variant="outline" className={`text-[10px] font-mono font-medium px-2 py-0.5 ${variants[deal.status]}`}>
            {deal.status}
          </Badge>
        );
      },
    },
    {
      header: "Owner",
      accessorKey: "ownerName",
      className: "w-32",
      render: (deal) => (
        <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
          <Avatar className="size-4.5 border border-border/80">
            <AvatarFallback className="text-[9px] bg-muted text-foreground font-mono">
              {deal.ownerAvatar}
            </AvatarFallback>
          </Avatar>
          <span className="truncate">{deal.ownerName}</span>
        </div>
      ),
    },
    {
      header: "",
      id: "actions",
      className: "text-right pr-6 w-12",
      render: (deal) => (
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" size="icon-sm" className="size-7">
              <MoreVertical className="size-3.5 text-muted-foreground" />
            </Button>
          } />
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem 
              className="gap-2 text-xs cursor-pointer"
              onClick={() => toast.info(`Viewing deal ${deal.id} for ${deal.company}`)}
            >
              <Eye className="size-3.5 text-muted-foreground" /> View Audit
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="gap-2 text-xs cursor-pointer"
              onClick={() => toast.info(`Editing deal scope for ${deal.id}`)}
            >
              <Pencil className="size-3.5 text-muted-foreground" /> Edit Scope
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="gap-2 text-xs text-destructive focus:text-destructive cursor-pointer"
              onClick={() => toast.error(`Archived record ${deal.id}`)}
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
                <BreadcrumbPage className="text-xs font-mono">Sales Velocity</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground font-heading">
            Sales & Revenue Analytics
          </h1>
          <p className="text-xs text-muted-foreground">
            Pipeline velocity, closed enterprise revenue, and quota pacing across sales territories.
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
            onClick={() => toast.info("Filter parameters: Enterprise tiers, Closed & In-Flight deals")}
          >
            <Filter className="size-3.5 text-muted-foreground" /> Filter
          </Button>
          <Button 
            size="sm" 
            className="h-8 gap-1.5 text-xs bg-primary text-primary-foreground hover:bg-primary/90 font-mono shadow-2xs"
            onClick={() => toast.success("Exporting sales ledger summary (PDF/CSV)...")}
          >
            <ArrowDownToLine className="size-3.5" /> Export Ledger
          </Button>
        </div>
      </div>

      {/* ─── 2. EXECUTIVE METRICS STRIP ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SALES_KPIS.map((kpi, idx) => (
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

      {/* ─── 3. REVENUE TRAJECTORY & QUOTA ATTAINMENT ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Area Chart (8-col) */}
        <Card className="lg:col-span-8 border-border/80 bg-card shadow-2xs">
          <CardHeader className="pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60">
            <div>
              <CardTitle className="text-sm font-semibold font-heading text-foreground">
                Revenue Trajectory & Forecast ($k)
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Monthly actual closed revenue compared against weighted pipeline trajectory.
              </CardDescription>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-foreground font-medium">
                <span className="size-2 rounded-xs bg-primary" />
                Closed ARR
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="size-2 rounded-xs bg-muted-foreground/50 border border-muted-foreground/60" />
                Pipeline Pace
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={REVENUE_TREND_DATA} 
                  margin={{ top: 12, right: 12, left: -15, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.22} />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="pipelineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--muted-foreground)" stopOpacity={0.12} />
                      <stop offset="100%" stopColor="var(--muted-foreground)" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
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
                    tickFormatter={(val) => `$${val}k`}
                    className="text-xs font-mono fill-muted-foreground" 
                  />
                  <Tooltip content={<CustomSalesTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="pipeline" 
                    stroke="var(--muted-foreground)" 
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fill="url(#pipelineGrad)" 
                    name="Pipeline Pace" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="var(--primary)" 
                    strokeWidth={2.5}
                    fill="url(#revenueGrad)" 
                    name="Closed Revenue" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Clean Summary Footer */}
            <div className="grid grid-cols-3 gap-2 pt-4 mt-2 border-t border-border/60 text-center">
              <div>
                <p className="text-[11px] text-muted-foreground font-mono">Annualized Run Rate</p>
                <p className="text-sm font-semibold font-mono text-foreground tabular-nums">$1.48M ARR</p>
              </div>
              <div className="border-x border-border/60">
                <p className="text-[11px] text-muted-foreground font-mono">Q4 Quota Pacing</p>
                <p className="text-sm font-semibold font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">104.2%</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-mono">Avg Sales Velocity</p>
                <p className="text-sm font-semibold font-mono text-foreground tabular-nums">24.5 Days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Territory Quota Progress (4-col) */}
        <Card className="lg:col-span-4 border-border/80 bg-card shadow-2xs flex flex-col justify-between">
          <div>
            <CardHeader className="pb-3 border-b border-border/60">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold font-heading text-foreground">
                    Quarterly Quota Attainment
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Territory progress toward Q4 revenue goals.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground">
                  Week 41
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-5">
              {QUOTA_PROGRESS.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-medium text-foreground">{item.team}</span>
                    <span className="text-muted-foreground tabular-nums">{item.achieved} / {item.target}</span>
                  </div>
                  <div className="h-2 w-full bg-muted/60 rounded-full overflow-hidden border border-border/40">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span>{item.reps}</span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400 tabular-nums">
                      {item.percent}% Attained
                    </span>
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
              onClick={() => toast.info("Opening territory performance breakdown")}
            >
              View Regional Breakdown
            </Button>
          </div>
        </Card>
      </div>

      {/* ─── 4. REVENUE BY CHANNEL & ENTERPRISE DEALS ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Enterprise Deals Ledger (8-col) */}
        <Card className="lg:col-span-8 border-border/80 bg-card shadow-2xs">
          <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold font-heading text-foreground">
                Enterprise Deals Ledger
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                In-flight high-value accounts, contract progression stages, and allocated deal owners.
              </CardDescription>
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              6 Active Accounts
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={dealsTableColumns}
              data={ENTERPRISE_DEALS}
              className="border-none shadow-none bg-transparent"
              hidePagination
            />
          </CardContent>
        </Card>

        {/* Channel Distribution & Retention (4-col) */}
        <Card className="lg:col-span-4 border-border/80 bg-card shadow-2xs flex flex-col justify-between">
          <div>
            <CardHeader className="pb-3 border-b border-border/60">
              <CardTitle className="text-sm font-semibold font-heading text-foreground">
                Revenue by Segment
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Contribution share by go-to-market channel.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              {REVENUE_CHANNELS.map((ch, idx) => (
                <div key={idx} className="space-y-1.5 p-3 rounded-lg border border-border/60 bg-muted/15">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-medium text-foreground">{ch.name}</span>
                    <span className="font-semibold text-foreground tabular-nums">{ch.value}</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${ch.share}%` }} 
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span>{ch.share}% of Total ARR</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium">{ch.change} YoY</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </div>

          <div className="p-4 pt-0 border-t border-border/60 mt-2">
            <div className="flex items-center justify-between text-xs font-mono pt-3">
              <span className="text-muted-foreground">Net Revenue Retention:</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 tabular-nums">118.4% NRR</span>
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
}
