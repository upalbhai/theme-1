"use client";

import React, { useState } from "react";
import { 
  Filter, 
  LayoutGrid, 
  Clock, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  AlertCircle, 
  MoreVertical, 
  User, 
  ChevronRight, 
  Briefcase,
  TrendingUp,
  ChevronLeft,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

const projectBanners = [
  {
    title: "NFT Mobile Apps Development",
    client: "BlockChain Inc",
    daysLeft: "20 Days Left",
    progress: 75,
    tasksCompleted: "32/45 Tasks",
    team: ["AT", "HC", "KH"],
    color: "from-blue-600 to-indigo-600"
  },
  {
    title: "SaaS CRM Dashboard Design",
    client: "Apex Enterprise",
    daysLeft: "05 Days Left",
    progress: 90,
    tasksCompleted: "88/92 Tasks",
    team: ["VM", "MH", "DR"],
    color: "from-emerald-600 to-teal-600"
  },
  {
    title: "E-Commerce Payment Gateway",
    client: "PayGlobal Ltd",
    daysLeft: "12 Days Left",
    progress: 45,
    tasksCompleted: "18/40 Tasks",
    team: ["EW", "SJ", "MV"],
    color: "from-purple-600 to-pink-600"
  },
];

const monthlyProjectData = [
  { month: "Jan", completed: 12, ongoing: 18, pending: 5 },
  { month: "Feb", completed: 15, ongoing: 22, pending: 8 },
  { month: "Mar", completed: 20, ongoing: 25, pending: 6 },
  { month: "Apr", completed: 18, ongoing: 20, pending: 9 },
  { month: "May", completed: 24, ongoing: 28, pending: 4 },
  { month: "Jun", completed: 30, ongoing: 32, pending: 7 },
  { month: "Jul", completed: 28, ongoing: 26, pending: 10 },
  { month: "Aug", completed: 35, ongoing: 30, pending: 6 },
];

const weeklyHoursData = [
  { day: "Mon", billable: 8, unbillable: 1.5 },
  { day: "Tue", billable: 7.5, unbillable: 2 },
  { day: "Wed", billable: 9, unbillable: 1 },
  { day: "Thu", billable: 8.5, unbillable: 0.5 },
  { day: "Fri", billable: 7, unbillable: 1 },
];

const teamProgress = [
  { name: "Sarah Jenkins", role: "UI/UX Lead", progress: 88, tasks: "24/28 Done", avatar: "SJ" },
  { name: "Michael Vance", role: "Frontend Engineer", progress: 92, tasks: "45/49 Done", avatar: "MV" },
  { name: "Emma Watson", role: "Fullstack Developer", progress: 65, tasks: "19/30 Done", avatar: "EW" },
  { name: "David Ray", role: "DevOps Architect", progress: 78, tasks: "14/18 Done", avatar: "DR" },
];

const activeProjectsList = [
  { name: "Cloud Infrastructure Setup", budget: "$35,000", progress: 82, status: "On Track" },
  { name: "Mobile Banking App V2", budget: "$82,000", progress: 48, status: "Delayed" },
  { name: "AI Analytics Microservice", budget: "$24,500", progress: 95, status: "Testing" },
];

const projectsTable = [
  { id: "PRJ-101", title: "Apex CRM Theme Overhaul", client: "Apex Corp", budget: "$18,500", stage: "Frontend Dev", status: "In Progress", statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  { id: "PRJ-102", title: "Enterprise SSO Integration", client: "SecureNet", budget: "$12,000", stage: "Security Audit", status: "Review", statusColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
  { id: "PRJ-103", title: "Realtime Analytics Engine", client: "DataStream", budget: "$45,000", stage: "Database Indexing", status: "In Progress", statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  { id: "PRJ-104", title: "Multi-tenant Billing Module", client: "FinTech Inc", budget: "$29,000", stage: "Stripe API Sync", status: "Completed", statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
];

const upcomingEvents = [
  { title: "Sprint Review & Demo", time: "10:00 AM - 11:30 AM", date: "TODAY", type: "Demo" },
  { title: "Client Architecture Sync", time: "02:00 PM - 03:00 PM", date: "OCT 14", type: "Sync" },
  { title: "Q4 Roadmap Brainstorming", time: "11:00 AM - 12:30 PM", date: "OCT 16", type: "Planning" },
];

export default function ProjectReportPage() {
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
                <BreadcrumbPage>Project Report</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-2xl font-bold tracking-tight mt-2">Project Report</h2>
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

      {/* Featured Projects Banner Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold tracking-tight">Active High-Priority Projects</h3>
          <span className="text-xs text-muted-foreground">3 Projects in active milestone</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projectBanners.map((item, idx) => (
            <Card key={idx} className="overflow-hidden border border-border/60 shadow-sm hover:shadow-md transition-all">
              <div className={`p-4 bg-gradient-to-r ${item.color} text-white space-y-2`}>
                <div className="flex items-center justify-between">
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-none text-[11px]">
                    {item.daysLeft}
                  </Badge>
                  <span className="text-xs font-medium opacity-90">{item.client}</span>
                </div>
                <h4 className="font-bold text-base leading-tight line-clamp-1">{item.title}</h4>
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                  <span>Milestone Completion</span>
                  <span className="text-foreground">{item.progress}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${item.progress}%` }}></div>
                </div>
                <div className="flex items-center justify-between pt-2 text-xs border-t border-border/40 text-muted-foreground">
                  <span>{item.tasksCompleted}</span>
                  <div className="flex -space-x-2">
                    {item.team.map((mem, i) => (
                      <Avatar key={i} className="h-6 w-6 border-2 border-background">
                        <AvatarFallback className="text-[10px] bg-primary/20 text-primary">{mem}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Project Report Chart & Inline Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Performance Chart */}
        <Card className="lg:col-span-8 shadow-sm border border-border/60">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-lg font-bold">Project Completion Trends</CardTitle>
              <CardDescription>Monthly status count of completed vs ongoing client projects</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">2026 YTD</Badge>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyProjectData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs text-muted-foreground" />
                  <YAxis tickLine={false} axisLine={false} className="text-xs text-muted-foreground" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '8px', border: 'none', color: '#fff' }} />
                  <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} name="Completed" />
                  <Bar dataKey="ongoing" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Ongoing" />
                  <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Schedule & Deadlines Widget */}
        <Card className="lg:col-span-4 shadow-sm border border-border/60">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Calendar Deadlines</CardTitle>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon-sm"><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon-sm"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-muted/40 rounded-xl flex items-center justify-between">
              <span className="font-bold text-sm">October 2026</span>
              <Badge className="bg-blue-600 text-white text-xs">Week 41</Badge>
            </div>

            {/* Simulated mini calendar grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted-foreground">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              <span className="p-1.5 text-muted-foreground/40">28</span>
              <span className="p-1.5 text-muted-foreground/40">29</span>
              <span className="p-1.5 text-muted-foreground/40">30</span>
              <span className="p-1.5 font-medium">1</span>
              <span className="p-1.5 font-medium">2</span>
              <span className="p-1.5 font-medium">3</span>
              <span className="p-1.5 font-medium">4</span>
              <span className="p-1.5 font-medium">5</span>
              <span className="p-1.5 font-medium">6</span>
              <span className="p-1.5 font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400 font-bold rounded-lg">7</span>
              <span className="p-1.5 font-medium">8</span>
              <span className="p-1.5 font-medium">9</span>
              <span className="p-1.5 font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400 font-bold rounded-lg">10</span>
              <span className="p-1.5 font-medium">11</span>
              <span className="p-1.5 font-medium">12</span>
              <span className="p-1.5 font-bold bg-primary text-primary-foreground rounded-lg">13</span>
              <span className="p-1.5 font-medium">14</span>
              <span className="p-1.5 font-medium">15</span>
              <span className="p-1.5 font-medium">16</span>
              <span className="p-1.5 font-medium">17</span>
            </div>

            <div className="space-y-2 pt-2 border-t border-border/40">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="font-semibold">Sprint 14 Release</span>
                </div>
                <span className="text-muted-foreground">Oct 10</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="font-semibold">Client Review Call</span>
                </div>
                <span className="text-muted-foreground">Today</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3-Column Metrics: Hours Spent, Team Progress, Active Projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Hours Spent */}
        <Card className="shadow-sm border border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center justify-between">
              <span>Hours Spent Breakdown</span>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-center p-3 bg-muted/40 rounded-xl">
              <div>
                <p className="text-[11px] text-muted-foreground">Billable Time</p>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">66H:35M</p>
              </div>
              <div className="border-l border-border/60">
                <p className="text-[11px] text-muted-foreground">Unbillable Time</p>
                <p className="text-xl font-bold text-amber-600 dark:text-amber-400">06H:25M</p>
              </div>
            </div>

            <div className="h-36 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyHoursData}>
                  <XAxis dataKey="day" tickLine={false} axisLine={false} className="text-[10px]" />
                  <Tooltip />
                  <Bar dataKey="billable" fill="#10b981" radius={[3, 3, 0, 0]} name="Billable (hrs)" />
                  <Bar dataKey="unbillable" fill="#f59e0b" radius={[3, 3, 0, 0]} name="Unbillable (hrs)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Team Progress */}
        <Card className="shadow-sm border border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center justify-between">
              <span>Team Member Progress</span>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5">
            {teamProgress.map((member, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary">{member.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-semibold block leading-tight">{member.name}</span>
                      <span className="text-[10px] text-muted-foreground">{member.role}</span>
                    </div>
                  </div>
                  <span className="font-bold text-muted-foreground">{member.tasks}</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${member.progress}%` }}></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Projects Tracker */}
        <Card className="shadow-sm border border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center justify-between">
              <span>Active Projects Tracker</span>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeProjectsList.map((prj, idx) => (
              <div key={idx} className="p-3 border border-border/60 rounded-xl space-y-2 bg-card">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold">{prj.name}</span>
                  <Badge variant="outline" className="text-[10px]">{prj.status}</Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Budget: {prj.budget}</span>
                  <span className="font-bold text-foreground">{prj.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${prj.progress}%` }}></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Projects Table & Upcoming Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Table */}
        <Card className="lg:col-span-8 shadow-sm border border-border/60">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Project Directory & Status</CardTitle>
              <CardDescription>Comprehensive view of ongoing deliverables and budgets</CardDescription>
            </div>
            <Button variant="outline" size="sm">Export Report</Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Project Code</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectsTable.map((p) => (
                  <TableRow key={p.id} className="hover:bg-muted/40">
                    <TableCell className="font-mono text-xs font-semibold">{p.id}</TableCell>
                    <TableCell className="font-semibold text-sm">{p.title}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{p.client}</TableCell>
                    <TableCell className="font-bold text-sm">{p.budget}</TableCell>
                    <TableCell>
                      <Badge className={`text-[11px] border-none font-medium px-2 py-0.5 ${p.statusColor}`}>
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger render={
                          <Button variant="ghost" size="icon-sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        } />
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> Details</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2"><Pencil className="h-4 w-4" /> Edit</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-rose-600"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card className="lg:col-span-4 shadow-sm border border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold">Upcoming Milestones</CardTitle>
            <CardDescription>Scheduled demos and client syncs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((evt, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-muted/30 rounded-xl border border-border/40">
                <div className="p-2 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded-lg text-center min-w-[54px]">
                  <span className="text-[10px] uppercase font-bold block">{evt.date}</span>
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-sm leading-tight">{evt.title}</h4>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {evt.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
