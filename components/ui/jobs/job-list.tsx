import JobCard from "@/components/ui/jobs/job-card";
import { Job } from "@/lib/schema";

interface JobListProps {
  jobs: Job[];
}

export default async function JobList({ jobs }: JobListProps) {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
