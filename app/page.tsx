import JobCard from "@/components/ui/jobs/job-card";
import { getJobs } from "./actions/jobActions";
import Container from "@/components/ui/container";

export default async function Home() {
  const jobs = (await getJobs()).splice(0, 10);

  return (
    <main>
      <Container className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </Container>
    </main>
  );
}
