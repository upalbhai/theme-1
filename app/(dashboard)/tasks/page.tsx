"use client";

import * as React from "react";
import {
  Plus,
  CheckCircle2,
  Circle,
  Calendar,
  Trash2,
  Edit3,
  Search,
  Filter,
  Check,
  Clock,
  AlertCircle,
  FolderOpen,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatedNumber } from "@/components/core/animated-number";
import { AnimatedGroup } from "@/components/core/animated-group";
import { toast } from "sonner";

export type TaskPriority = "Urgent" | "High" | "Medium" | "Low";
export type TaskCategory = "Deals" | "Marketing" | "Operations" | "Customer" | "Admin";

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate: string;
  completed: boolean;
  createdAt: string;
}

const INITIAL_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Finalize enterprise MSA contract for Horizon Tech",
    description: "Review indemnity clause and procurement pricing schedule before Thursday sign-off.",
    category: "Deals",
    priority: "Urgent",
    dueDate: "Today",
    completed: false,
    createdAt: "2026-10-18",
  },
  {
    id: "task-2",
    title: "Review Q4 revenue pipeline velocity metrics",
    description: "Collate closed-won ratios across sales tiers for executive leadership board review.",
    category: "Operations",
    priority: "High",
    dueDate: "Today",
    completed: false,
    createdAt: "2026-10-19",
  },
  {
    id: "task-3",
    title: "Follow up on product pilot feedback with Acme Labs",
    description: "Check in with VP of Engineering regarding API latency test results.",
    category: "Customer",
    priority: "High",
    dueDate: "Tomorrow",
    completed: false,
    createdAt: "2026-10-20",
  },
  {
    id: "task-4",
    title: "Audit CRM customer data hygiene and deduplicate contacts",
    description: "Clean up orphaned lead records and verify company domain ownerships.",
    category: "Admin",
    priority: "Low",
    dueDate: "Oct 28",
    completed: false,
    createdAt: "2026-10-21",
  },
  {
    id: "task-5",
    title: "Quarterly Marketing asset refresh for Apex 2.0",
    description: "Update product deck imagery, interactive demo embeds, and case studies.",
    category: "Marketing",
    priority: "Medium",
    dueDate: "Oct 30",
    completed: false,
    createdAt: "2026-10-22",
  },
  {
    id: "task-6",
    title: "Schedule onboarding kickoff with Northstar Ventures",
    description: "Confirmed workspace invitation and shared administrator permissions.",
    category: "Customer",
    priority: "High",
    dueDate: "Oct 15",
    completed: true,
    createdAt: "2026-10-14",
  },
  {
    id: "task-7",
    title: "Submit vendor security questionnaire for SOC-2 audit",
    description: "Exported encryption policies and SOC-2 Type II audit documentation.",
    category: "Operations",
    priority: "Medium",
    dueDate: "Oct 12",
    completed: true,
    createdAt: "2026-10-11",
  },
];

const CATEGORIES: TaskCategory[] = ["Deals", "Marketing", "Operations", "Customer", "Admin"];
const PRIORITIES: TaskPriority[] = ["Urgent", "High", "Medium", "Low"];

