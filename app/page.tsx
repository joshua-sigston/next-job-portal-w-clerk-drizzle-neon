import JobFilterContainer from "@/components/ui/jobs/job-filter-contrainer";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

interface PageProps {
  // searchParams in Next.js 15+ is a Promise that resolves to the URL search parameters.
  searchParams: Promise<{
    search?: string | "";
    jobType?: string;
    location?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { search, jobType, location } = await searchParams;

  return {
    title: getTitle({ search, jobType, location }),
  };
}

function getTitle({ search, jobType, location }: JobFilterValues) {
  const titlePrefix = search
    ? `${search} jobs`
    : jobType
      ? `${jobType} jobs`
      : "All jobs";

  const titleSuffice =
    location === "Remote"
      ? "that are remote"
      : location
        ? `in ${location}`
        : "";

  return `${titlePrefix} ${titleSuffice} | Job Board`;
}

export default async function Home({ searchParams }: PageProps) {
  // Await searchParams to extract filter values which are then passed to the client-side JobList component.
  const { search, jobType, location } = await searchParams;

  return (
    <main className="mx-auto mt-4 flex max-w-5xl flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">
        {getTitle({ search, jobType, location })}
      </h1>
      <JobFilterContainer filterValues={{ search, jobType, location }} />
    </main>
  );
}
