"use client";

import React, { useState } from "react";
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Users, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";

const INITIAL_EVENTS = [
  { 
    id: 1, 
    title: "Q3 Sales Sync", 
    time: "10:00 AM - 11:30 AM", 
    type: "meeting",
    location: "Google Meet",
    attendees: ["SJ", "DC", "AM"],
    color: "bg-primary text-primary-foreground"
  },
  { 
    id: 2, 
    title: "Client Onboarding: Acme Corp", 
    time: "1:00 PM - 2:00 PM", 
    type: "call",
    location: "Zoom",
    attendees: ["AM", "JS"],
    color: "bg-emerald-500 text-white"
  },
  { 
    id: 3, 
    title: "Product Roadmap Review", 
    time: "3:30 PM - 5:00 PM", 
    type: "internal",
    location: "Conference Room A",
    attendees: ["SJ", "DC", "AM", "KL"],
    color: "bg-indigo-500 text-white"
  }
];

export default function CalendarPage() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  
  // New Event State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("12:00 PM - 1:00 PM");
  const [newLocation, setNewLocation] = useState("Zoom");
  const [newType, setNewType] = useState("meeting");
  
  // Generate some dummy days for the calendar grid
  const days = Array.from({ length: 35 }, (_, i) => i - 2);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    
    let color = "bg-primary text-primary-foreground";
    if (newType === "call") color = "bg-emerald-500 text-white";
    if (newType === "internal") color = "bg-indigo-500 text-white";
    if (newType === "urgent") color = "bg-red-500 text-white";

    const newEvent = {
      id: Date.now(),
      title: newTitle,
      time: newTime,
      type: newType,
      location: newLocation,
      attendees: ["AM"],
      color: color
    };
    
    // Add to the list (which will display in the Today sidebar and grid)
    setEvents([...events, newEvent]);
    
    setNewTitle("");
    setNewTime("12:00 PM - 1:00 PM");
    setNewLocation("Zoom");
    setNewType("meeting");
    setIsModalOpen(false);
  };
  
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage your schedule and upcoming meetings.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden sm:flex bg-background">Today</Button>
          <div className="flex items-center gap-1 bg-background border rounded-md">
            <Button variant="ghost" size="icon" className="h-9 w-9"><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-9 w-9"><ChevronRight className="h-4 w-4" /></Button>
          </div>
          
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger render={
              <Button className="gap-2 shadow-md shadow-primary/20 shrink-0 ml-2">
                <Plus className="h-4 w-4" /> New Event
              </Button>
            } />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Event</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateEvent} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g. Weekly Standup" 
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input 
                      id="time" 
                      placeholder="10:00 AM - 11:00 AM" 
                      value={newTime}
                      onChange={e => setNewTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location / Link</Label>
                    <Input 
                      id="location" 
                      placeholder="Zoom or Room A" 
                      value={newLocation}
                      onChange={e => setNewLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Event Type</Label>
                  <div className="flex gap-2 flex-wrap">
                    {["meeting", "call", "internal", "urgent"].map(type => (
                      <Button 
                        key={type} 
                        type="button" 
                        variant={newType === type ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setNewType(type)}
                        className="capitalize"
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <DialogClose asChild>
                    <Button type="button" variant="ghost">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" disabled={!newTitle.trim()}>Save Event</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Calendar View */}
        <Card className="lg:col-span-8 xl:col-span-9 border-border/50 shadow-sm flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 pb-4 pt-5">
            <CardTitle className="text-lg font-bold">September 2026</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-background cursor-pointer">Month</Badge>
              <Badge variant="ghost" className="text-muted-foreground cursor-pointer">Week</Badge>
              <Badge variant="ghost" className="text-muted-foreground cursor-pointer">Day</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <div className="grid grid-cols-7 border-b text-center text-xs font-semibold text-muted-foreground bg-muted/10 py-2">
              <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
            </div>
            <div className="grid grid-cols-7 auto-rows-[120px] bg-border gap-px">
              {days.map((day, idx) => {
                const isCurrentMonth = day > 0 && day <= 30;
                const isToday = day === 14;
                return (
                  <div key={idx} className={`bg-card p-2 transition-colors hover:bg-muted/30 flex flex-col ${!isCurrentMonth ? 'opacity-50 bg-muted/10' : ''}`}>
                    <div className="flex justify-between items-start">
                      <span className={`text-xs font-medium h-6 w-6 flex items-center justify-center rounded-full ${isToday ? 'bg-primary text-primary-foreground shadow-sm' : ''}`}>
                        {day > 0 ? (day > 30 ? day - 30 : day) : 31 + day}
                      </span>
                    </div>
                    
                    {/* Render dummy events on a specific day */}
                    {isToday && (
                      <div className="mt-1 space-y-1 overflow-y-auto pr-1 pb-1 scrollbar-hide">
                        {events.map(event => (
                          <div key={event.id} className={`text-[10px] px-1.5 py-1 rounded truncate font-medium ${event.color}`}>
                            {event.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Schedule Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3 border-b bg-muted/20">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-primary" /> Upcoming Today
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {events.map((event) => (
                  <div key={event.id} className="p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <Badge variant="outline" className="text-[10px] bg-background capitalize">
                        {event.type}
                      </Badge>
                    </div>
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5" /> {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        {event.location.includes("Meet") || event.location.includes("Zoom") ? (
                          <Video className="h-3.5 w-3.5" /> 
                        ) : (
                          <MapPin className="h-3.5 w-3.5" />
                        )}
                        {event.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <div className="flex -space-x-2">
                        {event.attendees.map((att, i) => (
                          <Avatar key={i} className="h-7 w-7 border-2 border-background">
                            <AvatarFallback className="text-[10px] bg-muted">{att}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground font-medium pl-1">
                        {event.attendees.length} Attendees
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
