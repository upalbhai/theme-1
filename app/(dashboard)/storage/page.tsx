"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  HardDrive, 
  Folder, 
  FileText, 
  Image as ImageIcon, 
  FileCode, 
  Archive, 
  Upload, 
  Download, 
  Trash2, 
  MoreVertical, 
  FolderPlus,
  Share2,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StorageFile {
  id: string;
  name: string;
  type: "Document" | "Image" | "Code" | "Archive";
  size: string;
  updated: string;
  owner: string;
}

const INITIAL_FILES: StorageFile[] = [
  { id: "FILE-101", name: "Q4_Enterprise_Financial_Report.pdf", type: "Document", size: "4.8 MB", updated: "Oct 12, 2026", owner: "Sarah Jenkins" },
  { id: "FILE-102", name: "Apex_CRM_Mockup_V3.png", type: "Image", size: "12.4 MB", updated: "Oct 10, 2026", owner: "Michael Vance" },
  { id: "FILE-103", name: "Billing_Schema_Database.sql", type: "Code", size: "850 KB", updated: "Oct 08, 2026", owner: "David Ray" },
  { id: "FILE-104", name: "Project_Assets_Bundle_2026.zip", type: "Archive", size: "145.2 MB", updated: "Oct 05, 2026", owner: "Emma Watson" },
  { id: "FILE-105", name: "Brand_Guidelines_Presentation.pdf", type: "Document", size: "8.1 MB", updated: "Sep 28, 2026", owner: "Sophia Chen" },
];

const folders = [
  { name: "Project Assets", count: "48 Files", size: "1.2 GB", color: "bg-blue-500/10 text-blue-600" },
  { name: "UI Design Mockups", count: "124 Files", size: "4.5 GB", color: "bg-purple-500/10 text-purple-600" },
  { name: "Invoices & Receipts", count: "89 Files", size: "650 MB", color: "bg-emerald-500/10 text-emerald-600" },
  { name: "Marketing Media", count: "312 Files", size: "12.8 GB", color: "bg-amber-500/10 text-amber-600" },
];

export default function StoragePage() {
  const [files, setFiles] = useState<StorageFile[]>(INITIAL_FILES);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Upload file state
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState<StorageFile["type"]>("Document");
  const [fileSize, setFileSize] = useState("");

  const handleUploadFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    const newFile: StorageFile = {
      id: `FILE-${Math.floor(100 + Math.random() * 900)}`,
      name: fileName,
      type: fileType,
      size: fileSize ? (fileSize.endsWith("MB") || fileSize.endsWith("KB") ? fileSize : `${fileSize} MB`) : "2.4 MB",
      updated: "Today",
      owner: "Sarah Jenkins",
    };

    setFiles([newFile, ...files]);
    setFileName("");
    setFileType("Document");
    setFileSize("");
    setIsOpen(false);
  };

  const deleteFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (type: StorageFile["type"]) => {
    switch (type) {
      case "Image":
        return <ImageIcon className="h-4 w-4 text-purple-500" />;
      case "Code":
        return <FileCode className="h-4 w-4 text-emerald-500" />;
      case "Archive":
        return <Archive className="h-4 w-4 text-amber-500" />;
      default:
        return <FileText className="h-4 w-4 text-blue-500" />;
    }
  };

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
                <BreadcrumbPage>Storage Drive</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-2xl font-bold tracking-tight mt-2">Cloud Storage Drive</h2>
        </div>

        {/* Upload File Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger render={
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20">
              <Upload className="h-4 w-4" /> Upload File
            </Button>
          } />
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Upload File to Storage</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUploadFile} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="file-name">File Name</Label>
                <Input 
                  id="file-name" 
                  placeholder="e.g. Q4_Strategy_Deck.pdf" 
                  value={fileName} 
                  onChange={e => setFileName(e.target.value)} 
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>File Type</Label>
                  <select
                    value={fileType}
                    onChange={e => setFileType(e.target.value as StorageFile["type"])}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="Document">Document</option>
                    <option value="Image">Image</option>
                    <option value="Code">Code / Script</option>
                    <option value="Archive">Archive (ZIP)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-size">File Size (e.g. 5.2 MB)</Label>
                  <Input 
                    id="file-size" 
                    placeholder="5.2 MB" 
                    value={fileSize} 
                    onChange={e => setFileSize(e.target.value)} 
                  />
                </div>
              </div>

              <DialogFooter className="pt-4">
                <DialogClose render={<Button type="button" variant="ghost">Cancel</Button>} />
                <Button type="submit" disabled={!fileName.trim()}>
                  Upload
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Storage Capacity Bar Card */}
      <Card className="shadow-sm border border-border/60 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-bold">Cloud Storage Capacity</h3>
              </div>
              <p className="text-xs text-slate-300">74.5 GB used of 100 GB total storage space (74.5% capacity)</p>
            </div>
            <Button variant="secondary" size="sm" className="self-start sm:self-auto font-semibold">
              Upgrade Storage Plan
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="h-3 w-full bg-slate-700/60 rounded-full overflow-hidden flex">
            <div className="h-full bg-blue-500" style={{ width: '40%' }} title="Documents (40 GB)"></div>
            <div className="h-full bg-purple-500" style={{ width: '20%' }} title="Images (20 GB)"></div>
            <div className="h-full bg-emerald-500" style={{ width: '10%' }} title="Code (10 GB)"></div>
            <div className="h-full bg-amber-500" style={{ width: '4.5%' }} title="Archives (4.5 GB)"></div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-1">
            <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div> Documents (40 GB)</div>
            <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-purple-500"></div> Images (20 GB)</div>
            <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-emerald-500"></div> Code & Scripts (10 GB)</div>
            <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-amber-500"></div> Archives (4.5 GB)</div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Folders */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold tracking-tight">Quick Access Folders</h3>
          <Button variant="ghost" size="sm" className="text-xs text-blue-600 gap-1 font-semibold">
            <FolderPlus className="h-3.5 w-3.5" /> Create Folder
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {folders.map((f, idx) => (
            <Card key={idx} className="shadow-sm border border-border/60 hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${f.color}`}>
                  <Folder className="h-6 w-6" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-sm leading-tight">{f.name}</h4>
                  <p className="text-xs text-muted-foreground">{f.count} • {f.size}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Files Directory Table */}
      <Card className="shadow-sm border border-border/60">
        <CardHeader className="pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-bold">Recent Drive Files</CardTitle>
            <CardDescription>Manage and download assets across your workspace</CardDescription>
          </div>
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search files by name, type, or owner..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>File Name & Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>File Size</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No files found matching search query.
                  </TableCell>
                </TableRow>
              ) : (
                filteredFiles.map((file) => (
                  <TableRow key={file.id} className="hover:bg-muted/40">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted/60 rounded-lg">
                          {getFileIcon(file.type)}
                        </div>
                        <div>
                          <span className="font-bold text-sm block leading-tight">{file.name}</span>
                          <span className="text-[10px] font-mono text-muted-foreground">{file.id}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{file.type}</Badge></TableCell>
                    <TableCell className="font-semibold text-xs text-muted-foreground">{file.size}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{file.updated}</TableCell>
                    <TableCell className="text-xs font-medium">{file.owner}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger render={
                          <Button variant="ghost" size="icon-sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        } />
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2"><Download className="h-4 w-4" /> Download</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2"><Share2 className="h-4 w-4" /> Share Link</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-rose-600" onClick={() => deleteFile(file.id)}>
                            <Trash2 className="h-4 w-4" /> Delete File
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
