"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw, ChevronLeft, ChevronRight, ChevronDown, Filter as FilterIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

export interface ColumnDef<T> {
  header: React.ReactNode | string;
  id?: string;
  key?: string; // Legacy compatibility
  accessorKey?: keyof T;
  render?: (row: T) => React.ReactNode;
  className?: string; // Legacy compatibility
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];

  // Legacy compatibility props
  loading?: boolean;
  keyExtractor?: (row: T) => string;
  emptyMessage?: string;
  className?: string;
  error?: boolean;
  errorMessage?: string;

  // New features props
  isLoading?: boolean;
  totalItems?: number;
  page?: number;
  limit?: number;
  onPageChange?: (page: number) => void;
  searchQuery?: string;
  onSearchChange?: (search: string) => void;
  onLimitChange?: (limit: number) => void;
  onRefetch?: () => void;
  refetchIntervalSeconds?: number;
  placeholderText?: string;
  emptyStateText?: string;
  emptyStateIcon?: string | React.ReactNode;
  hidePagination?: boolean;
  onRowClick?: (row: T) => void;
  filters?: React.ReactNode;
  headerActions?: React.ReactNode;
  renderSubComponent?: (row: T) => React.ReactNode;
  expandable?: boolean;
  title?: string;
  description?: string;
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
}

