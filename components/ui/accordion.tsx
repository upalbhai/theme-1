"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import {
  Accordion as MotionAccordion,
  AccordionItem as MotionAccordionItem,
  AccordionTrigger as MotionAccordionTrigger,
  AccordionContent as MotionAccordionContent,
} from "@/components/core/accordion";

export type AccordionProps = React.ComponentProps<typeof MotionAccordion> & {
  defaultValue?: React.Key | null;
};

export function Accordion({
  className,
  defaultValue,
  expandedValue,
  ...props
}: AccordionProps) {
  return (
    <MotionAccordion
      expandedValue={expandedValue ?? defaultValue}
      className={cn("flex w-full flex-col divide-y divide-border", className)}
      {...props}
    />
  );
}

export function AccordionItem({
  className,
  value,
  children,
  ...props
}: React.ComponentProps<typeof MotionAccordionItem>) {
  return (
    <MotionAccordionItem
      value={value}
      className={cn("overflow-hidden py-1", className)}
      {...props}
    >
      {children}
    </MotionAccordionItem>
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MotionAccordionTrigger>) {
  return (
    <MotionAccordionTrigger
      className={cn(
        "group flex w-full items-center justify-between py-3 text-left text-sm font-medium transition-colors hover:text-primary",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[expanded]:rotate-180" />
    </MotionAccordionTrigger>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MotionAccordionContent>) {
  return (
    <MotionAccordionContent
      className={cn("text-sm text-muted-foreground pb-3 pt-1", className)}
      {...props}
    >
      {children}
    </MotionAccordionContent>
  );
}
