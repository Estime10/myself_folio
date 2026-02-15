const HERO_IMAGE_PATH = "/image/profile.webp";

export function HeroBackground() {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${HERO_IMAGE_PATH}')` }}
      />
      <div className="absolute inset-0 bg-black/85" aria-hidden />
    </>
  );
}
