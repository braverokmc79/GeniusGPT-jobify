
import { getAllJobsAction } from '@/actions/jobService';
import JobsList from '@/components/jobify/JobsList';
import SearchForm from '@/components/jobify/SearchForm';
import { HydrationBoundary , dehydrate, QueryClient } from '@tanstack/react-query';
import React from 'react'

const JobsPage:React.FC = async () => {
  const queryClient=new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['jobs' , '', '전체', 1],
    queryFn: () => getAllJobsAction({}),
  });
 
  return (   
     <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchForm />
      <JobsList />    
    </HydrationBoundary> 
  )
}

export default JobsPage;