import { z } from "zod";

export const conceptSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  codeSnippet: z.string(),
  output: z.string().optional(),
});

export type Concept = z.infer<typeof conceptSchema>;
export const insertConceptSchema = conceptSchema.omit({ id: true });
export type InsertConcept = z.infer<typeof insertConceptSchema>;
