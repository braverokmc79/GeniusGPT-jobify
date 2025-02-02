import { JobType } from "@/types/JobDTO";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Link from "next/link";
import DeleteJobButton from "./DeleteJobButton";
import JobInfo from "./JobInfo";
import {  Briefcase , CalendarDays, MapPin, RadioTower} from "lucide-react";
import { Badge } from "./ui/badge";

interface JobCardProps {
  key: string;
  job: JobType;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const date =new Date(job.createdAt).toLocaleDateString();

  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      
      <CardContent className="mt-4 grid grid-cols-2 gap-4">
        <JobInfo icon={<Briefcase />} text={job.mode} />
        <JobInfo icon={<MapPin />} text={job.location} />
        <JobInfo icon={<CalendarDays />} text={date} />
        <Badge className="w-32 justify-center">
          <JobInfo icon={<RadioTower  className="w-4 h-4"  />} 
            text={job.status} />
        </Badge>
      </CardContent>


        <CardFooter className="flex gap-4">
          <Button asChild size="sm">
            <Link href={`/jobs/${job.id}`}>수정하기</Link>
          </Button>
          <DeleteJobButton   id={job.id} />
        </CardFooter>      
    </Card>
  );
};

export default JobCard;
