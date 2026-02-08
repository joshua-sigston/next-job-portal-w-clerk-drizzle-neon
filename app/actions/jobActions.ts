"use server";

import { db } from "@/lib/db";
import { jobsTable } from "@/lib/schema";
import { desc } from "drizzle-orm";

export async function getJobs() {
  try {
    const jobs = await db
      .select()
      .from(jobsTable)
      .orderBy(desc(jobsTable.createdAt));

    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}
