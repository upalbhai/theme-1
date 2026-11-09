"use client";

import * as React from "react";
import {
  PhoneCall,
  Mail,
  Calendar,
  FileText,
  Send,
  User,
  Clock,
  Search,
  CheckCircle2,
  Filter,
  Plus,
  Building,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineNode,
  TimelineConnector,
  TimelineContent,
} from "@/components/ui/timeline";
import { toast } from "sonner";

interface Activity {
  id: string;
  type: "call" | "email" | "meeting" | "note";
  title: string;
  contact: string;
  company: string;
  timestamp: string;
  user: string;
  details: string;
}

const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: "a1",
    type: "call",
    title: "Discovery Call & Requirements Gathering",
    contact: "Sarah Jenkins",
    company: "Acme Corp",
    timestamp: "10 minutes ago",
    user: "Alex Morgan",
    details: "Conducted 30-min discovery call. Acme Corp wants to upgrade their current seat count from 50 to 250 enterprise seats before end of Q3.",
  },
  {
    id: "a2",
    type: "email",
    title: "Contract Proposal Sent (v2.4)",
    contact: "David Miller",
    company: "Nexus AI Inc",
    timestamp: "1 hour ago",
    user: "Alex Morgan",
    details: "Dispatched revised SLA agreement PDF containing annual billing discount schedule (15% off).",
  },
  {
    id: "a3",
    type: "meeting",
    title: "Technical Architecture Review",
    contact: "James Thorne",
    company: "Vanguard Tech",
    timestamp: "3 hours ago",
    user: "Elena Rostova",
    details: "Demonstrated multi-region database failover & custom webhooks integration with Senior VP of Engineering.",
  },
  {
    id: "a4",
    type: "call",
    title: "Follow-Up Security Review Call",
    contact: "Marcus Aurelius",
    company: "CloudScale Systems",
    timestamp: "4 hours ago",
    user: "David Ray",
    details: "Reviewed SOC 2 compliance checklist and enterprise VPC peering parameters. Next audit scheduled for Thursday.",
  },
  {
    id: "a5",
    type: "note",
    title: "Internal Deal Strategy Note",
    contact: "Maya Lin",
    company: "Imperium Global",
    timestamp: "Yesterday",
    user: "Sarah Jenkins",
    details: "Account executive confirmed budget approval for annual expansion. Procurement team will issue PO next Monday.",
  },
  {
    id: "a6",
    type: "meeting",
    title: "Product Roadmap Alignment Sync",
    contact: "Robert Taylor",
    company: "DataStream Corp",
    timestamp: "2 days ago",
    user: "Alex Morgan",
    details: "Walked through Q4 delivery milestones and real-time Kafka telemetry integration deliverables.",
  },
];

const ACTIVITY_CONFIG: Record<
  Activity["type"],
  { label: string; icon: React.ElementType; nodeColor: string; badgeColor: string }
