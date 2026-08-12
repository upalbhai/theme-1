"use client";

import React, { useState } from "react";
import { 
  Filter, 
  LayoutGrid, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  MoreVertical, 
  Users, 
  Target, 
  CheckCircle2, 
  Briefcase,
  ChevronRight,
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
  AreaChart,
  Area
} from "recharts";

const kpiCards = [
  { 
    title: "Active Deals", 
    value: "$5,658 USD", 
    change: "+23.65%", 
    isPositive: true, 
    comparison: "vs last month: $4,563 USD",
    icon: Briefcase,
    iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
  },
  { 
    title: "Revenue Deals", 
    value: "$76,852 USD", 
    change: "-06.32%", 
    isPositive: false, 
    comparison: "vs last month: $85,748 USD",
    icon: DollarSign,
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
  },
  { 
    title: "Deals Created", 
    value: "$2,354 USD", 
    change: "+30.47%", 
    isPositive: true, 
    comparison: "vs last month: $1,578 USD",
    icon: TrendingUp,
    iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
  },
  { 
    title: "Deals Closing", 
    value: "$40,847 USD", 
    change: "-08.55%", 
    isPositive: false, 
    comparison: "vs last month: $52,468 USD",
    icon: Target,
    iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
  },
];

const pipelineTabsData: Record<string, { name: string; leads: number; closed: number; pending: number }[]> = {
  Leads: [
    { name: "Jan", leads: 4000, closed: 2400, pending: 1600 },
    { name: "Feb", leads: 5000, closed: 3000, pending: 2000 },
    { name: "Mar", leads: 7000, closed: 4500, pending: 2500 },
    { name: "Apr", leads: 6000, closed: 3800, pending: 2200 },
    { name: "May", leads: 8500, closed: 5200, pending: 3300 },
    { name: "Jun", leads: 9500, closed: 6100, pending: 3400 },
    { name: "Jul", leads: 7500, closed: 4800, pending: 2700 },
    { name: "Aug", leads: 8800, closed: 5600, pending: 3200 },
  ],
  Proposal: [
    { name: "Jan", leads: 3100, closed: 1800, pending: 1300 },
    { name: "Feb", leads: 4200, closed: 2600, pending: 1600 },
    { name: "Mar", leads: 5800, closed: 3900, pending: 1900 },
    { name: "Apr", leads: 4900, closed: 3100, pending: 1800 },
    { name: "May", leads: 6400, closed: 4100, pending: 2300 },
    { name: "Jun", leads: 7800, closed: 5200, pending: 2600 },
    { name: "Jul", leads: 6200, closed: 4000, pending: 2200 },
    { name: "Aug", leads: 7100, closed: 4600, pending: 2500 },
  ],
  Contract: [
    { name: "Jan", leads: 2200, closed: 1400, pending: 800 },
    { name: "Feb", leads: 3100, closed: 2100, pending: 1000 },
    { name: "Mar", leads: 4300, closed: 3000, pending: 1300 },
    { name: "Apr", leads: 3800, closed: 2600, pending: 1200 },
    { name: "May", leads: 4900, closed: 3400, pending: 1500 },
    { name: "Jun", leads: 5600, closed: 4000, pending: 1600 },
    { name: "Jul", leads: 4500, closed: 3100, pending: 1400 },
    { name: "Aug", leads: 5200, closed: 3700, pending: 1500 },
  ],
  Project: [
    { name: "Jan", leads: 4500, closed: 3200, pending: 1300 },
    { name: "Feb", leads: 5900, closed: 4100, pending: 1800 },
    { name: "Mar", leads: 7800, closed: 5600, pending: 2200 },
    { name: "Apr", leads: 6900, closed: 4800, pending: 2100 },
    { name: "May", leads: 8200, closed: 5900, pending: 2300 },
    { name: "Jun", leads: 9900, closed: 7200, pending: 2700 },
    { name: "Jul", leads: 8100, closed: 5800, pending: 2300 },
    { name: "Aug", leads: 9400, closed: 6900, pending: 2500 },
  ],
};

const earningsSparkline = [
  { month: "M1", value: 40 },
  { month: "M2", value: 65 },
  { month: "M3", value: 50 },
  { month: "M4", value: 85 },
  { month: "M5", value: 75 },
  { month: "M6", value: 95 },
];

const expensesSparkline = [
  { month: "M1", value: 30 },
  { month: "M2", value: 45 },
  { month: "M3", value: 35 },
  { month: "M4", value: 60 },
  { month: "M5", value: 50 },
  { month: "M6", value: 40 },
];

const upcomingDeals = [
  { name: "SaaS Enterprise Deal", company: "Apex Corp", value: "$45,000", date: "Oct 24, 2026", owner: "Sarah Jenkins", avatar: "SJ" },
  { name: "Cloud Migration", company: "Nexus Systems", value: "$28,500", date: "Oct 28, 2026", owner: "Michael Vance", avatar: "MV" },
  { name: "UI/UX Redesign", company: "Acme Web", value: "$14,200", date: "Nov 02, 2026", owner: "Emma Watson", avatar: "EW" },
  { name: "Mobile App Contract", company: "FinTech Labs", value: "$62,000", date: "Nov 05, 2026", owner: "David Ray", avatar: "DR" },
];

