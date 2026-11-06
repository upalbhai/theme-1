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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedGroup } from "@/components/core/animated-group";
import { BorderTrail } from "@/components/core/border-trail";
import { Magnetic } from "@/components/core/magnetic";
import { TextLoop } from "@/components/core/text-loop";

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
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>Chronological audit log tracking</span>
            <TextLoop className="text-primary font-semibold">
              <span>phone calls</span>
              <span>direct emails</span>
              <span>stakeholder meetings</span>
              <span>internal notes</span>
            </TextLoop>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Live Logging Active</span>
        </div>
      </div>

      {/* Quick Activity Logger Box */}
      <Card className="relative overflow-hidden">
        <BorderTrail size={80} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="bg-gradient-to-r from-primary/60 to-purple-500/60" />
        <CardHeader className="pb-3">
          <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">
            Quick Log New Interaction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            rows={2}
            placeholder="Log a call outcome, meeting note, or customer email summary..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="w-full resize-none"
          />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t mt-2">
          <div className="flex items-center gap-2 pt-2">
            <Button variant="outline" size="sm" className="gap-1.5 h-8">
              <PhoneCall className="h-3.5 w-3.5 text-blue-500" /> Log Call
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 h-8">
              <Mail className="h-3.5 w-3.5 text-purple-500" /> Log Email
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 h-8">
              <Calendar className="h-3.5 w-3.5 text-emerald-500" /> Meeting
            </Button>
          </div>
          <Magnetic springOptions={{ bounce: 0.1 }}>
            <Button size="sm" className="gap-1.5 h-8 mt-2 shadow-xs">
              <Send className="h-3.5 w-3.5" /> Post Activity
            </Button>
          </Magnetic>
        </CardFooter>
      </Card>

      {/* Filter Tabs */}
      <div className="border-b pb-3 overflow-x-auto">
        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)}>
          <TabsList className="bg-transparent h-9 border p-1 border-border/50 shadow-sm gap-1">
            <TabsTrigger value="all" className="rounded-[min(var(--radius-md),12px)] h-7 px-3 data-active:bg-primary data-active:text-primary-foreground data-active:shadow-sm">All Activity Log ({initialActivities.length})</TabsTrigger>
            <TabsTrigger value="call" className="rounded-[min(var(--radius-md),12px)] h-7 px-3 data-active:bg-primary data-active:text-primary-foreground data-active:shadow-sm">Calls Only</TabsTrigger>
            <TabsTrigger value="email" className="rounded-[min(var(--radius-md),12px)] h-7 px-3 data-active:bg-primary data-active:text-primary-foreground data-active:shadow-sm">Emails</TabsTrigger>
            <TabsTrigger value="meeting" className="rounded-[min(var(--radius-md),12px)] h-7 px-3 data-active:bg-primary data-active:text-primary-foreground data-active:shadow-sm">Meetings</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Activity Timeline List */}
      <div className="relative pl-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
        <AnimatedGroup preset="blur-slide" className="space-y-6">
          {filteredActivities.map((act) => {
            const Config = activityTypeConfig[act.type];
            const Icon = Config.icon;
            return (
              <div key={act.id} className="relative group">
                {/* Timeline Icon Badge */}
                <div
                  className={cn(
                    "absolute -left-6 top-1.5 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border shadow-xs transition-transform group-hover:scale-110 bg-background",
                    Config.color
                  )}
                >
                  <Icon className="h-3 w-3" />
                </div>

                {/* Activity Card */}
                <Card className="transition-all hover:shadow-md hover:border-primary/40">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-sm">{act.title}</CardTitle>
                        <Badge variant="secondary" className="text-[10px] py-0">
                          {act.company}
                        </Badge>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {act.timestamp}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs leading-relaxed text-foreground">
                      {act.details}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="pt-2 pb-3 border-t">
                    <div className="flex w-full items-center justify-between text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1 font-medium">
                        <User className="h-3 w-3" /> Contact: <strong className="text-foreground">{act.contact}</strong>
                      </span>
                      <span>Logged by {act.user}</span>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </AnimatedGroup>
      </div>
    </div>
  );
}