> = {
  call: {
    label: "Call",
    icon: PhoneCall,
    nodeColor: "text-primary bg-primary/10 border-primary/25",
    badgeColor: "bg-primary/10 text-primary border-primary/20",
  },
  email: {
    label: "Email",
    icon: Mail,
    nodeColor: "text-sky-700 dark:text-sky-400 bg-sky-500/10 border-sky-500/25",
    badgeColor: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20",
  },
  meeting: {
    label: "Meeting",
    icon: Calendar,
    nodeColor: "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  },
  note: {
    label: "Note",
    icon: FileText,
    nodeColor: "text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/25",
    badgeColor: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  },
};

export default function ActivityTimelinePage() {
  const [activities, setActivities] = React.useState<Activity[]>(INITIAL_ACTIVITIES);
  const [activeTab, setActiveTab] = React.useState<"all" | Activity["type"]>("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Logger Form State
  const [logType, setLogType] = React.useState<Activity["type"]>("call");
  const [logTitle, setLogTitle] = React.useState("");
  const [logContact, setLogContact] = React.useState("");
  const [logCompany, setLogCompany] = React.useState("");
  const [logDetails, setLogDetails] = React.useState("");

  const handlePostActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logDetails.trim() && !logTitle.trim()) {
      toast.error("Please enter a summary or details for the activity.");
      return;
    }

    const newActivity: Activity = {
      id: `a-${Date.now()}`,
      type: logType,
      title: logTitle.trim() || `${ACTIVITY_CONFIG[logType].label} with ${logContact.trim() || "Customer"}`,
      contact: logContact.trim() || "Account Lead",
      company: logCompany.trim() || "Active Account",
      timestamp: "Just now",
      user: "Alex Morgan",
      details: logDetails.trim() || "Activity logged to feed.",
    };

    setActivities([newActivity, ...activities]);
    setLogTitle("");
    setLogContact("");
    setLogCompany("");
    setLogDetails("");
    toast.success("Activity logged to customer timeline.");
  };

  const filteredActivities = activities.filter((act) => {
    const matchesTab = activeTab === "all" || act.type === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const counts = {
    all: activities.length,
    call: activities.filter((a) => a.type === "call").length,
    email: activities.filter((a) => a.type === "email").length,
    meeting: activities.filter((a) => a.type === "meeting").length,
    note: activities.filter((a) => a.type === "note").length,
  };

  const filterTabs: Array<{ id: "all" | Activity["type"]; label: string; count: number }> = [
    { id: "all", label: "All Activity Log", count: counts.all },
    { id: "call", label: "Calls", count: counts.call },
    { id: "email", label: "Emails", count: counts.email },
    { id: "meeting", label: "Meetings", count: counts.meeting },
    { id: "note", label: "Notes", count: counts.note },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto w-full">
      {/* ─── 1. TOP HEADER & BREADCRUMB ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="space-y-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/crm/deals" className="text-xs">CRM</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xs font-mono">Activity Feed</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground font-heading">
            Customer Interactions & Feed
          </h1>
          <p className="text-xs text-muted-foreground">
            Chronological audit log tracking client calls, direct emails, stakeholder meetings, and internal deal notes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5 px-2.5 py-1 text-xs font-mono bg-card border-border/80 text-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Live Sync Active
          </Badge>
        </div>
      </div>

      {/* ─── 2. QUICK LOG INTERACTION CARD ────────────────────────────────────── */}
      <Card className="border-border/80 bg-card shadow-2xs">
        <form onSubmit={handlePostActivity}>
          <CardHeader className="p-4 pb-3 border-b border-border/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <CardTitle className="text-xs font-semibold font-heading uppercase tracking-wider text-muted-foreground">
                Quick Log Interaction
              </CardTitle>

              {/* Interaction Type Selector Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {(["call", "email", "meeting", "note"] as const).map((type) => {
                  const cfg = ACTIVITY_CONFIG[type];
                  const Icon = cfg.icon;
                  const isSelected = logType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setLogType(type)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-mono transition-colors border",
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary font-semibold shadow-2xs"
                          : "bg-muted/30 text-muted-foreground border-border/60 hover:text-foreground hover:bg-muted/60"
                      )}
                    >
                      <Icon className="size-3" />
                      {cfg.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <Input
                placeholder="Subject (e.g. Discovery call on seat expansion)..."
                value={logTitle}
                onChange={(e) => setLogTitle(e.target.value)}
                className="h-8 text-xs font-mono bg-background/50 border-border/80"
              />
              <Input
                placeholder="Contact (e.g. Sarah Jenkins)..."
                value={logContact}
                onChange={(e) => setLogContact(e.target.value)}
                className="h-8 text-xs font-mono bg-background/50 border-border/80"
              />
              <Input
                placeholder="Company (e.g. Acme Corp)..."
                value={logCompany}
                onChange={(e) => setLogCompany(e.target.value)}
                className="h-8 text-xs font-mono bg-background/50 border-border/80"
              />
            </div>

            <Textarea
              rows={2}
              placeholder="Log key discussion points, requirements, next action items, or agreement details..."
              value={logDetails}
              onChange={(e) => setLogDetails(e.target.value)}
              className="w-full resize-none text-xs leading-relaxed bg-background/50 border-border/80"
            />
          </CardContent>

          <CardFooter className="px-4 py-2.5 border-t border-border/60 bg-muted/20 flex items-center justify-between gap-3">
            <div className="text-[11px] text-muted-foreground font-mono">
              Logging as <strong className="text-foreground">Alex Morgan</strong> • Recorded automatically
            </div>
            <div className="flex items-center gap-2">
              {(logTitle || logContact || logCompany || logDetails) && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs text-muted-foreground font-mono"
                  onClick={() => {
                    setLogTitle("");
                    setLogContact("");
                    setLogCompany("");
                    setLogDetails("");
                  }}
                >
                  Clear
                </Button>
              )}
              <Button
                type="submit"
                size="sm"
                className="h-7 gap-1.5 text-xs font-mono bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xs"
              >
                <Send className="size-3" /> Post Activity
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>

      {/* ─── 3. FILTER TABS & SEARCH BAR (LEFT ALIGNED) ───────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border/60">
        {/* Left Segmented Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono transition-colors",
                  isActive
                    ? "bg-card text-foreground border border-border/80 shadow-2xs font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "rounded-md px-1.5 py-0.2 text-[10px] font-mono tabular-nums",
                    isActive ? "bg-muted text-foreground" : "text-muted-foreground/80"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Search feed..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-xs font-mono bg-card border-border/80"
          />
        </div>
      </div>

      {/* ─── 4. TIMELINE LIST (USING REUSABLE COMMON COMPONENT) ─────────────── */}
      <div className="w-full">
        {filteredActivities.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-border/80 rounded-xl bg-card">
            <p className="text-sm font-medium text-foreground">No matching customer interactions</p>
            <p className="text-xs text-muted-foreground mt-1">
              Try adjusting your search query or switching to another activity tab.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 text-xs font-mono border-border/80"
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <Timeline size="md">
            {filteredActivities.map((act) => {
              const cfg = ACTIVITY_CONFIG[act.type];
              const Icon = cfg.icon;

              return (
                <TimelineItem key={act.id}>
                  {/* Separator Column: perfectly aligns node and connector */}
                  <TimelineSeparator>
                    <TimelineNode className={cfg.nodeColor}>
                      <Icon className="size-3.5" />
                    </TimelineNode>
                    <TimelineConnector />
                  </TimelineSeparator>

                  {/* Content Container */}
                  <TimelineContent>
                    <Card className="border-border/80 bg-card shadow-2xs hover:border-border transition-colors">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <CardTitle className="text-sm font-semibold font-heading text-foreground">
                              {act.title}
                            </CardTitle>
                            <Badge
                              variant="outline"
                              className="font-mono text-[10px] px-1.5 py-0 border-border/80 text-muted-foreground"
                            >
                              {act.company}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={cn("font-mono text-[10px] px-1.5 py-0", cfg.badgeColor)}
                            >
                              {cfg.label}
                            </Badge>
                          </div>
                          <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground shrink-0">
                            <Clock className="size-3 text-muted-foreground/70" />
                            {act.timestamp}
                          </span>
                        </div>
                      </CardHeader>

                      <CardContent className="px-4 pb-3">
                        <CardDescription className="text-xs sm:text-sm leading-relaxed text-foreground">
                          {act.details}
                        </CardDescription>
                      </CardContent>

                      <CardFooter className="px-4 py-2 border-t border-border/50 bg-muted/15 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground font-mono">
                        <div className="flex items-center gap-1.5">
                          <User className="size-3 text-muted-foreground" />
                          <span>Contact:</span>
                          <strong className="text-foreground font-medium">{act.contact}</strong>
                        </div>
                        <div className="flex items-center gap-3">
                          <span>Logged by {act.user}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        )}
      </div>
    </div>
  );
}
