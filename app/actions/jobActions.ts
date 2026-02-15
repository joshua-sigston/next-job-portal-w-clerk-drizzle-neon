"use server";

import { db } from "@/lib/db";
import { jobsTable } from "@/lib/schema";
import { and, desc, eq, ilike } from "drizzle-orm";

// Infer enum types directly from schema (important for pgEnum)
type JobType = typeof jobsTable.$inferSelect.jobType;
type Location = typeof jobsTable.$inferSelect.location;

export async function getJobs(
  search?: string,
  jobType?: JobType,
  location?: Location,
) {
  try {
    const jobs = await db
      .select()
      .from(jobsTable)
      .where(
        and(
          eq(jobsTable.approved, true),
          jobType ? eq(jobsTable.jobType, jobType) : undefined,
          location ? eq(jobsTable.location, location) : undefined,
          search?.trim()
            ? ilike(jobsTable.title, `%${search.trim()}%`)
            : undefined,
        ),
      )
      .orderBy(desc(jobsTable.createdAt));

    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}
