"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";

function NavigationLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const cleanup = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startProgress = React.useCallback(() => {
    cleanup();
    setVisible(true);
    setProgress(25);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 88) {
          cleanup();
          return 88;
        }
        // Gentle organic step increments as it approaches 90%
        const step = Math.max(0.8, (90 - prev) * 0.12);
        return Math.min(88, prev + step);
      });
    }, 100);
  }, [cleanup]);

  const completeProgress = React.useCallback(() => {
    cleanup();
    setProgress(100);
    const timeout = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 250);
    return () => clearTimeout(timeout);
  }, [cleanup]);

  // Complete progress whenever the pathname or search parameters update
  React.useEffect(() => {
    if (visible) {
      completeProgress();
    }
  }, [pathname, searchParams, completeProgress]);

  // Listen to anchor clicks, back/forward navigation, and custom triggers
  React.useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const targetAttr = anchor.getAttribute("target");

      // Skip external links, hash anchors, mailto, tel, downloads, or modified clicks
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        targetAttr === "_blank" ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      try {
        const targetUrl = new URL(href, window.location.href);
        const currentUrl = new URL(window.location.href);

        // Only trigger if destination is internal and points to a new path or query
        if (
          targetUrl.origin === currentUrl.origin &&
          (targetUrl.pathname !== currentUrl.pathname || targetUrl.search !== currentUrl.search)
        ) {
          startProgress();
        }
      } catch {
        // Ignore unparseable URIs
      }
    };

    const handlePopState = () => {
      startProgress();
    };

    const handleCustomStart = () => startProgress();
    const handleCustomComplete = () => completeProgress();

    document.addEventListener("click", handleAnchorClick, true);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("navigation-loader-start", handleCustomStart);
    window.addEventListener("navigation-loader-complete", handleCustomComplete);

    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("navigation-loader-start", handleCustomStart);
      window.removeEventListener("navigation-loader-complete", handleCustomComplete);
      cleanup();
    };
  }, [startProgress, completeProgress, cleanup]);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-[3px] overflow-hidden"
    >
      <div
        className="h-full bg-primary shadow-[0_0_12px_var(--primary),0_0_4px_var(--primary)]"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transition:
            progress === 100
              ? "width 180ms ease-out, opacity 250ms ease-in"
              : progress === 25
              ? "width 100ms ease-out"
              : "width 200ms ease-out",
        }}
      >
        {/* Leading edge light highlight */}
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-r from-transparent to-white/70 shadow-[0_0_8px_#ffffff]" />
      </div>
    </div>
  );
}

export function NavigationLoader() {
  return (
    <React.Suspense fallback={null}>
      <NavigationLoaderContent />
    </React.Suspense>
  );
}

/**
 * Programmatic triggers for manual router.push invocations
 */
export function startNavigationLoader() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("navigation-loader-start"));
  }
}

export function stopNavigationLoader() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("navigation-loader-complete"));
  }
}

