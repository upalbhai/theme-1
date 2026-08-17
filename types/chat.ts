export interface ChatMember {
  id: number;
  name: string;
  email?: string;
  user_type?: string;
  role_id?: number;
  is_active?: boolean;
  phone_number?: string | null;
  company_name?: string | null;
  address?: string | null;
  more_info?: string | null;
  profile_picture?: string;
}

export interface ChatChannel {
  id: number;
  project_id: number;
  type: 'internal' | 'external' | 'custom' | 'direct';
  name: string;
  members: ChatMember[];
  is_private?: boolean;
  created_at?: string;
}

export interface ChatMessage {
  id: number;
  chat_channel_id: number;
  channel_name?: string;
  sender_id: number;
  sender?: ChatMember;
  content?: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  mime_type?: string;
  file_category?: string;
  is_pinned?: boolean;
  is_ripple?: boolean;
  is_sent?: boolean;
  created_at?: string;
  send_at?: string;
  is_edited?: boolean;
  parent_id?: number | null;
  parent_message?: ChatMessage | null;
  reactions?: any[] | null;
}

export interface CreateChatChannelPayload {
  project_id: number;
  type: 'internal' | 'external' | 'direct';
  name: string;
  member_ids: number[];
}

export interface InviteMembersPayload {
  user_ids: number[];
}

export interface SendMessagePayload {
  content?: string;
  send_at?: string;
  is_ripple?: boolean;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  mime_type?: string;
  file_category?: string;
  parent_id?: number | null;
}

export interface UploadMediaResponse {
  file_url: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  file_category: string;
}

export interface WsEvent {
  type: 'chat' | 'project' | 'ripple' | 'read_later' | 'message_edited' | 'message_reaction_updated' | 'message_deleted';
  title: string;
  message: string;
  data: any;
  created_at?: string;
}

// ─── Chat Summary ──────────────────────────────────────────────────────────

export interface ChatSummaryResponse {
  timeframe: string;
  summary: string;
}

// ─── Saved Messages ────────────────────────────────────────────────────────

export interface SavedMessage {
  id: number;
  user_id: number;
  message_id: number;
  message: ChatMessage;
  created_at?: string;
}

export interface SavedMessagesResponse {
  total: number;
  page: number;
  page_size: number;
  data: SavedMessage[];
}

// ─── Library ───────────────────────────────────────────────────────────────

export type FileCategory = 'image' | 'pdf' | 'document' | 'audio' | 'video' | 'zip';

export interface LibraryResponse {
  total: number;
  page: number;
  page_size: number;
  data: ChatMessage[];
}

// ─── Templates ─────────────────────────────────────────────────────────────

export interface MessageTemplate {
  id: number;
  user_id: number;
  title: string;
  content?: string;
  file_url?: string | null;
  file_name?: string | null;
  file_size?: number | null;
  mime_type?: string | null;
  file_category?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTemplatePayload {
  title: string;
  content?: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  mime_type?: string;
  file_category?: string;
}

export interface CreateTemplateFromMessagePayload {
  title: string;
  channel_id: number;
  message_id: number;
}

export interface UpdateTemplatePayload {
  title?: string;
  content?: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  mime_type?: string;
  file_category?: string;
}

// ─── Read Later ─────────────────────────────────────────────────────────────

export interface ReadLaterEntry {
  id: number;
  user_id: number;
  message_id: number;
  message: ChatMessage;
  remind_at: string | null;
  is_notified: boolean;
  created_at?: string;
}

export interface PaginationMeta {
  total_items: number;
  total_pages: number;
  current_page: number;
  items_per_page: number;
}

export interface ApiListResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ChatApiConfig {
  queryKeys: {
    channels: string;
    messages: (channelId: number) => readonly (string | number)[];
    readLater: string;
    saved: string;
    templates: string;
    summary: (channelId: number) => readonly (string | number)[];
    library: string;
  };
  features: {
    canDeleteChannel: boolean;
    canInviteMembers: boolean;
    summaryHasTimeframe: boolean;
    createChannelRequiresProject: boolean;
    supportsRipple: boolean;
  };
}

export interface ChatApi {
  config: ChatApiConfig;
  getChatChannels: (page?: number, pageSize?: number, search?: string) => Promise<ApiListResponse<ChatChannel>>;
  createChatChannel: (payload: CreateChatChannelPayload | { name: string; is_private?: boolean }) => Promise<{ message?: string; data: ChatChannel }>;
  getOrCreateDirectChat?: (userId: number) => Promise<{ message?: string; data: ChatChannel }>;
  inviteToChannel?: (id: number, payload: InviteMembersPayload) => Promise<{ message: string }>;
  deleteChatChannel?: (id: number) => Promise<{ message: string }>;
  getChatMessages: (id: number, page?: number, pageSize?: number) => Promise<ApiListResponse<ChatMessage>>;
  sendChatMessage: (id: number, payload: SendMessagePayload) => Promise<{ message: string; data: ChatMessage }>;
  uploadChatMedia: (file: File) => Promise<{ data: UploadMediaResponse }>;
  pinChatMessage: (channelId: number, messageId: number) => Promise<{ message: string }>;
  unpinChatMessage: (channelId: number, messageId: number) => Promise<{ message: string }>;
  deleteChatMessage: (channelId: number, messageId: number, deleteType: 'me' | 'everyone') => Promise<{ message: string }>;
  editChatMessage: (channelId: number, messageId: number, content: string) => Promise<{ message: string; data: ChatMessage }>;
  toggleMessageReaction: (channelId: number, messageId: number, reaction: string) => Promise<{ message: string; data: any[] }>;
  forwardChatMessage: (channelId: number, messageId: number, targetChannelId: number) => Promise<{ message: string; data: ChatMessage }>;
  bulkDeleteChatMessages: (channelId: number, messageIds: number[], deleteType: 'me' | 'everyone') => Promise<{ message: string; deleted_ids: number[]; delete_type: string }>;
  saveMessage: (channelId: number, messageId: number) => Promise<{ message: string }>;
  unsaveMessage?: (channelId: number, messageId: number) => Promise<{ message: string }>;
  getSavedMessages: (page?: number, pageSize?: number) => Promise<SavedMessagesResponse>;
  getChatSummary: (channelId: number, timeframe?: 'today' | 'yesterday' | 'week') => Promise<ChatSummaryResponse>;
  getChatLibrary: (params?: { category?: FileCategory | string; page?: number; page_size?: number }) => Promise<LibraryResponse>;
  getTemplates: (page?: number, pageSize?: number) => Promise<{ total: number; page: number; page_size: number; data: MessageTemplate[] }>;
  createTemplate: (payload: CreateTemplatePayload) => Promise<{ message: string; data?: MessageTemplate }>;
  createTemplateFromMessage?: (payload: CreateTemplateFromMessagePayload) => Promise<{ message: string }>;
  updateTemplate?: (templateId: number, payload: UpdateTemplatePayload) => Promise<{ message: string }>;
  deleteTemplate: (templateId: number) => Promise<{ message: string }>;
  addToReadLater: (channelId: number, messageId: number, remindAt?: string | null) => Promise<{ message: string }>;
  removeFromReadLater: (channelId: number, messageId: number) => Promise<{ message: string }>;
  getReadLaterList: (page?: number, pageSize?: number) => Promise<{ total: number; page: number; page_size: number; data: ReadLaterEntry[] }>;
  updateReadLaterReminder: (readLaterId: number, remindAt?: string | null) => Promise<{ message: string }>;
}




