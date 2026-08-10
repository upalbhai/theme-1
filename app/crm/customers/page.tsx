"use client";

import * as React from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  Mail,
  Phone,
  Building2,
  Calendar,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: "Active Customer" | "Lead" | "Churned" | "Prospect";
  ltv: number;
  dealsCount: number;
  lastContacted: string;
  avatarBg: string;
}

const customersList: Customer[] = [
  {
    id: "c1",
    name: "Sarah Jenkins",
    email: "sarah.j@acmecorp.com",
    company: "Acme Corp",
    status: "Active Customer",
    ltv: 145000,
    dealsCount: 4,
    lastContacted: "Today, 10:45 AM",
    avatarBg: "bg-violet-600",
  },
  {
    id: "c2",
    name: "David Miller",
    email: "d.miller@nexusai.io",
    company: "Nexus AI Inc",
    status: "Lead",
    ltv: 28500,
    dealsCount: 1,
    lastContacted: "Yesterday",
    avatarBg: "bg-indigo-600",
  },
  {
    id: "c3",
    name: "Elena Rostova",
    email: "elena@starlight.media",
    company: "Starlight Media",
    status: "Active Customer",
    ltv: 89000,
    dealsCount: 3,
    lastContacted: "Aug 08, 2026",
    avatarBg: "bg-rose-600",
  },
  {
    id: "c4",
    name: "James Thorne",
    email: "j.thorne@vanguardtech.com",
    company: "Vanguard Tech",
    status: "Prospect",
    ltv: 18000,
    dealsCount: 2,
    lastContacted: "Aug 06, 2026",
    avatarBg: "bg-blue-600",
  },
  {
    id: "c5",
    name: "Marcus Aurelius",
    email: "marcus@imperium.io",
    company: "Imperium Global",
    status: "Active Customer",
    ltv: 210000,
    dealsCount: 6,
    lastContacted: "Aug 04, 2026",
    avatarBg: "bg-emerald-600",
  },
  {
    id: "c6",
    name: "Chloe Bennett",
    email: "chloe@apexdesign.co",
    company: "Apex Design Co",
    status: "Churned",
    ltv: 12000,
    dealsCount: 1,
    lastContacted: "Jul 22, 2026",
    avatarBg: "bg-amber-600",
  },
];

const statusBadgeStyles = {
  "Active Customer": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Lead: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Prospect: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  Churned: "bg-slate-500/10 text-slate-600 border-slate-500/20",
};

export default function CustomersDirectoryPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredCustomers = customersList.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customer Directory</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Complete database of client relationships, lifetime value, and communication history.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border bg-[hsl(var(--card))] px-3 py-2 text-sm font-medium hover:bg-[hsl(var(--accent))] transition-colors">
            <Download className="h-4 w-4" /> Export Contacts CSV
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-3.5 py-2 text-sm font-medium shadow-sm hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" /> Add Customer
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border bg-[hsl(var(--card))] p-4 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Search by customer name, company, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-lg border bg-[hsl(var(--background))] pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg border bg-[hsl(var(--background))] px-3 py-1.5 text-xs font-medium hover:bg-[hsl(var(--accent))]">
            <Filter className="h-3.5 w-3.5" /> All Statuses
          </button>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            Showing <span className="font-semibold text-[hsl(var(--foreground))]">{filteredCustomers.length}</span> contacts
          </span>
        </div>
      </div>

      {/* High Density Customer Data Table */}
      <div className="rounded-xl border bg-[hsl(var(--card))] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b bg-[hsl(var(--muted))/40] text-[hsl(var(--muted-foreground))] uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Lifetime Value (LTV)</th>
                <th className="py-3 px-4">Deals</th>
                <th className="py-3 px-4">Last Contacted</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-[hsl(var(--accent))] transition-colors group">
                  {/* Customer Info */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white font-bold text-xs shadow-xs", cust.avatarBg)}>
                        {cust.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                          {cust.name}
                        </span>
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">{cust.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="py-3.5 px-4 font-medium text-[hsl(var(--foreground))]">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
                      {cust.company}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4">
                    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold border", statusBadgeStyles[cust.status])}>
                      {cust.status}
                    </span>
                  </td>

                  {/* LTV */}
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                    ${cust.ltv.toLocaleString()}
                  </td>

                  {/* Deals Count */}
                  <td className="py-3.5 px-4 font-medium">
                    {cust.dealsCount} {cust.dealsCount === 1 ? "Deal" : "Deals"}
                  </td>

                  {/* Last Contacted */}
                  <td className="py-3.5 px-4 text-[hsl(var(--muted-foreground))]">
                    {cust.lastContacted}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="flex h-7 w-7 items-center justify-center rounded-md border hover:bg-[hsl(var(--background))]" title="Send Email">
                        <Mail className="h-3.5 w-3.5" />
                      </button>
                      <button className="flex h-7 w-7 items-center justify-center rounded-md border hover:bg-[hsl(var(--background))]" title="Call Contact">
                        <Phone className="h-3.5 w-3.5" />
                      </button>
                      <button className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-[hsl(var(--background))]">
                        <MoreVertical className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination */}
        <div className="flex items-center justify-between p-4 border-t bg-[hsl(var(--card))] text-xs text-[hsl(var(--muted-foreground))]">
          <span>Page 1 of 12 (72 Total Customers)</span>
          <div className="flex items-center gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-md border hover:bg-[hsl(var(--accent))]" disabled>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-md border hover:bg-[hsl(var(--accent))]">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
