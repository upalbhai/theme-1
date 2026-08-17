'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query';
import {
  MessageSquare,
  Sparkles,
  Library,
  FileText,
  Bookmark,
  Clock,
  Trash2,
  Edit,
  Bell,
  Pin,
  X,
  File,
  Volume2,
  Video,
  Archive,
  ExternalLink,
} from 'lucide-react';
import { useChatApi } from '@/context/ChatApiContext';
import { ChatChannel, ChatMessage, MessageTemplate, ReadLaterEntry, CreateTemplatePayload } from '@/types/chat';
import { ReadLaterModal } from '@/components/chat/ReadLaterModal';
import { ChannelMembersPanel } from '@/components/chat/ChannelMembersPanel';
import { formatChatDayLabel, isSameCalendarDay, getChannelDisplayName } from '@/utils/format';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import toast from 'react-hot-toast';

const useWebSocket = () => ({
  isConnected: true,
  subscribe: (callback: any) => () => {},
});

const getMediaUrl = (url: string | null | undefined): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:') || url.startsWith('data:')) {
    return url;
  }

  let baseUrl = process.env.NEXT_PUBLIC_MEDIA_URL || 'http://192.168.1.75:8003/media';

  if (typeof window !== 'undefined') {
    const currentHostname = window.location.hostname;
    if (currentHostname && currentHostname !== 'localhost' && currentHostname !== '127.0.0.1') {
      try {
        const urlObj = new URL(baseUrl);
        if (urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1') {
          urlObj.hostname = currentHostname;
          baseUrl = urlObj.toString();
        }
      } catch (e) {
        // ignore URL parsing issues
      }
    }
  }

  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  let targetPath = url;

  if (targetPath.startsWith('/uploads/')) {
    targetPath = targetPath.slice(8);
  } else if (targetPath.startsWith('uploads/')) {
    targetPath = '/' + targetPath.slice(8);
  } else if (!targetPath.startsWith('/')) {
    targetPath = '/' + targetPath;
  }

  return `${cleanBase}${targetPath}`;
};

interface ChatWindowProps {
  channel: ChatChannel;
  user: any;
  queryClient: any;
  onBack: () => void;
  activePanel: 'chat' | 'summary' | 'library' | 'templates' | 'saved' | 'read-later';
  setActivePanel: (panel: 'chat' | 'summary' | 'library' | 'templates' | 'saved' | 'read-later') => void;
  highlightedMessageId: number | null;
  onHighlightCleared: () => void;
  onNavigateToMessage: (channelId: number, messageId: number) => void;
  onDeleteSuccess?: () => void;
}

