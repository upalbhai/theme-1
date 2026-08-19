'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Bell, X, Trash2, MessageSquare } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from 'next/navigation';
import { useChatApi } from '@/context/ChatApiContext';
import { ChatMessage, WsEvent } from '@/types/chat';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { CreateChannelModal } from '@/components/chat/CreateChannelModal';
import { getChannelDisplayName } from '@/utils/format';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

const useWebSocket = () => ({
  isConnected: true,
  subscribe: (callback: any) => () => { },
});

export function ChatsPageContent() {
  const { user } = useAuth();
  const chatApi = useChatApi();
  const { queryKeys, features } = chatApi.config;
  const queryClient = useQueryClient();
  const { subscribe } = useWebSocket();

  const searchParams = useSearchParams();
  const urlChannelId = searchParams.get('channelId');

  const [activeChannelId, setActiveChannelId] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createModalType, setCreateModalType] = useState<'internal' | 'external' | 'direct'>('internal');
  const [channelPage, setChannelPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [activePanel, setActivePanel] = useState<'chat' | 'summary' | 'library' | 'templates' | 'saved' | 'read-later'>('chat');
  const [highlightedMessageId, setHighlightedMessageId] = useState<number | null>(null);
  const [activeToast, setActiveToast] = useState<{
    title: string;
    message: string;
    channelId: number;
    messageId: number;
  } | null>(null);
  const [deleteSuccessBanner, setDeleteSuccessBanner] = useState(false);
  const canDelete = features.canDeleteChannel;

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; channelId: number } | null>(null);
  const [channelToDelete, setChannelToDelete] = useState<number | null>(null);

  const deleteChannelMutation = useMutation({
    mutationFn: (id: number) => {
      if (!chatApi.deleteChatChannel) {
        throw new Error('Channel deletion not supported');
      }
      return chatApi.deleteChatChannel(id);
    },
    onSuccess: (_, deletedId) => {
      if (activeChannelId === deletedId) {
        setActiveChannelId(null);
      }
      queryClient.invalidateQueries({ queryKey: [queryKeys.channels] });
      setDeleteSuccessBanner(true);
    },
    onError: (err: any) => {
      alert(err.message || 'Failed to delete channel');
    }
  });

  const handleContextMenu = (e: React.MouseEvent, channelId: number) => {
    if (!canDelete) return;
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      channelId,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const channelPageSize = 10;

  const { data: channelsResponse, isLoading: isLoadingChannels } = useQuery({
    queryKey: [queryKeys.channels, channelPage, search],
    queryFn: () => chatApi.getChatChannels(channelPage, channelPageSize, search),
  });

  const channels = channelsResponse?.data ?? [];
  const meta = channelsResponse?.meta;
  const activeChannel = channels.find((c) => c.id === activeChannelId);

  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => setActiveToast(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [activeToast]);

  useEffect(() => {
    if (deleteSuccessBanner) {
      const timer = setTimeout(() => setDeleteSuccessBanner(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [deleteSuccessBanner]);

  useEffect(() => {
    const unsubscribe = subscribe((event: WsEvent) => {
      if (!event?.data) return;

      // Backend payload shape for chat/ripple:
      // { channel_id, sender_id, is_ripple, message: ChatMessage }
      if (event.type === 'chat' || event.type === 'ripple') {
        const channelId =
          event.data.channel_id ?? event.data.message?.chat_channel_id;
        const message = event.data.message as ChatMessage | undefined;
        if (!message?.id) return;

        queryClient.invalidateQueries({ queryKey: [queryKeys.channels] });

        if (channelId === activeChannelId) {
          queryClient.setQueryData(
            [...queryKeys.messages(activeChannelId ?? 0)],
            (oldData: any) => {
              if (!oldData) {
                return {
                  pages: [{ data: [message], meta: { total_items: 1, total_pages: 1, current_page: 1, items_per_page: 15 } }],
                  pageParams: [1],
                };
              }
              const exists = oldData.pages.some((page: any) =>
                page.data.some((m: ChatMessage) => m.id === message.id)
              );
              if (exists) return oldData;
              return {
                ...oldData,
                pages: oldData.pages.map((page: any, idx: number) =>
                  idx === 0 ? { ...page, data: [message, ...page.data] } : page
                ),
              };
            }
          );
        }
      } else if (event.type === 'message_edited') {
        const { channel_id, message_id, content } = event.data;
        if (activeChannelId && channel_id === activeChannelId) {
          queryClient.setQueryData(
            [...queryKeys.messages(activeChannelId)],
            (oldData: any) => {
              if (!oldData) return oldData;
              return {
                ...oldData,
                pages: oldData.pages.map((page: any) => ({
                  ...page,
                  data: page.data.map((m: ChatMessage) =>
                    m.id === message_id ? { ...m, content, is_edited: true } : m
                  ),
                })),
              };
            }
          );
        }
      } else if (event.type === 'message_reaction_updated') {
        const { channel_id, message_id, reactions } = event.data;
        if (activeChannelId && channel_id === activeChannelId) {
          queryClient.setQueryData(
            [...queryKeys.messages(activeChannelId)],
            (oldData: any) => {
              if (!oldData) return oldData;
              return {
                ...oldData,
                pages: oldData.pages.map((page: any) => ({
                  ...page,
                  data: page.data.map((m: ChatMessage) =>
                    m.id === message_id ? { ...m, reactions } : m
                  ),
                })),
              };
            }
          );
        }
      } else if (event.type === 'message_deleted') {
        const { channel_id, message_id } = event.data;
        if (activeChannelId && channel_id === activeChannelId) {
          queryClient.setQueryData(
            [...queryKeys.messages(activeChannelId)],
            (oldData: any) => {
              if (!oldData) return oldData;
              return {
                ...oldData,
                pages: oldData.pages.map((page: any) => ({
                  ...page,
                  data: page.data.filter((m: ChatMessage) => m.id !== message_id),
                })),
              };
            }
          );
        }
      } else if (event.type === 'read_later') {
        setActiveToast({
          title: event.title,
          message: event.message,
          channelId: event.data.channel_id,
          messageId: event.data.message_id,
        });
        queryClient.invalidateQueries({ queryKey: [queryKeys.readLater] });
        queryClient.invalidateQueries({ queryKey: [...queryKeys.messages(activeChannelId ?? 0)] });
      }
    });
    return () => unsubscribe();
  }, [subscribe, activeChannelId, queryClient, queryKeys]);

  useEffect(() => {
    if (urlChannelId) {
      setActiveChannelId(Number(urlChannelId));
    }
  }, [urlChannelId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop && channels.length > 0 && !activeChannelId && !urlChannelId) {
        setActiveChannelId(channels[0].id);
      }
    }
  }, [channels, activeChannelId, urlChannelId]);

  const handleToastClick = () => {
    if (activeToast) {
      setActiveChannelId(activeToast.channelId);
      setHighlightedMessageId(activeToast.messageId);
      setActivePanel('chat');
      setActiveToast(null);
    }
  };

  const handleNavigateToMessage = (channelId: number, messageId: number) => {
    setActiveChannelId(channelId);
    setHighlightedMessageId(messageId);
    setActivePanel('chat');
  };

  const handleDeleteSuccess = () => {
    setActiveChannelId(null);
    setDeleteSuccessBanner(true);
    queryClient.invalidateQueries({ queryKey: [queryKeys.channels] });
  };

  const totalPages = meta?.total_pages ?? 1;
  const currentPage = meta?.current_page ?? 1;

  return (
    <div className="flex flex-col gap-3 w-full min-w-0">
      {deleteSuccessBanner && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 bg-success/10 border border-success/25 rounded-xl text-[13px] text-green-700 dark:text-success font-medium animate-fade-in">
          <span>Channel deleted successfully.</span>
          <button
            type="button"
            onClick={() => setDeleteSuccessBanner(false)}
            className="text-green-700/70 dark:text-success/70 hover:text-green-700 dark:hover:text-success cursor-pointer shrink-0"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      <div className="flex bg-surface border border-border rounded-xl overflow-hidden shadow-sm h-[calc(100vh-100px)] w-full min-w-0 relative">
        <div
          className={`${activeChannelId ? 'hidden md:flex' : 'flex'} w-full md:w-80 md:border-r md:border-border flex flex-col bg-surface/30 h-full`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-border flex justify-between items-center bg-surface">
              <h2 className="font-semibold text-[16px]">Channels</h2>
              <div className="flex items-center gap-1.5">
                {features.createChannelRequiresProject && (
                  <button
                    onClick={() => {
                      setCreateModalType('direct');
                      setShowCreateModal(true);
                    }}
                    className="w-7 h-7 rounded bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition cursor-pointer"
                    title="New Direct Message"
                  >
                    <MessageSquare className="w-4.5 h-4.5" />
                  </button>
                )}
                <button
                  onClick={() => {
                    setCreateModalType('internal');
                    setShowCreateModal(true);
                  }}
                  className="w-7 h-7 rounded bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition cursor-pointer"
                  title="New Channel"
                >
                  +
                </button>
              </div>
            </div>
            <div className="p-3 border-b border-border bg-surface/50">
              <input
                type="text"
                className="input-field py-1.5 px-3 text-[13px] w-full"
                placeholder="Search channels..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {isLoadingChannels ? (
                <div className="text-center p-4 text-text-secondary text-sm">Loading...</div>
              ) : channels.length === 0 ? (
                <div className="text-center p-4 text-text-secondary text-sm">No channels found</div>
              ) : (
                <div className="flex flex-col gap-1">
                  {channels.map((channel) => (
                    <div
                      key={channel.id}
                      onContextMenu={(e) => handleContextMenu(e, channel.id)}
                      className="group relative w-full"
                    >
                      <button
                        onClick={() => setActiveChannelId(channel.id)}
                        className={`flex items-center gap-3 p-3 pr-10 rounded-xl transition text-left cursor-pointer w-full ${activeChannelId === channel.id
                          ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                          : 'hover:bg-bg-hover text-text border border-transparent'
                          }`}
                      >
                        {(() => {
                          const displayName = getChannelDisplayName(channel, user?.id ? Number(user.id) : undefined);
                          const isDirect = channel.type === 'direct';
                          const otherMember = isDirect ? channel.members.find(m => m.id !== Number(user?.id)) : null;
                          const avatarSrc = otherMember?.profile_picture;
                          const initials = displayName.slice(0, 2).toUpperCase();

                          return (
                            <div className="w-10 h-10 rounded-full bg-tertiary border border-border flex items-center justify-center flex-shrink-0 text-xs font-bold text-text-muted overflow-hidden">
                              {avatarSrc ? (
                                <img src={avatarSrc} alt={displayName} className="w-full h-full object-cover" />
                              ) : (
                                initials
                              )}
                            </div>
                          );
                        })()}
                        <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                          <div className="font-medium text-[13.5px] truncate">{getChannelDisplayName(channel, user?.id ? Number(user.id) : undefined)}</div>
                          {channel.type !== 'direct' && (
                            <div className="text-[11.5px] text-text-secondary truncate capitalize">
                              {channel.members.length > 0
                                ? `${channel.members.length} members`
                                : channel.type.replace('_', ' ')}
                            </div>
                          )}
                        </div>
                      </button>
                      {canDelete && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setChannelToDelete(channel.id);
                          }}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-text-secondary hover:text-error hover:bg-error/10 opacity-0 group-hover:opacity-100 transition z-10 cursor-pointer"
                          title="Delete Channel"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {meta && totalPages > 1 && (
              <div className="p-3 border-t border-border bg-surface flex items-center justify-between gap-2 text-[12px] flex-shrink-0">
                <button
                  onClick={() => setChannelPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage <= 1}
                  className="px-2.5 py-1.5 rounded-lg border border-border bg-bg hover:bg-bg-hover disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer text-text font-medium"
                >
                  Prev
                </button>
                <span className="text-text-secondary font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setChannelPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage >= totalPages}
                  className="px-2.5 py-1.5 rounded-lg border border-border bg-bg hover:bg-bg-hover disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer text-text font-medium"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          className={`${activeChannelId ? 'flex' : 'hidden md:flex'} flex-1 flex flex-col h-full relative bg-bg-main min-w-0`}
        >
          {activeChannel ? (
            <ChatWindow
              channel={activeChannel}
              user={user}
              queryClient={queryClient}
              onBack={() => setActiveChannelId(null)}
              activePanel={activePanel}
              setActivePanel={setActivePanel}
              highlightedMessageId={highlightedMessageId}
              onHighlightCleared={() => setHighlightedMessageId(null)}
              onNavigateToMessage={handleNavigateToMessage}
              onDeleteSuccess={handleDeleteSuccess}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-text-secondary">
              <MessageSquarePlaceholder />
              <p className="mt-4">Select a channel to start messaging</p>
            </div>
          )}
        </div>

        {showCreateModal && (
          <CreateChannelModal
            defaultType={createModalType}
            onClose={() => setShowCreateModal(false)}
            onSuccess={(newChannelId) => {
              setShowCreateModal(false);
              setActiveChannelId(newChannelId);
            }}
          />
        )}

        {activeToast && (
          <div
            className="fixed top-20 right-6 z-[110] max-w-[360px] w-full bg-surface border-l-4 border-l-blue-500 border border-border rounded-xl shadow-xl p-4 flex gap-3 transition-all duration-300 animate-slide-in cursor-pointer hover:bg-bg-hover"
            onClick={handleToastClick}
          >
            <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0 self-start">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <span className="font-bold text-[14px] text-text flex items-center justify-between">
                {activeToast.title}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveToast(null);
                  }}
                  className="text-text-secondary hover:text-text cursor-pointer"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
              <p className="text-[12.5px] text-text-secondary mt-1 leading-normal line-clamp-2">
                {activeToast.message}
              </p>
              <span className="text-[11.5px] text-primary font-semibold mt-2 hover:underline">
                View Message →
              </span>
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp-Style Right-click Context Menu */}
      {contextMenu && (
        <div
          className="fixed inset-0 z-[150]"
          onClick={() => setContextMenu(null)}
          onContextMenu={(e) => {
            e.preventDefault();
            setContextMenu(null);
          }}
        >
          <div
            className="absolute bg-surface border border-border shadow-xl rounded-xl py-1 w-48 animate-fade-in"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <button
              onClick={() => {
                setContextMenu(null);
                setChannelToDelete(contextMenu.channelId);
              }}
              className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 transition flex items-center gap-2 cursor-pointer font-medium"
            >
              <Trash2 className="w-4 h-4" /> Delete Channel
            </button>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={channelToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setChannelToDelete(null);
        }}
        onConfirm={async () => {
          if (channelToDelete !== null) {
            try {
              await deleteChannelMutation.mutateAsync(channelToDelete);
              setChannelToDelete(null);
            } catch (err) {
              console.error(err);
            }
          }
        }}
        isLoading={deleteChannelMutation.isPending}
        title="Delete Chat Channel?"
        description="Are you sure you want to permanently delete this channel? This will delete all message history."
      />
    </div>
  );
}

function MessageSquarePlaceholder() {
  return (
    <div className="w-14 h-14 rounded-2xl bg-primary/5 border border-primary/15 flex items-center justify-center text-primary text-2xl">
      💬
    </div>
  );
}