"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="layout-root relative flex min-h-screen flex-col items-center justify-center px-4">
      <div className="glass-strong w-full max-w-md rounded-2xl p-8 text-center">
        <h1 className="mb-2 font-semibold uppercase tracking-tight text-text-primary">
          Une erreur est survenue
        </h1>
        <p className="mb-6 text-sm text-text-secondary">
          Le chargement de la page a échoué. Vous pouvez réessayer.
        </p>
        <button
          type="button"
          onClick={reset}
          className="btn-cta rounded-xl px-6 py-3 text-sm font-medium"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
