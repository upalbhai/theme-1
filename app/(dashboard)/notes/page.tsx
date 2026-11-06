"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  StickyNote, 
  Star, 
  Pin, 
  Trash2, 
  Tag, 
  Folder, 
  MoreVertical, 
  Pencil, 
  Check, 
  Calendar,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { AnimatedGroup } from "@/components/core/animated-group";
import { AnimatedNumber } from "@/components/core/animated-number";
import { Magnetic } from "@/components/core/magnetic";
import { Tilt } from "@/components/core/tilt";

interface Note {
  id: number;
  title: string;
  category: "Work" | "Personal" | "Important" | "Ideas";
  content: string;
  date: string;
  isPinned: boolean;
  color: string;
}

const INITIAL_NOTES: Note[] = [
  {
    id: 1,
    title: "Q4 Product Strategy & Roadmap",
    category: "Work",
    content: "Finalize enterprise multi-tenancy billing architecture. Coordinate with lead backend team on API rate limiting and security compliance.",
    date: "Oct 12, 2026",
    isPinned: true,
    color: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
  },
  {
    id: 2,
    title: "UI Theme Color Design System",
    category: "Ideas",
    content: "Explore vibrant HSL color accents, dark mode glassmorphism, smooth CSS transitions, and subtle hover micro-animations for high-end feel.",
    date: "Oct 10, 2026",
    isPinned: true,
    color: "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800",
  },
  {
    id: 3,
    title: "Client Feedback Checklist",
    category: "Important",
    content: "1. Update invoice PDF export formatting\n2. Fix DialogClose TypeScript prop\n3. Add dynamic search filters to proposals table.",
    date: "Oct 08, 2026",
    isPinned: false,
    color: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800",
  },
  {
    id: 4,
    title: "Personal Learning Goals",
    category: "Personal",
    content: "Review Next.js 16 Server Actions, React 19 compiler optimization, and TanStack Table v9 virtualized scrolling performance.",
    date: "Oct 05, 2026",
    isPinned: false,
    color: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800",
  },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // New Note state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<Note["category"]>("Work");
  const [newContent, setNewContent] = useState("");

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const colorMap: Record<Note["category"], string> = {
      Work: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
      Ideas: "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800",
      Important: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800",
      Personal: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800",
    };

    const newNote: Note = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      content: newContent,
      date: "Today",
      isPinned: false,
      color: colorMap[newCategory],
    };

    setNotes([newNote, ...notes]);
    setNewTitle("");
    setNewCategory("Work");
    setNewContent("");
    setIsOpen(false);
  };

  const togglePin = (id: number) => {
    setNotes(notes.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          n.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === "All" || n.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-[1600px] mx-auto w-full bg-slate-50/50 dark:bg-slate-950/20">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Workspace</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Notes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-2xl font-bold tracking-tight mt-2">Notes & Ideas</h2>
        </div>

        {/* Add Note Modal */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger render={
            <Magnetic springOptions={{ bounce: 0.1 }}>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20">
                <Plus className="h-4 w-4" /> Add New Note
              </Button>
            </Magnetic>
          } />
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateNote} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="note-title">Title</Label>
                <Input 
                  id="note-title" 
                  placeholder="e.g. Weekly Design Ideas" 
                  value={newTitle} 
                  onChange={e => setNewTitle(e.target.value)} 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <div className="flex gap-2 flex-wrap">
                  {(["Work", "Personal", "Important", "Ideas"] as const).map(cat => (
                    <Button
                      key={cat}
                      type="button"
                      variant={newCategory === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note-content">Content</Label>
                <Textarea 
                  id="note-content" 
                  placeholder="Write your thoughts or reminders..." 
                  value={newContent} 
                  onChange={e => setNewContent(e.target.value)} 
                  rows={4} 
                  required 
                />
              </div>

              <DialogFooter className="pt-4">
                <DialogClose render={<Button type="button" variant="ghost">Cancel</Button>} />
                <Button type="submit" disabled={!newTitle.trim() || !newContent.trim()}>
                  Save Note
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Layout: Category Sidebar + Notes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Category Filter Panel */}
        <Card className="lg:col-span-3 shadow-sm border border-border/60 h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center justify-between">
              <span>Categories</span>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 p-2">
            {[
              { name: "All", count: notes.length },
              { name: "Work", count: notes.filter(n => n.category === "Work").length },
              { name: "Personal", count: notes.filter(n => n.category === "Personal").length },
              { name: "Important", count: notes.filter(n => n.category === "Important").length },
              { name: "Ideas", count: notes.filter(n => n.category === "Ideas").length },
            ].map(cat => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center justify-between w-full p-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat.name 
                    ? "bg-blue-600 text-white shadow-sm" 
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2">
                  <StickyNote className="h-3.5 w-3.5" />
                  <span>{cat.name}</span>
                </div>
                <Badge variant={activeCategory === cat.name ? "secondary" : "outline"} className="text-[10px]">
                  {cat.count}
                </Badge>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Right Notes Grid */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search notes by keyword..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="pl-9 bg-card"
            />
          </div>

          {/* Cards Grid */}
          <div>
            {filteredNotes.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground bg-card rounded-xl border border-dashed">
                <StickyNote className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="font-semibold text-sm">No notes found</p>
                <p className="text-xs">Create a new note or adjust your search term.</p>
              </div>
            ) : (
              <AnimatedGroup preset="scale" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredNotes.map((note) => (
                  <Tilt key={note.id} rotationFactor={3} isReverse>
                    <Card 
                      className={`shadow-xs border transition-all hover:shadow-md ${note.color} ${note.isPinned ? "ring-2 ring-primary/40" : ""}`}
                    >
                      <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-[10px] font-semibold">{note.category}</Badge>
                            {note.isPinned && (
                              <Badge className="bg-amber-500 text-white text-[10px] gap-1 px-1.5 py-0 border-none">
                                <Pin className="h-3 w-3 fill-current" /> Pinned
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-base font-bold pt-1">{note.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon-sm" 
                            onClick={() => togglePin(note.id)}
                            className={note.isPinned ? "text-amber-600" : "text-muted-foreground"}
                          >
                            <Pin className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon-sm" 
                            onClick={() => deleteNote(note.id)}
                            className="text-muted-foreground hover:text-rose-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line">{note.content}</p>
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/40">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {note.date}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Tilt>
                ))}
              </AnimatedGroup>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
