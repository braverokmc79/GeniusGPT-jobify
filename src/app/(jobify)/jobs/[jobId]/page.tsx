import {  getSingleJobAction } from '@/actions/jobService';
import EditJobForm from '@/components/jobify/EditJobForm';
import { HydrationBoundary, QueryClient , dehydrate } from '@tanstack/react-query'
import React from 'react'


interface JobDetailPageProps{
    params: { jobId: string }
}


const JobDetailPage:React.FC<JobDetailPageProps> =async ({params}) => {
 const queryClinet =new QueryClient();

 await queryClinet.prefetchQuery({
    queryKey: ['job', params.jobId],
    queryFn: () => getSingleJobAction(params.jobId),
  });


  return (
    <HydrationBoundary state={dehydrate(queryClinet)}>
        <EditJobForm  jobId={params.jobId} />
    </HydrationBoundary>
  )

}

export default JobDetailPage;