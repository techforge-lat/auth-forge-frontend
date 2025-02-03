import { z } from "zod";

export const searchSchema = z.object({
  filter: z.record(z.string()).catch({ created_at: "sort:desc" }).optional(),
  sort: z.record(z.string()).optional(),
  page: z.coerce.number().default(1).optional(),
  limit: z.coerce.number().default(10).optional(),
});

export type SearchParams = z.infer<typeof searchSchema>;