export function DataTable<T>({
  columns,
  data = [],
  loading,
  keyExtractor,
  emptyMessage = "No records found.",
  className,
  error,
  errorMessage,

  isLoading: newIsLoading,
  totalItems = data.length,
  page = 1,
  limit = 10,
  onPageChange,
  onLimitChange,
  searchQuery = "",
  onSearchChange,
  onRefetch,
  refetchIntervalSeconds = 15,
  placeholderText = "Search...",
  emptyStateText,
  emptyStateIcon = "📋", // Default legacy icon
  hidePagination: newHidePagination,
  onRowClick,
  filters,
  headerActions,
  renderSubComponent,
  expandable = false,
  title,
  description,
  hasActiveFilters = false,
  onClearFilters,
}: DataTableProps<T>) {
  // Normalize legacy props
  const finalIsLoading = newIsLoading ?? loading;
  const finalEmptyText = emptyStateText ?? emptyMessage;
  const finalHidePagination = newHidePagination ?? (!onPageChange);

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [countdown, setCountdown] = useState(0);
  const [expandedRows, setExpandedRows] = useState<Set<string | number>>(new Set());
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalSearch(val);
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      onSearchChange?.(val);
      onPageChange?.(1);
    }, 400);
  };

  const handleManualRefetch = () => {
    onRefetch?.();
    setCountdown(refetchIntervalSeconds);
  };

  const toggleRow = (e: React.MouseEvent, key: string | number) => {
    e.stopPropagation();
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  // Legacy error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-danger/40 bg-danger/5 py-16 text-center">
        <p className="text-4xl">⚠️</p>
        <p className="mt-3 font-medium text-danger">{errorMessage || "Failed to load data."}</p>
      </div>
    );
  }

  return (
    <div className={cn("w-full bg-card border border-border rounded-xl overflow-hidden shadow-sm", className)}>
      {/* Top Header Bar */}
      {(title || description || onSearchChange || onRefetch || filters || headerActions) && (
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 p-4 md:p-5 border-b border-border bg-muted/20">
          {(title || description) && (!onSearchChange && !filters) ? (
            <div className="flex items-center justify-between gap-4 w-full">
              <div className="min-w-0">
                {title && <h3 className="text-sm font-semibold tracking-tight text-foreground">{title}</h3>}
                {description && <p className="text-[11px] text-muted-foreground mt-0.5">{description}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {headerActions}
                {onRefetch && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleManualRefetch}
                    disabled={finalIsLoading || countdown > 0}
                    className="h-9 px-2 md:px-3 gap-2 font-semibold text-muted-foreground border-border active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    title={countdown > 0 ? `Refetch (${countdown}s)` : "Refetch list"}
                  >
                    <RefreshCw className={`w-4 h-4 md:w-3.5 md:h-3.5 ${finalIsLoading ? "animate-spin" : ""}`} />
                    <span className="hidden md:inline">{countdown > 0 ? `Refetch (${countdown}s)` : "Refetch"}</span>
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-2 md:gap-4 flex-1">
              {/* Main Search Input */}
              {onSearchChange && (
                <div className="relative flex-1 min-w-[120px] sm:min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    className="pl-9 h-9 text-sm bg-background border-border focus-visible:ring-offset-0 w-full"
                    placeholder={placeholderText}
                    value={localSearch}
                    onChange={handleSearchChange}
                  />
                </div>
              )}

              {/* Dynamic Extra Filters (Desktop Inline) */}
              {filters && (
                <div className="hidden lg:flex flex-wrap items-center gap-2">
                  {filters}
                  {onClearFilters && hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClearFilters}
                      className="h-9 px-3 text-xs text-muted-foreground hover:text-foreground cursor-pointer font-medium"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}

              {/* Action Buttons (Right Aligned) */}
              <div className="flex items-center gap-2 justify-end shrink-0 ml-auto">
                {headerActions}
                
                {/* Mobile Filter Trigger */}
                {filters && (
                  <div className="lg:hidden animate-in fade-in zoom-in-95 duration-150">
                    <Sheet>
                      <SheetTrigger render={
                        <Button variant="outline" size="icon" className="h-9 w-9 border-border relative">
                          <FilterIcon className="w-4 h-4 text-muted-foreground" />
                          {hasActiveFilters && (
                            <span className="absolute top-1 right-1 flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                            </span>
                          )}
                        </Button>
                      } />
                      <SheetContent side="bottom" className="p-0 rounded-t-xl">
                        <SheetHeader className="px-4 py-3 border-b border-border bg-muted">
                          <div className="flex items-center justify-between">
                            <SheetTitle className="text-base font-bold">Filters</SheetTitle>
                          </div>
                        </SheetHeader>
                        <div className="p-4 flex flex-col gap-4 min-h-[50vh] max-h-[70vh] overflow-y-auto">
                          {filters}
                        </div>
                        <SheetFooter className="p-4 border-t border-border mt-auto flex flex-row items-center gap-2">
                          {onClearFilters && hasActiveFilters && (
                            <Button
                              variant="outline"
                              onClick={onClearFilters}
                              className="flex-1 font-bold border-border text-muted-foreground hover:text-foreground"
                            >
                              Clear
                            </Button>
                          )}
                          <SheetClose render={
                            <Button className="flex-1 font-bold">
                              Apply
                            </Button>
                          } />
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </div>
                )}

                {/* Refetch Trigger */}
                {onRefetch && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleManualRefetch}
                    disabled={finalIsLoading || countdown > 0}
                    className="h-9 px-2 md:px-3 gap-2 font-semibold text-muted-foreground border-border active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    title={countdown > 0 ? `Refetch (${countdown}s)` : "Refetch list"}
                  >
                    <RefreshCw className={`w-4 h-4 md:w-3.5 md:h-3.5 ${finalIsLoading ? "animate-spin" : ""}`} />
                    <span className="hidden md:inline">{countdown > 0 ? `Refetch (${countdown}s)` : "Refetch"}</span>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Table Content */}
      <div className="overflow-auto max-h-[calc(100vh-250px)] w-full relative">
        <Table>
          <TableHeader className="bg-muted/50 sticky top-0 z-10 shadow-sm">
            <TableRow className="border-border hover:bg-transparent">
              {expandable && <TableHead className="w-10 px-2" />}
              {(Array.isArray(columns) ? columns : []).map((col, idx) => {
                const cellKey = col.key || col.id || col.accessorKey?.toString() || idx.toString();
                return (
                  <TableHead key={cellKey} className={cn("font-semibold text-foreground", col.className)}>
                    {col.header}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {finalIsLoading ? (
              <>
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                  <TableRow key={`skeleton-row-${rowIndex}`} className="border-border">
                    {expandable && (
                      <TableCell className="py-4">
                        <Skeleton className="h-5 w-5 rounded-md" />
                      </TableCell>
                    )}
                    {(Array.isArray(columns) ? columns : []).map((col, colIndex) => (
                      <TableCell key={`skeleton-col-${col?.id || colIndex}`} className={cn("py-4", col.className)}>
                        <Skeleton className="h-5 w-full max-w-[80%] rounded-md" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : (Array.isArray(data) ? data : []).length === 0 ? (
              <TableRow className="border-border">
                <TableCell colSpan={expandable ? columns.length + 1 : columns.length} className="text-center py-16 text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-3">
                    {typeof emptyStateIcon === "string" ? (
                      <span className="text-4xl">{emptyStateIcon}</span>
                    ) : (
                      emptyStateIcon
                    )}
                    <span className="text-sm font-medium">{finalEmptyText}</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              (Array.isArray(data) ? data : []).map((row, rowIdx) => {
                const rowKey = keyExtractor ? keyExtractor(row) : rowIdx;
                const isExpanded = expandedRows.has(rowKey);
                return (
                  <React.Fragment key={rowKey}>
                    <TableRow
                      className={cn(
                        "border-border hover:bg-muted/40 transition-colors group",
                        onRowClick && "cursor-pointer"
                      )}
                      onClick={() => onRowClick?.(row)}
                    >
                      {expandable && (
                        <TableCell className="w-10 px-2 py-3.5 text-center">
                          {renderSubComponent && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className={cn("h-6 w-6 text-muted-foreground hover:text-foreground transition-transform", isExpanded && "rotate-180")}
                              onClick={(e) => toggleRow(e, rowKey)}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      )}
                      {(Array.isArray(columns) ? columns : []).map((col, colIdx) => {
                        const cellKey = col.key || col.id || col.accessorKey?.toString() || colIdx.toString();
                        return (
                          <TableCell key={cellKey} className={cn("text-muted-foreground py-3.5", col.className)}>
                            {col.render
                              ? col.render(row)
                              : col.accessorKey
                                ? String((row as Record<string, unknown>)[col.accessorKey as string] ?? "")
                                : col.key
                                  ? String((row as Record<string, unknown>)[col.key] ?? "")
                                  : null}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    {renderSubComponent && isExpanded && (
                      <TableRow className="border-none bg-muted/20 hover:bg-muted/20">
                        <TableCell colSpan={expandable ? columns.length + 1 : columns.length} className="p-0 border-b border-border">
                          {renderSubComponent(row)}
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      {!finalHidePagination && (
        <div className="flex flex-col md:flex-row items-center justify-between p-4 border-t border-border bg-muted/20 gap-4 text-xs">
          <div className="text-muted-foreground flex flex-wrap items-center gap-4">
            <div>
              Showing <span className="font-semibold text-foreground">{(Array.isArray(data) ? data : []).length}</span> of{" "}
              <span className="font-semibold text-foreground">{totalItems}</span> entries
            </div>
            {onLimitChange && (
              <div className="flex items-center gap-1.5">
                <span>Page size:</span>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={limit}
                  onChange={(e) => {
                    const val = Math.min(100, Math.max(1, parseInt(e.target.value) || 1));
                    onLimitChange(val);
                    onPageChange?.(1);
                  }}
                  className="w-14 px-2 py-1 text-center rounded-md border border-border bg-background text-foreground outline-none focus:border-ring transition"
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span>Go to page:</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={page}
                onChange={(e) => {
                  const val = Math.min(totalPages, Math.max(1, parseInt(e.target.value) || 1));
                  onPageChange?.(val);
                }}
                className="w-14 px-2 py-1 text-center rounded-md border border-border bg-background text-foreground outline-none focus:border-ring transition"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange?.(page - 1)}
                disabled={page <= 1 || finalIsLoading}
                className="border-border hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="px-3 py-1 font-medium text-muted-foreground select-none">
                Page <span className="text-foreground">{page}</span> of <span className="text-foreground">{totalPages}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange?.(page + 1)}
                disabled={page >= totalPages || finalIsLoading}
                className="border-border hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
