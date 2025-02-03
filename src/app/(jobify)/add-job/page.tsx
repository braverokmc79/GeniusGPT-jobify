import CreateJobFrom from '@/components/jobify/CreateJobFrom';
import { HydrationBoundary , dehydrate, QueryClient } from '@tanstack/react-query';
import React from 'react'


const AddJobPage:React.FC = () => {

  const queryClient = new QueryClient();

  return (
    <>      
     <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateJobFrom />      
    </HydrationBoundary> 
    </>
  )
}

export default AddJobPage;