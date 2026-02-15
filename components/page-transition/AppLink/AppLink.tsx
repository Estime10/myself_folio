"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { usePageTransitionContext } from "../PageTransitionContext";

type AppLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Pour la nav : fermer le menu mobile après transition (optionnel). */
  onNavigate?: () => void;
};

function isInternalLink(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

export function AppLink({
  href,
  children,
  className,
  onClick,
  onNavigate,
}: AppLinkProps) {
  const router = useRouter();
  const { runPageExitTransition } = usePageTransitionContext();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (!isInternalLink(href)) return;

      e.preventDefault();
      onNavigate?.();
      runPageExitTransition(() => {
        router.push(href);
      });
    },
    [href, onClick, onNavigate, runPageExitTransition, router]
  );

  if (!isInternalLink(href)) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      prefetch={true}
    >
      {children}
    </Link>
  );
}
