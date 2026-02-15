import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Job } from "@/lib/schema";
import SelectComponent from "./select-component";
import { Button } from "../button";
import { jobFilterSchema, JobFilterValues } from "@/lib/validation";
import { redirect } from "next/navigation";
import Link from "next/link";
import SubmitBtn from "@/components/submit-btn";

interface JobFilterProps {
  jobs: Job[];
  filterValues: JobFilterValues;
}

async function filterJobs(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());
  //   console.log(values.search, values.jobType, values.location);
  const result = jobFilterSchema.safeParse(values);

  if (!result.success) {
    throw new Error(result.error.message);
  }

  const { search, jobType, location } = result.data;

  const searchParams = new URLSearchParams({
    ...(search ? { search: search.trim() } : {}),
    ...(jobType && jobType !== "all" ? { jobType } : {}),
    ...(location && location !== "all" ? { location } : {}),
  });

  redirect(`/?${searchParams.toString()}`);
}

export default function JobFilter({ jobs, filterValues }: JobFilterProps) {
  // 1. Get all locations from the jobs array
  const locations = jobs.map((job) => job.location);
  const types = jobs.map((job) => job.jobType);

  // 2. Use a Set to remove duplicates
  // A Set is a collection of unique values. Passing an array to new Set() automatically removes duplicates.
  // Then we use the spread operator [...] to convert the Set back into an array.
  const uniqueLocations = [...new Set(locations)];
  const uniqueTypes = [...new Set(types)];

  return (
    <aside className="sticky top-0">
      <form action={filterJobs} key={JSON.stringify(filterValues)}>
        <Card className="m-0 gap-0 space-y-4 p-3">
          <CardHeader className="p-0">
            <CardTitle>Job Filter</CardTitle>
            <CardDescription>Filter your job search</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 p-0">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Search</Label>
              <Input
                type="text"
                placeholder="Title, company, etc."
                name="search"
                id="search"
                defaultValue={filterValues?.search}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium">Job Type</Label>
              <SelectComponent
                selectItem="Job Type"
                options={uniqueTypes}
                name="jobType"
                id="jobType"
                defaultValue={filterValues?.jobType}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium">Location</Label>
              <SelectComponent
                selectItem="Location"
                options={uniqueLocations}
                name="location"
                id="location"
                defaultValue={filterValues?.location}
              />
            </div>
          </CardContent>
          <CardFooter className="mt-4 flex items-center justify-center gap-2">
            <SubmitBtn>Filter</SubmitBtn>
            <Button asChild variant="destructive" className="flex-1">
              <Link href="/">Reset</Link>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </aside>
  );
}
