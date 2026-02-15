import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS_BG_IMAGE = "/image/photo_vibes.webp";

const arrowButtonClass =
  "flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/30";

export function TestimonialsSection() {
  return (
    <section
      className="fixed inset-0 z-0 overflow-hidden"
      aria-label="Témoigniages"
    >
      <div
        className="absolute inset-0 bg-bg-primary-base bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${TESTIMONIALS_BG_IMAGE}')` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/85" aria-hidden />

      {/* < 1022px : flèches en bas au centre */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 min-[1022px]:hidden">
        <button
          type="button"
          className={arrowButtonClass}
          aria-label="Précédent"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden />
        </button>
        <button
          type="button"
          className={arrowButtonClass}
          aria-label="Suivant"
        >
          <ChevronRight className="h-6 w-6" aria-hidden />
        </button>
      </div>

      {/* ≥ 1022px : flèches en bas à droite */}
      <div className="absolute bottom-6 right-6 hidden gap-3 min-[1022px]:flex">
        <button
          type="button"
          className={arrowButtonClass}
          aria-label="Précédent"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden />
        </button>
        <button
          type="button"
          className={arrowButtonClass}
          aria-label="Suivant"
        >
          <ChevronRight className="h-6 w-6" aria-hidden />
        </button>
      </div>
    </section>
  );
}
