"use client";

import React from "react";
import { 
  Filter, 
  LayoutGrid, 
  Clock, 
  CheckSquare, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  User,
  CheckCircle2,
  AlertCircle,
  Eye,
  Pencil,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  PieChart,
  Pie,
  Cell
} from "recharts";

const timesheetKpis = [
  { title: "Regular Time Logged", value: "54H:35M", trend: "+56.67%", isPositive: true, subtext: "vs previous week" },
  { title: "Overtime Logged", value: "12H:40M", trend: "-23.49%", isPositive: false, subtext: "vs previous week" },
  { title: "Billable Hours", value: "35H:30M", trend: "+43.85%", isPositive: true, subtext: "72% utilization rate" },
  { title: "Unbillable Hours", value: "10H:25M", trend: "-20.46%", isPositive: false, subtext: "Internal meetings & admin" },
];

const dailyTimeLogged = [
  { day: "Mon", regular: 8, overtime: 1.5 },
  { day: "Tue", regular: 7.5, overtime: 2.0 },
  { day: "Wed", regular: 8.5, overtime: 1.0 },
  { day: "Thu", regular: 8.0, overtime: 2.5 },
  { day: "Fri", regular: 7.0, overtime: 0.5 },
  { day: "Sat", regular: 3.0, overtime: 1.0 },
  { day: "Sun", regular: 0, overtime: 0 },
];

const pieRatioData = [
  { name: "Billable Hours", value: 35.5, color: "#10b981" },
  { name: "Unbillable Hours", value: 10.4, color: "#f59e0b" },
  { name: "Overtime", value: 12.6, color: "#3b82f6" },
];

const timesheetsTrack = [
  { name: "Apex CRM Design", tasks: "12 Tasks", hours: "42H:15M", progress: 85 },
  { name: "Stripe Payment Gateway", tasks: "8 Tasks", hours: "28H:30M", progress: 60 },
  { name: "AWS Cloud Architecture", tasks: "15 Tasks", hours: "56H:00M", progress: 92 },
];

const tasksTrack = [
  { name: "Database Schema Migration", count: "4/5 Completed", progress: 80, badge: "High Priority" },
  { name: "OAuth2 Refresh Token Bug", count: "2/2 Completed", progress: 100, badge: "Resolved" },
  { name: "Responsive Header Fixes", count: "3/7 Completed", progress: 42, badge: "In Progress" },
];

const projectsTrack = [
  { name: "Mobile App V2 Release", status: "On Schedule", progress: 78, lead: "Sarah J." },
  { name: "Enterprise Customer Portal", status: "In QA Testing", progress: 95, lead: "Michael V." },
  { name: "AI Analytics Microservice", status: "Behind Schedule", progress: 35, lead: "David R." },
];

