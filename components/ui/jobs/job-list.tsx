import JobCard from "@/components/ui/jobs/job-card";
import { getJobs } from "@/app/actions/jobActions";
import JobFilter from "./job-filter";
import { JobFilterValues } from "@/lib/validation";
import { Job } from "@/lib/schema";

interface JobListProps {
  filterValues: JobFilterValues;
}

export default async function JobList({ filterValues }: JobListProps) {
  const { search, jobType, location } = filterValues;
  const jobs = await getJobs(search, jobType as Job["jobType"], location);
  return (
    <>
      <JobFilter jobs={jobs} filterValues={filterValues} />
      {jobs.length === 0 ? (
        <h3>No Jobs Found</h3>
      ) : (
        <section>
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </section>
      )}
    </>
  );
}
