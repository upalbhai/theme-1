'use client';

import React from 'react';
import { ChatApiProvider } from '@/context/ChatApiContext';
import { ChatApi } from '@/types/chat';

// Module level state to persist messages across query invalidations
const mockMessagesState: Record<number, any[]> = {
  1: [
    { id: 1, content: 'Hey team!', sender_id: 1, sender: { id: 1, name: 'Sarah Jenkins' }, chat_channel_id: 1, created_at: new Date(Date.now() - 600000).toISOString(), is_pinned: false, reactions: [] },
    { id: 2, content: 'Are we on for the meeting?', sender_id: 2, sender: { id: 2, name: 'David Chen', profile_picture: 'https://i.pravatar.cc/150?u=david' }, chat_channel_id: 1, created_at: new Date(Date.now() - 300000).toISOString(), is_pinned: false, reactions: [] },
    { id: 99, content: '', sender_id: 2, sender: { id: 2, name: 'David Chen', profile_picture: 'https://i.pravatar.cc/150?u=david' }, chat_channel_id: 1, created_at: new Date().toISOString(), is_pinned: false, file_url: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=600&auto=format&fit=crop', file_category: 'image', file_name: 'office.jpg', reactions: [] },
  ],
  3: [
    { id: 3, content: 'Could you review the new designs?', sender_id: 2, sender: { id: 2, name: 'David Chen', profile_picture: 'https://i.pravatar.cc/150?u=david' }, chat_channel_id: 3, created_at: new Date(Date.now() - 3600000).toISOString(), is_pinned: false, reactions: [] },
    { id: 4, content: 'Sure, taking a look now!', sender_id: 1, sender: { id: 1, name: 'Sarah Jenkins' }, chat_channel_id: 3, created_at: new Date().toISOString(), is_pinned: false, reactions: [] },
  ],
  4: [
    { id: 5, content: 'Please send over the updated pitch deck.', sender_id: 4, sender: { id: 4, name: 'Emily Davis', profile_picture: 'https://i.pravatar.cc/150?u=emily' }, chat_channel_id: 4, created_at: new Date(Date.now() - 7200000).toISOString(), is_pinned: false, reactions: [] },
  ],
};

let mockChannelsState = [
  { id: 1, project_id: 0, name: 'General', type: 'internal' as const, members: [{id: 1, name: 'Sarah Jenkins'}, {id: 2, name: 'David Chen'}], created_at: new Date().toISOString() },
  { id: 2, project_id: 0, name: 'Marketing', type: 'internal' as const, members: [{id: 1, name: 'Sarah Jenkins'}, {id: 3, name: 'Emma Wilson'}], created_at: new Date().toISOString() },
  { id: 3, project_id: 0, name: 'Sarah Jenkins', type: 'direct' as const, members: [{id: 1, name: 'Sarah Jenkins'}, {id: 2, name: 'David Chen', profile_picture: 'https://i.pravatar.cc/150?u=david'}], created_at: new Date().toISOString() },
  { id: 4, project_id: 0, name: 'Emily Davis', type: 'direct' as const, members: [{id: 1, name: 'Sarah Jenkins'}, {id: 4, name: 'Emily Davis', profile_picture: 'https://i.pravatar.cc/150?u=emily'}], created_at: new Date().toISOString() },
];

const mockApi: ChatApi = {
  config: {
    queryKeys: {
      channels: 'channels',
      messages: (id) => ['messages', id],
      readLater: 'readLater',
      saved: 'saved',
      templates: 'templates',
      summary: (id) => ['summary', id],
      library: 'library',
    },
    features: {
      canDeleteChannel: true,
      canInviteMembers: true,
      summaryHasTimeframe: true,
      createChannelRequiresProject: false,
      supportsRipple: true,
    }
  },
  getChatChannels: async () => ({
    data: mockChannelsState,
    meta: { total_items: mockChannelsState.length, total_pages: 1, current_page: 1, items_per_page: 10 }
  }),
  createChatChannel: async (payload: any) => {
    const newChannel = {
      id: Date.now(),
      project_id: payload.project_id || 0,
      name: payload.name || 'New Channel',
      type: payload.type || 'internal',
      members: [],
      created_at: new Date().toISOString()
    };
    mockChannelsState.push(newChannel);
    return { data: newChannel };
  },
  deleteChatChannel: async (id: number) => {
    mockChannelsState = mockChannelsState.filter(c => c.id !== id);
    return { message: 'Channel deleted' };
  },
  getChatMessages: async (id: number) => {
    if (!mockMessagesState[id]) {
      mockMessagesState[id] = [
        { id: 6, content: 'Welcome to the channel!', sender_id: 3, sender: { id: 3, name: 'Emma Wilson', profile_picture: 'https://i.pravatar.cc/150?u=emma' }, chat_channel_id: id, created_at: new Date().toISOString(), is_pinned: false, reactions: [] },
      ];
    }
    const data = mockMessagesState[id];
    return { data, meta: { total_items: data.length, total_pages: 1, current_page: 1, items_per_page: 15 } };
  },
  sendChatMessage: async (channelId, payload) => {
    const newMessage = {
      id: Date.now(),
      content: payload.content || '',
      file_url: payload.file_url,
      file_name: payload.file_name,
      file_category: payload.file_category,
      mime_type: payload.mime_type,
      file_size: payload.file_size,
      sender_id: 1,
      sender: { id: 1, name: 'Sarah Jenkins' },
      chat_channel_id: channelId,
      created_at: new Date().toISOString(),
      is_pinned: false,
      reactions: [],
    };
    if (!mockMessagesState[channelId]) {
      mockMessagesState[channelId] = [];
    }
    mockMessagesState[channelId].push(newMessage);
    return { message: 'Sent', data: newMessage };
  },
  uploadChatMedia: async (file: File) => {
    const url = URL.createObjectURL(file);
    return { data: { file_url: url, file_name: file.name, file_size: file.size, mime_type: file.type, file_category: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document' } };
  },
  pinChatMessage: async () => ({ message: 'Pinned' }),
  unpinChatMessage: async () => ({ message: 'Unpinned' }),
  deleteChatMessage: async (channelId, messageId) => {
    const messages = mockMessagesState[channelId] || [];
    mockMessagesState[channelId] = messages.filter(m => m.id !== messageId);
    return { message: 'Deleted' };
  },
  editChatMessage: async (channelId, messageId, content) => {
    const messages = mockMessagesState[channelId] || [];
    const msg = messages.find(m => m.id === messageId);
    if (msg) {
      msg.content = content;
      msg.is_edited = true;
      return { message: 'Edited', data: msg };
    }
    return { message: 'Message not found', data: {} as any };
  },
  toggleMessageReaction: async (channelId, messageId, reaction) => {
    const messages = mockMessagesState[channelId] || [];
    const msg = messages.find(m => m.id === messageId);
    if (msg) {
      if (!msg.reactions) msg.reactions = [];
      const existingReactionIndex = msg.reactions.findIndex((r: any) => r.user_id === 1 && r.reaction === reaction);
      if (existingReactionIndex > -1) {
        msg.reactions.splice(existingReactionIndex, 1);
      } else {
        msg.reactions.push({
          reaction,
          user_id: 1,
          user: { id: 1, name: 'Sarah Jenkins' }
        });
      }
      return { message: 'Reacted', data: msg.reactions };
    }
    return { message: 'Message not found', data: [] };
  },
  forwardChatMessage: async () => ({ message: 'Forwarded', data: { id: 1, content: '', sender_id: 1, sender: { id: 1, name: 'Sarah Jenkins' }, chat_channel_id: 1, created_at: new Date().toISOString(), is_pinned: false } }),
  bulkDeleteChatMessages: async () => ({ message: 'Bulk Deleted', deleted_ids: [], delete_type: 'me' }),
  saveMessage: async () => ({ message: 'Saved' }),
  getSavedMessages: async () => ({ data: [], total: 0, page: 1, page_size: 30 }),
  getChatSummary: async () => ({ id: 1, chat_channel_id: 1, summary: 'This is a summary', generated_at: new Date().toISOString(), timeframe: 'today', action_items: [] }),
  getChatLibrary: async () => ({ total: 0, page: 1, page_size: 40, data: [] }),
  getTemplates: async () => ({ total: 0, page: 1, page_size: 50, data: [] }),
  createTemplate: async () => ({ message: 'Created' }),
  deleteTemplate: async () => ({ message: 'Deleted' }),
  addToReadLater: async () => ({ message: 'Added' }),
  removeFromReadLater: async () => ({ message: 'Removed' }),
  getReadLaterList: async () => ({ total: 0, page: 1, page_size: 40, data: [] }),
  updateReadLaterReminder: async () => ({ message: 'Updated' }),
};

export function MockChatApiProvider({ children }: { children: React.ReactNode }) {
  return <ChatApiProvider api={mockApi}>{children}</ChatApiProvider>;
}
