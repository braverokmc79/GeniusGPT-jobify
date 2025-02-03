"use client";
import React from "react";
import StatsCard from "./StatsCard";
import { getStatsAction } from "@/actions/jobService";
import { useQuery } from "@tanstack/react-query";



const StatsContainer: React.FC = () => {
    const {data } = useQuery({
        queryKey: ['stats'],
        queryFn: () => getStatsAction(),
    })

    return (
        <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">           
           <StatsCard title="보류 처리" value={data?.["보류중"] || 0} />
           <StatsCard title="인터뷰 처리" value={data?.["인터뷰"] || 0} />
           <StatsCard title="거절 처리" value={data?.["거절됨"] || 0} />
        </div>
    );
};

export default StatsContainer;
