import { z } from 'zod';
import { conceptSchema } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  concepts: {
    list: {
      method: 'GET' as const,
      path: '/api/concepts' as const,
      responses: {
        200: z.array(conceptSchema),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/concepts/:id' as const,
      responses: {
        200: conceptSchema,
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type ConceptResponse = z.infer<typeof api.concepts.get.responses[200]>;
export type ConceptsListResponse = z.infer<typeof api.concepts.list.responses[200]>;
