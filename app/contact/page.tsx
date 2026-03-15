import dynamic from "next/dynamic";

const ContactSection = dynamic(
  () =>
    import("@/features/contact").then((m) => ({
      default: m.ContactSection,
    }))
);

export default function ContactPage() {
  return <ContactSection />;
}
