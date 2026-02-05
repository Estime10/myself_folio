export function Hero() {
  return (
    <section className="relative min-h-[100vh] w-full">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/image/profile.webp')" }}
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden />
    </section>
  );
}
