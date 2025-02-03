import { getStatsAction } from '@/actions/jobService';
import React from 'react'

const StatsPage:React.FC = async() => {
  const stats = await getStatsAction();
  console.log("*stats : ",stats);
  
  return (
    <div className='text-4xl'>
          StatsPage
    </div>
  )
}

export default StatsPage;