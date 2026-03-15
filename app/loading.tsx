export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-1 items-center justify-center">
      <div
        className="h-8 w-8 animate-pulse rounded-full bg-text-secondary/30"
        aria-hidden
      />
    </div>
  );
}
