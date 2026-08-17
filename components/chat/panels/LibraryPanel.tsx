'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Video, FileText, Volume2, Archive, File } from 'lucide-react';

interface LibraryPanelProps {
  channelId: number;
  chatApi: any;
  getMediaUrl: (url: string | null | undefined) => string;
  setLightboxMedia: (
    media: { url: string; category: string; name: string; mimeType?: string } | null
  ) => void;
}

export function LibraryPanel({
  channelId,
  chatApi,
  getMediaUrl,
  setLightboxMedia,
}: LibraryPanelProps) {
  const [libraryCategory, setLibraryCategory] = useState<string>('');
  const { queryKeys } = chatApi.config;

  // Library query
  const { data: libraryData, isLoading: isLibraryLoading } = useQuery({
    queryKey: [...queryKeys.library, channelId, libraryCategory],
    queryFn: () =>
      chatApi.getChatLibrary({
        category: (libraryCategory as any) || undefined,
        page: 1,
        page_size: 40,
      }),
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2 flex-wrap">
        {['', 'image', 'pdf', 'document', 'audio', 'video', 'zip'].map((cat) => (
          <button
            key={cat}
            onClick={() => setLibraryCategory(cat)}
            className={`px-3 py-1 rounded-lg text-[12px] capitalize transition cursor-pointer ${
              libraryCategory === cat
                ? 'bg-primary text-bg font-semibold'
                : 'bg-bg-hover text-text-secondary hover:text-text'
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
          {(libraryData?.data ?? []).map((item: any) => {
            const isMedia =
              ['image', 'video', 'audio'].includes(item.file_category || '') ||
              item.mime_type?.startsWith('image/') ||
              item.mime_type?.startsWith('video/') ||
              item.mime_type?.startsWith('audio/');

            return (
              <a
                key={item.id}
                href={getMediaUrl(item.file_url)}
                target={isMedia ? undefined : '_blank'}
                rel="noreferrer"
                onClick={(e) => {
                  if (isMedia) {
                    e.preventDefault();
                    setLightboxMedia({
                      url: getMediaUrl(item.file_url),
                      category: item.file_category || '',
                      name: item.file_name || 'File',
                      mimeType: item.mime_type || undefined,
                    });
                  }
                }}
                className="flex flex-col rounded-xl border border-border overflow-hidden hover:border-primary/40 transition group cursor-pointer"
              >
                {item.file_category === 'image' ? (
                  <img
                    src={getMediaUrl(item.file_url)}
                    alt={item.file_name}
                    className="w-full h-28 object-cover bg-tertiary"
                  />
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
                  <div className="text-[11.5px] font-medium text-text truncate">
                    {item.file_name}
                  </div>
                  <div className="text-[10px] text-text-muted truncate">
                    {item.sender?.name} · {item.channel_name}
                  </div>
                </div>
              </a>
            );
          })}
          {(libraryData?.data ?? []).length === 0 && (
            <div className="col-span-full text-center text-text-muted text-[13px] py-12">
              No files found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
