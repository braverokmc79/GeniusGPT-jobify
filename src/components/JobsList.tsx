import { getAllJobsAction } from '@/actions/jobService';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react'

const JobsList = () => {

  const searchParams = useSearchParams();

  const {data, isPending}=useQuery({
    queryKey: ['jobs'],
    queryFn: () => getAllJobsAction({}),
  })

  return (
    <div>JobsList</div>
  )
}

export default JobsList