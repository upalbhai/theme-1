"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── CONTEXT & TYPES ─────────────────────────────────────────────────────────

type TimelineSize = "sm" | "md" | "lg";

interface TimelineContextValue {
  size: TimelineSize;
}

const TimelineContext = React.createContext<TimelineContextValue>({
  size: "md",
});

export function useTimeline() {
  return React.useContext(TimelineContext);
}

const SIZE_MAP: Record<TimelineSize, { separatorWidth: string; nodeSize: string; iconSize: string }> = {
  sm: { separatorWidth: "w-6", nodeSize: "size-6", iconSize: "size-3" },
  md: { separatorWidth: "w-8", nodeSize: "size-8", iconSize: "size-3.5" },
  lg: { separatorWidth: "w-10", nodeSize: "size-10", iconSize: "size-4.5" },
};

// ─── TIMELINE ROOT ──────────────────────────────────────────────────────────

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: TimelineSize;
  children: React.ReactNode;
}

export function Timeline({
  size = "md",
  className,
  children,
  ...props
}: TimelineProps) {
  return (
    <TimelineContext.Provider value={{ size }}>
      <div
        data-slot="timeline"
        className={cn("relative flex flex-col w-full", className)}
        {...props}
      >
        {children}
      </div>
    </TimelineContext.Provider>
  );
}

// ─── TIMELINE ITEM ──────────────────────────────────────────────────────────

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional shorthand for passing the node icon or element directly */
  node?: React.ReactNode;
  /** Node custom styling (applied when using the node shorthand) */
  nodeClassName?: string;
  /** Connector custom styling (applied when using the node shorthand) */
  connectorClassName?: string;
  /** Whether to render a dashed connecting line */
  dashed?: boolean;
  children: React.ReactNode;
}

export function TimelineItem({
  node,
  nodeClassName,
  connectorClassName,
  dashed = false,
  className,
  children,
  ...props
}: TimelineItemProps) {
  // If the developer used the shorthand `node={<Icon />}`, automatically build Separator + Content
  if (node !== undefined) {
    return (
      <div
        data-slot="timeline-item"
        className={cn("group/timeline-item relative flex items-start gap-3.5 sm:gap-4", className)}
        {...props}
      >
        <TimelineSeparator>
          <TimelineNode className={nodeClassName}>
            {node}
          </TimelineNode>
          <TimelineConnector dashed={dashed} className={connectorClassName} />
        </TimelineSeparator>
        <TimelineContent>
          {children}
        </TimelineContent>
      </div>
    );
  }

  // Composable pattern: developer passes TimelineSeparator and TimelineContent explicitly
  return (
    <div
      data-slot="timeline-item"
      className={cn("group/timeline-item relative flex items-start gap-3.5 sm:gap-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── TIMELINE SEPARATOR & CONNECTOR ─────────────────────────────────────────

export interface TimelineSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TimelineSeparator({
  className,
  children,
  ...props
}: TimelineSeparatorProps) {
  const { size } = useTimeline();
  const widthClass = SIZE_MAP[size].separatorWidth;

  return (
    <div
      data-slot="timeline-separator"
      className={cn("flex flex-col items-center shrink-0 self-stretch", widthClass, className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TimelineConnectorProps extends React.HTMLAttributes<HTMLDivElement> {
  dashed?: boolean;
}

export function TimelineConnector({
  dashed = false,
  className,
  ...props
}: TimelineConnectorProps) {
  return (
    <div
      data-slot="timeline-connector"
      className={cn(
        "flex-1 my-1 transition-colors group-last/timeline-item:hidden",
        dashed
          ? "border-l border-dashed border-border/80 w-0"
          : "w-px bg-border/80",
        className
      )}
      {...props}
    />
  );
}

// ─── TIMELINE NODE ──────────────────────────────────────────────────────────

export interface TimelineNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "subtle" | "ghost";
  status?: "default" | "completed" | "active" | "pending";
  children?: React.ReactNode;
}

export function TimelineNode({
  variant = "default",
  status = "default",
  className,
  children,
  ...props
}: TimelineNodeProps) {
  const { size } = useTimeline();
  const nodeSizeClass = SIZE_MAP[size].nodeSize;

  const statusVariants: Record<string, string> = {
    default: "border-border/80 bg-card text-foreground",
    completed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    active: "border-primary/30 bg-primary/10 text-primary ring-2 ring-primary/20",
    pending: "border-border/80 bg-muted/40 text-muted-foreground",
  };

  return (
    <div
      data-slot="timeline-node"
      className={cn(
        "relative z-10 flex shrink-0 items-center justify-center rounded-full border shadow-2xs transition-colors",
        nodeSizeClass,
        statusVariants[status],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── TIMELINE CONTENT & TYPOGRAPHY ──────────────────────────────────────────

export interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TimelineContent({
  className,
  children,
  ...props
}: TimelineContentProps) {
  return (
    <div
      data-slot="timeline-content"
      className={cn("flex-1 min-w-0 pb-6 group-last/timeline-item:pb-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function TimelineHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="timeline-header"
      className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1.5", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function TimelineTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      data-slot="timeline-title"
      className={cn("text-sm font-semibold font-heading text-foreground tracking-tight", className)}
      {...props}
    >
      {children}
    </h4>
  );
}

export function TimelineDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="timeline-description"
      className={cn("text-xs leading-relaxed text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function TimelineTime({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="timeline-time"
      className={cn("text-xs font-mono text-muted-foreground shrink-0", className)}
      {...props}
    >
      {children}
    </span>
  );
}

