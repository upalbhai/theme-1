"use client";

import React from "react";
import { MockChatApiProvider } from "@/components/chat/MockChatApiProvider";
import { ChatsPageContent } from "@/components/chat/ChatsPageContent";
import { AuthProvider } from "@/context/AuthContext";

export default function MessagesPage() {
  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-theme(spacing.16))] p-4 md:p-6 mx-auto w-full max-w-[1600px]">
      <AuthProvider>
        <MockChatApiProvider>
          <ChatsPageContent />
        </MockChatApiProvider>
      </AuthProvider>
    </div>
  );
}
