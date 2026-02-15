import JobList from "@/components/ui/jobs/job-list";

interface PageProps {
  searchParams: Promise<{
    search?: string | "";
    jobType?: string;
    location?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const { search, jobType, location } = await searchParams;

  return (
    <main className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-4 md:grid-cols-[200px_1fr]">
      <JobList filterValues={{ search, jobType, location }} />
    </main>
  );
}
