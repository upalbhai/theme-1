"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface KanbanItem {
  id: string;
  [key: string]: any;
}

export interface KanbanColumn<T extends KanbanItem = KanbanItem> {
  id: string;
  title: string;
  items: T[];
  color?: string;
  [key: string]: any;
}

export interface ItemMoveEvent<T extends KanbanItem = KanbanItem> {
  itemId: string;
  sourceColumnId: string;
  targetColumnId: string;
  targetIndex: number;
  item: T;
}

export interface KanbanBoardProps<T extends KanbanItem = KanbanItem> {
  columns: KanbanColumn<T>[];
  onColumnsChange?: (columns: KanbanColumn<T>[]) => void;
  onItemMove?: (event: ItemMoveEvent<T>) => void;
  renderItem: (item: T, column: KanbanColumn<T>, index: number) => React.ReactNode;
  renderColumnHeader?: (column: KanbanColumn<T>, count: number) => React.ReactNode;
  renderColumnFooter?: (column: KanbanColumn<T>) => React.ReactNode;
  className?: string;
  columnClassName?: string;
  itemWrapperClassName?: string;
}

interface DragState {
  itemId: string;
  sourceColumnId: string;
}

export function KanbanBoard<T extends KanbanItem = KanbanItem>({
  columns,
  onColumnsChange,
  onItemMove,
  renderItem,
  renderColumnHeader,
  renderColumnFooter,
  className,
  columnClassName,
  itemWrapperClassName,
}: KanbanBoardProps<T>) {
  const [activeDrag, setActiveDrag] = React.useState<DragState | null>(null);
  const [dragOverColumnId, setDragOverColumnId] = React.useState<string | null>(null);
  const [dragOverTargetIndex, setDragOverTargetIndex] = React.useState<number | null>(null);

  // Drag Start
  const handleDragStart = (
    e: React.DragEvent,
    item: T,
    sourceColumnId: string
  ) => {
    setActiveDrag({ itemId: item.id, sourceColumnId });
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ itemId: item.id, sourceColumnId })
    );
    e.dataTransfer.effectAllowed = "move";

    // Ghost card styling on drag start
    const target = e.currentTarget as HTMLElement;
    target.classList.add("opacity-40");
  };

  // Drag End
  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.classList.remove("opacity-40");
    setActiveDrag(null);
    setDragOverColumnId(null);
    setDragOverTargetIndex(null);
  };

  // Drag Over Column
  const handleColumnDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverColumnId !== columnId) {
      setDragOverColumnId(columnId);
    }
  };

  // Drag Leave Column
  const handleColumnDragLeave = (e: React.DragEvent, columnId: string) => {
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    const currentTarget = e.currentTarget as HTMLElement;

    if (!currentTarget.contains(relatedTarget)) {
      if (dragOverColumnId === columnId) {
        setDragOverColumnId(null);
        setDragOverTargetIndex(null);
      }
    }
  };

  // Execute Move Operation
  const executeMove = (
    itemId: string,
    sourceColumnId: string,
    targetColumnId: string,
    targetIndex: number
  ) => {
    const sourceCol = columns.find((c) => c.id === sourceColumnId);
    const targetCol = columns.find((c) => c.id === targetColumnId);

    if (!sourceCol || !targetCol) return;

    const itemToMove = sourceCol.items.find((item) => item.id === itemId);
    if (!itemToMove) return;

    // Check if moving to the exact same position
    if (sourceColumnId === targetColumnId) {
      const currentIndex = sourceCol.items.findIndex((item) => item.id === itemId);
      if (currentIndex === targetIndex) return;
    }

    // Construct new columns immutably
    const newColumns = columns.map((col) => {
      if (col.id === sourceColumnId && col.id === targetColumnId) {
        // Reordering within the same column
        const itemsWithout = col.items.filter((item) => item.id !== itemId);
        const boundedIndex = Math.max(0, Math.min(targetIndex, itemsWithout.length));
        const updatedItems = [...itemsWithout];
        updatedItems.splice(boundedIndex, 0, itemToMove);
        return { ...col, items: updatedItems };
      }

      if (col.id === sourceColumnId) {
        // Remove from source column
        return {
          ...col,
          items: col.items.filter((item) => item.id !== itemId),
        };
      }

      if (col.id === targetColumnId) {
        // Insert into target column
        const boundedIndex = Math.max(0, Math.min(targetIndex, col.items.length));
        const updatedItems = [...col.items];
        updatedItems.splice(boundedIndex, 0, itemToMove);
        return { ...col, items: updatedItems };
      }

      return col;
    });

    onColumnsChange?.(newColumns);
    onItemMove?.({
      itemId,
      sourceColumnId,
      targetColumnId,
      targetIndex,
      item: itemToMove,
    });
  };

  // Drop on Column (empty space or bottom)
  const handleColumnDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    e.stopPropagation();

    let dragData = activeDrag;
    if (!dragData) {
      try {
        const raw = e.dataTransfer.getData("application/json");
        if (raw) dragData = JSON.parse(raw);
      } catch {
        // Fallback
      }
    }

    if (!dragData) return;

    const targetCol = columns.find((c) => c.id === targetColumnId);
    const targetIndex =
      dragOverTargetIndex !== null && dragOverTargetIndex !== undefined
        ? dragOverTargetIndex
        : targetCol?.items.length || 0;

    executeMove(dragData.itemId, dragData.sourceColumnId, targetColumnId, targetIndex);

    setActiveDrag(null);
    setDragOverColumnId(null);
    setDragOverTargetIndex(null);
  };

  // Drag Over specific Card to calculate insertion index
  const handleCardDragOver = (
    e: React.DragEvent,
    targetColumnId: string,
    index: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    const isBelow = e.clientY > midY;
    const calculatedIndex = isBelow ? index + 1 : index;

    setDragOverColumnId(targetColumnId);
    setDragOverTargetIndex(calculatedIndex);
  };

  return (
    <div
      className={cn(
        "flex overflow-x-auto pb-4 gap-4 items-start select-none scrollbar-hide",
        className
      )}
    >
      {columns.map((column) => {
        const isColumnActiveTarget =
          dragOverColumnId === column.id && activeDrag !== null;

        return (
          <div
            key={column.id}
            onDragOver={(e) => handleColumnDragOver(e, column.id)}
            onDragLeave={(e) => handleColumnDragLeave(e, column.id)}
            onDrop={(e) => handleColumnDrop(e, column.id)}
            className={cn(
              "w-72 sm:w-80 shrink-0 rounded-xl border border-border/80 bg-muted/40 p-3 transition-colors flex flex-col min-h-[380px]",
              isColumnActiveTarget && "border-primary/60 bg-muted/70 ring-1 ring-primary/40",
              columnClassName
            )}
          >
            {/* Header */}
            {renderColumnHeader ? (
              renderColumnHeader(column, column.items.length)
            ) : (
              <div className="flex items-center justify-between pb-3 px-1 border-b border-border/60 mb-3">
                <div className="flex items-center gap-2">
                  {column.color && (
                    <span
                      className={cn("size-2 rounded-full", column.color)}
                      aria-hidden="true"
                    />
                  )}
                  <h3 className="font-semibold text-xs tracking-tight text-foreground">
                    {column.title}
                  </h3>
                  <span className="text-[11px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    {column.items.length}
                  </span>
                </div>
              </div>
            )}

            {/* Cards List */}
            <div className="flex-1 space-y-2.5 min-h-[120px]">
              {column.items.map((item, index) => {
                const isCurrentlyDragged = activeDrag?.itemId === item.id;
                const showTopIndicator =
                  isColumnActiveTarget &&
                  dragOverTargetIndex === index &&
                  !isCurrentlyDragged;

                return (
                  <React.Fragment key={item.id}>
                    {/* Visual drop slot placeholder */}
                    {showTopIndicator && (
                      <div className="h-1 bg-primary rounded-full transition-all duration-150 shadow-[0_0_8px_var(--primary)]" />
                    )}

                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, item, column.id)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => handleCardDragOver(e, column.id, index)}
                      className={cn(
                        "transition-all duration-150 cursor-grab active:cursor-grabbing",
                        isCurrentlyDragged && "opacity-40 grayscale-[30%]",
                        itemWrapperClassName
                      )}
                    >
                      {renderItem(item, column, index)}
                    </div>
                  </React.Fragment>
                );
              })}

              {/* Indicator at the very bottom of the column */}
              {isColumnActiveTarget &&
                (dragOverTargetIndex === column.items.length ||
                  column.items.length === 0) && (
                  <div className="h-1 bg-primary rounded-full transition-all duration-150 shadow-[0_0_8px_var(--primary)]" />
                )}

              {/* Empty Column Drop Area */}
              {column.items.length === 0 && (
                <div className="h-28 border border-dashed border-border/70 rounded-lg flex items-center justify-center p-3 text-center text-xs text-muted-foreground/60">
                  Drop card here
                </div>
              )}
            </div>

            {/* Footer */}
            {renderColumnFooter && (
              <div className="pt-2">{renderColumnFooter(column)}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

