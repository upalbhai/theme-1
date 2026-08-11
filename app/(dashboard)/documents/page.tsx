"use client";

import React, { useState } from "react";
import { Search, Upload, Folder, FileText, Image as ImageIcon, MoreVertical, FileArchive, ArrowDownToLine, Trash2, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription as DialogDesc } from "@/components/ui/dialog";

const DUMMY_FOLDERS = [
  { id: 1, name: "Project Assets", files: 12, size: "45 MB", color: "text-blue-500" },
  { id: 2, name: "Marketing Campaigns", files: 8, size: "120 MB", color: "text-emerald-500" },
  { id: 3, name: "Legal Documents", files: 24, size: "15 MB", color: "text-purple-500" },
  { id: 4, name: "Client Deliverables", files: 4, size: "2.1 GB", color: "text-amber-500" },
];

const INITIAL_FILES = [
  { id: 1, name: "Q3_Financial_Report.pdf", type: "pdf", size: "2.4 MB", date: "Sep 12, 2026", icon: FileText, iconColor: "text-red-500" },
  { id: 2, name: "Dashboard_Mockups_v2.png", type: "image", size: "4.1 MB", date: "Sep 10, 2026", icon: ImageIcon, iconColor: "text-blue-500" },
  { id: 3, name: "Enterprise_Contract_Signed.pdf", type: "pdf", size: "1.2 MB", date: "Sep 08, 2026", icon: FileText, iconColor: "text-red-500" },
  { id: 4, name: "Source_Code_Backup.zip", type: "archive", size: "156 MB", date: "Sep 01, 2026", icon: FileArchive, iconColor: "text-amber-500" },
  { id: 5, name: "Meeting_Notes_Aug.docx", type: "document", size: "15 KB", date: "Aug 28, 2026", icon: FileText, iconColor: "text-blue-600" },
];

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [files, setFiles] = useState(INITIAL_FILES);
  
  // Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const simulateUpload = (e?: React.ChangeEvent<HTMLInputElement>) => {
    let fileName = `New_Upload_${Math.floor(Math.random() * 1000)}.pdf`;
    if (e && e.target.files && e.target.files.length > 0) {
      fileName = e.target.files[0].name;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadComplete(false);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadComplete(true);
        setIsUploading(false);
        
        // Add a new dummy file
        setTimeout(() => {
          setFiles([{
            id: Date.now(),
            name: fileName,
            type: "pdf",
            size: "1.8 MB",
            date: "Just now",
            icon: FileText,
            iconColor: "text-red-500"
          }, ...files]);
          
          // Reset and close after a delay
          setTimeout(() => {
            setIsModalOpen(false);
            setUploadComplete(false);
            setUploadProgress(0);
          }, 800);
        }, 500);
      }
      setUploadProgress(progress);
    }, 400);
  };

  const deleteFile = (id: number) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage and securely share your workspace files.</p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger render={
            <Button className="gap-2 shadow-md shadow-primary/20 shrink-0">
              <Upload className="h-4 w-4" /> Upload File
            </Button>
          } />
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDesc>Upload a file to your workspace storage.</DialogDesc>
            </DialogHeader>
            <div className="py-6">
              {!isUploading && !uploadComplete ? (
                <label 
                  className="border-2 border-dashed border-primary/20 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 hover:border-primary/50 transition-colors"
                >
                  <input type="file" className="hidden" onChange={simulateUpload} />
                  <div className="p-3 bg-primary/10 rounded-full mb-3 text-primary">
                    <Upload className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-sm">Click to browse or drag and drop</h3>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, PNG, JPG up to 50MB</p>
                </label>
              ) : (
                <div className="space-y-6 p-4">
                  <div className="flex flex-col items-center justify-center text-center space-y-3">
                    {uploadComplete ? (
                      <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center animate-in zoom-in">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center animate-pulse">
                        <Upload className="h-6 w-6" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold">{uploadComplete ? 'Upload Complete!' : 'Uploading file...'}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {uploadComplete ? 'Processing and saving document.' : `Please wait, ${Math.round(uploadProgress)}% done`}
                      </p>
                    </div>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Folders Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Folders</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DUMMY_FOLDERS.map((folder) => (
            <Card key={folder.id} className="border-border/50 shadow-sm hover:shadow-md transition-shadow cursor-pointer group bg-card">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg bg-muted group-hover:bg-background transition-colors ${folder.color}`}>
                    <Folder className="h-6 w-6" fill="currentColor" fillOpacity={0.2} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm line-clamp-1">{folder.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{folder.files} files • {folder.size}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Files Section */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Recent Files</CardTitle>
              <CardDescription>Files uploaded or modified recently.</CardDescription>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search files..." 
                className="pl-9 bg-muted/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filteredFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 hover:bg-muted/10 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg bg-muted ${file.iconColor}`}>
                    <file.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm group-hover:text-primary transition-colors cursor-pointer">{file.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Uploaded {file.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground font-medium hidden sm:inline-block">{file.size}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <ArrowDownToLine className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteFile(file.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground md:hidden">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {filteredFiles.length === 0 && (
              <div className="p-12 text-center text-muted-foreground">
                <Folder className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>No files found matching your search.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
