'use client';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { ChatChannel, ChatMember } from '@/types/chat';
import { useChatApi } from '@/context/ChatApiContext';
import { useAuth } from '@/context/AuthContext';
import { getChannelDisplayName } from '@/utils/format';

interface ChannelMembersPanelProps {
  channel: ChatChannel;
  onClose: () => void;
  onDeleteSuccess?: () => void;
}

function MemberRow({ member }: { member: ChatMember }) {
  return (
    <div className="px-5 py-4 border-b border-border last:border-b-0">
      <p className="text-[14px] font-semibold text-text">{member.name}</p>
      {member.email && (
        <p className="text-[12.5px] text-text-secondary mt-1">{member.email}</p>
      )}
      <div className="mt-2 flex flex-col gap-1 text-[12px] text-text-secondary">
        <p>
          <span className="font-medium text-text">Phone:</span>{' '}
          {member.phone_number || '—'}
        </p>
        {member.company_name && (
          <p>
            <span className="font-medium text-text">Company:</span> {member.company_name}
          </p>
        )}
        {member.user_type && (
          <p>
            <span className="font-medium text-text">Type:</span>{' '}
            <span className="capitalize">{member.user_type}</span>
          </p>
        )}
        {member.address && (
          <p>
            <span className="font-medium text-text">Address:</span> {member.address}
          </p>
        )}
      </div>
    </div>
  );
}

export function ChannelMembersPanel({ channel, onClose, onDeleteSuccess }: ChannelMembersPanelProps) {
  const { user } = useAuth();
  const chatApi = useChatApi();
  const { features } = chatApi.config;
  const count = channel.members.length;
  const countLabel = `${count} ${count === 1 ? 'member' : 'members'}`;
  
  const [showConfirm, setShowConfirm] = useState(false);
  const canDelete = features.canDeleteChannel;

  const deleteMutation = useMutation({
    mutationFn: () => chatApi.deleteChatChannel!(channel.id),
    onSuccess: () => {
      onDeleteSuccess?.();
      onClose();
    },
    onError: (err: any) => {
      alert(err.message || 'Failed to delete channel');
    }
  });

  return (
    <div className="fixed inset-0 z-[95] flex justify-end bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-[400px] h-full bg-surface border-l border-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-border shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="text-[12px] text-primary font-medium hover:underline mb-3 animate-fade-in"
          >
            Back
          </button>
          <h2 className="text-[17px] font-semibold text-text">{getChannelDisplayName(channel, user?.id ? Number(user.id) : undefined)}</h2>
          <p className="text-[13px] text-text-secondary mt-1">{countLabel}</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <p className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-secondary border-b border-border">
            Participants
          </p>
          {channel.members.length === 0 ? (
            <p className="px-5 py-8 text-[13px] text-text-secondary text-center">No members in this channel.</p>
          ) : (
            channel.members.map((member) => <MemberRow key={member.id} member={member} />)
          )}
        </div>

        {canDelete && (
          <div className="p-5 border-t border-border bg-surface shrink-0">
            {showConfirm ? (
              <div className="flex flex-col gap-3 p-4 bg-error/5 border border-error/20 rounded-2xl animate-fade-in">
                <p className="text-[12.5px] text-text font-medium leading-relaxed">
                  Are you sure you want to permanently delete this channel? This will delete all message history.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => deleteMutation.mutate()}
                    disabled={deleteMutation.isPending}
                    className="flex-1 bg-error hover:bg-red-700 text-white text-[12px] py-2 px-3 rounded-lg font-semibold transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {deleteMutation.isPending ? (
                      <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      'Yes, Delete'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowConfirm(false)}
                    disabled={deleteMutation.isPending}
                    className="flex-1 bg-bg hover:bg-bg-hover text-text border border-border text-[12px] py-2 px-3 rounded-lg font-semibold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="w-full bg-error/10 hover:bg-error/20 text-error border border-error/20 text-[12.5px] py-2.5 px-4 rounded-xl font-semibold transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Channel
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
