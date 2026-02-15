"use client";

import { useEffect } from "react";

const BODY_SCROLLED_ATTR = "data-header-scrolled";
const SCROLL_THRESHOLD = 1;

function setBodyScrolled(scrolled: boolean) {
  if (scrolled) {
    document.body.setAttribute(BODY_SCROLLED_ATTR, "");
  } else {
    document.body.removeAttribute(BODY_SCROLLED_ATTR);
  }
}

export function HeaderScrollEffect() {
  useEffect(() => {
    const handleScroll = () => {
      setBodyScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
