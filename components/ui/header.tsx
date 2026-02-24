import { Waypoints } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Post",
    href: "/post-job",
  },
];

export default function Header() {
  return (
    <header className="bg-muted flex w-full items-center justify-between p-4">
      <div className="hidden sm:block">
        <Link href={`/`}>
          <Waypoints size={32} />
        </Link>
      </div>

      <div className="text-left sm:text-center">
        <h1 className="text-xl font-bold">Waypoints</h1>
        <h3>Guiding to your next career</h3>
      </div>

      <div className="hidden sm:block">
        <Button asChild variant="default">
          <Link href={`/post-job`}>Post a job</Link>
        </Button>
      </div>
    </header>
  );
}
