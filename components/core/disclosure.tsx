'use client';
import * as React from 'react';
import {
  AnimatePresence,
  motion,
  MotionConfig,
  Transition,
  Variant,
  Variants,
} from 'motion/react';
import { createContext, useContext, useState, useId } from 'react';
import { cn } from '@/lib/utils';

export type DisclosureContextType = {
  open: boolean;
  toggle: () => void;
  variants?: { expanded: Variant; collapsed: Variant };
};

const DisclosureContext = createContext<DisclosureContextType | undefined>(
  undefined
);

export function useDisclosure() {
  const context = useContext(DisclosureContext);
  if (!context) {
    throw new Error('useDisclosure must be used within a DisclosureProvider');
  }
  return context;
}

export type DisclosureProviderProps = {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  variants?: { expanded: Variant; collapsed: Variant };
};

export function DisclosureProvider({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  variants,
}: DisclosureProviderProps) {
  const isControlled = openProp !== undefined;
  const [internalOpenValue, setInternalOpenValue] = useState<boolean>(
    isControlled ? openProp : defaultOpen
  );

  const currentOpen = isControlled ? openProp : internalOpenValue;

  const toggle = () => {
    const newOpen = !currentOpen;
    if (!isControlled) {
      setInternalOpenValue(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <DisclosureContext.Provider
      value={{
        open: currentOpen,
        toggle,
        variants,
      }}
    >
      {children}
    </DisclosureContext.Provider>
  );
}

export type DisclosureProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  variants?: { expanded: Variant; collapsed: Variant };
  transition?: Transition;
};

export function Disclosure({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
  transition,
  variants,
}: DisclosureProps) {
  return (
    <MotionConfig transition={transition}>
      <div className={className}>
        <DisclosureProvider
          open={openProp}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
          variants={variants}
        >
          {React.Children.toArray(children)[0]}
          {React.Children.toArray(children)[1]}
        </DisclosureProvider>
      </div>
    </MotionConfig>
  );
}

export type DisclosureTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

export function DisclosureTrigger({
  children,
  className,
  onClick,
  ...props
}: DisclosureTriggerProps) {
  const { toggle, open } = useDisclosure();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      toggle();
    }
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      aria-expanded={open}
      data-state={open ? 'open' : 'closed'}
      data-expanded={open ? '' : undefined}
      data-closed={!open ? '' : undefined}
      className={cn(
        'group flex w-full items-center justify-between text-left cursor-pointer transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export type DisclosureContentProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
};

export function DisclosureContent({
  children,
  className,
  ...props
}: DisclosureContentProps) {
  const { open, variants } = useDisclosure();
  const uniqueId = useId();

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
    <div className='overflow-hidden'>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={uniqueId}
            initial='collapsed'
            animate='expanded'
            exit='collapsed'
            variants={combinedVariants}
            className='overflow-hidden'
            data-state='open'
          >
            <div {...props} className={className}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default {
  Disclosure,
  DisclosureProvider,
  DisclosureTrigger,
  DisclosureContent,
  useDisclosure,
};
