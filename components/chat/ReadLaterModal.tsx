'use client';

import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Clock, X } from 'lucide-react';
import { useChatApi } from '@/context/ChatApiContext';

interface ReadLaterModalProps {
  onClose: () => void;
  onSuccess: () => void;
  channelId: number;
  messageId: number;
  initialRemindAt?: string | null;
  readLaterId?: number; // Present if updating an existing record
}

const formatIsoToDatetimeLocal = (isoString?: string | null): string => {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';
    const tzoffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzoffset).toISOString().slice(0, 16);
  } catch {
    return '';
  }
};

export function ReadLaterModal({
  onClose,
  onSuccess,
  channelId,
  messageId,
  initialRemindAt = null,
  readLaterId,
}: ReadLaterModalProps) {
  const chatApi = useChatApi();
  const { queryKeys } = chatApi.config;
  const queryClient = useQueryClient();
  const [remindAt, setRemindAt] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (initialRemindAt) {
      setRemindAt(formatIsoToDatetimeLocal(initialRemindAt));
    } else {
      setRemindAt('');
    }
  }, [initialRemindAt]);

  const isEditing = !!readLaterId;

  const mutation = useMutation({
    mutationFn: async (selectedTime: string | null) => {
      const isoTime = selectedTime ? new Date(selectedTime).toISOString() : null;
      if (isEditing) {
        return chatApi.updateReadLaterReminder(readLaterId!, isoTime);
      } else {
        return chatApi.addToReadLater(channelId, messageId, isoTime);
      }
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.readLater] });
      queryClient.invalidateQueries({ queryKey: [...queryKeys.messages(channelId)] });
      onSuccess();
    },
    onError: (err: any) => {
      setError(err.response?.data?.error || err.message || 'Failed to save Read Later reminder');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (remindAt) {
      const targetTime = new Date(remindAt).getTime();
      const now = Date.now();
      if (targetTime <= now) {
        setError('Reminder time must be a future timestamp');
        return;
      }
    }

    mutation.mutate(remindAt || null);
  };

  const handleClearReminder = () => {
    setError('');
    mutation.mutate(null);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[100] p-4" onClick={onClose}>
      <div
        className="panel w-full max-w-[440px] p-6 bg-surface border border-border rounded-xl shadow-lg flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-[17px] font-semibold flex items-center gap-2 text-text">
            <Clock className="w-4 h-4 text-primary" />
            {isEditing ? 'Update Read Later Reminder' : 'Add to Read Later'}
          </h2>
          <button className="text-text-secondary hover:text-text cursor-pointer" onClick={onClose} aria-label="Close">
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {error && <div className="text-error bg-error/10 p-3 rounded-lg text-[13px] font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="input-group">
            <label className="input-label mb-1.5 text-[13px] text-text-secondary">
              Set Reminder Time (Optional)
            </label>
            <input
              type="datetime-local"
              className="input-field py-2.5 px-3.5 text-[14px]"
              value={remindAt}
              onChange={(e) => setRemindAt(e.target.value)}
            />
            <p className="text-[11.5px] text-text-muted mt-1.5 leading-normal">
              Without a reminder time, this message will act as a simple bookmark in your Read Later list.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2.5 mt-3">
            {isEditing && (
              <button
                type="button"
                className="btn btn-secondary text-error border-error/20 hover:bg-error/10 text-[13px] px-3.5 py-2 cursor-pointer sm:mr-auto"
                onClick={handleClearReminder}
                disabled={mutation.isPending}
              >
                Clear Reminder
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary text-[13px] px-3.5 py-2 cursor-pointer"
              onClick={onClose}
              disabled={mutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary text-[13px] px-4 py-2 cursor-pointer flex items-center justify-center gap-1.5 font-semibold"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Saving...' : remindAt ? 'Set Reminder' : 'Bookmark Only'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
