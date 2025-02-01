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

interface JobCardProps {
  key: string;
  job: JobType;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent></CardContent>
        <CardFooter className="flex gap-4">
          <Button asChild size="sm">
            <Link href={`/jobs/${job.id}`}>수정하기</Link>
          </Button>
          <DeleteJobButton />
        </CardFooter>      
    </Card>
  );
};

export default JobCard;
