import CreateJobFrom from '@/components/CreateJobFrom';
//import { HydrationBoundary , dehydrate, QueryClient } from '@tanstack/react-query';
import React from 'react'


const AddJobPage:React.FC = () => {

  //const queryClient = new QueryClient();

  return (
    <>
      <CreateJobFrom />   
    {/* <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateJobFrom />      
    </HydrationBoundary> */}
    </>
  )
}

export default AddJobPage;