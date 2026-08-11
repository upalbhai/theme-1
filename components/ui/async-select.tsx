'use client';

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Check, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Option = { _id?: string; id?: string | number; name?: string; label?: string; [k: string]: any };

type LoadOptionsResult = { data: Option[]; meta?: { pagination?: { page: number; page_size: number; total: number; totalPages: number } } };

type Props = {
  value?: Option | Option[] | null;
  onChange?: (val: Option | Option[] | null) => void;
  loadOptions: (params: { page: number; page_size: number; search?: string }) => Promise<LoadOptionsResult>;
  multi?: boolean;
  searchable?: boolean;
  pageSize?: number;
  placeholder?: string;
  creatable?: boolean;
  className?: string;
  idKey?: string;
  labelKey?: string;
  queryKey?: string;
  disabled?: boolean;
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function AsyncSelect({
  value,
  onChange,
  loadOptions,
  multi = false,
  searchable = true,
  pageSize = 50,
  placeholder = "Select...",
  creatable = false,
  className = "",
  idKey = "_id",
  labelKey = "name",
  queryKey = "async-select",
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const debouncedSearch = useDebounce(q, 500);
  const [localItems, setLocalItems] = useState<Option[]>([]);
  
  const listEndRef = useRef<HTMLDivElement | null>(null);
  const instanceId = React.useId();

  useEffect(() => {
    if (!open) {
      setQ("");
    }
  }, [open]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading
  } = useInfiniteQuery({
    queryKey: [queryKey, instanceId, debouncedSearch],
    queryFn: async ({ pageParam = 1 }) => {
      return loadOptions({ page: pageParam as number, page_size: pageSize, search: debouncedSearch });
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const totalPages = lastPage.meta?.pagination?.totalPages ?? 
                         (lastPage.data.length < pageSize ? currentPage : currentPage + 1);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: open && !disabled,
  });

  const items = React.useMemo(() => {
    let baseItems: Option[] = [];
    if (data) {
      baseItems = data.pages.flatMap((page) => 
        page.data.map((d: any) => ({ ...d, id: d[idKey] ?? d.id, label: d[labelKey] ?? d.name ?? d.label }))
      );
    }
    return [...localItems, ...baseItems];
  }, [data, idKey, labelKey, localItems]);

  useEffect(() => {
    const el = listEndRef.current;
    if (!el || !open || disabled) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasNextPage, isFetching, fetchNextPage, open, disabled]);

  const isSelected = (opt: Option) => {
    if (multi) {
      return Array.isArray(value) && (value as Option[]).some((v) => (v.id ?? v._id) === (opt.id ?? opt._id));
    }
    return (value && ((value as any).id ?? (value as any)._id) === (opt.id ?? opt._id)) ?? false;
  };

  function handleSelect(opt: Option) {
    if (disabled) return;
    if (multi) {
      const arr = Array.isArray(value) ? [...(value as Option[])] : [];
      const exists = arr.findIndex((a) => (a.id ?? a._id) === (opt.id ?? opt._id));
      if (exists >= 0) {
        arr.splice(exists, 1);
      } else {
        arr.push(opt);
      }
      onChange?.(arr);
    } else {
      onChange?.(opt);
      setOpen(false);
    }
  }

  // Helper type guard
  const isOptionArray = (val: any): val is Option[] => Array.isArray(val);

  function handleRemoveItem(e: React.MouseEvent, opt: Option) {
    e.stopPropagation();
    if (disabled) return;
    if (multi && isOptionArray(value)) {
      const arr = value.filter((v) => (v.id ?? v._id) !== (opt.id ?? opt._id));
      onChange?.(arr);
    }
  }

  async function handleCreateLabel(label: string) {
    if (!creatable || disabled) return;
    const newOpt: Option = { id: `new_${Date.now()}`, label, name: label };
    setLocalItems((s) => [newOpt, ...s]);
    if (multi) {
      const arr = Array.isArray(value) ? [...(value as Option[])] : [];
      arr.push(newOpt);
      onChange?.(arr);
    } else {
      onChange?.(newOpt);
      setOpen(false);
    }
  }

  return (
    <div className={cn("relative w-full", className)}>
      <Popover open={open && !disabled} onOpenChange={setOpen} modal={false}>
        <PopoverTrigger render={
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full h-auto min-h-9 px-3 py-2 flex items-center justify-between gap-2 bg-transparent text-foreground border-border hover:bg-accent text-left font-normal focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-slate-50 dark:disabled:bg-slate-900/50 disabled:opacity-75",
              !value && "text-slate-400 dark:text-slate-500"
            )}
            onClick={() => setOpen(!open)}
            disabled={disabled}
          >
            <div className="flex-1 min-w-0">
              {multi ? (
                <div className="flex flex-wrap gap-1">
                  {isOptionArray(value) && value.length ? (
                    value.map((v) => (
                      <span
                        key={v.id ?? v._id}
                        className="inline-flex items-center gap-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 pl-2 pr-1.5 py-0.5 rounded-md border border-slate-200 dark:border-slate-700"
                      >
                        {v[labelKey] ?? v.label}
                        <span
                          role="button"
                          className="cursor-pointer p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
                          onClick={(e) => handleRemoveItem(e, v)}
                        >
                          <X className="size-2.5" />
                        </span>
                      </span>
                    ))
                  ) : (
                    <span>{placeholder}</span>
                  )}
                </div>
              ) : (
                <span 
                  className="truncate block w-full"
                  title={String((value && ((value as any)[labelKey] ?? (value as any).label)) ?? placeholder)}
                >
                  {(value && ((value as any)[labelKey] ?? (value as any).label)) ?? placeholder}
                </span>
              )}
            </div>
            <ChevronDown className="size-4 opacity-50 shrink-0" />
          </Button>
        } />
 
        <PopoverContent className="w-[380px] sm:w-[480px] max-w-[90vw] p-1 bg-card border border-border shadow-md">
          {searchable && (
            <div className="p-2 border-b border-slate-100 dark:border-slate-800/80">
              <Input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search..."
                className="h-8 text-sm border-border bg-background focus-visible:ring-0"
              />
            </div>
          )}
 
          <div 
            className="max-h-[240px] overflow-y-auto overflow-x-hidden p-1"
            onWheel={(e) => e.stopPropagation()}
          >
            {items.map((opt) => (
              <div
                key={opt.id ?? opt._id}
                onClick={() => handleSelect(opt)}
                className={cn(
                  "relative flex w-full cursor-default select-none items-center rounded-md py-2 px-2.5 text-sm text-foreground outline-none hover:bg-accent transition-colors",
                  isSelected(opt) && "bg-accent text-primary font-medium"
                )}
              >
                <span 
                  className="pr-6 block w-full text-left" 
                  title={String(opt[labelKey] ?? opt.label)}
                >
                  {opt[labelKey] ?? opt.label}
                </span>
                {isSelected(opt) && (
                  <span className="absolute right-2.5 flex size-4 items-center justify-center">
                    <Check className="size-4 text-primary" />
                  </span>
                )}
              </div>
            ))}

            {creatable && q && !items.some(i => (i[labelKey] ?? i.label).toLowerCase() === q.toLowerCase()) && (
              <div
                onClick={() => handleCreateLabel(q)}
                className="relative flex w-full cursor-pointer select-none items-center rounded-md py-2 px-2.5 text-sm text-primary font-medium mt-1 border-t border-border hover:bg-accent"
              >
                Create "{q}"
              </div>
            )}

            <div ref={listEndRef} className="h-1" />
            
            {isLoading && items.length === 0 && (
              <div className="flex items-center justify-center gap-2 p-4 text-xs text-slate-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Loading options...</span>
              </div>
            )}

            {!isLoading && items.length === 0 && (
              <div className="p-4 text-center text-xs text-slate-400">
                No results found.
              </div>
            )}

            {isFetching && items.length > 0 && (
              <div className="flex items-center justify-center gap-1.5 py-2 text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800/80">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Loading more...</span>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
