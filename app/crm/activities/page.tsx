"use client";

import * as React from "react";
import {
  PhoneCall,
  Mail,
  Calendar,
  FileText,
  Plus,
  Send,
  User,
  Clock,
  Filter,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

const initialActivities: Activity[] = [
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
    type: "note",
    title: "Internal Team Note Added",
    contact: "Marcus Aurelius",
    company: "Imperium Global",
    timestamp: "Yesterday",
    user: "Sarah Jenkins",
    details: "Account executive confirmed budget approval for annual expansion. Procurement team will issue PO next Monday.",
  },
];

const activityTypeConfig = {
  call: { icon: PhoneCall, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
  email: { icon: Mail, color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
  meeting: { icon: Calendar, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
  note: { icon: FileText, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
};

export default function ActivityTimelinePage() {
  const [activeTab, setActiveTab] = React.useState<"all" | "call" | "email" | "meeting" | "note">("all");
  const [noteContent, setNoteContent] = React.useState("");

  const filteredActivities = initialActivities.filter(
    (act) => activeTab === "all" || act.type === activeTab
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customer Interactions & Feed</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Chronological audit log of calls, emails, meetings, and team notes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Live Logging Active</span>
        </div>
      </div>

      {/* Quick Activity Logger Box */}
      <div className="rounded-xl border bg-[hsl(var(--card))] p-4 shadow-xs space-y-3">
        <h3 className="font-semibold text-xs uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
          Quick Log New Interaction
        </h3>
        <textarea
          rows={2}
          placeholder="Log a call outcome, meeting note, or customer email summary..."
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          className="w-full rounded-lg border bg-[hsl(var(--background))] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
        />
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-md border bg-[hsl(var(--background))] px-2.5 py-1 text-xs font-medium hover:bg-[hsl(var(--accent))]">
              <PhoneCall className="h-3.5 w-3.5 text-blue-500" /> Log Call
            </button>
            <button className="flex items-center gap-1.5 rounded-md border bg-[hsl(var(--background))] px-2.5 py-1 text-xs font-medium hover:bg-[hsl(var(--accent))]">
              <Mail className="h-3.5 w-3.5 text-purple-500" /> Log Email
            </button>
            <button className="flex items-center gap-1.5 rounded-md border bg-[hsl(var(--background))] px-2.5 py-1 text-xs font-medium hover:bg-[hsl(var(--accent))]">
              <Calendar className="h-3.5 w-3.5 text-emerald-500" /> Meeting
            </button>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-3.5 py-1.5 text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity">
            <Send className="h-3.5 w-3.5" /> Post Activity
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b pb-3">
        <button
          onClick={() => setActiveTab("all")}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
            activeTab === "all"
              ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
              : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))]"
          )}
        >
          All Activity Log ({initialActivities.length})
        </button>
        <button
          onClick={() => setActiveTab("call")}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
            activeTab === "call"
              ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
              : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))]"
          )}
        >
          Calls Only
        </button>
        <button
          onClick={() => setActiveTab("email")}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
            activeTab === "email"
              ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
              : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))]"
          )}
        >
          Emails
        </button>
        <button
          onClick={() => setActiveTab("meeting")}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
            activeTab === "meeting"
              ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
              : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))]"
          )}
        >
          Meetings
        </button>
      </div>

      {/* Activity Timeline List */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[hsl(var(--border))]">
        {filteredActivities.map((act) => {
          const Config = activityTypeConfig[act.type];
          const Icon = Config.icon;
          return (
            <div key={act.id} className="relative group">
              {/* Timeline Icon Badge */}
              <div
                className={cn(
                  "absolute -left-6 top-1.5 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border shadow-xs transition-transform group-hover:scale-110",
                  Config.color
                )}
              >
                <Icon className="h-3 w-3" />
              </div>

              {/* Activity Card */}
              <div className="rounded-xl border bg-[hsl(var(--card))] p-4 shadow-xs transition-all hover:shadow-md hover:border-[hsl(var(--primary))/40]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[hsl(var(--foreground))]">{act.title}</h4>
                    <span className="text-xs font-semibold text-[hsl(var(--primary))]">
                      • {act.company}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
                    <Clock className="h-3 w-3" /> {act.timestamp}
                  </span>
                </div>

                <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed mb-3">
                  {act.details}
                </p>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t text-[hsl(var(--muted-foreground))]">
                  <span className="flex items-center gap-1 font-medium">
                    <User className="h-3 w-3" /> Contact: <strong className="text-[hsl(var(--foreground))]">{act.contact}</strong>
                  </span>
                  <span>Logged by {act.user}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
