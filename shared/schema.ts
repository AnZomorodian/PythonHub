import { z } from "zod";

export const conceptSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  codeSnippet: z.string(),
  output: z.string().optional(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  estimatedMinutes: z.number().optional(),
  createdAt: z.string().optional(),
});

export type Concept = z.infer<typeof conceptSchema>;
export const insertConceptSchema = conceptSchema.omit({ id: true, createdAt: true });
export type InsertConcept = z.infer<typeof insertConceptSchema>;
