"use client";

import * as React from "react";
import {
  Plus,
  Search,
  StickyNote,
  Pin,
  Trash2,
  Edit3,
  Calendar,
  Tag,
  Clock,
  Sparkles,
  FileText,
  BookmarkCheck,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { toast } from "sonner";

export type NoteCategory = "Strategy" | "Deals" | "Meetings" | "Product" | "Internal";

export interface Note {
  id: string;
  title: string;
  content: string;
  category: NoteCategory;
  isPinned: boolean;
  date: string;
  tags: string[];
}

const CATEGORIES: NoteCategory[] = ["Strategy", "Deals", "Meetings", "Product", "Internal"];

const INITIAL_NOTES: Note[] = [
  {
    id: "note-1",
    title: "Q4 Enterprise Pricing Model & Discounting Tiers",
    category: "Strategy",
    content:
      "Defined standard approval matrix: Account Executives can offer up to 15% discount autonomously. Sales Directors approve 16-25%. Above 25% requires VP approval and annual pre-payment commit.",
    date: "Oct 21, 2026",
    isPinned: true,
    tags: ["pricing", "enterprise", "q4"],
  },
  {
    id: "note-2",
    title: "Horizon Tech Deal Review Notes",
    category: "Deals",
    content:
      "Client requested custom SLA of 99.95% uptime and dedicated Slack connect channel. Legal approved clause 8.4 modification regarding data residency in EU Frankfurt region.",
    date: "Oct 19, 2026",
    isPinned: true,
    tags: ["horizon", "procurement", "msa"],
  },
  {
    id: "note-3",
    title: "Weekly Product & Engineering Sync",
    category: "Meetings",
    content:
      "Discussed performance on large table filters. Agreed to optimize virtualized scrolling for pipelines with >10,000 lead records. Design team to delivery final dark tokens by Friday.",
    date: "Oct 18, 2026",
    isPinned: false,
    tags: ["roadmap", "sync", "v2"],
  },
  {
    id: "note-4",
    title: "Competitive Positioning vs Legacy CRM Solutions",
    category: "Product",
    content:
      "Key competitive advantage remains real-time contact timeline interactions, zero-latency search, and instant proposal generation without external plugin sprawl.",
    date: "Oct 14, 2026",
    isPinned: false,
    tags: ["positioning", "competitive"],
  },
  {
    id: "note-5",
    title: "Customer Success Handover Checklist",
    category: "Internal",
    content:
      "1. Verify signed contract & payment method.\n2. Schedule 45-minute technical onboarding.\n3. Configure SAML 2.0 SSO identity provider.\n4. Send welcome documentation pack.",
    date: "Oct 10, 2026",
    isPinned: false,
    tags: ["cs", "onboarding"],
  },
];

export default function NotesPage() {
  const [notes, setNotes] = React.useState<Note[]>(INITIAL_NOTES);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  // Create Modal
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [createTitle, setCreateTitle] = React.useState("");
  const [createContent, setCreateContent] = React.useState("");
  const [createCategory, setCreateCategory] = React.useState<NoteCategory>("Strategy");
  const [createTags, setCreateTags] = React.useState("");
  const [createPinned, setCreatePinned] = React.useState(false);

  // Edit Modal
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [editingNote, setEditingNote] = React.useState<Note | null>(null);
  const [editTagsString, setEditTagsString] = React.useState("");

  // Stats
  const totalNotes = notes.length;
  const pinnedNotesCount = notes.filter((n) => n.isPinned).length;

  // Toggle pin
  const handleTogglePin = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const next = !n.isPinned;
          toast.success(next ? "Note pinned" : "Note unpinned");
          return { ...n, isPinned: next };
        }
        return n;
      })
    );
  };

  // Delete
  const handleDeleteNote = (id: string, title: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    toast.success(`Deleted note: "${title}"`);
  };

  // Create
  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createTitle.trim() || !createContent.trim()) return;

    const parsedTags = createTags
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: createTitle.trim(),
      content: createContent.trim(),
      category: createCategory,
      isPinned: createPinned,
      date: "Today",
      tags: parsedTags,
    };

    setNotes((prev) => [newNote, ...prev]);
    setIsCreateOpen(false);
    setCreateTitle("");
    setCreateContent("");
    setCreateCategory("Strategy");
    setCreateTags("");
    setCreatePinned(false);
    toast.success("Note created successfully");
  };

  // Edit
  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setEditTagsString(note.tags.join(", "));
    setIsEditOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNote || !editingNote.title.trim() || !editingNote.content.trim()) return;

    const parsedTags = editTagsString
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    const updated: Note = {
      ...editingNote,
      tags: parsedTags,
    };

    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
    setIsEditOpen(false);
    setEditingNote(null);
    toast.success("Note updated");
  };

  // Filtered notes
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((t) => t.includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || note.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const pinnedNotes = filteredNotes.filter((n) => n.isPinned);
  const otherNotes = filteredNotes.filter((n) => !n.isPinned);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notes & Documentation</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Store internal procedures, sales playbooks, client feedback, and strategic briefs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Create Note Dialog */}
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger render={
              <Button className="gap-2 shadow-xs cursor-pointer">
                <Plus className="size-4" />
                <span>New Note</span>
              </Button>
            } />
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Note</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleCreateNote} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="create-note-title" className="text-xs font-semibold">
                    Title
                  </Label>
                  <Input
                    id="create-note-title"
                    placeholder="e.g. Q4 Account Expansion Strategy"
                    value={createTitle}
                    onChange={(e) => setCreateTitle(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Category</Label>
                    <select
                      className="w-full h-9 px-3 rounded-lg border border-input bg-card text-xs focus:outline-none focus:ring-2 focus:ring-ring"
                      value={createCategory}
                      onChange={(e) => setCreateCategory(e.target.value as NoteCategory)}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="create-note-tags" className="text-xs font-semibold">
                      Tags (comma-separated)
                    </Label>
                    <Input
                      id="create-note-tags"
                      placeholder="e.g. pricing, deals, review"
                      value={createTags}
                      onChange={(e) => setCreateTags(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="create-note-content" className="text-xs font-semibold">
                    Content
                  </Label>
                  <Textarea
                    id="create-note-content"
                    placeholder="Write detailed notes, checklists, or summaries..."
                    rows={6}
                    value={createContent}
                    onChange={(e) => setCreateContent(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="create-pinned"
                    checked={createPinned}
                    onChange={(e) => setCreatePinned(e.target.checked)}
                    className="size-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                  />
                  <Label htmlFor="create-pinned" className="text-xs cursor-pointer select-none">
                    Pin this note to the top
                  </Label>
                </div>

                <DialogFooter className="pt-2">
                  <DialogClose render={<Button type="button" variant="ghost">Cancel</Button>} />
                  <Button type="submit" disabled={!createTitle.trim() || !createContent.trim()}>
                    Save Note
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Grid: Categories Sidebar & Notes Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Category Navigation */}
        <Card className="lg:col-span-3 border-border/80 shadow-2xs">
          <CardHeader className="pb-3 border-b border-border/60">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Folders & Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 space-y-1">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === "All"
                  ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <StickyNote className="size-3.5" />
                <span>All Notes</span>
              </div>
              <span className="text-[11px] font-mono">{totalNotes}</span>
            </button>

            {CATEGORIES.map((cat) => {
              const count = notes.filter((n) => n.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Tag className="size-3.5" />
                    <span>{cat}</span>
                  </div>
                  <span className="text-[11px] font-mono">{count}</span>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Right: Search & Notes Grid */}
        <div className="lg:col-span-9 space-y-6">
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search notes by keyword or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-9 text-xs"
            />
          </div>

          {filteredNotes.length === 0 ? (
            <Card className="border-border/80 p-12 text-center space-y-2">
              <StickyNote className="size-8 mx-auto text-muted-foreground/40" />
              <p className="text-sm font-medium text-foreground">No notes found</p>
              <p className="text-xs text-muted-foreground">
                Try adjusting your search query or create a new note in this category.
              </p>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Pinned Notes Section */}
              {pinnedNotes.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                    <Pin className="size-3.5 text-primary rotate-45" />
                    <span>Pinned ({pinnedNotes.length})</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pinnedNotes.map((note) => (
                      <Card
                        key={note.id}
                        className="group border-border/80 hover:border-primary/50 transition-colors shadow-2xs flex flex-col justify-between"
                      >
                        <CardHeader className="pb-2.5 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-4.5 bg-muted/40">
                              {note.category}
                            </Badge>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleTogglePin(note.id)}
                                className="size-6 inline-flex items-center justify-center rounded-md text-primary hover:bg-muted transition-colors cursor-pointer"
                                title="Unpin note"
                              >
                                <Pin className="size-3.5 fill-current" />
                              </button>
                              <button
                                onClick={() => openEditModal(note)}
                                className="size-6 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                                title="Edit note"
                              >
                                <Edit3 className="size-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteNote(note.id, note.title)}
                                className="size-6 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-muted transition-colors cursor-pointer"
                                title="Delete note"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </div>

                          <CardTitle
                            onClick={() => openEditModal(note)}
                            className="text-sm font-semibold tracking-tight hover:text-primary transition-colors cursor-pointer"
                          >
                            {note.title}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-3 pt-0">
                          <p
                            onClick={() => openEditModal(note)}
                            className="text-xs text-muted-foreground leading-relaxed line-clamp-4 cursor-pointer whitespace-pre-line"
                          >
                            {note.content}
                          </p>

                          {note.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {note.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] text-muted-foreground/80 font-mono bg-muted/50 px-1.5 py-0.5 rounded"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between text-[11px] text-muted-foreground/70 pt-2 border-t border-border/50">
                            <span className="flex items-center gap-1">
                              <Calendar className="size-3" />
                              <span>{note.date}</span>
                            </span>
                            <span>{note.content.split(/\s+/).length} words</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Notes Section */}
              {otherNotes.length > 0 && (
                <div className="space-y-3">
                  {pinnedNotes.length > 0 && (
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                      <FileText className="size-3.5" />
                      <span>Other Notes ({otherNotes.length})</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {otherNotes.map((note) => (
                      <Card
                        key={note.id}
                        className="group border-border/80 hover:border-primary/50 transition-colors shadow-2xs flex flex-col justify-between"
                      >
                        <CardHeader className="pb-2.5 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-4.5 bg-muted/40">
                              {note.category}
                            </Badge>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleTogglePin(note.id)}
                                className="size-6 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-primary hover:bg-muted transition-colors cursor-pointer"
                                title="Pin note"
                              >
                                <Pin className="size-3.5" />
                              </button>
                              <button
                                onClick={() => openEditModal(note)}
                                className="size-6 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                                title="Edit note"
                              >
                                <Edit3 className="size-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteNote(note.id, note.title)}
                                className="size-6 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-muted transition-colors cursor-pointer"
                                title="Delete note"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </div>

                          <CardTitle
                            onClick={() => openEditModal(note)}
                            className="text-sm font-semibold tracking-tight hover:text-primary transition-colors cursor-pointer"
                          >
                            {note.title}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-3 pt-0">
                          <p
                            onClick={() => openEditModal(note)}
                            className="text-xs text-muted-foreground leading-relaxed line-clamp-4 cursor-pointer whitespace-pre-line"
                          >
                            {note.content}
                          </p>

                          {note.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {note.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] text-muted-foreground/80 font-mono bg-muted/50 px-1.5 py-0.5 rounded"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between text-[11px] text-muted-foreground/70 pt-2 border-t border-border/50">
                            <span className="flex items-center gap-1">
                              <Calendar className="size-3" />
                              <span>{note.date}</span>
                            </span>
                            <span>{note.content.split(/\s+/).length} words</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Note Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>

          {editingNote && (
            <form onSubmit={handleSaveEdit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="edit-note-title" className="text-xs font-semibold">
                  Title
                </Label>
                <Input
                  id="edit-note-title"
                  value={editingNote.title}
                  onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Category</Label>
                  <select
                    className="w-full h-9 px-3 rounded-lg border border-input bg-card text-xs focus:outline-none focus:ring-2 focus:ring-ring"
                    value={editingNote.category}
                    onChange={(e) =>
                      setEditingNote({ ...editingNote, category: e.target.value as NoteCategory })
                    }
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="edit-note-tags" className="text-xs font-semibold">
                    Tags (comma-separated)
                  </Label>
                  <Input
                    id="edit-note-tags"
                    value={editTagsString}
                    onChange={(e) => setEditTagsString(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-note-content" className="text-xs font-semibold">
                  Content
                </Label>
                <Textarea
                  id="edit-note-content"
                  rows={6}
                  value={editingNote.content}
                  onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="edit-pinned"
                  checked={editingNote.isPinned}
                  onChange={(e) =>
                    setEditingNote({ ...editingNote, isPinned: e.target.checked })
                  }
                  className="size-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                />
                <Label htmlFor="edit-pinned" className="text-xs cursor-pointer select-none">
                  Pin this note to the top
                </Label>
              </div>

              <DialogFooter className="pt-2">
                <DialogClose render={<Button type="button" variant="ghost">Cancel</Button>} />
                <Button type="submit" disabled={!editingNote.title.trim() || !editingNote.content.trim()}>
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
