"use client";

import React, { useState, useMemo } from "react";
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Video,
  Check,
  ExternalLink,
  Copy,
  Briefcase
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter, 
  DialogClose 
} from "@/components/ui/dialog";
import { toast } from "sonner";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  type: "meeting" | "client" | "internal" | "milestone";
  location: string;
  attendees: { name: string; initials: string }[];
  description?: string;
}

const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: "evt-1",
    title: "Q3 Sales Sync",
    date: "2026-09-14",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    type: "meeting",
    location: "Google Meet",
    attendees: [
      { name: "Sarah Jenkins", initials: "SJ" },
      { name: "David Chen", initials: "DC" },
      { name: "Alex Morgan", initials: "AM" }
    ],
    description: "Review regional quota attainment and enterprise pipeline velocity for Q3."
  },
  {
    id: "evt-2",
    title: "Client Onboarding: Acme Corp",
    date: "2026-09-14",
    startTime: "01:00 PM",
    endTime: "02:00 PM",
    type: "client",
    location: "Zoom",
    attendees: [
      { name: "Alex Morgan", initials: "AM" },
      { name: "James Smith", initials: "JS" },
      { name: "Elena Rostova", initials: "ER" }
    ],
    description: "Kickoff session for Acme Corp enterprise deployment (250 initial seats)."
  },
  {
    id: "evt-3",
    title: "Product Roadmap Review",
    date: "2026-09-14",
    startTime: "03:30 PM",
    endTime: "05:00 PM",
    type: "internal",
    location: "Conference Room A",
    attendees: [
      { name: "Sarah Jenkins", initials: "SJ" },
      { name: "David Chen", initials: "DC" },
      { name: "Alex Morgan", initials: "AM" },
      { name: "Kai Liu", initials: "KL" }
    ],
    description: "Align engineering priorities for Q4 releases and custom tenant features."
  },
  {
    id: "evt-4",
    title: "Q3 Revenue Forecast Review",
    date: "2026-09-08",
    startTime: "09:00 AM",
    endTime: "10:30 AM",
    type: "milestone",
    location: "Boardroom 3",
    attendees: [
      { name: "Alex Morgan", initials: "AM" },
      { name: "David Chen", initials: "DC" }
    ],
    description: "Executive presentation of mid-quarter revenue pacing and cash projection."
  },
  {
    id: "evt-5",
    title: "Enterprise Pitch: Nexus AI",
    date: "2026-09-10",
    startTime: "02:00 PM",
    endTime: "03:15 PM",
    type: "client",
    location: "Zoom",
    attendees: [
      { name: "Alex Morgan", initials: "AM" },
      { name: "Sarah Jenkins", initials: "SJ" }
    ],
    description: "Demonstration of CRM custom integrations and SLA proposal walk-through."
  },
  {
    id: "evt-6",
    title: "Partnership Agreement Sign-off",
    date: "2026-09-18",
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    type: "milestone",
    location: "Google Meet",
    attendees: [
      { name: "Alex Morgan", initials: "AM" },
      { name: "David Chen", initials: "DC" }
    ],
    description: "Final contract execution with Strategic Cloud Partner."
  },
  {
    id: "evt-7",
    title: "Engineering Sprint Planning",
    date: "2026-09-22",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    type: "internal",
    location: "Room B",
    attendees: [
      { name: "Kai Liu", initials: "KL" },
      { name: "Alex Morgan", initials: "AM" }
    ],
    description: "Sprint 42 backlog prioritization and schema migration timelines."
  },
  {
    id: "evt-8",
    title: "Customer Advisory Council",
    date: "2026-09-25",
    startTime: "02:00 PM",
    endTime: "04:00 PM",
    type: "client",
    location: "Zoom",
    attendees: [
      { name: "Sarah Jenkins", initials: "SJ" },
      { name: "Elena Rostova", initials: "ER" },
      { name: "Alex Morgan", initials: "AM" }
    ],
    description: "Bi-monthly feedback session with top 10 enterprise accounts."
  }
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TYPE_CONFIG = {
  meeting: {
    label: "Meeting",
    badgeClass: "bg-primary/10 text-primary border-primary/25",
    chipClass: "bg-primary/10 text-primary border-primary/25 hover:bg-primary/15",
    dotClass: "bg-primary"
  },
  client: {
    label: "Client Call",
    badgeClass: "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/25",
    chipClass: "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/25 hover:bg-emerald-500/15",
    dotClass: "bg-emerald-600 dark:bg-emerald-400"
  },
  internal: {
    label: "Internal",
    badgeClass: "bg-muted text-foreground border-border/80",
    chipClass: "bg-muted text-foreground border-border/80 hover:bg-muted/80",
    dotClass: "bg-muted-foreground"
  },
  milestone: {
    label: "Milestone",
    badgeClass: "bg-amber-500/10 text-amber-900 dark:text-amber-300 border-amber-500/25",
    chipClass: "bg-amber-500/10 text-amber-900 dark:text-amber-300 border-amber-500/25 hover:bg-amber-500/15",
    dotClass: "bg-amber-600 dark:bg-amber-400"
  }
};

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  
  // Current viewing month and selected date
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(8); // 8 = September (0-indexed)
  const [selectedDateStr, setSelectedDateStr] = useState<string>("2026-09-14");
  const [viewMode, setViewMode] = useState<"month" | "week" | "agenda">("month");
  const [filterType, setFilterType] = useState<string>("all");

  // New Event Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState(selectedDateStr);
  const [newStartTime, setNewStartTime] = useState("10:00 AM");
  const [newEndTime, setNewEndTime] = useState("11:00 AM");
  const [newLocation, setNewLocation] = useState("Zoom");
  const [newType, setNewType] = useState<"meeting" | "client" | "internal" | "milestone">("meeting");
  const [newDescription, setNewDescription] = useState("");

  // Navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleGoToday = () => {
    setCurrentYear(2026);
    setCurrentMonth(8); // September
    setSelectedDateStr("2026-09-14");
  };

  // Calendar matrix calculations
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    interface DayCell {
      year: number;
      month: number;
      dayNumber: number;
      dateString: string;
      isCurrentMonth: boolean;
      isToday: boolean;
    }

    const cells: DayCell[] = [];

    // Previous month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const m = currentMonth === 0 ? 11 : currentMonth - 1;
      const y = currentMonth === 0 ? currentYear - 1 : currentYear;
      const mStr = String(m + 1).padStart(2, "0");
      const dStr = String(d).padStart(2, "0");
      cells.push({
        year: y,
        month: m,
        dayNumber: d,
        dateString: `${y}-${mStr}-${dStr}`,
        isCurrentMonth: false,
        isToday: false
      });
    }

    // Current month days
    for (let d = 1; d <= daysInCurrentMonth; d++) {
      const mStr = String(currentMonth + 1).padStart(2, "0");
      const dStr = String(d).padStart(2, "0");
      const dateString = `${currentYear}-${mStr}-${dStr}`;
      cells.push({
        year: currentYear,
        month: currentMonth,
        dayNumber: d,
        dateString,
        isCurrentMonth: true,
        isToday: dateString === "2026-09-14"
      });
    }

    // Next month padding to fill up to 35 or 42 cells
    const totalSlots = cells.length > 35 ? 42 : 35;
    const remaining = totalSlots - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const m = currentMonth === 11 ? 0 : currentMonth + 1;
      const y = currentMonth === 11 ? currentYear + 1 : currentYear;
      const mStr = String(m + 1).padStart(2, "0");
      const dStr = String(d).padStart(2, "0");
      cells.push({
        year: y,
        month: m,
        dayNumber: d,
        dateString: `${y}-${mStr}-${dStr}`,
        isCurrentMonth: false,
        isToday: false
      });
    }

    return cells;
  }, [currentYear, currentMonth]);

  // Filtered events
  const filteredEvents = useMemo(() => {
    if (filterType === "all") return events;
    return events.filter(e => e.type === filterType);
  }, [events, filterType]);

  // Events grouped by date string
  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const evt of filteredEvents) {
      const list = map.get(evt.date) || [];
      list.push(evt);
      map.set(evt.date, list);
    }
    return map;
  }, [filteredEvents]);

  // Events for selected date
  const selectedDateEvents = useMemo(() => {
    const list = eventsByDate.get(selectedDateStr) || [];
    return list.slice().sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [eventsByDate, selectedDateStr]);

  // Formatted date label for selected day
  const formattedSelectedDate = useMemo(() => {
    const [y, m, d] = selectedDateStr.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dateObj.getDay()];
    const monthName = MONTH_NAMES[dateObj.getMonth()];
    return `${dayName}, ${monthName} ${d}, ${y}`;
  }, [selectedDateStr]);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEvent: CalendarEvent = {
      id: `evt-${Date.now()}`,
      title: newTitle.trim(),
      date: newDate,
      startTime: newStartTime.trim(),
      endTime: newEndTime.trim(),
      type: newType,
      location: newLocation.trim() || "Virtual",
      attendees: [
        { name: "Alex Morgan", initials: "AM" },
        { name: "Sarah Jenkins", initials: "SJ" }
      ],
      description: newDescription.trim()
    };

    setEvents(prev => [...prev, newEvent]);
    toast.success("Event scheduled successfully");

    setNewTitle("");
    setNewDescription("");
    setIsModalOpen(false);
  };

  const copyMeetingLink = (location: string) => {
    navigator.clipboard?.writeText(location);
    toast.success("Meeting link copied to clipboard");
  };

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Calendar</h1>
            <Badge variant="outline" className="text-xs font-mono font-medium text-muted-foreground border-border/70">
              Q3 2026
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Executive schedule, client engagements, and milestone reviews.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Today Button */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleGoToday} 
            className="h-8.5 px-3 text-xs font-medium border-border/70 hover:bg-muted/60"
          >
            Today
          </Button>

          {/* Month / Period Nav */}
          <div className="flex items-center border border-border/70 rounded-lg bg-card overflow-hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handlePrevMonth}
              className="h-8.5 w-8.5 rounded-none hover:bg-muted/60"
              aria-label="Previous month"
            >
              <ChevronLeft className="size-4 text-muted-foreground" />
            </Button>
            <div className="px-3 text-xs font-medium text-foreground select-none min-w-[130px] text-center">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleNextMonth}
              className="h-8.5 w-8.5 rounded-none hover:bg-muted/60"
              aria-label="Next month"
            >
              <ChevronRight className="size-4 text-muted-foreground" />
            </Button>
          </div>

          {/* View Mode Switcher */}
          <div className="hidden sm:inline-flex items-center rounded-lg border border-border/70 bg-card p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("month")}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                viewMode === "month"
                  ? "bg-muted text-foreground font-medium shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Month
            </button>
            <button
              type="button"
              onClick={() => setViewMode("week")}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                viewMode === "week"
                  ? "bg-muted text-foreground font-medium shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Week
            </button>
            <button
              type="button"
              onClick={() => setViewMode("agenda")}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                viewMode === "agenda"
                  ? "bg-muted text-foreground font-medium shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Agenda
            </button>
          </div>

          {/* New Event Dialog Trigger */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger render={
              <Button className="h-8.5 gap-1.5 px-3.5 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="size-3.5" />
                <span>New Event</span>
              </Button>
            } />
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-base font-semibold">Schedule Event</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateEvent} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="evt-title" className="text-xs">Event Title</Label>
                  <Input 
                    id="evt-title" 
                    placeholder="e.g. Enterprise Client Review" 
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="h-9 text-sm"
                    autoFocus
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="evt-date" className="text-xs">Date</Label>
                    <Input 
                      id="evt-date" 
                      type="date"
                      value={newDate}
                      onChange={e => setNewDate(e.target.value)}
                      className="h-9 text-xs font-mono"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="evt-location" className="text-xs">Location / Link</Label>
                    <Input 
                      id="evt-location" 
                      placeholder="Zoom or Room 402" 
                      value={newLocation}
                      onChange={e => setNewLocation(e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="evt-start" className="text-xs">Start Time</Label>
                    <Input 
                      id="evt-start" 
                      placeholder="10:00 AM" 
                      value={newStartTime}
                      onChange={e => setNewStartTime(e.target.value)}
                      className="h-9 text-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="evt-end" className="text-xs">End Time</Label>
                    <Input 
                      id="evt-end" 
                      placeholder="11:30 AM" 
                      value={newEndTime}
                      onChange={e => setNewEndTime(e.target.value)}
                      className="h-9 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Category</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(["meeting", "client", "internal", "milestone"] as const).map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setNewType(type)}
                        className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border text-center transition-colors ${
                          newType === type 
                            ? "border-primary bg-primary/10 text-primary font-semibold"
                            : "border-border/70 bg-card text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {TYPE_CONFIG[type].label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="evt-desc" className="text-xs">Notes (Optional)</Label>
                  <Input 
                    id="evt-desc" 
                    placeholder="Agenda items or objectives" 
                    value={newDescription}
                    onChange={e => setNewDescription(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>

                <DialogFooter className="pt-2">
                  <DialogClose render={
                    <Button type="button" variant="outline" size="sm" className="h-8.5 text-xs">
                      Cancel
                    </Button>
                  } />
                  <Button 
                    type="submit" 
                    size="sm" 
                    disabled={!newTitle.trim()}
                    className="h-8.5 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Confirm Event
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-muted-foreground font-medium mr-1">Filter:</span>
          {[
            { id: "all", label: "All Events" },
            { id: "client", label: "Client Calls" },
            { id: "meeting", label: "Syncs" },
            { id: "internal", label: "Internal" },
            { id: "milestone", label: "Milestones" }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                filterType === f.id
                  ? "bg-foreground text-background"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Selected date preview badge */}
        <div className="text-xs font-mono text-muted-foreground">
          Selected: <span className="text-foreground font-medium">{selectedDateStr}</span>
        </div>
      </div>

      {/* Main 12-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Calendar Grid / Matrix (8 cols on large screens) */}
        <Card className="lg:col-span-7 xl:col-span-8 border-border/70 bg-card shadow-xs overflow-hidden">
          <CardHeader className="py-3.5 px-4 border-b border-border/60 bg-muted/20 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-4 text-primary" />
              <CardTitle className="text-sm font-semibold text-foreground">
                {MONTH_NAMES[currentMonth]} {currentYear}
              </CardTitle>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              {filteredEvents.length} events logged
            </span>
          </CardHeader>

          <CardContent className="p-0">
            {viewMode === "month" && (
              <>
                {/* Days of week header */}
                <div className="grid grid-cols-7 border-b border-border/60 bg-muted/15 text-center text-xs font-medium text-muted-foreground py-2.5">
                  {DAY_NAMES.map(day => (
                    <div key={day}>{day}</div>
                  ))}
                </div>

                {/* Calendar Cells Grid */}
                <div className="grid grid-cols-7 bg-border/60 gap-px">
                  {calendarDays.map((cell, idx) => {
                    const dayEvents = eventsByDate.get(cell.dateString) || [];
                    const isSelected = selectedDateStr === cell.dateString;

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedDateStr(cell.dateString)}
                        className={`text-left p-2 min-h-[105px] md:min-h-[118px] transition-colors flex flex-col justify-between group relative ${
                          cell.isCurrentMonth ? "bg-card hover:bg-muted/20" : "bg-muted/10 opacity-40 hover:opacity-75"
                        } ${isSelected ? "ring-2 ring-primary/40 ring-inset bg-primary/[0.02]" : ""}`}
                      >
                        {/* Day number header */}
                        <div className="flex items-center justify-between w-full">
                          <span className={`size-6 rounded-md flex items-center justify-center font-mono text-xs font-medium ${
                            cell.isToday
                              ? "bg-primary text-primary-foreground font-semibold"
                              : isSelected
                              ? "bg-foreground text-background font-semibold"
                              : "text-foreground group-hover:text-primary transition-colors"
                          }`}>
                            {cell.dayNumber}
                          </span>

                          {/* Pip indicator if day has events */}
                          {dayEvents.length > 0 && (
                            <span className="size-1.5 rounded-full bg-primary" />
                          )}
                        </div>

                        {/* Events list for this day */}
                        <div className="mt-1.5 space-y-1 w-full overflow-hidden">
                          {dayEvents.slice(0, 2).map(evt => {
                            const config = TYPE_CONFIG[evt.type] || TYPE_CONFIG.meeting;
                            return (
                              <div
                                key={evt.id}
                                className={`text-[10px] px-1.5 py-0.5 rounded border truncate font-medium ${config.chipClass}`}
                                title={`${evt.startTime} - ${evt.title}`}
                              >
                                <span className="font-mono opacity-80 mr-1">{evt.startTime.split(" ")[0]}</span>
                                {evt.title}
                              </div>
                            );
                          })}
                          {dayEvents.length > 2 && (
                            <div className="text-[10px] font-mono text-muted-foreground px-1">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {viewMode === "week" && (
              <div className="p-4 space-y-3">
                <div className="text-xs text-muted-foreground mb-2">
                  Showing active appointments for the current operational week.
                </div>
                <div className="space-y-2.5">
                  {filteredEvents.map(evt => {
                    const config = TYPE_CONFIG[evt.type];
                    return (
                      <div 
                        key={evt.id}
                        onClick={() => setSelectedDateStr(evt.date)}
                        className={`p-3 rounded-lg border transition-colors cursor-pointer flex items-center justify-between ${
                          selectedDateStr === evt.date 
                            ? "border-primary bg-primary/[0.04]" 
                            : "border-border/70 bg-card hover:bg-muted/30"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`size-2 rounded-full ${config.dotClass}`} />
                            <h4 className="text-xs font-semibold text-foreground">{evt.title}</h4>
                            <Badge variant="outline" className={`text-[10px] ${config.badgeClass}`}>
                              {config.label}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                            <span>{evt.date}</span>
                            <span>•</span>
                            <span>{evt.startTime} – {evt.endTime}</span>
                            <span>•</span>
                            <span>{evt.location}</span>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs text-muted-foreground hover:text-foreground"
                        >
                          Select Date
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {viewMode === "agenda" && (
              <div className="divide-y divide-border/60">
                {filteredEvents.map(evt => {
                  const config = TYPE_CONFIG[evt.type];
                  return (
                    <div key={evt.id} className="p-4 hover:bg-muted/20 transition-colors flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-medium text-primary">{evt.date}</span>
                          <span className="text-xs font-mono text-muted-foreground">({evt.startTime} – {evt.endTime})</span>
                        </div>
                        <h4 className="text-sm font-semibold text-foreground">{evt.title}</h4>
                        {evt.description && (
                          <p className="text-xs text-muted-foreground line-clamp-1">{evt.description}</p>
                        )}
                        <div className="flex items-center gap-2 pt-1">
                          <Badge variant="outline" className={`text-[10px] ${config.badgeClass}`}>
                            {config.label}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="size-3 text-muted-foreground" /> {evt.location}
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedDateStr(evt.date)}
                        className="h-7 text-xs font-mono border-border/70 shrink-0"
                      >
                        Inspect
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Selected Date Agenda Dossier (4 cols on large screens) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          <Card className="border-border/70 bg-card shadow-xs">
            <CardHeader className="py-3.5 px-4 border-b border-border/60 bg-muted/20 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">
                  Date Itinerary
                </CardTitle>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  {formattedSelectedDate}
                </p>
              </div>
              <Badge variant="outline" className="font-mono text-xs text-muted-foreground border-border/70">
                {selectedDateEvents.length} {selectedDateEvents.length === 1 ? "session" : "sessions"}
              </Badge>
            </CardHeader>

            <CardContent className="p-0">
              {selectedDateEvents.length === 0 ? (
                <div className="p-8 text-center space-y-3">
                  <div className="size-10 rounded-full bg-muted/60 border border-border/70 mx-auto flex items-center justify-center text-muted-foreground">
                    <CalendarIcon className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground">No engagements booked</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      This date has no client meetings or team milestones.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setNewDate(selectedDateStr);
                      setIsModalOpen(true);
                    }}
                    className="h-8 text-xs font-medium border-border/70 hover:bg-muted/60"
                  >
                    <Plus className="size-3.5 mr-1.5" /> Book Session
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-border/60">
                  {selectedDateEvents.map(evt => {
                    const config = TYPE_CONFIG[evt.type] || TYPE_CONFIG.meeting;
                    const isVirtual = evt.location.toLowerCase().includes("zoom") || evt.location.toLowerCase().includes("meet");

                    return (
                      <div key={evt.id} className="p-4 hover:bg-muted/20 transition-colors space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className={`text-[10px] font-medium ${config.badgeClass}`}>
                                {config.label}
                              </Badge>
                              <span className="text-xs font-mono font-medium text-foreground">
                                {evt.startTime} – {evt.endTime}
                              </span>
                            </div>
                            <h4 className="font-semibold text-sm text-foreground">{evt.title}</h4>
                          </div>

                          {isVirtual && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => copyMeetingLink(evt.location)}
                              className="size-7 rounded-md text-muted-foreground hover:text-foreground"
                              title="Copy meeting location"
                            >
                              <Copy className="size-3.5" />
                            </Button>
                          )}
                        </div>

                        {evt.description && (
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {evt.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between text-xs pt-1 border-t border-border/40 text-muted-foreground">
                          <div className="flex items-center gap-1.5 font-medium">
                            {isVirtual ? (
                              <Video className="size-3.5 text-primary" />
                            ) : (
                              <MapPin className="size-3.5 text-muted-foreground" />
                            )}
                            <span>{evt.location}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <div className="flex -space-x-1.5">
                              {evt.attendees.map((att, i) => (
                                <Avatar key={i} className="size-6 border border-background">
                                  <AvatarFallback className="text-[9px] font-mono bg-muted text-foreground">
                                    {att.initials}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <span className="font-mono text-[11px]">
                              {evt.attendees.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Schedule Overview Card */}
          <Card className="border-border/70 bg-card shadow-xs">
            <CardHeader className="py-3 px-4 border-b border-border/60 bg-muted/20">
              <CardTitle className="text-xs font-semibold text-foreground flex items-center gap-2">
                <Briefcase className="size-3.5 text-primary" /> Daily Quota & Capacity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Meeting Load</span>
                <span className="font-mono font-medium text-foreground">
                  {selectedDateEvents.length * 1.5} hrs
                </span>
              </div>
              <div className="w-full bg-muted/60 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min(selectedDateEvents.length * 25, 100)}%` }} 
                />
              </div>
              <div className="flex justify-between items-center text-xs text-muted-foreground pt-1">
                <span>Focus Window</span>
                <span className="font-mono text-foreground font-medium">
                  {Math.max(8 - selectedDateEvents.length * 1.5, 0).toFixed(1)} hrs free
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}