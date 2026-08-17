'use client';

import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { MessageTemplate } from '@/types/chat';

interface TemplatesPanelProps {
  chatApi: any;
  composerText: string;
  onSelectTemplate: (tpl: MessageTemplate) => void;
}

export function TemplatesPanel({
  chatApi,
  composerText,
  onSelectTemplate,
}: TemplatesPanelProps) {
  const queryClient = useQueryClient();
  const { queryKeys } = chatApi.config;

  const [newTemplateTitle, setNewTemplateTitle] = useState('');
  const [newTemplateContent, setNewTemplateContent] = useState('');
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [isTemplateUploading, setIsTemplateUploading] = useState(false);
  const templateFileInputRef = useRef<HTMLInputElement>(null);

  // Templates query
  const { data: templatesData, isLoading: isTemplatesLoading, refetch: refetchTemplates } = useQuery({
    queryKey: [queryKeys.templates],
    queryFn: () => chatApi.getTemplates(1, 50),
  });

  const createTemplateMutation = useMutation({
    mutationFn: (payload: { title: string; content?: string; file_url?: string; file_name?: string }) =>
      chatApi.createTemplate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.templates] });
      setNewTemplateTitle('');
      setNewTemplateContent('');
      setTemplateFile(null);
      refetchTemplates();
    },
  });

  const deleteTemplateMutation = useMutation({
    mutationFn: (id: number) => chatApi.deleteTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.templates] });
      refetchTemplates();
    },
  });

  const handleTemplateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTemplateFile(e.target.files[0]);
    }
  };

  const handleCreateTemplateFromScratch = async () => {
    if (!newTemplateTitle.trim()) return;

    let fileUrl = '';
    let fileName = '';

    if (templateFile) {
      setIsTemplateUploading(true);
      try {
        const uploadRes = await chatApi.uploadAttachment(templateFile);
        fileUrl = uploadRes.file_url;
        fileName = uploadRes.file_name || templateFile.name;
      } catch (err) {
        console.error('Failed to upload template attachment:', err);
      } finally {
        setIsTemplateUploading(false);
      }
    }

    createTemplateMutation.mutate({
      title: newTemplateTitle,
      content: newTemplateContent || undefined,
      file_url: fileUrl || undefined,
      file_name: fileName || undefined,
    });
  };

  const handleSaveComposerAsTemplate = () => {
    if (!newTemplateTitle.trim() || !composerText.trim()) return;
    createTemplateMutation.mutate({
      title: newTemplateTitle,
      content: composerText,
    });
  };

  return (
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
            className="input-field text-[13px] w-full min-h-[80px] py-2 px-3 resize-y bg-bg text-text border border-border rounded-lg placeholder:text-muted focus:outline-none focus:border-muted"
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

              {composerText.trim() && (
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
          {(templatesData?.data ?? []).map((tpl: MessageTemplate) => (
            <div key={tpl.id} className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[13.5px] text-text">{tpl.title}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onSelectTemplate(tpl)}
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
  );
}
