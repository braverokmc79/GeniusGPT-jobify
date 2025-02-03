import React from "react";
import {  getChartsDataAction, getStatsAction } from "@/actions/jobService";
import {HydrationBoundary,dehydrate,QueryClient} from "@tanstack/react-query";
import StatsContainer from "@/components/jobify/StatsContainer";
import ChartsContainer from "@/components/jobify/ChartsContainer";


const StatsPage: React.FC = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsDataAction(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsContainer />
      <ChartsContainer />
    </HydrationBoundary>
  );
};

export default StatsPage;