const detailedTimesheetTable = [
  { id: "TS-901", project: "Apex CRM Theme Overhaul", user: "Sarah Jenkins", avatar: "SJ", dateRange: "Oct 06 - Oct 12", hoursLogged: "38H:15M", status: "Approved", statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { id: "TS-902", project: "SaaS Enterprise Dashboard", user: "Michael Vance", avatar: "MV", dateRange: "Oct 06 - Oct 12", hoursLogged: "42H:00M", status: "Approved", statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { id: "TS-903", project: "Stripe Billing Integration", user: "Emma Watson", avatar: "EW", dateRange: "Oct 06 - Oct 12", hoursLogged: "29H:30M", status: "Pending Review", statusColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  { id: "TS-904", project: "DevOps Infrastructure Setup", user: "David Ray", avatar: "DR", dateRange: "Oct 06 - Oct 12", hoursLogged: "45H:45M", status: "Approved", statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { id: "TS-905", project: "UI Redesign & Testing", user: "Alexandra Wright", avatar: "AW", dateRange: "Oct 06 - Oct 12", hoursLogged: "18H:20M", status: "Draft", statusColor: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
];

interface TimesheetReportItem {
  id: string;
  project: string;
  user: string;
  avatar: string;
  dateRange: string;
  hoursLogged: string;
  status: string;
  statusColor: string;
}

const timesheetReportColumns: ColumnDef<TimesheetReportItem>[] = [
  {
    header: "Timesheet ID",
    accessorKey: "id",
    className: "font-mono text-xs font-semibold pl-6",
  },
  {
    header: "Team Member",
    render: (ts) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarFallback className="text-[10px] bg-primary/10 text-primary">{ts.avatar}</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-sm">{ts.user}</span>
      </div>
    ),
  },
  {
    header: "Project",
    accessorKey: "project",
    className: "text-xs text-muted-foreground",
  },
  {
    header: "Date Range",
    accessorKey: "dateRange",
    className: "text-xs",
  },
  {
    header: "Hours Logged",
    accessorKey: "hoursLogged",
    className: "font-bold text-sm text-blue-600 dark:text-blue-400",
  },
  {
    header: "Approval Status",
    render: (ts) => (
      <Badge className={`text-[11px] border-none font-medium px-2 py-0.5 ${ts.statusColor}`}>
        {ts.status}
      </Badge>
    ),
  },
  {
    header: "",
    id: "actions",
    className: "text-right pr-6",
    render: (ts) => (
      <DropdownMenu>
        <DropdownMenuTrigger render={
          <Button variant="ghost" size="icon-sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        } />
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> View Log</DropdownMenuItem>
          <DropdownMenuItem className="gap-2"><Pencil className="h-4 w-4" /> Approve</DropdownMenuItem>
          <DropdownMenuItem className="gap-2 text-rose-600"><Trash2 className="h-4 w-4" /> Reject</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function TimesheetsReportPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-[1600px] mx-auto w-full bg-slate-50/50 dark:bg-slate-950/20">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Reports</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Timesheets Report</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-2xl font-bold tracking-tight mt-2">Timesheets Report</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <LayoutGrid className="h-4 w-4" /> Add Widgets
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {timesheetKpis.map((kpi, idx) => (
          <Card key={idx} className="shadow-sm border border-border/60 hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-semibold uppercase tracking-wider">{kpi.title}</span>
                <Clock className="h-4 w-4" />
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <h3 className="text-2xl font-bold tracking-tight">{kpi.value}</h3>
                <Badge variant={kpi.isPositive ? "default" : "destructive"} className="gap-1 text-xs">
                  {kpi.isPositive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                  {kpi.trend}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground pt-1 border-t border-border/40">{kpi.subtext}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Section: Time Logged Breakdown & Billable Ratio Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Daily Time Logged Chart */}
        <Card className="lg:col-span-8 shadow-sm border border-border/60">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-lg font-bold">Daily Time Logged (Hours)</CardTitle>
              <CardDescription>Breakdown of regular vs. overtime hours across current week</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">Current Week</Badge>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyTimeLogged} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} className="text-xs text-muted-foreground" />
                  <YAxis tickLine={false} axisLine={false} className="text-xs text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '8px', border: 'none', color: '#fff' }} 
                    cursor={{ fill: 'var(--accent)' }}
                  />
                  <Bar dataKey="regular" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Regular Hours" />
                  <Bar dataKey="overtime" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Overtime Hours" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Billable Ratio Donut Chart */}
        <Card className="lg:col-span-4 shadow-sm border border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">Billable vs. Unbillable Ratio</CardTitle>
            <CardDescription>Logged time distribution category</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4 pt-2">
            <div className="h-[200px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieRatioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieRatioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full space-y-2 text-xs">
              {pieRatioData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value} hrs</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3 Tracks: Timesheets Track, Tasks Track, Projects Track */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Timesheets Track */}
        <Card className="shadow-sm border border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center justify-between">
              <span>Timesheets Track</span>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5">
            {timesheetsTrack.map((item, i) => (
              <div key={i} className="p-3 border border-border/60 rounded-xl space-y-2 bg-card">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold">{item.name}</span>
                  <Badge variant="secondary" className="text-[10px]">{item.hours}</Badge>
                </div>
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>{item.tasks}</span>
                  <span className="font-semibold text-foreground">{item.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${item.progress}%` }}></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tasks Track */}
        <Card className="shadow-sm border border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center justify-between">
              <span>Tasks Track</span>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5">
            {tasksTrack.map((item, i) => (
              <div key={i} className="p-3 border border-border/60 rounded-xl space-y-2 bg-card">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold">{item.name}</span>
                  <Badge variant="outline" className="text-[10px]">{item.badge}</Badge>
                </div>
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>{item.count}</span>
                  <span className="font-semibold text-foreground">{item.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${item.progress}%` }}></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Projects Track */}
        <Card className="shadow-sm border border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center justify-between">
              <span>Projects Track</span>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5">
            {projectsTrack.map((item, i) => (
              <div key={i} className="p-3 border border-border/60 rounded-xl space-y-2 bg-card">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold">{item.name}</span>
                  <span className="text-[10px] text-muted-foreground">Lead: {item.lead}</span>
                </div>
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>{item.status}</span>
                  <span className="font-semibold text-foreground">{item.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${item.progress}%` }}></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Timesheets Table */}
      <Card className="shadow-sm border border-border/60">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold">Timesheet Approvals & Submissions</CardTitle>
            <CardDescription>Weekly time logs submitted by team members</CardDescription>
          </div>
          <Button variant="outline" size="sm">Export All</Button>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={timesheetReportColumns}
            data={detailedTimesheetTable}
            className="border-none shadow-none bg-transparent"
            hidePagination
          />
        </CardContent>
      </Card>

    </div>
  );
}
