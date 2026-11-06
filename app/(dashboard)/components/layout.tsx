import * as React from "react";
import { ComponentsSidebar } from "@/components/docs/components-sidebar";
import { ComponentCommandMenu } from "@/components/docs/component-command-menu";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Documentation Sidebar */}
      <ComponentsSidebar />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          {children}
        </div>
      </main>

      {/* Global Command Menu */}
      <ComponentCommandMenu />
    </div>
  );
}

