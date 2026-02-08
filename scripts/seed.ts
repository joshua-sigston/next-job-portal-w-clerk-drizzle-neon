import "dotenv/config";
import { jobsTable, type NewJob } from "@/lib/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const mockJobs: NewJob[] = [
  {
    userId: "user_demo",
    approved: true,
    title: "Senior Frontend Engineer",
    company: "TechCorp",
    location: "San Francisco, CA",
    jobType: "Full-Time",
    experienceLevel: "Senior",
    salary: "$150k - $200k",
    description:
      "We are looking for a Senior Frontend Engineer to join our team. You will be working with React, Next.js, and TypeScript to build modern, responsive web applications. The ideal candidate has a strong understanding of UI/UX principles and performance optimization techniques. You will collaborate closely with designers and backend engineers to deliver high-quality user experiences.",
    applicationUrl: "https://techcorp.com/apply",
  },
  {
    userId: "user_demo",
    approved: true,
    title: "Backend Developer",
    company: "DataSystems",
    location: "Remote",
    jobType: "Full-Time",
    experienceLevel: "Mid-level",
    salary: "$120k - $160k",
    description:
      "Join our backend team to build scalable APIs using Node.js and PostgreSQL. We are processing millions of requests daily and need someone who can design efficient database schemas and optimize query performance. Experience with microservices architecture and message queues (RabbitMQ/Kafka) is a plus.",
    applicationUrl: "https://datasystems.com/careers",
  },
  {
    userId: "user_demo",
    approved: true,
    title: "Product Designer",
    company: "CreativeStudio",
    location: "New York, NY",
    jobType: "Contract",
    experienceLevel: "Mid-level",
    salary: "$80 - $120 / hr",
    description:
      "We need a talented Product Designer to help us redesign our core application. You will be responsible for the entire design process, from user research and wireframing to high-fidelity prototypes and design systems. We value creativity and user-centric thinking.",
    applicationUrl: "https://creativestudio.design/jobs",
  },
  {
    userId: "user_demo",
    approved: true,
    title: "DevOps Engineer",
    company: "CloudScale",
    location: "Austin, TX",
    jobType: "Full-Time",
    experienceLevel: "Senior",
    salary: "$160k - $210k",
    description:
      "Responsible for managing our cloud infrastructure on AWS and CI/CD pipelines. You will automate deployment processes, monitor system health, and ensure high availability and security. Familiarity with Terraform, Docker, and Kubernetes is highly desirable.",
    applicationUrl: "https://cloudscale.io/join",
  },
  {
    userId: "user_demo",
    approved: true,
    title: "Junior Web Developer",
    company: "StartUp Inc.",
    location: "Remote",
    jobType: "Part-Time",
    experienceLevel: "Entry Level",
    salary: "$40k - $60k",
    description:
      "Great opportunity for a junior developer to learn and grow in a fast-paced environment. You will be mentored by senior engineers and get hands-on experience with modern web technologies. We are looking for someone who is eager to learn and has a passion for coding.",
    applicationUrl: "https://startup.inc/apply",
  },
  {
    userId: "user_demo",
    approved: true,
    title: "Engineering Manager",
    company: "BigTech",
    location: "Seattle, WA",
    jobType: "Full-Time",
    experienceLevel: "Manager",
    salary: "$220k - $300k",
    description:
      "Lead a team of 10+ engineers working on high-impact projects. You will be responsible for technical strategy, team growth, and project delivery. We are looking for a leader who can inspire and mentor engineers while driving technical excellence.",
    applicationUrl: "https://bigtech.com/careers",
  },
  {
    userId: "user_demo",
    approved: true,
    title: "Mobile Developer (iOS)",
    company: "AppWorks",
    location: "Los Angeles, CA",
    jobType: "Contract",
    experienceLevel: "Senior",
    salary: "$100 - $150 / hr",
    description:
      "Build the next generation of our iOS application using Swift and SwiftUI. You will work on new features, improve app performance, and ensure a smooth user experience across different iOS devices. Experience with Combine and Core Data is a plus.",
    applicationUrl: "https://appworks.com/jobs",
  },
  {
    userId: "user_demo",
    approved: true,
    title: "Data Scientist",
    company: "AI Solutions",
    location: "Boston, MA",
    jobType: "Full-Time",
    experienceLevel: "Senior",
    salary: "$170k - $230k",
    description:
      "Apply machine learning models to solve complex business problems. You will work with large datasets to extract insights and build predictive models. Proficiency in Python, TensorFlow/PyTorch, and SQL is required.",
    applicationUrl: "https://aisolutions.com/apply",
  },
  {
    userId: "user_demo",
    approved: true,
    title: "QA Engineer",
    company: "QualityFirst",
    location: "Chicago, IL",
    jobType: "Full-Time",
    experienceLevel: "Mid-level",
    salary: "$90k - $120k",
    description:
      "Ensure the quality of our software products through automated and manual testing. You will design test plans, write automated test scripts, and report bugs. We are looking for someone with a sharp eye for detail and a commitment to quality.",
    applicationUrl: "https://qualityfirst.com/careers",
  },
  {
    userId: "user_demo",
    approved: true,
    title: "Marketing Intern",
    company: "GrowthHacker",
    location: "Remote",
    jobType: "Internship",
    experienceLevel: "Entry Level",
    salary: "$20 / hr",
    description:
      "Learn digital marketing strategies and assist with campaign execution. You will help with social media management, content creation, and email marketing. This is a great opportunity to kickstart your career in marketing.",
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
