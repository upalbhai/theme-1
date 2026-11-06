"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isComponentRoute = pathname?.startsWith("/components");

  if (isComponentRoute) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Topbar isComponentRoute={true} />
        <div className="flex-1 w-full">
          {children}
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
