"use client";

import { useState } from "react";
import { ContactModal } from "../ContactModal/ContactModal";

type ContactModalTriggerProps = {
  label: string;
};

export function ContactModalTrigger({ label }: ContactModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btn-cta lg:cursor-pointer"
      >
        {label}
      </button>
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
