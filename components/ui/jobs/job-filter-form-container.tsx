import { Job } from "@/lib/schema";
import { Button } from "../button";
import { jobFilterSchema, JobFilterValues } from "@/lib/validation";
import { redirect } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import FilterForm from "./filter-form";

interface JobFilterProps {
  jobs: Job[];
  filterValues: JobFilterValues;
}

/**
 * Server action to handle job filtering.
 * It takes form data, validates it using Zod schema, constructs query parameters,
 * and redirects the user to the homepage with the applied filters.
 */
async function filterJobs(formData: FormData) {
  "use server";
  console.log("sending form");

  const values = Object.fromEntries(formData.entries());
  const result = jobFilterSchema.safeParse(values);

  if (!result.success) {
    throw new Error(result.error.message);
  }

  const { search, jobType, location } = result.data;

  // Construct search parameters based on valid filter values.
  // We exclude empty strings or "all" values to keep the URL clean.
  const searchParams = new URLSearchParams({
    ...(search ? { search: search.trim() } : {}),
    ...(jobType && jobType !== "all" ? { jobType } : {}),
    ...(location && location !== "all" ? { location } : {}),
  });

  redirect(`/?${searchParams.toString()}`);
}

export default function JobFilterFormContainer({
  jobs,
  filterValues,
}: JobFilterProps) {
  // 1. Get all locations and job types from the jobs array to populate filter options dynamically.
  const locations = jobs.map((job) => job.location);
  const types = jobs.map((job) => job.jobType);

  // 2. Use a Set to remove duplicates
  // A Set is a collection of unique values. Passing an array to new Set() automatically removes duplicates.
  // Then we use the spread operator [...] to convert the Set back into an array.
  const uniqueLocations = [...new Set(locations)];
  const uniqueTypes = [...new Set(types)];

  return (
    <aside className="sticky top-0 md:w-full">
      <div className="md:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Search for Jobs</Button>
          </PopoverTrigger>
          <PopoverContent className="space-y-4">
            <PopoverHeader>
              <PopoverTitle className="text-center text-lg font-bold">
                Filter For Job
              </PopoverTitle>
            </PopoverHeader>
            <FilterForm
              action={filterJobs}
              key={JSON.stringify(filterValues)}
              filterValues={filterValues}
              uniqueLocations={uniqueLocations}
              uniqueTypes={uniqueTypes}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="hidden md:block md:w-full">
        <FilterForm
          action={filterJobs}
          key={JSON.stringify(filterValues)}
          filterValues={filterValues}
          uniqueLocations={uniqueLocations}
          uniqueTypes={uniqueTypes}
        />
      </div>
    </aside>
  );
}
