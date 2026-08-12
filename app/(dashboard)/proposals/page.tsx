"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  FileSpreadsheet, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Send, 
  MoreVertical, 
  Eye, 
  Pencil, 
  Trash2, 
  Copy, 
  DollarSign,
  Building2,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
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

interface Proposal {
  id: string;
  title: string;
  client: string;
  company: string;
  avatar: string;
  amount: string;
  date: string;
  validUntil: string;
  status: "Accepted" | "Pending" | "Declined" | "Draft";
}

const INITIAL_PROPOSALS: Proposal[] = [
  { id: "PROP-801", title: "Enterprise SaaS License & Setup", client: "Sarah Jenkins", company: "Apex Corp", avatar: "SJ", amount: "$45,000", date: "Oct 10, 2026", validUntil: "Nov 10, 2026", status: "Accepted" },
  { id: "PROP-802", title: "UI/UX Redesign & Frontend System", client: "Michael Vance", company: "Nexus Systems", avatar: "MV", amount: "$28,500", date: "Oct 08, 2026", validUntil: "Nov 08, 2026", status: "Pending" },
  { id: "PROP-803", title: "Cloud Infrastructure Migration", client: "Elena Rostova", company: "CyberShield", avatar: "ER", amount: "$36,000", date: "Oct 05, 2026", validUntil: "Nov 05, 2026", status: "Accepted" },
  { id: "PROP-804", title: "Mobile Banking Security Audit", client: "Jonathan Sterling", company: "Vanguard", avatar: "JS", amount: "$52,000", date: "Sep 28, 2026", validUntil: "Oct 28, 2026", status: "Declined" },
  { id: "PROP-805", title: "AI Integration & Machine Learning Pipeline", client: "Marcus Brody", company: "Global Logistics", avatar: "MB", amount: "$64,000", date: "Sep 22, 2026", validUntil: "Oct 22, 2026", status: "Pending" },
  { id: "PROP-806", title: "E-Commerce Payment Gateway Integration", client: "Sophia Chen", company: "BioHealth", avatar: "SC", amount: "$18,500", date: "Sep 15, 2026", validUntil: "Oct 15, 2026", status: "Draft" },
];

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>(INITIAL_PROPOSALS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isOpen, setIsOpen] = useState(false);

  // New proposal form state
  const [newTitle, setNewTitle] = useState("");
  const [newClient, setNewClient] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newStatus, setNewStatus] = useState<"Accepted" | "Pending" | "Declined" | "Draft">("Pending");

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newClient.trim() || !newAmount.trim()) return;

    const initials = newClient.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "CL";
    const newProp: Proposal = {
      id: `PROP-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      client: newClient,
      company: newCompany || "Client Org",
      avatar: initials,
      amount: newAmount.startsWith("$") ? newAmount : `$${newAmount}`,
      date: "Today",
      validUntil: "30 Days",
      status: newStatus,
    };

    setProposals([newProp, ...proposals]);
    setNewTitle("");
    setNewClient("");
    setNewCompany("");
    setNewAmount("");
    setNewStatus("Pending");
    setIsOpen(false);
  };

  const deleteProposal = (id: string) => {
    setProposals(proposals.filter(p => p.id !== id));
  };

  const filteredProposals = proposals.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Proposal["status"]) => {
    switch (status) {
      case "Accepted":
        return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-none">Accepted</Badge>;
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-none">Pending Review</Badge>;
      case "Declined":
        return <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-none">Declined</Badge>;
      default:
        return <Badge variant="outline" className="text-muted-foreground">Draft</Badge>;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-[1600px] mx-auto w-full bg-slate-50/50 dark:bg-slate-950/20">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Finance</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Proposals</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-2xl font-bold tracking-tight mt-2">Proposal Management</h2>
        </div>

        {/* Create Proposal Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger render={
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20">
              <Plus className="h-4 w-4" /> Create Proposal
            </Button>
          } />
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Proposal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateProposal} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="prop-title">Proposal Title</Label>
                <Input 
                  id="prop-title" 
                  placeholder="e.g. Enterprise Cloud Redesign" 
                  value={newTitle} 
                  onChange={e => setNewTitle(e.target.value)} 
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prop-client">Client Name</Label>
                  <Input 
                    id="prop-client" 
                    placeholder="John Doe" 
                    value={newClient} 
                    onChange={e => setNewClient(e.target.value)} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prop-company">Company</Label>
                  <Input 
                    id="prop-company" 
                    placeholder="Acme Corp" 
                    value={newCompany} 
                    onChange={e => setNewCompany(e.target.value)} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prop-amount">Estimated Value ($)</Label>
                  <Input 
                    id="prop-amount" 
                    placeholder="25000" 
                    value={newAmount} 
                    onChange={e => setNewAmount(e.target.value)} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Initial Status</Label>
                  <select 
                    value={newStatus} 
                    onChange={e => setNewStatus(e.target.value as Proposal["status"])}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="Pending">Pending Review</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <DialogFooter className="pt-4">
                <DialogClose render={<Button type="button" variant="ghost">Cancel</Button>} />
                <Button type="submit" disabled={!newTitle.trim() || !newClient.trim() || !newAmount.trim()}>
                  Save Proposal
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm border border-border/60">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Total Proposals</p>
              <h3 className="text-2xl font-bold tracking-tight mt-1">{proposals.length}</h3>
              <p className="text-xs text-muted-foreground mt-1">Valued at $195.5K total</p>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-border/60">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Accepted Deals</p>
              <h3 className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 mt-1">
                {proposals.filter(p => p.status === "Accepted").length}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">High conversion rate</p>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <CheckCircle2 className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-border/60">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Pending Review</p>
              <h3 className="text-2xl font-bold tracking-tight text-amber-600 dark:text-amber-400 mt-1">
                {proposals.filter(p => p.status === "Pending").length}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">Awaiting client response</p>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
              <Clock className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-border/60">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Declined / Expired</p>
              <h3 className="text-2xl font-bold tracking-tight text-rose-600 dark:text-rose-400 mt-1">
                {proposals.filter(p => p.status === "Declined").length}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">Requires follow-up</p>
            </div>
            <div className="p-3 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl">
              <XCircle className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Card: Search, Tabs, Table */}
      <Card className="shadow-sm border border-border/60">
        <CardHeader className="pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search proposals by title, client, or ID..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="pl-9"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex bg-muted/60 p-1 rounded-xl text-xs font-medium self-start sm:self-auto">
            {["All", "Accepted", "Pending", "Declined", "Draft"].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  statusFilter === status 
                    ? "bg-background text-foreground shadow-xs font-semibold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Proposal ID & Title</TableHead>
                <TableHead>Client & Company</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProposals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No proposals found matching your filter criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProposals.map((prop) => (
                  <TableRow key={prop.id} className="hover:bg-muted/40">
                    <TableCell>
                      <div className="space-y-0.5">
                        <span className="font-mono text-xs text-muted-foreground font-semibold block">{prop.id}</span>
                        <span className="font-bold text-sm text-foreground line-clamp-1">{prop.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-[10px] bg-primary/10 text-primary">{prop.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-semibold text-xs block leading-tight">{prop.client}</span>
                          <span className="text-[10px] text-muted-foreground">{prop.company}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-sm">{prop.amount}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{prop.date}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{prop.validUntil}</TableCell>
                    <TableCell>{getStatusBadge(prop.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger render={
                          <Button variant="ghost" size="icon-sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        } />
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> Preview Proposal</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2"><Send className="h-4 w-4" /> Send to Client</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2"><Copy className="h-4 w-4" /> Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-rose-600" onClick={() => deleteProposal(prop.id)}>
                            <Trash2 className="h-4 w-4" /> Delete Proposal
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
