"use client";

import React from "react";
import { 
  Filter, 
  LayoutGrid, 
  Phone, 
  Mail, 
  MapPin, 
  MoreHorizontal, 
  MoreVertical,
  ArrowUpRight, 
  ArrowDownRight,
  User,
  CheckCircle2,
  Eye,
  Pencil,
  Trash2,
  Image as ImageIcon
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

const kpiData = [
  { title: "Total Inquiry", value: "32K", trend: "+20.36%", isPositive: true },
  { title: "Performance", value: "45.68%", trend: "-10.46%", isPositive: false },
  { title: "Escalations", value: "985", trend: "+25.48%", isPositive: true },
  { title: "SLA Compliant", value: "895", trend: "+15.39%", isPositive: true },
  { title: "Avg. Time (H)", value: "03.45", trend: "-12.86%", isPositive: false },
  { title: "Avg. Fulfillment", value: "65.95%", trend: "+20.35%", isPositive: true },
];

const trackingData = [
  { name: 'JAN/23', value: 25000 },
  { name: 'FEB/23', value: 15000 },
  { name: 'MAR/23', value: 45000 },
  { name: 'APR/23', value: 30000 },
  { name: 'MAY/23', value: 20000 },
  { name: 'JUN/23', value: 42000 },
  { name: 'JUL/23', value: 18000 },
  { name: 'AUG/23', value: 35000 },
  { name: 'SEP/23', value: 48000 },
  { name: 'OCT/23', value: 22000 },
  { name: 'NOV/23', value: 15000 },
  { name: 'DEC/23', value: 38000 },
];

const channelData = [
  { name: 'JAN/22', leads: 4000, active: 8000, pending: 2000, resolved: 6000, cancelled: 1000 },
  { name: 'FEB/22', leads: 5000, active: 6000, pending: 3000, resolved: 7000, cancelled: 1500 },
  { name: 'MAR/22', leads: 6000, active: 9000, pending: 2500, resolved: 8000, cancelled: 1200 },
  { name: 'APR/22', leads: 4500, active: 7500, pending: 4000, resolved: 5500, cancelled: 1800 },
  { name: 'MAY/22', leads: 5500, active: 8500, pending: 3500, resolved: 6500, cancelled: 1400 },
  { name: 'JUN/22', leads: 7000, active: 10000, pending: 2000, resolved: 9000, cancelled: 1000 },
  { name: 'JUL/22', leads: 4000, active: 6500, pending: 4500, resolved: 5000, cancelled: 2000 },
  { name: 'AUG/22', leads: 5000, active: 7000, pending: 3000, resolved: 6500, cancelled: 1500 },
  { name: 'SEP/22', leads: 6500, active: 9500, pending: 2500, resolved: 8500, cancelled: 1100 },
  { name: 'OCT/22', leads: 4500, active: 6000, pending: 5000, resolved: 4500, cancelled: 2200 },
  { name: 'NOV/22', leads: 5500, active: 7500, pending: 3500, resolved: 6000, cancelled: 1600 },
  { name: 'DEC/22', leads: 7500, active: 10500, pending: 1500, resolved: 9500, cancelled: 800 },
];

const leadsStatusData = [
  { name: "Archie Tones", initials: "AT", date: "15 June, 2023", status: "Deal Won", statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", value: "$15.56K" },
  { name: "Holmes Cherry", initials: "HC", date: "18 June, 2023", status: "Intro Call", statusColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", value: "$10.24K" },
  { name: "Kenneth Hune", initials: "KH", date: "20 June, 2023", status: "Stuck", statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", value: "$12.47K" },
  { name: "Malanie Hanvey", initials: "MH", date: "22 June, 2023", status: "Cancelled", statusColor: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", value: "$10.88K" },
  { name: "Valentine Maton", initials: "VM", date: "25 June, 2023", status: "Progress", statusColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400", value: "$13.85K" },
];

const upcomingEvents = [
  { date: "20 DEC", time: "11:30am - 12:30pm", title: "Meeting for campaign with sales team" },
  { date: "21 DEC", time: "10:00am - 12:00pm", title: "Meeting for campaign with sales team" },
  { date: "22 DEC", time: "8:00am - 9:00am", title: "Meeting for campaign with sales team" },
];

const projectLeads = [
  {
    id: "#874965",
    title: "React admin dashboard design",
    statusBadge: "5+ Follow Up",
    statusIcon: User,
    badgeColor: "bg-blue-100 text-blue-700",
    phone: "+1 (375) 9874 663",
    email: "support@wrapcoders.com",
    address: "4295 Pheasant Ridge Road, Philadelphia, PA",
    revenue: "5,685 USD",
    status: "Inprogress",
    statusDot: "bg-blue-500",
    progressValue: 90,
    progressText: "$900USD",
    progressColor: "text-blue-500",
    strokeColor: "#3b82f6"
  },
  {
    id: "#963245",
    title: "React admin dashboard design",
    statusBadge: "15+ Completed",
    statusIcon: CheckCircle2,
    badgeColor: "bg-emerald-100 text-emerald-700",
    phone: "+1 (951) 6547 862",
    email: "support@wrapcoders.com",
    address: "1362 Emerson Road, Doyline, LA 71023",
    revenue: "6,500 USD",
    status: "Completed",
    statusDot: "bg-emerald-500",
    progressValue: 70,
    progressText: "$700USD",
    progressColor: "text-emerald-500",
    strokeColor: "#10b981"
  },
  {
    id: "#953684",
    title: "React admin dashboard design",
    statusBadge: "2+ Upcomming",
    statusIcon: Eye,
    badgeColor: "bg-orange-100 text-orange-700",
    phone: "+1 (951) 6547 862",
    email: "support@wrapcoders.com",
    address: "139 Ethels Lane, Okeechobee, FL 33472",
    revenue: "3,500 USD",
    status: "Upcoming",
    statusDot: "bg-orange-500",
    progressValue: 60,
    progressText: "$600USD",
    progressColor: "text-orange-500",
    strokeColor: "#f97316"
  }
];

interface LeadStatus {
  name: string;
  initials: string;
  date: string;
  status: string;
  statusColor: string;
  value: string;
}

const leadStatusColumns: ColumnDef<LeadStatus>[] = [
  {
    header: "NAME",
    className: "w-[200px] pl-6",
    render: (lead) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/10 text-primary text-xs">{lead.initials}</AvatarFallback>
        </Avatar>
        {lead.name}
      </div>
    ),
  },
  {
    header: "SALE REP.",
    render: () => (
      <div className="flex -space-x-2">
        <Avatar className="border-2 border-background w-7 h-7"><AvatarFallback className="text-[10px] bg-blue-100">A</AvatarFallback></Avatar>
        <Avatar className="border-2 border-background w-7 h-7"><AvatarFallback className="text-[10px] bg-orange-100">B</AvatarFallback></Avatar>
      </div>
    ),
  },
  {
    header: "CONTACTED",
    accessorKey: "date",
    className: "text-muted-foreground",
  },
  {
    header: "STATUS",
    render: (lead) => (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${lead.statusColor}`}>
        {lead.status}
      </span>
    ),
  },
  {
    header: "VALUE",
    accessorKey: "value",
    className: "text-right font-semibold pr-6",
  },
];

const projectLeadColumns: ColumnDef<any>[] = [
  {
    header: "Project ID & Title",
    className: "w-[300px] pl-6",
    render: (project) => {
      const StatusIcon = project.statusIcon;
      return (
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg flex flex-col items-center justify-center shrink-0 w-[90px] h-[90px] ${project.badgeColor} border border-current/10`}>
            <StatusIcon className="h-6 w-6 mb-1" />
            <span className="text-[10px] font-bold text-center leading-tight">{project.statusBadge}</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium mb-1">{project.id}</p>
            <h4 className="font-semibold text-sm line-clamp-2">{project.title}</h4>
          </div>
        </div>
      );
    },
  },
  {
    header: "Contact Details",
    className: "min-w-[200px]",
    render: (project) => (
      <div className="space-y-1.5">
        <div className="flex items-center text-xs text-muted-foreground">
          <Phone className="h-3.5 w-3.5 mr-2 shrink-0" />
          <span>{project.phone}</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Mail className="h-3.5 w-3.5 mr-2 shrink-0" />
          <span className="truncate">{project.email}</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mr-2 shrink-0" />
          <span className="truncate">{project.address}</span>
        </div>
      </div>
    ),
  },
  {
    header: "",
    render: () => (
      <Button variant="link" className="text-blue-600 p-0 h-auto text-sm font-semibold">Show More</Button>
    ),
  },
  {
    header: "Est. Revenue",
    render: (project) => (
      <span className="font-bold text-sm">{project.revenue}</span>
    ),
  },
  {
    header: "Sales Rep",
    render: () => (
      <div className="flex items-center gap-1">
        <div className="flex -space-x-2">
          <Avatar className="border-2 border-background w-7 h-7"><AvatarFallback className="text-[10px] bg-slate-200">A</AvatarFallback></Avatar>
          <Avatar className="border-2 border-background w-7 h-7"><AvatarFallback className="text-[10px] bg-slate-200">B</AvatarFallback></Avatar>
        </div>
        <span className="text-xs text-muted-foreground font-medium bg-muted px-1.5 py-0.5 rounded-md">35+</span>
      </div>
    ),
  },
  {
    header: "Status",
    render: (project) => (
      <DropdownMenu>
        <DropdownMenuTrigger render={
          <Button variant="outline" size="sm" className="h-8 rounded-full gap-2 text-xs font-semibold px-3">
            <span className={`w-2 h-2 rounded-full ${project.statusDot}`} />
            {project.status}
          </Button>
        } />
        <DropdownMenuContent>
          <DropdownMenuItem>Inprogress</DropdownMenuItem>
          <DropdownMenuItem>Completed</DropdownMenuItem>
          <DropdownMenuItem>Upcoming</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    header: "Progress",
    render: (project) => (
      <div className="flex items-center justify-center">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-muted/30"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              stroke={project.strokeColor}
              strokeWidth="3"
              strokeDasharray={`${project.progressValue}, 100`}
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className={`absolute inset-0 flex items-center justify-center flex-col`}>
            <span className={`text-[10px] font-bold ${project.progressColor}`}>{project.progressText}</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    header: "",
    className: "text-right pr-6",
    render: (project) => (
      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary rounded-full"><ImageIcon className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary rounded-full"><Pencil className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive rounded-full"><Trash2 className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary rounded-full"><LayoutGrid className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary rounded-full"><MoreVertical className="h-4 w-4" /></Button>
      </div>
    ),
  },
];

export default function LeadsReportPage() {
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
                <BreadcrumbPage>Leads Report</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-2xl font-bold tracking-tight mt-2">Leads Report</h2>
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpiData.map((kpi, idx) => (
          <Card key={idx} className="shadow-sm">
            <CardContent className="p-5 flex flex-col items-center text-center justify-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase">{kpi.title}</p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-bold">{kpi.value}</h3>
              </div>
              <div className={`flex items-center text-xs font-semibold ${kpi.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                {kpi.isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {kpi.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inquiry Tracking */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Inquiry Tracking</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><MoreHorizontal className="h-4 w-4" /></Button>
              } />
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Export Data</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trackingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(val) => `${val/1000}K`} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Inquiry Channel */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Inquiry Channel</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><MoreHorizontal className="h-4 w-4" /></Button>
              } />
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Export Data</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(val) => `${val/1000}K`} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="leads" stackId="a" fill="#1e3a8a" maxBarSize={30} />
                  <Bar dataKey="active" stackId="a" fill="#3b82f6" maxBarSize={30} />
                  <Bar dataKey="pending" stackId="a" fill="#f97316" maxBarSize={30} />
                  <Bar dataKey="resolved" stackId="a" fill="#10b981" maxBarSize={30} />
                  <Bar dataKey="cancelled" stackId="a" fill="#eab308" radius={[4, 4, 0, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads Status */}
        <Card className="shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Leads Status</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><MoreHorizontal className="h-4 w-4" /></Button>
              } />
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Export Data</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={leadStatusColumns}
              data={leadsStatusData}
              className="border-none shadow-none bg-transparent"
              hidePagination
            />
            <div className="p-4 text-xs text-muted-foreground border-t">
              UPDATE: 30 MIN AGO
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Upcoming Events</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><MoreHorizontal className="h-4 w-4" /></Button>
              } />
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="space-y-6">
            {upcomingEvents.map((event, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 min-w-[70px] border border-blue-100 dark:border-blue-900/50 text-blue-700 dark:text-blue-400">
                  <span className="text-lg font-bold leading-none">{event.date.split(" ")[0]}</span>
                  <span className="text-xs uppercase font-medium">{event.date.split(" ")[1]}</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-muted-foreground font-medium">{event.time}</p>
                  <p className="text-sm font-semibold line-clamp-2">{event.title}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex -space-x-2">
                      <Avatar className="border-2 border-background w-6 h-6"><AvatarFallback className="text-[10px] bg-slate-200">S</AvatarFallback></Avatar>
                      <Avatar className="border-2 border-background w-6 h-6"><AvatarFallback className="text-[10px] bg-slate-200">J</AvatarFallback></Avatar>
                      <Avatar className="border-2 border-background w-6 h-6"><AvatarFallback className="text-[10px] bg-slate-200">K</AvatarFallback></Avatar>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium bg-muted px-1.5 py-0.5 rounded-md">35+</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-4 text-xs text-muted-foreground border-t mt-2">
            UPDATE: 20 MIN AGO
          </div>
        </Card>
      </div>

      {/* Project Leads */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Project Leads</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger render={
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><MoreHorizontal className="h-4 w-4" /></Button>
            } />
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={projectLeadColumns}
            data={projectLeads}
            className="border-none shadow-none bg-transparent"
            hidePagination
          />
        </CardContent>
      </Card>

    </div>
  );
}
