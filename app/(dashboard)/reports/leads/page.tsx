"use client";

import React, { useState } from "react";
import { 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight,
  Building2,
  Mail, 
  Phone, 
  MoreHorizontal, 
  Search,
  Calendar,
  Clock,
  ExternalLink,
  CheckCircle2,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { toast } from "sonner";

interface LeadKPI {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  benchmark: string;
}

const KPI_DATA: LeadKPI[] = [
  { 
    title: "Total Inbound Leads", 
    value: "3,842", 
    trend: "+18.4%", 
    isPositive: true,
    benchmark: "vs. 3,245 last month" 
  },
  { 
    title: "Lead-to-Opportunity Rate", 
    value: "28.6%", 
    trend: "+4.2%", 
    isPositive: true,
    benchmark: "vs. 24.4% Q2 avg" 
  },
  { 
    title: "Avg. First Response Time", 
    value: "18m", 
    trend: "-24.0%", 
    isPositive: true,
    benchmark: "vs. 24m target SLA" 
  },
  { 
    title: "Pipeline Value Generated", 
    value: "$1.48M", 
    trend: "+22.5%", 
    isPositive: true,
    benchmark: "vs. $1.21M target" 
  },
];

const MONTHLY_LEAD_TREND = [
  { month: "Jan", inbound: 240, qualified: 82 },
  { month: "Feb", inbound: 290, qualified: 98 },
  { month: "Mar", inbound: 340, qualified: 115 },
  { month: "Apr", inbound: 310, qualified: 104 },
  { month: "May", inbound: 380, qualified: 132 },
  { month: "Jun", inbound: 420, qualified: 148 },
  { month: "Jul", inbound: 390, qualified: 136 },
  { month: "Aug", inbound: 460, qualified: 165 },
  { month: "Sep", inbound: 510, qualified: 188 },
];

const CHANNEL_ATTRIBUTION = [
  { channel: "Enterprise Inbound", leads: 1420, share: 37, cpl: "$84" },
  { channel: "Partner Referrals", leads: 980, share: 26, cpl: "$52" },
  { channel: "Executive Events", leads: 690, share: 18, cpl: "$145" },
  { channel: "Outbound SDR", leads: 480, share: 12, cpl: "$110" },
  { channel: "Organic Content", leads: 272, share: 7, cpl: "$28" },
];

interface EnterpriseLead {
  id: string;
  company: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  source: string;
  stage: "Discovery" | "Qualified" | "Proposal" | "Negotiation" | "Won";
  salesRep: { name: string; initials: string };
  estValue: string;
  lastContact: string;
}

const ENTERPRISE_LEADS: EnterpriseLead[] = [
  {
    id: "LD-8742",
    company: "Northwind Logistics",
    contactName: "Marcus Vance",
    contactEmail: "m.vance@northwind.io",
    contactPhone: "+1 (415) 890-4421",
    source: "Enterprise Inbound",
    stage: "Qualified",
    salesRep: { name: "Alex Morgan", initials: "AM" },
    estValue: "$48,500",
    lastContact: "Today, 10:30 AM"
  },
  {
    id: "LD-8743",
    company: "Apex Cybernetics",
    contactName: "Dr. Elena Rostova",
    contactEmail: "elena@apex-cyber.com",
    contactPhone: "+1 (650) 334-9021",
    source: "Partner Referral",
    stage: "Proposal",
    salesRep: { name: "Sarah Jenkins", initials: "SJ" },
    estValue: "$62,000",
    lastContact: "Yesterday"
  },
  {
    id: "LD-8744",
    company: "Starlight Healthcare",
    contactName: "Julian Thorne",
    contactEmail: "j.thorne@starlight-health.org",
    contactPhone: "+1 (212) 554-1890",
    source: "Executive Event",
    stage: "Negotiation",
    salesRep: { name: "David Chen", initials: "DC" },
    estValue: "$34,000",
    lastContact: "Sep 12, 2026"
  },
  {
    id: "LD-8745",
    company: "Vanguard Financial",
    contactName: "Caroline Scott",
    contactEmail: "cscott@vanguard-corp.net",
    contactPhone: "+1 (312) 887-2195",
    source: "Enterprise Inbound",
    stage: "Won",
    salesRep: { name: "Alex Morgan", initials: "AM" },
    estValue: "$85,000",
    lastContact: "Sep 10, 2026"
  },
  {
    id: "LD-8746",
    company: "Horizon Media Group",
    contactName: "Kofi Mensah",
    contactEmail: "kmensah@horizon-media.com",
    contactPhone: "+1 (206) 441-7823",
    source: "Organic Content",
    stage: "Discovery",
    salesRep: { name: "Sarah Jenkins", initials: "SJ" },
    estValue: "$29,500",
    lastContact: "Sep 09, 2026"
  }
];

const UPCOMING_DISCOVERY_CALLS = [
  {
    date: "Sep 15",
    time: "11:00 AM – 11:45 AM",
    company: "Acrobat Robotics",
    contact: "Liam Hayes (VP Infrastructure)",
    leadSource: "Enterprise Inbound"
  },
  {
    date: "Sep 16",
    time: "02:30 PM – 03:15 PM",
    company: "Meridian BioLabs",
    contact: "Dr. Anika Patel (CTO)",
    leadSource: "Partner Referral"
  },
  {
    date: "Sep 17",
    time: "09:30 AM – 10:15 AM",
    company: "Titan Cloud Network",
    contact: "Devon Miller (Director of SecOps)",
    leadSource: "Executive Event"
  }
];

const STAGE_CONFIG = {
  Discovery: {
    label: "Discovery",
    badgeClass: "bg-muted text-foreground border-border/80"
  },
  Qualified: {
    label: "Qualified",
    badgeClass: "bg-blue-500/10 text-blue-800 dark:text-blue-300 border-blue-500/25"
  },
  Proposal: {
    label: "Proposal Sent",
    badgeClass: "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/25"
  },
  Negotiation: {
    label: "Negotiation",
    badgeClass: "bg-primary/10 text-primary border-primary/25"
  },
  Won: {
    label: "Deal Won",
    badgeClass: "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/25"
  }
};

export default function LeadsReportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<string>("all");

  const filteredLeads = ENTERPRISE_LEADS.filter(lead => {
    const matchesSearch = 
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = selectedStage === "all" || lead.stage === selectedStage;
    return matchesSearch && matchesStage;
  });

  const handleExport = () => {
    toast.success("Lead intelligence report exported to CSV");
  };

  const leadColumns: ColumnDef<EnterpriseLead>[] = [
    {
      header: "Company & Lead",
      className: "w-[260px] pl-4",
      render: (lead) => (
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs text-foreground">{lead.company}</span>
            <span className="text-[10px] font-mono text-muted-foreground">{lead.id}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {lead.contactName}
          </div>
        </div>
      ),
    },
    {
      header: "Source",
      className: "w-[170px]",
      render: (lead) => (
        <span className="text-xs text-muted-foreground font-medium">
          {lead.source}
        </span>
      ),
    },
    {
      header: "Contact",
      className: "w-[200px]",
      render: (lead) => (
        <div className="space-y-0.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 truncate">
            <Mail className="size-3 text-muted-foreground shrink-0" />
            <span className="truncate">{lead.contactEmail}</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <Phone className="size-3 text-muted-foreground shrink-0" />
            <span>{lead.contactPhone}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Stage",
      className: "w-[130px]",
      render: (lead) => {
        const config = STAGE_CONFIG[lead.stage];
        return (
          <Badge variant="outline" className={`text-[10px] font-medium ${config.badgeClass}`}>
            {config.label}
          </Badge>
        );
      },
    },
    {
      header: "Rep",
      className: "w-[110px]",
      render: (lead) => (
        <div className="flex items-center gap-2">
          <Avatar className="size-6 border border-background">
            <AvatarFallback className="text-[9px] font-mono bg-muted text-foreground">
              {lead.salesRep.initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-foreground font-medium">{lead.salesRep.name.split(" ")[0]}</span>
        </div>
      ),
    },
    {
      header: "Est. ARR",
      className: "w-[110px] text-right font-mono",
      render: (lead) => (
        <span className="text-xs font-semibold text-foreground font-mono tabular-nums">
          {lead.estValue}
        </span>
      ),
    },
    {
      header: "Last Touch",
      className: "w-[130px] text-right font-mono text-muted-foreground text-xs",
      accessorKey: "lastContact",
    },
    {
      header: "",
      className: "w-[50px] text-right pr-4",
      render: (lead) => (
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="size-3.5" />
            </Button>
          } />
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toast.success(`Opened dossier for ${lead.company}`)}>
              View Full Dossier
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.success(`Re-assigned rep for ${lead.company}`)}>
              Re-assign Lead Owner
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.success(`Stage progression updated`)}>
              Update Qualification Stage
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <Breadcrumb>
            <BreadcrumbList className="text-xs">
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard" className="text-muted-foreground hover:text-foreground">
                  Reports
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-foreground">
                  Leads & Acquisition
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-2 mt-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Leads Report</h1>
            <Badge variant="outline" className="text-xs font-mono font-medium text-muted-foreground border-border/70">
              Q3 2026
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Lead attribution, qualification velocity, and inbound pipeline health.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2.5">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExport}
            className="h-8.5 gap-1.5 px-3 text-xs font-medium border-border/70 hover:bg-muted/60"
          >
            <Download className="size-3.5 text-muted-foreground" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* 4 Balanced KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_DATA.map((kpi, idx) => (
          <Card key={idx} className="border-border/70 bg-card shadow-xs">
            <CardContent className="p-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                {kpi.title}
              </p>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-semibold tracking-tight text-foreground font-mono tabular-nums">
                  {kpi.value}
                </span>
                <div className={`flex items-center text-xs font-medium font-mono ${
                  kpi.isPositive ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'
                }`}>
                  {kpi.isPositive ? <ArrowUpRight className="size-3.5 mr-0.5" /> : <ArrowDownRight className="size-3.5 mr-0.5" />}
                  {kpi.trend}
                </div>
              </div>
              <p className="text-[11px] font-mono text-muted-foreground pt-1 border-t border-border/40">
                {kpi.benchmark}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dual Analytics Row: Volume Trend & Channel Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Lead Progression Area Chart (7 cols) */}
        <Card className="lg:col-span-7 border-border/70 bg-card shadow-xs">
          <CardHeader className="py-3.5 px-4 border-b border-border/60 bg-muted/20 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">
                Monthly Inbound & Qualification Volume
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Progression of raw inbound inquiries vs. sales-qualified opportunities.
              </CardDescription>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-primary" /> Inbound
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-muted-foreground" /> Qualified
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-6">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_LEAD_TREND} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="leadWash" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.6} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} 
                    dy={8} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} 
                    tickFormatter={(v) => `${v}`}
                  />
                  <Tooltip 
                    cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      borderColor: 'var(--border)', 
                      borderRadius: '8px',
                      fontSize: '12px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="inbound" 
                    stroke="var(--primary)" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#leadWash)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="qualified" 
                    stroke="var(--muted-foreground)" 
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fill="none" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Acquisition Channel Mix (5 cols) */}
        <Card className="lg:col-span-5 border-border/70 bg-card shadow-xs">
          <CardHeader className="py-3.5 px-4 border-b border-border/60 bg-muted/20 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">
                Attribution & Channel Efficiency
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Share of total lead volume alongside acquisition cost per lead (CPL).
              </CardDescription>
            </div>
            <span className="text-xs font-mono text-muted-foreground">3,842 total</span>
          </CardHeader>
          <CardContent className="p-4 space-y-3.5">
            {CHANNEL_ATTRIBUTION.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{item.channel}</span>
                  <div className="flex items-center gap-2 font-mono text-muted-foreground">
                    <span className="text-foreground font-semibold tabular-nums">{item.leads}</span>
                    <span>({item.share}%)</span>
                    <span>•</span>
                    <span className="text-primary font-medium">{item.cpl} CPL</span>
                  </div>
                </div>
                <div className="w-full bg-muted/60 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full rounded-full transition-all duration-300"
                    style={{ width: `${item.share}%` }} 
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Lower Section: Qualified Enterprise Leads & Discovery Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Enterprise Leads DataTable (8 cols) */}
        <Card className="lg:col-span-8 border-border/70 bg-card shadow-xs overflow-hidden">
          <CardHeader className="py-3.5 px-4 border-b border-border/60 bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">
                Qualified Enterprise Leads
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                High-intent prospects currently progressing through commercial discovery.
              </CardDescription>
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="size-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
                <Input 
                  placeholder="Filter company or rep..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 pl-8 text-xs w-[170px] sm:w-[200px]"
                />
              </div>

              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="h-8 rounded-lg border border-border/70 bg-card px-2.5 text-xs text-foreground font-medium focus:outline-none"
              >
                <option value="all">All Stages</option>
                <option value="Discovery">Discovery</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Won">Won</option>
              </select>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <DataTable
              columns={leadColumns}
              data={filteredLeads}
              className="border-none shadow-none bg-transparent"
              hidePagination
            />
          </CardContent>
        </Card>

        {/* Discovery Calls Schedule (4 cols) */}
        <Card className="lg:col-span-4 border-border/70 bg-card shadow-xs">
          <CardHeader className="py-3.5 px-4 border-b border-border/60 bg-muted/20 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-primary" />
              <CardTitle className="text-sm font-semibold text-foreground">
                Upcoming Discovery
              </CardTitle>
            </div>
            <span className="text-xs font-mono text-muted-foreground">3 scheduled</span>
          </CardHeader>
          <CardContent className="p-4 space-y-3.5">
            {UPCOMING_DISCOVERY_CALLS.map((call, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-border/60 bg-muted/15 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-primary">{call.date}</span>
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3" /> {call.time}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-foreground">{call.company}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{call.contact}</p>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[11px] text-muted-foreground">
                  <span>Source: {call.leadSource}</span>
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={() => toast.success(`Meeting details loaded for ${call.company}`)}
                    className="p-0 h-auto text-xs text-primary font-medium"
                  >
                    View Brief
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}