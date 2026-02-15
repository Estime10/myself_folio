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
        className="inline-block rounded-lg bg-accent-primary px-5 py-2.5 text-base font-bold text-white transition-opacity hover:opacity-90 lg:cursor-pointer lg:text-lg"
      >
        {label}
      </button>
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
