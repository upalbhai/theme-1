'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform, SpringOptions } from 'motion/react';
import { cn } from '@/lib/utils';

export type SpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
  fill?: string;
  color?: string;
};

export function Spotlight({
  className,
  size = 200,
  springOptions = { bounce: 0 },
  fill,
  color,
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightX = useTransform(mouseX, (x) => x - size / 2);
  const spotlightY = useTransform(mouseY, (y) => y - size / 2);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = 'relative';
        parent.style.overflow = 'hidden';
        setParentElement(parent);
        if (typeof window !== 'undefined' && parent.matches(':hover')) {
          setIsHovered(true);
        }
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement]
  );

  const handleMouseEnter = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.jump(event.clientX - left);
      mouseY.jump(event.clientY - top);
      setIsHovered(true);
    },
    [mouseX, mouseY, parentElement]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    if (!parentElement) return;

    const abortController = new AbortController();

    parentElement.addEventListener('mousemove', handleMouseMove, {
      signal: abortController.signal,
    });
    parentElement.addEventListener('mouseenter', handleMouseEnter, {
      signal: abortController.signal,
    });
    parentElement.addEventListener('mouseleave', handleMouseLeave, {
      signal: abortController.signal,
    });

    return () => {
      abortController.abort();
    };
  }, [parentElement, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  const spotlightFill = fill || color;

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute top-0 left-0 rounded-full blur-xl',
        className
      )}
      animate={{ opacity: isHovered ? 1 : 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        width: size,
        height: size,
        x: spotlightX,
        y: spotlightY,
        background: spotlightFill
          ? `radial-gradient(circle at center, ${spotlightFill} 0%, transparent 70%)`
          : 'radial-gradient(circle at center, rgba(217, 84, 30, 0.45) 0%, rgba(217, 84, 30, 0.12) 38%, transparent 70%)',
      }}
    />
  );
}
