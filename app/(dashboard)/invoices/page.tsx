"use client";

import React, { useState } from "react";
import { Download, Plus, Search, FileText, CheckCircle2, AlertCircle, Clock, MoreHorizontal, Filter, Trash2, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { AnimatedGroup } from "@/components/core/animated-group";
import { AnimatedNumber } from "@/components/core/animated-number";
import { Magnetic } from "@/components/core/magnetic";

const INITIAL_INVOICES = [
  { id: "INV-2026-001", client: "Acme Corporation", amount: 12500, date: "Sep 12, 2026", status: "Paid" },
  { id: "INV-2026-002", client: "Globex Inc", amount: 4200, date: "Sep 10, 2026", status: "Pending" },
  { id: "INV-2026-003", client: "Soylent Corp", amount: 8950, date: "Aug 28, 2026", status: "Overdue" },
  { id: "INV-2026-004", client: "Initech", amount: 1100, date: "Aug 15, 2026", status: "Paid" },
  { id: "INV-2026-005", client: "Umbrella Corporation", amount: 24000, date: "Aug 02, 2026", status: "Paid" },
  { id: "INV-2026-006", client: "Stark Industries", amount: 150000, date: "Jul 20, 2026", status: "Pending" },
];

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  
  // New Invoice State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newStatus, setNewStatus] = useState("Pending");

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "Paid": return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "Pending": return <Clock className="h-4 w-4 text-amber-500" />;
      case "Overdue": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Paid": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "Pending": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "Overdue": return "bg-red-500/10 text-red-600 border-red-500/20";
      default: return "";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.trim() || !newAmount.trim() || isNaN(Number(newAmount))) return;
    
    const newInvoice = {
      id: `INV-2026-${String(invoices.length + 1).padStart(3, '0')}`,
      client: newClient,
      amount: Number(newAmount),
      date: "Just now",
      status: newStatus
    };
    
    setInvoices([newInvoice, ...invoices]);
    setNewClient("");
    setNewAmount("");
    setNewStatus("Pending");
    setIsModalOpen(false);
  };
  
  const deleteInvoice = (id: string) => {
    setInvoices(invoices.filter(inv => inv.id !== id));
  };
  
  const markAsPaid = (id: string) => {
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: "Paid" } : inv));
  };

  const filteredInvoices = invoices.filter(inv => 
    inv.client.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inv.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const invoiceColumns: ColumnDef<(typeof INITIAL_INVOICES)[0]>[] = [
    {
      header: "Invoice ID",
      className: "px-6 py-4 font-medium pl-6",
      render: (invoice) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" /> {invoice.id}
        </div>
      ),
    },
    {
      header: "Client",
      accessorKey: "client",
      className: "px-6 py-4 font-semibold",
    },
    {
      header: "Amount",
      className: "px-6 py-4 font-medium",
      render: (invoice) => formatCurrency(invoice.amount),
    },
    {
      header: "Date Issued",
      accessorKey: "date",
      className: "px-6 py-4 text-muted-foreground",
    },
    {
      header: "Status",
      className: "px-6 py-4",
      render: (invoice) => (
        <Badge variant="outline" className={`gap-1.5 font-medium ${getStatusBadge(invoice.status)}`}>
          {getStatusIcon(invoice.status)}
          {invoice.status}
        </Badge>
      ),
    },
    {
      header: "",
      id: "actions",
      className: "px-6 py-4 text-right pr-6",
      render: (invoice) => (
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {invoice.status !== "Paid" && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => markAsPaid(invoice.id)} 
              className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
              title="Mark as Paid"
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => deleteInvoice(invoice.id)} 
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            title="Delete Invoice"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
  
  const totalOutstanding = invoices.filter(i => i.status !== "Paid").reduce((acc, curr) => acc + curr.amount, 0);
  const totalOverdue = invoices.filter(i => i.status === "Overdue").reduce((acc, curr) => acc + curr.amount, 0);
  const totalPaid = invoices.filter(i => i.status === "Paid").reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage billing, track payments, and send invoices.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-background gap-2 hidden sm:flex">
            <Download className="h-4 w-4" /> Export
          </Button>
          
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger render={
              <Magnetic springOptions={{ bounce: 0.1 }}>
                <Button className="gap-2 shadow-md shadow-primary/20 shrink-0">
                  <Plus className="h-4 w-4" /> Create Invoice
                </Button>
              </Magnetic>
            } />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateInvoice} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client Name</Label>
                  <Input 
                    id="client" 
                    placeholder="e.g. Acme Corporation" 
                    value={newClient}
                    onChange={e => setNewClient(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input 
                    id="amount" 
                    type="number"
                    placeholder="0.00" 
                    value={newAmount}
                    onChange={e => setNewAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="flex gap-2">
                    {["Pending", "Paid", "Overdue"].map(s => (
                      <Button 
                        key={s} 
                        type="button" 
                        variant={newStatus === s ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setNewStatus(s)}
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <DialogClose render={<Button type="button" variant="ghost">Cancel</Button>} />
                  <Button type="submit" disabled={!newClient.trim() || !newAmount.trim()}>Generate Invoice</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <AnimatedGroup preset="scale" className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="border-border/50 shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              $<AnimatedNumber value={totalOutstanding} />
            </div>
            <p className="text-xs text-amber-500 mt-1 flex items-center gap-1 font-medium">
               {invoices.filter(i => i.status === "Pending").length} Invoices Pending
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500 flex items-center">
              $<AnimatedNumber value={totalOverdue} />
            </div>
            <p className="text-xs text-red-500/80 mt-1 flex items-center gap-1 font-medium">
               {invoices.filter(i => i.status === "Overdue").length} Invoices Overdue
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid (Total)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500 flex items-center">
              $<AnimatedNumber value={totalPaid} />
            </div>
            <p className="text-xs text-emerald-500/80 mt-1 flex items-center gap-1 font-medium">
               {invoices.filter(i => i.status === "Paid").length} Invoices Paid
            </p>
          </CardContent>
        </Card>
      </AnimatedGroup>

      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>Invoice History</CardTitle>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search invoices..." 
                  className="pl-9 bg-muted/30"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="shrink-0"><Filter className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={invoiceColumns}
            data={filteredInvoices}
            className="border-none shadow-none bg-transparent"
            hidePagination
          />
        </CardContent>
      </Card>
    </div>
  );
}
