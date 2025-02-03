import { getChartsDataAction, getStatsAction } from '@/actions/jobService';
import React from 'react'

const StatsPage:React.FC = async() => {
  
  const stats = await getStatsAction();
  const charts = await getChartsDataAction();

  console.log("*stats : ",stats);
  console.log("*charts : ",charts);
  return (
    <div className='text-4xl'>
          StatsPage
    </div>
  )
}

export default StatsPage;