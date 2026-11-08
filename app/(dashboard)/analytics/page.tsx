"use client";

import * as React from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Filter,
} from "lucide-react";
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
  Cell,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { AnimatedNumber } from "@/components/core/animated-number";

import {
  monthlyConversionsData,
  segmentData,
  pipelineStages,
  topPerformers,
} from "@/lib/dashboard-data";

interface Performer {
  name: string;
  deals: number;
  revenue: string;
  achievement: number;
  status: string;
}

const performerColumns: ColumnDef<Performer>[] = [
  {
    header: "Representative",
    accessorKey: "name",
    className: "text-xs font-medium py-3 pl-5 text-foreground",
    render: (rep) => (
      <div className="flex items-center gap-2.5">
        <div className="size-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground uppercase">
          {rep.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <span className="font-medium text-foreground">{rep.name}</span>
      </div>
    ),
  },
  {
    header: "Deals Closed",
    accessorKey: "deals",
    className: "text-xs font-mono py-3 text-muted-foreground",
  },
  {
    header: "Revenue Generated",
    accessorKey: "revenue",
    className: "text-xs font-mono font-medium py-3 text-foreground",
  },
  {
    header: "Quota Achievement",
    className: "py-3 min-w-[160px]",
    render: (rep) => (
      <div className="flex items-center gap-3">
        <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${Math.min(rep.achievement, 100)}%` }}
          />
        </div>
        <span className="text-xs font-mono font-medium text-foreground tabular-nums">
          {rep.achievement}%
        </span>
      </div>
    ),
  },
  {
    header: "Status",
    className: "text-right py-3 pr-5",
    render: (rep) => (
      <span
        className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
          rep.status === "Exceeded"
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : rep.status === "On Target"
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
        }`}
      >
        {rep.status}
      </span>
    ),
  },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = React.useState("quarter");
  const [activeSegment, setActiveSegment] = React.useState<{ name: string; value: number } | null>(null);
  const totalPipelineValue = segmentData.reduce((sum: number, item: any) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-medium tracking-tight text-foreground">
            Sales & conversion analytics
          </h1>
          <p className="text-xs text-muted-foreground">
            Quarterly performance breakdown across deal funnels, revenue tiers, and sales representatives.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={(val) => { if (val) setTimeRange(val); }}>
            <SelectTrigger className="w-[140px] h-8 text-xs bg-background border-border/80">
              <Calendar className="size-3.5 mr-1.5 text-muted-foreground" />
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month" className="text-xs">Last 30 days</SelectItem>
              <SelectItem value="quarter" className="text-xs">Quarter to date</SelectItem>
              <SelectItem value="year" className="text-xs">Year to date</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-border/80 bg-background hover:bg-muted">
            <Download className="size-3.5 text-muted-foreground" />
            <span>Export report</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Conversion Rate */}
        <Card className="rounded-xl border border-border/80 bg-card p-5 space-y-2 shadow-2xs">
          <p className="text-xs font-normal text-muted-foreground">Conversion rate</p>
          <div className="text-2xl font-bold font-mono tracking-tight text-foreground tabular-nums">
            5.6%
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            <ArrowUpRight className="size-3.5" />
            <span>+0.8% vs last month</span>
          </div>
        </Card>

        {/* Card 2: Recurring Revenue */}
        <Card className="rounded-xl border border-border/80 bg-card p-5 space-y-2 shadow-2xs">
          <p className="text-xs font-normal text-muted-foreground">Monthly recurring revenue</p>
          <div className="text-2xl font-bold font-mono tracking-tight text-foreground tabular-nums flex items-center">
            <span>$</span>
            <AnimatedNumber value={124500} springOptions={{ stiffness: 70, damping: 15 }} />
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            <ArrowUpRight className="size-3.5" />
            <span>+8.2% vs target</span>
          </div>
        </Card>

        {/* Card 3: CAC */}
        <Card className="rounded-xl border border-border/80 bg-card p-5 space-y-2 shadow-2xs">
          <p className="text-xs font-normal text-muted-foreground">Customer acquisition cost</p>
          <div className="text-2xl font-bold font-mono tracking-tight text-foreground tabular-nums flex items-center">
            <span>$</span>
            <AnimatedNumber value={142} springOptions={{ stiffness: 70, damping: 15 }} />
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            <ArrowDownRight className="size-3.5" />
            <span>-4.2% MoM reduction</span>
          </div>
        </Card>

        {/* Card 4: Pipeline Volume */}
        <Card className="rounded-xl border border-border/80 bg-card p-5 space-y-2 shadow-2xs">
          <p className="text-xs font-normal text-muted-foreground">Weighted pipeline volume</p>
          <div className="text-2xl font-bold font-mono tracking-tight text-foreground tabular-nums flex items-center">
            <span>$</span>
            <AnimatedNumber value={887000} springOptions={{ stiffness: 70, damping: 15 }} />
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            <ArrowUpRight className="size-3.5" />
            <span>+12.0% vs last quarter</span>
          </div>
        </Card>
      </div>

      {/* Row 1: Conversion Trend & Segment Distribution */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Main Chart: Monthly Conversion Trends */}
        <Card className="lg:col-span-2 rounded-xl border border-border/80 bg-card shadow-2xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/60">
            <div className="space-y-0.5">
              <CardTitle className="text-sm font-semibold text-foreground">Conversion volume</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Monthly closed deals and win velocity over the current period
              </CardDescription>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-primary" />
                <span>Closed Deals</span>
              </span>
            </div>
          </CardHeader>
          <CardContent className="h-[280px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart data={monthlyConversionsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.6} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                />
                <Tooltip
                  cursor={{ fill: "var(--muted)", opacity: 0.3 }}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                  itemStyle={{ color: "var(--foreground)" }}
                  labelStyle={{ fontWeight: "500", color: "var(--foreground)", marginBottom: "4px" }}
                  formatter={(val: any) => [`${val} Deals`, "Volume"]}
                />
                <Bar dataKey="conversions" fill="var(--primary)" radius={[3, 3, 0, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Segment Share Donut */}
        <Card className="flex flex-col justify-between rounded-xl border border-border/80 bg-card shadow-2xs">
          <CardHeader className="pb-2 border-b border-border/60">
            <CardTitle className="text-sm font-semibold text-foreground">Revenue by segment</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Market tier distribution across active contracts
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-center justify-center flex-1 py-4">
            <div className="h-[180px] w-full relative">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <PieChart>
                  <Pie
                    data={segmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveSegment(segmentData[index])}
                    onMouseLeave={() => setActiveSegment(null)}
                  >
                    {segmentData.map((entry: any, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? "var(--primary)" : index === 1 ? "var(--muted-foreground)" : "var(--border)"}
                        className="outline-none"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] text-muted-foreground font-mono">
                  {activeSegment ? activeSegment.name : "Total Pipeline"}
                </span>
                <span className="text-lg font-bold font-mono tracking-tight text-foreground">
                  ${((activeSegment ? activeSegment.value : totalPipelineValue) / 1000).toFixed(0)}k
                </span>
              </div>
            </div>

            {/* Custom Legend */}
            <div className="grid grid-cols-3 gap-2 w-full text-center mt-3 pt-3 border-t border-border/60">
              {segmentData.map((item: any, idx: number) => (
                <div key={item.name} className="flex flex-col items-center space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                    <span
                      className="size-1.5 rounded-full"
                      style={{
                        backgroundColor: idx === 0 ? "var(--primary)" : idx === 1 ? "var(--muted-foreground)" : "var(--border)",
                      }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-xs font-mono font-medium text-foreground">
                    ${(item.value / 1000).toFixed(0)}k
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Sales Representatives & Funnel Distribution */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Top Performers Leaderboard Table */}
        <Card className="lg:col-span-2 rounded-xl border border-border/80 bg-card shadow-2xs overflow-hidden">
          <CardHeader className="pb-3 border-b border-border/60">
            <CardTitle className="text-sm font-semibold text-foreground">Representative performance</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Quarterly quota achievement and closed transaction counts
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={performerColumns}
              data={topPerformers}
              className="border-none shadow-none bg-transparent"
              hidePagination
            />
          </CardContent>
        </Card>

        {/* Pipeline Stage Breakdown */}
        <Card className="flex flex-col justify-between rounded-xl border border-border/80 bg-card shadow-2xs">
          <CardHeader className="pb-3 border-b border-border/60">
            <CardTitle className="text-sm font-semibold text-foreground">Pipeline stage breakdown</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Deal distribution across active pipeline stages
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 py-4 my-auto">
            {pipelineStages.map((item: any) => {
              const maxValue = Math.max(...pipelineStages.map((p: any) => p.value));
              const percentage = (item.value / maxValue) * 100;
              return (
                <div key={item.stage} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      {item.stage} <span className="font-mono text-[11px]">({item.count})</span>
                    </span>
                    <span className="font-mono font-medium text-foreground">
                      ${(item.value / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>

          <CardFooter className="pt-3 border-t border-border/60 text-xs text-muted-foreground flex justify-between items-center">
            <span>Primary Stage</span>
            <span className="font-mono font-medium text-foreground">Qualified Leads (43%)</span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