export default function TasksPage() {
  const [tasks, setTasks] = React.useState<Task[]>(INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | "active" | "completed">("all");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");

  // Create Modal State
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState("");
  const [newDescription, setNewDescription] = React.useState("");
  const [newCategory, setNewCategory] = React.useState<TaskCategory>("Deals");
  const [newPriority, setNewPriority] = React.useState<TaskPriority>("Medium");
  const [newDueDate, setNewDueDate] = React.useState("Today");

  // Edit Modal State
  const [editingTask, setEditingTask] = React.useState<Task | null>(null);
  const [isEditOpen, setIsEditOpen] = React.useState(false);

  // Stats calculation
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const urgentOrHighTasks = tasks.filter((t) => !t.completed && (t.priority === "Urgent" || t.priority === "High")).length;

  // Toggle completion
  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          toast.success(nextCompleted ? "Task marked as complete" : "Task marked as active");
          return { ...t, completed: nextCompleted };
        }
        return t;
      })
    );
  };

  // Delete task
  const handleDeleteTask = (id: string, title: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.success(`Deleted: "${title}"`);
  };

  // Create Task
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      description: newDescription.trim(),
      category: newCategory,
      priority: newPriority,
      dueDate: newDueDate || "Today",
      completed: false,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setTasks((prev) => [newTask, ...prev]);
    setIsCreateOpen(false);
    setNewTitle("");
    setNewDescription("");
    setNewCategory("Deals");
    setNewPriority("Medium");
    setNewDueDate("Today");
    toast.success("Task created successfully");
  };

  // Start Editing
  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setIsEditOpen(true);
  };

  // Save Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask || !editingTask.title.trim()) return;

    setTasks((prev) => prev.map((t) => (t.id === editingTask.id ? editingTask : t)));
    setIsEditOpen(false);
    setEditingTask(null);
    toast.success("Task updated");
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : statusFilter === "active" ? !task.completed : task.completed;
    const matchesCategory = categoryFilter === "all" ? true : task.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case "Urgent":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      case "High":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "Medium":
        return "bg-primary/10 text-primary border-primary/20";
      case "Low":
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasks & Priorities</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Track deals pipeline execution, team handoffs, and customer deliverables.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Create Task Modal */}
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger render={
              <Button className="gap-2 shadow-xs cursor-pointer">
                <Plus className="size-4" />
                <span>New Task</span>
              </Button>
            } />
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Task</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleCreateTask} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="create-task-title" className="text-xs font-semibold">
                    Task Title
                  </Label>
                  <Input
                    id="create-task-title"
                    placeholder="e.g. Schedule enterprise pilot check-in"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="create-task-desc" className="text-xs font-semibold">
                    Description (optional)
                  </Label>
                  <Textarea
                    id="create-task-desc"
                    placeholder="Add contextual notes, links, or deliverables..."
                    rows={3}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Category</Label>
                    <Select
                      value={newCategory}
                      onValueChange={(val) => {
                        if (val) setNewCategory(val as TaskCategory);
                      }}
                    >
                      <SelectTrigger className="w-full h-9 text-xs">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Due Date</Label>
                    <Input
                      placeholder="e.g. Tomorrow, Oct 28"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Priority</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {PRIORITIES.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setNewPriority(p)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-colors cursor-pointer ${
                          newPriority === p
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted/40 hover:bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <DialogFooter className="pt-2">
                  <DialogClose render={<Button type="button" variant="ghost">Cancel</Button>} />
                  <Button type="submit" disabled={!newTitle.trim()}>
                    Create Task
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/80 shadow-2xs">
          <CardContent className="p-4 space-y-1">
            <span className="text-xs font-medium text-muted-foreground">Total Assigned</span>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              <AnimatedNumber value={totalTasks} />
            </div>
            <p className="text-[11px] text-muted-foreground">Tracked in current workspace</p>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-2xs">
          <CardContent className="p-4 space-y-1">
            <span className="text-xs font-medium text-muted-foreground">Pending Action</span>
            <div className="text-2xl font-bold tracking-tight text-primary">
              <AnimatedNumber value={activeTasks} />
            </div>
            <p className="text-[11px] text-muted-foreground">Awaiting team completion</p>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-2xs">
          <CardContent className="p-4 space-y-1">
            <span className="text-xs font-medium text-muted-foreground">Completed</span>
            <div className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
              <AnimatedNumber value={completedTasks} />
            </div>
            <p className="text-[11px] text-muted-foreground">
              {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-2xs">
          <CardContent className="p-4 space-y-1">
            <span className="text-xs font-medium text-muted-foreground">Urgent & High</span>
            <div className="text-2xl font-bold tracking-tight text-rose-600 dark:text-rose-400">
              <AnimatedNumber value={urgentOrHighTasks} />
            </div>
            <p className="text-[11px] text-muted-foreground">Requires immediate review</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls Bar: Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Status filter tabs */}
        <div className="inline-flex h-9 items-center p-1 rounded-lg bg-muted/60 border border-border/80 text-xs">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              statusFilter === "all"
                ? "bg-card text-foreground font-semibold shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({totalTasks})
          </button>
          <button
            onClick={() => setStatusFilter("active")}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              statusFilter === "active"
                ? "bg-card text-foreground font-semibold shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Pending ({activeTasks})
          </button>
          <button
            onClick={() => setStatusFilter("completed")}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              statusFilter === "completed"
                ? "bg-card text-foreground font-semibold shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Done ({completedTasks})
          </button>
        </div>

        {/* Search & Category select */}
        <div className="flex items-center gap-2 flex-1 sm:max-w-md">
          <div className="relative flex-1">
            <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-9 text-xs"
            />
          </div>

          <Select
            value={categoryFilter}
            onValueChange={(val) => {
              if (val) setCategoryFilter(val);
            }}
          >
            <SelectTrigger className="h-9 w-[150px] text-xs">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Task List */}
      <Card className="border-border/80 shadow-2xs">
        <CardHeader className="pb-3 border-b border-border/60">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">
              Tasks List ({filteredTasks.length})
            </CardTitle>
            {completedTasks > 0 && (
              <button
                onClick={() => {
                  setTasks((prev) => prev.filter((t) => !t.completed));
                  toast.success("Cleared completed tasks");
                }}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
              >
                Clear completed
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-border/60">
          {filteredTasks.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <CheckCircle2 className="size-8 mx-auto text-muted-foreground/40" />
              <p className="text-sm font-medium text-foreground">No tasks match your criteria</p>
              <p className="text-xs text-muted-foreground">
                Try clearing your search query or create a new task.
              </p>
            </div>
          ) : (
            <AnimatedGroup preset="fade" className="divide-y divide-border/50">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`group flex items-start sm:items-center justify-between p-3.5 sm:px-5 transition-colors gap-3 hover:bg-muted/30 ${
                    task.completed ? "bg-muted/15" : ""
                  }`}
                >
                  {/* Left: Checkbox & Title */}
                  <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                    <button
                      type="button"
                      onClick={() => handleToggleTask(task.id)}
                      className="mt-0.5 sm:mt-0 text-muted-foreground hover:text-primary transition-colors cursor-pointer shrink-0"
                      aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
                    >
                      {task.completed ? (
                        <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400 fill-emerald-600/10" />
                      ) : (
                        <Circle className="size-5 hover:stroke-primary" />
                      )}
                    </button>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-xs md:text-sm font-medium leading-tight ${
                            task.completed
                              ? "line-through text-muted-foreground/70"
                              : "text-foreground"
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>

                      {task.description && (
                        <p
                          className={`text-xs leading-relaxed line-clamp-1 ${
                            task.completed ? "text-muted-foreground/50" : "text-muted-foreground"
                          }`}
                        >
                          {task.description}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground flex-wrap pt-0.5">
                        <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-4.5 bg-muted/40">
                          {task.category}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          <span>{task.dueDate}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Priority & Action buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      variant="outline"
                      className={`text-[10px] py-0 px-1.5 h-4.5 font-medium border ${getPriorityBadge(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </Badge>

                    {/* Edit button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(task)}
                      className="size-7 text-muted-foreground hover:text-foreground cursor-pointer"
                      title="Edit task"
                    >
                      <Edit3 className="size-3.5" />
                    </Button>

                    {/* Delete button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTask(task.id, task.title)}
                      className="size-7 text-muted-foreground hover:text-destructive cursor-pointer"
                      title="Delete task"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </AnimatedGroup>
          )}
        </CardContent>
      </Card>

      {/* Edit Task Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>

          {editingTask && (
            <form onSubmit={handleSaveEdit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="edit-task-title" className="text-xs font-semibold">
                  Task Title
                </Label>
                <Input
                  id="edit-task-title"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-task-desc" className="text-xs font-semibold">
                  Description
                </Label>
                <Textarea
                  id="edit-task-desc"
                  rows={3}
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Category</Label>
                  <Select
                    value={editingTask.category}
                    onValueChange={(val) => {
                      if (val)
                        setEditingTask({
                          ...editingTask,
                          category: val as TaskCategory,
                        });
                    }}
                  >
                    <SelectTrigger className="w-full h-9 text-xs">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Due Date</Label>
                  <Input
                    value={editingTask.dueDate}
                    onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Priority</Label>
                <div className="grid grid-cols-4 gap-2">
                  {PRIORITIES.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setEditingTask({ ...editingTask, priority: p })}
                      className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-colors cursor-pointer ${
                        editingTask.priority === p
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted/40 hover:bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <DialogFooter className="pt-2">
                <DialogClose render={<Button type="button" variant="ghost">Cancel</Button>} />
                <Button type="submit" disabled={!editingTask.title.trim()}>
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
