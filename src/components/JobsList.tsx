"use client";
import { getAllJobsAction } from '@/actions/jobService';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import JobCard from './JobCard';
import { JobType } from '@/types/JobDTO';

const JobsList = () => {

  const searchParams = useSearchParams();
  const search =searchParams.get('search') || ''; 
  const jobStatus = searchParams.get('jobStatus') || '전체';

  const pageNumber = Number(searchParams.get('page')) || 1;

  const {data, isPending}=useQuery({
    queryKey: ['jobs', search, jobStatus, pageNumber],
     
    queryFn: async () => {
      console.log("🔍 Fetching jobs with:", { search, jobStatus, page: pageNumber });
      return await getAllJobsAction({ search, jobStatus, page: pageNumber, limit: 10 });
    },
    staleTime: 10 * 60 * 1, // 5분 동안 데이터 유지
  })

  const jobs = data?.jobs as JobType[]  || [];

  if(isPending) return <h2 className='text-xl'>Please Wait...</h2>
  if(jobs.length < 1) return <h2 className='text-xl'>No Jobs Found...</h2>

  
  //console.log("*직업 검색 결과  : ",  jobs);


  return (
    <>
      <div className='grid md:grid-cols-2 gap-8'>
          {jobs.map((job) => {
              return <JobCard key={job.id} job={job} />;
          })}
      </div>
    </>
  )


}

export default JobsList