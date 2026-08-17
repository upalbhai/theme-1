'use client';

import React from 'react';

interface SummaryPanelProps {
  summaryTimeframe: 'today' | 'yesterday' | 'week';
  setSummaryTimeframe: (tf: 'today' | 'yesterday' | 'week') => void;
  summaryTimeframeGenerated: Record<string, boolean>;
  setSummaryTimeframeGenerated: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  refetchSummary: () => void;
  isSummaryLoading: boolean;
  features: {
    summaryHasTimeframe?: boolean;
  };
  summaryData: {
    timeframe: string;
    summary: string;
  } | null | undefined;
}

export function SummaryPanel({
  summaryTimeframe,
  setSummaryTimeframe,
  summaryTimeframeGenerated,
  setSummaryTimeframeGenerated,
  refetchSummary,
  isSummaryLoading,
  features,
  summaryData,
}: SummaryPanelProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-[13px] font-medium text-text">Timeframe:</span>
        {(['today', 'yesterday', 'week'] as const).map((tf) => (
          <button
            key={tf}
            onClick={() => setSummaryTimeframe(tf)}
            className={`px-3 py-1 rounded-lg text-[12px] capitalize transition cursor-pointer ${
              summaryTimeframe === tf ? 'bg-primary text-bg font-semibold' : 'bg-bg-hover text-text-secondary hover:text-text'
            }`}
          >
            {tf}
          </button>
        ))}
        {summaryTimeframeGenerated[summaryTimeframe] && (
          <button
            onClick={() => refetchSummary()}
            className="ml-auto text-[12px] text-primary hover:underline cursor-pointer"
          >
            Refresh
          </button>
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
              setSummaryTimeframeGenerated((prev) => ({ ...prev, [summaryTimeframe]: true }));
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
  );
}