const contactLeads = [
  { id: 1, name: "Alexandra Wright", company: "InnoTech Solutions", amount: "$15,400", stage: 85, status: "Contracting", statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { id: 2, name: "Marcus Brody", company: "Global Logistics", amount: "$32,100", stage: 60, status: "Proposal", statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  { id: 3, name: "Elena Rostova", company: "CyberShield Security", amount: "$24,500", stage: 40, status: "Discovery", statusColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
  { id: 4, name: "Jonathan Sterling", company: "Vanguard Capital", amount: "$58,000", stage: 95, status: "Closing", statusColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  { id: 5, name: "Sophia Chen", company: "BioHealth Diagnostics", amount: "$19,800", stage: 25, status: "Qualified Lead", statusColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" },
];

export default function SalesReportPage() {
  const [activeTab, setActiveTab] = useState<string>("Leads");

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
                <BreadcrumbPage>Sales Report</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-2xl font-bold tracking-tight mt-2">Sales Report</h2>
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
        {kpiCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card key={idx} className="shadow-sm border border-border/60 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${card.iconBg}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge variant={card.isPositive ? "default" : "destructive"} className="gap-1 px-2.5 py-0.5 text-xs font-semibold">
                    {card.isPositive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                    {card.change}
                  </Badge>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                  <h3 className="text-2xl font-bold tracking-tight">{card.value}</h3>
                  <p className="text-xs text-muted-foreground pt-1">{card.comparison}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Interactive Sales Pipeline & Forecast Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Pipeline Chart Card */}
        <Card className="lg:col-span-8 shadow-sm border border-border/60">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
            <div>
              <CardTitle className="text-lg font-bold">Sales Pipeline Breakdown</CardTitle>
              <CardDescription>Visual distribution of deal status across sales funnel stages</CardDescription>
            </div>
            
            {/* Custom Tab Selector */}
            <div className="flex bg-muted/60 p-1 rounded-xl text-xs font-medium">
              {Object.keys(pipelineTabsData).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === tab 
                      ? "bg-background text-foreground shadow-xs font-semibold" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pipelineTabsData[activeTab]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs text-muted-foreground" />
                  <YAxis tickLine={false} axisLine={false} className="text-xs text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '8px', border: 'none', color: '#fff' }}
                  />
                  <Bar dataKey="leads" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Leads Generated" />
                  <Bar dataKey="closed" fill="#10b981" radius={[4, 4, 0, 0]} name="Deals Closed" />
                  <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Pending Review" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Forecast Card */}
        <Card className="lg:col-span-4 shadow-sm border border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold">Revenue Forecast</CardTitle>
            <CardDescription>Monthly target progression & collection forecast</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-muted/40 rounded-xl text-center">
              <div>
                <p className="text-[11px] text-muted-foreground">Current</p>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">$65.6K</p>
              </div>
              <div className="border-x border-border/60">
                <p className="text-[11px] text-muted-foreground">Overdue</p>
                <p className="text-sm font-bold text-rose-600 dark:text-rose-400">$3.4K</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">Forecast</p>
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400">$86.1K</p>
              </div>
            </div>

            {/* Goal Progress Bars */}
            <div className="space-y-4 pt-1">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Marketing Goal</span>
                  <span className="text-blue-600">44% ($550 / $1,250)</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '44%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Sales Rep Target</span>
                  <span className="text-purple-600">68% ($8,500 / $12,500)</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Annual Revenue Goal</span>
                  <span className="text-emerald-600">89% ($890K / $1M)</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
            </div>

            <Button className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 gap-2">
              Generate Detailed Report <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Deals Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold tracking-tight">Upcoming High-Value Deals</h3>
          <Button variant="ghost" className="text-xs text-blue-600 hover:text-blue-700 gap-1">
            View All Deals <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {upcomingDeals.map((deal, idx) => (
            <Card key={idx} className="shadow-sm border border-border/60 hover:border-primary/50 transition-colors">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm leading-tight line-clamp-1">{deal.name}</h4>
                    <p className="text-xs text-muted-foreground">{deal.company}</p>
                  </div>
                  <Badge variant="outline" className="font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200">
                    {deal.value}
                  </Badge>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground border-t border-border/40">
                  <div className="flex items-center gap-1.5">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-[9px] bg-primary/10 text-primary">{deal.avatar}</AvatarFallback>
                    </Avatar>
                    <span>{deal.owner}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{deal.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Earnings/Expenses & Contact Leads Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Earnings & Expenses Mini Cards */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="shadow-sm border border-border/60">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Net Earnings</p>
                <h4 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">+$55,236</h4>
                <p className="text-xs text-muted-foreground">+14.2% from last month</p>
              </div>
              <div className="w-24 h-14">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={earningsSparkline}>
                    <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b98120" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border border-border/60">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Operational Expenses</p>
                <h4 className="text-2xl font-bold text-rose-600 dark:text-rose-400">-$16,845</h4>
                <p className="text-xs text-muted-foreground">-4.8% reduction</p>
              </div>
              <div className="w-24 h-14">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={expensesSparkline}>
                    <Area type="monotone" dataKey="value" stroke="#f43f5e" fill="#f43f5e20" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Leads Table */}
        <Card className="lg:col-span-8 shadow-sm border border-border/60">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Contact Leads Tracker</CardTitle>
              <CardDescription>Recent enterprise inquiries and deal progression stages</CardDescription>
            </div>
            <Button variant="outline" size="sm">Export CSV</Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-[180px]">Contact Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Est. Value</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contactLeads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-muted/40">
                    <TableCell className="font-semibold text-sm">{lead.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{lead.company}</TableCell>
                    <TableCell className="font-bold text-sm">{lead.amount}</TableCell>
                    <TableCell className="w-[140px]">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-muted-foreground">
                          <span>Progress</span>
                          <span>{lead.stage}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 rounded-full" 
                            style={{ width: `${lead.stage}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-[11px] border-none font-medium px-2 py-0.5 ${lead.statusColor}`}>
                        {lead.status}
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
                          <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> View Details</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2"><Pencil className="h-4 w-4" /> Edit Lead</DropdownMenuItem>
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
      </div>

    </div>
  );
}
