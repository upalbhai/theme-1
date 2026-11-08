'use client';

import {
  motion,
  AnimatePresence,
  Transition,
  Variants,
  Variant,
  MotionConfig,
} from 'motion/react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';

export type AccordionContextType = {
  expandedValue: React.Key | React.Key[] | null;
  toggleItem: (value: React.Key) => void;
  isExpanded: (value: React.Key) => boolean;
  variants?: { expanded: Variant; collapsed: Variant };
};

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

export function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordion must be used within an AccordionProvider');
  }
  return context;
}

export type AccordionItemContextType = {
  value: React.Key;
  isExpanded: boolean;
};

const AccordionItemContext = createContext<AccordionItemContextType | undefined>(
  undefined
);

export function useAccordionItem() {
  return useContext(AccordionItemContext);
}

export type AccordionProviderProps = {
  children: ReactNode;
  variants?: { expanded: Variant; collapsed: Variant };
  expandedValue?: React.Key | React.Key[] | null;
  defaultValue?: React.Key | React.Key[] | null;
  onValueChange?: (value: any) => void;
  type?: 'single' | 'multiple';
  collapsible?: boolean;
};

export function AccordionProvider({
  children,
  variants,
  expandedValue: externalExpandedValue,
  defaultValue,
  onValueChange,
  type = 'single',
  collapsible = true,
}: AccordionProviderProps) {
  const isMultiple =
    type === 'multiple' ||
    Array.isArray(defaultValue) ||
    Array.isArray(externalExpandedValue);

  const [internalExpandedValue, setInternalExpandedValue] = useState<
    React.Key | React.Key[] | null
  >(() => {
    if (defaultValue !== undefined) return defaultValue;
    return isMultiple ? [] : null;
  });

  const isControlled = externalExpandedValue !== undefined;
  const currentExpanded = isControlled
    ? externalExpandedValue
    : internalExpandedValue;

  const isExpanded = useCallback(
    (val: React.Key) => {
      if (Array.isArray(currentExpanded)) {
        return currentExpanded.includes(val);
      }
      return currentExpanded === val;
    },
    [currentExpanded]
  );

  const toggleItem = useCallback(
    (val: React.Key) => {
      let nextValue: React.Key | React.Key[] | null;

      if (isMultiple) {
        const currentList: React.Key[] = Array.isArray(currentExpanded)
          ? currentExpanded
          : currentExpanded != null
            ? [currentExpanded]
            : [];
        if (currentList.includes(val)) {
          nextValue = currentList.filter((item) => item !== val);
        } else {
          nextValue = [...currentList, val];
        }
      } else {
        if (currentExpanded === val) {
          if (collapsible) {
            nextValue = null;
          } else {
            return;
          }
        } else {
          nextValue = val;
        }
      }

      if (!isControlled) {
        setInternalExpandedValue(nextValue);
      }
      onValueChange?.(nextValue);
    },
    [currentExpanded, isMultiple, collapsible, isControlled, onValueChange]
  );

  return (
    <AccordionContext.Provider
      value={{
        expandedValue: currentExpanded,
        toggleItem,
        isExpanded,
        variants,
      }}
    >
      {children}
    </AccordionContext.Provider>
  );
}

export type AccordionProps = {
  children: ReactNode;
  className?: string;
  transition?: Transition;
  variants?: { expanded: Variant; collapsed: Variant };
  expandedValue?: React.Key | React.Key[] | null;
  defaultValue?: React.Key | React.Key[] | null;
  onValueChange?: (value: any) => void;
  type?: 'single' | 'multiple';
  collapsible?: boolean;
};

export function Accordion({
  children,
  className,
  transition,
  variants,
  expandedValue,
  defaultValue,
  onValueChange,
  type = 'single',
  collapsible = true,
}: AccordionProps) {
  return (
    <MotionConfig transition={transition}>
      <div
        className={cn(
          'flex w-full flex-col divide-y divide-border relative',
          className
        )}
        aria-orientation='vertical'
      >
        <AccordionProvider
          variants={variants}
          expandedValue={expandedValue}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          type={type}
          collapsible={collapsible}
        >
          {children}
        </AccordionProvider>
      </div>
    </MotionConfig>
  );
}

export type AccordionItemProps = {
  value: React.Key;
  children: ReactNode;
  className?: string;
};

export function AccordionItem({
  value,
  children,
  className,
}: AccordionItemProps) {
  const { isExpanded } = useAccordion();
  const expanded = isExpanded(value);

  return (
    <AccordionItemContext.Provider value={{ value, isExpanded: expanded }}>
      <div
        className={cn('overflow-hidden py-1', className)}
        data-expanded={expanded ? '' : undefined}
        data-closed={!expanded ? '' : undefined}
        data-state={expanded ? 'open' : 'closed'}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...(child.props as Record<string, unknown>),
              value: (child.props as { value?: React.Key }).value ?? value,
              expanded,
            } as any);
          }
          return child;
        })}
      </div>
    </AccordionItemContext.Provider>
  );
}

export type AccordionTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
  value?: React.Key;
  hideChevron?: boolean;
};

export function AccordionTrigger({
  children,
  className,
  onClick,
  hideChevron = false,
  ...props
}: AccordionTriggerProps) {
  const { toggleItem, isExpanded } = useAccordion();
  const itemContext = useAccordionItem();
  const value = (props as { value?: React.Key }).value ?? itemContext?.value;
  const expanded = itemContext
    ? itemContext.isExpanded
    : value !== undefined && isExpanded(value);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented && value !== undefined) {
      toggleItem(value);
    }
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      aria-expanded={expanded}
      type='button'
      className={cn(
        'group flex w-full items-center justify-between py-3 text-left text-sm font-medium transition-colors hover:text-primary cursor-pointer',
        className
      )}
      data-expanded={expanded ? '' : undefined}
      data-closed={!expanded ? '' : undefined}
      data-state={expanded ? 'open' : 'closed'}
    >
      <span>{children}</span>
      {!hideChevron && (
        <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[expanded]:rotate-180 group-data-[state=open]:rotate-180" />
      )}
    </button>
  );
}

export type AccordionContentProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
  value?: React.Key;
};

export function AccordionContent({
  children,
  className,
  ...props
}: AccordionContentProps) {
  const { isExpanded, variants } = useAccordion();
  const itemContext = useAccordionItem();
  const value = (props as { value?: React.Key }).value ?? itemContext?.value;
  const expanded = itemContext
    ? itemContext.isExpanded
    : value !== undefined && isExpanded(value);

  const BASE_VARIANTS: Variants = {
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: { duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] },
        opacity: { duration: 0.2, ease: 'easeOut' },
      },
    },
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.24, ease: [0.04, 0.62, 0.23, 0.98] },
        opacity: { duration: 0.15, ease: 'easeIn' },
      },
    },
  };

  const combinedVariants = {
    expanded: { ...BASE_VARIANTS.expanded, ...variants?.expanded },
    collapsed: { ...BASE_VARIANTS.collapsed, ...variants?.collapsed },
  };

  return (
    <AnimatePresence initial={false}>
      {expanded && (
        <motion.div
          key='accordion-content'
          initial='collapsed'
          animate='expanded'
          exit='collapsed'
          variants={combinedVariants}
          className='overflow-hidden'
          data-state='open'
        >
          <div
            {...props}
            className={cn('text-sm text-muted-foreground pb-3 pt-1', className)}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
