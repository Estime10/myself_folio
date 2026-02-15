"use client";

import { useEffect } from "react";

/**
 * Bloque ou restaure le scroll du body (ex. quand un overlay/modal est ouvert).
 */
export function useLockBodyScroll(lock: boolean): void {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (lock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lock]);
}
