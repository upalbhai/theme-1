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
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

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

const columns: ColumnDef<Customer>[] = [
  {
    header: "Customer",
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white font-bold text-xs shadow-xs", row.avatarBg)}>
          {row.name.substring(0, 2).toUpperCase()}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm text-foreground transition-colors">
            {row.name}
          </span>
          <span className="text-xs text-muted-foreground">{row.email}</span>
        </div>
      </div>
    ),
  },
  {
    header: "Company",
    render: (row) => (
      <div className="flex items-center gap-1.5 font-medium text-foreground">
        <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
        {row.company}
      </div>
    ),
  },
  {
    header: "Status",
    render: (row) => (
      <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold border", statusBadgeStyles[row.status])}>
        {row.status}
      </span>
    ),
  },
  {
    header: "Lifetime Value (LTV)",
    render: (row) => (
      <span className="font-bold text-emerald-600 dark:text-emerald-400">
        ${row.ltv.toLocaleString()}
      </span>
    ),
  },
  {
    header: "Deals",
    render: (row) => (
      <span className="font-medium">
        {row.dealsCount} {row.dealsCount === 1 ? "Deal" : "Deals"}
      </span>
    ),
  },
  {
    header: "Last Contacted",
    render: (row) => <span className="text-muted-foreground">{row.lastContacted}</span>,
  },
  {
    header: <div className="text-right">Actions</div>,
    className: "text-right",
    render: (row) => (
      <div className="flex items-center justify-end gap-1">
        <Button variant="outline" size="icon" className="h-7 w-7 border" title="Send Email">
          <Mail className="h-3.5 w-3.5" />
        </Button>
        <Button variant="outline" size="icon" className="h-7 w-7 border" title="Call Contact">
          <Phone className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <MoreVertical className="h-3.5 w-3.5" />
        </Button>
      </div>
    ),
  },
];

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
          <p className="text-sm text-muted-foreground">
            Complete database of client relationships, lifetime value, and communication history.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" /> Export Contacts CSV
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" /> Add Customer
          </Button>
        </div>
      </div>

      {/* Reusable Data Table component */}
      <DataTable
        columns={columns}
        data={filteredCustomers}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholderText="Search by customer name, company, or email..."
        filters={
          <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
            <Filter className="h-3.5 w-3.5" /> All Statuses
          </Button>
        }
      />
    </div>
  );
}
