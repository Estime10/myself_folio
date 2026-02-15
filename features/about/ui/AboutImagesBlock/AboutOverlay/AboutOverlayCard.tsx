"use client";

type AboutOverlayCardProps = {
  title: string;
  description: string;
};

export function AboutOverlayCard({ title, description }: AboutOverlayCardProps) {
  return (
    <article className="flex min-h-[320px] w-[280px] flex-col rounded-2xl border border-white/10 bg-bg-tertiary/60 shadow-[0_18px_45px_rgba(0,0,0,0.7)] backdrop-blur-xl">
      {/* Header style projet : bandeau + titre */}
      <div className="relative flex min-h-[64px] shrink-0 items-center justify-center px-4 py-3">
        <div className="absolute inset-0 rounded-t-2xl bg-linear-to-br from-white/8 via-accent-primary/20 to-black/60" />
        <div className="absolute inset-[10px] rounded-xl border border-white/8 bg-black/20 shadow-[0_12px_40px_rgba(0,0,0,0.7)]" />
        <h3 className="relative z-[1] text-center text-base font-semibold text-text-primary md:text-lg">
          {title}
        </h3>
      </div>
      {/* Barre de séparation style projet */}
      <div className="h-px w-full shrink-0 bg-white/10" />
      {/* Body : description — flex-1 pour même hauteur sur les 3 cartes */}
      <div className="flex min-h-0 flex-1 flex-col justify-center px-4 py-4">
        <p className="text-center text-[14px] leading-relaxed text-white/90 md:text-[15px]">
          {description}
        </p>
      </div>
    </article>
  );
}
