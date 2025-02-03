"use client"
import { getChartsDataAction } from "@/actions/jobService";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from "recharts";


const ChartsContainer: React.FC = () => {
  
  const {data}=useQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsDataAction(),
  })

  if(!data || data.length < 1) return null;

  // 데이터 키 변경
  const formattedData = data.map(({ date, count }) => ({
      date,
      신청자수: count,
  }));



  return (
    <section className="mt-16">
      <h1 className="text-4xl font-semibold text-center mb-10">월간 신청</h1>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData} margin={{top: 5}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />               
          <Bar dataKey="신청자수"    fill="#2563eb" barSize={75}/>
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default ChartsContainer;
