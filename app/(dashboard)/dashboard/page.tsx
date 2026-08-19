"use client";

import * as React from "react";
import {
  DollarSign,
  Users,
  TrendingUp,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  PhoneCall,
  Mail,
  Calendar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  salesData,
  leadSourceData,
  recentDeals,
  recentActivities,
} from "@/lib/dashboard-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable, ColumnDef } from "@/components/ui/data-table";

interface RecentDeal {
  company: string;
  contact: string;
  val: string;
  stage: string;
  stageColor: string;
  date: string;
}

const recentDealsColumns: ColumnDef<RecentDeal>[] = [
  {
    header: "Company",
    accessorKey: "company",
    className: "font-semibold text-xs py-3 pl-6",
  },
  {
    header: "Contact",
    accessorKey: "contact",
    className: "text-muted-foreground text-xs py-3",
  },
  {
    header: "Value",
    accessorKey: "val",
    className: "font-medium text-xs py-3",
  },
  {
    header: "Stage",
    className: "py-3",
    render: (deal) => (
      <Badge variant="outline" className={`${deal.stageColor} border-none font-semibold text-[10px] py-0.5`}>
        {deal.stage}
      </Badge>
    ),
  },
  {
    header: "Updated",
    className: "text-right text-muted-foreground text-xs py-3 pr-6",
    render: (deal) => deal.date,
  },
];

export default function SalesAnalyticsDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Title & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">CRM Analytics & Revenue</h1>
          <p className="text-sm text-muted-foreground">
            Real-time pipeline performance, revenue trends, and sales velocity metrics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            Export Report
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" /> Add New Lead
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Revenue
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold tracking-tight">$89,450</span>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none gap-0.5 font-semibold text-xs py-0.5">
                <ArrowUpRight className="h-3 w-3" /> +18.4%
              </Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">vs $75,200 last month</p>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Active Leads
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold tracking-tight">1,160</span>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none gap-0.5 font-semibold text-xs py-0.5">
                <ArrowUpRight className="h-3 w-3" /> +8.2%
              </Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">142 new this week</p>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Win Rate
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <Target className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold tracking-tight">34.2%</span>
              <Badge variant="outline" className="bg-destructive/10 text-destructive border-none gap-0.5 font-semibold text-xs py-0.5">
                <ArrowDownRight className="h-3 w-3" /> -1.5%
              </Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Target benchmark: 35%</p>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Avg Deal Size
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold tracking-tight">$38,600</span>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none gap-0.5 font-semibold text-xs py-0.5">
                <ArrowUpRight className="h-3 w-3" /> +12.1%
              </Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Up from $34.4k average</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Revenue Chart & Lead Source Breakdown */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Area Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-base font-semibold">Revenue Growth & Target Trajectory</CardTitle>
              <CardDescription className="text-xs">Monthly total revenue vs target benchmark</CardDescription>
            </div>
            <Select defaultValue="7m">
              <SelectTrigger className="w-[130px] h-8 text-xs bg-muted/40">
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7m" className="text-xs">Last 7 Months</SelectItem>
                <SelectItem value="12m" className="text-xs">This Year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="h-[280px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "10px",
                    fontSize: "12px",
                    boxShadow: "0 10px 25px -10px rgba(0,0,0,0.15)",
                  }}
                  itemStyle={{ color: "var(--foreground)" }}
                  labelStyle={{ fontWeight: "600", color: "var(--foreground)" }}
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#revenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Source Bar List */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Lead Generation Channels</CardTitle>
            <CardDescription className="text-xs">Total leads per source channel</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4.5 py-4 my-auto">
            {leadSourceData.map((item) => {
              const maxLeads = Math.max(...leadSourceData.map(l => l.leads));
              const percentage = (item.leads / maxLeads) * 100;
              return (
                <div key={item.name} className="space-y-1.5 group">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">{item.name}</span>
                    <span className="font-semibold text-foreground">{item.leads}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-primary transition-all duration-500 group-hover:opacity-85" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>

          <CardFooter className="pt-3 border-t text-xs text-muted-foreground flex justify-between items-center">
            <span>Top Performing Channel</span>
            <span className="font-semibold text-foreground">Organic Search (36%)</span>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Deals Table & Activity Timeline */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Deals */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-base font-semibold">Recent High-Value Deals</CardTitle>
              <CardDescription className="text-xs">Latest deal movements in your pipeline</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs font-semibold text-primary hover:underline gap-1">
              View All Deals
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={recentDealsColumns}
              data={recentDeals}
              className="border-none shadow-none bg-transparent"
              hidePagination
            />
          </CardContent>
        </Card>

        {/* Live Activity Feed */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-semibold">Live Team Activity Feed</CardTitle>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </CardHeader>
          <CardContent className="space-y-5">
            {recentActivities.map((act, idx) => {
              const Icon = act.icon;
              return (
                <div key={idx} className="flex items-start gap-3 group">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/40 transition-transform group-hover:scale-105 ${act.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-foreground group-hover:text-primary transition-colors">{act.title}</span>
                      <span className="text-[10px] font-normal text-muted-foreground">{act.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{act.desc}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
