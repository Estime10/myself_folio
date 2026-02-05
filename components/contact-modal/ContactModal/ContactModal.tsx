"use client";

import gsap from "gsap";
import { useTranslations } from "next-intl";
import { useRef, useEffect, useLayoutEffect } from "react";
import { contactLinks } from "@/lib/config/contact";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const t = useTranslations("contact");
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    gsap.set(overlay, { opacity: 0, pointerEvents: "none" });
    gsap.set(panel, { scale: 0.95, opacity: 0, pointerEvents: "none" });
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    const duration = 0.3;
    const ease = "power3.out";

    const tl = gsap.timeline();

    if (isOpen) {
      document.body.style.overflow = "hidden";
      tl.to(overlay, {
        opacity: 1,
        pointerEvents: "auto",
        duration,
        ease,
      }, 0).to(panel, {
        scale: 1,
        opacity: 1,
        pointerEvents: "auto",
        duration,
        ease,
      }, 0);
    } else {
      tl.to(overlay, {
        opacity: 0,
        pointerEvents: "none",
        duration,
        ease,
      }, 0).to(panel, {
        scale: 0.95,
        opacity: 0,
        pointerEvents: "none",
        duration,
        ease,
      }, 0).eventCallback("onComplete", () => {
        document.body.style.overflow = "";
      });
    }
  }, [isOpen]);

  const links = [
    { label: t("email"), href: contactLinks.email, external: false },
    { label: t("linkedin"), href: contactLinks.linkedin, external: true },
    { label: t("instagram"), href: contactLinks.instagram, external: true },
  ];

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm opacity-0 pointer-events-none"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={panelRef}
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-[min(360px,90vw)] -translate-x-1/2 -translate-y-1/2 glass-strong rounded-2xl p-6 shadow-xl opacity-0 pointer-events-none"
        role="dialog"
        aria-modal="true"
        aria-label={t("title")}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold uppercase tracking-tight text-text-primary">
            {t("title")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-3 text-text-secondary transition-colors lg:hover:bg-white/10 lg:hover:text-text-primary"
            aria-label={t("close")}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="block rounded-lg py-3 px-3 text-lg font-medium text-text-primary transition-colors lg:hover:bg-white/10 lg:hover:text-accent-primary"
              onClick={onClose}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
