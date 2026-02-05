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
        className="inline-block rounded-lg bg-accent-primary px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-90 lg:cursor-pointer"
      >
        {label}
      </button>
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
