import dynamic from "next/dynamic";

const TestimonialsSection = dynamic(
  () =>
    import("@/features/testimonials").then((m) => ({
      default: m.TestimonialsSection,
    }))
);

export default function TestimonialsPage() {
  return <TestimonialsSection />;
}
