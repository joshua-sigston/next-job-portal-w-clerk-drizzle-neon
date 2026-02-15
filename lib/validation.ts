import z from "zod";

export const jobFilterSchema = z.object({
  search: z.string().optional(),
  jobType: z.string().optional(),
  location: z.string().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;
