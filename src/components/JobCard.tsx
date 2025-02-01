import { JobType } from '@/types/JobDTO';
import React from 'react'

interface JobCardProps {
  key: string;
  job:JobType
}

const JobCard:React.FC<JobCardProps> =({job}) => {

  return (
    <div>JobCard</div>
  )

}

export default JobCard;