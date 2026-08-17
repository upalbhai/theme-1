'use client';

import React, { createContext, useContext } from 'react';
import { ChatApi } from '@/types/chat';

const ChatApiContext = createContext<ChatApi | null>(null);

export function ChatApiProvider({ api, children }: { api: ChatApi; children: React.ReactNode }) {
  return <ChatApiContext.Provider value={api}>{children}</ChatApiContext.Provider>;
}

export function useChatApi(): ChatApi {
  const ctx = useContext(ChatApiContext);
  if (!ctx) {
    throw new Error('useChatApi must be used within ChatApiProvider');
  }
  return ctx;
}
