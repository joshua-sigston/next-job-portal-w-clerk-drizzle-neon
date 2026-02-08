import "dotenv/config";
import { jobsTable, type NewJob } from "@/lib/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const mockJobs: NewJob[] = [
  {
    userId: "user_demo",
    title: "Senior Frontend Engineer",
    company: "TechCorp",
    location: "San Francisco, CA",
    jobType: "Full-Time",
    experienceLevel: "Senior",
    salary: "$150k - $200k",
    description:
      "We are looking for a Senior Frontend Engineer to join our team. You will be working with React, Next.js, and TypeScript.",
    applicationUrl: "https://techcorp.com/apply",
  },
  {
    userId: "user_demo",
    title: "Backend Developer",
    company: "DataSystems",
    location: "Remote",
    jobType: "Full-Time",
    experienceLevel: "Mid-level",
    salary: "$120k - $160k",
    description:
      "Join our backend team to build scalable APIs using Node.js and PostgreSQL.",
    applicationUrl: "https://datasystems.com/careers",
  },
  {
    userId: "user_demo",
    title: "Product Designer",
    company: "CreativeStudio",
    location: "New York, NY",
    jobType: "Contract",
    experienceLevel: "Mid-level",
    salary: "$80 - $120 / hr",
    description:
      "We need a talented Product Designer to help us redesign our core application.",
    applicationUrl: "https://creativestudio.design/jobs",
  },
  {
    userId: "user_demo",
    title: "DevOps Engineer",
    company: "CloudScale",
    location: "Austin, TX",
    jobType: "Full-Time",
    experienceLevel: "Senior",
    salary: "$160k - $210k",
    description:
      "Responsible for managing our cloud infrastructure on AWS and CI/CD pipelines.",
    applicationUrl: "https://cloudscale.io/join",
  },
  {
    userId: "user_demo",
    title: "Junior Web Developer",
    company: "StartUp Inc.",
    location: "Remote",
    jobType: "Part-Time",
    experienceLevel: "Entry Level",
    salary: "$40k - $60k",
    description:
      "Great opportunity for a junior developer to learn and grow in a fast-paced environment.",
    applicationUrl: "https://startup.inc/apply",
  },
  {
    userId: "user_demo",
    title: "Engineering Manager",
    company: "BigTech",
    location: "Seattle, WA",
    jobType: "Full-Time",
    experienceLevel: "Manager",
    salary: "$220k - $300k",
    description:
      "Lead a team of 10+ engineers working on high-impact projects.",
    applicationUrl: "https://bigtech.com/careers",
  },
  {
    userId: "user_demo",
    title: "Mobile Developer (iOS)",
    company: "AppWorks",
    location: "Los Angeles, CA",
    jobType: "Contract",
    experienceLevel: "Senior",
    salary: "$100 - $150 / hr",
    description:
      "Build the next generation of our iOS application using Swift and SwiftUI.",
    applicationUrl: "https://appworks.com/jobs",
  },
  {
    userId: "user_demo",
    title: "Data Scientist",
    company: "AI Solutions",
    location: "Boston, MA",
    jobType: "Full-Time",
    experienceLevel: "Senior",
    salary: "$170k - $230k",
    description:
      "Apply machine learning models to solve complex business problems.",
    applicationUrl: "https://aisolutions.com/apply",
  },
  {
    userId: "user_demo",
    title: "QA Engineer",
    company: "QualityFirst",
    location: "Chicago, IL",
    jobType: "Full-Time",
    experienceLevel: "Mid-level",
    salary: "$90k - $120k",
    description:
      "Ensure the quality of our software products through automated and manual testing.",
    applicationUrl: "https://qualityfirst.com/careers",
  },
  {
    userId: "user_demo",
    title: "Marketing Intern",
    company: "GrowthHacker",
    location: "Remote",
    jobType: "Internship",
    experienceLevel: "Entry Level",
    salary: "$20 / hr",
    description:
      "Learn digital marketing strategies and assist with campaign execution.",
    applicationUrl: "https://growthhacker.com/internships",
  },
];

async function main() {
  console.log("Seeding database...");
  try {
    await db.insert(jobsTable).values(mockJobs);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

main();

// npx tsx scripts/seed.ts
