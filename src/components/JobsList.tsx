"use client";
import { getAllJobsAction } from '@/actions/jobService';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import JobCard from './JobCard';
import { JobType } from '@/types/JobDTO';
import ComplexButtonContainer from './ComplexButtonContainer';

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
  const count=data?.count || 0;
  const page=data?.page || 0;
  const totalPages=data?.totalPages || 0;

  if(isPending) return <h2 className='text-xl'>잠시만 기다려주세요...</h2>
  if(jobs.length < 1) return <h2 className='text-xl'>채용 정보를 찾을 수 없습니다.</h2>



  return (
    <>
      <div className='flex items-center justify-between mb-8'>
          <h2 className='text-xl font-semibold capitalize '>{count} 건의 일자리</h2>
          {totalPages < 2 ? null : (
          <ComplexButtonContainer currentPage={page} totalPages={totalPages} />
        )}
      </div>


      <div className='grid md:grid-cols-2 gap-8'>
          {jobs.map((job) => {
              return <JobCard key={job.id} job={job} />;
          })}
      </div>
    </>
  )


}

export default JobsList