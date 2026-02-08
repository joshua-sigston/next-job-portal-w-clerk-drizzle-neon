import {
  pgTable,
  varchar,
  uuid,
  pgEnum,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const jobTypeEnum = pgEnum("job_type", [
  "Full-Time",
  "Part-Time",
  "Contract",
  "Internship",
]);
export const experienceLevelEnum = pgEnum("experience_level", [
  "Entry Level",
  "Mid-level",
  "Senior",
  "Manager",
]);

export const jobsTable = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id", { length: 225 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  jobType: jobTypeEnum("job_type").notNull(),
  experienceLevel: experienceLevelEnum("experience_level").notNull(),
  salary: varchar("salary", { length: 255 }),
  description: text("description").notNull(),
  applicationUrl: varchar("application_url", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type NewJob = typeof jobsTable.$inferInsert;
export type Job = typeof jobsTable.$inferSelect;
