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
  MoreVertical,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Sample Analytics Data
const salesData = [
  { month: "Jan", revenue: 42000, target: 35000 },
  { month: "Feb", revenue: 48000, target: 38000 },
  { month: "Mar", revenue: 55000, target: 40000 },
  { month: "Apr", revenue: 51000, target: 42000 },
  { month: "May", revenue: 68000, target: 45000 },
  { month: "Jun", revenue: 74000, target: 50000 },
  { month: "Jul", revenue: 89000, target: 55000 },
];

const leadSourceData = [
  { name: "Organic Search", leads: 420 },
  { name: "Direct Outreach", leads: 310 },
  { name: "Paid Campaigns", leads: 250 },
  { name: "Referrals", leads: 180 },
];

const recentDeals = [
  {
    company: "Acme Corp",
    contact: "Sarah Jenkins",
    val: "$45,000",
    stage: "Closed Won",
    stageColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    date: "10 mins ago",
  },
  {
    company: "Nexus AI Inc",
    contact: "David Miller",
    val: "$28,500",
    stage: "Proposal Sent",
    stageColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    date: "1 hour ago",
  },
  {
    company: "Starlight Media",
    contact: "Elena Rostova",
    val: "$62,000",
    stage: "Negotiation",
    stageColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    date: "3 hours ago",
  },
  {
    company: "Vanguard Tech",
    contact: "James Thorne",
    val: "$18,000",
    stage: "Contacted",
    stageColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    date: "Yesterday",
  },
];

const recentActivities = [
  {
    icon: PhoneCall,
    color: "text-blue-500 bg-blue-500/10",
    title: "Call Logged with Sarah Jenkins",
    desc: "Discussed enterprise license pricing tier and SLA conditions.",
    time: "25m ago",
  },
  {
    icon: Mail,
    color: "text-purple-500 bg-purple-500/10",
    title: "Proposal Email Sent to David Miller",
    desc: "Sent PDF contract v2.4 with updated payment terms.",
    time: "2h ago",
  },
  {
    icon: Calendar,
    color: "text-emerald-500 bg-emerald-500/10",
    title: "Demo Scheduled with Horizon Logistics",
    desc: "Scheduled technical demo session with engineering leads.",
    time: "4h ago",
  },
];

export default function SalesAnalyticsDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Title & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">CRM Analytics & Revenue</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Real-time pipeline performance, revenue trends, and sales velocity metrics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border bg-[hsl(var(--card))] px-3 py-2 text-sm font-medium hover:bg-[hsl(var(--accent))] transition-colors">
            Export Report
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-3.5 py-2 text-sm font-medium shadow-sm hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" /> Add New Lead
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="rounded-xl border bg-[hsl(var(--card))] p-5 shadow-xs transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight">$89,450</span>
            <span className="flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="mr-0.5 h-3.5 w-3.5" /> +18.4%
            </span>
          </div>
          <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">vs $75,200 last month</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border bg-[hsl(var(--card))] p-5 shadow-xs transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
              Active Leads
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--primary))/10] text-[hsl(var(--primary))]">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight">1,160</span>
            <span className="flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="mr-0.5 h-3.5 w-3.5" /> +8.2%
            </span>
          </div>
          <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">142 new this week</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border bg-[hsl(var(--card))] p-5 shadow-xs transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
              Win Rate
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <Target className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight">34.2%</span>
            <span className="flex items-center text-xs font-medium text-rose-600 dark:text-rose-400">
              <ArrowDownRight className="mr-0.5 h-3.5 w-3.5" /> -1.5%
            </span>
          </div>
          <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Target benchmark: 35%</p>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border bg-[hsl(var(--card))] p-5 shadow-xs transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
              Avg Deal Size
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight">$38,600</span>
            <span className="flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="mr-0.5 h-3.5 w-3.5" /> +12.1%
            </span>
          </div>
          <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Up from $34.4k average</p>
        </div>
      </div>

      {/* Main Revenue Chart & Lead Source Breakdown */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 rounded-xl border bg-[hsl(var(--card))] p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-base">Revenue Growth & Target Trajectory</h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Monthly total revenue vs target benchmark</p>
            </div>
            <select className="rounded-md border bg-[hsl(var(--background))] px-2.5 py-1 text-xs font-medium">
              <option>Last 7 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[280px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2.5} fillOpacity={1} fill="url(#revenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Source Bar Chart */}
        <div className="rounded-xl border bg-[hsl(var(--card))] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base">Lead Generation Channels</h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Total leads per source channel</p>
          </div>
          <div className="h-[240px] w-full my-auto pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadSourceData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="leads" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="pt-3 border-t text-xs text-[hsl(var(--muted-foreground))] flex justify-between items-center">
            <span>Top Performing Channel</span>
            <span className="font-semibold text-[hsl(var(--foreground))]">Organic Search (36%)</span>
          </div>
        </div>
      </div>

      {/* Recent Deals Table & Activity Timeline */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Deals */}
        <div className="lg:col-span-2 rounded-xl border bg-[hsl(var(--card))] p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-base">Recent High-Value Deals</h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Latest deal movements in your pipeline</p>
            </div>
            <button className="text-xs font-medium text-[hsl(var(--primary))] hover:underline">View All Deals →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b bg-[hsl(var(--muted))/50] text-[hsl(var(--muted-foreground))] uppercase font-medium">
                <tr>
                  <th className="py-2.5 px-3">Company</th>
                  <th className="py-2.5 px-3">Contact</th>
                  <th className="py-2.5 px-3">Value</th>
                  <th className="py-2.5 px-3">Stage</th>
                  <th className="py-2.5 px-3 text-right">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentDeals.map((deal, idx) => (
                  <tr key={idx} className="hover:bg-[hsl(var(--accent))] transition-colors">
                    <td className="py-3 px-3 font-semibold">{deal.company}</td>
                    <td className="py-3 px-3 text-[hsl(var(--muted-foreground))]">{deal.contact}</td>
                    <td className="py-3 px-3 font-medium">{deal.val}</td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border ${deal.stageColor}`}>
                        {deal.stage}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-[hsl(var(--muted-foreground))]">{deal.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="rounded-xl border bg-[hsl(var(--card))] p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-base">Live Team Activity Feed</h3>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((act, idx) => {
              const Icon = act.icon;
              return (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${act.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>{act.title}</span>
                      <span className="text-[10px] font-normal text-[hsl(var(--muted-foreground))]">{act.time}</span>
                    </div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">{act.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