export function ChatWindow({
  channel,
  user,
  queryClient,
  onBack,
  activePanel,
  setActivePanel,
  highlightedMessageId,
  onHighlightCleared,
  onNavigateToMessage,
  onDeleteSuccess,
}: ChatWindowProps) {
  const chatApi = useChatApi();
  const { queryKeys, features } = chatApi.config;
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [scheduledAt, setScheduledAt] = useState('');
  const [showSchedule, setShowSchedule] = useState(false);
  const [sendFeedback, setSendFeedback] = useState<string | null>(null);
  const [summaryTimeframe, setSummaryTimeframe] = useState<'today' | 'yesterday' | 'week'>('today');
  const [libraryCategory, setLibraryCategory] = useState<string>('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplate | null>(null);
  const [newTemplateTitle, setNewTemplateTitle] = useState('');
  const [newTemplateContent, setNewTemplateContent] = useState('');
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [isTemplateUploading, setIsTemplateUploading] = useState(false);
  const [draftTemplateMedia, setDraftTemplateMedia] = useState<{
    file_url: string;
    file_name: string;
    file_size?: number;
    mime_type?: string;
    file_category?: string;
  } | null>(null);
  const [deletingMessage, setDeletingMessage] = useState<ChatMessage | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const templateFileInputRef = useRef<HTMLInputElement>(null);

  // Read Later states
  const [readLaterModalData, setReadLaterModalData] = useState<{
    channelId: number;
    messageId: number;
    initialRemindAt?: string | null;
    readLaterId?: number;
  } | null>(null);

  const [pulsingMessageId, setPulsingMessageId] = useState<number | null>(null);
  const [lightboxMedia, setLightboxMedia] = useState<{ url: string; category: string; name: string; mimeType?: string } | null>(null);
  const [summaryTimeframeGenerated, setSummaryTimeframeGenerated] = useState<Record<string, boolean>>({});
  const [showMembers, setShowMembers] = useState(false);

  // Replying, editing, forwarding, bulk select
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [editingMessage, setEditingMessage] = useState<ChatMessage | null>(null);
  const [forwardingMessage, setForwardingMessage] = useState<ChatMessage | null>(null);
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [isBulkSelectMode, setIsBulkSelectMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const composerRef = useRef<HTMLDivElement>(null);

  // Keep state synced from content changes
  const handleInput = () => {
    if (composerRef.current) {
      setContent(composerRef.current.innerHTML);
    }
  };

  // Sync external edits or template inserts back to contenteditable
  useEffect(() => {
    if (composerRef.current && composerRef.current.innerHTML !== content) {
      composerRef.current.innerHTML = content;
    }
  }, [content]);

  const applyFormat = (command: string, value: string = '') => {
    // Restore focus to the editor before executing so execCommand works
    if (composerRef.current) {
      composerRef.current.focus();
    }
    document.execCommand(command, false, value || undefined);
    handleInput();
    // Keep focus after formatting
    if (composerRef.current) {
      composerRef.current.focus();
    }
  };


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Message highlight logic
  useEffect(() => {
    if (highlightedMessageId) {
      setPulsingMessageId(highlightedMessageId);
      const scrollTimer = setTimeout(() => {
        const element = document.getElementById(`msg-${highlightedMessageId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);

      const clearTimer = setTimeout(() => {
        setPulsingMessageId(null);
        onHighlightCleared();
      }, 3500);

      return () => {
        clearTimeout(scrollTimer);
        clearTimeout(clearTimer);
      };
    }
  }, [highlightedMessageId, onHighlightCleared]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [...queryKeys.messages(channel.id)],
    queryFn: ({ pageParam = 1 }) => chatApi.getChatMessages(channel.id, pageParam, 15),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
      const meta = lastPage?.meta;
      if (meta && meta.current_page < meta.total_pages) {
        return meta.current_page + 1;
      }
      return undefined;
    },
  });

  const rawMessages = data ? data.pages.flatMap((page: any) => page.data) : [];
  const messages = [...rawMessages].sort((a: ChatMessage, b: ChatMessage) => a.id - b.id);
  const pinnedMessages = messages.filter((m) => m.is_pinned);

  // ── WEBSOCKET REAL-TIME SUBSCRIPTION ──
  const { subscribe } = useWebSocket();

  useEffect(() => {
    const handleEvent = (packet: any) => {
      const { type, title, message: packetMessage, data: packetData } = packet || {};
      if (!packetData) return;

      const eventChannelId = packetData?.channel_id || packetData?.message?.chat_channel_id;
      const incomingMessage = packetData?.message as ChatMessage | undefined;

      if (eventChannelId === channel.id) {
        // Handle new message / ripple
        if ((type === 'chat' || type === 'ripple') && incomingMessage?.id) {
          if (type === 'ripple') {
            setPulsingMessageId(incomingMessage.id);
            setTimeout(() => setPulsingMessageId(null), 3500);
            try {
              const audio = new Audio('/sounds/nudge.mp3');
              audio.play().catch(() => { });
            } catch (e) { }
          }

          queryClient.setQueryData([...queryKeys.messages(channel.id)], (oldData: any) => {
            if (!oldData) return oldData;
            const exists = oldData.pages.some((page: any) =>
              page.data.some((m: ChatMessage) => m.id === incomingMessage.id)
            );
            if (exists) return oldData;
            return {
              ...oldData,
              pages: oldData.pages.map((page: any, idx: number) =>
                idx === 0 ? { ...page, data: [incomingMessage, ...page.data] } : page
              )
            };
          });
          return;
        }

        if (type === 'message_edited') {
          queryClient.setQueryData([...queryKeys.messages(channel.id)], (oldData: any) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              pages: oldData.pages.map((page: any) => ({
                ...page,
                data: page.data.map((m: ChatMessage) =>
                  m.id === packetData.message_id
                    ? { ...m, content: packetData.content, is_edited: packetData.is_edited ?? true }
                    : m
                )
              }))
            };
          });
          return;
        }

        if (type === 'message_deleted') {
          queryClient.setQueryData([...queryKeys.messages(channel.id)], (oldData: any) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              pages: oldData.pages.map((page: any) => ({
                ...page,
                data: page.data.filter((m: ChatMessage) => m.id !== packetData.message_id)
              }))
            };
          });
          return;
        }

        if (type === 'message_reaction_updated') {
          queryClient.setQueryData([...queryKeys.messages(channel.id)], (oldData: any) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              pages: oldData.pages.map((page: any) => ({
                ...page,
                data: page.data.map((m: ChatMessage) =>
                  m.id === packetData.message_id
                    ? { ...m, reactions: packetData.reactions }
                    : m
                )
              }))
            };
          });
        }
      } else if (type === 'chat' || type === 'ripple') {
        // Toast only for new messages in other channels
        if (title || packetMessage) {
          toast.success(`${title || 'New message'}\n${packetMessage || ''}`, {
            duration: 5000,
            position: 'top-right',
          });
        }
      }
    };

    const unsubscribe = subscribe(handleEvent);
    return () => unsubscribe();
  }, [subscribe, channel.id, queryClient, queryKeys]);

  // Summary query
  const { data: summaryData, isLoading: isSummaryLoading, refetch: refetchSummary } = useQuery({
    queryKey: [...queryKeys.summary(channel.id), summaryTimeframe],
    queryFn: () => chatApi.getChatSummary(channel.id, summaryTimeframe),
    enabled: activePanel === 'summary' && !!summaryTimeframeGenerated[summaryTimeframe],
  });

  // Library query
  const { data: libraryData, isLoading: isLibraryLoading } = useQuery({
    queryKey: [...queryKeys.library, channel.id, libraryCategory],
    queryFn: () => chatApi.getChatLibrary({ category: libraryCategory as any || undefined, page: 1, page_size: 40 }),
    enabled: activePanel === 'library',
  });

  // Templates query
  const { data: templatesData, isLoading: isTemplatesLoading, refetch: refetchTemplates } = useQuery({
    queryKey: [queryKeys.templates],
    queryFn: () => chatApi.getTemplates(1, 50),
    enabled: activePanel === 'templates' || showTemplates,
  });

  // Saved Messages query
  const { data: savedData, isLoading: isSavedLoading } = useQuery({
    queryKey: [queryKeys.saved],
    queryFn: () => chatApi.getSavedMessages(1, 30),
    enabled: activePanel === 'saved',
  });

  // Read Later query
  const { data: readLaterData, isLoading: isReadLaterLoading, refetch: refetchReadLater } = useQuery({
    queryKey: [queryKeys.readLater],
    queryFn: () => chatApi.getReadLaterList(1, 40),
    enabled: activePanel === 'read-later',
  });

  useEffect(() => {
    setShowMembers(false);
  }, [channel.id]);

  // Scroll to bottom on initial load
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container && messages.length > 0) {
      container.scrollTop = container.scrollHeight;
    }
  }, [channel.id]);

  const prevMessagesLength = useRef(messages.length);
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container && messages.length > prevMessagesLength.current) {
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 200;
      const lastMessage = messages[messages.length - 1];
      const isMyMessage = lastMessage?.sender_id === user?.id;
      if (isNearBottom || isMyMessage) {
        container.scrollTop = container.scrollHeight;
      }
    }
    prevMessagesLength.current = messages.length;
  }, [messages, user?.id]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (container.scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
      const previousScrollHeight = container.scrollHeight;
      fetchNextPage().then(() => {
        requestAnimationFrame(() => {
          container.scrollTop = container.scrollHeight - previousScrollHeight;
        });
      });
    }
  };

  const scrollToDateGroup = useCallback((firstMessageId: number) => {
    const container = messagesContainerRef.current;
    const anchor = document.getElementById(`msg-${firstMessageId}`);
    if (!container || !anchor) return;
    const containerRect = container.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();
    const stickyOffset = 40;
    container.scrollBy({
      top: anchorRect.top - containerRect.top - stickyOffset,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (!sendFeedback) return;
    const timer = setTimeout(() => setSendFeedback(null), 4000);
    return () => clearTimeout(timer);
  }, [sendFeedback]);

  const editMutation = useMutation({
    mutationFn: ({ messageId, content }: { messageId: number; content: string }) =>
      chatApi.editChatMessage(channel.id, messageId, content),
    onSuccess: () => {
      setContent('');
      setEditingMessage(null);
      queryClient.invalidateQueries({ queryKey: [...queryKeys.messages(channel.id)] });
    },
    onError: (err: any) => {
      alert(err.message || 'Failed to edit message');
    }
  });

  const reactionMutation = useMutation({
    mutationFn: ({ messageId, reaction }: { messageId: number; reaction: string }) =>
      chatApi.toggleMessageReaction(channel.id, messageId, reaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.messages(channel.id)] });
    },
    onError: (err: any) => {
      alert(err.message || 'Failed to toggle reaction');
    }
  });

  const handleToggleReaction = (msg: ChatMessage, emoji: string) => {
    reactionMutation.mutate({ messageId: msg.id, reaction: emoji });
  };

  const forwardMutation = useMutation({
    mutationFn: ({ messageId, targetChannelId }: { messageId: number; targetChannelId: number }) =>
      chatApi.forwardChatMessage(channel.id, messageId, targetChannelId),
    onSuccess: () => {
      setShowForwardModal(false);
      setForwardingMessage(null);
      alert('Message forwarded successfully!');
    },
    onError: (err: any) => {
      alert(err.message || 'Failed to forward message');
    }
  });

  const { data: channelsResponse } = useQuery({
    queryKey: [queryKeys.channels],
    queryFn: () => chatApi.getChatChannels(1, 100),
    enabled: showForwardModal,
  });
  const allChannels = channelsResponse?.data ?? [];

  const bulkDeleteMutation = useMutation({
    mutationFn: ({ messageIds, deleteType }: { messageIds: number[]; deleteType: 'me' | 'everyone' }) =>
      chatApi.bulkDeleteChatMessages(channel.id, messageIds, deleteType),
    onSuccess: () => {
      setSelectedMessages([]);
      setIsBulkSelectMode(false);
      queryClient.invalidateQueries({ queryKey: [...queryKeys.messages(channel.id)] });
    },
    onError: (err: any) => {
      alert(err.message || 'Failed to delete messages');
    }
  });

  const sendMutation = useMutation({
    mutationFn: (payload: any) => chatApi.sendChatMessage(channel.id, payload),
    onSuccess: (res) => {
      setContent('');
      setFiles([]);
      setDraftTemplateMedia(null);
      setScheduledAt('');
      setShowSchedule(false);
      setReplyingTo(null);
      if (res.data.is_sent === false) {
        setSendFeedback('Message scheduled');
      } else {
        setSendFeedback(null);
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
      queryClient.setQueryData([...queryKeys.messages(channel.id)], (oldData: any) => {
        if (!oldData) return oldData;
        const exists = oldData.pages.some((page: any) => page.data.some((m: ChatMessage) => m.id === res.data.id));
        if (exists) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any, idx: number) => {
            if (idx === 0) return { ...page, data: [res.data, ...page.data] };
            return page;
          }),
        };
      });
    },
  });

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && files.length === 0 && !draftTemplateMedia) return;

    if (editingMessage) {
      editMutation.mutate({ messageId: editingMessage.id, content: content.trim() });
      return;
    }

    const basePayload: any = {};
    if (replyingTo) {
      basePayload.parent_id = replyingTo.id;
    }
    if (scheduledAt) {
      const sendAt = new Date(scheduledAt);
      if (sendAt <= new Date()) {
        alert('Please choose a future date and time');
        return;
      }
      basePayload.send_at = sendAt.toISOString();
    }

    // Multiple attachments → one message per file (text goes with the first)
    if (files.length > 0) {
      setIsUploading(true);
      const filesToSend = [...files];
      const textContent = content.trim();
      try {
        for (let i = 0; i < filesToSend.length; i++) {
          const uploadRes = await chatApi.uploadChatMedia(filesToSend[i]);
          const { file_url, file_name, file_size, mime_type, file_category } = uploadRes.data;
          const payload: any = {
            ...basePayload,
            content: i === 0 ? textContent : '',
            file_url,
            file_name,
            file_size,
            mime_type,
            file_category,
          };
          if (i > 0) delete payload.parent_id;

          const res = await chatApi.sendChatMessage(channel.id, payload);
          queryClient.setQueryData([...queryKeys.messages(channel.id)], (oldData: any) => {
            if (!oldData) return oldData;
            const exists = oldData.pages.some((page: any) =>
              page.data.some((m: ChatMessage) => m.id === res.data.id)
            );
            if (exists) return oldData;
            return {
              ...oldData,
              pages: oldData.pages.map((page: any, idx: number) => {
                if (idx === 0) return { ...page, data: [res.data, ...page.data] };
                return page;
              }),
            };
          });
        }
        setContent('');
        setFiles([]);
        setDraftTemplateMedia(null);
        setScheduledAt('');
        setShowSchedule(false);
        setReplyingTo(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch (err: any) {
        alert(err?.message || 'File upload failed');
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
      return;
    }

    let payload: any = { ...basePayload, content: content.trim() };
    if (draftTemplateMedia) {
      payload = { ...payload, ...draftTemplateMedia };
    }

    sendMutation.mutate(payload);
  };

  const handleRipple = () => {
    sendMutation.mutate({ is_ripple: true });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
      setDraftTemplateMedia(null);
    }
    // Allow selecting the same file again later
    e.target.value = '';
  };

  const togglePin = async (msg: ChatMessage) => {
    try {
      if (msg.is_pinned) {
        await chatApi.unpinChatMessage(channel.id, msg.id);
      } else {
        if (pinnedMessages.length >= 3) {
          alert('Maximum of 3 pinned messages allowed.');
          return;
        }
        await chatApi.pinChatMessage(channel.id, msg.id);
      }
      queryClient.invalidateQueries({ queryKey: [...queryKeys.messages(channel.id)] });
    } catch (err) {
      console.error('Pin toggle failed', err);
    }
  };

  const handleSaveMessage = async (msg: ChatMessage) => {
    try {
      await chatApi.saveMessage(channel.id, msg.id);
      queryClient.invalidateQueries({ queryKey: [queryKeys.saved] });
    } catch {
      alert('Could not save message');
    }
  };

  const deleteMessageMutation = useMutation({
    mutationFn: ({ messageId, deleteType }: { messageId: number; deleteType: 'me' | 'everyone' }) =>
      chatApi.deleteChatMessage(channel.id, messageId, deleteType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.messages(channel.id)] });
      setDeletingMessage(null);
    },
    onError: (err: any) => {
      alert(err.message || 'Failed to delete message');
    }
  });

  const handleDeleteMessage = (deleteType: 'me' | 'everyone') => {
    if (!deletingMessage) return;
    deleteMessageMutation.mutate({ messageId: deletingMessage.id, deleteType });
  };

  const handleReadLaterClick = (msg: ChatMessage) => {
    setReadLaterModalData({
      channelId: channel.id,
      messageId: msg.id,
    });
  };

  const handleReadLaterEdit = (entry: ReadLaterEntry) => {
    setReadLaterModalData({
      channelId: entry.message.chat_channel_id,
      messageId: entry.message_id,
      initialRemindAt: entry.remind_at,
      readLaterId: entry.id,
    });
  };

  const deleteReadLaterMutation = useMutation({
    mutationFn: (entry: ReadLaterEntry) => chatApi.removeFromReadLater(entry.message.chat_channel_id, entry.message_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.readLater] });
      queryClient.invalidateQueries({ queryKey: [...queryKeys.messages(channel.id)] });
    },
    onError: () => {
      alert('Failed to remove entry from Read Later');
    },
  });

  const handleUseTemplate = (tpl: MessageTemplate) => {
    setContent(tpl.content ?? '');
    if (tpl.file_url) {
      setDraftTemplateMedia({
        file_url: tpl.file_url,
        file_name: tpl.file_name || tpl.file_url.split('/').pop() || 'Attachment',
        file_size: tpl.file_size ?? undefined,
        mime_type: tpl.mime_type ?? undefined,
        file_category: tpl.file_category ?? undefined,
      });
    } else {
      setDraftTemplateMedia(null);
    }
    setShowTemplates(false);
  };

  const deleteTemplateMutation = useMutation({
    mutationFn: (id: number) => chatApi.deleteTemplate(id),
    onSuccess: () => refetchTemplates(),
  });

  const handleTemplateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setTemplateFile(e.target.files[0]);
  };

  const createTemplateMutation = useMutation({
    mutationFn: (payload: CreateTemplatePayload) => chatApi.createTemplate(payload),
    onSuccess: () => {
      setNewTemplateTitle('');
      setNewTemplateContent('');
      setTemplateFile(null);
      if (templateFileInputRef.current) templateFileInputRef.current.value = '';
      refetchTemplates();
    },
  });

  const handleCreateTemplateFromScratch = async () => {
    if (!newTemplateTitle.trim()) return;
    let payload: CreateTemplatePayload = {
      title: newTemplateTitle.trim(),
      content: newTemplateContent.trim() || undefined,
    };
    if (templateFile) {
      setIsTemplateUploading(true);
      try {
        const uploadRes = await chatApi.uploadChatMedia(templateFile);
        const { file_url, file_name, file_size, mime_type, file_category } = uploadRes.data;
        payload = { ...payload, file_url, file_name, file_size, mime_type, file_category };
      } catch {
        alert('Template file upload failed');
        setIsTemplateUploading(false);
        return;
      }
      setIsTemplateUploading(false);
    }
    createTemplateMutation.mutate(payload);
  };

  const handleSaveComposerAsTemplate = () => {
    createTemplateMutation.mutate({
      title: newTemplateTitle.trim(),
      content: content.trim(),
    });
  };

  const tabList = [
    { key: 'chat', label: 'Chat', icon: MessageSquare },
    { key: 'summary', label: 'Summary', icon: Sparkles },
    { key: 'library', label: 'Library', icon: Library },
    { key: 'templates', label: 'Templates', icon: FileText },
    { key: 'saved', label: 'Saved', icon: Bookmark },
    { key: 'read-later', label: 'Read Later', icon: Clock },
  ] as const;

  return (
    <>
      {/* Header */}
      <div className="px-4 md:px-6 py-3.5 border-b border-border bg-surface flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between shadow-sm z-10 min-w-0 w-full">
        <div className="flex items-center gap-2 min-w-0 w-full xl:w-auto flex-1">
          <button
            onClick={onBack}
            className="md:hidden p-1.5 rounded-lg hover:bg-bg-hover text-text-secondary hover:text-text transition cursor-pointer"
            title="Back to channels"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-[16px] text-text truncate min-w-0">
              {getChannelDisplayName(channel, user?.id)}
            </h3>
            {channel.type !== 'direct' && (
              <button
                type="button"
                onClick={() => setShowMembers(true)}
                className="text-[12px] text-primary font-medium mt-0.5 hover:underline cursor-pointer text-left"
              >
                {channel.members.length > 0
                  ? `${channel.members.length} ${channel.members.length === 1 ? 'member' : 'members'}`
                  : channel.type.replace('_', ' ')}
              </button>
            )}
          </div>
        </div>
        {/* Panel Tabs */}
        <div className="flex items-center gap-1 flex-shrink-0 overflow-x-auto no-scrollbar py-0.5 w-full xl:w-auto justify-start xl:justify-end">
          {tabList.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActivePanel(tab.key)}
                className={`px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition capitalize cursor-pointer flex items-center gap-1.5 flex-shrink-0 ${activePanel === tab.key ? 'bg-primary text-bg' : 'text-text-secondary hover:bg-bg-hover'
                  }`}
                title={tab.label}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pinned Messages */}
      {activePanel === 'chat' && pinnedMessages.length > 0 && (
        <div className="bg-primary/5 border-b border-primary/10 p-3 flex flex-col gap-2 z-10">
          <div className="text-[11px] font-bold text-primary uppercase tracking-wide flex items-center gap-1">
            <Pin className="w-3 h-3 rotate-45" /> Pinned Messages ({pinnedMessages.length}/3)
          </div>
          {pinnedMessages.map((msg) => (
            <div key={msg.id} className="text-[13px] text-text-secondary bg-surface/50 p-2 rounded-lg border border-border/50 flex justify-between items-start">
              <span className="line-clamp-1">{msg.content || 'Attachment: ' + msg.file_name}</span>
              <button onClick={() => togglePin(msg)} className="text-[11px] text-text-muted hover:text-error ml-4 cursor-pointer">Unpin</button>
            </div>
          ))}
        </div>
      )}

      {/* ── CHAT PANEL ── */}
      {activePanel === 'chat' && (
        <PhotoProvider>
          <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-1 relative"
          >
            {isFetchingNextPage && (
              <div className="text-center p-2 text-text-muted text-xs flex items-center justify-center gap-1.5">
                <span className="w-3.5 h-3.5 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                Loading older messages...
              </div>
            )}
            {isLoading ? (
              <div className="text-center p-4 text-text-muted">Loading messages...</div>
            ) : (
              messages.map((msg, index) => {
                const isMe = msg.sender_id === user?.id;
                const messageDate = msg.created_at ? new Date(msg.created_at) : null;
                const prevMsg = index > 0 ? messages[index - 1] : null;
                const prevDate = prevMsg?.created_at ? new Date(prevMsg.created_at) : null;
                const showDateSeparator =
                  messageDate &&
                  !isNaN(messageDate.getTime()) &&
                  (!prevDate || isNaN(prevDate.getTime()) || !isSameCalendarDay(messageDate, prevDate));

                const dateSeparator = showDateSeparator ? (
                  <div
                    key={`date-${msg.id}`}
                    className="sticky top-2 z-20 flex justify-center py-1.5 -mx-1 pointer-events-none"
                  >
                    <button
                      type="button"
                      onClick={() => scrollToDateGroup(msg.id)}
                      title="Jump to first message of this day"
                      className="pointer-events-auto text-[11px] font-semibold text-text-secondary bg-surface/90 backdrop-blur-md border border-border/60 shadow-sm px-3.5 py-1 rounded-full cursor-pointer hover:bg-bg-hover hover:text-text active:scale-95 transition"
                    >
                      {formatChatDayLabel(messageDate!)}
                    </button>
                  </div>
                ) : null;

                if (msg.is_ripple) {
                  return (
                    <React.Fragment key={msg.id}>
                      {dateSeparator}
                      <div id={`msg-${msg.id}`} className="flex justify-center my-2">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20 text-warning text-[13px] font-medium animate-pulse">
                          <Bell className="w-4 h-4 animate-bounce" /> {msg.sender?.name} sent a Ripple!
                        </div>
                      </div>
                    </React.Fragment>
                  );
                }

                // Determine if edit window is open (5 minutes)
                const msgTime = msg.created_at ? new Date(msg.created_at).getTime() : 0;
                const isEditable = isMe && (Date.now() - msgTime < 5 * 60 * 1000);

                const isSelected = selectedMessages.includes(msg.id);

                return (
                  <React.Fragment key={msg.id}>
                    {dateSeparator}
                    <div
                      id={`msg-${msg.id}`}
                      className={`flex items-start gap-2 mb-2 group/msg ${isBulkSelectMode ? 'hover:bg-bg-hover/30 px-2 rounded-lg transition-colors' : ''} ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      {/* Bulk select checkbox */}
                      {isBulkSelectMode && (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedMessages(prev => [...prev, msg.id]);
                            } else {
                              setSelectedMessages(prev => prev.filter(id => id !== msg.id));
                            }
                          }}
                          className="mt-3.5 w-4 h-4 cursor-pointer accent-primary"
                        />
                      )}

                      {!isMe && (
                        <div className="w-8 h-8 rounded-full bg-tertiary border border-border flex items-center justify-center mr-1 mt-1 flex-shrink-0 text-[10px] font-bold text-text-muted overflow-hidden">
                          {msg.sender?.profile_picture ? (
                            <img src={msg.sender.profile_picture} alt={msg.sender.name || 'User'} className="w-full h-full object-cover" />
                          ) : (
                            msg.sender?.name?.slice(0, 2).toUpperCase() || '?'
                          )}
                        </div>
                      )}

                      <div className={`max-w-[85%] sm:max-w-[70%] group flex flex-col min-w-0 ${isMe ? 'items-end' : 'items-start'}`}>
                        {!isMe && <span className="text-[11px] text-text-muted mb-1 ml-1">{msg.sender?.name}</span>}

                        {/* Threaded Parent message quote */}
                        {msg.parent_message && (
                          <div
                            onClick={() => {
                              const element = document.getElementById(`msg-${msg.parent_message?.id}`);
                              if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                            className={`mb-1 px-3 py-1.5 rounded-lg text-xs border cursor-pointer max-w-full truncate flex flex-col gap-0.5 ${isMe
                              ? 'bg-primary/10 border-primary/20 text-bg/95 align-self-end'
                              : 'bg-bg-hover border-border text-text-secondary'
                              }`}
                          >
                            <span className="font-semibold text-[10px] opacity-80">
                              Replying to {msg.parent_message.sender?.name || 'User'}
                            </span>
                            <span className="truncate">{msg.parent_message.content || 'Attachment'}</span>
                          </div>
                        )}

                        <div className={`relative ${!msg.content && (msg.file_category === 'image' || msg.file_category === 'video' || msg.mime_type?.startsWith('image/') || msg.mime_type?.startsWith('video/')) ? 'p-1' : 'px-4 py-2.5'} rounded-2xl max-w-full transition-all duration-300 ${msg.id === pulsingMessageId
                          ? 'ring-2 ring-warning bg-warning/20 text-text scale-[1.02] border-warning/30'
                          : msg.is_sent === false && msg.send_at
                            ? isMe
                              ? 'bg-primary/5 border-2 border-dashed border-primary/40 text-text rounded-tr-sm shadow-sm'
                              : 'bg-warning/5 border-2 border-dashed border-warning/30 text-text rounded-tl-sm shadow-sm'
                            : isMe
                              ? 'bg-primary text-bg rounded-tr-sm shadow-md shadow-primary/20'
                              : 'bg-surface border border-border text-text rounded-tl-sm shadow-sm'
                          }`}>

                          {msg.is_sent === false && msg.send_at && (
                            <div className="flex items-center gap-1.5 text-[10px] text-primary font-bold mb-1.5 uppercase tracking-wider">
                              <Clock className="w-3 h-3 text-primary animate-pulse" />
                              <span>Scheduled Message</span>
                            </div>
                          )}

                          {/* Safe HTML Sanitized Content */}
                          {msg.content && (
                            <div
                              className="text-[14px] leading-relaxed break-words safe-html-content"
                              dangerouslySetInnerHTML={{ __html: msg.content }}
                            />
                          )}

                          {msg.file_url && (
                            <div className={`${msg.content ? 'mt-2' : ''} flex flex-col gap-2 max-w-full`}>
                              {msg.file_category === 'image' || msg.mime_type?.startsWith('image/') ? (
                                <PhotoView src={getMediaUrl(msg.file_url)}>
                                  <div className="block max-w-full cursor-pointer hover:opacity-90 transition rounded-lg overflow-hidden border border-border bg-bg-hover">
                                    <img src={getMediaUrl(msg.file_url)} alt="attachment" className="max-w-full rounded-lg max-h-[250px] object-cover block" />
                                  </div>
                                </PhotoView>
                              ) : msg.file_category === 'video' || msg.mime_type?.startsWith('video/') ? (
                                <div
                                  onClick={() => setLightboxMedia({ url: getMediaUrl(msg.file_url), category: 'video', name: msg.file_name || 'Video' })}
                                  className="relative max-w-[280px] rounded-lg overflow-hidden border border-border bg-black/40 cursor-pointer hover:opacity-95 transition group/vid"
                                >
                                  <video
                                    src={getMediaUrl(msg.file_url)}
                                    className="w-full max-h-[180px] object-cover block"
                                    preload="metadata"
                                    muted
                                  />
                                  {/* Play Button Overlay */}
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover/vid:bg-black/40 transition duration-150">
                                    <div className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg text-black group-hover/vid:scale-110 transition duration-150 pl-0.5">
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                      </svg>
                                    </div>
                                  </div>
                                  {/* Details Badge (WhatsApp style) */}
                                  <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/60 text-[10px] text-white font-medium flex items-center gap-1.5 backdrop-blur-sm">
                                    <span>HD</span>
                                    <span className="opacity-60">|</span>
                                    <span className="truncate max-w-[120px]">{msg.file_name?.split('.').pop()?.toUpperCase() || 'MP4'}</span>
                                  </div>
                                </div>
                              ) : msg.file_category === 'audio' || msg.mime_type?.startsWith('audio/') ? (
                                <button
                                  type="button"
                                  onClick={() => setLightboxMedia({ url: getMediaUrl(msg.file_url), category: 'audio', name: msg.file_name || 'Audio' })}
                                  className={`flex items-center gap-2.5 p-2.5 rounded-lg border ${isMe ? 'bg-current/10 border-current/10 text-bg' : 'bg-tertiary border-border text-text'} text-[12.5px] hover:opacity-80 transition cursor-pointer`}
                                >
                                  <span className="text-[16px]">🎵</span>
                                  <span className="truncate max-w-[150px] font-medium">{msg.file_name}</span>
                                </button>
                              ) : (
                                <a href={getMediaUrl(msg.file_url)} target="_blank" rel="noreferrer" className={`flex items-center gap-2 p-2 rounded-lg border ${isMe ? 'bg-current/10 border-current/10 text-bg' : 'bg-tertiary border-border text-text'} text-[12px] hover:opacity-80 transition`}>
                                  <span className="text-[16px]">📄</span>
                                  <span className="truncate max-w-[150px]">{msg.file_name}</span>
                                </a>
                              )}
                            </div>
                          )}

                          {/* Reaction Picker on hover */}
                          {!isBulkSelectMode && (
                            <div className={`absolute top-1/2 -translate-y-1/2 hidden group-hover/msg:flex items-center gap-1 bg-surface border border-border shadow-md rounded-full px-2 py-1 z-30 ${isMe ? 'right-full mr-2' : 'left-full ml-2'}`}>
                              {['👍', '❤️', '🔥', '👏', '😮', '😢'].map(emoji => (
                                <button
                                  key={emoji}
                                  type="button"
                                  onClick={() => handleToggleReaction(msg, emoji)}
                                  className="hover:scale-125 transition-transform text-sm cursor-pointer"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Render reactions list */}
                        {msg.reactions && msg.reactions.length > 0 && (
                          <div className={`flex flex-wrap gap-1 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                            {(() => {
                              const reactionCounts: Record<string, { count: number; users: string[]; selfReacted: boolean }> = {};
                              msg.reactions.forEach((r: any) => {
                                const emoji = r.reaction;
                                const userName = r.user?.name || 'Someone';
                                const isSelf = r.user_id === user?.id;
                                if (!reactionCounts[emoji]) {
                                  reactionCounts[emoji] = { count: 0, users: [], selfReacted: false };
                                }
                                reactionCounts[emoji].count += 1;
                                reactionCounts[emoji].users.push(userName);
                                if (isSelf) {
                                  reactionCounts[emoji].selfReacted = true;
                                }
                              });

                              return Object.entries(reactionCounts).map(([emoji, details]) => (
                                <button
                                  key={emoji}
                                  type="button"
                                  onClick={() => handleToggleReaction(msg, emoji)}
                                  title={details.users.join(', ')}
                                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs border transition-colors cursor-pointer ${details.selfReacted
                                    ? 'bg-primary/15 border-primary/30 text-primary'
                                    : 'bg-surface border-border text-text-secondary hover:bg-bg-hover'
                                    }`}
                                >
                                  <span>{emoji}</span>
                                  <span className="font-semibold text-[10px]">{details.count}</span>
                                </button>
                              ));
                            })()}
                          </div>
                        )}

                        <div className={`text-[10px] text-text-muted mt-1 px-1 flex items-center gap-2 flex-wrap w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                          {msg.is_sent === false && msg.send_at ? (
                            <span className="text-primary/80 font-medium">
                              Scheduled · {new Date(msg.send_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                            </span>
                          ) : (
                            <>
                              {new Date(msg.created_at || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              {msg.is_edited && <span className="italic opacity-85">(edited)</span>}
                            </>
                          )}

                          {!isBulkSelectMode && (
                            <>
                              {/* Reply button */}
                              <button
                                onClick={() => setReplyingTo(msg)}
                                className="hidden group-hover/msg:inline-block transition text-[10px] text-text-muted hover:text-primary cursor-pointer font-medium"
                              >
                                Reply
                              </button>

                              {/* Edit button */}
                              {isEditable && (
                                <button
                                  onClick={() => {
                                    setEditingMessage(msg);
                                    setContent(msg.content || '');
                                  }}
                                  className="hidden group-hover/msg:inline-block transition text-[10px] text-text-muted hover:text-primary cursor-pointer font-medium"
                                >
                                  Edit
                                </button>
                              )}

                              {/* Forward button */}
                              <button
                                onClick={() => {
                                  setForwardingMessage(msg);
                                  setShowForwardModal(true);
                                }}
                                className="hidden group-hover/msg:inline-block transition text-[10px] text-text-muted hover:text-primary cursor-pointer font-medium"
                              >
                                Forward
                              </button>

                              <button onClick={() => togglePin(msg)} className="hidden group-hover/msg:inline-block transition text-[10px] text-text-muted hover:text-primary cursor-pointer">
                                {msg.is_pinned ? 'Unpin' : 'Pin'}
                              </button>
                              <button onClick={() => handleSaveMessage(msg)} className="hidden group-hover/msg:inline-block transition text-[10px] text-text-muted hover:text-warning cursor-pointer" title="Save message">
                                <Bookmark className="w-3 h-3" />
                              </button>
                              <button onClick={() => handleReadLaterClick(msg)} className="hidden group-hover/msg:inline-block transition text-[10px] text-text-muted hover:text-primary cursor-pointer" title="Read Later">
                                <Clock className="w-3 h-3" />
                              </button>
                              <button onClick={() => setDeletingMessage(msg)} className="hidden group-hover/msg:inline-block transition text-[10px] text-text-muted hover:text-error cursor-pointer" title="Delete Message">
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })
            )}
          </div>
        </PhotoProvider>
      )}

      {/* ── SUMMARY PANEL ── */}
      {activePanel === 'summary' && (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-medium text-text">Timeframe:</span>
            {(['today', 'yesterday', 'week'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setSummaryTimeframe(tf)}
                className={`px-3 py-1 rounded-lg text-[12px] capitalize transition cursor-pointer ${summaryTimeframe === tf ? 'bg-primary text-bg font-semibold' : 'bg-bg-hover text-text-secondary hover:text-text'
                  }`}
              >
                {tf}
              </button>
            ))}
            {summaryTimeframeGenerated[summaryTimeframe] && (
              <button onClick={() => refetchSummary()} className="ml-auto text-[12px] text-primary hover:underline cursor-pointer">Refresh</button>
            )}
          </div>
          {!summaryTimeframeGenerated[summaryTimeframe] ? (
            <div className="flex flex-col items-center justify-center py-16 border border-dashed border-border rounded-2xl bg-surface/30 p-8 gap-5 my-4">
              <div className="w-16 h-16 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-[28px] animate-pulse">
                🤖
              </div>
              <div className="text-center max-w-sm flex flex-col gap-1.5">
                <h4 className="font-semibold text-text text-[15.5px]">Generate AI Chat Summary</h4>
                <p className="text-text-secondary text-[12.5px] leading-relaxed">
                  Analyze this channel's conversation for the selected timeframe and extract key decisions, updates, and pending items.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSummaryTimeframeGenerated(prev => ({ ...prev, [summaryTimeframe]: true }));
                }}
                className="btn btn-primary text-[12.5px] px-6 py-2 shadow-md hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                Generate {summaryTimeframe} Summary
              </button>
            </div>
          ) : isSummaryLoading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-text-muted text-[13px] my-4">
              <span className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              {features.summaryHasTimeframe ? 'Generating AI summary...' : 'Loading summary...'}
            </div>
          ) : summaryData ? (
            <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
              <div className="text-[11px] text-primary font-semibold uppercase tracking-wider mb-3">
                {features.summaryHasTimeframe ? `🤖 AI Chat Summary — ${summaryData.timeframe}` : `📊 ${summaryData.timeframe}`}
              </div>
              <div className="text-[14px] text-text leading-relaxed whitespace-pre-wrap">{summaryData.summary}</div>
            </div>
          ) : (
            <div className="text-text-muted text-[13px] py-12 text-center">No summary available.</div>
          )}
        </div>
      )}

      {/* ── LIBRARY PANEL ── */}
      {activePanel === 'library' && (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {['', 'image', 'pdf', 'document', 'audio', 'video', 'zip'].map((cat) => (
              <button
                key={cat}
                onClick={() => setLibraryCategory(cat)}
                className={`px-3 py-1 rounded-lg text-[12px] capitalize transition cursor-pointer ${libraryCategory === cat ? 'bg-primary text-bg font-semibold' : 'bg-bg-hover text-text-secondary hover:text-text'
                  }`}
              >
                {cat === '' ? 'All' : cat}
              </button>
            ))}
          </div>
          {isLibraryLoading ? (
            <div className="flex items-center gap-2 text-text-muted text-[13px]">
              <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              Loading library...
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {(libraryData?.data ?? []).map((item) => {
                const isMedia = ['image', 'video', 'audio'].includes(item.file_category || '') || item.mime_type?.startsWith('image/') || item.mime_type?.startsWith('video/') || item.mime_type?.startsWith('audio/');

                return (
                  <a
                    key={item.id}
                    href={getMediaUrl(item.file_url)}
                    target={isMedia ? undefined : "_blank"}
                    rel="noreferrer"
                    onClick={(e) => {
                      if (isMedia) {
                        e.preventDefault();
                        setLightboxMedia({
                          url: getMediaUrl(item.file_url),
                          category: item.file_category || '',
                          name: item.file_name || 'File',
                          mimeType: item.mime_type || undefined
                        });
                      }
                    }}
                    className="flex flex-col rounded-xl border border-border overflow-hidden hover:border-primary/40 transition group cursor-pointer"
                  >
                    {item.file_category === 'image' ? (
                      <img src={getMediaUrl(item.file_url)} alt={item.file_name} className="w-full h-28 object-cover bg-tertiary" />
                    ) : item.file_category === 'video' ? (
                      <div className="w-full h-28 relative bg-tertiary overflow-hidden flex items-center justify-center">
                        <video
                          src={getMediaUrl(item.file_url) + '#t=0.1'}
                          preload="metadata"
                          className="w-full h-full object-cover pointer-events-none"
                          muted
                          playsInline
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Video className="w-8 h-8 text-white drop-shadow-md" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-28 flex items-center justify-center bg-tertiary text-text-muted">
                        {item.file_category === 'pdf' ? (
                          <FileText className="w-10 h-10" />
                        ) : item.file_category === 'audio' ? (
                          <Volume2 className="w-10 h-10" />
                        ) : item.file_category === 'zip' ? (
                          <Archive className="w-10 h-10" />
                        ) : (
                          <File className="w-10 h-10" />
                        )}
                      </div>
                    )}
                    <div className="p-2">
                      <div className="text-[11.5px] font-medium text-text truncate">{item.file_name}</div>
                      <div className="text-[10px] text-text-muted truncate">{item.sender?.name} · {item.channel_name}</div>
                    </div>
                  </a>
                );
              })}
              {(libraryData?.data ?? []).length === 0 && (
                <div className="col-span-full text-center text-text-muted text-[13px] py-12">No files found</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── TEMPLATES PANEL ── */}
      {activePanel === 'templates' && (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-5">
          {/* Create Template Section */}
          <div className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-3 shadow-sm">
            <h4 className="text-[13px] font-semibold text-text">Create Template</h4>
            <div className="flex flex-col gap-2">
              <input
                className="input-field text-[13px] w-full"
                placeholder="Template title..."
                value={newTemplateTitle}
                onChange={(e) => setNewTemplateTitle(e.target.value)}
              />
              <textarea
                className="input-field text-[13px] w-full min-h-[80px] py-2 px-3 resize-y text-text border border-border rounded-lg placeholder:text-muted focus:outline-none focus:border-muted"
                placeholder="Template content (optional)..."
                value={newTemplateContent}
                onChange={(e) => setNewTemplateContent(e.target.value)}
              />

              {/* Optional attachment logic for Template */}
              <div className="flex items-center justify-between gap-2 mt-1">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={templateFileInputRef}
                    onChange={handleTemplateFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => templateFileInputRef.current?.click()}
                    className="text-[12px] text-text-secondary hover:text-text px-2.5 py-1.5 rounded-lg border border-border bg-bg hover:bg-bg-hover transition cursor-pointer flex items-center gap-1.5"
                  >
                    📎 {templateFile ? 'Change File' : 'Attach File'}
                  </button>
                  {templateFile && (
                    <span className="text-[11.5px] text-text-secondary truncate max-w-[120px]" title={templateFile.name}>
                      {templateFile.name}
                    </span>
                  )}
                  {templateFile && (
                    <button
                      type="button"
                      onClick={() => setTemplateFile(null)}
                      className="text-error hover:text-error p-0.5 rounded cursor-pointer"
                      title="Remove file"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCreateTemplateFromScratch}
                    disabled={!newTemplateTitle.trim() || createTemplateMutation.isPending || isTemplateUploading}
                    className="btn btn-primary text-[12px] px-3.5 cursor-pointer"
                  >
                    {createTemplateMutation.isPending || isTemplateUploading ? 'Saving...' : 'Create Template'}
                  </button>

                  {content.trim() && (
                    <button
                      type="button"
                      onClick={handleSaveComposerAsTemplate}
                      disabled={!newTemplateTitle.trim() || createTemplateMutation.isPending}
                      className="text-[12px] text-text-secondary hover:text-text px-2.5 py-1.5 rounded-lg border border-border bg-bg hover:bg-bg-hover transition cursor-pointer"
                      title="Save the text from your main composer input as a template"
                    >
                      Save Composer Text
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {isTemplatesLoading ? (
            <div className="flex items-center gap-2 text-text-muted text-[13px]">
              <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              Loading templates...
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {(templatesData?.data ?? []).map((tpl) => (
                <div key={tpl.id} className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[13.5px] text-text">{tpl.title}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUseTemplate(tpl)}
                        className="text-[11.5px] text-primary hover:underline cursor-pointer"
                      >
                        Use
                      </button>
                      <button
                        onClick={() => deleteTemplateMutation.mutate(tpl.id)}
                        className="text-[11.5px] text-error hover:underline cursor-pointer flex items-center justify-center"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[12.5px] text-text-secondary line-clamp-2 whitespace-pre-wrap">{tpl.content}</p>
                </div>
              ))}
              {(templatesData?.data ?? []).length === 0 && (
                <div className="text-center text-text-muted text-[13px] py-8">No templates yet</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── SAVED PANEL ── */}
      {activePanel === 'saved' && (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-3">
          {isSavedLoading ? (
            <div className="flex items-center gap-2 text-text-muted text-[13px]">
              <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              Loading saved messages...
            </div>
          ) : (
            (savedData?.data ?? []).map((saved) => (
              <div key={saved.id} className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-1">
                <div className="text-[11px] text-text-muted flex items-center gap-1">
                  <Bookmark className="w-3 h-3 text-warning" />
                  {saved.message.sender?.name} · {new Date(saved.message.created_at || '').toLocaleDateString()}
                </div>
                <p className="text-[13.5px] text-text whitespace-pre-wrap">{saved.message.content}</p>
                {saved.message.file_url && (
                  <div className="mt-2 flex flex-col gap-2 max-w-full">
                    {saved.message.file_category === 'image' || saved.message.mime_type?.startsWith('image/') ? (
                      <button
                        type="button"
                        onClick={() => setLightboxMedia({ url: getMediaUrl(saved.message.file_url), category: 'image', name: saved.message.file_name || 'Image' })}
                        className="block max-w-[200px] cursor-pointer hover:opacity-90 transition rounded-lg overflow-hidden border border-border bg-bg-hover"
                      >
                        <img src={getMediaUrl(saved.message.file_url)} alt="attachment" className="max-w-full rounded-lg max-h-[150px] object-cover" />
                      </button>
                    ) : saved.message.file_category === 'video' || saved.message.mime_type?.startsWith('video/') ? (
                      <button
                        type="button"
                        onClick={() => setLightboxMedia({ url: getMediaUrl(saved.message.file_url), category: 'video', name: saved.message.file_name || 'Video' })}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg border bg-tertiary border-border text-text text-[12.5px] hover:opacity-80 transition cursor-pointer self-start"
                      >
                        <span className="text-[16px]">🎥</span>
                        <span className="truncate max-w-[150px] font-medium">{saved.message.file_name}</span>
                      </button>
                    ) : saved.message.file_category === 'audio' || saved.message.mime_type?.startsWith('audio/') ? (
                      <button
                        type="button"
                        onClick={() => setLightboxMedia({ url: getMediaUrl(saved.message.file_url), category: 'audio', name: saved.message.file_name || 'Audio' })}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg border bg-tertiary border-border text-text text-[12.5px] hover:opacity-80 transition cursor-pointer self-start"
                      >
                        <span className="text-[16px]">🎵</span>
                        <span className="truncate max-w-[150px] font-medium">{saved.message.file_name}</span>
                      </button>
                    ) : (
                      <a href={getMediaUrl(saved.message.file_url)} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2 rounded-lg border bg-tertiary border-border text-text text-[12px] hover:opacity-80 transition self-start">
                        <span className="text-[16px]">📄</span>
                        <span className="truncate max-w-[150px]">{saved.message.file_name}</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
          {!isSavedLoading && (savedData?.data ?? []).length === 0 && (
            <div className="text-center text-text-muted text-[13px] py-8">No saved messages yet</div>
          )}
        </div>
      )}

      {/* ── READ LATER PANEL ── */}
      {activePanel === 'read-later' && (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-3">
          {isReadLaterLoading ? (
            <div className="flex items-center gap-2 text-text-muted text-[13px]">
              <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              Loading Read Later entries...
            </div>
          ) : (
            (readLaterData?.data ?? []).map((entry) => (
              <div key={entry.id} className="bg-surface border border-border rounded-xl p-4 flex justify-between gap-4">
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <div className="text-[11px] text-text-muted flex items-center gap-1.5">
                    <span className="font-semibold">{entry.message.sender?.name}</span>
                    <span>·</span>
                    <span>{new Date(entry.message.created_at || '').toLocaleDateString()}</span>
                  </div>
                  <p className="text-[13.5px] text-text whitespace-pre-wrap line-clamp-3">{entry.message.content}</p>
                  {entry.message.file_name && (
                    <span className="text-[12px] text-text-secondary flex items-center gap-1">
                      📎 {entry.message.file_name}
                    </span>
                  )}
                  {entry.remind_at && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11.5px] font-semibold ${entry.is_notified
                        ? 'bg-error/10 text-error border border-error/20'
                        : 'bg-primary/10 text-primary border border-primary/20'
                        }`}>
                        <Clock className="w-3 h-3" />
                        {entry.is_notified
                          ? 'Reminder triggered'
                          : `Remind: ${new Date(entry.remind_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}`}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-between items-end gap-2 flex-shrink-0">
                  <button
                    onClick={() => onNavigateToMessage(entry.message.chat_channel_id, entry.message_id)}
                    className="p-1.5 rounded-lg border border-border bg-bg hover:bg-bg-hover text-text-secondary hover:text-primary transition cursor-pointer flex items-center justify-center"
                    title="Go to Message"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleReadLaterEdit(entry)}
                      className="p-1.5 rounded-lg hover:bg-bg-hover text-text-secondary hover:text-primary transition cursor-pointer flex items-center justify-center"
                      title="Edit Reminder"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteReadLaterMutation.mutate(entry)}
                      className="p-1.5 rounded-lg hover:bg-bg-hover text-text-secondary hover:text-error transition cursor-pointer flex items-center justify-center"
                      title="Remove"
                      disabled={deleteReadLaterMutation.isPending}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          {!isReadLaterLoading && (readLaterData?.data ?? []).length === 0 && (
            <div className="text-center text-text-muted text-[13px] py-8">No Read Later entries yet</div>
          )}
        </div>
      )}      {/* ── INPUT AREA (only on chat tab) ── */}
      {activePanel === 'chat' && (
        <div className="p-4 bg-surface border-t border-border z-10 w-full min-w-0">
          {/* Reply Banner */}
          {replyingTo && (
            <div className="flex items-center justify-between gap-3 mb-2 p-2.5 rounded-lg border border-primary/20 bg-primary/5 text-xs text-text animate-fade-in">
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-primary">Replying to {replyingTo.sender?.name}</span>
                <span className="truncate text-text-secondary">{replyingTo.content || 'Attachment'}</span>
              </div>
              <button onClick={() => setReplyingTo(null)} className="text-text-muted hover:text-text cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Editing Banner */}
          {editingMessage && (
            <div className="flex items-center justify-between gap-3 mb-2 p-2.5 rounded-lg border border-warning/20 bg-warning/5 text-xs text-text animate-fade-in">
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-warning">Editing Message</span>
                <span className="truncate text-text-secondary">{editingMessage.content}</span>
              </div>
              <button
                onClick={() => {
                  setEditingMessage(null);
                  setContent('');
                }}
                className="text-text-muted hover:text-text cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Bulk Select Mode Toggle Button (Premium Option) */}
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={() => {
                setIsBulkSelectMode(!isBulkSelectMode);
                setSelectedMessages([]);
              }}
              className={`text-[12px] font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${isBulkSelectMode
                ? 'bg-primary text-bg'
                : 'bg-bg-hover text-text-secondary hover:text-text'
                }`}
            >
              <span>{isBulkSelectMode ? '✓ Exit Select Mode' : '🗂️ Select Multiple'}</span>
            </button>

            {isBulkSelectMode && selectedMessages.length > 0 && (
              <div className="flex items-center gap-2 animate-fade-in">
                <span className="text-[12px] font-medium text-text-secondary">
                  {selectedMessages.length} selected
                </span>
                <button
                  type="button"
                  onClick={() => bulkDeleteMutation.mutate({ messageIds: selectedMessages, deleteType: 'me' })}
                  className="px-2.5 py-1 rounded-lg border border-border text-[11.5px] font-medium text-text hover:bg-bg-hover cursor-pointer"
                  disabled={bulkDeleteMutation.isPending}
                >
                  Delete for me
                </button>
                <button
                  type="button"
                  onClick={() => bulkDeleteMutation.mutate({ messageIds: selectedMessages, deleteType: 'everyone' })}
                  className="px-2.5 py-1 rounded-lg bg-error text-white text-[11.5px] font-bold hover:bg-error cursor-pointer"
                  disabled={bulkDeleteMutation.isPending}
                >
                  Delete for Everyone
                </button>
              </div>
            )}
          </div>

          {sendFeedback && (
            <div className="flex items-center justify-between gap-2 mb-3 p-2.5 rounded-lg border border-primary/20 bg-primary/5 text-[12.5px] text-primary font-medium">
              <span>{sendFeedback}</span>
              <button
                type="button"
                onClick={() => setSendFeedback(null)}
                className="text-primary/70 hover:text-primary cursor-pointer"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Schedule picker */}
          {showSchedule && (
            <div className="flex items-center gap-2 mb-3 p-2 rounded-lg border border-border bg-bg-hover">
              <span className="text-[12px] text-text-secondary">📅 Schedule send:</span>
              <input
                type="datetime-local"
                className="input-field text-[12px] py-1 px-2 flex-1"
                value={scheduledAt}
                min={(() => {
                  const now = new Date();
                  const pad = (n: number) => String(n).padStart(2, '0');
                  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
                })()}
                onChange={(e) => setScheduledAt(e.target.value)}
              />
              <button
                type="button"
                onClick={() => { setShowSchedule(false); setScheduledAt(''); }}
                className="text-text-muted hover:text-error text-[12px] cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* Template quick-pick */}
          {showTemplates && (
            <div className="mb-3 border border-border rounded-xl bg-surface p-3 max-h-[160px] overflow-y-auto flex flex-col gap-2">
              <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">📋 Templates</div>
              {(templatesData?.data ?? []).map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => handleUseTemplate(tpl)}
                  className="text-left p-2 rounded-lg hover:bg-bg-hover transition text-[13px] text-text cursor-pointer"
                >
                  <span className="font-medium">{tpl.title}</span>
                  {tpl.content && <span className="text-text-muted ml-2 text-[11.5px] line-clamp-1">{tpl.content}</span>}
                </button>
              ))}
              {(templatesData?.data ?? []).length === 0 && (
                <span className="text-[12px] text-text-muted">No templates yet</span>
              )}
            </div>
          )}

          <form onSubmit={handleSend} className="flex gap-2 items-end w-full min-w-0">
            <div className="flex-1 bg-tertiary border border-border rounded-xl flex flex-col transition-all focus-within:border-primary/50 focus-within:shadow-[0_0_0_2px_rgba(var(--primary-rgb),0.1)] min-w-0">
              {files.length > 0 && (
                <div className="px-4 py-2 border-b border-border bg-surface/50 rounded-t-xl flex flex-col gap-1.5 text-[12px] text-text-secondary">
                  {files.map((f, idx) => (
                    <div key={`${f.name}-${idx}`} className="flex justify-between items-center gap-2">
                      <span className="flex items-center gap-2 min-w-0">
                        📎 <span className="truncate max-w-[220px]" title={f.name}>{f.name}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setFiles((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-text-muted hover:text-error cursor-pointer shrink-0"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setFiles([])}
                    className="text-[11px] text-text-muted hover:text-error self-start cursor-pointer"
                  >
                    Clear all
                  </button>
                </div>
              )}
              {files.length === 0 && draftTemplateMedia && (
                <div className="px-4 py-2 border-b border-border bg-surface/50 rounded-t-xl flex justify-between items-center text-[12px] text-text-secondary">
                  <span className="flex items-center gap-2">📎 <span className="truncate max-w-[200px]">{draftTemplateMedia.file_name} (template)</span></span>
                  <button type="button" onClick={() => setDraftTemplateMedia(null)} className="text-text-muted hover:text-error cursor-pointer">✕</button>
                </div>
              )}
              <div className="flex-1 flex flex-col min-w-0 bg-tertiary border border-border rounded-xl overflow-hidden focus-within:border-primary/50 transition-all">
                {/* Unified Top Toolbar Line */}
                <div className="flex items-center gap-2.5 px-3 py-2 border-b border-border bg-surface/40 select-none flex-wrap">
                  {/* Left: Input actions */}
                  <div className="flex items-center gap-1">
                    {/* File attach — multiple files supported */}
                    <label className="p-1.5 text-text-muted hover:text-primary cursor-pointer rounded-lg hover:bg-bg-hover transition" title="Attach files (multiple allowed)">
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.zip,.apk,.aab"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                    </label>
                    {/* Template picker toggle */}
                    <button
                      type="button"
                      onClick={() => setShowTemplates((prev) => !prev)}
                      title="Templates"
                      className="p-1.5 text-text-muted hover:text-primary rounded-lg hover:bg-bg-hover transition cursor-pointer"
                    >
                      <FileText className="w-4.5 h-4.5" />
                    </button>
                    {/* Schedule toggle */}
                    <button
                      type="button"
                      onClick={() => setShowSchedule((prev) => !prev)}
                      title="Schedule message"
                      className={`p-1.5 rounded-lg hover:bg-bg-hover transition cursor-pointer ${scheduledAt ? 'text-primary' : 'text-text-muted hover:text-primary'}`}
                    >
                      <Clock className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  <div className="w-[1px] h-4 bg-border" />

                  {/* Right: Rich text formatting options */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => applyFormat('bold')}
                      className="w-7 h-7 rounded hover:bg-bg-hover flex items-center justify-center text-[13.5px] font-bold text-text-secondary hover:text-primary transition cursor-pointer"
                      title="Bold (Ctrl+B)"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormat('italic')}
                      className="w-7 h-7 rounded hover:bg-bg-hover flex items-center justify-center text-[13.5px] italic font-semibold text-text-secondary hover:text-primary transition cursor-pointer"
                      title="Italic (Ctrl+I)"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormat('underline')}
                      className="w-7 h-7 rounded hover:bg-bg-hover flex items-center justify-center text-[13.5px] underline font-semibold text-text-secondary hover:text-primary transition cursor-pointer"
                      title="Underline (Ctrl+U)"
                    >
                      U
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormat('strikeThrough')}
                      className="w-7 h-7 rounded hover:bg-bg-hover flex items-center justify-center text-[13.5px] line-through font-semibold text-text-secondary hover:text-primary transition cursor-pointer"
                      title="Strikethrough"
                    >
                      S
                    </button>
                    <div className="w-[1px] h-4 bg-border mx-1" />
                    <button
                      type="button"
                      onMouseDown={(e) => { e.preventDefault(); applyFormat('insertUnorderedList'); }}
                      className="h-7 px-1.5 rounded hover:bg-bg-hover flex items-center justify-center text-[12px] text-text-secondary hover:text-primary transition cursor-pointer gap-1"
                      title="Bullet List"
                    >
                      <span>•</span> <span className="text-[10px] font-medium">List</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => { e.preventDefault(); applyFormat('insertOrderedList'); }}
                      className="h-7 px-1.5 rounded hover:bg-bg-hover flex items-center justify-center text-[12px] text-text-secondary hover:text-primary transition cursor-pointer gap-1"
                      title="Numbered List"
                    >
                      <span>1.</span> <span className="text-[10px] font-medium">List</span>
                    </button>
                    <div className="w-[1px] h-4 bg-border mx-1" />
                    {/* Alignment buttons */}
                    <button
                      type="button"
                      onMouseDown={(e) => { e.preventDefault(); applyFormat('justifyLeft'); }}
                      className="w-7 h-7 rounded hover:bg-bg-hover flex items-center justify-center text-text-secondary hover:text-primary transition cursor-pointer"
                      title="Align Left"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="2" rx="1" /><rect x="2" y="9" width="14" height="2" rx="1" /><rect x="2" y="14" width="20" height="2" rx="1" /><rect x="2" y="19" width="14" height="2" rx="1" /></svg>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => { e.preventDefault(); applyFormat('justifyCenter'); }}
                      className="w-7 h-7 rounded hover:bg-bg-hover flex items-center justify-center text-text-secondary hover:text-primary transition cursor-pointer"
                      title="Align Center"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="2" rx="1" /><rect x="5" y="9" width="14" height="2" rx="1" /><rect x="2" y="14" width="20" height="2" rx="1" /><rect x="5" y="19" width="14" height="2" rx="1" /></svg>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => { e.preventDefault(); applyFormat('justifyRight'); }}
                      className="w-7 h-7 rounded hover:bg-bg-hover flex items-center justify-center text-text-secondary hover:text-primary transition cursor-pointer"
                      title="Align Right"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="2" rx="1" /><rect x="8" y="9" width="14" height="2" rx="1" /><rect x="2" y="14" width="20" height="2" rx="1" /><rect x="8" y="19" width="14" height="2" rx="1" /></svg>
                    </button>
                    <div className="w-[1px] h-4 bg-border mx-1" />
                    <button
                      type="button"
                      onClick={() => applyFormat('undo')}
                      className="w-7 h-7 rounded hover:bg-bg-hover flex items-center justify-center text-text-secondary hover:text-primary transition cursor-pointer text-sm"
                      title="Undo"
                    >
                      ↶
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormat('redo')}
                      className="w-7 h-7 rounded hover:bg-bg-hover flex items-center justify-center text-text-secondary hover:text-primary transition cursor-pointer text-sm"
                      title="Redo"
                    >
                      ↷
                    </button>
                  </div>
                </div>

                {/* Editor Row */}
                <div
                  ref={composerRef}
                  contentEditable
                  onInput={handleInput}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      // If cursor is inside a list, let the browser handle Enter naturally
                      const sel = window.getSelection();
                      const node = sel?.anchorNode;
                      const inList = !!(node && (node.parentElement?.closest('ul, ol')));
                      if (!inList) {
                        e.preventDefault();
                        handleSend(e as any);
                      }
                    }
                  }}
                  className="w-full px-4 py-3 text-[14px] text-text min-h-[60px] max-h-[180px] overflow-y-auto outline-none bg-transparent rich-editor-content"
                />
              </div>

            </div>
            {features.supportsRipple && channel.type === 'direct' && (
              <button
                type="button"
                onClick={handleRipple}
                disabled={sendMutation.isPending}
                title="Send Ripple (buzz)"
                className="w-11 h-11 rounded-xl bg-warning/10 border border-warning/30 text-warning flex items-center justify-center hover:bg-warning/20 transition disabled:opacity-50 cursor-pointer flex-shrink-0 mb-0.5 text-[18px]"
              >
                <Bell className="w-4.5 h-4.5 animate-pulse" />
              </button>
            )}
            {/* Send button */}
            <button
              type="submit"
              disabled={(!content.trim() && files.length === 0 && !draftTemplateMedia) || sendMutation.isPending || isUploading}
              className="w-11 h-11 rounded-xl bg-primary text-bg flex items-center justify-center hover:bg-primary/90 transition shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 mb-0.5 cursor-pointer"
            >
              {isUploading || sendMutation.isPending || editMutation.isPending ? (
                <span className="w-5 h-5 border-2 border-current/20 border-t-current rounded-full animate-spin" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Forwarding Channel Picker Modal */}
      {showForwardModal && forwardingMessage && (
        <div className="fixed inset-0 z-[200] bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border max-w-sm w-full rounded-2xl p-5 shadow-2xl animate-fade-in flex flex-col gap-4">
            <div>
              <h3 className="font-bold text-[16px] text-text">Forward Message</h3>
              <p className="text-[12.5px] text-text-secondary mt-1 leading-relaxed">
                Choose a channel to forward this message to:
              </p>
            </div>

            <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
              {allChannels.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => forwardMutation.mutate({ messageId: forwardingMessage.id, targetChannelId: c.id })}
                  className="w-full text-left px-3 py-2 rounded-lg border border-border bg-bg hover:bg-bg-hover hover:border-primary/50 transition-colors text-text font-medium text-[13px] flex items-center justify-between"
                  disabled={forwardMutation.isPending}
                >
                  <span>{c.name}</span>
                  <span className="text-text-muted text-[10px] uppercase font-bold">{c.type.replace('_', ' ')}</span>
                </button>
              ))}
              {allChannels.length === 0 && (
                <span className="text-text-muted text-xs text-center py-4">No target channels found</span>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setShowForwardModal(false);
                setForwardingMessage(null);
              }}
              className="w-full bg-tertiary hover:bg-bg-hover text-text text-[13px] py-2 px-3 rounded-lg font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Read Later Modal Overlay */}
      {readLaterModalData && (
        <ReadLaterModal
          channelId={readLaterModalData.channelId}
          messageId={readLaterModalData.messageId}
          initialRemindAt={readLaterModalData.initialRemindAt}
          readLaterId={readLaterModalData.readLaterId}
          onClose={() => setReadLaterModalData(null)}
          onSuccess={() => {
            setReadLaterModalData(null);
            refetchReadLater();
          }}
        />
      )}

      {showMembers && (
        <ChannelMembersPanel
          channel={channel}
          onClose={() => setShowMembers(false)}
          onDeleteSuccess={onDeleteSuccess}
        />
      )}

      {/* Premium Media Lightbox (WhatsApp/Teams style) */}
      {lightboxMedia && (
        <div
          className="fixed inset-0 bg-black/90 flex flex-col justify-center items-center z-[200] animate-fade-in p-4"
          onClick={() => setLightboxMedia(null)}
        >
          {/* Header controls */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white z-50">
            <span className="text-sm font-medium truncate max-w-[70%] drop-shadow-md">
              {lightboxMedia.name}
            </span>
            <div className="flex items-center gap-3">
              <a
                href={lightboxMedia.url}
                download={lightboxMedia.name}
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-white flex items-center justify-center cursor-pointer text-xs font-semibold gap-1.5"
                title="Download file"
              >
                📥 <span className="hidden sm:inline">Download</span>
              </a>
              <button
                type="button"
                onClick={() => setLightboxMedia(null)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-white flex items-center justify-center cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Body */}
          <div
            className="flex-1 flex items-center justify-center max-w-full max-h-[85vh] mt-12"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxMedia.category === 'image' || lightboxMedia.mimeType?.startsWith('image/') ? (
              <img
                src={lightboxMedia.url}
                alt={lightboxMedia.name}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            ) : lightboxMedia.category === 'video' || lightboxMedia.mimeType?.startsWith('video/') ? (
              <video
                src={lightboxMedia.url}
                controls
                autoPlay
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl bg-black"
              />
            ) : lightboxMedia.category === 'audio' || lightboxMedia.mimeType?.startsWith('audio/') ? (
              <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col items-center gap-4 shadow-2xl min-w-[320px] max-w-md">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[28px] animate-pulse">
                  🎵
                </div>
                <div className="text-sm font-semibold text-text text-center truncate max-w-[280px]">
                  {lightboxMedia.name}
                </div>
                <audio src={lightboxMedia.url} controls autoPlay className="w-full mt-2" />
              </div>
            ) : (
              // General document preview (e.g. PDF)
              <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col items-center gap-4 shadow-2xl min-w-[320px] max-w-md">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[28px]">
                  📄
                </div>
                <div className="text-sm font-semibold text-text text-center truncate max-w-[280px]">
                  {lightboxMedia.name}
                </div>
                <a
                  href={lightboxMedia.url}
                  download={lightboxMedia.name}
                  className="btn btn-primary w-full text-center py-2 text-[13px] rounded-lg mt-2 cursor-pointer"
                >
                  Download File
                </a>
              </div>
            )}
          </div>
        </div>
      )}
      {deletingMessage && (
        <div className="fixed inset-0 z-[200] bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border max-w-sm w-full rounded-2xl p-5 shadow-2xl animate-fade-in flex flex-col gap-4">
            <div>
              <h3 className="font-bold text-[16px] text-text">Delete Message?</h3>
              <p className="text-[12.5px] text-text-secondary mt-1 leading-relaxed">
                Delete this message from your chat history, or delete it for everyone?
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleDeleteMessage('me')}
                className="w-full text-left px-4 py-2.5 rounded-xl border border-border bg-bg hover:bg-bg-hover transition text-text font-medium text-[13px] flex items-center justify-between"
              >
                <span>Delete for me</span>
                <span className="text-text-muted text-[11px]">Only hides for you</span>
              </button>

              {deletingMessage.sender_id === user?.id && (
                <button
                  type="button"
                  onClick={() => handleDeleteMessage('everyone')}
                  className="w-full text-left px-4 py-2.5 rounded-xl border border-error/20 bg-error/5 hover:bg-error/10 transition text-error font-semibold text-[13px] flex items-center justify-between animate-fade-in"
                >
                  <span>Delete for Everyone</span>
                  <span className="text-error/70 text-[11px] font-normal">Deletes for all</span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setDeletingMessage(null)}
              className="w-full bg-tertiary hover:bg-bg-hover text-text text-[13px] py-2 px-3 rounded-lg font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
