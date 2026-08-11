"use client";

import * as React from "react";
import {
  TrendingUp,
  Users,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import {
  monthlyConversionsData,
  segmentData,
  pipelineStages,
  topPerformers,
} from "@/lib/dashboard-data";

export default function AnalyticsPage() {
  const [activeSegment, setActiveSegment] = React.useState<{ name: string; value: number } | null>(null);
  const totalPipelineValue = segmentData.reduce((sum: number, item: any) => sum + item.value, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Title & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales & Conversion Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Detailed breakdown of conversion metrics, stage distributions, and team performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" /> Custom Range
          </Button>
          <Button size="sm">
            Download PDF Report
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Conversion Rate
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Target className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold tracking-tight">5.6%</span>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none gap-0.5 font-semibold text-xs py-0.5">
                <ArrowUpRight className="h-3 w-3" /> +0.8%
              </Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">vs 4.8% average benchmark</p>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Recurring Revenue
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold tracking-tight">$124,500</span>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none gap-0.5 font-semibold text-xs py-0.5">
                <ArrowUpRight className="h-3 w-3" /> +8.2%
              </Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">MRR target achieved: 104%</p>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Acquisition Cost (CAC)
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <Users className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold tracking-tight">$142</span>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none gap-0.5 font-semibold text-xs py-0.5">
                <ArrowDownRight className="h-3 w-3" /> -4.2%
              </Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">MoM cost reduction</p>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Pipeline Health
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
              <Target className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold tracking-tight">$887k</span>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none gap-0.5 font-semibold text-xs py-0.5">
                <ArrowUpRight className="h-3 w-3" /> +12%
              </Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Total pipeline value</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Layout Row 1 */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Monthly Conversions Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-base font-semibold">Conversion Trends</CardTitle>
              <CardDescription className="text-xs">Total monthly closed deals & conversion percentage</CardDescription>
            </div>
            <Select defaultValue="month">
              <SelectTrigger className="w-[120px] h-8 text-xs bg-muted/40">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month" className="text-xs">Monthly</SelectItem>
                <SelectItem value="quarter" className="text-xs">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="h-[280px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart data={monthlyConversionsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Tooltip
                  cursor={{ fill: "var(--secondary)", opacity: 0.4 }}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "10px",
                    fontSize: "12px",
                    boxShadow: "0 10px 25px -10px rgba(0,0,0,0.15)",
                  }}
                  itemStyle={{ color: "var(--foreground)" }}
                  labelStyle={{ fontWeight: "600", color: "var(--foreground)" }}
                  formatter={(val: any) => [val, "Deals Closed"]}
                />
                <Bar dataKey="conversions" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Deals by Segment Donut Chart */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Deals by Segment</CardTitle>
            <CardDescription className="text-xs">Revenue contribution by market segment</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center flex-1 py-4">
            <div className="h-[180px] w-full relative">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <PieChart>
                  <Pie
                    data={segmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveSegment(segmentData[index])}
                    onMouseLeave={() => setActiveSegment(null)}
                  >
                    {segmentData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} className="outline-none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  {activeSegment ? activeSegment.name : "Total Value"}
                </span>
                <span className="text-lg font-bold">
                  ${((activeSegment ? activeSegment.value : totalPipelineValue) / 1000).toFixed(0)}k
                </span>
              </div>
            </div>
            {/* Custom Legend */}
            <div className="grid grid-cols-3 gap-2 w-full text-center mt-2 pt-2 border-t">
              {segmentData.map((item: any) => (
                <div key={item.name} className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-foreground mt-0.5">
                    ${(item.value / 1000).toFixed(0)}k
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Performance and Pipeline */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Performers Table */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-base font-semibold">Representative Performance</CardTitle>
              <CardDescription className="text-xs">Sales targets achieved by representative this quarter</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="text-xs font-semibold text-muted-foreground">Sales Rep</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground">Deals Closed</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground">Revenue Generated</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground">Target Achievement</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPerformers.map((rep: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell className="font-semibold text-xs py-3">{rep.name}</TableCell>
                      <TableCell className="text-muted-foreground text-xs py-3">{rep.deals}</TableCell>
                      <TableCell className="font-medium text-xs py-3">{rep.revenue}</TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-24 rounded-full bg-secondary overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${Math.min(rep.achievement, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-foreground">{rep.achievement}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-3">
                        <Badge
                          variant="outline"
                          className={`border-none font-semibold text-[10px] py-0.5 ${rep.status === "Exceeded"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : rep.status === "On Target"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                              : "bg-destructive/10 text-destructive"
                            }`}
                        >
                          {rep.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Stage Distribution Bar List */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Pipeline stage breakdown</CardTitle>
            <CardDescription className="text-xs">Value distribution by pipeline stage</CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 py-4 my-auto">
            {pipelineStages.map((item: any) => {
              const maxValue = Math.max(...pipelineStages.map((p: any) => p.value));
              const percentage = (item.value / maxValue) * 100;
              return (
                <div key={item.stage} className="space-y-1.5 group">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                      {item.stage} ({item.count})
                    </span>
                    <span className="font-semibold text-foreground">
                      ${(item.value / 1000).toFixed(0)}k
                    </span>
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
            <span>Largest Stage</span>
            <span className="font-semibold text-foreground">Qualified Leads (43%)</span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
