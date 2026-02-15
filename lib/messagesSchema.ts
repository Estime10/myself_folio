import { z } from "zod";

/** Namespaces requis. Contenu validé comme objet (détail non contraint). */
const namespaceSchema = z.record(z.string(), z.unknown());

const messagesSchema = z.object({
  common: namespaceSchema,
  navigation: namespaceSchema,
  hero: namespaceSchema,
  contact: namespaceSchema,
  testimonials: namespaceSchema,
  projects: namespaceSchema,
  about: namespaceSchema,
  tech: namespaceSchema,
});

export type Messages = z.infer<typeof messagesSchema>;

export function validateMessages(data: unknown): Messages {
  return messagesSchema.parse(data);
}
