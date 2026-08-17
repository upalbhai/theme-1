'use client';

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useChatApi } from '@/context/ChatApiContext';

interface CreateChannelModalProps {
  onClose: () => void;
  onSuccess: (id: number) => void;
  defaultType?: 'internal' | 'external' | 'direct';
}

export function CreateChannelModal({ onClose, onSuccess, defaultType }: CreateChannelModalProps) {
  const chatApi = useChatApi();
  const queryClient = useQueryClient();
  const { features, queryKeys } = chatApi.config;
  const [form, setForm] = useState({
    name: '',
    project_id: 0,
    type: (defaultType || 'internal') as 'internal' | 'external' | 'direct',
    member_ids: [] as number[],
    is_private: false,
  });
  const [error, setError] = useState('');

  const projects: any[] = [];
  const users: any[] = [];

  const mutation = useMutation({
    mutationFn: (payload: typeof form) => {
      if (payload.type === 'direct') {
        if (!chatApi.getOrCreateDirectChat) {
          throw new Error('Direct messages are not supported in this context.');
        }
        return chatApi.getOrCreateDirectChat(payload.member_ids[0]);
      }
      return features.createChannelRequiresProject
        ? chatApi.createChatChannel(payload)
        : chatApi.createChatChannel({ name: payload.name, is_private: payload.is_private });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.channels] });
      onSuccess(res.data.id);
    },
    onError: (err: any) => setError(err.message || 'Failed to create channel'),
  });

  const toggleMember = (id: number) => {
    if (form.type === 'direct') {
      setForm((p) => {
        const selectedUser = users.find((u) => u.id === id);
        return {
          ...p,
          member_ids: [id],
          name: selectedUser ? `DM: ${selectedUser.name}` : `Direct Message with ${id}`,
        };
      });
    } else {
      setForm((p) => ({
        ...p,
        member_ids: p.member_ids.includes(id)
          ? p.member_ids.filter((x) => x !== id)
          : [...p.member_ids, id],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.type === 'direct') {
      if (form.member_ids.length !== 1) {
        setError('Please select exactly one user for Direct Message.');
        return;
      }
    } else {
      if (!form.name.trim()) {
        setError('Channel name is required.');
        return;
      }
    }
    if (form.type !== 'direct' && features.createChannelRequiresProject && !form.project_id) {
      setError('Project selection is required.');
      return;
    }
    mutation.mutate(form);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[100] p-4" onClick={onClose}>
      <div
        className="panel w-full max-w-[500px] p-6 bg-surface border border-border rounded-xl shadow-lg flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-[18px] font-semibold">
            {form.type === 'direct' ? 'Start Direct Message' : 'Create Custom Channel'}
          </h2>
          <button className="text-muted hover:text-text cursor-pointer" onClick={onClose}>✕</button>
        </div>

        {error && <div className="text-error bg-error/10 p-3 rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Channel name — hidden for direct messages */}
          {form.type !== 'direct' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-text">Channel Name</label>
              <input
                className="w-full px-3 py-2 text-[13px] border border-border rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Design Sync"
              />
            </div>
          )}

          {/* Channel type selector */}
          {form.type !== 'direct' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-text">Type</label>

              <Select
                value={form.type}
                onValueChange={(val) => {
                  setForm({
                    ...form,
                    type: val as 'internal' | 'external' | 'direct',
                    member_ids: [],
                    name: (val as string) === 'direct' ? '' : form.name,
                  });
                }}
              >
                <SelectTrigger className="w-full bg-surface border-border text-[13px] focus:ring-1 focus:ring-primary rounded-lg">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="internal">Internal (Team Only)</SelectItem>
                  <SelectItem value="external">External (With Client)</SelectItem>
                  <SelectItem value="direct">Direct Message</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Project selector — only when feature flag is on and type is not direct */}
          {features.createChannelRequiresProject && form.type !== 'direct' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-text">Project</label>
              <Select
                value={form.project_id === 0 ? '' : form.project_id.toString()}
                onValueChange={(val) => setForm({ ...form, project_id: Number(val) })}
              >
                <SelectTrigger className="w-full bg-surface border-border text-[13px] focus:ring-1 focus:ring-primary rounded-lg">
                  <SelectValue placeholder="Select Project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((p) => (
                    <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Private channel toggle — only when feature flag is off and type is not direct */}
          {!features.createChannelRequiresProject && form.type !== 'direct' && (
            <div className="flex flex-col mt-2">
              <label className="flex items-center gap-2 cursor-pointer text-[13px] font-medium text-text">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                  checked={form.is_private}
                  onChange={(e) => setForm({ ...form, is_private: e.target.checked })}
                />
                Private channel
              </label>
            </div>
          )}

          {/* Member / User selector */}
          {features.createChannelRequiresProject && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-text">
                {form.type === 'direct' ? 'Select User' : 'Select Members'}
              </label>
              <div className="max-h-[140px] overflow-y-auto border border-border p-3 rounded-lg bg-surface flex flex-col gap-2">
                {users.map((u) => (
                  <label key={u.id} className="flex items-center gap-2 cursor-pointer hover:bg-bg-hover p-1.5 rounded transition">
                    <input
                      type={form.type === 'direct' ? 'radio' : 'checkbox'}
                      name={form.type === 'direct' ? 'dm-user' : undefined}
                      className="w-4 h-4 accent-primary cursor-pointer"
                      checked={form.member_ids.includes(u.id)}
                      onChange={() => toggleMember(u.id)}
                    />
                    <span className="text-[13px]">{u.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" className="px-4 py-2 text-[13px] font-medium text-text border border-border rounded-lg hover:bg-bg-hover transition cursor-pointer" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-[13px] font-medium text-primary-foreground bg-primary rounded-lg hover:opacity-90 transition cursor-pointer disabled:opacity-50"
              disabled={mutation.isPending}
            >
              {mutation.isPending
                ? form.type === 'direct'
                  ? 'Starting...'
                  : 'Creating...'
                : form.type === 'direct'
                  ? 'Start Conversation'
                  : 'Create Channel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
