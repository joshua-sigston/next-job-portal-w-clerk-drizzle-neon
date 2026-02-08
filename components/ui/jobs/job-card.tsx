import { Job } from "@/lib/schema";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { BriefcaseBusiness, Briefcase, MapPin } from "lucide-react";

interface JobCardProps {
  job: Job;
}

export default function JobCard({
  job: {
    title,
    company,
    location,
    salary,
    experienceLevel,
    createdAt,
    imageUrl,
    jobType,
  },
}: JobCardProps) {
  return (
    <Card className="flex flex-row items-center p-5">
      <div className="w-fit">
        {!imageUrl ? (
          <BriefcaseBusiness size={55} className="" />
        ) : (
          <Image src={imageUrl} alt="logo" width={150} height={150} />
        )}
      </div>
      <div className="flex-1">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{company}</CardDescription>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent className="mt-4 flex flex-col space-y-2">
          <div className="flex space-x-4">
            <small className="flex items-center gap-1">
              <Briefcase size={16} className="text-muted-foreground shrink-0" />
              {jobType}, {experienceLevel}
            </small>
            <small className="flex items-center gap-1">
              <MapPin size={16} className="text-muted-foreground shrink-0" />
              {location}
            </small>
          </div>
          <div className="flex space-x-4">
            <small className="flex items-center gap-1">{salary}</small>
            <div className="flex items-center gap-1">
              <small className="font-semibold">Posted:</small>
              <small className="text-muted-foreground">
                {createdAt?.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </small>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2"></CardFooter>
      </div>
    </Card>
  );
}
