import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { ConceptsListResponse, ConceptResponse } from "@shared/routes";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useConcepts() {
  return useQuery({
    queryKey: [api.concepts.list.path],
    queryFn: async (): Promise<ConceptsListResponse> => {
      const res = await fetch(api.concepts.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch concepts");
      const json = await res.json();
      return parseWithLogging(api.concepts.list.responses[200], json, "concepts.list");
    },
  });
}

export function useConcept(id: string | null | undefined) {
  return useQuery({
    queryKey: [api.concepts.get.path, id ?? ""],
    enabled: Boolean(id),
    queryFn: async (): Promise<ConceptResponse | null> => {
      if (!id) return null;
      const url = buildUrl(api.concepts.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch concept");
      const json = await res.json();
      return parseWithLogging(api.concepts.get.responses[200], json, "concepts.get");
    },
  });
}

/**
 * Small "local preference" mutation — no backend.
 * We store a last-selected concept id for smoother UX.
 */
export function useRememberSelectedConcept() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      localStorage.setItem("pyteach:selectedConceptId", id);
      return id;
    },
    onSuccess: () => {
      // Invalidate nothing from API; but allow pages using this key to refresh.
      qc.invalidateQueries({ queryKey: ["pyteach:selectedConceptId"] });
    },
  });
}

export function useSelectedConceptId() {
  return useQuery({
    queryKey: ["pyteach:selectedConceptId"],
    queryFn: async () => localStorage.getItem("pyteach:selectedConceptId"),
    staleTime: Infinity,
  });
}
