import { JobFilterValues } from "@/lib/validation";
import JobFilterFormContainer from "./job-filter-form-container";
import JobList from "./job-list";
import { Job } from "@/lib/schema";
import { getJobs } from "@/app/actions/jobActions";

interface JobListProps {
  filterValues: JobFilterValues;
}

export default async function JobFilterContainer({
  filterValues,
}: JobListProps) {
  const { search, jobType, location } = filterValues;
  const jobs = await getJobs(search, jobType as Job["jobType"], location);

  return (
    <section className="w-full space-y-4 p-4 md:grid md:grid-cols-[1fr_2fr] md:items-start md:gap-4 md:space-y-0">
      <div className="flex w-full items-center justify-center md:block md:w-full md:bg-transparent">
        <JobFilterFormContainer jobs={jobs} filterValues={filterValues} />
      </div>
      <JobList jobs={jobs} />
    </section>
  );
}
