"use client";

import * as React from "react";
import { Plus, MoreHorizontal, DollarSign, User, Building, Calendar, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  contact: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
}

interface Column {
  id: string;
  title: string;
  deals: Deal[];
  color: string;
}

const initialPipeline: Column[] = [
  {
    id: "new",
    title: "New Lead",
    color: "border-t-slate-500",
    deals: [
      {
        id: "d1",
        title: "Enterprise SaaS Tier Migration",
        company: "Starlight Digital",
        value: 35000,
        contact: "Elena Rostova",
        priority: "High",
        dueDate: "Aug 15",
      },
      {
        id: "d2",
        title: "API Gateway Integration",
        company: "Quantum Labs",
        value: 12000,
        contact: "Mark Vance",
        priority: "Low",
        dueDate: "Aug 20",
      },
    ],
  },
  {
    id: "contacted",
    title: "Contacted / Qualified",
    color: "border-t-blue-500",
    deals: [
      {
        id: "d3",
        title: "Cloud Infrastructure Audit",
        company: "Vanguard Tech",
        value: 24500,
        contact: "James Thorne",
        priority: "Medium",
        dueDate: "Aug 12",
      },
    ],
  },
  {
    id: "proposal",
    title: "Proposal Sent",
    color: "border-t-purple-500",
    deals: [
      {
        id: "d4",
        title: "Custom CRM Deployment",
        company: "Nexus AI Inc",
        value: 58000,
        contact: "David Miller",
        priority: "High",
        dueDate: "Aug 18",
      },
    ],
  },
  {
    id: "negotiation",
    title: "Negotiation",
    color: "border-t-amber-500",
    deals: [
      {
        id: "d5",
        title: "Multi-year Support Contract",
        company: "Acme Corp",
        value: 92000,
        contact: "Sarah Jenkins",
        priority: "High",
        dueDate: "Aug 11",
      },
    ],
  },
  {
    id: "won",
    title: "Closed Won",
    color: "border-t-emerald-500",
    deals: [
      {
        id: "d6",
        title: "Mobile App Development",
        company: "Fintech Express",
        value: 46000,
        contact: "Robert Paul",
        priority: "Medium",
        dueDate: "Aug 05",
      },
    ],
  },
];

const priorityStyles = {
  High: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Low: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
};

export default function DealsPipelinePage() {
  const [pipeline, setPipeline] = React.useState(initialPipeline);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales Deals Pipeline</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Manage, track, and progress leads across active pipeline stages.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-lg border bg-[hsl(var(--card))] px-3 py-1.5 text-xs font-semibold">
            Total Pipeline Value:{" "}
            <span className="text-[hsl(var(--primary))] font-bold">$267,500</span>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-3.5 py-2 text-sm font-medium shadow-sm hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" /> Create Deal
          </button>
        </div>
      </div>

      {/* Kanban Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
        {pipeline.map((col) => {
          const totalColValue = col.deals.reduce((acc, d) => acc + d.value, 0);
          return (
            <div
              key={col.id}
              className={cn(
                "rounded-xl border bg-[hsl(var(--card))] p-3 shadow-xs border-t-4",
                col.color
              )}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-xs uppercase tracking-wider">{col.title}</h3>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--muted))] text-[10px] font-bold">
                    {col.deals.length}
                  </span>
                </div>
                <button className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              {/* Column Subtotal */}
              <div className="text-[11px] font-medium text-[hsl(var(--muted-foreground))] mb-3">
                Subtotal: <span className="font-bold text-[hsl(var(--foreground))]">${totalColValue.toLocaleString()}</span>
              </div>

              {/* Deal Cards */}
              <div className="space-y-3">
                {col.deals.map((deal) => (
                  <div
                    key={deal.id}
                    className="group rounded-lg border bg-[hsl(var(--background))] p-3 shadow-xs hover:shadow-md hover:border-[hsl(var(--primary))/50] transition-all cursor-pointer space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-xs leading-snug group-hover:text-[hsl(var(--primary))] transition-colors">
                        {deal.title}
                      </h4>
                      <span className={cn("rounded-md px-1.5 py-0.5 text-[9px] font-bold border shrink-0", priorityStyles[deal.priority])}>
                        {deal.priority}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <DollarSign className="h-3.5 w-3.5 -mr-1" />
                      {deal.value.toLocaleString()}
                    </div>

                    <div className="space-y-1 pt-1 border-t text-[11px] text-[hsl(var(--muted-foreground))]">
                      <div className="flex items-center gap-1.5">
                        <Building className="h-3 w-3 shrink-0" />
                        <span className="truncate">{deal.company}</span>
                      </div>
                      <div className="flex items-center justify-between pt-0.5">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" /> {deal.contact}
                        </span>
                        <span className="flex items-center gap-1 text-[10px]">
                          <Calendar className="h-3 w-3" /> {deal.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Deal Button */}
              <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed p-2 text-xs font-medium text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))] transition-colors">
                <Plus className="h-3.5 w-3.5" /> Add Deal
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
