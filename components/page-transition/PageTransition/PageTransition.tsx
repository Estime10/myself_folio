"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import {
  PageTransitionContext,
  type PageTransitionContextValue,
} from "../PageTransitionContext";
import { SliceOverlay } from "./SliceOverlay";

type OverlayPhase = "hidden" | "covering" | "revealing";

type PageTransitionProps = {
  children: ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [overlayPhase, setOverlayPhase] = useState<OverlayPhase>("hidden");
  const previousPathnameRef = useRef<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const runPageExitTransition = useCallback<
    PageTransitionContextValue["runPageExitTransition"]
  >((callback) => {
    setOverlayPhase("covering");
    requestAnimationFrame(() => {
      callback();
      requestAnimationFrame(() => {
        setOverlayPhase("revealing");
      });
    });
  }, []);

  const handleRevealComplete = useCallback(() => {
    setOverlayPhase("hidden");
  }, []);

  useEffect(() => {
    const pathChanged = previousPathnameRef.current !== pathname;
    const isIdle = overlayPhase === "hidden";
    const isNotFirstMount = previousPathnameRef.current !== null;

    previousPathnameRef.current = pathname;

    if (pathChanged && isIdle && isNotFirstMount) {
      const id = requestAnimationFrame(() => {
        setOverlayPhase("covering");
        requestAnimationFrame(() => {
          setOverlayPhase("revealing");
        });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [pathname, overlayPhase]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;
    if (overlayPhase !== "hidden") {
      body.classList.add("page-transition-active");
    } else {
      body.classList.remove("page-transition-active");
    }
    return () => {
      body.classList.remove("page-transition-active");
    };
  }, [overlayPhase]);

  return (
    <PageTransitionContext.Provider value={{ runPageExitTransition }}>
      {children}
      <SliceOverlay
        visible={overlayPhase !== "hidden"}
        runReveal={overlayPhase === "revealing"}
        onRevealComplete={handleRevealComplete}
        reducedMotion={reducedMotion}
      />
    </PageTransitionContext.Provider>
  );
}
