"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";

type AboutOverlayShellProps = {
  title: string;
  closeLabel: string;
  isClosing: boolean;
  onAnimationEnd: (e: React.AnimationEvent<HTMLDivElement>) => void;
  onRequestClose: () => void;
  closeButtonVariant: "icon" | "text";
  children: ReactNode;
  /** Accessible label for the dialog (default: title) */
  ariaLabel?: string;
};

export function AboutOverlayShell({
  title,
  closeLabel,
  isClosing,
  onAnimationEnd,
  onRequestClose,
  closeButtonVariant,
  children,
  ariaLabel,
}: AboutOverlayShellProps) {
  return (
    <div
      className={`about-overlay fixed inset-0 z-[9998] bg-black/30 backdrop-blur-md ${isClosing ? "about-overlay--closing" : ""}`}
      aria-modal
      role="dialog"
      aria-label={ariaLabel ?? title}
      onAnimationEnd={onAnimationEnd}
    >
      <h2 className="absolute left-1/2 top-6 z-10 -translate-x-1/2 text-lg font-semibold uppercase tracking-wide text-white">
        {title}
      </h2>
      {children}
      {closeButtonVariant === "icon" ? (
        <button
          type="button"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white outline-none"
          onClick={onRequestClose}
          aria-label={closeLabel}
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      ) : (
        <button
          type="button"
          className="absolute right-4 top-4 z-10 cursor-pointer rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
          onClick={(e) => {
            e.stopPropagation();
            onRequestClose();
          }}
          aria-label={closeLabel}
        >
          {closeLabel}
        </button>
      )}
    </div>
  );
}
