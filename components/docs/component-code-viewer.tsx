"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Terminal } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ComponentCodeViewerProps {
  importStatement: string;
  codeUsage: string;
  slug: string;
}

export function ComponentCodeViewer({
  importStatement,
  codeUsage,
  slug,
}: ComponentCodeViewerProps) {
  const [copiedUsage, setCopiedUsage] = React.useState(false);
  const [copiedImport, setCopiedImport] = React.useState(false);
  const [copiedInstall, setCopiedInstall] = React.useState(false);

  const copy = (text: string, type: "usage" | "import" | "install") => {
    navigator.clipboard.writeText(text);
    if (type === "usage") {
      setCopiedUsage(true);
      setTimeout(() => setCopiedUsage(false), 2000);
      toast.success("Usage code copied to clipboard!");
    } else if (type === "import") {
      setCopiedImport(true);
      setTimeout(() => setCopiedImport(false), 2000);
      toast.success("Import statement copied to clipboard!");
    } else {
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
      toast.success("Installation command copied to clipboard!");
    }
  };

  const fullCode = `${importStatement}\n\nexport default function Example() {\n  return (\n    ${codeUsage.replace(/\n/g, "\n    ")}\n  );\n}`;

  return (
    <div className="rounded-2xl border bg-card overflow-hidden shadow-xs">
      <Tabs defaultValue="usage" className="w-full">
        <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-b">
          <TabsList className="bg-background/80 border h-8">
            <TabsTrigger value="usage" className="text-xs">Usage TSX</TabsTrigger>
            <TabsTrigger value="full" className="text-xs">Complete Component</TabsTrigger>
            <TabsTrigger value="install" className="text-xs">Install & Import</TabsTrigger>
          </TabsList>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => copy(codeUsage, "usage")}
            className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            {copiedUsage ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
            {copiedUsage ? "Copied" : "Copy Code"}
          </Button>
        </div>

        <TabsContent value="usage" className="p-0 m-0">
          <pre className="p-5 overflow-x-auto text-xs font-mono bg-zinc-950 text-zinc-100 leading-relaxed rounded-b-2xl">
            <code>{codeUsage}</code>
          </pre>
        </TabsContent>

        <TabsContent value="full" className="p-0 m-0">
          <pre className="p-5 overflow-x-auto text-xs font-mono bg-zinc-950 text-zinc-100 leading-relaxed rounded-b-2xl">
            <code>{fullCode}</code>
          </pre>
        </TabsContent>

        <TabsContent value="install" className="p-0 m-0">
          <div className="p-5 bg-zinc-950 text-zinc-100 space-y-4 rounded-b-2xl text-xs font-mono">
            <div>
              <p className="text-zinc-400 text-[11px] mb-1 font-sans uppercase tracking-wider">1. Required Dependencies</p>
              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                <code>npm install motion react-use-measure</code>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => copy("npm install motion react-use-measure", "install")}
                  className="size-7 text-zinc-400 hover:text-white"
                >
                  {copiedInstall ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                </Button>
              </div>
            </div>

            <div>
              <p className="text-zinc-400 text-[11px] mb-1 font-sans uppercase tracking-wider">2. Import in your file</p>
              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                <code>{importStatement}</code>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => copy(importStatement, "import")}
                  className="size-7 text-zinc-400 hover:text-white"
                >
                  {copiedImport ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

