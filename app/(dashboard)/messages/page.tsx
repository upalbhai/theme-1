"use client";

import React, { Suspense } from "react";
import { MockChatApiProvider } from "@/components/chat/MockChatApiProvider";
import { ChatsPageContent } from "@/components/chat/ChatsPageContent";
import { AuthProvider } from "@/context/AuthContext";

export default function MessagesPage() {
  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-theme(spacing.16))] mx-auto w-full max-w-[1600px]">
      <AuthProvider>
        <MockChatApiProvider>
          <Suspense fallback={<div className="flex items-center justify-center flex-1">Loading...</div>}>
            <ChatsPageContent />
          </Suspense>
        </MockChatApiProvider>
      </AuthProvider>
    </div>
  );
}
