"use client";

import React, { useState } from "react";
import { Plus, CheckCircle2, Circle, Clock, MoreVertical, Calendar, Flag, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";

const INITIAL_TASKS = [
  { id: 1, title: "Review Q3 Marketing Strategy", category: "Marketing", date: "Today", priority: "High", completed: false },
  { id: 2, title: "Finalize Enterprise SaaS Proposal", category: "Sales", date: "Tomorrow", priority: "Urgent", completed: false },
  { id: 3, title: "Update CRM Access Roles", category: "Admin", date: "Oct 12", priority: "Medium", completed: true },
  { id: 4, title: "Follow up with Apex Corp Lead", category: "Sales", date: "Today", priority: "High", completed: false },
  { id: 5, title: "Weekly Sync with Design Team", category: "Internal", date: "Oct 14", priority: "Low", completed: false },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  
  // New Task State
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("General");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [isOpen, setIsOpen] = useState(false);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };
  
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      category: newTaskCategory,
      priority: newTaskPriority,
      date: "Today",
      completed: false
    };
    
    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
    setNewTaskCategory("General");
    setNewTaskPriority("Medium");
    setIsOpen(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "High": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Medium": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Low": return "bg-slate-500/10 text-slate-500 border-slate-500/20";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage your daily priorities and team assignments.</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger render={
            <Button className="gap-2 shadow-md shadow-primary/20 shrink-0">
              <Plus className="h-4 w-4" /> New Task
            </Button>
          } />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateTask} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Call John from Acme Corp" 
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input 
                  id="category" 
                  placeholder="e.g. Sales, Marketing" 
                  value={newTaskCategory}
                  onChange={e => setNewTaskCategory(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <div className="flex gap-2 flex-wrap">
                  {["Low", "Medium", "High", "Urgent"].map(p => (
                    <Button 
                      key={p} 
                      type="button" 
                      variant={newTaskPriority === p ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setNewTaskPriority(p)}
                      className={newTaskPriority === p ? getPriorityColor(p) + " bg-background shadow-none border" : ""}
                    >
                      {p}
                    </Button>
                  ))}
                </div>
              </div>
              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button type="button" variant="ghost">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={!newTaskTitle.trim()}>Create Task</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle>My Tasks</CardTitle>
          <CardDescription>You have {tasks.filter(t => !t.completed).length} incomplete tasks remaining.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all hover:shadow-sm gap-4 ${task.completed ? 'bg-muted/30 opacity-70' : 'bg-card'}`}>
              <div className="flex gap-4 items-start sm:items-center w-full">
                <button onClick={() => toggleTask(task.id)} className="mt-0.5 sm:mt-0 text-muted-foreground hover:text-primary transition-colors focus:outline-none shrink-0">
                  {task.completed ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Circle className="h-5 w-5" />}
                </button>
                <div className="space-y-1 flex-1">
                  <p className={`text-sm font-medium leading-none ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2 sm:pt-1.5 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-[10px] font-normal rounded-md bg-muted/50">{task.category}</Badge>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {task.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-end sm:w-auto w-full pl-9 sm:pl-0">
                {!task.completed && <Badge variant="outline" className={`text-[10px] uppercase tracking-wider font-semibold ${getPriorityColor(task.priority)}`}>{task.priority}</Badge>}
                <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)} className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>All caught up! No tasks left.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
